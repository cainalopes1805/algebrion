import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGame, useProfile } from '../store/useGame';
import { QUEST_KINDS } from '../data/economy';
import { useT } from '../i18n';
import { Button, Card, ProgressBar, SectionTitle, cx } from '../components/ui';

function useMidnightCountdown() {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const end = new Date();
  end.setHours(24, 0, 0, 0);
  const left = Math.max(0, end - now);
  const h = Math.floor(left / 3600000);
  const m = String(Math.floor((left % 3600000) / 60000)).padStart(2, '0');
  return `${h}h ${m}m`;
}

const MILESTONES = [3, 7, 14, 30];

export default function Quests() {
  const { t, l } = useT();
  const p = useProfile();
  const claim = useGame((s) => s.claimQuest);
  const left = useMidnightCountdown();
  const days = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];
  const todayIdx = (new Date().getDay() + 6) % 7;

  return (
    <div className="space-y-6">
      <SectionTitle icon="📜" sub={`${t('resets_in')} ${left}`}>{t('daily_quests')}</SectionTitle>
      <div className="space-y-3">
        {p.quests.list.map((q, i) => {
          const k = QUEST_KINDS[q.kind];
          const done = q.progress >= q.target;
          return (
            <motion.div key={q.id} initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
              <Card gold={done && !q.claimed} className={cx('p-4 flex items-center gap-4', q.claimed && 'opacity-60')}>
                <div className={cx('w-14 h-14 shrink-0 rounded-2xl border-2 flex items-center justify-center text-3xl', done ? 'border-accent bg-accent/15' : 'border-line bg-black/25')}>{q.claimed ? '✅' : k.icon}</div>
                <div className="min-w-0 flex-1">
                  <div className="font-display font-black leading-tight">{l(k.name(q.target))}</div>
                  <div className="flex items-center gap-3 mt-2">
                    <ProgressBar pct={q.progress / q.target} className="flex-1" height="h-2.5" color={done ? 'good' : 'accent'} />
                    <span className="text-xs text-dim tabular-nums">{q.progress}/{q.target}</span>
                  </div>
                  <div className="text-[11px] text-dim mt-1">🎁 +{q.gold} 💰 · +{q.xp} XP</div>
                </div>
                <Button size="sm" disabled={!done || q.claimed} onClick={() => claim(q.id)}>{q.claimed ? t('claimed') : t('claim')}</Button>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <SectionTitle icon="🔥" sub={t('streak_sub')}>{t('streak')}</SectionTitle>
      <Card className="p-5">
        <div className="flex items-center gap-4">
          <div className="text-5xl anim-flame">🔥</div>
          <div>
            <div className="font-display text-3xl font-black text-gold-grad">{p.streak} {t('days')}</div>
            <div className="text-xs text-dim">{t('best_streak')}: {p.bestStreak}</div>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1.5 mt-4">
          {days.map((d, i) => {
            const active = i <= todayIdx && todayIdx - i < p.streak;
            return (
              <div key={i} className={cx('rounded-lg py-2 text-center border', active ? 'bg-accent/20 border-accent text-accent2' : 'border-line text-dim', i === todayIdx && 'ring-2 ring-accent/60')}>
                <div className="text-[10px] font-display">{d}</div>
                <div className="text-lg">{active ? '🔥' : '·'}</div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {MILESTONES.map((m) => (
            <span key={m} className={cx('px-3 py-1 rounded-full text-xs font-display font-bold border', p.bestStreak >= m ? 'border-accent bg-accent/15 text-accent2' : 'border-line text-dim')}>{p.bestStreak >= m ? '✓ ' : ''}{m} {t('days')}</span>
          ))}
        </div>
      </Card>
    </div>
  );
}
