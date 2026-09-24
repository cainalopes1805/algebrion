import { useCallback, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useGame, useProfile } from '../store/useGame';
import { realize, TIERS } from '../data/generators';
import { makeRng } from '../utils/rng';
import { MONSTERS } from '../data/characters';
import { useT } from '../i18n';
import { sounds } from '../utils/audio';
import { FocusShell } from '../components/Layout';
import ActivityView from '../components/ActivityView';
import BattleStage from '../components/BattleStage';
import Confetti from '../components/Confetti';
import Character from '../components/Character';
import Monster from '../components/Monster';
import { Shield, Swords, Crown, Sliders, Heart, Target, Star, Coins, X, RotateCcw, ArrowLeft, Timer, Zap } from 'lucide-react';
import { SectionTitle } from '../components/ui';

const DIFF_COLOR = { squire: '#4b7a63', knight: '#a4854a', master: '#9a4a48' };
const DIFFS = [
  { id: 'squire', tiers: [1, 2], time: 40, Icon: Shield, mult: 1 },
  { id: 'knight', tiers: [1, 2, 3], time: 32, Icon: Swords, mult: 1.5 },
  { id: 'master', tiers: [2, 3, 4], time: 26, Icon: Crown, mult: 2 },
];
const MONSTER_ORDER = Object.keys(MONSTERS);
const nameKey = { squire: 'diff_squire', knight: 'diff_knight', master: 'diff_master' };

