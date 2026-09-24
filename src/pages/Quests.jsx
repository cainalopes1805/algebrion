import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollText, Flame, Check, Coins, Star, Gift, Clock } from 'lucide-react';
import { useGame, useProfile } from '../store/useGame';
import { QUEST_KINDS } from '../data/economy';
import { useT } from '../i18n';
import { SectionTitle, ProgressBar, cx } from '../components/ui';
import { QUEST_ICON } from '../components/gameIcons';
import { sounds } from '../utils/audio';

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
    <div className="space-y-8">
      <section>
        <SectionTitle icon={ScrollText} sub={<span className="inline-flex items-center gap-1"><Clock size={11} />{t('resets_in')} {left}</span>}>{t('daily_quests')}</SectionTitle>
        <div className="space-y-3">
          {p.quests.list.map((q, i) => {
            const k = QUEST_KINDS[q.kind];
            const Icon = QUEST_ICON[q.kind] || Star;
            const done = q.progress >= q.target;
            const ready = done && !q.claimed;
            return (
              <motion.div key={q.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                <div className={cx('card-pro p-4 flex items-center gap-4 transition-colors', ready && '!border-accent/70 shadow-[0_0_0_1px_rgb(var(--glow)/.25),0_10px_28px_-10px_rgb(var(--glow)/.5)]', q.claimed && 'opacity-55')}>
                  <div className={cx('w-12 h-12 shrink-0 rounded-xl border flex items-center justify-center', q.claimed ? 'bg-good/15 border-good/50 text-good' : done ? 'bg-accent/15 border-accent/60 text-accent2' : 'bg-black/25 border-line text-dim')}>
                    {q.claimed ? <Check size={22} strokeWidth={2.6} /> : <Icon size={22} strokeWidth={1.8} />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-display font-extrabold leading-tight">{l(k.name(q.target))}</div>
                    <div className="flex items-center gap-3 mt-2">
                      <ProgressBar pct={q.progress / q.target} className="flex-1" height="h-1.5" color={done ? 'good' : 'accent'} />
                      <span className="text-[11px] font-bold text-dim tabular-nums">{Math.min(q.progress, q.target)}/{q.target}</span>
                    </div>
                    <div className="text-[11px] text-dim mt-1.5 flex items-center gap-1.5">
                      <Gift size={12} className="text-accent2" />
                      <span className="inline-flex items-center gap-0.5 tabular-nums">+{q.gold}<Coins size={11} className="text-accent2" /></span>
                      <span className="opacity-40">·</span>
                      <span className="tabular-nums">+{q.xp} XP</span>
                    </div>
                  </div>
                  <button
                    disabled={!ready}
                    onClick={() => { sounds.click(); claim(q.id); }}
                    className={cx('shrink-0 px-4 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-[0.14em] transition-all', ready ? 'btn-cta !gap-1.5' : 'bg-black/25 border border-line text-dim')}
                  >
                    {q.claimed ? t('claimed') : t('claim')}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section>
        <SectionTitle icon={Flame} sub={t('streak_sub')}>{t('streak')}</SectionTitle>
        <div className="card-pro p-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-400/40 flex items-center justify-center">
              <Flame size={34} strokeWidth={1.8} className={cx('text-orange-400', p.streak > 0 ? 'fill-orange-400/40 anim-flame' : 'opacity-50')} />
            </div>
            <div>
              <div className="font-display text-3xl font-black text-accent2 leading-none tabular-nums">{p.streak} <span className="text-base font-extrabold">{t('days')}</span></div>
              <div className="eyebrow !text-[10px] text-dim mt-2">{t('best_streak')}: <span className="tabular-nums text-ink">{p.bestStreak}</span></div>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1.5 mt-5">
            {days.map((d, i) => {
              const active = i <= todayIdx && todayIdx - i < p.streak;
              return (
                <div key={i} className={cx('rounded-lg py-2.5 flex flex-col items-center gap-1.5 border', active ? 'bg-accent/15 border-accent/60 text-accent2' : 'border-line bg-black/15 text-dim', i === todayIdx && 'ring-1 ring-accent/70 ring-offset-2 ring-offset-transparent')}>
                  <span className="text-[10px] font-display font-extrabold tracking-wider">{d}</span>
                  {active ? <Flame size={16} className="text-orange-400 fill-orange-400/40" /> : <span className="w-1.5 h-1.5 rounded-full bg-line" />}
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-2 mt-5">
            {MILESTONES.map((m) => {
              const on = p.bestStreak >= m;
              return (
                <span key={m} className={cx('pl-2.5 pr-3 py-1 rounded-full text-[11px] font-display font-extrabold border inline-flex items-center gap-1', on ? 'border-accent/60 bg-accent/12 text-accent2' : 'border-line text-dim')}>
                  {on && <Check size={12} strokeWidth={3} />}{m} {t('days')}
                </span>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
