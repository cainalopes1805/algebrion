import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useShallow } from 'zustand/react/shallow';
import { useGame } from '../store/useGame';

const COLORS = ['#f2cf7a', '#d9a441', '#ff9a5a', '#8ce3b4', '#c9b0ff', '#ff7a7a'];

// Chuva de ouro/confete (moedas, brilhos). Desliga com movimento "off" ou confete desativado.
export default function Confetti({ count = 60, coins = true }) {
  const { motion: m, confetti } = useGame(useShallow((s) => ({ motion: s.settings.motion, confetti: s.settings.confetti })));
  const pieces = useMemo(
    () => Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.6,
      dur: 2.2 + Math.random() * 2,
      rot: Math.random() * 720 - 360,
      color: COLORS[i % COLORS.length],
      size: 6 + Math.random() * 8,
      coin: coins && i % 5 === 0,
      drift: Math.random() * 120 - 60,
    })),
    [count, coins],
  );
  if (m === 'off' || !confetti) return null;
  return (
    <div className="fixed inset-0 z-[65] pointer-events-none overflow-hidden" aria-hidden="true">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          initial={{ y: -30, x: 0, opacity: 1, rotate: 0 }}
          animate={{ y: '105vh', x: p.drift, opacity: [1, 1, 0], rotate: p.rot }}
          transition={{ duration: p.dur, delay: p.delay, ease: 'easeIn' }}
          style={{ position: 'absolute', left: `${p.x}%`, top: 0, width: p.coin ? 16 : p.size, height: p.coin ? 16 : p.size * 0.6, background: p.coin ? 'radial-gradient(circle at 30% 30%, #fff3b0, #d9a441 60%, #8a6210)' : p.color, borderRadius: p.coin ? '50%' : 2, boxShadow: p.coin ? '0 0 8px #f2cf7a' : 'none' }}
        />
      ))}
    </div>
  );
}
