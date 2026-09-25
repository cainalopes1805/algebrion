import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useGame, useProfile } from '../store/useGame';
import { buildLevelSession, getLevel, getMission } from '../data/content';
import { nextAfterLevel } from '../data/trail';
import { SPELL_BY_ID, MASTERY, MASTERY_GOAL, maxManaFor, isLearned, masteryOf } from '../data/spells';
import { calculateHeroBonuses } from '../data/classes';
import { realize } from '../data/generators';
import { makeRng } from '../utils/rng';
import { SpellBar, SpellFx, FormulaModal } from '../components/SpellUI';
import { MONSTERS } from '../data/characters';
import { MISSION_BG } from '../data/biomes';
import { useT } from '../i18n';
import { sounds } from '../utils/audio';
import { FocusShell, Hud } from '../components/Layout';
import ActivityView from '../components/ActivityView';
import BattleStage from '../components/BattleStage';
import Monster from '../components/Monster';
import Character from '../components/Character';
import Confetti from '../components/Confetti';
import { Button, Modal, ProgressBar } from '../components/ui';

export default function Level() {
  const { missionId, levelId } = useParams();
  const [runId, setRunId] = useState(0);
  const mission = getMission(missionId);
  const level = getLevel(missionId, levelId);
  const p = useProfile();
  const { t } = useT();
  const nav = useNavigate();

  if (!mission || !level) return <FocusShell><div className="p-10 text-center"><Link to="/" className="underline">{t('back')}</Link></div></FocusShell>;
  const unlocked = p.unlockedMissions.includes(mission.id) && (level.id === 1 || p.completedLevels[`${mission.id}-${level.id - 1}`]);
  if (!unlocked) {
    return (
      <FocusShell>
        <div className="max-w-md mx-auto p-10 text-center panel mt-20">
          <div className="text-5xl">🔒</div>
          <p className="my-4">{t('locked_msg')}</p>
          <Button onClick={() => nav('/')}>{t('back')}</Button>
        </div>
      </FocusShell>
    );
  }
  return <Runner key={runId} mission={mission} level={level} onRestart={() => setRunId((n) => n + 1)} />;
}

