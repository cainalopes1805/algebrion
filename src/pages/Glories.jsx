import { motion } from 'framer-motion';
import { Medal, Target, CheckCircle2, Star, Flame, Lock, Gift, Coins, Award } from 'lucide-react';
import { useProfile } from '../store/useGame';
import { ACHIEVEMENTS } from '../data/economy';
import { MISSIONS } from '../data/content';
import { useT } from '../i18n';
import { ACHIEVEMENT_ICON } from '../components/gameIcons';
import { ProgressBar, SectionTitle, cx } from '../components/ui';

const StatTile = ({ Icon, value, label }) => (
  <div className="card-pro !rounded-xl px-3 py-3.5 flex flex-col items-center text-center">
    <Icon size={18} strokeWidth={1.9} className="text-accent2" />
    <span className="font-display font-black text-xl mt-2 leading-none tabular-nums">{value}</span>
    <span className="eyebrow !text-[9.5px] text-dim mt-1.5">{label}</span>
  </div>
);

export default function Glories() {
  const { t, l, lang } = useT();
  const p = useProfile();
  const got = ACHIEVEMENTS.filter((a) => p.achievements[a.id]);
  const acc = p.stats.correct + p.stats.wrong > 0 ? Math.round((p.stats.correct / (p.stats.correct + p.stats.wrong)) * 100) : 0;
  const stars = Object.values(p.completedLevels).reduce((s, x) => s + x.stars, 0);
  const maxStars = MISSIONS.reduce((s, m) => s + m.levels.length * 3, 0);

  return (
    <div className="space-y-6">
      <SectionTitle icon={Medal} sub={`${got.length}/${ACHIEVEMENTS.length}`}>{t('nav_glories')}</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <StatTile Icon={Target} value={`${acc}%`} label={t('accuracy')} />
        <StatTile Icon={CheckCircle2} value={p.stats.correct} label={t('correct')} />
        <StatTile Icon={Star} value={`${stars}/${maxStars}`} label={t('stars')} />
        <StatTile Icon={Flame} value={p.stats.bestCombo} label={t('best_combo')} />
      </div>
      <div className="flex items-center gap-3">
        <ProgressBar pct={got.length / ACHIEVEMENTS.length} height="h-1.5" className="flex-1" />
        <span className="text-[11px] font-bold text-dim tabular-nums">{Math.round((got.length / ACHIEVEMENTS.length) * 100)}%</span>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {ACHIEVEMENTS.map((a, i) => {
          const ts = p.achievements[a.id];
          const Icon = ACHIEVEMENT_ICON[a.id] || Award;
          return (
            <motion.div key={a.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i, 14) * 0.03 }}>
              <div className={cx('card-pro p-4 flex items-center gap-4 h-full', ts ? '!border-accent/50' : 'opacity-60')}>
                <div className={cx('w-12 h-12 shrink-0 rounded-xl border flex items-center justify-center', ts ? 'border-accent/70 bg-gradient-to-br from-accent/35 to-accent/5 text-accent2 shadow-[0_0_16px_-4px_rgb(var(--glow)/.7)]' : 'border-line bg-black/30 text-dim')}>
                  {ts ? <Icon size={22} strokeWidth={1.8} /> : <Lock size={18} strokeWidth={1.8} />}
                </div>
                <div className="min-w-0">
                  <div className="font-display font-extrabold leading-tight">{l(a.name)}</div>
                  <div className="text-xs text-dim mt-0.5">{l(a.desc)}</div>
                  <div className="text-[11px] mt-1.5 text-accent flex items-center gap-1">
                    {ts ? new Date(ts).toLocaleDateString(lang) : a.gold ? <><Gift size={12} />{a.gold}<Coins size={11} /></> : ''}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
