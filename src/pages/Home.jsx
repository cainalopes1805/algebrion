import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, BookText, Map, ScrollText, Swords, Trophy, ShoppingBag, Medal, Coins, Gem, Lock, Crown, Flag, Sparkles, Shield } from 'lucide-react';
import { ROMAN, MISSION_ICON, KIND_ICON } from '../components/gameIcons';
import { useGame, useProfile } from '../store/useGame';
import { buildTrail } from '../data/trail';
import { biomeColor } from '../data/biomes';
import { ACHIEVEMENTS, getRivals } from '../data/economy';
import { MISSIONS } from '../data/content';
import { MONSTERS, levelProgress, rankFor } from '../data/characters';
import { getAvailableAttributePoints, getAvailableTalentPoints, HERO_CLASSES } from '../data/classes';
import { useT } from '../i18n';
import { sounds } from '../utils/audio';
import Character from '../components/Character';
import HeroPortrait from '../components/HeroPortrait';
import { ProgressBar, cx } from '../components/ui';


function QuickCard({ to, Icon, title, sub, badge, color = 'var(--c-accent)', delay = 0 }) {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, type: 'spring', damping: 24 }}>
      <Link to={to} onClick={() => sounds.click()} className="card-pro group flex flex-col p-4 h-full transition-all hover:-translate-y-0.5 hover:border-accent/50 active:translate-y-0">
        {badge && <span className="absolute top-3 right-3 min-w-5 h-5 px-1.5 rounded-full bg-bad text-white text-[11px] font-extrabold flex items-center justify-center shadow">{badge}</span>}
        <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3.5" style={{ background: `linear-gradient(145deg, color-mix(in oklab, ${color} 34%, transparent), color-mix(in oklab, ${color} 10%, transparent))`, border: `1px solid color-mix(in oklab, ${color} 55%, transparent)`, color: `color-mix(in oklab, ${color} 45%, white)` }}>
          <Icon size={22} strokeWidth={1.8} />
        </div>
        <div className="font-display font-extrabold text-[15px] leading-tight">{title}</div>
        <div className="text-xs text-dim mt-1 flex items-center gap-1 min-h-4">{sub}</div>
        <ChevronRight size={16} className="absolute right-3 bottom-3.5 text-dim opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
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

  const unspentAttr = getAvailableAttributePoints(prog.level, p.attributes);
  const unspentTalent = getAvailableTalentPoints(prog.level, p.talents, p.hero);
  const totalUnspent = unspentAttr + unspentTalent;
  const heroRole = HERO_CLASSES[p.hero]?.role || HERO_CLASSES.mage.role;

  const color = cur ? biomeColor(cur.mission.biome) : '#a4854a';
  const heroTitle = cur ? (cur.kind === 'boss' ? l(MONSTERS[cur.mission.boss].name) : cur.kind === 'story' ? `${t('story')}: ${l(cur.mission.title)}` : l(cur.title)) : t('all_done');
  const MissionIcon = cur ? MISSION_ICON[cur.mission.id] || Sparkles : Crown;
  const KindIcon = cur ? KIND_ICON[cur.kind] || Flag : Flag;
  const kindLabel = cur ? (cur.kind === 'concept' ? t('concept') : cur.kind === 'boss' ? t('boss') : cur.kind === 'story' ? t('story') : t('stage')) : '';
  const tint = `color-mix(in oklab, ${color} 45%, white)`;

  return (
    <div className="space-y-7 max-w-3xl mx-auto">
      {/* Saudação */}
      <div className="flex items-center gap-3.5">
        <Link to="/hero" onClick={() => sounds.click()} className="rounded-2xl p-0.5 bg-gradient-to-br from-accent2 to-accent/30 hover:scale-105 transition-transform" title={t('nav_hero')}>
          <div className="rounded-[14px] overflow-hidden bg-bg"><HeroPortrait hero={p.hero} equipped={p.equipped} size={56} /></div>
        </Link>
        <div className="min-w-0 flex-1">
          <div className="eyebrow text-dim">{t('welcome_back')}</div>
          <div className="font-display font-black text-[22px] leading-tight truncate">{p.name}</div>
          <div className="text-xs text-accent2 font-bold truncate">{l(rankFor(prog.level))}</div>
        </div>
        <div className="w-32 sm:w-40">
          <div className="flex items-baseline justify-between mb-1.5"><span className="eyebrow text-dim">{t('lvl')}</span><span className="font-display font-black text-lg leading-none text-accent2 tabular-nums">{prog.level}</span></div>
          <ProgressBar pct={prog.pct} height="h-1.5" />
        </div>
      </div>

      {/* Próxima missão — foco */}
      <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="tex relative overflow-hidden rounded-2xl p-5 sm:p-7 border shadow-[0_18px_40px_-18px_rgba(0,0,0,.8)]" style={{ background: `linear-gradient(125deg, color-mix(in oklab, ${color} 34%, #0b1016) 0%, #0f161d 62%, #0b1016 100%)`, borderColor: `color-mix(in oklab, ${color} 45%, #1a222b)` }}>
        <div className="absolute -right-12 -top-16 w-72 h-72 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${color}55, transparent 68%)` }} />
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
        <div className="relative flex items-center gap-2">
          <div className="flex-1 min-w-0 text-white">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}33`, border: `1px solid ${color}99`, color: tint }}><MissionIcon size={17} strokeWidth={1.9} /></span>
              <div className="eyebrow opacity-80">{cur ? `${t('next_up')} · ${t('unit')} ${ROMAN[cur.mission.id - 1] || cur.mission.id}` : t('nav_arena')}</div>
            </div>
            <h1 className="font-display font-black text-[26px] sm:text-[32px] leading-[1.1] mt-3">{heroTitle}</h1>
            {cur && <div className="text-sm text-white/70 mt-1.5 flex items-center gap-1.5"><KindIcon size={14} />{kindLabel}<span className="opacity-50">·</span>{l(cur.mission.title)}</div>}
            <button onClick={() => { sounds.click(); nav(cur ? cur.to : '/arena'); }} className="btn-cta mt-5 pl-6 pr-5 py-3.5 font-display font-black text-[13px] uppercase">
              {cur ? t('continue_quest') : t('enter_arena')}<ArrowRight size={17} strokeWidth={2.4} />
            </button>
          </div>
          <div className="shrink-0 -mb-7 -mr-1 self-end drop-shadow-[0_10px_16px_rgba(0,0,0,.5)]">
            <Character id={cur ? cur.mission.mentor : p.hero} size={128} speaking />
          </div>
        </div>
        <div className="relative mt-5">
          <div className="flex justify-between items-baseline mb-1.5 text-white/80"><span className="eyebrow">{t('journey')}</span><span className="text-xs font-bold tabular-nums">{doneNodes}<span className="opacity-50">/{totalNodes}</span> · {Math.round((doneNodes / totalNodes) * 100)}%</span></div>
          <div className="h-1.5 rounded-full bg-black/50 overflow-hidden"><motion.div className="h-full rounded-full bg-gradient-to-r from-accent to-accent2" initial={{ width: 0 }} animate={{ width: `${(doneNodes / totalNodes) * 100}%` }} transition={{ duration: 0.9 }} /></div>
        </div>
      </motion.section>

      {/* Grande Matriz */}
      <Link to="/trail" className="card-pro flex items-center gap-4 p-4 hover:border-accent/50 transition-colors">
        <div className="w-11 h-11 shrink-0 rounded-xl bg-accent/10 border border-accent/40 flex items-center justify-center text-accent2"><Sparkles size={21} strokeWidth={1.8} /></div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between"><div className="font-display font-extrabold text-sm">{t('great_matrix')}</div><div className="text-xs text-dim font-bold tabular-nums">{p.story.shards.length}/7</div></div>
          <div className="flex gap-1.5 mt-2.5">{Array.from({ length: 7 }, (_, i) => {
            const on = p.story.shards.includes(i + 1);
            return <div key={i} className={cx('flex-1 h-7 rounded-md border flex items-center justify-center', on ? 'border-accent/70 bg-accent/20 text-accent2 shadow-[0_0_12px_-2px_rgb(var(--glow)/.6)]' : 'border-line bg-black/20 text-dim/50')}><Gem size={13} strokeWidth={on ? 2.2 : 1.6} /></div>;
          })}</div>
        </div>
      </Link>

      {/* Diário da jornada */}
      <Link to="/journal" onClick={() => sounds.click()} className="card-pro flex items-center gap-4 p-4 hover:border-accent/50 transition-colors">
        <div className="w-11 h-11 shrink-0 rounded-xl bg-accent/10 border border-accent/40 flex items-center justify-center text-accent2"><BookText size={21} strokeWidth={1.8} /></div>
        <div className="flex-1 min-w-0">
          <div className="font-display font-extrabold text-sm">{t('nav_journal')}</div>
          <div className="text-xs text-dim mt-0.5">{['courage', 'wisdom', 'cunning', 'compassion'].map((k) => `${t(`virtue_${k}`)} ${p.story.virtues[k] || 0}`).join(' · ')}</div>
        </div>
        <ChevronRight size={16} className="text-dim" />
      </Link>

      {/* Cartões de acesso */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <QuickCard to="/hero" Icon={Shield} title={t('nav_hero')} sub={totalUnspent > 0 ? `${totalUnspent} ${t('points_available')}` : l(heroRole)} badge={totalUnspent || null} color="#c79a46" delay={0.03} />
        <QuickCard to="/trail" Icon={Map} title={t('nav_trail')} sub={t('trail_sub', { n: MISSIONS.length })} color="#4b7a63" delay={0.06} />
        <QuickCard to="/quests" Icon={ScrollText} title={t('daily_quests')} sub={`${questsDone}/${p.quests.list.length || 3} ${t('done')}`} badge={claimable || null} color="#a4854a" delay={0.09} />
        <QuickCard to="/arena" Icon={Swords} title={t('nav_arena')} sub={`${t('best_score')}: ${p.stats.arenaBest}`} color="#9a4a48" delay={0.12} />
        <QuickCard to="/ranking" Icon={Trophy} title={t('nav_ranking')} sub={`#${rankPos} · ${t('rank_weekly')}`} color="#7d6aa6" delay={0.15} />
        <QuickCard to="/shop" Icon={ShoppingBag} title={t('nav_shop')} sub={<><Coins size={13} className="text-accent2" /><span className="tabular-nums">{p.gold}</span></>} color="#a8623a" delay={0.18} />
        <QuickCard to="/glories" Icon={Medal} title={t('nav_glories')} sub={`${achCount}/${ACHIEVEMENTS.length}`} color="#467f7e" delay={0.21} />
      </div>

      {/* Unidades */}
      <section>
        <div className="flex items-center gap-3 mb-3">
          <h2 className="eyebrow text-dim">{t('your_units')}</h2><span className="h-px flex-1 bg-line" />
          <Link to="/trail" className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-accent2 inline-flex items-center gap-1 hover:gap-1.5 transition-all">{t('see_trail')}<ArrowRight size={13} /></Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x">
          {trail.units.map((u) => {
            const c = biomeColor(u.mission.biome);
            const UIcon = MISSION_ICON[u.mission.id] || Sparkles;
            const pct = u.done / u.nodes.length;
            return (
              <Link key={u.mission.id} to={u.unlocked ? `/mission/${u.mission.id}` : '/trail'} className={cx('card-pro snap-start shrink-0 w-44 p-3.5 transition-colors hover:border-accent/50', !u.unlocked && 'opacity-55')}>
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${c}26`, border: `1px solid ${c}88`, color: `color-mix(in oklab, ${c} 45%, white)` }}>{u.unlocked ? <UIcon size={18} strokeWidth={1.8} /> : <Lock size={16} strokeWidth={1.8} />}</div>
                  <div className="font-fancy text-lg font-black text-dim leading-none">{ROMAN[u.mission.id - 1] || u.mission.id}</div>
                </div>
                <div className="font-display font-extrabold text-[13px] leading-tight mt-3 line-clamp-2 min-h-[2.4em]">{l(u.mission.title)}</div>
                <div className="mt-3 flex items-center gap-2"><ProgressBar pct={pct} height="h-1.5" /><span className="text-[10px] font-bold text-dim tabular-nums">{Math.round(pct * 100)}%</span></div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