function Runner({ mission, level, onRestart }) {
  const { t, l } = useT();
  const nav = useNavigate();
  const p = useProfile();
  const { recordAnswer, loseHeart, completeLevel, useHint: spendHint, healHearts } = useGame.getState();
  const [phase, setPhase] = useState(level.boss ? 'intro' : 'play'); // intro | play | win | lose
  const [queue, setQueue] = useState(() => buildLevelSession(mission, level, Date.now()).map((a, i) => ({ a, uid: `${i}-0`, retry: false })));
  const total = useRef(queue.length).current;
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [combo, setCombo] = useState(0);
  const [event, setEvent] = useState(null);
  const [lastLost, setLastLost] = useState(false);
  const [result, setResult] = useState(null);
  const [confirmExit, setConfirmExit] = useState(false);
  const outOfHearts = useRef(false);
  const monster = mission.boss;

  // ── feitiços (chefes e provas) ──
  const battle = !!(level.boss || level.exam);
  const spells = p.skills.equipped.map((id) => SPELL_BY_ID[id]).filter((sp) => sp && isLearned(p, sp));
  // bênçãos das virtudes da jornada, atributos, talentos e vínculo com o mentor deste capítulo
  const V = p.story.virtues, B = p.story.bonds;
  const heroBonuses = calculateHeroBonuses(p);

  const perk = {
    mana: Math.min(2, Math.floor((V.courage || 0) / 2)) + (heroBonuses.startMana || 0),
    hints: Math.min(2, Math.floor((V.wisdom || 0) / 2)) + (heroBonuses.hints || 0),
    gold: Math.min(20, Math.floor((V.cunning || 0) / 2) * 10) + (heroBonuses.goldBonus || 0),
    heal: Math.min(2, Math.floor((V.compassion || 0) / 2)) + (heroBonuses.winHeal || 0),
    ally: (B[mission.mentor] || 0) >= 3 ? 1 : 0,
    startShield: (battle ? heroBonuses.startShield || 0 : 0) + (level.boss ? heroBonuses.bossShield || 0 : 0),
    xpBonus: (p.hero === 'bard' ? 15 : 0) + (heroBonuses.xpBonus || 0),
    skipBonus: (p.hero === 'ranger' ? 1 : 0) + (heroBonuses.skipBonus || 0),
    healBonus: (p.hero === 'alchemist' ? 1 : 0) + (heroBonuses.healBonus || 0),
    comboManaBonus: (p.hero === 'bard' ? 1 : 0) + (heroBonuses.comboManaBonus || 0),
  };

  const maxMana = maxManaFor(p);
  const [mana, setMana] = useState(Math.min(maxMana, 2 + perk.mana + perk.ally));
  const [shield, setShield] = useState(perk.startShield);
  const shieldRef = useRef(perk.startShield);
  const [bonusHints, setBonusHints] = useState(perk.hints);
  const bonusRef = useRef(perk.hints);
  const [mageDiscountActive, setMageDiscountActive] = useState(p.hero === 'mage');
  const [answered, setAnswered] = useState(false);
  const [casting, setCasting] = useState(null);
  const [spellFx, setSpellFx] = useState(null);
  const masteryRef = useRef(0); // maestria ganha nesta fase (só fases de treino de um conceito)

  const current = queue[idx];
  const hpPct = level.boss ? Math.max(0, 1 - done / total) : 1;
  useEffect(() => { setAnswered(false); }, [current?.uid]);

  const complete = () => {
    const gainXp = Math.round(level.xpReward * (1 + perk.xpBonus / 100));
    const gainGold = Math.round(level.goldReward * (1 + perk.gold / 100));
    const res = completeLevel({ missionId: mission.id, levelId: level.id, mistakes, xp: gainXp, gold: gainGold, masteryGain: masteryRef.current, conceptId: level.concept ? level.id : null });
    if (perk.heal) healHearts(perk.heal); // compaixão e talentos: a vitória cura
    setResult(res);
    sounds.victory();
    setEvent({ kind: 'win', n: Math.random() });
    setPhase('win');
  };

  const onAnswer = useCallback(
    ({ correct }) => {
      recordAnswer({ correct, combo: correct ? combo + 1 : 0 });
      setAnswered(true);
      if (correct) {
        sounds.correct();
        const nc = combo + 1;
        setCombo(nc);
        if (nc >= 3) sounds.combo(nc);
        setDone((d) => d + 1);
        setEvent({ kind: 'hit', dmg: 1, n: Math.random() });
        if (level.boss) sounds.sword();
        if (battle) setMana((m) => Math.min(maxMana, m + (nc >= 3 ? 2 + perk.comboManaBonus : 1)));
        if (level.concept) masteryRef.current += current.retry ? MASTERY.retryCorrect : MASTERY.correct;
      } else {
        sounds.wrong();
        setCombo(0);
        if (shieldRef.current > 0) {
          // escudo de feitiço: o erro é absorvido (sem coração perdido, sem marca no boletim)
          shieldRef.current -= 1;
          setShield(shieldRef.current);
          sounds.select();
          setEvent({ kind: 'miss', absorbed: true, n: Math.random() });
        } else {
          setMistakes((m) => m + 1);
          const r = loseHeart();
          if (r.absorbed) sounds.select(); else sounds.heartLost();
          setLastLost(!r.absorbed);
          setTimeout(() => setLastLost(false), 500);
          setEvent({ kind: 'miss', absorbed: r.absorbed, n: Math.random() });
          if (r.hearts <= 0) outOfHearts.current = true;
        }
        if (!current.retry) setQueue((q) => [...q, { a: current.a, uid: `${current.uid}-r`, retry: true }]);
      }
    },
    [combo, current, level.boss, level.concept, battle, loseHeart, recordAnswer, maxMana, perk.comboManaBonus],
  );

  // ── lançar feitiços ──
  const applySpell = (spell) => {
    const e = spell.effect;
    setSpellFx({ spell, k: Math.random() });
    setTimeout(() => setSpellFx(null), 1650);
    sounds.achievement();
    if (e.skip) {
      const step = Math.min(e.skip + perk.skipBonus, queue.length - idx);
      setDone((d) => d + step);
      setEvent({ kind: 'hit', dmg: step, n: Math.random() });
      if (idx + step >= queue.length) setTimeout(complete, 900);
      else setIdx(idx + step);
    }
    if (e.shield) { shieldRef.current += e.shield; setShield(shieldRef.current); }
    if (e.heal) healHearts(e.heal + perk.healBonus);
    if (e.reveal) { bonusRef.current += e.reveal; setBonusHints(bonusRef.current); }
  };
  const castSpell = (spell) => {
    const isMageDiscount = p.hero === 'mage' && mageDiscountActive;
    const costDiscount = isMageDiscount ? 1 : 0;
    const effectiveCost = Math.max(1, spell.cost - costDiscount);
    if (answered || mana < effectiveCost) return;
    setMana((m) => m - effectiveCost);
    if (isMageDiscount) setMageDiscountActive(false);
    if (!spell.formula) { applySpell(spell); return; }
    setCasting({ spell, activity: realize(spell.formula, makeRng(Date.now())), result: null, k: Math.random() });
  };
  const onFormulaAnswer = ({ correct }) => {
    recordAnswer({ correct, combo: 0 });
    setCasting((c) => ({ ...c, result: correct }));
  };
  const onFormulaNext = () => {
    const c = casting;
    setCasting(null);
    if (c?.result) applySpell(c.spell);
    else { sounds.wrong(); setEvent({ kind: 'miss', absorbed: true, n: Math.random() }); } // feitiço falhou: só a mana se perde
  };
  const useSpellHint = () => {
    if (bonusRef.current > 0) { bonusRef.current -= 1; setBonusHints(bonusRef.current); return true; }
    return spendHint();
  };

  const onNext = () => {
    if (outOfHearts.current) {
      sounds.defeat();
      setPhase('lose');
      return;
    }
    if (idx + 1 >= queue.length) {
      complete();
      return;
    }
    setIdx(idx + 1);
  };


  /* ───── Sem corações ───── */
  if (p.hearts <= 0 && (phase === 'play' || phase === 'intro') && done === 0 && mistakes === 0) return <NoHearts onBack={() => nav(-1)} />;

  return (
    <FocusShell bg={MISSION_BG[mission.id]}>
      <div className="max-w-3xl mx-auto px-4 pt-4 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => setConfirmExit(true)} className="w-9 h-9 rounded-lg border border-line bg-surface text-dim hover:text-ink hover:border-accent" aria-label={t('exit')}>✕</button>
          <ProgressBar pct={phase === 'win' ? 1 : done / total} className="flex-1" height="h-3.5" />
          <Hud compact />
        </div>

        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <motion.div key="intro" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center panel panel-gold p-8 mt-6">
              <div className="text-xs tracking-[0.4em] uppercase text-bad">{t('boss_appears')}</div>
              <div className="flex justify-center my-2"><Monster id={monster} size={220} /></div>
              <h2 className="font-fancy text-3xl font-black text-gold-grad">{l(MONSTERS[monster].name)}</h2>
              <p className="text-dim mt-2 mb-5">{t('boss_desc', { n: total })}</p>
              <Button size="lg" onClick={() => setPhase('play')}>⚔️ {t('fight')}</Button>
            </motion.div>
          )}

          {phase === 'play' && current && (
            <motion.div key="play" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {(perk.mana > 0 || perk.hints > 0 || perk.gold > 0 || perk.heal > 0 || perk.ally > 0 || perk.startShield > 0 || p.hero === 'mage' || perk.skipBonus > 0 || perk.healBonus > 0 || perk.comboManaBonus > 0) && (
                <div className="mb-3 flex flex-wrap gap-1.5 text-[10.5px] font-extrabold uppercase tracking-[0.1em]">
                  {perk.mana > 0 && <span className="px-2 py-1 rounded-full border border-amber-300/40 bg-amber-300/10 text-amber-100">{t('perk_courage', { n: perk.mana })}</span>}
                  {perk.hints > 0 && <span className="px-2 py-1 rounded-full border border-amber-300/40 bg-amber-300/10 text-amber-100">{t('perk_wisdom', { n: perk.hints })}</span>}
                  {perk.gold > 0 && <span className="px-2 py-1 rounded-full border border-amber-300/40 bg-amber-300/10 text-amber-100">+{perk.gold}% {t('gold')}</span>}
                  {perk.heal > 0 && <span className="px-2 py-1 rounded-full border border-amber-300/40 bg-amber-300/10 text-amber-100">{t('perk_compassion', { n: perk.heal })}</span>}
                  {perk.ally > 0 && battle && <span className="px-2 py-1 rounded-full border border-rose-300/40 bg-rose-300/10 text-rose-100">{t('bond')}: +1 {t('mana')}</span>}
                  {perk.startShield > 0 && battle && <span className="px-2 py-1 rounded-full border border-sky-300/40 bg-sky-300/10 text-sky-100">{t('spell_shield')}: +{perk.startShield}</span>}
                  {p.hero === 'mage' && mageDiscountActive && battle && <span className="px-2 py-1 rounded-full border border-mana/40 bg-mana/10 text-mana">{t('passive_mage_badge')}</span>}
                  {perk.skipBonus > 0 && battle && <span className="px-2 py-1 rounded-full border border-emerald-300/40 bg-emerald-300/10 text-emerald-100">{t('passive_ranger_badge')}</span>}
                  {perk.healBonus > 0 && battle && <span className="px-2 py-1 rounded-full border border-purple-300/40 bg-purple-300/10 text-purple-100">{t('passive_alchemist_badge')}</span>}
                  {p.hero === 'bard' && battle && <span className="px-2 py-1 rounded-full border border-orange-300/40 bg-orange-300/10 text-orange-100">{t('passive_bard_badge')}</span>}
                </div>
              )}
              {battle && <SpellBar spells={spells} mana={mana} maxMana={maxMana} shield={shield} hints={bonusHints} disabled={answered} onCast={castSpell} costDiscount={p.hero === 'mage' && mageDiscountActive ? 1 : 0} />}
              {level.boss && <div className="mb-4"><BattleStage hero={p.hero} monster={monster} hpPct={hpPct} event={event} combo={combo} heartsLost={lastLost} /></div>}
              {!level.boss && combo >= 3 && (
                <motion.div key={combo} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center font-display font-black text-accent mb-2 anim-flame">🔥 {t('combo')} x{combo}</motion.div>
              )}
              <ActivityView
                key={current.uid}
                activity={current.a}
                mentor={mission.mentor}
                onAnswer={onAnswer}
                onNext={onNext}
                hintCount={p.items.hint + bonusHints}
                onUseHint={useSpellHint}
                nextLabel={idx + 1 >= queue.length ? t('finish') : undefined}
              />
              {current.retry && <p className="text-center text-xs text-mana mt-2">↻ {t('review_tag')}</p>}
            </motion.div>
          )}

          {phase === 'win' && result && (
            <Victory key="win" mission={mission} level={level} result={result} mistakes={mistakes} boss={level.boss} monster={monster} hero={p.hero} onAgain={onRestart} />
          )}

          {phase === 'lose' && (
            <motion.div key="lose" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center panel p-8 mt-6">
              <div className="flex justify-center"><Character id={p.hero} size={130} mood="sad" /></div>
              <h2 className="font-display text-2xl font-black text-bad mt-2">{t('defeat')}</h2>
              <p className="text-dim my-3">{t('defeat_msg')}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="ghost" onClick={() => nav('/trail')}>{t('back')}</Button>
                <Button onClick={() => nav('/shop')}>🛒 {t('nav_shop')}</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SpellFx fx={spellFx} />
      <FormulaModal cast={casting} mentor={mission.mentor} onAnswer={onFormulaAnswer} onNext={onFormulaNext} />

      <Modal open={confirmExit} onClose={() => setConfirmExit(false)}>
        <h3 className="font-display text-xl font-black">{t('exit_title')}</h3>
        <p className="text-dim my-3">{t('exit_msg')}</p>
        <div className="flex gap-3">
          <Button variant="ghost" className="flex-1" onClick={() => setConfirmExit(false)}>{t('stay')}</Button>
          <Button variant="danger" className="flex-1" onClick={() => nav('/trail')}>{t('exit')}</Button>
        </div>
      </Modal>
    </FocusShell>
  );
}

