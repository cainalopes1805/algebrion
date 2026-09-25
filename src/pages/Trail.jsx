import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, animate, motion } from 'framer-motion';
import { useGame, useProfile } from '../store/useGame';
import { buildTrail } from '../data/trail';
import { biomeColor } from '../data/biomes';
import { LOCS, SEGS, MAP_H, WORLD_X0, WORLD_X1, segPath, pointAt, stopAt, buildDecor, buildLife, RIVERS, BRIDGES, REGION_LABELS, wpT } from '../data/mapGeometry';
import { MONSTERS } from '../data/characters';
import { useT } from '../i18n';
import { sounds } from '../utils/audio';
import Character from '../components/Character';
import { Decor, MapFrame, Compass, Landmark, Track, River, Bridge, ZeroGround, INK } from '../components/MapArt';
import MapLife, { MapSky } from '../components/MapLife';
import { skyAt } from '../utils/sky';
import { Sparkles, Gem, Lock, Check, Play, Coins, Star, ChevronRight, BookOpen } from 'lucide-react';
import { Button, cx } from '../components/ui';
import { ROMAN, missionIcon, kindIcon } from '../components/gameIcons';
import { SPELL_BY_ID, MASTERY_GOAL, masteryOf, effectKind } from '../data/spells';
import { spellIcon, EFFECT_COLOR } from '../components/spellIcons';

const DECOR = buildDecor();
const LIFE = buildLife(DECOR);

// posição (x, y) de um passo no percurso: unidade m ocupa o trecho [m-1, m]
function stepPos(unit, node) {
  const m = unit.mission.id;
  const walk = unit.nodes.filter((n) => n.kind !== 'boss' && n.kind !== 'story');
  const k = walk.findIndex((n) => n.key === node.key);
  return stopAt(m - 1 + wpT(walk.length, k), k);
}

