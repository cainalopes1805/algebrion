import { motion } from 'framer-motion';
import { useProfile } from '../store/useGame';
import { ACHIEVEMENTS } from '../data/economy';
import { MISSIONS } from '../data/content';
import { useT } from '../i18n';
import { Card, ProgressBar, SectionTitle, Stat, cx } from '../components/ui';

export default function Glories() {
  const { t, l, lang } = useT();
  const p = useProfile();
  const got = ACHIEVEMENTS.filter((a) => p.achievements[a.id]);
  const acc = p.stats.correct + p.stats.wrong > 0 ? Math.round((p.stats.correct / (p.stats.correct + p.stats.wrong)) * 100) : 0;
  const stars = Object.values(p.completedLevels).reduce((s, x) => s + x.stars, 0);
  const maxStars = MISSIONS.reduce((s, m) => s + m.levels.length * 3, 0);

  return (
    <div className="space-y-6">
      <SectionTitle icon="🎖️" sub={`${got.length}/${ACHIEVEMENTS.length}`}>{t('nav_glories')}</SectionTitle>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <Stat icon="🎯" value={`${acc}%`} label={t('accuracy')} />
        <Stat icon="✅" value={p.stats.correct} label={t('correct')} />
        <Stat icon="⭐" value={`${stars}/${maxStars}`} label={t('stars')} />
        <Stat icon="🔥" value={p.stats.bestCombo} label={t('best_combo')} />
      </div>
      <ProgressBar pct={got.length / ACHIEVEMENTS.length} height="h-3" />

      <div className="grid sm:grid-cols-2 gap-3">
        {ACHIEVEMENTS.map((a, i) => {
          const ts = p.achievements[a.id];
          return (
            <motion.div key={a.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i, 14) * 0.03 }}>
              <Card gold={!!ts} className={cx('p-4 flex items-center gap-4', !ts && 'opacity-55')}>
                <div className={cx('w-14 h-14 shrink-0 rounded-2xl border-2 flex items-center justify-center text-3xl', ts ? 'border-accent bg-accent/15 anim-glow' : 'border-line bg-black/30 grayscale')}>{ts ? a.icon : '🔒'}</div>
                <div className="min-w-0">
                  <div className="font-display font-black leading-tight">{l(a.name)}</div>
                  <div className="text-xs text-dim">{l(a.desc)}</div>
                  <div className="text-[11px] mt-0.5 text-accent">{ts ? new Date(ts).toLocaleDateString(lang) : a.gold ? `🎁 ${a.gold} 💰` : ''}</div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
