import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { translations } from '../i18n/translations';
import TopBar from '../components/TopBar';

export default function Customization() {
  const { language, theme, setTheme, primaryColor, setPrimaryColor, coins, addCoins } = useAppStore();
  const t = translations[language] || translations['pt'];

  return (
    <div className={`min-h-screen flex flex-col font-serif ${theme === 'dark' ? 'bg-stone-900 text-stone-200' : 'bg-amber-100 text-amber-950'}`}>
      <TopBar />
      
      <main className="flex-1 p-8 max-w-5xl mx-auto w-full">
        <h1 className="text-5xl font-black text-center mb-12 border-b-4 border-double pb-4 border-current">{t.customization}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Configurações (Cores e Temas) */}
          <div className="space-y-8 border-4 border-stone-700 dark:border-stone-500 p-6 bg-amber-50 dark:bg-stone-800">
            <h2 className="text-3xl font-bold mb-4 uppercase text-center border-b-2 border-dotted border-current pb-2">Ambiente</h2>
            
            <section>
              <h3 className="text-xl font-bold mb-3">Estilo</h3>
              <div className="flex gap-4">
                <button 
                  onClick={() => setTheme('light')}
                  className={`px-6 py-3 font-bold border-4 shadow-inner ${theme === 'light' ? `border-amber-900 bg-amber-200 text-amber-900` : 'border-stone-400 bg-stone-200 text-stone-700'}`}
                >
                  {t.theme_light}
                </button>
                <button 
                  onClick={() => setTheme('dark')}
                  className={`px-6 py-3 font-bold border-4 shadow-inner ${theme === 'dark' ? `border-stone-400 bg-stone-700 text-stone-100` : 'border-stone-400 bg-stone-200 text-stone-700'}`}
                >
                  {t.theme_dark}
                </button>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-3">Emblema Real (Cor)</h3>
              <div className="flex gap-4">
                {['amber', 'emerald', 'purple', 'red'].map((color) => (
                  <button 
                    key={color}
                    onClick={() => setPrimaryColor(color)}
                    className={`w-12 h-12 border-4 shadow-md bg-${color}-600 hover:scale-110 transition-transform ${primaryColor === color ? 'border-amber-900 dark:border-stone-300' : 'border-transparent'}`}
                    title={color}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Loja Virtual (Mercador) */}
          <div className="space-y-8 border-4 border-amber-900 dark:border-stone-500 p-6 bg-amber-50 dark:bg-stone-800">
            <h2 className="text-3xl font-bold mb-4 uppercase text-center border-b-2 border-dotted border-current pb-2">{t.store}</h2>
            <p className="italic text-center mb-4">Troque seu {t.coins} por itens mágicos!</p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '🛡️', name: 'Escudo', price: 50 }, 
                { icon: '🗡️', name: 'Espada', price: 100 },
                { icon: '🧙‍♂️', name: 'Chapéu', price: 150 },
                { icon: '🐉', name: 'Dragão', price: 500 }
              ].map((item, idx) => (
                <div key={idx} className="bg-amber-100 dark:bg-stone-700 p-4 border-2 border-stone-400 text-center flex flex-col items-center">
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <div className="font-bold text-sm mb-2">{item.name}</div>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-yellow-950 font-bold px-4 py-1 border-2 border-yellow-700 shadow-sm text-sm">
                    {item.price} {t.coins}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Estante de Prêmios */}
        <div className="mt-12 space-y-8 border-4 border-stone-800 p-6 bg-stone-900 text-stone-300 shadow-2xl relative">
          {/* Madeira da estante */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none border-y-[16px] border-x-[16px] border-[#3e2723]"></div>
          
          <h2 className="text-4xl font-black mb-6 uppercase text-center text-amber-500 tracking-widest relative z-10">Estante de Prêmios</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10 px-4">
            {[
              { icon: '👑', name: 'Coroa do Iniciante', unlocked: true },
              { icon: '📜', name: 'Pergaminho Mágico', unlocked: false },
              { icon: '⚔️', name: 'Espada de Matriz', unlocked: false },
              { icon: '💎', name: 'Joia do Conhecimento', unlocked: false }
            ].map((prize, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className={`w-24 h-24 flex items-center justify-center text-5xl bg-stone-800 border-4 ${prize.unlocked ? 'border-amber-500' : 'border-stone-700 opacity-50 grayscale'} shadow-inner rounded-full mb-3`}>
                  {prize.icon}
                </div>
                <div className="text-center font-bold text-sm">
                  {prize.unlocked ? prize.name : '???'}
                </div>
              </div>
            ))}
          </div>
          {/* Prateleira decorativa */}
          <div className="w-full h-4 bg-[#4e342e] border-t-2 border-b-2 border-black relative z-10 mt-4 shadow-lg"></div>
        </div>
      </main>
    </div>
  );
}