export default function Trail() {
  const p = useProfile();
  const { t, l } = useT();
  const nav = useNavigate();
  const motionMode = useGame((s) => s.settings.motion);
  const mapTime = useGame((s) => s.settings.mapTime);
  // luz do mapa: segue o relógio do aparelho (ou o modo fixo escolhido em Ajustes)
  const [sky, setSky] = useState(() => skyAt(mapTime));
  useEffect(() => {
    setSky(skyAt(mapTime));
    if (mapTime !== 'auto') return undefined;
    const id = setInterval(() => setSky(skyAt('auto')), 60000);
    return () => clearInterval(id);
  }, [mapTime]);
  const trail = useMemo(() => buildTrail(p), [p]);
  const [popup, setPopup] = useState(null); // nó aberto
  const [sheet, setSheet] = useState(null); // índice do local aberto
  const heroRef = useRef(null);
  const [wide, setWide] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 720);
  useEffect(() => {
    const on = () => setWide(window.innerWidth >= 720);
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  // janela do mapa: estreita no celular; estendida nas telas largas (o terreno continua para os lados)
  const vx0 = wide ? WORLD_X0 : 0;
  const vw = wide ? WORLD_X1 - WORLD_X0 : 400;
  const pct = (x, y) => ({ left: `${((x - vx0) / vw) * 100}%`, top: `${(y / MAP_H) * 100}%` });

  // onde o herói está: no último ponto concluído
  const heroTarget = useMemo(() => {
    const cur = trail.current;
    if (!cur) return 7;
    const u = trail.units.find((x) => x.mission.id === cur.mission.id);
    const walk = u.nodes.filter((n) => n.kind !== 'boss' && n.kind !== 'story');
    const m = cur.mission.id;
    if (cur.kind === 'story') return m;
    if (cur.kind === 'boss') return m - 1 + wpT(walk.length, walk.length - 1);
    const k = walk.findIndex((n) => n.key === cur.key);
    return k === 0 ? m - 1 + 0.04 : m - 1 + wpT(walk.length, k - 1);
  }, [trail]);

  const storeKey = `algebrion_hero_p_${p.id}`;
  const [heroP, setHeroP] = useState(() => {
    try { const v = parseFloat(localStorage.getItem(`algebrion_hero_p_${p.id}`)); return Number.isFinite(v) ? v : heroTarget; } catch { return heroTarget; }
  });
  useEffect(() => {
    let from = heroP;
    if (motionMode === 'off' || Math.abs(from - heroTarget) < 0.001) { setHeroP(heroTarget); try { localStorage.setItem(storeKey, String(heroTarget)); } catch { /* noop */ } return undefined; }
    sounds.select();
    const c = animate(from, heroTarget, { duration: Math.min(3.2, 0.9 + Math.abs(heroTarget - from) * 1.6), ease: 'easeInOut', onUpdate: setHeroP, onComplete: () => { try { localStorage.setItem(storeKey, String(heroTarget)); } catch { /* noop */ } } });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heroTarget]);

  useEffect(() => {
    const id = setTimeout(() => heroRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' }), 250);
    return () => clearTimeout(id);
  }, []);

  const [hx, hy] = pointAt(heroP);
  const firstLocked = trail.units.findIndex((u) => !u.unlocked); // índice da 1ª unidade trancada
  const fogY = firstLocked === -1 ? -1 : LOCS[firstLocked + 1].y + 130;

  const open = (node, unit) => { sounds.click(); setPopup({ node, unit }); };
  const go = (node) => { sounds.click(); nav(node.to); };

  return (
    <div className="w-full">
      {/* Grande Matriz — flutua sobre o mapa */}
      <div className="sticky top-[57px] z-20 h-0">
        <div className="px-3 pt-2 max-w-sm">
          <div className="rounded-xl bg-bg/85 backdrop-blur-md border border-line p-2.5 flex items-center gap-2.5 shadow-[0_8px_24px_-10px_rgba(0,0,0,.7)]">
            <span className="w-8 h-8 shrink-0 rounded-lg bg-accent/10 border border-accent/40 flex items-center justify-center text-accent2"><Sparkles size={16} strokeWidth={1.8} /></span>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between"><span className="eyebrow !text-[9.5px] text-dim">{t('great_matrix')}</span><span className="text-[11px] font-bold tabular-nums text-accent2">{p.story.shards.length}/7</span></div>
              <div className="flex gap-1 mt-1.5">
                {Array.from({ length: 7 }, (_, i) => { const on = p.story.shards.includes(i + 1); return <div key={i} className={cx('flex-1 h-4 rounded border flex items-center justify-center', on ? 'border-accent/70 bg-accent/25 text-accent2' : 'border-line bg-black/20 text-dim/40')}><Gem size={9} strokeWidth={on ? 2.2 : 1.6} /></div>; })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full" style={{ aspectRatio: `${vw}/${MAP_H}` }}>
        {/* camada 1 — terreno estático (texturas pesadas ficam aqui, sem animação) */}
        <svg viewBox={`${vx0} 0 ${vw} ${MAP_H}`} className="absolute inset-0 w-full h-full pointer-events-none" role="img" aria-label={t('kingdom_map')}>
          <defs>
            <linearGradient id="land" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2a1c28" /><stop offset=".12" stopColor="#25202a" /><stop offset=".22" stopColor="#1f2a26" />
              <stop offset=".36" stopColor="#332f28" /><stop offset=".47" stopColor="#22303a" /><stop offset=".58" stopColor="#332f1e" />
              <stop offset=".70" stopColor="#25302a" /><stop offset=".82" stopColor="#2a3220" /><stop offset="1" stopColor="#30301c" />
            </linearGradient>
            <filter id="paper"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" seed="4" /><feColorMatrix values="0 0 0 0 .55  0 0 0 0 .45  0 0 0 0 .3  0 0 0 .14 0" /></filter>
            <filter id="stains" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".006 .004" numOctaves="4" seed="9" /><feColorMatrix values="0 0 0 0 .1  0 0 0 0 .07  0 0 0 0 .03  0 0 0 1.5 -.5" /></filter>
            <filter id="blotch" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".02" numOctaves="3" seed="21" /><feColorMatrix values="0 0 0 0 .75  0 0 0 0 .62  0 0 0 0 .38  0 0 0 1.2 -.5" /></filter>
            <radialGradient id="edge" cx=".5" cy=".5" r=".75"><stop offset=".6" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".55" /></radialGradient>
          </defs>
          <rect x={vx0} width={vw} height={MAP_H} fill="url(#land)" />
          <rect x={vx0} width={vw} height={MAP_H} filter="url(#blotch)" opacity=".32" />
          <rect x={vx0} width={vw} height={MAP_H} filter="url(#stains)" opacity=".6" />
          <rect x={vx0} width={vw} height={MAP_H} filter="url(#paper)" />
          <rect x={vx0} width={vw} height={MAP_H} fill="url(#edge)" />
          <MapFrame x0={vx0} w={vw} />

          {/* terreno */}
          <ZeroGround />
          {RIVERS.map((r, i) => <River key={i} r={r} />)}
          {DECOR.filter((d) => d.track && d.x > vx0 - 30 && d.x < vx0 + vw + 30).map((d, i) => <Track key={i} d={d} />)}
          {DECOR.filter((d) => d.x > vx0 - 30 && d.x < vx0 + vw + 30).map((d, i) => <Decor key={i} d={d} />)}
          {REGION_LABELS.map((r, i) => (
            <text key={i} x={r.a === 'start' ? vx0 + 30 : r.a === 'end' ? vx0 + vw - 30 : r.x} y={r.y} textAnchor={r.a || 'middle'} fill={INK} fontSize="10" fontStyle="italic" fontWeight="700" opacity=".7" letterSpacing="1.5" style={{ textTransform: 'uppercase' }}>{l(r.t)}</text>
          ))}
          <Compass x={vx0 + vw - 66} y={2930} />
          <text x="322" y="2660" textAnchor="middle" fill="#5e563f" fontSize="9" fontStyle="italic" fontWeight="700" letterSpacing="1.5" opacity=".9">LINHAS</text>

          {/* título */}
          <g transform="translate(200 78)">
            <path d="M-150 -22 h300 l-14 22 l14 22 h-300 l14 -22z" fill="#1a1509" stroke={INK} strokeWidth="1.5" />
            <text textAnchor="middle" y="-2" fill="#e6c67f" fontSize="22" fontFamily="Cinzel Decorative, serif" fontWeight="900" letterSpacing="3">ALGEBRION</text>
            <text textAnchor="middle" y="14" fill={INK} fontSize="8.5" fontWeight="800" letterSpacing="4">{t('tagline').toUpperCase()}</text>
          </g>

        </svg>

        {/* camada 2 — vida: água, animais, aves, luzes */}
        {motionMode !== 'off' && (
          <svg viewBox={`${vx0} 0 ${vw} ${MAP_H}`} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
            <MapLife x0={vx0} w={vw} decor={DECOR} life={LIFE} sky={sky} calm={motionMode === 'reduced'} />
          </svg>
        )}

        {/* camada 3 — estrada, marcos, paradas e névoa (interativa) */}
        <svg viewBox={`${vx0} 0 ${vw} ${MAP_H}`} className="absolute inset-0 w-full h-full" aria-hidden="true">
          <defs>
            <linearGradient id="fog" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0a0d12" stopOpacity=".86" /><stop offset=".85" stopColor="#0a0d12" stopOpacity=".78" /><stop offset="1" stopColor="#0a0d12" stopOpacity="0" /></linearGradient>
          </defs>
          {/* estrada */}
          {SEGS.map((s, i) => {
            const frac = Math.max(0, Math.min(1, heroP - i));
            return (
              <g key={i}>
                <path d={segPath(s)} fill="none" stroke="#7a8a55" strokeWidth="24" strokeLinecap="round" opacity=".13" />
                <path d={segPath(s)} fill="none" stroke="#0d0a05" strokeWidth="14" strokeLinecap="round" opacity=".7" />
                <path d={segPath(s)} fill="none" stroke="#5c4d33" strokeWidth="9.5" strokeLinecap="round" />
                <path d={segPath(s)} fill="none" stroke="#3f3422" strokeWidth="1" strokeDasharray="14 9" opacity=".8" transform="translate(-2.2 0)" />
                <path d={segPath(s)} fill="none" stroke="#3f3422" strokeWidth="1" strokeDasharray="10 12" opacity=".8" transform="translate(2.2 0)" />
                <path d={segPath(s)} fill="none" stroke="#a49070" strokeWidth="2.4" strokeDasharray="0.1 9" strokeLinecap="round" transform="translate(0 6)" opacity=".55" />
                <path d={segPath(s)} fill="none" stroke="#8a7650" strokeWidth="1.6" strokeDasharray="1 6" strokeLinecap="round" opacity=".7" />
                <path d={segPath(s)} pathLength="1" fill="none" stroke="#d9b45a" strokeWidth="2.6" strokeLinecap="round" strokeDasharray={`${frac} 2`} opacity=".9" />
              </g>
            );
          })}

          {BRIDGES.map((b, i) => <Bridge key={i} b={b} />)}

          {/* marcos */}
          {LOCS.map((loc, i) => {
            const unit = i > 0 ? trail.units[i - 1] : null;
            const locked = unit ? !unit.unlocked : false;
            const bossDone = unit ? unit.nodes.find((n) => n.kind === 'boss')?.done : true;
            const color = unit ? biomeColor(unit.mission.biome) : '#a4854a';
            const ready = unit && unit.unlocked && !bossDone;
            return (
              <g key={loc.id} transform={`translate(${loc.x} ${loc.y})`}>
                <g
                  onClick={() => { sounds.click(); if (unit) setSheet(i - 1); else { sounds.select(); } }}
                  style={{ cursor: unit ? 'pointer' : 'default', filter: locked ? 'grayscale(.85) brightness(.55)' : undefined }}
                >
                  {ready && <ellipse cx="0" cy="0" rx="72" ry="16" fill="none" stroke={color} strokeWidth="2" strokeDasharray="4 4" className="anim-twinkle" />}
                  <Landmark kind={loc.kind} />
                  {bossDone && unit && <g transform="translate(46 -70)"><circle r="10" fill="#c9a04e" stroke="#6a4f16" strokeWidth="1.5" /><Check x={-6} y={-6} size={12} strokeWidth={3.2} color="#1a1206" /></g>}
                </g>
                <text y="20" textAnchor="middle" fontSize="10.5" fontWeight="900" fill={locked ? '#6b6250' : '#efe0b8'} stroke="#0d0a05" strokeWidth="3" paintOrder="stroke" letterSpacing=".5">{l(loc.name)}</text>
                {unit && <text y="32" textAnchor="middle" fontSize="8" fontWeight="800" fill={locked ? '#6b6250' : color} stroke="#0d0a05" strokeWidth="2.5" paintOrder="stroke" letterSpacing="2">{t('unit').toUpperCase()} {unit.mission.id}</text>}
              </g>
            );
          })}

          {/* paradas do caminho */}
          {trail.units.map((unit) => {
            const walk = unit.nodes.filter((n) => n.kind !== 'boss' && n.kind !== 'story');
            const color = biomeColor(unit.mission.biome);
            return walk.map((node, k) => {
              const [x, y] = stopAt(unit.mission.id - 1 + wpT(walk.length, k), k);
              const isCur = trail.current?.key === node.key;
              const locked = !node.available;
              const fill = node.done ? '#b8934a' : locked ? '#1c1810' : isCur ? color : '#3a3222';
              const stroke = node.done ? '#6a4f16' : locked ? '#3a3324' : isCur ? '#e6c67f' : INK;
              return (
                <g key={node.key} transform={`translate(${x} ${y})`} onClick={() => open(node, unit)} style={{ cursor: 'pointer' }}>
                  {isCur && <circle r="15" fill="none" stroke="#e6c67f" strokeWidth="2" className="animate-ping" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />}
                  <circle r={isCur ? 15 : 12.5} fill={fill} stroke={stroke} strokeWidth="2.4" />
                  {(() => { const Ic = node.done ? Check : locked ? Lock : kindIcon(node.kind); const sz = isCur ? 17 : 14; return <Ic x={-sz / 2} y={-sz / 2} width={sz} height={sz} strokeWidth={node.done ? 3 : 2} color={node.done ? '#1a1206' : locked ? '#6b6250' : isCur ? '#1a1206' : '#e6c67f'} />; })()}
                </g>
              );
            });
          })}

          {/* névoa sobre o que ainda não foi alcançado */}
          {fogY > 0 && <rect x={vx0} y="0" width={vw} height={fogY} fill="url(#fog)" pointerEvents="none" />}
          {fogY > 0 && [0, 1, 2, 3].map((i) => <ellipse key={i} cx={vx0 + 60 + i * (vw / 4)} cy={fogY - 90 - i * 70} rx="120" ry="26" fill="#aab4c0" opacity=".08" pointerEvents="none" style={{ animation: `drift ${70 + i * 15}s linear infinite`, animationDelay: `${-i * 20}s` }} />)}
        </svg>

        {/* tom do dia/noite sobre o mapa inteiro */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: sky.tint, mixBlendMode: 'multiply', transition: 'background-color 2.5s' }} />

        {/* camada do céu — luzes da noite e nuvens */}
        <svg viewBox={`${vx0} 0 ${vw} ${MAP_H}`} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
          <MapSky x0={vx0} w={vw} decor={DECOR} life={LIFE} sky={sky} calm={motionMode !== 'full'} />
        </svg>

        {/* herói */}
        <div ref={heroRef} className="absolute pointer-events-none z-10" style={{ ...pct(hx, hy), transform: 'translate(-50%, -88%)' }}>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-9 h-2 rounded-full bg-black/50 blur-[1px]" />
            <Character id={p.hero} size={42} />
          </div>
        </div>

        {/* balão "começar" */}
        {trail.current && trail.current.kind !== 'story' && (() => {
          const u = trail.units.find((x) => x.mission.id === trail.current.mission.id);
          const cur = trail.current;
          const [x, y] = cur.kind === 'boss' ? [LOCS[u.mission.id].x, LOCS[u.mission.id].y - 90] : stepPos(u, cur);
          return (
            <motion.button
              onClick={() => go(cur)}
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 1.3 }}
              className="absolute z-10 pl-3 pr-3.5 py-1.5 rounded-lg bg-surface border border-accent/70 text-accent2 font-display font-extrabold text-[11px] uppercase tracking-[0.16em] whitespace-nowrap inline-flex items-center gap-1.5 shadow-[0_8px_20px_-6px_rgba(0,0,0,.8)]"
              style={{ ...pct(x, y), translate: '-50% -190%' }}
            >
              <Play size={11} className="fill-current" />{t('start')}
            </motion.button>
          );
        })()}

        {/* popover de parada */}
        <AnimatePresence>
          {popup && (() => {
            const { node, unit } = popup;
            const walk = unit.nodes.filter((n) => n.kind !== 'boss' && n.kind !== 'story');
            const k = walk.findIndex((n) => n.key === node.key);
            const [x, y] = stopAt(unit.mission.id - 1 + wpT(walk.length, k), k);
            const locked = !node.available;
            return (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setPopup(null)} />
                <motion.div
                  key={node.key}
                  initial={{ opacity: 0, scale: 0.9, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="card-pro absolute z-30 w-56 p-4 text-center !border-accent/60 shadow-[0_18px_40px_-12px_rgba(0,0,0,.85)]"
                  style={{ ...pct(x, y), transform: `translate(${x < 130 ? '-18%' : x > 270 ? '-82%' : '-50%'}, 26px)` }}
                >
                  <div className="eyebrow !text-[9.5px] text-dim">{node.kind === 'concept' ? t('concept') : t('stage')}</div>
                  <div className="font-display font-extrabold leading-tight mt-1">{l(node.title)}</div>
                  <div className="text-xs text-dim mt-1.5 flex items-center justify-center gap-1">{locked ? <><Lock size={12} />{t('trail_locked')}</> : node.kind === 'concept' ? `${node.pages} ${t('pages')} + ${node.count} ${t('challenges')} · +${node.data.xpReward + 15} XP` : <>{`+${node.data.xpReward} XP · +${node.data.goldReward}`}<Coins size={12} className="text-accent2" /></>}</div>
                  {!locked && node.kind === 'concept' && (() => {
                    const sp = SPELL_BY_ID[`${node.mission.id}-${node.levelId}`];
                    if (!sp) return null;
                    const m = masteryOf(p, sp), c = EFFECT_COLOR[effectKind(sp.effect)], SI = spellIcon(sp.icon);
                    return (
                      <div className="mt-2.5 text-left rounded-lg border border-line bg-black/20 px-2.5 py-2">
                        <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.1em] text-dim"><SI size={12} style={{ color: c }} /><span className="truncate flex-1">{l(sp.name)}</span><span className="tabular-nums text-accent2">{m}/{MASTERY_GOAL}</span></div>
                        <div className="h-1 rounded-full bg-black/40 mt-1.5 overflow-hidden"><div className="h-full rounded-full" style={{ width: `${(m / MASTERY_GOAL) * 100}%`, background: c }} /></div>
                      </div>
                    );
                  })()}
                  {!locked && node.kind === 'concept' && <button onClick={() => { sounds.click(); setPopup(null); nav(`/tome/${node.mission.id}/${node.levelId}`); }} className="mt-2 w-full text-[11px] font-extrabold uppercase tracking-[0.12em] text-accent2 hover:underline inline-flex items-center justify-center gap-1.5"><BookOpen size={12} />{t('tome_open')}</button>}
                  {!locked && <Button size="sm" className="mt-2.5 w-full" onClick={() => { setPopup(null); go(node); }}>{node.done ? t('replay') : t('start')}</Button>}
                </motion.div>
              </>
            );
          })()}
        </AnimatePresence>
      </div>

      {/* ficha do local */}
      <AnimatePresence>
        {sheet !== null && <LocationSheet unit={trail.units[sheet]} onClose={() => setSheet(null)} onGo={(node) => { setSheet(null); go(node); }} />}
      </AnimatePresence>
    </div>
  );
}

