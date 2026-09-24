import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Crown, Gem, Shield, Info, Medal } from 'lucide-react';
import { useGame } from '../store/useGame';
import { getRivals } from '../data/economy';
import { levelFromXp } from '../data/characters';
import { useT } from '../i18n';
import Character from '../components/Character';
import { Segmented, SectionTitle, cx } from '../components/ui';

const TABS = [
  { value: 'weekly', key: 'rank_weekly', field: 'weeklyXp', unit: 'XP' },
  { value: 'global', key: 'rank_global', field: 'xp', unit: 'XP' },
  { value: 'arena', key: 'rank_arena', field: 'arenaBest', unit: 'pts' },
];

const LEAGUES = [
  { min: 0, Icon: Shield, color: '#b0723c', key: 'league_bronze' },
  { min: 150, Icon: Shield, color: '#b9c2cc', key: 'league_silver' },
  { min: 500, Icon: Shield, color: '#e0b84a', key: 'league_gold' },
  { min: 1200, Icon: Gem, color: '#7fd4ff', key: 'league_diamond' },
];

// índice = posição no pódio (0 = 1º lugar): o campeão é o degrau mais alto
const HEIGHTS = [128, 96, 80];
const PODIUM_STYLE = [
  { box: 'bg-gradient-to-b from-accent/40 to-accent/5 border-accent/70 text-accent2', ring: '#e6c67f' },
  { box: 'bg-gradient-to-b from-white/15 to-transparent border-line text-ink', ring: '#b9c2cc' },
  { box: 'bg-gradient-to-b from-[#b0723c]/30 to-transparent border-[#b0723c]/50 text-[#e0a070]', ring: '#b0723c' },
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
  const order = [1, 0, 2]; // 2º, 1º, 3º (esquerda, centro, direita)

  return (
    <div className="space-y-7">
      <SectionTitle icon={Trophy} sub={t('rank_sub')}>{t('nav_ranking')}</SectionTitle>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Segmented value={tab} onChange={setTab} options={TABS.map((x) => ({ value: x.value, label: t(x.key) }))} />
        <div className="card-pro !rounded-xl px-4 py-2 flex items-center gap-2.5 text-sm">
          <league.Icon size={18} strokeWidth={1.9} style={{ color: league.color }} />
          <span className="font-display font-extrabold">{t(league.key)}</span>
          <span className="text-dim tabular-nums">· #{myIdx + 1}</span>
        </div>
      </div>

      {/* Pódio */}
      <div className="card-pro px-3 sm:px-6 pt-10 pb-0 overflow-hidden">
        {/* key={tab}: remonta o pódio a cada troca de aba, para os degraus subirem de novo */}
        <div key={tab} className="grid grid-cols-3 gap-2 sm:gap-4 items-end">
          {order.map((pos) => {
            const r = podium[pos];
            if (!r) return <div key={pos} />;
            const st = PODIUM_STYLE[pos];
            return (
              <motion.div key={r.id} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 * pos, type: 'spring' }} className="flex flex-col items-center min-w-0">
                <div className="relative">
                  {pos === 0 && <motion.div className="absolute -top-7 left-1/2 -translate-x-1/2 z-10 text-accent2 drop-shadow-[0_0_8px_rgb(var(--glow)/.7)]" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}><Crown size={26} strokeWidth={1.8} className="fill-accent/40" /></motion.div>}
                  <Character id={r.hero} size={pos === 0 ? 96 : 76} mood="happy" />
                </div>
                <div className={cx('mt-1 text-center w-full font-display font-extrabold text-xs sm:text-sm truncate', r.me && 'text-accent2')}>{r.name}</div>
                <div className="text-[11px] text-dim tabular-nums mb-1.5">{r[cfg.field]} {cfg.unit}</div>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: HEIGHTS[pos] }}
                  transition={{ delay: 0.1 + 0.15 * pos, type: 'spring', damping: 18, stiffness: 120 }}
                  className={cx('w-full rounded-t-lg overflow-hidden flex items-start justify-center pt-2 font-fancy text-3xl font-black border border-b-0', st.box)}
                >
                  {pos + 1}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lista */}
      <div className="card-pro divide-y divide-line/60 overflow-hidden">
        {rows.map((r, i) => (
          <motion.div key={r.id} layout initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: Math.min(i, 12) * 0.03 }} className={cx('flex items-center gap-3 px-4 py-2.5', r.me && 'bg-accent/10 shadow-[inset_3px_0_0_var(--c-accent)]')}>
            <span className="w-7 flex justify-center">
              {i < 3 ? <Medal size={18} strokeWidth={1.9} style={{ color: PODIUM_STYLE[i].ring }} /> : <span className="font-display font-extrabold text-dim text-sm tabular-nums">{i + 1}</span>}
            </span>
            <div className="w-10 h-10 rounded-full overflow-hidden bg-black/30 border border-line shrink-0"><div className="-mt-1 ml-[-6px]"><Character id={r.hero} size={54} animate={false} /></div></div>
            <div className="min-w-0 flex-1">
              <div className="font-display font-bold truncate">{r.name} {r.me && <span className="eyebrow !text-[9px] text-accent ml-1">{t('you')}</span>}{r.local && !r.me && <span className="text-[10px] text-mana ml-1">· {t('local_hero')}</span>}</div>
              <div className="text-[11px] text-dim">{t('lvl')} {levelFromXp(r.xp)}</div>
            </div>
            <div className="text-right font-display font-black tabular-nums">{r[cfg.field]}<span className="text-[10px] text-dim ml-1 font-bold">{cfg.unit}</span></div>
          </motion.div>
        ))}
      </div>
      <p className="text-center text-xs text-dim flex items-center justify-center gap-1.5"><Info size={13} />{t('rank_note')}</p>
    </div>
  );
}