function Stars({ n }) {
  return (
    <div className="flex justify-center gap-2 my-3">
      {[1, 2, 3].map((i) => (
        <motion.span
          key={i}
          initial={{ scale: 0, rotate: -90, opacity: 0 }}
          animate={{ scale: i <= n ? 1 : 0.7, rotate: 0, opacity: 1 }}
          transition={{ delay: 0.35 * i, type: 'spring', damping: 8 }}
          className={`text-6xl ${i <= n ? 'drop-shadow-[0_0_14px_rgba(242,207,122,.9)]' : 'grayscale opacity-30'}`}
          onAnimationStart={() => i <= n && setTimeout(() => sounds.coin(), 350 * i)}
        >
          ⭐
        </motion.span>
      ))}
    </div>
  );
}

function Victory({ mission, level, result, mistakes, boss, monster, hero, onAgain }) {
  const { t, l } = useT();
  const nav = useNavigate();
  const profile = useProfile();
  // a próxima etapa vem da trilha (lição do passo seguinte, cenas de história, prova…), e não do número da fase
  const next = boss ? null : nextAfterLevel(profile, mission.id, level.id);
  const nextMission = result.unlockedMission;
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center panel panel-gold p-6 sm:p-8 mt-4">
      <Confetti count={70} />
      <div className="text-xs tracking-[0.4em] uppercase text-accent">{boss ? t('boss_defeated') : t('level_clear')}</div>
      <h2 className="font-fancy text-2xl sm:text-3xl font-black text-gold-grad mt-1">{boss ? l(MONSTERS[monster].name) : l(level.title)}</h2>
      <div className="flex justify-center items-end gap-2 mt-2">
        <Character id={hero} size={110} mood="happy" />
        {boss && <Monster id={monster} size={110} defeated />}
      </div>
      <Stars n={result.stars} />
      <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto my-4">
        <Reward icon="⭐" value={`+${result.xp}`} label="XP" delay={0.9} />
        <Reward icon="💰" value={`+${result.gold}`} label={t('gold')} delay={1.1} />
        <Reward icon="❌" value={mistakes} label={t('mistakes')} delay={1.3} />
      </div>
      {!result.first && <p className="text-xs text-dim">{t('replay_reduced')}</p>}
      {level.concept && SPELL_BY_ID[`${mission.id}-${level.id}`] && (() => {
        const sp = SPELL_BY_ID[`${mission.id}-${level.id}`];
        const m = masteryOf(profile, sp);
        return (
          <div className="max-w-sm mx-auto mt-3 card-pro !rounded-xl p-3 text-left">
            <div className="flex items-center justify-between eyebrow !text-[10px] text-dim"><span>{t('mastery')} · {l(sp.name)}</span><span className="tabular-nums text-accent2">{m}/{MASTERY_GOAL}</span></div>
            <div className="h-1.5 rounded-full bg-black/40 mt-2 overflow-hidden"><motion.div className="h-full rounded-full bg-gradient-to-r from-accent to-accent2" initial={{ width: 0 }} animate={{ width: `${(m / MASTERY_GOAL) * 100}%` }} transition={{ duration: 0.9 }} /></div>
            <div className="text-[11px] text-dim mt-1.5">{m >= MASTERY_GOAL ? t('spell_learned') : t('mastery_hint')}</div>
          </div>
        );
      })()}
      {result.potion && <p className="text-xs text-mana">🧪 {t('potion_used')}</p>}
      {nextMission && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6 }} className="my-3 p-3 rounded-xl bg-accent/15 border border-accent text-accent2 font-display font-bold">
          🗝️ {t('mission_unlocked')}
        </motion.div>
      )}
      <div className="flex flex-col sm:flex-row gap-3 justify-center mt-5">
        <Button variant="ghost" onClick={() => nav('/trail')}>{t('back')}</Button>
        <Button variant="ghost" onClick={onAgain}>↻ {t('play_again')}</Button>
        {!boss && next && <Button onClick={() => { sounds.click(); nav(next.to); }}>{t('next_step')} →</Button>}
        {boss && <Button onClick={() => nav(`/story/c${mission.id}-end?then=${encodeURIComponent('/trail')}`)}>📜 {t('continue_story')} →</Button>}
        {!boss && !next && nextMission && <Button onClick={() => nav('/trail')}>{t('next_mission')} →</Button>}
      </div>
    </motion.div>
  );
}

const Reward = ({ icon, value, label, delay }) => (
  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }} className="rounded-xl bg-black/30 border border-line py-3">
    <div className="text-2xl">{icon}</div>
    <div className="font-display font-black text-lg">{value}</div>
    <div className="text-[10px] uppercase tracking-widest text-dim">{label}</div>
  </motion.div>
);

function NoHearts({ onBack }) {
  const { t } = useT();
  const p = useProfile();
  const buy = useGame((s) => s.buyConsumable);
  return (
    <FocusShell bg="tavern">
      <div className="max-w-md mx-auto panel p-8 text-center mt-16">
        <div className="text-6xl anim-float">💔</div>
        <h2 className="font-display text-2xl font-black mt-2">{t('no_hearts')}</h2>
        <p className="text-dim my-3">{t('no_hearts_msg')}</p>
        <div className="flex flex-col gap-3">
          <Button disabled={p.gold < 60} onClick={() => { buy('heartRefill'); }}>❤️ {t('refill_hearts')} — 60💰</Button>
          <Button variant="ghost" onClick={onBack}>{t('back')}</Button>
        </div>
      </div>
    </FocusShell>
  );
}
