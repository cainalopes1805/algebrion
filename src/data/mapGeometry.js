// Geometria do mapa do reino: locais, estrada (curvas de Bézier), decoração determinística.
import { L } from '../i18n/core';
import { makeRng } from '../utils/rng';

export const MAP_W = 400;
export const MAP_H = 3000;
// Mundo estendido para telas largas: a estrada fica no centro (0..400) e o terreno continua para os lados
export const WORLD_X0 = -260;
export const WORLD_X1 = 660;

// Índice 0 = vila inicial; 1..7 = capítulos (mesmo id da missão)
export const LOCS = [
  { id: 0, x: 200, y: 2820, kind: 'village', name: L('Taverna do Javali Dourado', 'Golden Boar Tavern', 'Taberna del Jabalí Dorado', 'Auberge du Sanglier Doré') },
  { id: 1, x: 88, y: 2500, kind: 'abbey', name: L('Abadia dos Grimórios', 'Abbey of Grimoires', 'Abadía de los Grimorios', 'Abbaye des Grimoires') },
  { id: 2, x: 305, y: 2200, kind: 'lab', name: L('Laboratório do Vale', 'Valley Laboratory', 'Laboratorio del Valle', 'Laboratoire de la Vallée') },
  { id: 3, x: 150, y: 1890, kind: 'fort', name: L('Forte dos Escalares', 'Scalar Stronghold', 'Fuerte de los Escalares', 'Fort des Scalaires') },
  { id: 4, x: 320, y: 1560, kind: 'tower', name: L('Torre dos Espelhos', 'Tower of Mirrors', 'Torre de los Espejos', 'Tour des Miroirs') },
  { id: 5, x: 80, y: 1250, kind: 'forge', name: L('Caverna da Forja', 'Cavern of the Forge', 'Caverna de la Forja', 'Caverne de la Forge') },
  { id: 6, x: 290, y: 920, kind: 'maze', name: L('Labirinto', 'The Labyrinth', 'El Laberinto', 'Le Labyrinthe') },
  { id: 7, x: 140, y: 470, kind: 'castle', name: L('Castelo da Rainha Invera', 'Castle of Queen Inversa', 'Castillo de la Reina Inversa', 'Château de la Reine Inversa') },
];

// Segmento i liga LOCS[i] → LOCS[i+1] por uma curva sinuosa (o desvio lateral de cada trecho é fixo)
const SWAY = [[-60, 55], [55, -70], [-70, 60], [60, -55], [-55, 70], [65, -60], [-50, 60]];
export const SEGS = LOCS.slice(0, -1).map((a, i) => {
  const b = LOCS[i + 1];
  const dy = Math.abs(a.y - b.y);
  const [s1, s2] = SWAY[i];
  return { p0: [a.x, a.y], c1: [a.x + s1, a.y - dy * 0.42], c2: [b.x + s2, b.y + dy * 0.42], p1: [b.x, b.y] };
});

export const segPath = (s) => `M${s.p0[0]} ${s.p0[1]} C${s.c1[0]} ${s.c1[1]} ${s.c2[0]} ${s.c2[1]} ${s.p1[0]} ${s.p1[1]}`;

export const bez = (s, t) => {
  const u = 1 - t;
  const f = (k) => u * u * u * s.p0[k] + 3 * u * u * t * s.c1[k] + 3 * u * t * t * s.c2[k] + t * t * t * s.p1[k];
  return [f(0), f(1)];
};

// p ∈ [0, 7]: parte inteira = segmento, fração = posição no segmento
export const pointAt = (p) => {
  const c = Math.max(0, Math.min(SEGS.length, p));
  const i = Math.min(SEGS.length - 1, Math.floor(c));
  return bez(SEGS[i], c - i);
};

const roadSamples = SEGS.flatMap((s) => Array.from({ length: 40 }, (_, k) => bez(s, k / 39)));
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const clamp01 = (v) => Math.max(0, Math.min(1, v));

