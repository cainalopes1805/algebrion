import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame, useProfile } from '../store/useGame';
import { buildTrail } from '../data/trail';
import { biomeColor } from '../data/biomes';
import { ACHIEVEMENTS, getRivals } from '../data/economy';
import { MISSIONS } from '../data/content';
import { MONSTERS, levelProgress, rankFor } from '../data/characters';
import { useT } from '../i18n';
import { sounds } from '../utils/audio';
import Character from '../components/Character';
import HeroPortrait from '../components/HeroPortrait';
import { ProgressBar, cx } from '../components/ui';

function QuickCard({ to, icon, title, sub, badge, color = 'var(--c-accent)', delay = 0 }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, type: 'spring', damping: 22 }}>
      <Link to={to} onClick={() => sounds.click()} className="panel block p-4 h-full relative transition-transform active:translate-y-1 hover:-translate-y-0.5">
        {badge && <span className="absolute top-3 right-3 min-w-6 h-6 px-1.5 rounded-full bg-bad text-white text-xs font-black flex items-center justify-center">{badge}</span>}
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-3" style={{ background: `color-mix(in oklab, ${color} 22%, transparent)`, border: `2px solid color-mix(in oklab, ${color} 60%, transparent)` }}>{icon}</div>
        <div className="font-display font-black text-base leading-tight">{title}</div>
        <div className="text-xs text-dim mt-0.5">{sub}</div>
      </Link>
    </motion.div>
  );
}

