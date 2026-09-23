import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { translations } from '../i18n/translations';
import { missionsData } from '../data/missions';
import TopBar from '../components/TopBar';
import AchievementPopup from '../components/AchievementPopup';
import { Map, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const navigate = useNavigate();
  const { language, theme, primaryColor, unlockedMissions } = useAppStore();
  const t = translations[language] || translations['pt'];

  return (
    <div className={`min-h-screen flex flex-col font-sans ${theme === 'dark' ? 'bg-indigo-950 text-indigo-100' : 'bg-green-100 text-green-950'}`}>
      <TopBar />
      <AchievementPopup />

      <main className="flex-1 p-8 max-w-3xl mx-auto w-full relative overflow-hidden">
        
        {/* Animated Background Elements */}
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute top-10 left-10 text-6xl opacity-20">☁️</motion.div>
        <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 5 }} className="absolute top-32 right-10 text-8xl opacity-20">🏰</motion.div>

        <h1 className="text-5xl font-black text-center mb-16 flex items-center justify-center gap-4 relative z-10">
          <motion.div whileHover={{ scale: 1.2, rotate: 10 }}>
            <Map size={48} className={`text-${primaryColor}-500 drop-shadow-md`} />
          </motion.div>
          <span className="drop-shadow-lg text-white" style={{ WebkitTextStroke: '2px #1f2937' }}>{t.missions}</span>
        </h1>

        <div className="relative flex flex-col items-center pb-24 z-10">
          {/* Trilha visual */}
          <div className="absolute top-10 bottom-10 w-6 bg-white/40 dark:bg-black/20 rounded-full z-0 left-1/2 transform -translate-x-1/2 shadow-inner"></div>

          {missionsData.map((mission, index) => {
            const isUnlocked = unlockedMissions.includes(mission.id);
            const isLeft = index % 2 === 0;
            const translationClass = isLeft ? 'md:-translate-x-28' : 'md:translate-x-28';

            return (
              <motion.div 
                key={mission.id} 
                className={`relative z-10 w-full flex justify-center mb-12 ${translationClass}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, type: 'spring', bounce: 0.5 }}
              >
                <motion.div 
                  onClick={() => isUnlocked && navigate(`/mission/${mission.id}`)}
                  whileHover={isUnlocked ? { scale: 1.1, rotate: isLeft ? -3 : 3 } : {}}
                  whileTap={isUnlocked ? { scale: 0.95 } : {}}
                  className={`w-64 relative rounded-3xl p-6 border-b-8 shadow-xl transition-colors cursor-pointer flex flex-col items-center text-center
                    ${isUnlocked 
                      ? `bg-white border-${primaryColor}-500 dark:bg-indigo-800 dark:border-${primaryColor}-400 ring-4 ring-${primaryColor}-300` 
                      : 'bg-gray-300 border-gray-400 dark:bg-gray-800 dark:border-gray-900 ring-4 ring-gray-400 opacity-90'}`}
                >
                  {!isUnlocked && (
                    <div className="absolute -top-4 -right-4 bg-gray-600 text-white p-3 rounded-full shadow-lg border-4 border-gray-300">
                      <Lock size={24} />
                    </div>
                  )}
                  
                  {/* Ícone de Estrela/Nó */}
                  <motion.div 
                    animate={isUnlocked ? { y: [0, -5, 0] } : {}} 
                    transition={{ repeat: Infinity, duration: 2, delay: index * 0.3 }}
                    className={`w-20 h-20 rounded-full mb-4 flex items-center justify-center text-4xl font-black shadow-lg border-4
                    ${isUnlocked ? `bg-${primaryColor}-400 text-white border-white` : 'bg-gray-400 text-gray-200 border-gray-300'}`}>
                    {isUnlocked ? '🌟' : index + 1}
                  </motion.div>

                  <h3 className={`text-2xl font-black mb-2 ${isUnlocked ? 'text-gray-800 dark:text-white' : 'text-gray-500'}`}>
                    {mission.title[language] || mission.title['pt']}
                  </h3>
                  <p className={`text-sm font-bold ${isUnlocked ? 'text-gray-500 dark:text-indigo-200' : 'text-gray-400'}`}>
                    {mission.description[language] || mission.description['pt']}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
