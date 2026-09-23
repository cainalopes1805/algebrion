import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { sounds } from '../utils/audio';
import { Flame, Heart, Coins, Volume2, VolumeX, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const navigate = useNavigate();
  const {
    language,
    setLanguage,
    coins,
    hearts,
    maxHearts,
    streak,
    soundEnabled,
    setSoundEnabled,
    refillHearts,
  } = useAppStore();

  const [showHeartModal, setShowHeartModal] = useState(false);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next) sounds.playClick();
  };

  const handleRefill = () => {
    const ok = refillHearts(50);
    if (ok) {
      setShowHeartModal(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-2.5 flex items-center justify-between shadow-lg">
        {/* Brand Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => {
            sounds.playClick();
            navigate('/');
          }}
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-700 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-amber-600/30 border-b-4 border-amber-800 group-hover:scale-105 transition-transform">
            <span>A</span>
          </div>
          <div className="hidden sm:block">
            <span className="font-serif font-black text-xl tracking-tight text-slate-100">
              Algebri<span className="text-amber-500 font-sans">on</span>
            </span>
          </div>
        </div>

        {/* Game Stats (Duolingo Style: Streak, Gems, Hearts) */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Streak */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-orange-950/40 border border-orange-500/30 text-orange-400 font-black text-sm"
            title="Ofensiva diária"
          >
            <Flame size={18} className="fill-orange-500 text-orange-400 animate-pulse" />
            <span>{streak}</span>
          </div>

          {/* Coins / Gold */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-400 font-black text-sm"
            title="Ouro acumulado"
          >
            <Coins size={18} className="fill-amber-400 text-amber-400" />
            <span>{coins}</span>
          </div>

          {/* Hearts */}
          <button
            onClick={() => {
              sounds.playClick();
              setShowHeartModal(true);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-400 font-black text-sm hover:bg-rose-900/40 transition-colors cursor-pointer"
            title="Vidas restantes - Clique para recuperar"
          >
            <Heart size={18} className="fill-rose-500 text-rose-400" />
            <span>{hearts}</span>
            {hearts < maxHearts && <Plus size={14} className="text-rose-400" />}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
            title={soundEnabled ? 'Silenciar Áudio' : 'Ativar Efeitos Sonoros'}
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          {/* Quick Language */}
          <select
            value={language}
            onChange={(e) => {
              sounds.playClick();
              setLanguage(e.target.value);
            }}
            className="bg-slate-900 border border-slate-800 text-slate-300 font-bold text-xs rounded-xl px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
          >
            <option value="pt">PT</option>
            <option value="en">EN</option>
            <option value="es">ES</option>
            <option value="fr">FR</option>
          </select>
        </div>
      </header>

      {/* Hearts Modal */}
      <AnimatePresence>
        {showHeartModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-center"
            >
              <div className="w-16 h-16 rounded-full bg-rose-500/20 border-2 border-rose-500 flex items-center justify-center mx-auto mb-4 text-3xl">
                ❤️
              </div>
              <h3 className="text-2xl font-black text-slate-100 mb-2">Vidas Mágicas</h3>
              <p className="text-sm font-medium text-slate-400 mb-6">
                Você possui <span className="font-bold text-rose-400">{hearts} de {maxHearts}</span> vidas. Erros nas lições consomem vidas.
              </p>

              <div className="space-y-3">
                <button
                  onClick={handleRefill}
                  disabled={coins < 50 || hearts >= maxHearts}
                  className={`w-full py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider border-b-4 transition-all flex items-center justify-center gap-2 ${
                    coins >= 50 && hearts < maxHearts
                      ? 'bg-amber-500 border-amber-700 text-slate-950 hover:bg-amber-400 cursor-pointer'
                      : 'bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <span>Recarregar Tudo (50 Ouro)</span>
                  <Coins size={16} />
                </button>

                <button
                  onClick={() => setShowHeartModal(false)}
                  className="w-full py-3 rounded-2xl font-bold text-sm text-slate-400 hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
