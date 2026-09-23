import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { translations } from '../i18n/translations';

export default function DialogueBox({ dialogues, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language } = useAppStore();
  const t = translations[language] || translations['pt'];

  const handleNext = () => {
    if (currentIndex < dialogues.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  if (!dialogues || dialogues.length === 0) {
    onComplete();
    return null;
  }

  const currentLine = dialogues[currentIndex];

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col gap-4 relative"
    >
      <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
        <div className="w-16 h-16 rounded-2xl bg-indigo-900 border-2 border-indigo-500 flex items-center justify-center text-3xl shadow-inner">
          🦉
        </div>
        <div className="font-black text-indigo-300 text-lg uppercase tracking-wide">
          {currentLine.speaker}
        </div>
      </div>

      <div className="flex-1 min-h-[100px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.p 
            key={currentIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-lg md:text-xl font-medium text-slate-200 leading-relaxed"
          >
            {currentLine.text[language] || currentLine.text['pt']}
          </motion.p>
        </AnimatePresence>
      </div>
      
      <div className="mt-4 flex justify-end">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNext}
          className="px-6 py-3 bg-cyan-500 text-slate-900 rounded-xl border-b-4 border-cyan-700 hover:bg-cyan-400 font-black tracking-wide"
        >
          {currentIndex < dialogues.length - 1 ? t.next : t.finish}
        </motion.button>
      </div>
    </motion.div>
  );
}
