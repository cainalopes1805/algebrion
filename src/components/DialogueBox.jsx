import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { translations } from '../i18n/translations';

export default function DialogueBox({ dialogues, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language, theme, primaryColor } = useAppStore();
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
    <div className={`w-full max-w-4xl mx-auto p-4 md:p-6 rounded-sm border-8 ${theme === 'dark' ? 'bg-stone-800 border-stone-600 text-stone-200' : 'bg-amber-50 border-amber-900 text-amber-950 font-serif'} flex flex-col md:flex-row gap-6 shadow-2xl relative mt-8`}>
      
      {/* Character Avatar Box */}
      <div className="flex-shrink-0 flex flex-col items-center">
        <div className={`w-24 h-24 rounded-full bg-${primaryColor}-200 border-4 border-${primaryColor}-600 flex items-center justify-center overflow-hidden shadow-inner`}>
          {/* Mock Avatar */}
          <span className="text-4xl">🧙‍♂️</span>
        </div>
        <div className="mt-2 font-bold bg-stone-800 text-amber-500 px-4 py-1 border-2 border-amber-600 shadow-md text-sm uppercase tracking-wider">
          {currentLine.speaker}
        </div>
      </div>

      {/* Dialogue Content */}
      <div className="flex-1 flex flex-col justify-between">
        <motion.p 
          key={currentIndex}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-lg md:text-xl font-medium mt-4"
        >
          {currentLine.text[language] || currentLine.text['pt']}
        </motion.p>
        
        <div className="mt-6 flex justify-end">
          <button 
            onClick={handleNext}
            className={`px-6 py-2 bg-${primaryColor}-500 text-white rounded-lg hover:bg-${primaryColor}-600 transition font-bold`}
          >
            {currentIndex < dialogues.length - 1 ? t.next : t.finish}
          </button>
        </div>
      </div>
    </div>
  );
}
