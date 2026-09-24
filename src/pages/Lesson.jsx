import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useGame } from '../store/useGame';
import { getMission } from '../data/content';
import { MASTERY } from '../data/spells';
import { MISSION_BG } from '../data/biomes';
import { realize } from '../data/generators';
import { makeRng } from '../utils/rng';
import { useT } from '../i18n';
import { sounds } from '../utils/audio';
import { FocusShell } from '../components/Layout';
import { ExprDisplay } from '../components/MatrixDisplay';
import { BookOpen } from 'lucide-react';
import ActivityView from '../components/ActivityView';
import Character from '../components/Character';
import Rich from '../components/Rich';
import Confetti from '../components/Confetti';
import { Button, ProgressBar } from '../components/ui';

// Lição interativa: explica um pouco → o aluno resolve na hora → explica mais → resolve…
export default function Lesson() {
  const { missionId, lessonId } = useParams();
  const mission = getMission(missionId);
  const lesson = mission?.lessons.find((x) => x.id === Number(lessonId));
  const { t } = useT();
  if (!lesson) return <FocusShell><div className="p-10 text-center"><Link to="/" className="underline">{t('back')}</Link></div></FocusShell>;
  return <Runner mission={mission} lesson={lesson} />;
}

function Runner({ mission, lesson }) {
  const { t, l } = useT();
  const nav = useNavigate();
  const readLesson = useGame((s) => s.readLesson);
  const recordAnswer = useGame((s) => s.recordAnswer);
  const addMastery = useGame((s) => s.addMastery);
  const [i, setI] = useState(0);
  const [reward, setReward] = useState(null);
  const [hits, setHits] = useState(0);

  const steps = useMemo(() => {
    const rng = makeRng(Date.now());
    const out = [];
    lesson.pages.forEach((pg, k) => {
      out.push({ kind: 'page', pg, k });
      // depois de cada página, algumas atividades de fixação sobre o que acabou de ser explicado
      (lesson.tries?.[k] || []).forEach((spec) => out.push({ kind: 'try', activity: realize(spec, rng), k }));
    });
    return out;
  }, [lesson]);

  const step = steps[i];
  const last = i === steps.length - 1;
  const tryCount = steps.filter((s) => s.kind === 'try').length;

  // a lição de um passo termina no treino do mesmo passo (a fase de mesmo número)
  const practiceRoute = `/mission/${mission.id}/level/${lesson.id}`;
  const advance = () => {
    sounds.page();
    if (last) {
      const r = readLesson(mission.id, lesson.id);
      // a lição e as respostas certas nas atividades de fixação rendem maestria do feitiço deste conceito
      addMastery({ missionId: mission.id, conceptId: lesson.id, pts: hits * MASTERY.lessonTry + (r?.first ? MASTERY.lesson : 0) });
      if (r?.first) { sounds.victory(); setReward(r); } else nav(practiceRoute);
      return;
    }
    setI(i + 1);
  };
  const onAnswer = ({ correct }) => {
    recordAnswer({ correct, combo: 0 });
    if (correct) setHits((h) => h + 1);
  };

  return (
    <FocusShell bg={MISSION_BG[mission.id]}>
      <div className="max-w-2xl mx-auto px-4 pt-4 pb-10">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => nav('/trail')} className="w-9 h-9 rounded-xl border-2 border-line bg-surface text-dim hover:text-ink" aria-label={t('exit')}>✕</button>
          <ProgressBar pct={i / steps.length} className="flex-1" height="h-3.5" />
          <Link to={`/tome/${mission.id}/${lesson.id}`} onClick={() => sounds.click()} className="shrink-0 px-3 h-9 rounded-lg border border-line bg-surface text-accent2 hover:border-accent inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.12em]" title={t('tome_open')}><BookOpen size={15} strokeWidth={1.9} /><span className="hidden sm:inline">{t('tome_open')}</span></Link>
        </div>

        <AnimatePresence mode="wait">
          {step.kind === 'page' ? (
            <motion.div key={`p${i}`} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.25 }}>
              <div className="text-center mb-3 text-[11px] font-black uppercase tracking-[0.25em] text-accent">{l(lesson.title)}</div>
              <div className="panel p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="hidden sm:block shrink-0 -mt-1"><Character id={mission.mentor} size={92} speaking /></div>
                  <div className="flex-1">
                    <h2 className="font-display text-xl sm:text-2xl font-black text-accent2">{l(step.pg.title)}</h2>
                    <p className="mt-3 text-base sm:text-lg leading-relaxed font-semibold"><Rich text={l(step.pg.body)} /></p>
                  </div>
                </div>
                {step.pg.display && <div className="mt-5 p-4 rounded-2xl bg-black/20 border-2 border-line overflow-x-auto"><ExprDisplay items={step.pg.display} /></div>}
                {step.pg.formula && <div className="mt-4 text-center font-display text-lg sm:text-2xl font-black text-accent2 py-3 rounded-2xl border-2 border-accent/50 bg-accent/10">{step.pg.formula}</div>}
              </div>
              <div className="flex justify-between gap-3 mt-6">
                <Button variant="ghost" disabled={i === 0} onClick={() => { sounds.page(); let j = i - 1; while (j > 0 && steps[j].kind === 'try') j -= 1; setI(Math.max(0, j)); }}>←</Button>
                <Button className="flex-1 max-w-xs" onClick={advance}>{steps[i + 1]?.kind === 'try' ? t('practice_now') : last ? t('finish_lesson') : t('next')} →</Button>
              </div>
            </motion.div>
          ) : (
            <motion.div key={`t${i}`} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.25 }}>
              <div className="text-center mb-3 text-[11px] font-black uppercase tracking-[0.25em] text-mana">⚡ {t('your_turn')}</div>
              <ActivityView activity={step.activity} mentor={mission.mentor} onAnswer={onAnswer} onNext={advance} hintCount={0} nextLabel={last ? t('finish_lesson') : undefined} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {reward && (
        <div className="fixed inset-0 z-[70] bg-black/75 flex items-center justify-center p-4">
          <Confetti count={50} />
          <motion.div initial={{ scale: 0.6 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 12 }} className="panel panel-gold p-7 text-center max-w-sm w-full">
            <div className="text-5xl">📖</div>
            <h3 className="font-display text-2xl font-black text-accent2 mt-2">{t('lesson_done')}</h3>
            {tryCount > 0 && <p className="text-dim text-sm mt-1">{hits}/{tryCount} {t('correct').toLowerCase()}</p>}
            <p className="my-3 text-lg font-black">+{reward.xp} XP · +{reward.gold} 💰</p>
            <div className="flex flex-col gap-2">
              <Button className="w-full" onClick={() => nav(practiceRoute)}>{t('practice_this')} →</Button>
              <Button variant="ghost" className="w-full" onClick={() => nav('/trail')}>{t('back_to_map')}</Button>
            </div>
          </motion.div>
        </div>
      )}
    </FocusShell>
  );
}
