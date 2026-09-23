import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { translations } from '../i18n/translations';
import { missionsData } from '../data/missions';
import Layout from '../components/Layout';
import { Lock, Play } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const navigate = useNavigate();
  const { language, unlockedMissions } = useAppStore();
  const t = translations[language] || translations['pt'];

  // Posições no mapa (X horizontal, e o Y é determinado pelo fluxo flex-col)
  // X vai de 0 (esquerda) a 100 (direita)
  const mapLayout = [
    { x: 30, decor: '🌲', terrain: 'bg-emerald-900/20' },
    { x: 70, decor: '⛰️', terrain: 'bg-slate-700/20' },
    { x: 20, decor: '🌋', terrain: 'bg-rose-900/20' },
    { x: 80, decor: '🏰', terrain: 'bg-indigo-900/20' },
  ];

  return (
    <Layout>
      <div className="max-w-md mx-auto w-full pt-8 pb-40 flex flex-col items-center relative overflow-hidden bg-[#0f172a]">
        
        {/* Fundo do Mapa (Textura e Regiões) */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <svg width="100%" height="100%">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/>
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)"/>
          </svg>
        </div>

        <h1 className="text-3xl font-black text-center mb-16 text-amber-500 px-4 drop-shadow-md tracking-widest uppercase relative z-10 border-b-2 border-amber-900/50 pb-4">
          Mapa do Reino
        </h1>

        <div className="relative w-full px-8 flex flex-col gap-24">
          
          {/* Trilha Desenhada em SVG no fundo */}
          <div className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none z-0 overflow-visible">
             <svg className="w-full h-full" preserveAspectRatio="none">
               <path 
                 d="M 30% 50 Q 50% 150 70% 250 T 20% 450" 
                 fill="none" 
                 stroke="#334155" 
                 strokeWidth="12" 
                 strokeDasharray="20 15"
                 strokeLinecap="round"
               />
               {/* Isso é uma trilha simplificada. Como o SVG 'preserveAspectRatio="none"' pode distorcer,
                   vamos usar CSS puro com divs interligadas logo abaixo para garantir perfeição no mobile. */}
             </svg>
          </div>

          {missionsData.map((mission, index) => {
            const isUnlocked = unlockedMissions.includes(mission.id);
            const pos = mapLayout[index % mapLayout.length];
            
            // Lógica para desenhar a linha css conectando ao próximo nó
            const nextPos = mapLayout[(index + 1) % mapLayout.length];
            const isGoingRight = nextPos.x > pos.x;

            return (
              <div key={mission.id} className="relative z-10 w-full flex" style={{ justifyContent: pos.x > 50 ? 'flex-end' : 'flex-start', paddingLeft: pos.x <= 50 ? `${pos.x}%` : 0, paddingRight: pos.x > 50 ? `${100 - pos.x}%` : 0 }}>
                
                {/* Região do Terreno (Blob de cor ao fundo) */}
                <div className={`absolute w-64 h-64 ${pos.terrain} rounded-full blur-3xl -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}></div>

                {/* Linha pontilhada CSS para o próximo nó */}
                {index < missionsData.length - 1 && (
                  <div className={`absolute top-1/2 -z-10 border-b-8 border-dashed border-slate-700 w-48 h-32 
                    ${isGoingRight ? 'left-1/2 border-r-8 rounded-br-[100px]' : 'right-1/2 border-l-8 rounded-bl-[100px]'}`} 
                    style={{ transform: 'translateY(2rem)' }}
                  ></div>
                )}

                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="flex flex-col items-center group relative"
                >
                  
                  {/* Elemento Decorativo (Floresta, Castelo, etc) */}
                  <motion.div 
                    animate={{ y: [0, -5, 0] }} 
                    transition={{ repeat: Infinity, duration: 4, delay: index * 0.3 }}
                    className="absolute -top-12 text-6xl drop-shadow-2xl"
                  >
                    {pos.decor}
                  </motion.div>

                  {/* O nó (Botão) */}
                  <motion.button 
                    onClick={() => isUnlocked && navigate(`/mission/${mission.id}`)}
                    whileHover={isUnlocked ? { scale: 1.1 } : {}}
                    whileTap={isUnlocked ? { scale: 0.9 } : {}}
                    className={`w-24 h-24 rounded-full flex items-center justify-center border-b-8 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all relative z-10 mt-6
                      ${isUnlocked 
                        ? `bg-amber-500 border-amber-700 text-slate-900 ring-8 ring-amber-900/30` 
                        : 'bg-slate-800 border-slate-900 text-slate-600 ring-8 ring-slate-900/50'}`}
                  >
                    {isUnlocked ? (
                      <span className="text-3xl font-black">
                        {index + 1}
                      </span>
                    ) : (
                      <Lock size={32} />
                    )}
                  </motion.button>

                  {/* Nome do Local (Placa) */}
                  <div className={`mt-4 px-4 py-2 rounded-xl border-b-4 shadow-xl z-20 transition-all text-center max-w-[160px]
                    ${isUnlocked ? 'bg-slate-800 border-slate-900' : 'bg-slate-900 border-black opacity-80'}`}
                  >
                    <p className={`text-xs font-bold leading-tight ${isUnlocked ? 'text-amber-400' : 'text-slate-500'}`}>
                      {mission.title[language] || mission.title['pt']}
                    </p>
                  </div>

                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
