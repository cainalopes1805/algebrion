import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { translations } from '../i18n/translations';
import { Coins, Settings, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { language, setLanguage, coins } = useAppStore();
  const navigate = useNavigate();
  const t = translations[language] || translations['pt'];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 p-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
        {/* Logo Icon */}
        <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center text-slate-950 border-b-4 border-amber-800 shadow-inner overflow-hidden relative">
          <div className="absolute font-serif text-2xl font-black italic tracking-tighter">A</div>
          <div className="absolute w-full h-full bg-gradient-to-tr from-transparent to-white/20"></div>
        </div>
        {/* Logo Text */}
        <h1 className="text-2xl font-black tracking-tight text-slate-100 hidden sm:block">
          Alge<span className="text-amber-500">brion</span>
        </h1>
      </div>

      <div className="flex items-center gap-6">
        {/* Idioma - Trocador rápido */}
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-slate-800 border border-slate-700 text-slate-200 rounded-xl px-3 py-1 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
          className="bg-slate-800 border border-slate-700 text-slate-200 rounded-xl px-2 py-1 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <option value="pt">PT</option>
          <option value="en">EN</option>
          <option value="es">ES</option>
          <option value="fr">FR</option>
        </select>
      </div>

      <div className="flex items-center gap-6">
        {/* Moedas */}
        <div className="flex items-center gap-2 text-yellow-400 font-black">
          <Coins size={20} className="fill-yellow-400" />
        <div className="flex items-center gap-2 text-yellow-400 font-black bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
          <Coins size={18} className="fill-yellow-400" />
          <span>{coins}</span>
        </div>

        {/* Botão de Configurações */}
        <button onClick={() => navigate('/customization')} className="text-slate-400 hover:text-amber-400 transition-colors">
          <Settings size={22} />
        </button>
      </div>
    </header>
  );
}

