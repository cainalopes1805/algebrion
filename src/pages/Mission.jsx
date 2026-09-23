import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { translations } from '../i18n/translations';
import { missionsData } from '../data/missions';
import Layout from '../components/Layout';
import DialogueBox from '../components/DialogueBox';
import { motion } from 'framer-motion';

export default function Mission() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useAppStore();
  const t = translations[language] || translations['pt'];
  
  const mission = missionsData.find(m => m.id === parseInt(id));
  const [showDialogue, setShowDialogue] = useState(true);

  if (!mission) return <Layout><div>Mission not found</div></Layout>;

  const handleDialogueComplete = () => {
    setShowDialogue(false);
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto w-full p-6 pb-24">
        <h1 className="text-3xl font-black text-center mb-10 text-slate-100">
          {mission.title[language] || mission.title['pt']}
        </h1>

        {showDialogue && mission.dialogues.intro.length > 0 ? (
          <DialogueBox dialogues={mission.dialogues.intro} onComplete={handleDialogueComplete} />
        ) : (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-6 text-slate-300 px-2 uppercase tracking-wide">Fases Disponíveis</h2>
            <div className="grid gap-4">
              {mission.levels.map((level, idx) => (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  key={level.id}
                  onClick={() => navigate(`/mission/${mission.id}/level/${level.id}`)}
                  className="p-5 bg-slate-800 rounded-2xl shadow-md border-b-4 border-slate-700 flex justify-between items-center text-left"
                >
                  <div>
                    <h3 className="text-lg font-black text-slate-100">{level.title[language] || level.title['pt'] || `Fase ${idx + 1}`}</h3>
                    <p className="text-amber-500 font-bold text-sm mt-1">{level.activities.length} Desafios</p>
                  </div>
                  <div className="w-12 h-12 bg-slate-900 text-slate-300 rounded-xl flex items-center justify-center font-black text-xl shadow-inner border border-slate-700">
                    {idx + 1}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
