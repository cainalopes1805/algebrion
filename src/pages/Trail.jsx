import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, animate, motion } from 'framer-motion';
import { useGame, useProfile } from '../store/useGame';
import { buildTrail } from '../data/trail';
import { biomeColor } from '../data/biomes';
import { LOCS, SEGS, MAP_H, WORLD_X0, WORLD_X1, segPath, pointAt, buildDecor, REGION_LABELS, wpT } from '../data/mapGeometry';
import { MONSTERS } from '../data/characters';
import { useT } from '../i18n';
import { sounds } from '../utils/audio';
import Character from '../components/Character';
import { Decor, MapFrame, Compass, Ship, Serpent, Landmark, INK } from '../components/MapArt';
import { Button, cx } from '../components/ui';

const DECOR = buildDecor();

// posição (p) de um passo no percurso: 0 = vila; unidade m ocupa o trecho [m-1, m]
function stepP(unit, node) {
  const m = unit.mission.id;
  const walk = unit.nodes.filter((n) => n.kind === 'lesson' || n.kind === 'level');
  if (node.kind === 'story') return m;
  if (node.kind === 'boss') return m - 1 + 0.93;
  const k = walk.findIndex((n) => n.key === node.key);
  return m - 1 + wpT(walk.length, k);
}

export default function Trail() {
  const p = useProfile();
  const { t, l } = useT();
  const nav = useNavigate();
  const motionMode = useGame((s) => s.settings.motion);
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
    const walk = u.nodes.filter((n) => n.kind === 'lesson' || n.kind === 'level');
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
          <div className="rounded-2xl bg-bg/85 backdrop-blur border-2 border-line p-2 flex items-center gap-2.5">
            <span className="text-2xl">🌌</span>
            <div className="flex-1 min-w-0">
              <div className="font-display font-black text-[11px] uppercase tracking-wider">{t('great_matrix')} · {p.story.shards.length}/7</div>
              <div className="flex gap-1 mt-1">
                {Array.from({ length: 7 }, (_, i) => <div key={i} className={cx('flex-1 h-4 rounded-md border flex items-center justify-center text-[9px]', p.story.shards.includes(i + 1) ? 'border-accent bg-accent/30' : 'border-line bg-surface2 text-dim')}>{p.story.shards.includes(i + 1) ? '🔷' : ''}</div>)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full" style={{ aspectRatio: `${vw}/${MAP_H}` }}>
        <svg viewBox={`${vx0} 0 ${vw} ${MAP_H}`} className="absolute inset-0 w-full h-full" role="img" aria-label={t('kingdom_map')}>
          <defs>
            <linearGradient id="land" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1f1a26" /><stop offset=".25" stopColor="#242028" /><stop offset=".6" stopColor="#2a2418" /><stop offset="1" stopColor="#2c2618" /></linearGradient>
            <filter id="paper"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" seed="4" /><feColorMatrix values="0 0 0 0 .55  0 0 0 0 .45  0 0 0 0 .3  0 0 0 .14 0" /></filter>
            <linearGradient id="fog" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0a0d12" stopOpacity=".86" /><stop offset=".85" stopColor="#0a0d12" stopOpacity=".78" /><stop offset="1" stopColor="#0a0d12" stopOpacity="0" /></linearGradient>
          </defs>
          <rect x={vx0} width={vw} height={MAP_H} fill="url(#land)" />
          <rect x={vx0} width={vw} height={MAP_H} filter="url(#paper)" />
          <MapFrame x0={vx0} w={vw} />

          {/* terreno */}
          {DECOR.filter((d) => d.x > vx0 - 30 && d.x < vx0 + vw + 30).map((d, i) => <Decor key={i} d={d} />)}
          {REGION_LABELS.map((r, i) => (
            <text key={i} x={r.a === 'start' ? vx0 + 30 : r.a === 'end' ? vx0 + vw - 30 : r.x} y={r.y} textAnchor={r.a || 'middle'} fill={INK} fontSize="10" fontStyle="italic" fontWeight="700" opacity=".7" letterSpacing="1.5" style={{ textTransform: 'uppercase' }}>{l(r.t)}</text>
          ))}
          <Ship x={vx0 + 60} y={2720} /><Serpent x={vx0 + vw - 60} y={170} />
          <Compass x={vx0 + vw - 66} y={2930} />

          {/* título */}
          <g transform="translate(200 78)">
            <path d="M-150 -22 h300 l-14 22 l14 22 h-300 l14 -22z" fill="#1a1509" stroke={INK} strokeWidth="1.5" />
            <text textAnchor="middle" y="-2" fill="#e6c67f" fontSize="22" fontFamily="Cinzel Decorative, serif" fontWeight="900" letterSpacing="3">ALGEBRION</text>
            <text textAnchor="middle" y="14" fill={INK} fontSize="8.5" fontWeight="800" letterSpacing="4">{t('tagline').toUpperCase()}</text>
          </g>

          {/* estrada */}
          {SEGS.map((s, i) => {
            const frac = Math.max(0, Math.min(1, heroP - i));
            return (
              <g key={i}>
                <path d={segPath(s)} fill="none" stroke="#0d0a05" strokeWidth="13" strokeLinecap="round" opacity=".7" />
                <path d={segPath(s)} fill="none" stroke="#5c4d33" strokeWidth="9" strokeLinecap="round" />
                <path d={segPath(s)} fill="none" stroke="#8a7650" strokeWidth="1.6" strokeDasharray="1 6" strokeLinecap="round" opacity=".7" />
                <path d={segPath(s)} pathLength="1" fill="none" stroke="#d9b45a" strokeWidth="2.6" strokeLinecap="round" strokeDasharray={`${frac} 2`} opacity=".9" />
              </g>
            );
          })}

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
                  {bossDone && unit && <g transform="translate(46 -70)"><circle r="10" fill="#b8934a" stroke="#6a4f16" strokeWidth="1.5" /><text textAnchor="middle" y="4" fontSize="12" fill="#1a1206" fontWeight="900">✓</text></g>}
                </g>
                <text y="20" textAnchor="middle" fontSize="10.5" fontWeight="900" fill={locked ? '#6b6250' : '#efe0b8'} stroke="#0d0a05" strokeWidth="3" paintOrder="stroke" letterSpacing=".5">{l(loc.name)}</text>
                {unit && <text y="32" textAnchor="middle" fontSize="8" fontWeight="800" fill={locked ? '#6b6250' : color} stroke="#0d0a05" strokeWidth="2.5" paintOrder="stroke" letterSpacing="2">{t('unit').toUpperCase()} {unit.mission.id}</text>}
              </g>
            );
          })}

          {/* paradas do caminho */}
          {trail.units.map((unit) => {
            const walk = unit.nodes.filter((n) => n.kind === 'lesson' || n.kind === 'level');
            const color = biomeColor(unit.mission.biome);
            return walk.map((node, k) => {
              const [x, y] = pointAt(unit.mission.id - 1 + wpT(walk.length, k));
              const isCur = trail.current?.key === node.key;
              const locked = !node.available;
              const fill = node.done ? '#b8934a' : locked ? '#1c1810' : isCur ? color : '#3a3222';
              const stroke = node.done ? '#6a4f16' : locked ? '#3a3324' : isCur ? '#e6c67f' : INK;
              return (
                <g key={node.key} transform={`translate(${x} ${y})`} onClick={() => open(node, unit)} style={{ cursor: 'pointer' }}>
                  {isCur && <circle r="15" fill="none" stroke="#e6c67f" strokeWidth="2" className="animate-ping" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />}
                  <circle r={isCur ? 15 : 12.5} fill={fill} stroke={stroke} strokeWidth="2.4" />
                  <text textAnchor="middle" dominantBaseline="central" fontSize={isCur ? 15 : 12.5} fill={node.done ? '#1a1206' : undefined} fontWeight="900" opacity={locked ? 0.45 : 1}>{node.done ? '✓' : locked ? '🔒' : node.icon}</text>
                </g>
              );
            });
          })}

          {/* névoa sobre o que ainda não foi alcançado */}
          {fogY > 0 && <rect x={vx0} y="0" width={vw} height={fogY} fill="url(#fog)" pointerEvents="none" />}
          {fogY > 0 && [0, 1, 2, 3].map((i) => <ellipse key={i} cx={vx0 + 60 + i * (vw / 4)} cy={fogY - 90 - i * 70} rx="120" ry="26" fill="#aab4c0" opacity=".08" pointerEvents="none" style={{ animation: `drift ${70 + i * 15}s linear infinite`, animationDelay: `${-i * 20}s` }} />)}
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
          const [x, y] = cur.kind === 'boss' ? [LOCS[u.mission.id].x, LOCS[u.mission.id].y - 90] : pointAt(stepP(u, cur));
          return (
            <motion.button
              onClick={() => go(cur)}
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 1.3 }}
              className="absolute z-10 px-3 py-1 rounded-xl bg-surface border-2 border-accent text-accent2 font-display font-black text-xs uppercase tracking-wider whitespace-nowrap"
              style={{ ...pct(x, y), translate: '-50% -190%' }}
            >
              {t('start')} ▸
            </motion.button>
          );
        })()}

        {/* popover de parada */}
        <AnimatePresence>
          {popup && (() => {
            const { node, unit } = popup;
            const walk = unit.nodes.filter((n) => n.kind === 'lesson' || n.kind === 'level');
            const k = walk.findIndex((n) => n.key === node.key);
            const [x, y] = pointAt(unit.mission.id - 1 + wpT(walk.length, k));
            const locked = !node.available;
            return (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setPopup(null)} />
                <motion.div
                  key={node.key}
                  initial={{ opacity: 0, scale: 0.9, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute z-30 w-56 rounded-2xl p-3.5 text-center bg-surface border-2 border-b-[5px] border-accent"
                  style={{ ...pct(x, y), transform: `translate(${x < 130 ? '-18%' : x > 270 ? '-82%' : '-50%'}, 26px)` }}
                >
                  <div className="text-[10px] font-black uppercase tracking-widest text-dim">{node.kind === 'lesson' ? t('lesson') : t('stage')}</div>
                  <div className="font-display font-black leading-tight">{l(node.title)}</div>
                  <div className="text-xs text-dim mt-1">{locked ? t('trail_locked') : node.kind === 'lesson' ? `${node.data.pages.length} ${t('pages')} · +15 XP` : `+${node.data.xpReward} XP · +${node.data.goldReward} 💰`}</div>
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
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/60" onClick={onClose} />
      <motion.div
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="fixed inset-x-0 bottom-0 z-50 max-h-[78vh] overflow-y-auto rounded-t-3xl bg-bg border-t-2 border-x-2 border-line px-4 pt-4 pb-8"
      >
        <div className="max-w-md mx-auto">
          <div className="w-12 h-1.5 rounded-full bg-line mx-auto mb-4" />
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-black uppercase tracking-[0.25em]" style={{ color }}>{t('unit')} {m.id} · {l(loc.name)}</div>
              <h2 className="font-display font-black text-xl leading-tight mt-0.5">{m.icon} {l(m.title)}</h2>
              <p className="text-sm text-dim">{l(m.subtitle)}</p>
            </div>
            <div className="shrink-0"><Character id={m.mentor} size={76} animate={unit.unlocked} /></div>
          </div>
          {!unit.unlocked && <p className="mt-3 text-sm text-dim">🔒 {t('unlock_hint', { n: m.id - 1 })}</p>}
          <div className="mt-4 space-y-2">
            {unit.nodes.map((node) => {
              const locked = !node.available;
              const label = node.kind === 'boss' ? l(MONSTERS[m.boss].name) : node.kind === 'story' ? t('story') : l(node.title);
              const kind = node.kind === 'lesson' ? t('lesson') : node.kind === 'boss' ? t('boss') : node.kind === 'story' ? t('story') : t('stage');
              return (
                <button key={node.key} disabled={locked} onClick={() => onGo(node)} className={cx('w-full flex items-center gap-3 p-3 rounded-2xl border-2 border-b-4 text-left', locked ? 'border-line opacity-45' : node.done ? 'border-accent/50 bg-accent/10' : 'border-line bg-surface hover:border-accent')}>
                  <div className="w-10 h-10 rounded-xl bg-black/25 flex items-center justify-center text-xl">{node.done ? '✅' : locked ? '🔒' : node.kind === 'boss' ? '👹' : node.icon}</div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-black uppercase tracking-widest text-dim">{kind}</div>
                    <div className="font-display font-black text-sm leading-tight truncate">{label}</div>
                  </div>
                  {node.stars > 0 && <div className="text-xs">{'⭐'.repeat(node.stars)}</div>}
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </>
  );
}
