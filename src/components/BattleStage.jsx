import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useShallow } from 'zustand/react/shallow';
import { useGame } from '../store/useGame';
import Character from './Character';
import Monster from './Monster';
import { MONSTERS } from '../data/characters';
import { useT } from '../i18n';
import { ProgressBar } from './ui';

// Palco de batalha: herói vs. monstro. `event` = { kind: 'hit' | 'miss' | 'win', n } dispara animações.
export default function BattleStage({ hero, monster, hpPct, event, combo = 0, heartsLost = false }) {
  const { l } = useT();
  const { motion: mm, screenShake } = useGame(useShallow((s) => ({ motion: s.settings.motion, screenShake: s.settings.screenShake })));
  const [floaters, setFloaters] = useState([]);
  const [phase, setPhase] = useState('idle');

  useEffect(() => {
    if (!event) return undefined;
    setPhase(event.kind);
    const id = ++floatId;
    const text = event.kind === 'hit' ? `-${event.dmg ?? 1}` : event.kind === 'miss' ? (event.absorbed ? '🛡️' : '💔') : '';
    if (text) setFloaters((f) => [...f, { id, text, kind: event.kind }]);
    const t1 = setTimeout(() => setPhase('idle'), 650);
    const t2 = setTimeout(() => setFloaters((f) => f.filter((x) => x.id !== id)), 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [event]);

  const m = MONSTERS[monster];
  const shake = screenShake && mm !== 'off';
  return (
    <div className="relative panel p-3 pt-4 overflow-hidden">
      <div className="absolute inset-0 opacity-60" style={{ background: `radial-gradient(ellipse at 75% 60%, ${m.color}33, transparent 60%), radial-gradient(ellipse at 20% 80%, rgb(var(--glow) / .15), transparent 55%)` }} />
      <div className="relative flex items-end justify-between px-2 sm:px-8 h-[170px] sm:h-[200px]">
        <motion.div
          animate={phase === 'hit' ? { x: [0, 60, 0], transition: { duration: 0.45 } } : phase === 'miss' && shake ? { x: [0, -10, 10, -6, 0], transition: { duration: 0.4 } } : {}}
          className="relative"
        >
          <Character id={hero} size={112} mood={phase === 'miss' ? 'sad' : phase === 'hit' || phase === 'win' ? 'surprised' : 'happy'} />
          {combo >= 3 && <div className="absolute -top-2 left-0 font-display font-black text-accent text-sm anim-flame">🔥 x{combo}</div>}
        </motion.div>
        <div className="relative">
          <Monster id={monster} size={150} hit={phase === 'hit'} attacking={phase === 'miss'} defeated={phase === 'win' || hpPct <= 0} />
          <AnimatePresence>
            {floaters.map((f) => (
              <motion.div
                key={f.id}
                initial={{ opacity: 1, y: 0, scale: 0.6 }}
                animate={{ opacity: 0, y: -60, scale: 1.4 }}
                transition={{ duration: 1 }}
                className={`absolute left-1/2 top-4 -translate-x-1/2 font-display font-black text-2xl ${f.kind === 'hit' ? 'text-accent2' : 'text-bad'}`}
                style={{ textShadow: '0 2px 6px #000' }}
              >
                {f.text}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <div className="relative mt-1 flex items-center gap-3">
        <span className="font-display text-xs font-black uppercase tracking-widest text-bad whitespace-nowrap">{l(m.name)}</span>
        <ProgressBar pct={hpPct} color="bad" height="h-3" className="flex-1" />
        <span className="text-xs text-dim tabular-nums">{Math.round(hpPct * 100)}%</span>
      </div>
      {heartsLost && <div className="absolute inset-0 pointer-events-none bg-bad/20 animate-pulse" />}
    </div>
  );
}

let floatId = 0;
