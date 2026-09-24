import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGame, useProfile } from '../store/useGame';
import { ACH_BY_ID } from '../data/economy';
import { rankFor } from '../data/characters';
import { SPELL_BY_ID } from '../data/spells';
import { spellIcon } from './spellIcons';
import { useT } from '../i18n';
import Confetti from './Confetti';
import Character from './Character';
import { Button } from './ui';

function AchievementToast({ ev, onDone }) {
  const { t, l } = useT();
  const a = ACH_BY_ID[ev.id];
  useEffect(() => {
    const id = setTimeout(onDone, 5200);
    return () => clearTimeout(id);
  }, [onDone]);
  if (!a) return null;
  return (
    <motion.div
      layout
      initial={{ x: 320, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 320, opacity: 0 }}
      transition={{ type: 'spring', damping: 22, stiffness: 240 }}
      onClick={onDone}
      className="panel panel-gold p-3 pr-4 flex items-center gap-3 w-[min(92vw,340px)] cursor-pointer"
    >
      <div className="w-12 h-12 rounded-xl bg-accent/20 border border-accent flex items-center justify-center text-2xl anim-glow">{a.icon}</div>
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-[0.25em] text-accent">{t('achievement_unlocked')}</div>
        <div className="font-display font-black leading-tight truncate">{l(a.name)}</div>
        <div className="text-xs text-dim leading-tight">{l(a.desc)}{a.gold ? ` · +${a.gold}💰` : ''}</div>
      </div>
    </motion.div>
  );
}

function SpellToast({ ev, onDone }) {
  const { t, l } = useT();
  const sp = SPELL_BY_ID[ev.id];
  useEffect(() => {
    const id = setTimeout(onDone, 6000);
    return () => clearTimeout(id);
  }, [onDone]);
  if (!sp) return null;
  const Icon = spellIcon(sp.icon);
  return (
    <motion.div layout initial={{ x: 320, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 320, opacity: 0 }} transition={{ type: 'spring', damping: 22, stiffness: 240 }} onClick={onDone} className="card-pro !border-mana/70 p-3 pr-4 flex items-center gap-3 w-[min(92vw,340px)] cursor-pointer">
      <div className="w-12 h-12 rounded-xl bg-mana/15 border border-mana/60 flex items-center justify-center text-mana anim-glow"><Icon size={24} strokeWidth={1.8} /></div>
      <div className="min-w-0">
        <div className="eyebrow !text-[10px] text-mana">{t('spell_new')}</div>
        <div className="font-display font-black leading-tight truncate">{l(sp.name)}</div>
        <div className="text-xs text-dim leading-tight">{t('spell_learned')}</div>
      </div>
    </motion.div>
  );
}

function LevelUpModal({ ev, onDone }) {
  const { t, l } = useT();
  const p = useProfile();
  return (
    <motion.div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Confetti count={80} />
      <motion.div initial={{ scale: 0.5, rotate: -6 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', damping: 12 }} className="panel panel-gold p-8 text-center max-w-sm w-full">
        <div className="text-xs tracking-[0.4em] uppercase text-accent">{t('level_up')}</div>
        <div className="font-fancy text-7xl font-black text-gold-grad my-2">{ev.level}</div>
        <div className="flex justify-center"><Character id={p.hero} size={120} mood="happy" /></div>
        <div className="font-display font-bold mt-2">{l(rankFor(ev.level))}</div>
        <Button className="mt-5 w-full" onClick={onDone}>{t('continue')}</Button>
      </motion.div>
    </motion.div>
  );
}

export default function Toasts() {
  const events = useGame((s) => s.events);
  const dismiss = useGame((s) => s.dismissEvent);
  const ach = events.filter((e) => e.type === 'achievement' || e.type === 'spell');
  const lvl = events.find((e) => e.type === 'levelup');
  return (
    <>
      <div className="fixed top-16 right-3 z-[75] flex flex-col gap-2 items-end pointer-events-none">
        <AnimatePresence>
          {ach.slice(0, 3).map((e) => (
            <div key={e.id} className="pointer-events-auto">
              {e.type === 'spell' ? <SpellToast ev={e} onDone={() => dismiss(e.id)} /> : <AchievementToast ev={e} onDone={() => dismiss(e.id)} />}
            </div>
          ))}
        </AnimatePresence>
      </div>
      <AnimatePresence>{lvl && <LevelUpModal key={lvl.id} ev={lvl} onDone={() => dismiss(lvl.id)} />}</AnimatePresence>
    </>
  );
}
