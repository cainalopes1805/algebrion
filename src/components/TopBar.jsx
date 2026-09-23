import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { translations } from '../i18n/translations';
import { Coins, Settings, Home, Award } from 'lucide-react';

export default function TopBar() {
  const navigate = useNavigate();
  const { language, setLanguage, coins, theme, primaryColor } = useAppStore();
  const t = translations[language] || translations['pt'];

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className={`p-4 flex items-center justify-between shadow-md ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/')} className={`flex items-center gap-2 hover:text-${primaryColor}-500 transition-colors`}>
          <Home size={24} />
          <span className="font-bold hidden sm:block">Algebrion</span>
        </button>
      </div>

      <div className="flex items-center gap-6">
        {/* Moedas */}
        <div className="flex items-center gap-2 text-yellow-500 font-bold">
          <Coins size={20} />
          <span>{coins}</span>
        </div>

        {/* Conquistas Rápidas */}
        <button onClick={() => navigate('/customization')} className={`hover:text-${primaryColor}-500 transition-colors`} title={t.achievements}>
          <Award size={20} />
        </button>

        {/* Idioma */}
        <select 
          value={language} 
          onChange={handleLanguageChange}
          className={`border-2 rounded p-1 text-sm font-bold ${theme === 'dark' ? 'bg-stone-800 border-stone-600 text-stone-200' : 'bg-amber-50 border-amber-800 text-amber-900'}`}
        >
          <option value="pt">PT</option>
          <option value="en">EN</option>
          <option value="es">ES</option>
          <option value="fr">FR</option>
        </select>

        {/* Configurações / Personalização */}
        <button onClick={() => navigate('/customization')} className={`hover:text-${primaryColor}-500 transition-colors`} title={t.customization}>
          <Settings size={20} />
        </button>
      </div>
    </div>
  );
}
