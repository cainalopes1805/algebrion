import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { House, Map, ScrollText, Swords, Trophy, ShoppingBag, Medal, BedDouble, Heart, Coins, Flame, Hourglass } from 'lucide-react';
import { useGame, useProfile, HEART_REGEN_MS } from '../store/useGame';
import { levelProgress, rankFor } from '../data/characters';
import { useT } from '../i18n';
import { sounds } from '../utils/audio';
import HeroPortrait from './HeroPortrait';
import Backdrop from './Backdrop';
import { ProgressBar, cx } from './ui';

const NAV = [
  { to: '/', Icon: House, key: 'nav_home', end: true, mobile: true },
  { to: '/trail', Icon: Map, key: 'nav_trail', mobile: true },
  { to: '/quests', Icon: ScrollText, key: 'nav_quests' },
  { to: '/arena', Icon: Swords, key: 'nav_arena', mobile: true },
  { to: '/ranking', Icon: Trophy, key: 'nav_ranking', mobile: true },
  { to: '/shop', Icon: ShoppingBag, key: 'nav_shop' },
  { to: '/glories', Icon: Medal, key: 'nav_glories' },
  { to: '/settings', Icon: BedDouble, key: 'nav_settings', mobile: true },
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
    <div className="flex items-center gap-1 sm:gap-2">
      <Pill title={t('hearts')}>
        <Heart size={17} strokeWidth={2.2} className={cx('text-bad fill-bad/30', p.hearts <= 1 && 'anim-glow')} />
        <b className="font-display tabular-nums">{p.hearts}</b>
        <span className="text-dim text-xs -ml-0.5">/{p.maxHearts}</span>
        {countdown && <span className="text-[10px] text-dim ml-1 tabular-nums inline-flex items-center gap-0.5"><Hourglass size={10} />{countdown}</span>}
      </Pill>
      <Pill title={t('gold')}>
        <Coins size={17} strokeWidth={2.2} className="text-accent2" />
        <b className="font-display tabular-nums">{p.gold}</b>
      </Pill>
      <Pill title={t('streak')}>
        <Flame size={17} strokeWidth={2.2} className={cx(p.streak > 0 ? 'text-orange-400 fill-orange-400/30 anim-flame' : 'text-dim')} />
        <b className="font-display tabular-nums">{p.streak}</b>
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
  <div title={title} className="flex items-center gap-1.5 px-2.5 py-1 text-sm font-black rounded-full bg-white/[0.04] border border-line/70">
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
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 flex-col p-4 gap-4 border-r border-line bg-bg z-30">
        <Link to="/" className="block text-center pt-2" onClick={() => sounds.click()}>
          <div className="font-fancy text-[26px] font-black text-accent2 leading-none tracking-wide">Algebrion</div>
          <div className="flex items-center gap-2 mt-2 text-dim"><span className="h-px flex-1 bg-line" /><span className="text-[9px] tracking-[0.28em] uppercase font-extrabold">{t('tagline')}</span><span className="h-px flex-1 bg-line" /></div>
        </Link>
        <Link to="/settings" className="card-pro p-3 flex items-center gap-3 hover:border-accent/60 transition-colors">
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
                cx('flex items-center gap-3 px-3 py-2.5 rounded-xl font-display text-[13px] font-extrabold uppercase tracking-[0.12em] border transition-colors', isActive ? 'bg-accent/12 text-accent2 border-accent/40 shadow-[inset_3px_0_0_var(--c-accent)]' : 'text-dim hover:bg-white/5 hover:text-ink border-transparent')
              }
            >
              <n.Icon size={19} strokeWidth={1.9} className="w-6 shrink-0" />
              {t(n.key)}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto text-[10px] text-dim text-center tracking-widest uppercase">{t('week_xp')}: <b className="text-accent">{p.weekly.xp}</b></div>
      </aside>

      {/* HUD superior */}
      <header className="sticky top-0 z-30 border-b border-line bg-bg/95 backdrop-blur">
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
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-30 border-t border-line bg-bg pb-[env(safe-area-inset-bottom)]">
        <div className="flex justify-around px-2 py-1.5">
          {NAV.filter((n) => n.mobile).map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              onClick={() => sounds.click()}
              className={({ isActive }) => cx('flex-1 mx-0.5 flex flex-col items-center gap-1 py-1.5 rounded-xl', isActive ? 'text-accent2' : 'text-dim')}
            >
              {({ isActive }) => (
                <>
                  <motion.span animate={{ scale: isActive ? 1.1 : 1 }} className="leading-none"><n.Icon size={22} strokeWidth={isActive ? 2.2 : 1.8} /></motion.span>
                  <span className="text-[9px] font-extrabold uppercase tracking-wider">{t(n.key)}</span>
                  <span className={cx('h-0.5 w-5 rounded-full transition-colors', isActive ? 'bg-accent' : 'bg-transparent')} />
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
