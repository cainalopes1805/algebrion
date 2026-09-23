import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { translations } from '../i18n/translations';
import { Map, Store, Shield } from 'lucide-react';
import { Map, UserCircle } from 'lucide-react';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useAppStore();
  const t = translations[language] || translations['pt'];

  const navItems = [
    { path: '/', icon: Map, label: t.home },
    { path: '/customization', icon: Store, label: t.store },
    // A aba 'customization' agora serve para Perfil e Loja
    { path: '/', icon: Map, label: t.home || 'Jornada' },
    { path: '/customization', icon: UserCircle, label: t.customization || 'Perfil' },
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-slate-900 border-t border-slate-800 pb-safe z-50 md:sticky md:bottom-auto md:top-0 md:h-screen md:w-24 md:border-t-0 md:border-r flex md:flex-col items-center justify-around md:justify-start md:pt-8 md:gap-8 p-2">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center w-16 h-14 md:w-full md:h-20 rounded-2xl transition-all ${
              isActive 
                ? 'text-amber-500 bg-amber-500/10 border border-amber-500/20' 
                : 'text-slate-500 hover:bg-slate-800'
            }`}
          >
            <Icon size={24} className={isActive ? 'fill-amber-500/20' : ''} />
            <span className="text-[10px] font-bold mt-1">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

