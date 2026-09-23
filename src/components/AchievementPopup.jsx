import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { Award } from 'lucide-react';
import { translations } from '../i18n/translations';

export default function AchievementPopup() {
  const { achievements, language } = useAppStore();
  const [popup, setPopup] = useState(null);
  const [lastCount, setLastCount] = useState(achievements.length);
  const t = translations[language] || translations['pt'];

  useEffect(() => {
    if (achievements.length > lastCount) {
      const newAchievement = achievements[achievements.length - 1];
      setPopup(newAchievement);
      setLastCount(achievements.length);
      
      const timer = setTimeout(() => {
        setPopup(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [achievements, lastCount]);

  return (
    <AnimatePresence>
      {popup && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 20 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-16 right-4 z-50 bg-yellow-400 text-yellow-900 px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 border-2 border-yellow-500"
        >
          <Award size={32} />
          <div>
            <div className="font-bold text-sm uppercase">{t.achievements}!</div>
            <div className="text-lg font-black">{popup}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
