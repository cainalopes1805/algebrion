import { motion } from 'framer-motion';
import Character from './Character';
import { COSMETIC_BY_ID } from '../data/economy';
import { useGame } from '../store/useGame';
import { cx } from './ui';

const FRAME = {
  frame_bronze: 'border-[#b0723c] shadow-[0_0_0_2px_#6b4423]',
  frame_silver: 'border-[#d6dbe4] shadow-[0_0_0_2px_#7c8391,0_0_18px_#d6dbe455]',
  frame_gold: 'border-[#f2cf7a] shadow-[0_0_0_2px_#9a7628,0_0_24px_#f2cf7a77]',
  frame_arcane: 'border-[#b48cff] shadow-[0_0_0_2px_#5b3aa8,0_0_30px_#9b6bffaa] anim-glow',
};

// Herói + moldura + aura + companheiro (cosméticos equipados)
export default function HeroPortrait({ hero = 'mage', equipped = {}, size = 96, ring = true, className = '' }) {
  const motion_ = useGame((s) => s.settings.motion);
  const aura = COSMETIC_BY_ID[equipped.aura];
  const pet = COSMETIC_BY_ID[equipped.pet];
  const frame = equipped.frame;
  return (
    <div className={cx('relative shrink-0', className)} style={{ width: size, height: size }}>
      {aura && (
        <motion.div
          className="absolute -inset-3 rounded-full blur-xl"
          style={{ background: `radial-gradient(circle, ${aura.color}aa, transparent 65%)` }}
          animate={motion_ === 'off' ? undefined : { opacity: [0.5, 1, 0.5], scale: [0.95, 1.1, 0.95] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      )}
      <div className={cx('relative w-full h-full rounded-full overflow-hidden bg-gradient-to-b from-surface2 to-black/60', ring && 'border-[3px]', ring && (frame ? FRAME[frame] : 'border-line'))}>
        <div className="absolute left-1/2 -translate-x-1/2" style={{ top: size * 0.06 }}>
          <Character id={hero} size={size * 0.88} animate />
        </div>
      </div>
      {pet && (
        <motion.span
          className="absolute -right-2 -bottom-1 text-2xl drop-shadow-[0_0_6px_rgba(0,0,0,.8)]"
          animate={motion_ === 'off' ? undefined : { y: [0, -6, 0], rotate: [-6, 6, -6] }}
          transition={{ duration: 2.6, repeat: Infinity }}
        >
          {pet.icon}
        </motion.span>
      )}
    </div>
  );
}
