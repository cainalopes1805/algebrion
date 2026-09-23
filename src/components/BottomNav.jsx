import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { sounds } from '../utils/audio';
import { Map, Store, Trophy, User } from 'lucide-react';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Map, label: 'Jornada' },
    { path: '/customization?tab=loja', icon: Store, label: 'Mercador' },
    { path: '/customization?tab=conquistas', icon: Trophy, label: 'Conquistas' },
    { path: '/customization?tab=perfil', icon: User, label: 'Perfil' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800/80 px-2 py-2 flex items-center justify-around md:sticky md:top-0 md:h-screen md:w-28 md:flex-col md:justify-start md:pt-10 md:gap-8 md:border-t-0 md:border-r">
      {navItems.map((item) => {
        const isExact = location.pathname === item.path;
        const isCustomizationTab =
          location.pathname === '/customization' && location.search === item.path.split('/customization')[1];
        const isActive = item.path === '/' ? location.pathname === '/' : isExact || isCustomizationTab;

        const Icon = item.icon;

        return (
          <button
            key={item.label}
            onClick={() => {
              sounds.playClick();
              navigate(item.path);
            }}
            className={`flex flex-col items-center justify-center w-16 h-14 md:w-20 md:h-20 rounded-2xl transition-all cursor-pointer ${
              isActive
                ? 'text-amber-400 bg-amber-500/15 border border-amber-500/30 shadow-lg shadow-amber-500/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Icon size={24} className={isActive ? 'stroke-[2.5]' : 'stroke-2'} />
            <span className="text-[11px] font-black mt-1 tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