/* ───────────── Rios ───────────── */
// Curva suave (Catmull-Rom) passando pelos pontos; devolve o caminho SVG e amostras densas
function smoothCurve(pts) {
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  const samples = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0]} ${p2[1]}`;
    for (let k = 0; k < 24; k++) {
      const t = k / 24, u = 1 - t;
      samples.push([0, 1].map((j) => u * u * u * p1[j] + 3 * u * u * t * c1[j] + 3 * u * t * t * c2[j] + t * t * t * p2[j]));
    }
  }
  samples.push(pts[pts.length - 1]);
  return { d, samples };
}
export const RIVERS = [
  // desce dos montes em direção ao mar, a oeste (cruza a estrada entre o Forte e o Laboratório)
  smoothCurve([[500, 1690], [420, 1770], [350, 1800], [310, 1875], [262, 1945], [200, 2000], [130, 2040], [60, 2100], [-20, 2115], [-100, 2160], [-200, 2200]]),
  // riacho do Bosque das Paredes, correndo para o leste
  smoothCurve([[-200, 705], [-60, 700], [10, 735], [70, 790], [140, 805], [210, 765], [280, 700], [345, 630], [430, 610], [540, 560], [660, 540]]),
];
const riverSamples = RIVERS.flatMap((r) => r.samples);

// Pontes: onde um rio cruza a estrada (posição e ângulo da estrada nesse ponto)
export const BRIDGES = (() => {
  const dense = SEGS.flatMap((s) => Array.from({ length: 160 }, (_, k) => bez(s, k / 159)));
  const out = [];
  RIVERS.forEach((r) => {
    let last = -999;
    r.samples.forEach((rp, ri) => {
      let best = null;
      dense.forEach((q, qi) => { const dd = dist(rp, q); if (dd < 7 && (!best || dd < best.dd)) best = { dd, qi, q }; });
      if (best && ri - last > 30) {
        const a = dense[Math.max(0, best.qi - 1)], b = dense[Math.min(dense.length - 1, best.qi + 1)];
        out.push({ x: best.q[0], y: best.q[1], ang: (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI });
        last = ri;
      }
    });
  });
  return out;
})();

/* ───────────── O Zero: a destruição que Nullus espalha ───────────── */
// Focos de corrupção. `erase`: o terreno foi apagado (como a vila de Linhas, que "amanheceu em branco").
const ZERO_BLOBS = [
  { id: 'linhas', x: 322, y: 2585, r: 54, erase: true },
  { id: 'fort', x: 60, y: 1985, r: 78 },
  { id: 'maze', x: 290, y: 920, r: 120 },
  { id: 'castle', x: 140, y: 470, r: 210 },
  { id: 'n1', x: 320, y: 560, r: 38, erase: true },
  { id: 'n2', x: 36, y: 650, r: 34, erase: true },
  { id: 'n3', x: 262, y: 300, r: 40, erase: true },
];
// 0 = terra sã, 1 = totalmente tomada. Cresce para o norte e perto dos focos.
export const zeroAt = (x, y) => {
  let c = Math.pow(clamp01((1500 - y) / 1300), 1.25) * 0.85;
  ZERO_BLOBS.forEach((b) => { const d = dist([x, y], [b.x, b.y]); if (d < b.r * 1.35) c = Math.max(c, clamp01(1 - d / (b.r * 1.35)) * 0.95 + 0.05); });
  return c;
};
const inErased = (x, y, pad = 12) => ZERO_BLOBS.some((b) => b.erase && dist([x, y], [b.x, b.y]) < b.r + pad);

// mancha irregular e suave em volta de um centro
function blobPath(cx, cy, r, rng) {
  const n = 16;
  const pts = Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2, rr = r * (0.72 + rng.next() * 0.5); return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.86]; });
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  let d = `M${mid(pts[0], pts[1]).map((v) => v.toFixed(1)).join(' ')}`;
  for (let i = 1; i <= n; i++) { const p = pts[i % n], m = mid(p, pts[(i + 1) % n]); d += ` Q${p[0].toFixed(1)} ${p[1].toFixed(1)} ${m[0].toFixed(1)} ${m[1].toFixed(1)}`; }
  return d + 'Z';
}

export const ZERO = (() => {
  const rng = makeRng('algebrion-zero-v1');
  const erased = ZERO_BLOBS.filter((b) => b.erase).map((b) => ({
    ...b,
    path: blobPath(b.x, b.y, b.r, rng),
    // contornos fantasmas do que existia ali
    ghosts: Array.from({ length: b.id === 'linhas' ? 5 : 2 }, (_, i) => ({ x: b.x + (rng.next() - 0.5) * b.r * 1.1, y: b.y + (rng.next() - 0.5) * b.r * 0.7 + (i % 2 ? 6 : -6), s: 0.8 + rng.next() * 0.4 })),
    dust: Array.from({ length: 22 }, () => { const a = rng.next() * Math.PI * 2, rr = b.r * (0.95 + rng.next() * 0.45); return [b.x + Math.cos(a) * rr, b.y + Math.sin(a) * rr * 0.86, 0.5 + rng.next() * 1.3]; }),
  }));
  // rachaduras que irradiam do Castelo e do Labirinto
  const crack = (ox, oy, ang, len) => {
    let x = ox, y = oy, a = ang;
    const pts = [[x, y]];
    for (let s = 0; s < len; s += 9 + rng.next() * 8) { a += (rng.next() - 0.5) * 0.9; x += Math.cos(a) * 12; y += Math.sin(a) * 12; pts.push([Number(x.toFixed(1)), Number(y.toFixed(1))]); }
    return pts;
  };
  const cracks = [];
  for (let i = 0; i < 9; i++) cracks.push(crack(140, 480, 0.25 + (i / 8) * 2.6, 120 + rng.next() * 150));
  for (let i = 0; i < 5; i++) cracks.push(crack(290, 925, 0.3 + (i / 4) * 2.5, 70 + rng.next() * 90));
  const soldiers = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) soldiers.push({ x: 18 + c * 15 + (r % 2) * 6, y: 1958 + r * 14, d: rng.next() * 4 });
  const glyphs = [];
  ZERO_BLOBS.forEach((b) => { const n = b.id === 'castle' ? 9 : b.erase ? 4 : 5; for (let i = 0; i < n; i++) glyphs.push({ x: b.x + (rng.next() - 0.5) * b.r * 1.6, y: b.y + (rng.next() - 0.5) * b.r * 0.9, dur: 9 + rng.next() * 8, delay: -rng.next() * 12, s: 8 + rng.next() * 8, big: b.id === 'castle' }); });
  return { erased, cracks, soldiers, glyphs };
})();

const nearRiver = (x, y, d) => riverSamples.some((p) => dist(p, [x, y]) < d);
const nearRoad = (x, y, d) => roadSamples.some((p) => dist(p, [x, y]) < d) || LOCS.some((l) => dist([l.x, l.y - 30], [x, y]) < d + 45) || nearRiver(x, y, d * 0.55 + 14);
const nearestRoad = (x, y) => roadSamples.reduce((m, p) => (dist(p, [x, y]) < dist(m, [x, y]) ? p : m), roadSamples[0]);

// Espaço que cada peça ocupa no chão — evita pedras, fogueiras ou casas em cima de árvores
const FOOT = { mountain: 30, forest: 27, hill: 16, lake: 52, house: 22, ruin: 22, tent: 32, windmill: 28, pine: 12, deadtree: 9, bush: 9, rock: 8, flowers: 8, tuft: 5, ash: 10 };
const SMALL = ['tuft', 'flowers', 'rock', 'bush', 'ash'];
const foot = (o) => (FOOT[o.kind] || 16) * (o.kind === 'lake' ? o.s : Math.min(o.s, 1.25));

// Decoração determinística (nunca invade a estrada, os rios, os locais nem as áreas apagadas)
export function buildDecor() {
  const rng = makeRng('algebrion-map-v1');
  const out = [];
  const tryPlace = (kind, n, region = null, minRoad = 46, extra = {}, accept = null) => {
    let placed = 0, guard = 0;
    while (placed < n && guard++ < n * 90) {
      const x = WORLD_X0 + 24 + rng.next() * (WORLD_X1 - WORLD_X0 - 48);
      const y = (region ? region[0] + rng.next() * (region[1] - region[0]) : 120 + rng.next() * (MAP_H - 200));
      if (nearRoad(x, y, minRoad) || inErased(x, y)) continue;
      if (accept && !accept(x, y)) continue;
      const cand = { kind, x, y, s: 0.8 + rng.next() * 0.7, v: rng.int(0, 2), ...extra };
      const f = foot(cand);
      const small = SMALL.includes(kind);
      if (out.some((o) => {
        const g = SMALL.includes(o.kind) && small ? 10 : (f + foot(o)) * (small || SMALL.includes(o.kind) ? 0.95 : 0.85);
        return dist([o.x, o.y], [x, y]) < g;
      })) continue;
      out.push(cand);
      placed++;
    }
  };
  tryPlace('mountain', 52, [120, 1300], 56);
  tryPlace('mountain', 18, [900, 1300], 52);
  tryPlace('forest', 62, [1500, 2900], 44);
  tryPlace('forest', 26, [200, 1500], 44);
  tryPlace('hill', 60, null, 40);
  tryPlace('lake', 6, [1950, 2350], 70);
  tryPlace('lake', 3, [1320, 1560], 70);
  tryPlace('house', 18, [1600, 2900], 46);
  tryPlace('ruin', 12, [200, 1700], 50);
  tryPlace('ruin', 14, [200, 1400], 50, {}, (x, y) => zeroAt(x, y) > 0.3); // ruínas do que o Zero levou
  tryPlace('tent', 9, [1500, 2800], 50);
  tryPlace('windmill', 7, [1550, 2900], 60);
  tryPlace('pine', 40, [300, 1300], 44);
  tryPlace('deadtree', 46, [120, 1700], 40, {}, (x, y) => zeroAt(x, y) > 0.28);

  // estado do Zero em cada peça: árvores secas, casas queimadas, moinhos parados, acampamentos frios
  out.forEach((o) => {
    const z = zeroAt(o.x, o.y);
    o.z = z;
    if (['forest', 'pine'].includes(o.kind) && z > 0.38) o.dead = true;
    if (o.kind === 'house' && z > 0.3) o.burnt = true;
    if (o.kind === 'windmill' && z > 0.3) o.broken = true;
    if (o.kind === 'tent' && z > 0.3) o.cold = true;
  });
  // cinzas ao redor das casas queimadas e das árvores secas
  out.filter((o) => o.burnt || (o.dead && o.kind === 'forest' && o.v === 0)).forEach((o) => out.push({ kind: 'ash', x: o.x + 4, y: o.y + 3, s: 1.4 + (o.v % 2) * 0.4, v: 0, z: o.z }));

  // trilhas de terra das casas, moinhos e barracas até a estrada
  out.filter((o) => ['house', 'tent', 'windmill'].includes(o.kind) && !o.burnt).forEach((o) => {
    const r = nearestRoad(o.x, o.y);
    const dd = dist(r, [o.x, o.y]);
    if (dd < 130) {
      const mx = (o.x + r[0]) / 2 + (rng.next() - 0.5) * 24, my = (o.y + r[1]) / 2 + (rng.next() - 0.5) * 24;
      o.track = `M${o.x.toFixed(1)} ${(o.y + 2).toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${r[0].toFixed(1)} ${r[1].toFixed(1)}`;
    }
  });

  tryPlace('bush', 90, null, 24);
  tryPlace('rock', 60, null, 24);
  tryPlace('flowers', 70, [1700, 2900], 22, {}, (x, y) => zeroAt(x, y) < 0.3);
  tryPlace('tuft', 280, null, 18);
  return out.sort((a, b) => a.y - b.y);
}

/* ───────────── Vida no mapa (animais, gente, luzes, aves) ───────────── */
// Tudo determinístico: a mesma paisagem a cada visita.
export function buildLife(decor) {
  const rng = makeRng('algebrion-life-v1');
  const lakes = decor.filter((d) => d.kind === 'lake');
  const houses = decor.filter((d) => d.kind === 'house' && !d.burnt);
  const tents = decor.filter((d) => d.kind === 'tent');
  const forests = decor.filter((d) => d.kind === 'forest' && !d.dead);
  const inLake = (x, y) => lakes.some((l) => Math.abs(x - l.x) < 60 * l.s && Math.abs(y - l.y) < 30 * l.s);
  const taken = [];
  // um trecho livre de estrada, água, árvores, pedras e outros bichos (o passeio inteiro precisa caber)
  const spot = (cx, cy, radius, dx, minGap = 26, maxZero = 0.22) => {
    for (let g = 0; g < 60; g++) {
      const x = cx + (rng.next() - 0.5) * 2 * radius, y = cy + (rng.next() - 0.5) * radius;
      if (x < WORLD_X0 + 70 || x + dx > WORLD_X1 - 70 || y < 200 || y > MAP_H - 150) continue;
      if (zeroAt(x, y) > maxZero || inErased(x + dx / 2, y, 20)) continue;
      if ([0, 0.5, 1].some((f) => nearRoad(x + dx * f, y, 40) || inLake(x + dx * f, y))) continue;
      if ([0, 0.5, 1].some((f) => decor.some((o) => !['tuft', 'flowers', 'hill'].includes(o.kind) && dist([o.x, o.y], [x + dx * f, y]) < foot(o) + 8))) continue;
      if (taken.some((t) => dist(t, [x, y]) < minGap)) continue;
      taken.push([x, y]);
      return [x, y];
    }
    return null;
  };
  const animals = [];
  const add = (kind, at, dx, dur, extra = {}) => { if (at) animals.push({ kind, x: at[0], y: at[1], dx, dur, delay: -rng.next() * dur, s: 0.9 + rng.next() * 0.25, ...extra }); };
  houses.slice(0, 6).forEach((a) => { const n = 2 + rng.int(0, 2); for (let i = 0; i < n; i++) add('sheep', spot(a.x, a.y + 36, 80, 30), 22 + rng.int(0, 22), 60 + rng.int(0, 30)); });
  houses.slice(6, 10).forEach((h) => add('cow', spot(h.x, h.y + 38, 70, 36), 30 + rng.int(0, 20), 90 + rng.int(0, 30)));
  tents.filter((t) => !t.cold).slice(0, 4).forEach((t) => add('horse', spot(t.x, t.y + 30, 60, 46), 50 + rng.int(0, 20), 80 + rng.int(0, 30)));
  forests.filter((f) => f.y < 2700).filter((_, i) => i % 4 === 0).slice(0, 7).forEach((f) => add('deer', spot(f.x, f.y + 34, 60, 40), 36 + rng.int(0, 20), 100 + rng.int(0, 30)));

  const ducks = lakes.flatMap((l) => Array.from({ length: 2 + rng.int(0, 1) }, () => ({ x: l.x + (rng.next() - 0.5) * 40 * l.s, y: l.y + (rng.next() - 0.5) * 14 * l.s, dx: 14 + rng.int(0, 16), dur: 40 + rng.int(0, 30), delay: -rng.next() * 40 })));
  const fireflies = [
    ...forests.filter((_, i) => i % 3 === 0).flatMap((f) => Array.from({ length: 2 }, () => [f.x + (rng.next() - 0.5) * 60, f.y - 8 + (rng.next() - 0.5) * 30])),
    ...lakes.flatMap((l) => Array.from({ length: 3 }, () => [l.x + (rng.next() - 0.5) * 100 * l.s, l.y + (rng.next() - 0.5) * 40 * l.s])),
  ].map(([x, y]) => ({ x, y, dx: (rng.next() - 0.5) * 30, dy: (rng.next() - 0.5) * 20, dur: 6 + rng.next() * 8, delay: -rng.next() * 10, ph: 2 + rng.next() * 3 })).filter((f) => !nearRoad(f.x, f.y, 10) && zeroAt(f.x, f.y) < 0.3).filter((_, i) => i % 2 === 0);
  const butterflies = decor.filter((d) => d.kind === 'flowers').filter((_, i) => i % 4 === 0).slice(0, 9).map((f) => ({ x: f.x, y: f.y - 4, r: 16 + rng.int(0, 14), dur: 14 + rng.int(0, 10), delay: -rng.next() * 14, hue: rng.int(0, 2) }));
  // lampiões ao longo da estrada, junto de cada marco
  const lanterns = [];
  SEGS.forEach((sg, i) => [0.075, 0.925].forEach((t) => {
    const [x, y] = bez(sg, t), [x2, y2] = bez(sg, t + 0.01);
    const ang = Math.atan2(y2 - y, x2 - x) + Math.PI / 2;
    lanterns.push({ x: x + Math.cos(ang) * 10, y: y + Math.sin(ang) * 10, delay: -rng.next() * 3, id: `${i}-${t}` });
  }));
  const ruins = decor.filter((d) => d.kind === 'ruin').slice(0, 4);

  // gente vivendo no mapa
  const people = [];
  const V = LOCS[0], A = LOCS[1], F = LOCS[5];
  people.push({ type: 'villager', pose: 'idle', x: V.x - 46, y: V.y + 12 }, { type: 'farmer', pose: 'idle', x: V.x + 52, y: V.y + 14 }, { type: 'child', pose: 'idle', x: V.x + 40, y: V.y + 20 });
  people.push({ type: 'monk', pose: 'wander', x: A.x + 44, y: A.y + 10, dx: 26, dur: 46 }, { type: 'monk', pose: 'wander', x: A.x + 62, y: A.y + 14, dx: -22, dur: 52, flip: true });
  people.push({ type: 'smith', pose: 'hammer', x: F.x + 58, y: F.y + 4 });
  lakes.filter((l) => l.y > 1900).slice(0, 3).forEach((l) => people.push({ type: 'fisher', pose: 'fish', x: l.x - 44 * l.s, y: l.y + 8 * l.s }));
  forests.filter((f) => f.y > 2300).slice(0, 2).forEach((f) => { const at = spot(f.x + 46, f.y, 14, 0, 30); if (at) people.push({ type: 'woodcutter', pose: 'chop', x: at[0], y: at[1] }); });
  tents.filter((t) => !t.cold).slice(0, 3).forEach((t) => { people.push({ type: 'villager', pose: 'sit', x: t.x + (14 - 9) * t.s, y: t.y + 8 }, { type: 'farmer', pose: 'sit', x: t.x + (14 + 10) * t.s, y: t.y + 8 }); });
  // guardas em ronda perto do Forte e do Castelo
  people.push({ type: 'guard', pose: 'wander', x: LOCS[3].x + 64, y: LOCS[3].y + 14, dx: 30, dur: 40 });
  // viajantes: sobem e descem a estrada (um sentido só; somem/aparecem junto aos marcos)
  const walkers = [
    { seg: 0, rev: false, type: 'villager', dur: 70, delay: -12 }, { seg: 0, rev: true, type: 'merchant', dur: 84, delay: -50 },
    { seg: 1, rev: false, type: 'farmer', dur: 76, delay: -30 }, { seg: 1, rev: true, type: 'monk', dur: 90, delay: -8 },
    { seg: 2, rev: false, type: 'merchant', dur: 80, delay: -40 }, { seg: 2, rev: true, type: 'villager', dur: 72, delay: -20 },
    { seg: 3, rev: false, type: 'guard', dur: 78, delay: -34 }, { seg: 3, rev: true, type: 'villager', dur: 88, delay: -60 },
    { seg: 4, rev: true, type: 'guard', dur: 82, delay: -16 },
  ];
  const carts = [{ seg: 0, rev: false, dur: 110, delay: -20 }, { seg: 2, rev: true, dur: 120, delay: -70 }, { seg: 1, rev: false, dur: 130, delay: -95 }];
  return { animals, ducks, fireflies, butterflies, lanterns, ruins, people, walkers, carts };
}


// posição (0..1 dentro do trecho) da k-ésima de K paradas — afastadas dos marcos
export const wpT = (K, k) => 0.17 + 0.62 * (K <= 1 ? 0.5 : k / (K - 1));

export const REGION_LABELS = [
  { x: 372, a: 'end', y: 2735, t: L('Floresta Sussurrante', 'Whispering Forest', 'Bosque Susurrante', 'Forêt Murmurante') },
  { x: 28, a: 'start', y: 2310, t: L('Pântano Alquímico', 'Alchemical Marsh', 'Pantano Alquímico', 'Marais Alchimique') },
  { x: 372, a: 'end', y: 1850, t: L('Planícies de Vetor', 'Plains of Vector', 'Llanuras de Vector', 'Plaines de Vecteur') },
  { x: 28, a: 'start', y: 1620, t: L('Lago dos Espelhos', 'Lake of Mirrors', 'Lago de los Espejos', 'Lac des Miroirs') },
  { x: 372, a: 'end', y: 1200, t: L('Montes de Ferro', 'Iron Mountains', 'Montes de Hierro', 'Monts de Fer') },
  { x: 28, a: 'start', y: 960, t: L('Bosque das Paredes', 'Wall Woods', 'Bosque de los Muros', 'Bois des Murs') },
  { x: 200, y: 260, t: L('Reino de Invera', 'Realm of Inversa', 'Reino de Inversa', 'Royaume d’Inversa') },
];
