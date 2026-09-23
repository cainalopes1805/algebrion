import React from 'react';
import Header from './Header';
import BottomNav from './BottomNav';
import AchievementPopup from './AchievementPopup';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex flex-col md:flex-row-reverse">
      <AchievementPopup />
      
      {/* Container Principal */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />
        
        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0 scroll-smooth">
          {children}
        </main>
      </div>

      {/* Navigation (Bottom on Mobile, Left Sidebar on Desktop) */}
      <BottomNav />
    </div>
  );
}

