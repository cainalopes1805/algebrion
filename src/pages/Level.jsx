import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { translations } from '../i18n/translations';
import { missionsData } from '../data/missions';
import Layout from '../components/Layout';
import ActivityEngine from '../components/ActivityEngine';
import { motion } from 'framer-motion';

export default function Level() {
  const { missionId, levelId } = useParams();
  const navigate = useNavigate();
  const { language, addAchievement } = useAppStore();
  const t = translations[language] || translations['pt'];

  const mission = missionsData.find(m => m.id === parseInt(missionId));
  const level = mission?.levels.find(l => l.id === parseInt(levelId));

  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [levelCompleted, setLevelCompleted] = useState(false);

  if (!level) return <Layout><div>Level not found</div></Layout>;

  const handleActivityComplete = (success) => {
    if (currentActivityIndex < level.activities.length - 1) {
      setCurrentActivityIndex(currentActivityIndex + 1);
    } else {
      setLevelCompleted(true);
      if (mission.id === 1 && level.id === 1) {
        addAchievement('Mestre das Matrizes Iniciante');
      }
    }
  };

  const progressPercentage = ((currentActivityIndex) / level.activities.length) * 100;

  return (
    <Layout>
      <div className="max-w-md mx-auto w-full p-4 flex flex-col min-h-[calc(100vh-80px)]">
        {!levelCompleted ? (
          <>
            <div className="mb-6 pt-4">
              <div className="flex justify-between text-sm font-black mb-2 text-slate-400 uppercase tracking-widest">
                <span>Fase {level.id}</span>
                <span>{currentActivityIndex + 1} / {level.activities.length}</span>
              </div>
              {/* Barra de Progresso elegante */}
              <div className="w-full bg-slate-800 h-4 rounded-full overflow-hidden shadow-inner relative">
                <motion.div 
                  className="bg-amber-500 h-full rounded-full relative" 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="absolute top-1 bottom-1 left-2 right-2 bg-white/20 rounded-full"></div>
                </motion.div>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center">
              <ActivityEngine 
                key={currentActivityIndex} 
                activity={level.activities[currentActivityIndex]} 
                onComplete={handleActivityComplete} 
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <motion.div 
              animate={{ y: [0, -15, 0], rotate: [0, -5, 5, 0] }} 
              transition={{ repeat: Infinity, duration: 2 }} 
              className="text-8xl mb-8 drop-shadow-lg"
            >
              🎓
            </motion.div>
            <h1 className="text-3xl font-black mb-3 text-white">Fase Concluída!</h1>
            <p className="text-lg mb-10 font-bold text-slate-400">Você dominou esses feitiços e ganhou ouro.</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/mission/${mission.id}`)}
              className="w-full py-4 bg-amber-500 border-b-4 border-amber-700 text-slate-900 font-black rounded-2xl text-xl hover:bg-amber-400 transition-colors shadow-lg uppercase tracking-wide"
            >
              Continuar
            </motion.button>
          </div>
        )}
      </div>
    </Layout>
  );
}