export default function Home() {
  const p = useProfile();
  const profiles = useGame((s) => s.profiles);
  const { t, l } = useT();
  const nav = useNavigate();
  const prog = levelProgress(p.xp);
  const trail = useMemo(() => buildTrail(p), [p]);
  const cur = trail.current;

  const questsDone = p.quests.list.filter((q) => q.progress >= q.target).length;
  const claimable = p.quests.list.filter((q) => q.progress >= q.target && !q.claimed).length;
  const achCount = ACHIEVEMENTS.filter((a) => p.achievements[a.id]).length;
  const rankPos = useMemo(() => {
    const rows = [...getRivals(), ...Object.values(profiles).map((x) => ({ id: x.id, weeklyXp: x.weekly.xp }))].sort((a, b) => b.weeklyXp - a.weeklyXp);
    return rows.findIndex((r) => r.id === p.id) + 1;
  }, [profiles, p.id]);
  const totalNodes = trail.units.reduce((s, u) => s + u.nodes.length, 0);
  const doneNodes = trail.units.reduce((s, u) => s + u.done, 0);

  const color = cur ? biomeColor(cur.mission.biome) : '#a4854a';
  const heroTitle = cur ? (cur.kind === 'boss' ? l(MONSTERS[cur.mission.boss].name) : cur.kind === 'story' ? `${t('story')}: ${l(cur.mission.title)}` : l(cur.title)) : t('all_done');
  const kindLabel = cur ? (cur.kind === 'lesson' ? t('lesson') : cur.kind === 'boss' ? t('boss') : cur.kind === 'story' ? t('story') : t('stage')) : '';

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Saudação */}
      <div className="flex items-center gap-3">
        <HeroPortrait hero={p.hero} equipped={p.equipped} size={56} />
        <div className="min-w-0 flex-1">
          <div className="text-xs text-dim">{t('welcome_back')},</div>
          <div className="font-display font-black text-xl truncate">{p.name}</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-dim">{l(rankFor(prog.level))}</div>
          <div className="w-28 mt-1"><ProgressBar pct={prog.pct} height="h-2.5" /></div>
        </div>
      </div>

      {/* Próxima missão — foco */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-3xl p-5 sm:p-6 border-2 border-b-[6px]" style={{ background: `linear-gradient(135deg, color-mix(in oklab, ${color} 32%, #0d1319), #111a22 70%)`, borderColor: `color-mix(in oklab, ${color} 60%, #1a222b)` }}>
        <div className="absolute -right-10 -top-10 w-56 h-56 rounded-full" style={{ background: `radial-gradient(circle, ${color}40, transparent 70%)` }} />
        <div className="relative flex items-center gap-2">
          <div className="flex-1 min-w-0 text-white">
            <div className="text-[11px] font-black uppercase tracking-[0.2em] opacity-85">{cur ? `${t('next_up')} · ${t('unit')} ${cur.mission.id}` : t('nav_arena')}</div>
            <h1 className="font-display font-black text-2xl sm:text-3xl leading-tight mt-1">{cur ? cur.mission.icon : '👑'} {heroTitle}</h1>
            {cur && <div className="text-sm opacity-90 mt-1">{kindLabel} · {l(cur.mission.title)}</div>}
            <button
              onClick={() => { sounds.click(); nav(cur ? cur.to : '/arena'); }}
              className="btn-primary mt-4 px-7 py-3.5 rounded-2xl font-display font-black uppercase tracking-wider transition-transform"
            >
              {cur ? t('continue_quest') : t('enter_arena')} →
            </button>
          </div>
          <div className="shrink-0 -mb-6 -mr-1 self-end">
            <Character id={cur ? cur.mission.mentor : p.hero} size={128} speaking />
          </div>
        </div>
        <div className="relative mt-4">
          <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-white/85 mb-1"><span>{t('journey')}</span><span>{doneNodes}/{totalNodes}</span></div>
          <div className="h-3 rounded-full bg-black/40 overflow-hidden"><motion.div className="h-full bg-accent rounded-full" initial={{ width: 0 }} animate={{ width: `${(doneNodes / totalNodes) * 100}%` }} transition={{ duration: 0.8 }} /></div>
        </div>
      </motion.section>

      {/* Grande Matriz */}
      <Link to="/trail" className="panel flex items-center gap-3 p-3.5">
        <div className="text-3xl">🌌</div>
        <div className="flex-1 min-w-0">
          <div className="font-display font-black text-sm">{t('great_matrix')} · {p.story.shards.length}/7</div>
          <div className="flex gap-1 mt-1.5">{Array.from({ length: 7 }, (_, i) => <div key={i} className={cx('flex-1 h-6 rounded-md border-2 flex items-center justify-center text-xs', p.story.shards.includes(i + 1) ? 'border-accent bg-accent/25' : 'border-line bg-surface2 text-dim')}>{p.story.shards.includes(i + 1) ? '🔷' : '·'}</div>)}</div>
        </div>
      </Link>

      {/* Cartões de acesso */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <QuickCard to="/trail" icon="🗺️" title={t('nav_trail')} sub={t('trail_sub', { n: MISSIONS.length })} color="#4b7a63" delay={0.05} />
        <QuickCard to="/quests" icon="📜" title={t('daily_quests')} sub={`${questsDone}/${p.quests.list.length || 3} ${t('done')}`} badge={claimable || null} color="#a4854a" delay={0.1} />
        <QuickCard to="/arena" icon="⚔️" title={t('nav_arena')} sub={`${t('best_score')}: ${p.stats.arenaBest}`} color="#9a4a48" delay={0.15} />
        <QuickCard to="/ranking" icon="🏆" title={t('nav_ranking')} sub={`#${rankPos} · ${t('rank_weekly')}`} color="#7d6aa6" delay={0.2} />
        <QuickCard to="/shop" icon="🛒" title={t('nav_shop')} sub={`${p.gold} 💰`} color="#a8623a" delay={0.25} />
        <QuickCard to="/glories" icon="🎖️" title={t('nav_glories')} sub={`${achCount}/${ACHIEVEMENTS.length}`} color="#467f7e" delay={0.3} />
      </div>

      {/* Unidades */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-black text-lg">{t('your_units')}</h2>
          <Link to="/trail" className="text-sm font-black uppercase tracking-wider text-accent2">{t('see_trail')} →</Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x">
          {trail.units.map((u) => {
            const c = biomeColor(u.mission.biome);
            return (
              <Link key={u.mission.id} to={u.unlocked ? `/mission/${u.mission.id}` : '/trail'} className={cx('panel snap-start shrink-0 w-44 p-3', !u.unlocked && 'opacity-50')}>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: `${c}33`, border: `2px solid ${c}` }}>{u.unlocked ? u.mission.icon : '🔒'}</div>
                  <div className="text-[11px] font-black uppercase tracking-widest text-dim">{t('unit')} {u.mission.id}</div>
                </div>
                <div className="font-display font-black text-sm leading-tight mt-2 line-clamp-2 min-h-[2.4em]">{l(u.mission.title)}</div>
                <div className="mt-2"><ProgressBar pct={u.done / u.nodes.length} height="h-2" /></div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
