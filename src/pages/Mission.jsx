import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { translations } from '../i18n/translations';
import { missionsData } from '../data/missions';
import TopBar from '../components/TopBar';
import DialogueBox from '../components/DialogueBox';

export default function Mission() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, theme, primaryColor } = useAppStore();
  const t = translations[language] || translations['pt'];
  
  const mission = missionsData.find(m => m.id === parseInt(id));
  const [showDialogue, setShowDialogue] = useState(true);

  if (!mission) return <div>Mission not found</div>;

  const handleDialogueComplete = () => {
    setShowDialogue(false);
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-blue-50 text-gray-800'}`}>
      <TopBar />
      
      <main className="flex-1 p-8 max-w-5xl mx-auto w-full">
        <h1 className="text-4xl font-extrabold text-center mb-8">
          {mission.title[language] || mission.title['pt']}
        </h1>

        {showDialogue && mission.dialogues.intro.length > 0 ? (
          <DialogueBox dialogues={mission.dialogues.intro} onComplete={handleDialogueComplete} />
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Escolha um Nível</h2>
            <div className="grid gap-4">
              {mission.levels.map((level, idx) => (
                <button
                  key={level.id}
                  onClick={() => navigate(`/mission/${mission.id}/level/${level.id}`)}
                  className={`p-6 bg-white dark:bg-gray-800 rounded-xl shadow border-2 border-${primaryColor}-300 hover:border-${primaryColor}-500 transition-colors flex justify-between items-center text-left`}
                >
                  <div>
                    <h3 className="text-xl font-bold">{level.title[language] || level.title['pt']}</h3>
                    <p className="text-gray-500 text-sm mt-1">{level.activities.length} {t.activities || 'Atividades'}</p>
                  </div>
                  <div className={`w-12 h-12 bg-${primaryColor}-100 dark:bg-${primaryColor}-900 text-${primaryColor}-600 rounded-full flex items-center justify-center font-bold text-xl`}>
                    {idx + 1}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