/* ───────────────────────── Hub ───────────────────────── */
export function ArenaHub() {
  const { t } = useT();
  const p = useProfile();
  const nav = useNavigate();
  return (
    <div className="space-y-8">
      <div className="card-pro relative overflow-hidden p-6 sm:p-8 text-center !border-accent/50">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 110%, rgb(var(--glow) / .38), transparent 62%)' }} />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
        <div className="relative">
          <div className="flex justify-center items-end gap-3">
            <div className="drop-shadow-[0_10px_14px_rgba(0,0,0,.5)]"><Character id={p.hero} size={110} /></div>
            <div className="pb-10 flex flex-col items-center"><span className="h-6 w-px bg-gradient-to-b from-transparent to-accent" /><span className="font-fancy text-2xl font-black text-accent2 my-1">VS</span><span className="h-6 w-px bg-gradient-to-t from-transparent to-accent" /></div>
            <div className="drop-shadow-[0_10px_14px_rgba(0,0,0,.5)]"><Monster id={MONSTER_ORDER[p.stats.arenaRuns % MONSTER_ORDER.length]} size={110} /></div>
          </div>
          <h1 className="font-fancy text-3xl font-black text-accent2 mt-2 tracking-wide">{t('arena_title')}</h1>
          <p className="text-dim text-sm max-w-md mx-auto mt-1.5">{t('arena_desc')}</p>
          <div className="flex justify-center mt-5">
            <div className="inline-flex divide-x divide-line rounded-xl border border-line bg-black/25">
              <div className="px-6 py-2.5"><div className="font-display text-2xl font-black text-accent2 tabular-nums leading-none">{p.stats.arenaBest}</div><div className="eyebrow !text-[9.5px] text-dim mt-1.5">{t('best_score')}</div></div>
              <div className="px-6 py-2.5"><div className="font-display text-2xl font-black tabular-nums leading-none">{p.stats.arenaRuns}</div><div className="eyebrow !text-[9.5px] text-dim mt-1.5">{t('runs')}</div></div>
            </div>
          </div>
        </div>
      </div>

      <section>
        <SectionTitle icon={Sliders} sub={t('arena_rules')}>{t('choose_diff')}</SectionTitle>
        <div className="grid sm:grid-cols-3 gap-3">
          {DIFFS.map((d, i) => {
            const c = DIFF_COLOR[d.id];
            return (
              <motion.div key={d.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <button onClick={() => { sounds.click(); nav(`/arena/play/${d.id}`); }} className="card-pro group w-full h-full p-5 text-left flex flex-col transition-all hover:-translate-y-0.5 hover:border-accent/60">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(145deg, ${c}55, ${c}18)`, border: `1px solid ${c}99`, color: `color-mix(in oklab, ${c} 45%, white)` }}><d.Icon size={24} strokeWidth={1.8} /></div>
                    <span className="font-fancy text-lg font-black text-dim leading-none">{['I', 'II', 'III'][i]}</span>
                  </div>
                  <div className="font-display font-black text-lg mt-4">{t(nameKey[d.id])}</div>
                  <div className="flex gap-3 text-xs text-dim mt-2">
                    <span className="inline-flex items-center gap-1"><Timer size={12} />{d.time}s</span>
                    <span className="inline-flex items-center gap-1"><Zap size={12} />x{d.mult}</span>
                  </div>
                  <div className="btn-cta mt-5 justify-center px-4 py-2.5 text-[11px] font-black uppercase !gap-2 w-full"><Swords size={15} strokeWidth={2.2} />{t('enter_arena')}</div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

/* ───────────────────────── Partida ───────────────────────── */
export default function ArenaPlay() {
  const nav = useNavigate();
  const { diff: diffId } = useParams();
  const diff = DIFFS.find((d) => d.id === diffId) || DIFFS[0];
  const [runId, setRunId] = useState(0);
  return <Run key={runId} diff={diff} onAgain={() => setRunId((n) => n + 1)} onExit={() => nav('/arena')} />;
}

function Run({ diff, onAgain, onExit }) {
  const { t } = useT();
  const p = useProfile();
  const { recordAnswer, finishArena } = useGame.getState();
  const rng = useRef(makeRng(Date.now())).current;
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [correctN, setCorrectN] = useState(0);
  const [qN, setQN] = useState(0);
  const [event, setEvent] = useState(null);
  const [over, setOver] = useState(null);
  const livesRef = useRef(3);

  const wave = Math.floor(correctN / 5) + 1;
  const tierPool = useMemo(() => {
    // as ondas liberam tiers mais altos gradualmente
    const allowed = diff.tiers.slice(0, Math.min(diff.tiers.length, 1 + Math.floor((wave - 1) / 2)));
    return allowed.flatMap((tr) => TIERS[tr]);
  }, [diff, wave]);
  const activity = useMemo(() => realize(rng.pick(tierPool), rng), [qN]); // eslint-disable-line react-hooks/exhaustive-deps
  const monster = MONSTER_ORDER[(wave - 1) % MONSTER_ORDER.length];
  const hpPct = 1 - (correctN % 5) / 5;

  const onAnswer = useCallback(
    ({ correct, timeFrac }) => {
      recordAnswer({ correct, combo: correct ? combo + 1 : 0 });
      if (correct) {
        const nc = combo + 1;
        const pts = Math.round((100 + Math.round(timeFrac * 60) + Math.min(nc, 10) * 10) * diff.mult);
        setScore((s) => s + pts);
        setCombo(nc);
        setCorrectN((n) => n + 1);
        setEvent({ kind: 'hit', dmg: pts, n: Math.random() });
        sounds.sword();
        if (nc >= 3) sounds.combo(nc);
      } else {
        setCombo(0);
        livesRef.current -= 1;
        setLives(livesRef.current);
        sounds.heartLost();
        setEvent({ kind: 'miss', n: Math.random() });
      }
    },
    [combo, diff.mult, recordAnswer],
  );

  const onNext = () => {
    if (livesRef.current <= 0) {
      const res = finishArena({ score, correct: correctN });
      sounds.defeat();
      setOver(res);
      return;
    }
    setQN((n) => n + 1);
  };

  // Sair no meio da partida encerra a corrida e contabiliza a pontuação
  const onLeave = () => {
    if (over || (correctN === 0 && lives === 3)) { onExit(); return; }
    setOver(finishArena({ score, correct: correctN }));
  };

  return (
    <FocusShell bg="fort">
      <div className="max-w-3xl mx-auto px-4 pt-4 pb-6">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={onLeave} className="w-9 h-9 rounded-lg border border-line bg-bg/80 backdrop-blur text-dim hover:text-ink hover:border-accent flex items-center justify-center" aria-label={t('exit')}><X size={17} /></button>
          <div className="flex-1 flex items-center justify-center gap-4">
            <div className="rounded-full bg-bg/80 backdrop-blur border border-line px-4 py-1 flex items-baseline gap-3">
              <span className="font-display font-black text-xl text-accent2 tabular-nums">{score}</span>
              <span className="eyebrow !text-[10px] text-dim">{t('wave')} {wave}</span>
            </div>
          </div>
          <div className="flex gap-1 rounded-full bg-bg/80 backdrop-blur border border-line px-2.5 py-1.5">{[0, 1, 2].map((i) => <motion.span key={i} animate={{ scale: i < lives ? 1 : 0.7, opacity: i < lives ? 1 : 0.25 }} className="flex"><Heart size={17} className="text-bad fill-bad/40" /></motion.span>)}</div>
        </div>

        {!over && (
          <>
            <div className="mb-4"><BattleStage hero={p.hero} monster={monster} hpPct={hpPct} event={event} combo={combo} /></div>
            <ActivityView key={qN} activity={activity} mentor="general" onAnswer={onAnswer} onNext={onNext} timeLimit={diff.time} hintCount={0} />
          </>
        )}

        <AnimatePresence>
          {over && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="card-pro text-center p-8 mt-4 !border-accent/60 shadow-[0_20px_50px_-15px_rgba(0,0,0,.85)]">
              {over.record && <Confetti count={70} />}
              <div className="eyebrow !tracking-[0.36em] text-accent">{over.record ? t('new_record') : t('arena_over')}</div>
              <div className="font-fancy text-6xl font-black text-accent2 my-2 tabular-nums">{score}</div>
              <div className="flex justify-center"><Character id={p.hero} size={110} mood={over.record ? 'happy' : 'sad'} /></div>
              <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto my-4">
                <Mini Icon={Target} v={correctN} l={t('correct')} />
                <Mini Icon={Star} v={`+${over.xp}`} l="XP" />
                <Mini Icon={Coins} v={`+${over.gold}`} l={t('gold')} />
              </div>
              <div className="flex gap-3 justify-center">
                <button onClick={() => { sounds.click(); onExit(); }} className="btn-ghost px-5 py-3 rounded-xl text-[12px] font-black uppercase tracking-[0.12em] inline-flex items-center gap-2"><ArrowLeft size={15} />{t('back')}</button>
                <button onClick={() => { sounds.click(); onAgain(); }} className="btn-cta px-5 py-3 text-[12px] font-black uppercase"><RotateCcw size={15} strokeWidth={2.4} />{t('play_again')}</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FocusShell>
  );
}

const Mini = ({ Icon, v, l }) => (
  <div className="rounded-xl bg-black/25 border border-line py-3 flex flex-col items-center">
    <Icon size={18} strokeWidth={1.9} className="text-accent2" />
    <div className="font-display font-black text-lg mt-1.5 tabular-nums leading-none">{v}</div>
    <div className="eyebrow !text-[9.5px] text-dim mt-1.5">{l}</div>
  </div>
);
