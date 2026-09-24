import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../store/useGame';
import { getRivals } from '../data/economy';
import { levelFromXp } from '../data/characters';
import { useT } from '../i18n';
import Character from '../components/Character';
import { Card, Segmented, SectionTitle, cx } from '../components/ui';

const TABS = [
  { value: 'weekly', key: 'rank_weekly', field: 'weeklyXp', unit: 'XP' },
  { value: 'global', key: 'rank_global', field: 'xp', unit: 'XP' },
  { value: 'arena', key: 'rank_arena', field: 'arenaBest', unit: 'pts' },
];

const LEAGUES = [
  { min: 0, icon: '🟤', key: 'league_bronze' },
  { min: 150, icon: '⚪', key: 'league_silver' },
  { min: 500, icon: '🟡', key: 'league_gold' },
  { min: 1200, icon: '💎', key: 'league_diamond' },
];

export default function Ranking() {
  const { t } = useT();
  const profiles = useGame((s) => s.profiles);
  const activeId = useGame((s) => s.activeId);
  const [tab, setTab] = useState('weekly');
  const cfg = TABS.find((x) => x.value === tab);

  const rows = useMemo(() => {
    const rivals = getRivals();
    const players = Object.values(profiles).map((p) => ({ id: p.id, name: p.name, hero: p.hero, xp: p.xp, weeklyXp: p.weekly.xp, arenaBest: p.stats.arenaBest, me: p.id === activeId, local: true }));
    return [...rivals, ...players].sort((a, b) => b[cfg.field] - a[cfg.field]);
  }, [profiles, activeId, cfg.field]);

  const myIdx = rows.findIndex((r) => r.me);
  const me = rows[myIdx];
  const league = [...LEAGUES].reverse().find((lg) => (me?.weeklyXp ?? 0) >= lg.min) || LEAGUES[0];
  const podium = rows.slice(0, 3);
  const order = [1, 0, 2]; // 2º, 1º, 3º
  const heights = ['h-24', 'h-32', 'h-20'];

  return (
    <div className="space-y-6">
      <SectionTitle icon="🏆" sub={t('rank_sub')}>{t('nav_ranking')}</SectionTitle>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Segmented value={tab} onChange={setTab} options={TABS.map((x) => ({ value: x.value, label: t(x.key) }))} />
        <div className="panel px-4 py-2 flex items-center gap-2 text-sm">
          <span className="text-xl">{league.icon}</span>
          <span className="font-display font-black">{t(league.key)}</span>
          <span className="text-dim">· #{myIdx + 1}</span>
        </div>
      </div>

      {/* Pódio */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 items-end pt-6">
        {order.map((pos) => {
          const r = podium[pos];
          if (!r) return <div key={pos} />;
          return (
            <motion.div key={r.id} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 * pos, type: 'spring' }} className="flex flex-col items-center min-w-0">
              <div className="relative">
                {pos === 0 && <motion.div className="absolute -top-6 left-1/2 -translate-x-1/2 text-3xl z-10" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>👑</motion.div>}
                <Character id={r.hero} size={pos === 0 ? 96 : 76} mood={pos === 0 ? 'happy' : 'happy'} />
              </div>
              <div className={cx('mt-1 text-center w-full font-display font-black text-xs sm:text-sm truncate', r.me && 'text-accent')}>{r.name}</div>
              <div className="text-[11px] text-dim">{r[cfg.field]} {cfg.unit}</div>
              <div className={cx('w-full rounded-t-xl mt-1 flex items-start justify-center pt-2 font-fancy text-3xl font-black border border-b-0', heights[pos], pos === 0 ? 'bg-gradient-to-b from-accent/40 to-accent/5 border-accent text-accent2' : pos === 1 ? 'bg-gradient-to-b from-white/15 to-transparent border-line text-ink' : 'bg-gradient-to-b from-[#b0723c]/30 to-transparent border-line text-[#e0a070]')}>
                {pos + 1}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lista */}
      <Card className="divide-y divide-line/60 overflow-hidden">
        {rows.map((r, i) => (
          <motion.div key={r.id} layout initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: Math.min(i, 12) * 0.03 }} className={cx('flex items-center gap-3 px-4 py-2.5', r.me && 'bg-accent/10 border-l-4 border-accent')}>
            <span className="w-7 text-center font-display font-black text-dim">{i + 1}</span>
            <div className="w-10 h-10 rounded-full overflow-hidden bg-black/30 border border-line shrink-0"><div className="-mt-1 ml-[-6px]"><Character id={r.hero} size={54} animate={false} /></div></div>
            <div className="min-w-0 flex-1">
              <div className="font-display font-bold truncate">{r.name} {r.me && <span className="text-[10px] text-accent uppercase tracking-widest ml-1">{t('you')}</span>}{r.local && !r.me && <span className="text-[10px] text-mana ml-1">· {t('local_hero')}</span>}</div>
              <div className="text-[11px] text-dim">{t('lvl')} {levelFromXp(r.xp)}</div>
            </div>
            <div className="text-right font-display font-black tabular-nums">{r[cfg.field]}<span className="text-[10px] text-dim ml-1">{cfg.unit}</span></div>
          </motion.div>
        ))}
      </Card>
      <p className="text-center text-xs text-dim">ℹ️ {t('rank_note')}</p>
    </div>
  );
}
