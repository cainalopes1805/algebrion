import React from 'react';
import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { translations } from '../i18n/translations';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, UserPlus, LogOut, Check } from 'lucide-react';

export default function Customization() {
  const { language, coins } = useAppStore();
  const { 
    language, setLanguage, coins, 
    profiles, activeProfileId, switchProfile, createProfile,
    theme, setTheme, primaryColor, setPrimaryColor
  } = useAppStore();
  
  const [activeTab, setActiveTab] = useState('perfil'); // perfil, loja, config
  const [newProfileName, setNewProfileName] = useState('');
  const t = translations[language] || translations['pt'];

  const storeItems = [
    { icon: '🧪', name: 'Poção de XP', price: 50 }, 
    { icon: '❤️', name: 'Elixir de Vida', price: 100 },
    { icon: '🛡️', name: 'Escudo Arcano', price: 200 },
    { icon: '🦉', name: 'Familiar Coruja', price: 500 }
  ];

  const activeProfileData = profiles.find(p => p.id === activeProfileId) || profiles[0];

  const prizes = [
    { icon: '👑', name: 'Mestre da Ordem', unlocked: true },
    { icon: '📜', name: 'Pergaminho Real', unlocked: false },
    { icon: '⚔️', name: 'Espada Lendária', unlocked: false },
    { icon: '💎', name: 'Joia da Coroa', unlocked: false }
  ];
    { id: 'Mestre das Matrizes Iniciante', icon: '👑', name: 'Mestre Iniciante' },
    { id: 'Mestre da Soma', icon: '📜', name: 'Pergaminho Real' },
    { id: 'Multiplicador', icon: '⚔️', name: 'Espada Lendária' },
    { id: 'Identidade Perfeita', icon: '💎', name: 'Joia da Coroa' }
  ].map(p => ({
    ...p,
    unlocked: activeProfileData.achievements.includes(p.id)
  }));

  const handleCreateProfile = () => {
    if (newProfileName.trim() === '') return;
    createProfile(newProfileName, '🧙‍♂️');
    setNewProfileName('');
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto w-full p-6 pb-24 relative overflow-hidden">
        
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-900/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Cabeçalho Perfil */}
        <div className="flex items-center gap-6 mb-10 bg-slate-800 p-6 rounded-3xl border-b-4 border-slate-700 shadow-lg relative z-10">
        <div className="flex items-center gap-6 mb-6 bg-slate-800 p-6 rounded-3xl border-b-4 border-slate-700 shadow-lg relative z-10">
          <div className="w-20 h-20 rounded-full bg-slate-900 border-4 border-amber-500 flex items-center justify-center text-4xl shadow-inner">
            🧙‍♂️
            {activeProfileData.avatar}
          </div>
          <div>
            <h2 className="text-2xl font-black text-amber-500 mb-1">Mago Aprendiz</h2>
            <h2 className="text-2xl font-black text-amber-500 mb-1">{activeProfileData.name}</h2>
            <p className="text-slate-300 font-bold flex items-center gap-2">
              <span className="text-yellow-400">🪙</span> {coins} Ouro
            </p>
          </div>
        </div>

        {/* Loja */}
        <section className="mb-10 relative z-10">
          <h3 className="text-xl font-black text-slate-400 mb-4 px-2 uppercase tracking-widest border-b border-slate-800 pb-2">Mercador Negro</h3>
          <div className="grid grid-cols-2 gap-4">
            {storeItems.map((item, idx) => (
              <motion.div 
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                key={idx} 
                className="bg-slate-800 p-4 rounded-2xl border-b-4 border-slate-700 text-center flex flex-col items-center shadow-md cursor-pointer"
              >
                <div className="text-4xl mb-3 drop-shadow-md">{item.icon}</div>
                <div className="font-bold text-sm mb-3 text-slate-200">{item.name}</div>
                <button className="w-full bg-amber-600 hover:bg-amber-500 text-slate-950 font-black px-4 py-2 rounded-xl border-b-4 border-amber-800 shadow-sm text-sm transition-colors">
                  {item.price} Ouro
                </button>
              </motion.div>
            ))}
          </div>
        </section>
        {/* Tabs */}
        <div className="flex justify-between bg-slate-800 rounded-full p-2 mb-8 relative z-10 shadow-md">
          {['perfil', 'loja', 'config'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 font-black uppercase text-xs tracking-wider rounded-full transition-colors ${activeTab === tab ? 'bg-amber-600 text-slate-900' : 'text-slate-400 hover:text-slate-200'}`}
            >
              {tab === 'perfil' ? 'Perfil' : tab === 'loja' ? 'Loja' : 'Configurações'}
            </button>
          ))}
        </div>

        {/* Conquistas (Estante) */}
        <section className="relative z-10">
          <h3 className="text-xl font-black text-slate-400 mb-4 px-2 uppercase tracking-widest border-b border-slate-800 pb-2">Tesouro Real</h3>
          <div className="bg-slate-800 p-6 rounded-3xl border-b-4 border-slate-700 shadow-lg grid grid-cols-2 gap-6 relative overflow-hidden">
            {/* Madeira sutil de fundo para estante */}
            <div className="absolute inset-0 border-8 border-slate-900/50 pointer-events-none rounded-3xl"></div>
            
            {prizes.map((prize, idx) => (
              <div key={idx} className="flex flex-col items-center relative z-10">
                <div className={`w-20 h-20 flex items-center justify-center text-4xl rounded-2xl mb-3 shadow-inner ${prize.unlocked ? 'bg-amber-900/30 border-2 border-amber-500' : 'bg-slate-700 border-2 border-slate-600 opacity-50 grayscale'}`}>
                  {prize.icon}
        <AnimatePresence mode="wait">
          {/* TAB: PERFIL & CONQUISTAS */}
          {activeTab === 'perfil' && (
            <motion.section key="perfil" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="relative z-10">
              <h3 className="text-xl font-black text-slate-400 mb-4 px-2 uppercase tracking-widest border-b border-slate-800 pb-2">Tesouro Real</h3>
              <div className="bg-slate-800 p-6 rounded-3xl border-b-4 border-slate-700 shadow-lg grid grid-cols-2 gap-6 relative overflow-hidden">
                <div className="absolute inset-0 border-8 border-slate-900/50 pointer-events-none rounded-3xl"></div>
                {prizes.map((prize, idx) => (
                  <div key={idx} className="flex flex-col items-center relative z-10">
                    <div className={`w-20 h-20 flex items-center justify-center text-4xl rounded-2xl mb-3 shadow-inner ${prize.unlocked ? 'bg-amber-900/30 border-2 border-amber-500' : 'bg-slate-700 border-2 border-slate-600 opacity-50 grayscale'}`}>
                      {prize.icon}
                    </div>
                    <div className={`text-center font-bold text-xs uppercase tracking-wide ${prize.unlocked ? 'text-amber-400' : 'text-slate-500'}`}>
                      {prize.unlocked ? prize.name : 'Bloqueado'}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* TAB: LOJA */}
          {activeTab === 'loja' && (
            <motion.section key="loja" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="relative z-10">
              <h3 className="text-xl font-black text-slate-400 mb-4 px-2 uppercase tracking-widest border-b border-slate-800 pb-2">Mercador Negro</h3>
              <div className="grid grid-cols-2 gap-4">
                {storeItems.map((item, idx) => (
                  <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }} key={idx} className="bg-slate-800 p-4 rounded-2xl border-b-4 border-slate-700 text-center flex flex-col items-center shadow-md cursor-pointer">
                    <div className="text-4xl mb-3 drop-shadow-md">{item.icon}</div>
                    <div className="font-bold text-sm mb-3 text-slate-200">{item.name}</div>
                    <button className="w-full bg-amber-600 hover:bg-amber-500 text-slate-950 font-black px-4 py-2 rounded-xl border-b-4 border-amber-800 shadow-sm text-sm transition-colors">
                      {item.price} Ouro
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* TAB: CONFIGURAÇÕES & PERFIS */}
          {activeTab === 'config' && (
            <motion.section key="config" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="relative z-10 space-y-8">
              
              {/* Gerenciamento de Perfis */}
              <div>
                <h3 className="text-xl font-black text-slate-400 mb-4 px-2 uppercase tracking-widest border-b border-slate-800 pb-2">Seus Grimórios (Perfis)</h3>
                <div className="space-y-3">
                  {profiles.map(p => (
                    <div key={p.id} onClick={() => switchProfile(p.id)} className={`flex items-center justify-between p-4 rounded-2xl border-b-4 cursor-pointer transition-colors ${p.id === activeProfileId ? 'bg-amber-900/40 border-amber-600 ring-2 ring-amber-500' : 'bg-slate-800 border-slate-700 hover:bg-slate-700'}`}>
                      <div className="flex items-center gap-4">
                        <span className="text-3xl">{p.avatar}</span>
                        <div>
                          <p className={`font-black ${p.id === activeProfileId ? 'text-amber-400' : 'text-slate-200'}`}>{p.name}</p>
                          <p className="text-xs font-bold text-slate-500">{p.coins} Ouro</p>
                        </div>
                      </div>
                      {p.id === activeProfileId && <Check className="text-amber-500" />}
                    </div>
                  ))}
                  
                  {/* Novo Perfil */}
                  <div className="flex gap-2 mt-4">
                    <input 
                      type="text" 
                      placeholder="Novo Mago..." 
                      value={newProfileName}
                      onChange={(e) => setNewProfileName(e.target.value)}
                      className="flex-1 bg-slate-800 border-2 border-slate-700 rounded-xl px-4 text-slate-200 focus:outline-none focus:border-amber-500"
                    />
                    <button onClick={handleCreateProfile} className="bg-slate-700 p-4 rounded-xl text-amber-500 hover:bg-slate-600 transition-colors">
                      <UserPlus size={24} />
                    </button>
                  </div>
                </div>
                <div className={`text-center font-bold text-xs uppercase tracking-wide ${prize.unlocked ? 'text-amber-400' : 'text-slate-500'}`}>
                  {prize.unlocked ? prize.name : 'Bloqueado'}
              </div>

              {/* Personalização Visual */}
              <div>
                <h3 className="text-xl font-black text-slate-400 mb-4 px-2 uppercase tracking-widest border-b border-slate-800 pb-2">Aura Mágica (Cores)</h3>
                <div className="flex gap-4 p-4 bg-slate-800 rounded-2xl border-b-4 border-slate-700">
                  {['amber', 'emerald', 'purple', 'rose', 'cyan'].map((color) => (
                    <button 
                      key={color}
                      onClick={() => setPrimaryColor(color)}
                      className={`w-12 h-12 rounded-full border-4 shadow-lg bg-${color}-500 transition-all ${primaryColor === color ? `border-slate-900 ring-4 ring-${color}-400` : 'border-transparent opacity-50'}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

            </motion.section>
          )}
        </AnimatePresence>

      </div>
    </Layout>
  );
}
