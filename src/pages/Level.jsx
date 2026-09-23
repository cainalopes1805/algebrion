import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { translations } from '../i18n/translations';
import { missionsData } from '../data/missions';
import TopBar from '../components/TopBar';
import ActivityEngine from '../components/ActivityEngine';
import AchievementPopup from '../components/AchievementPopup';

export default function Level() {
  const { missionId, levelId } = useParams();
  const navigate = useNavigate();
  const { language, theme, addAchievement, primaryColor } = useAppStore();
  const t = translations[language] || translations['pt'];

  const mission = missionsData.find(m => m.id === parseInt(missionId));
  const level = mission?.levels.find(l => l.id === parseInt(levelId));

  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [levelCompleted, setLevelCompleted] = useState(false);

  if (!level) return <div>Level not found</div>;

  const handleActivityComplete = (success) => {
    if (currentActivityIndex < level.activities.length - 1) {
      setCurrentActivityIndex(currentActivityIndex + 1);
    } else {
      setLevelCompleted(true);
      // Simula ganho de conquista no final do nivel 1 da missao 1
      if (mission.id === 1 && level.id === 1) {
        addAchievement('Mestre das Matrizes Iniciante');
      }
    }
  };

  const progressPercentage = ((currentActivityIndex) / level.activities.length) * 100;

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-blue-50 text-gray-800'}`}>
      <TopBar />
      <AchievementPopup />
      
      <main className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full flex flex-col">
        {!levelCompleted ? (
          <>
            <div className="mb-6">
              <div className="flex justify-between text-sm font-bold mb-2 text-gray-600 dark:text-gray-300">
                <span>{t.level || 'Nível'} {level.id}</span>
                <span>{currentActivityIndex + 1} / {level.activities.length}</span>
              </div>
              <div className="w-full bg-gray-300 dark:bg-gray-700 h-4 rounded-full overflow-hidden">
                <div 
                  className={`bg-${primaryColor}-500 h-full transition-all duration-500`} 
                  style={{ width: `${progressPercentage}%` }}
                />
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
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="text-4xl font-black mb-4">Nível Concluído!</h1>
            <p className="text-xl mb-8">Você terminou todas as 10 atividades com sucesso.</p>
            <button 
              onClick={() => navigate(`/mission/${mission.id}`)}
              className={`px-8 py-4 bg-${primaryColor}-500 text-white font-bold rounded-xl text-xl hover:bg-${primaryColor}-600 transition`}
            >
              Voltar para a Missão
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