function LocationSheet({ unit, onClose, onGo }) {
  const { t, l } = useT();
  const m = unit.mission;
  const loc = LOCS[m.id];
  const color = biomeColor(m.biome);
  const MIcon = missionIcon(m.id);
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/60" onClick={onClose} />
      <motion.div
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="fixed inset-x-0 bottom-0 z-50 max-h-[78vh] overflow-y-auto rounded-t-2xl bg-bg border-t border-x border-line px-4 pt-4 pb-8 shadow-[0_-20px_50px_-10px_rgba(0,0,0,.8)]"
      >
        <div className="max-w-md mx-auto">
          <div className="w-10 h-1 rounded-full bg-line mx-auto mb-5" />
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="eyebrow flex items-center gap-2" style={{ color: `color-mix(in oklab, ${color} 55%, white)` }}><span className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: `${color}33`, border: `1px solid ${color}88` }}><MIcon size={13} strokeWidth={2} /></span>{t('unit')} {ROMAN[m.id - 1] || m.id} · {l(loc.name)}</div>
              <h2 className="font-display font-black text-xl leading-tight mt-2">{l(m.title)}</h2>
              <p className="text-sm text-dim">{l(m.subtitle)}</p>
            </div>
            <div className="shrink-0"><Character id={m.mentor} size={76} animate={unit.unlocked} /></div>
          </div>
          {!unit.unlocked && <p className="mt-3 text-sm text-dim flex items-center gap-2"><Lock size={14} />{t('unlock_hint', { n: m.id - 1 })}</p>}
          <div className="mt-4 space-y-2">
            {unit.nodes.map((node) => {
              const locked = !node.available;
              const label = node.kind === 'boss' ? l(MONSTERS[m.boss].name) : node.kind === 'story' ? t('story') : l(node.title);
              const kind = node.kind === 'concept' ? t('concept') : node.kind === 'boss' ? t('boss') : node.kind === 'story' ? t('story') : t('stage');
              return (
                <button key={node.key} disabled={locked} onClick={() => onGo(node)} className={cx('group w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-colors', locked ? 'border-line opacity-45' : node.done ? 'border-accent/40 bg-accent/[0.07]' : 'border-line bg-surface hover:border-accent/60')}>
                  {(() => { const Ic = node.done ? Check : locked ? Lock : kindIcon(node.kind); return <div className={cx('w-10 h-10 shrink-0 rounded-lg border flex items-center justify-center', node.done ? 'bg-accent text-on-accent border-accent' : 'bg-black/25 border-line text-accent2')}><Ic size={18} strokeWidth={node.done ? 2.8 : 1.9} /></div>; })()}
                  <div className="min-w-0 flex-1">
                    <div className="eyebrow !text-[9.5px] text-dim">{kind}</div>
                    <div className="font-display font-extrabold text-sm leading-tight truncate">{label}</div>
                  </div>
                  {node.stars > 0 && <div className="flex gap-0.5 text-accent2">{Array.from({ length: node.stars }, (_, i) => <Star key={i} size={13} className="fill-current" />)}</div>}
                  {!locked && <ChevronRight size={16} className="text-dim group-hover:text-accent2 transition-colors" />}
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </>
  );
}
