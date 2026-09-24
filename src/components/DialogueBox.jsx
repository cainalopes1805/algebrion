import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../store/useGame';
import { CHARACTERS } from '../data/characters';
import { useT } from '../i18n';
import { sounds } from '../utils/audio';
import Character from './Character';
import Rich from './Rich';
import { Button } from './ui';

// Diálogo com mentor: texto com efeito de máquina de escrever, clique para pular
export default function DialogueBox({ mentor, lines, onDone, doneLabel }) {
  const { t, l } = useT();
  const motionMode = useGame((s) => s.settings.motion);
  const [i, setI] = useState(0);
  const [shown, setShown] = useState(0);
  const full = l(lines[i]).replace(/\*\*/g, '');
  const typing = shown < full.length;

  useEffect(() => {
    setShown(0);
  }, [i]);

  useEffect(() => {
    if (motionMode === 'off') { setShown(full.length); return undefined; }
    if (!typing) return undefined;
    const id = setInterval(() => setShown((s) => Math.min(full.length, s + 2)), 18);
    return () => clearInterval(id);
  }, [typing, full.length, motionMode, i]);

  const next = () => {
    sounds.click();
    if (typing) { setShown(full.length); return; }
    if (i < lines.length - 1) setI(i + 1);
    else onDone?.();
  };
  const c = CHARACTERS[mentor];

  return (
    <div className="flex items-end gap-2 sm:gap-4">
      <div className="shrink-0 -mb-2">
        <Character id={mentor} size={110} speaking={typing} />
      </div>
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="panel panel-gold flex-1 p-4 relative min-h-[130px]">
        <div className="absolute -left-2 bottom-8 w-4 h-4 rotate-45 bg-surface border-l border-b border-accent/60" />
        <div className="font-display text-xs font-black tracking-[0.2em] uppercase text-accent mb-1">{l(c.name)}</div>
        <AnimatePresence mode="wait">
          <motion.p key={i} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} className="text-base sm:text-lg leading-relaxed min-h-[4.5rem]">
            {typing ? full.slice(0, shown) : <Rich text={l(lines[i])} />}
            {typing && <span className="inline-block w-2 h-4 bg-accent ml-0.5 align-middle animate-pulse" />}
          </motion.p>
        </AnimatePresence>
        <div className="flex items-center justify-between mt-3">
          <div className="flex gap-1.5">
            {lines.map((_, k) => <span key={k} className={`h-1.5 rounded-full transition-all ${k === i ? 'w-6 bg-accent' : 'w-1.5 bg-line'}`} />)}
          </div>
          <Button size="sm" onClick={next}>{typing ? t('skip') : i < lines.length - 1 ? t('next') : doneLabel || t('lets_go')}</Button>
        </div>
      </motion.div>
    </div>
  );
}
