import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useGame, useProfile } from '../store/useGame';
import { SCENES } from '../data/story';
import { CHARACTERS, MONSTERS } from '../data/characters';
import { realize } from '../data/generators';
import { makeRng } from '../utils/rng';
import { useT } from '../i18n';
import { sounds } from '../utils/audio';
import Backdrop from '../components/Backdrop';
import Character from '../components/Character';
import Monster from '../components/Monster';
import ActivityView from '../components/ActivityView';
import Confetti from '../components/Confetti';
import { Button, cx } from '../components/ui';

const npcOf = (who) => (who && who !== 'hero' ? who : null);
const activeProfile = () => {
  const s = useGame.getState();
  return s.profiles[s.activeId];
};

export default function Story() {
  const { sceneId } = useParams();
  const scene = SCENES[sceneId];
  if (!scene) return <div className="p-10 text-center">?</div>;
  return <Player key={sceneId} id={sceneId} scene={scene} />;
}

function Player({ id, scene }) {
  const { t, l } = useT();
  const nav = useNavigate();
  const [params] = useSearchParams();
  const then = params.get('then') || '/trail';
  const p = useProfile();
  const { setStoryFlag, storyReward, addShard, finishScene } = useGame.getState();
  // cena já vista antes de abrir: é um replay — as escolhas anteriores ficam como estão e não há recompensas
  const replay = useRef(!!p.story.seen[id]).current;

  const [queue, setQueue] = useState(scene.steps);
  const [idx, setIdx] = useState(0);
  const [cast, setCast] = useState([]); // NPCs em cena (mais recentes por último)
  const [speaker, setSpeaker] = useState(null);
  const [showTitle, setShowTitle] = useState(!!scene.title);
  const [shown, setShown] = useState(0);
  const [fx, setFx] = useState(null);
  const [end, setEnd] = useState(null);
  const [puzzle, setPuzzle] = useState(null);
  const [shardStep, setShardStep] = useState(null);
  const [shaking, setShaking] = useState(false);

  const step = queue[idx];
  const sub = useCallback((txt) => String(txt).replaceAll('{name}', p.name), [p.name]);
  const stepText = step && step.text ? sub(l(step.text)) : '';
  const typing = step?.t === 'say' || step?.t === 'narr' ? shown < stepText.length : false;

  const finish = useCallback(() => {
    const r = finishScene(id, scene.reward);
    if (r?.first && (scene.reward?.xp || scene.reward?.gold)) setEnd(scene.reward);
    else nav(then, { replace: true });
  }, [finishScene, id, scene.reward, nav, then]);

  const splice = useCallback((steps) => {
    setQueue((q) => [...q.slice(0, idx + 1), ...steps, ...q.slice(idx + 1)]);
  }, [idx]);

  const advance = useCallback(() => {
    if (idx + 1 >= queue.length) finish();
    else setIdx(idx + 1);
  }, [idx, queue.length, finish]);

  // entra em cada passo
  useEffect(() => {
    if (!step) return;
    setShown(0);
    if (step.t === 'say') {
      const n = npcOf(step.who);
      if (n) {
        setCast((c) => [...c.filter((x) => x !== n), n].slice(-2));
        setSpeaker(n);
      } else setSpeaker('hero');
    } else if (step.t === 'narr') setSpeaker(null);
    else if (step.t === 'if') {
      const val = activeProfile().story.flags[step.flag];
      const chosen = val === step.is ? step.steps : [];
      setQueue((q) => [...q.slice(0, idx + 1), ...chosen, ...q.slice(idx + 1)]);
      setIdx((i) => i + 1);
    } else if (step.t === 'fx') {
      setFx({ kind: step.fx, k: Math.random() });
      if (step.fx === 'shake' || step.fx === 'thunder') { setShaking(true); setTimeout(() => setShaking(false), 520); }
      if (step.fx === 'thunder') sounds.hit();
      else if (step.fx === 'shake') sounds.wrong();
      else if (step.fx === 'sparks') sounds.sword();
      const tm = setTimeout(advance, 650);
      return () => clearTimeout(tm);
    } else if (step.t === 'puzzle') {
      setPuzzle({ activity: realize(step.gen, makeRng(Date.now())), result: null });
    } else if (step.t === 'shard') {
      addShard(step.n);
      sounds.achievement();
      setShardStep(step);
    }
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, step?.t]);

  // máquina de escrever
  useEffect(() => {
    if (!typing) return undefined;
    const tm = setInterval(() => setShown((s) => Math.min(stepText.length, s + 2)), 16);
    return () => clearInterval(tm);
  }, [typing, stepText.length, idx]);

  const tap = () => {
    if (showTitle) { setShowTitle(false); return; }
    if (!step) return;
    if (step.t === 'say' || step.t === 'narr') {
      sounds.click();
      if (typing) setShown(stepText.length);
      else advance();
    }
  };

  useEffect(() => {
    const onKey = (e) => {
      if (puzzle) return;
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tap(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const pick = (opt) => {
    sounds.select();
    if (opt.set) Object.entries(opt.set).forEach(([k, v]) => setStoryFlag(k, v));
    if (opt.reward) storyReward(opt.reward);
    if (opt.reply?.length) splice(opt.reply);
    setIdx(idx + 1);
  };

  // replay: reaproveita a escolha já feita, sem gravar nada de novo
  const chosenBefore = (st) => st.options.find((o) => o.set && Object.entries(o.set).every(([k, v]) => p.story.flags[k] === v)) || st.options.find((o) => !o.needGold) || st.options[0];
  const pickReplay = (opt) => {
    sounds.select();
    if (opt.reply?.length) splice(opt.reply);
    setIdx(idx + 1);
  };

  const skip = () => {
    sounds.click();
    for (let i = idx; i < queue.length; i++) {
      const s = queue[i];
      if (s.t === 'shard') addShard(s.n);
      if (s.t === 'choice' && !replay) {
        const o = s.options[0];
        if (o?.set) Object.entries(o.set).forEach(([k, v]) => setStoryFlag(k, v));
        for (const r of o?.reply || []) if (r.t === 'shard') addShard(r.n);
      }
    }
    finish();
  };

  const onPuzzleAnswer = ({ correct }) => {
    if (correct && !replay) storyReward({ xp: 8, gold: 4 });
    setPuzzle((pz) => ({ ...pz, result: correct }));
  };
  const onPuzzleNext = () => {
    const ok = puzzle.result;
    const branch = (ok ? step.ok : step.fail) || [];
    setPuzzle(null);
    splice(branch);
    setIdx(idx + 1);
  };

  const heroChar = p.hero;
  const size = typeof window !== 'undefined' && window.innerWidth < 520 ? 118 : 170;
  const npcAtSpeaker = speaker && speaker !== 'hero' ? speaker : null;

  const progress = Math.min(1, idx / Math.max(1, queue.length));
  const lastNpc = cast[cast.length - 1] || 'sage';
  const speakName = speaker === 'hero' ? p.name : speaker?.startsWith('m:') ? l(MONSTERS[speaker.slice(2)].name) : speaker ? l(CHARACTERS[speaker].name) : '';

  // personagens do palco
  const stage = useMemo(() => cast, [cast]);

  return (
    <div className="fixed inset-0 z-10 bg-black flex flex-col select-none" onClick={tap}>
      <div className={cx('relative flex-1 min-h-0', shaking && 'anim-shake')}>
        <Backdrop kind={scene.bg} dim={step?.t === 'narr'} />

        {replay && <div className="absolute top-12 inset-x-0 z-20 flex justify-center pointer-events-none"><span className="px-3 py-1 rounded-full bg-black/60 border border-white/15 text-[10px] font-extrabold uppercase tracking-[0.14em] text-white/80">{t('replay_note')}</span></div>}

        {/* progresso + pular */}
        <div className="absolute top-0 inset-x-0 z-20 p-3 flex items-center gap-3">
          <div className="flex-1 h-2 rounded-full bg-black/50 overflow-hidden"><div className="h-full bg-accent transition-all" style={{ width: `${progress * 100}%` }} /></div>
          <button onClick={(e) => { e.stopPropagation(); skip(); }} className="px-3 py-1.5 rounded-xl bg-black/50 border-2 border-white/20 text-white text-xs font-black uppercase tracking-wider">{t('skip_scene')} »</button>
        </div>

        {/* personagens */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-2 sm:px-16 pointer-events-none">
          <motion.div initial={{ x: -80, opacity: 0 }} animate={{ x: 0, opacity: 1, filter: speaker && speaker !== 'hero' ? 'brightness(.55)' : 'brightness(1)' }} transition={{ type: 'spring', damping: 20 }} className="mb-2">
            <Character id={heroChar} size={size} mood={puzzle?.result === false ? 'sad' : 'happy'} speaking={speaker === 'hero'} />
          </motion.div>
          <div className="flex items-end gap-0 mb-2">
            <AnimatePresence>
              {stage.map((n) => (
                <motion.div key={n} initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1, filter: npcAtSpeaker === n ? 'brightness(1)' : 'brightness(.5)', scale: npcAtSpeaker === n ? 1.04 : 0.92 }} exit={{ opacity: 0 }} transition={{ type: 'spring', damping: 18 }} className={stage.length > 1 ? '-ml-8' : ''}>
                  {n.startsWith('m:') ? <Monster id={n.slice(2)} size={size * 1.15} /> : <Character id={n} size={size} flip speaking={npcAtSpeaker === n} />}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* efeitos */}
        <AnimatePresence>
          {fx && (fx.kind === 'flash' || fx.kind === 'thunder' || fx.kind === 'sparks') && (
            <motion.div key={fx.k} initial={{ opacity: 0.9 }} animate={{ opacity: 0 }} transition={{ duration: 0.6 }} className={cx('absolute inset-0 z-10 pointer-events-none', fx.kind === 'sparks' ? 'bg-orange-300' : 'bg-white')} />
          )}
        </AnimatePresence>
      </div>

      {/* caixa de diálogo */}
      <div className="relative z-20 bg-bg border-t-2 border-line px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] min-h-[210px] max-h-[46vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="max-w-2xl mx-auto" onClick={tap}>
          {step?.t === 'say' && (
            <>
              <div className="inline-block px-3 py-1 -mt-8 mb-2 rounded-xl bg-accent text-on-accent font-display font-black text-sm uppercase tracking-wider">{speakName}</div>
              <p className="text-lg leading-relaxed font-bold min-h-[5rem]">{stepText.slice(0, shown)}{typing && <span className="inline-block w-2 h-5 bg-accent ml-0.5 align-middle animate-pulse" />}</p>
            </>
          )}
          {step?.t === 'narr' && (
            <p className="text-base sm:text-lg leading-relaxed italic text-dim min-h-[5rem]">{stepText.slice(0, shown)}{typing && <span className="inline-block w-2 h-5 bg-dim ml-0.5 align-middle animate-pulse" />}</p>
          )}
          {step?.t === 'choice' && (
            <div className="space-y-2 pt-1">
              <div className="text-[11px] font-black uppercase tracking-[0.25em] text-accent mb-1">{t('your_choice')}</div>
              {replay && (() => {
                const c = chosenBefore(step);
                return (
                  <>
                    <div className="w-full text-left p-3.5 rounded-2xl border-2 border-accent bg-accent/10 font-display font-extrabold text-sm sm:text-base">
                      <span className="eyebrow !text-[9.5px] text-accent block mb-1">{t('choice_kept')}</span>{sub(l(c.text))}
                    </div>
                    <Button className="w-full mt-2" onClick={() => pickReplay(c)}>{t('continue')} →</Button>
                  </>
                );
              })()}
              {!replay && step.options.map((o) => {
                const off = o.needGold && p.gold < o.needGold;
                return (
                  <motion.button key={o.id} whileTap={{ scale: 0.98 }} disabled={off} onClick={() => pick(o)} className={cx('w-full text-left p-3.5 rounded-2xl border-2 border-b-4 font-display font-extrabold text-sm sm:text-base', off ? 'border-line opacity-40' : 'border-line bg-surface hover:border-accent')}>
                    {sub(l(o.text))}{o.needGold ? ` (−${o.needGold} 💰)` : ''}
                  </motion.button>
                );
              })}
            </div>
          )}
          {(step?.t === 'say' || step?.t === 'narr') && !typing && (
            <div className="flex justify-end mt-1"><motion.span animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="text-accent text-xl">▼</motion.span></div>
          )}
        </div>
      </div>

      {/* enigma de matrizes */}
      {puzzle && (
        <div className="absolute inset-0 z-30 bg-bg/95 overflow-y-auto px-4 pt-6" onClick={(e) => e.stopPropagation()}>
          <div className="text-center mb-3 text-[11px] font-black uppercase tracking-[0.25em] text-mana">🗝️ {t('puzzle_title')}</div>
          <ActivityView key={idx} activity={puzzle.activity} mentor={lastNpc.startsWith('m:') ? 'sage' : lastNpc} onAnswer={onPuzzleAnswer} onNext={onPuzzleNext} hintCount={0} />
        </div>
      )}

      {/* fragmento */}
      <AnimatePresence>
        {shardStep && (
          <motion.div key="shard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-40 bg-black/85 flex flex-col items-center justify-center text-center px-6" onClick={(e) => { e.stopPropagation(); setShardStep(null); advance(); }}>
            <Confetti count={40} coins={false} />
            <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', damping: 10 }} className="text-8xl anim-glow" style={{ color: 'rgb(var(--glow))' }}>🔷</motion.div>
            <div className="text-[11px] font-black uppercase tracking-[0.3em] text-accent mt-4">{t('shard_found')} {shardStep.n}/7</div>
            <div className="font-display font-black text-2xl mt-1">{l(shardStep.name)}</div>
            <div className="flex gap-1.5 mt-4">{Array.from({ length: 7 }, (_, i) => <span key={i} className={cx('w-6 h-6 rounded-md border-2 flex items-center justify-center text-xs', i < shardStep.n ? 'border-accent bg-accent/30' : 'border-line')}>{i < shardStep.n ? '🔷' : ''}</span>)}</div>
            <div className="text-dim text-xs mt-5">{t('tap_continue')}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* título de capítulo */}
      <AnimatePresence>
        {showTitle && (
          <motion.div key="title" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center text-center px-8" onClick={(e) => { e.stopPropagation(); setShowTitle(false); }}>
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="font-fancy text-3xl sm:text-4xl font-black text-accent leading-tight max-w-lg">{l(scene.title)}</motion.div>
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.7, duration: 0.8 }} className="h-px w-40 bg-accent mt-5" />
            <div className="text-dim text-xs mt-4 tracking-widest uppercase">{t('tap_continue')}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* fim da cena */}
      <AnimatePresence>
        {end && (
          <motion.div key="end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-50 bg-black/85 flex items-center justify-center px-6" onClick={(e) => e.stopPropagation()}>
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="panel panel-gold p-6 text-center max-w-sm w-full">
              <div className="text-4xl">📜</div>
              <h3 className="font-display text-xl font-black mt-1">{t('scene_done')}</h3>
              <p className="my-3 text-lg font-black">{end.xp ? `+${end.xp} XP` : ''} {end.gold ? `· +${end.gold} 💰` : ''}</p>
              <Button className="w-full" onClick={() => nav(then, { replace: true })}>{t('continue')}</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
