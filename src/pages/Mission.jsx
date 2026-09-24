import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProfile } from '../store/useGame';
import { getMission } from '../data/content';
import { biomeColor } from '../data/biomes';
import { CHARACTERS, MONSTERS } from '../data/characters';
import { useT } from '../i18n';
import { sounds } from '../utils/audio';
import Character from '../components/Character';
import Monster from '../components/Monster';
import DialogueBox from '../components/DialogueBox';
import { Button, Card, SectionTitle, cx } from '../components/ui';

export default function Mission() {
  const { id } = useParams();
  const mission = getMission(id);
  const p = useProfile();
  const { t, l } = useT();
  const nav = useNavigate();
  const [talking, setTalking] = useState(false);

  if (!mission) return <div className="text-center py-16"><Link to="/" className="underline">{t('back')}</Link></div>;
  if (!p.unlockedMissions.includes(mission.id)) {
    return (
      <div className="max-w-md mx-auto panel p-8 text-center mt-10">
        <div className="text-6xl">🔒</div>
        <p className="my-4">{t('locked_msg')}</p>
        <Button onClick={() => nav('/')}>{t('back')}</Button>
      </div>
    );
  }
  const color = biomeColor(mission.biome);
  const mentor = CHARACTERS[mission.mentor];
  const lessonsRead = mission.lessons.filter((x) => p.lessonsRead[`${mission.id}-${x.id}`]).length;

  return (
    <div className="space-y-8">
      <Link to="/trail" className="text-sm text-dim hover:text-accent2" onClick={() => sounds.click()}>← {t('back')}</Link>

      {/* Cabeçalho da missão */}
      <section className="relative panel overflow-hidden p-5 sm:p-7" style={{ borderColor: `${color}88` }}>
        <div className="absolute inset-0 opacity-70" style={{ background: `radial-gradient(ellipse at 85% 40%, ${color}40, transparent 60%), linear-gradient(180deg, ${color}12, transparent)` }} />
        <div className="relative flex flex-col-reverse sm:flex-row items-center gap-4">
          <div className="flex-1 text-center sm:text-left">
            <div className="text-[11px] tracking-[0.35em] uppercase" style={{ color }}>{t('mission')} {mission.id}</div>
            <h1 className="font-fancy text-2xl sm:text-3xl font-black text-gold-grad leading-tight">{mission.icon} {l(mission.title)}</h1>
            <p className="text-dim mt-1">{l(mission.subtitle)}</p>
            <Button className="mt-4" variant="ghost" size="sm" onClick={() => setTalking((v) => !v)}>💬 {t('talk_to', { name: l(mentor.name) })}</Button>
          </div>
          <div className="shrink-0"><Character id={mission.mentor} size={130} speaking={talking} /></div>
        </div>
        {talking && (
          <div className="relative mt-5">
            <DialogueBox mentor={mission.mentor} lines={mission.intro} onDone={() => setTalking(false)} doneLabel={t('close')} />
          </div>
        )}
      </section>

      {/* Lições */}
      <section>
        <SectionTitle icon="📖" sub={`${lessonsRead}/${mission.lessons.length} ${t('lessons_read')}`}>{t('lessons')}</SectionTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {mission.lessons.map((ls, i) => {
            const read = p.lessonsRead[`${mission.id}-${ls.id}`];
            return (
              <motion.div key={ls.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                <Link to={`/mission/${mission.id}/lesson/${ls.id}`} onClick={() => sounds.click()} className="block panel p-4 h-full hover:border-accent hover:-translate-y-0.5 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-accent/15 border border-accent/40 flex items-center justify-center text-2xl">{ls.icon}</div>
                    <div className="min-w-0">
                      <div className="font-display font-black leading-tight">{l(ls.title)}</div>
                      <div className="text-xs text-dim">{ls.pages.length} {t('pages')} {read ? '· ✅' : `· +15 XP`}</div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Fases */}
      <section>
        <SectionTitle icon="⚔️" sub={t('levels_sub')}>{t('levels')}</SectionTitle>
        <div className="space-y-3">
          {mission.levels.map((lv, i) => {
            const rec = p.completedLevels[`${mission.id}-${lv.id}`];
            const available = i === 0 || p.completedLevels[`${mission.id}-${lv.id - 1}`];
            const count = lv.activities.length + (lv.gen || []).reduce((s, [, n]) => s + n, 0);
            return (
              <motion.div key={lv.id} initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
                <Card gold={lv.boss && available} className={cx('p-4', !available && 'opacity-50')}>
                  <div className="flex items-center gap-4">
                    <div className={cx('w-14 h-14 shrink-0 rounded-2xl border-2 flex items-center justify-center font-display font-black text-xl', rec ? 'border-good bg-good/15 text-good' : available ? 'border-accent bg-accent/15 text-accent2' : 'border-line text-dim')}>
                      {lv.boss ? <Monster id={mission.boss} size={46} defeated={!!rec} /> : available ? lv.id : '🔒'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-display font-black leading-tight">{lv.boss ? `👹 ${l(MONSTERS[mission.boss].name)}` : l(lv.title)}</div>
                      <div className="text-xs text-dim">{l(lv.description)}</div>
                      <div className="text-[11px] text-dim mt-1">{count} {t('challenges')} · +{lv.xpReward} XP · +{lv.goldReward} 💰</div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <div className="flex">{[1, 2, 3].map((s) => <span key={s} className={cx('text-lg', (rec?.stars || 0) >= s ? '' : 'grayscale opacity-25')}>⭐</span>)}</div>
                      <Button size="sm" disabled={!available} onClick={() => nav(`/mission/${mission.id}/level/${lv.id}`)}>{rec ? t('replay') : t('play')}</Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
