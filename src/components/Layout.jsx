import React from 'react';
import Header from './Header';
import BottomNav from './BottomNav';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 font-sans flex flex-col md:flex-row-reverse antialiased selection:bg-amber-500 selection:text-slate-950">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto pb-24 md:pb-8 scroll-smooth">
          {children}
        </main>
      </div>

      {/* Navigation (Bottom on Mobile, Left Sidebar on Desktop) */}
      <BottomNav />
    </div>
  );
}
