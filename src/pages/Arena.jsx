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
import { Button, Card, SectionTitle, cx } from '../components/ui';

const DIFFS = [
  { id: 'squire', tiers: [1, 2], time: 40, icon: '🛡️', mult: 1 },
  { id: 'knight', tiers: [1, 2, 3], time: 32, icon: '⚔️', mult: 1.5 },
  { id: 'master', tiers: [2, 3, 4], time: 26, icon: '👑', mult: 2 },
];
const MONSTER_ORDER = Object.keys(MONSTERS);
const nameKey = { squire: 'diff_squire', knight: 'diff_knight', master: 'diff_master' };

/* ───────────────────────── Hub ───────────────────────── */
export function ArenaHub() {
  const { t } = useT();
  const p = useProfile();
  const nav = useNavigate();
  return (
    <div className="space-y-6">
      <div className="relative panel panel-gold overflow-hidden p-6 text-center">
        <div className="absolute inset-0 opacity-40" style={{ background: 'radial-gradient(ellipse at 50% 100%, rgb(var(--glow) / .5), transparent 60%)' }} />
        <div className="relative">
          <div className="flex justify-center items-end gap-2">
            <Character id={p.hero} size={110} />
            <span className="font-fancy text-4xl font-black text-accent pb-10">VS</span>
            <Monster id={MONSTER_ORDER[p.stats.arenaRuns % MONSTER_ORDER.length]} size={110} />
          </div>
          <h1 className="font-fancy text-3xl font-black text-gold-grad">{t('arena_title')}</h1>
          <p className="text-dim max-w-md mx-auto mt-1">{t('arena_desc')}</p>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <div><div className="font-display text-2xl font-black text-accent">{p.stats.arenaBest}</div><div className="text-[10px] uppercase tracking-widest text-dim">{t('best_score')}</div></div>
            <div><div className="font-display text-2xl font-black">{p.stats.arenaRuns}</div><div className="text-[10px] uppercase tracking-widest text-dim">{t('runs')}</div></div>
          </div>
        </div>
      </div>

      <SectionTitle icon="🎚️" sub={t('arena_rules')}>{t('choose_diff')}</SectionTitle>
      <div className="grid sm:grid-cols-3 gap-3">
        {DIFFS.map((d, i) => (
          <motion.div key={d.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card className="p-5 text-center h-full flex flex-col">
              <div className="text-4xl anim-float">{d.icon}</div>
              <div className="font-display font-black text-lg mt-1">{t(nameKey[d.id])}</div>
              <div className="text-xs text-dim mt-1">{t('diff_info', { s: d.time, m: d.mult })}</div>
              <Button className="mt-auto" onClick={() => nav(`/arena/play/${d.id}`)}>⚔️ {t('enter_arena')}</Button>
            </Card>
          </motion.div>
        ))}
      </div>
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
          <button onClick={onLeave} className="w-9 h-9 rounded-lg border border-line bg-surface text-dim hover:text-ink hover:border-accent" aria-label={t('exit')}>✕</button>
          <div className="flex-1 flex items-center justify-center gap-4">
            <div className="font-display font-black text-xl text-accent tabular-nums">{score}</div>
            <div className="text-xs text-dim uppercase tracking-widest">{t('wave')} {wave}</div>
          </div>
          <div className="flex gap-1 text-xl">{[0, 1, 2].map((i) => <motion.span key={i} animate={{ scale: i < lives ? 1 : 0.7, opacity: i < lives ? 1 : 0.25 }}>❤️</motion.span>)}</div>
        </div>

        {!over && (
          <>
            <div className="mb-4"><BattleStage hero={p.hero} monster={monster} hpPct={hpPct} event={event} combo={combo} /></div>
            <ActivityView key={qN} activity={activity} mentor="general" onAnswer={onAnswer} onNext={onNext} timeLimit={diff.time} hintCount={0} />
          </>
        )}

        <AnimatePresence>
          {over && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center panel panel-gold p-8 mt-4">
              {over.record && <Confetti count={70} />}
              <div className="text-xs tracking-[0.4em] uppercase text-accent">{over.record ? t('new_record') : t('arena_over')}</div>
              <div className="font-fancy text-6xl font-black text-gold-grad my-2">{score}</div>
              <div className="flex justify-center"><Character id={p.hero} size={110} mood={over.record ? 'happy' : 'sad'} /></div>
              <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto my-4">
                <Mini icon="🎯" v={correctN} l={t('correct')} />
                <Mini icon="⭐" v={`+${over.xp}`} l="XP" />
                <Mini icon="💰" v={`+${over.gold}`} l={t('gold')} />
              </div>
              <div className="flex gap-3 justify-center">
                <Button variant="ghost" onClick={onExit}>{t('back')}</Button>
                <Button onClick={onAgain}>↻ {t('play_again')}</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FocusShell>
  );
}

const Mini = ({ icon, v, l }) => (
  <div className={cx('rounded-xl bg-black/30 border border-line py-3')}>
    <div className="text-2xl">{icon}</div>
    <div className="font-display font-black text-lg">{v}</div>
    <div className="text-[10px] uppercase tracking-widest text-dim">{l}</div>
  </div>
);
