// O Tomo dos Feitiços: a biblioteca medieval com a história de cada magia, o método passo a passo e demonstrações animadas.
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, BookOpen, Library, Lock, Pause, Play, RotateCcw, ScrollText, SkipBack, SkipForward, X, Feather, Sigma, Droplet } from 'lucide-react';
import { useProfile } from '../store/useGame';
import { MISSIONS, getMission } from '../data/content';
import { tomeOf } from '../data/tome';
import { SPELL_BY_ID, MASTERY_GOAL, effectText, effectKind, masteryOf } from '../data/spells';
import { biomeColor } from '../data/biomes';
import { useT } from '../i18n';
import { sounds } from '../utils/audio';
import { FocusShell } from '../components/Layout';
import { ExprDisplay } from '../components/MatrixDisplay';
import Rich from '../components/Rich';
import { spellIcon, EFFECT_COLOR } from '../components/spellIcons';
import { missionIcon, ROMAN } from '../components/gameIcons';
import { SectionTitle, cx } from '../components/ui';

// todos os tomos em ordem de leitura
const ALL = MISSIONS.flatMap((m) => m.lessons.map((ls) => ({ mission: m.id, concept: ls.id })));

/* ───────────── Demonstração animada ───────────── */
function TomeDemo({ frames }) {
  const { t, l } = useT();
  const [i, setI] = useState(0);
  const [play, setPlay] = useState(true);
  const n = frames.length;
  useEffect(() => { setI(0); setPlay(true); }, [frames]);
  useEffect(() => {
    if (!play || n < 2) return undefined;
    const id = setTimeout(() => setI((x) => (x + 1) % n), 3000);
    return () => clearTimeout(id);
  }, [i, play, n]);
  const f = frames[i] || frames[0];
  const go = (k) => { sounds.click(); setPlay(false); setI((k + n) % n); };
  return (
    <div className="tome-plate" data-theme="crypt">
      <div className="min-h-[170px] flex items-center justify-center px-1 py-2">
        <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="w-full flex justify-center">
          <ExprDisplay items={f.items} size="sm" animate={false} />
        </motion.div>
      </div>
      <div className="min-h-[3.4rem] px-2 text-center">
        <motion.p key={`n${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-book italic text-[17px] leading-snug text-[#f0e0bc]"><Rich text={l(f.note)} /></motion.p>
      </div>
      <div className="mt-2 flex items-center justify-center gap-3 text-[#d9b56a]">
        <button onClick={() => go(0)} aria-label={t('tome_restart')} className="p-1.5 rounded-md hover:bg-white/10"><RotateCcw size={16} /></button>
        <button onClick={() => go(i - 1)} aria-label={t('tome_prev_frame')} className="p-1.5 rounded-md hover:bg-white/10"><SkipBack size={16} /></button>
        <button onClick={() => { sounds.click(); setPlay((p) => !p); }} aria-label={play ? t('tome_pause') : t('tome_play')} className="w-9 h-9 rounded-full border border-[#b98d3e] flex items-center justify-center hover:bg-white/10">{play ? <Pause size={16} /> : <Play size={16} className="fill-current" />}</button>
        <button onClick={() => go(i + 1)} aria-label={t('tome_next_frame')} className="p-1.5 rounded-md hover:bg-white/10"><SkipForward size={16} /></button>
        <span className="text-[11px] font-bold tabular-nums w-10 text-center">{i + 1}/{n}</span>
      </div>
      <div className="flex justify-center gap-1 mt-2">{frames.map((_, k) => <span key={k} className={cx('h-1 rounded-full transition-all', k === i ? 'w-5 bg-[#d9b56a]' : 'w-1.5 bg-white/25')} />)}</div>
    </div>
  );
}

/* ───────────── Páginas ───────────── */
const PageFoot = ({ n, side, label }) => (
  <div className={cx('absolute bottom-3 inset-x-8 flex items-center text-[11px] text-[#8a6a34] font-book italic', side === 'left' ? 'justify-start' : 'justify-end')}>
    {side === 'left' ? <span>{n} · {label}</span> : <span>{label} · {n}</span>}
  </div>
);

function OriginPage({ mission, lesson, entry, side, n }) {
  const { t, l } = useT();
  const MI = missionIcon(mission.id);
  const color = biomeColor(mission.biome);
  return (
    <div className={cx('tome-page', side)}>
      <div className="tome-ribbon" />
      <div className="tome-eyebrow">{t('tome_volume')} {ROMAN[mission.id - 1]} · {l(mission.title)}</div>
      <h1 className="tome-h1 text-[28px] sm:text-[32px] mt-3">{l(lesson.title)}</h1>
      <div className="tome-rule my-3" />
      <div className="flex items-center gap-3 mb-3">
        <div className="w-14 h-14 shrink-0 rounded-full flex items-center justify-center" style={{ background: `radial-gradient(circle at 35% 30%, ${color}66, #3a2412 75%)`, boxShadow: 'inset 0 0 0 2px #b98d3e, 0 3px 8px rgb(0 0 0 / .35)', color: '#f3d9a4' }}><MI size={26} strokeWidth={1.6} /></div>
        <div className="tome-eyebrow !text-[#7a2410]">{t('tome_origin')}</div>
      </div>
      <p className="tome-p tome-drop"><Rich text={l(entry.origin)} /></p>
      <PageFoot n={n} side={side} label={t('tome_origin')} />
    </div>
  );
}

function MethodPage({ entry, side, n }) {
  const { t, l } = useT();
  return (
    <div className={cx('tome-page', side)}>
      <div className="tome-eyebrow !text-[#7a2410]">{t('tome_method')}</div>
      <div className="tome-rule my-2" />
      <ol className="space-y-3.5 mt-3">
        {entry.steps.map((s, i) => (
          <li key={i} className="flex gap-3 ink-in" style={{ animationDelay: `${0.25 + i * 0.35}s` }}>
            <span className="tome-h1 text-2xl w-9 shrink-0 text-center leading-none pt-0.5">{ROMAN[i]}</span>
            <div>
              <div className="font-book font-semibold text-[19px] leading-tight text-[#6e2a14]">{l(s.title)}</div>
              <p className="font-book text-[17.5px] leading-snug mt-0.5"><Rich text={l(s.body)} /></p>
            </div>
          </li>
        ))}
      </ol>
      <PageFoot n={n} side={side} label={t('tome_method')} />
    </div>
  );
}

function DemoPage({ entry, side, n }) {
  const { t, l } = useT();
  const [k, setK] = useState(0);
  const demos = entry.demos;
  return (
    <div className={cx('tome-page', side)}>
      <div className="tome-eyebrow !text-[#7a2410]">{t('tome_demo')}</div>
      <div className="tome-rule my-2" />
      {demos.length > 1 && (
        <div className="flex gap-2 mb-3 flex-wrap">
          {demos.map((d, i) => <button key={i} onClick={() => { sounds.click(); setK(i); }} className={cx('px-3 py-1 rounded-full text-[13px] font-book font-semibold border transition-colors', i === k ? 'bg-[#6e2a14] text-[#f3d9a4] border-[#6e2a14]' : 'border-[#8a6a34] text-[#6e2a14] hover:bg-[#6e2a14]/10')}>{l(d.title)}</button>)}
        </div>
      )}
      {demos.length === 1 && <div className="font-book italic text-[16px] text-[#6e4a24] mb-2">{l(demos[0].title)}</div>}
      <TomeDemo frames={demos[k].frames} />
      <PageFoot n={n} side={side} label={t('tome_demo')} />
    </div>
  );
}

function WarnPage({ mission, lesson, entry, side, n, prev, next, practiceTo }) {
  const { t, l } = useT();
  const nav = useNavigate();
  const p = useProfile();
  const sp = SPELL_BY_ID[`${mission.id}-${lesson.id}`];
  const Icon = sp ? spellIcon(sp.icon) : Feather;
  const c = sp ? EFFECT_COLOR[effectKind(sp.effect)] : '#8a6a34';
  const m = sp ? masteryOf(p, sp) : 0;
  const go = (to) => { sounds.click(); nav(to); };
  return (
    <div className={cx('tome-page', side)}>
      <div className="tome-eyebrow !text-[#7a2410]">{t('tome_warning')}</div>
      <div className="tome-rule my-2" />
      <div className="flex gap-4 items-start mt-3">
        <div className="tome-seal shrink-0"><Feather size={26} strokeWidth={1.6} /></div>
        <p className="font-book italic text-[19px] leading-snug"><Rich text={l(entry.tip)} /></p>
      </div>
      {sp && (
        <div className="mt-6 rounded-lg p-3.5 border border-[#8a6a34]/60 bg-[#6e2a14]/[0.06]">
          <div className="tome-eyebrow !text-[10px]">{t('tome_spell_here')}</div>
          <div className="flex items-center gap-3 mt-2">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center border-2" style={{ borderColor: c, background: `${c}22`, color: c }}><Icon size={24} strokeWidth={1.7} /></div>
            <div className="min-w-0 flex-1">
              <div className="font-book font-semibold text-[19px] leading-tight text-[#6e2a14]">{l(sp.name)}</div>
              <div className="font-book text-[15px] leading-snug">{l(effectText(sp.effect))}</div>
            </div>
            <span className="inline-flex items-center gap-0.5 text-[#1f4f8a] font-bold text-sm"><Droplet size={14} />{sp.cost}{sp.formula && <Sigma size={13} className="ml-1 text-[#7a2410]" />}</span>
          </div>
          <div className="mt-2.5 h-1.5 rounded-full bg-[#6e2a14]/15 overflow-hidden"><div className="h-full rounded-full" style={{ width: `${(m / MASTERY_GOAL) * 100}%`, background: '#a32a14' }} /></div>
          <div className="text-[12px] text-[#6e4a24] mt-1 font-book italic">{t('mastery')}: {m}/{MASTERY_GOAL}</div>
        </div>
      )}
      <div className="mt-6 flex flex-wrap gap-2.5">
        <button onClick={() => go(practiceTo)} className="px-4 py-2.5 rounded-md bg-[#6e2a14] text-[#f3d9a4] font-book font-semibold text-[16px] inline-flex items-center gap-2 hover:brightness-110 shadow"><ScrollText size={16} />{t('tome_practice')}</button>
        <button onClick={() => go('/grimoire')} className="px-4 py-2.5 rounded-md border border-[#6e2a14] text-[#6e2a14] font-book font-semibold text-[16px] inline-flex items-center gap-2 hover:bg-[#6e2a14]/10"><BookOpen size={16} />{t('nav_grimoire')}</button>
      </div>
      <div className="mt-5 flex justify-between gap-3 text-[15px] font-book">
        {prev ? <button onClick={() => go(`/tome/${prev.mission}/${prev.concept}`)} className="inline-flex items-center gap-1.5 text-[#6e2a14] hover:underline"><ArrowLeft size={15} />{t('tome_prev')}</button> : <span />}
        {next ? <button onClick={() => go(`/tome/${next.mission}/${next.concept}`)} className="inline-flex items-center gap-1.5 text-[#6e2a14] hover:underline">{t('tome_next')}<ArrowRight size={15} /></button> : <span />}
      </div>
      <PageFoot n={n} side={side} label={t('tome_warning')} />
    </div>
  );
}

/* ───────────── Leitor ───────────── */
export default function Tome() {
  const { missionId, conceptId } = useParams();
  const { t, l } = useT();
  const nav = useNavigate();
  const p = useProfile();
  const mission = getMission(missionId);
  const lesson = mission?.lessons.find((x) => x.id === Number(conceptId));
  const entry = mission && lesson ? tomeOf(mission.id, lesson.id) : null;
  const [wide, setWide] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 900);
  const [params] = useSearchParams();
  const [view, setView] = useState(() => Math.max(0, Number(params.get('p')) || 0)); // ?p=1 abre direto numa página
  const [dir, setDir] = useState(1);
  useEffect(() => {
    const on = () => setWide(window.innerWidth >= 900);
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  useEffect(() => { setView(Math.max(0, Number(params.get('p')) || 0)); }, [missionId, conceptId]); // eslint-disable-line react-hooks/exhaustive-deps

  const idxAll = ALL.findIndex((x) => x.mission === Number(missionId) && x.concept === Number(conceptId));
  const prev = ALL[idxAll - 1], next = ALL[idxAll + 1];
  const perView = wide ? 2 : 1;
  const total = 4;
  const views = Math.ceil(total / perView);
  const turn = (d) => {
    const nv = Math.max(0, Math.min(views - 1, view + d));
    if (nv === view) return;
    sounds.page();
    setDir(d);
    setView(nv);
  };
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'ArrowRight') turn(1); if (e.key === 'ArrowLeft') turn(-1); if (e.key === 'Escape') nav(-1); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const pages = useMemo(() => (mission && lesson && entry ? [
    (side, n) => <OriginPage key="o" mission={mission} lesson={lesson} entry={entry} side={side} n={n} />,
    (side, n) => <MethodPage key="m" entry={entry} side={side} n={n} />,
    (side, n) => <DemoPage key={`d${lesson.id}`} entry={entry} side={side} n={n} />,
    (side, n) => <WarnPage key="w" mission={mission} lesson={lesson} entry={entry} side={side} n={n} prev={prev} next={next} practiceTo={p.lessonsRead[`${mission.id}-${lesson.id}`] ? `/mission/${mission.id}/level/${lesson.id}` : `/mission/${mission.id}/lesson/${lesson.id}`} />,
  ] : []), [mission, lesson, entry, prev, next, p.lessonsRead]);

  if (!mission || !lesson || !entry) return <FocusShell><div className="p-10 text-center"><Link to="/grimoire" className="underline">{t('back')}</Link></div></FocusShell>;
  if (!p.unlockedMissions.includes(mission.id)) return <FocusShell><div className="max-w-md mx-auto p-10 text-center card-pro mt-20"><Lock className="mx-auto" /><p className="my-4">{t('locked_msg')}</p><Link to="/grimoire" className="underline">{t('back')}</Link></div></FocusShell>;

  const start = view * perView;
  const visible = pages.slice(start, start + perView);
  return (
    <div className="tome-scene">
      <div className="tome-glow" style={{ left: '-14vmax', top: '6vh' }} />
      <div className="tome-glow" style={{ right: '-16vmax', top: '32vh', animationDelay: '-1.8s' }} />
      {Array.from({ length: 14 }, (_, i) => <span key={i} className="fixed w-1 h-1 rounded-full bg-[#ffd9a0] pointer-events-none" style={{ left: `${(i * 37) % 100}%`, bottom: `${(i * 23) % 40}%`, '--mx': `${(i % 2 ? 1 : -1) * (20 + (i % 5) * 8)}px`, animation: `mote ${9 + (i % 5) * 2}s ease-out infinite`, animationDelay: `${-i * 1.3}s` }} />)}

      <div className="relative max-w-5xl mx-auto px-3 sm:px-6 pt-4 pb-10">
        <div className="flex items-center gap-3 mb-4 text-[#e8d3a0]">
          <button onClick={() => { sounds.click(); nav(-1); }} className="w-9 h-9 rounded-lg border border-[#6b4a24] bg-black/30 hover:bg-black/50 flex items-center justify-center" aria-label={t('exit')}><X size={17} /></button>
          <Library size={18} className="opacity-80" />
          <div className="font-fancy text-[15px] font-black tracking-wide truncate flex-1">{t('tome_title')}</div>
          <Link to="/library" onClick={() => sounds.click()} className="text-[11px] font-extrabold uppercase tracking-[0.14em] hover:text-white inline-flex items-center gap-1.5"><Library size={13} />{t('tome_library')}</Link>
        </div>

        <div className="tome-cover">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={`${missionId}-${conceptId}-${view}-${perView}`}
              className={cx('tome-spread', perView === 2 && 'two')}
              custom={dir}
              initial={{ opacity: 0, rotateY: dir * -14, x: dir * 30 }}
              animate={{ opacity: 1, rotateY: 0, x: 0 }}
              exit={{ opacity: 0, rotateY: dir * 14, x: dir * -30 }}
              transition={{ duration: 0.38 }}
              style={{ transformOrigin: dir > 0 ? 'left center' : 'right center' }}
            >
              {visible.map((render, i) => render(perView === 1 ? 'single' : i === 0 ? 'left' : 'right', start + i + 1))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-5 flex items-center justify-center gap-4 text-[#e8d3a0]">
          <button onClick={() => turn(-1)} disabled={view === 0} className="px-4 py-2 rounded-lg border border-[#6b4a24] bg-black/30 disabled:opacity-30 hover:bg-black/50 inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.12em]"><ArrowLeft size={15} />{t('tome_prev_page')}</button>
          <div className="flex gap-1.5">{Array.from({ length: views }, (_, i) => <span key={i} className={cx('h-1.5 rounded-full transition-all', i === view ? 'w-6 bg-[#d9b56a]' : 'w-1.5 bg-white/30')} />)}</div>
          <button onClick={() => turn(1)} disabled={view === views - 1} className="px-4 py-2 rounded-lg border border-[#6b4a24] bg-black/30 disabled:opacity-30 hover:bg-black/50 inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.12em]">{t('tome_next_page')}<ArrowRight size={15} /></button>
        </div>
      </div>
    </div>
  );
}

/* ───────────── Biblioteca (índice de todos os tomos) ───────────── */
export function TomeLibrary() {
  const { t, l } = useT();
  const p = useProfile();
  const nav = useNavigate();
  return (
    <div className="space-y-8">
      <SectionTitle icon={Library} sub={t('tome_library_sub')}>{t('tome_library')}</SectionTitle>
      {MISSIONS.map((m) => {
        const color = biomeColor(m.biome);
        const MI = missionIcon(m.id);
        const locked = !p.unlockedMissions.includes(m.id);
        return (
          <section key={m.id} className={cx(locked && 'opacity-55')}>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}30`, border: `1px solid ${color}88`, color: `color-mix(in oklab, ${color} 45%, white)` }}><MI size={16} strokeWidth={1.9} /></span>
              <h2 className="eyebrow text-dim">{t('tome_volume')} {ROMAN[m.id - 1]} · {l(m.title)}</h2>
              <span className="h-px flex-1 bg-line" />
              {locked && <Lock size={14} className="text-dim" />}
            </div>
            <div className="rounded-xl px-3 pt-4 pb-0 border border-[#3a2412]" style={{ background: 'linear-gradient(180deg, #24160c, #170e08)' }}>
              <div className="flex flex-wrap gap-2 items-end">
                {m.lessons.map((ls) => {
                  const sp = SPELL_BY_ID[`${m.id}-${ls.id}`];
                  const mastery = sp ? masteryOf(p, sp) / MASTERY_GOAL : 0;
                  const Icon = sp ? spellIcon(sp.icon) : BookOpen;
                  return (
                    <button key={ls.id} disabled={locked} onClick={() => { sounds.click(); nav(`/tome/${m.id}/${ls.id}`); }} title={l(ls.title)} className="group relative w-[58px] h-[170px] rounded-t-md flex flex-col items-center justify-between py-2 border border-black/40 hover:-translate-y-1.5 transition-transform" style={{ background: `linear-gradient(90deg, ${color}66, ${color}aa 45%, ${color}55)`, boxShadow: 'inset 0 0 0 1px rgb(255 255 255 / .08), inset 0 -18px 18px -14px rgb(0 0 0 / .5)' }}>
                      <span className="w-full h-1 bg-[#d9b56a]/70" />
                      <Icon size={17} className="text-[#f3e3b8]" strokeWidth={1.7} />
                      <span className="font-book font-semibold text-[13px] text-[#f8ecd0] leading-tight px-1" style={{ writingMode: 'vertical-rl', maxHeight: 88, overflow: 'hidden' }}>{l(ls.title)}</span>
                      <span className="w-6 h-1 rounded-full bg-black/40 overflow-hidden"><span className="block h-full bg-[#d9b56a]" style={{ width: `${mastery * 100}%` }} /></span>
                      <span className="w-full h-1 bg-[#d9b56a]/70" />
                    </button>
                  );
                })}
              </div>
              <div className="h-3 -mx-3 mt-0 rounded-b-xl" style={{ background: 'linear-gradient(180deg, #5a3a1c, #2e1c0d)', boxShadow: '0 6px 10px rgb(0 0 0 / .5)' }} />
            </div>
          </section>
        );
      })}
    </div>
  );
}
