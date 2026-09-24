import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useGame, useProfile, HEART_REGEN_MS } from '../store/useGame';
import { levelProgress, rankFor } from '../data/characters';
import { useT } from '../i18n';
import { sounds } from '../utils/audio';
import HeroPortrait from './HeroPortrait';
import Backdrop from './Backdrop';
import { ProgressBar, cx } from './ui';

const NAV = [
  { to: '/', icon: '🏠', key: 'nav_home', end: true, mobile: true },
  { to: '/trail', icon: '🗺️', key: 'nav_trail', mobile: true },
  { to: '/quests', icon: '📜', key: 'nav_quests' },
  { to: '/arena', icon: '⚔️', key: 'nav_arena', mobile: true },
  { to: '/ranking', icon: '🏆', key: 'nav_ranking', mobile: true },
  { to: '/shop', icon: '🛒', key: 'nav_shop' },
  { to: '/glories', icon: '🎖️', key: 'nav_glories' },
  { to: '/settings', icon: '🛏️', key: 'nav_settings', mobile: true },
];

function useCountdown(active, from) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    if (!active) return undefined;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [active]);
  if (!active) return null;
  const left = Math.max(0, HEART_REGEN_MS - ((now - from) % HEART_REGEN_MS));
  const m = Math.floor(left / 60000);
  const s = String(Math.floor((left % 60000) / 1000)).padStart(2, '0');
  return `${m}:${s}`;
}

export function Hud({ compact = false }) {
  const p = useProfile();
  const { t } = useT();
  const prog = levelProgress(p.xp);
  const countdown = useCountdown(p.hearts < p.maxHearts, p.heartsAt);
  return (
    <div className="flex items-center gap-1 sm:gap-3">
      <Pill title={t('hearts')}>
        <span className={cx(p.hearts <= 1 && 'anim-glow text-bad')}>❤️</span>
        <b className="font-display">{p.hearts}</b>
        <span className="text-dim text-xs">/{p.maxHearts}</span>
        {countdown && <span className="text-[10px] text-dim ml-1 tabular-nums">⏳{countdown}</span>}
      </Pill>
      <Pill title={t('gold')}>
        <span>💰</span>
        <b className="font-display tabular-nums">{p.gold}</b>
      </Pill>
      <Pill title={t('streak')}>
        <span className={cx(p.streak > 0 && 'anim-flame inline-block')}>🔥</span>
        <b className="font-display">{p.streak}</b>
      </Pill>
      {!compact && (
        <div className="hidden sm:flex items-center gap-2 min-w-[130px] flex-1 max-w-[220px]">
          <span className="font-display text-xs font-black text-accent whitespace-nowrap">{t('lvl')} {prog.level}</span>
          <ProgressBar pct={prog.pct} className="flex-1" />
        </div>
      )}
    </div>
  );
}

const Pill = ({ children, title }) => (
  <div title={title} className="flex items-center gap-1.5 px-1.5 py-1 text-sm font-black">
    {children}
  </div>
);

export default function Layout() {
  const p = useProfile();
  const { t, l } = useT();
  const location = useLocation();
  const prog = levelProgress(p.xp);
  const { pathname } = location;

  return (
    <div className="relative z-10 min-h-screen lg:pl-64">
      {/* Barra lateral — desktop */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 flex-col p-4 gap-4 border-r-2 border-line bg-bg z-30">
        <Link to="/" className="block text-center pt-2" onClick={() => sounds.click()}>
          <div className="font-fancy text-2xl font-black text-accent leading-none">Algebrion</div>
          <div className="text-[10px] tracking-[0.3em] text-dim uppercase mt-1.5 font-black">{t('tagline')}</div>
        </Link>
        <Link to="/settings" className="panel p-3 flex items-center gap-3 hover:border-accent transition-colors">
          <HeroPortrait hero={p.hero} equipped={p.equipped} size={56} />
          <div className="min-w-0">
            <div className="font-display font-black truncate">{p.name}</div>
            <div className="text-xs text-accent truncate">{l(rankFor(prog.level))}</div>
          </div>
        </Link>
        <nav className="flex flex-col gap-1">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              onClick={() => sounds.click()}
              className={({ isActive }) =>
                cx('flex items-center gap-3 px-3 py-2.5 rounded-2xl font-display text-sm font-black uppercase tracking-wider border-2 transition-colors', isActive ? 'bg-accent/15 text-accent2 border-accent/60' : 'text-dim hover:bg-white/5 border-transparent')
              }
            >
              <span className="text-lg w-6 text-center">{n.icon}</span>
              {t(n.key)}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto text-[10px] text-dim text-center tracking-widest uppercase">{t('week_xp')}: <b className="text-accent">{p.weekly.xp}</b></div>
      </aside>

      {/* HUD superior */}
      <header className="sticky top-0 z-30 border-b-2 border-line bg-bg/95 backdrop-blur">
        <div className="max-w-3xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
          <Hud />
          <Link to="/settings" className="lg:hidden">
            <HeroPortrait hero={p.hero} equipped={p.equipped} size={40} />
          </Link>
        </div>
      </header>

      <main className={pathname === '/trail' ? 'w-full pb-20 lg:pb-0' : 'max-w-3xl mx-auto px-4 pt-5 pb-28 lg:pb-12'}>
        <AnimatePresence mode="wait">
          <motion.div key={pathname} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.28 }}>
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navegação inferior — mobile */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 border-t-2 border-line bg-bg pb-[env(safe-area-inset-bottom)]">
        <div className="flex justify-around px-2 py-1.5">
          {NAV.filter((n) => n.mobile).map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              onClick={() => sounds.click()}
              className={({ isActive }) => cx('flex-1 mx-0.5 flex flex-col items-center gap-0.5 py-1.5 rounded-2xl border-2', isActive ? 'bg-accent/15 border-accent/60' : 'border-transparent')}
            >
              {({ isActive }) => (
                <>
                  <motion.span animate={{ scale: isActive ? 1.15 : 1 }} className="text-[26px] leading-none">{n.icon}</motion.span>
                  <span className={cx('text-[9px] font-black uppercase tracking-wide', isActive ? 'text-accent2' : 'text-dim')}>{t(n.key)}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}

// Casca mínima para telas de foco (fases, arena, lições)
// Casca das telas de foco. Com `bg`, o fundo inteiro vira o interior do local (abadia, forte, forja…).
export function FocusShell({ children, bg }) {
  return (
    <div className="relative z-10 min-h-screen">
      {bg && (
        <div className="fixed inset-0 z-0" aria-hidden="true">
          <Backdrop kind={bg} />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export const useSettingsMotion = () => useGame((s) => s.settings.motion);
