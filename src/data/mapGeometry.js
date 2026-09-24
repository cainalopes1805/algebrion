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
  { id: 1, x: 118, y: 2480, kind: 'abbey', name: L('Abadia dos Grimórios', 'Abbey of Grimoires', 'Abadía de los Grimorios', 'Abbaye des Grimoires') },
  { id: 2, x: 292, y: 2140, kind: 'lab', name: L('Laboratório do Vale', 'Valley Laboratory', 'Laboratorio del Valle', 'Laboratoire de la Vallée') },
  { id: 3, x: 116, y: 1800, kind: 'fort', name: L('Forte dos Escalares', 'Scalar Stronghold', 'Fuerte de los Escalares', 'Fort des Scalaires') },
  { id: 4, x: 288, y: 1460, kind: 'tower', name: L('Torre dos Espelhos', 'Tower of Mirrors', 'Torre de los Espejos', 'Tour des Miroirs') },
  { id: 5, x: 112, y: 1120, kind: 'forge', name: L('Caverna da Forja', 'Cavern of the Forge', 'Caverna de la Forja', 'Caverne de la Forge') },
  { id: 6, x: 288, y: 780, kind: 'maze', name: L('Labirinto', 'The Labyrinth', 'El Laberinto', 'Le Labyrinthe') },
  { id: 7, x: 200, y: 400, kind: 'castle', name: L('Castelo da Rainha Invera', 'Castle of Queen Inversa', 'Castillo de la Reina Inversa', 'Château de la Reine Inversa') },
];

// Segmento i liga LOCS[i] → LOCS[i+1] por uma curva em "S"
export const SEGS = LOCS.slice(0, -1).map((a, i) => {
  const b = LOCS[i + 1];
  const dy = Math.abs(a.y - b.y);
  return { p0: [a.x, a.y], c1: [a.x + (b.x - a.x) * 0.1, a.y - dy * 0.55], c2: [b.x - (b.x - a.x) * 0.1, b.y + dy * 0.55], p1: [b.x, b.y] };
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
const nearRoad = (x, y, d) => roadSamples.some((p) => dist(p, [x, y]) < d) || LOCS.some((l) => dist([l.x, l.y - 30], [x, y]) < d + 45);

// Decoração determinística (nunca invade a estrada nem os locais)
export function buildDecor() {
  const rng = makeRng('algebrion-map-v1');
  const out = [];
  const tryPlace = (kind, n, region = null, minRoad = 46, extra = {}) => {
    let placed = 0, guard = 0;
    while (placed < n && guard++ < n * 60) {
      const x = WORLD_X0 + 24 + rng.next() * (WORLD_X1 - WORLD_X0 - 48);
      const y = (region ? region[0] + rng.next() * (region[1] - region[0]) : 120 + rng.next() * (MAP_H - 200));
      if (nearRoad(x, y, minRoad)) continue;
      if (out.some((o) => dist([o.x, o.y], [x, y]) < (kind === 'lake' ? 70 : 22))) continue;
      out.push({ kind, x, y, s: 0.8 + rng.next() * 0.7, v: rng.int(0, 2), ...extra });
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
  tryPlace('tent', 9, [1500, 2800], 50);
  return out.sort((a, b) => a.y - b.y);
}

// posição (0..1 dentro do trecho) da k-ésima de K paradas — afastadas dos marcos
export const wpT = (K, k) => 0.17 + 0.62 * (K <= 1 ? 0.5 : k / (K - 1));

export const REGION_LABELS = [
  { x: 28, a: 'start', y: 2590, t: L('Floresta Sussurrante', 'Whispering Forest', 'Bosque Susurrante', 'Forêt Murmurante') },
  { x: 372, a: 'end', y: 2250, t: L('Pântano Alquímico', 'Alchemical Marsh', 'Pantano Alquímico', 'Marais Alchimique') },
  { x: 28, a: 'start', y: 1910, t: L('Planícies de Vetor', 'Plains of Vector', 'Llanuras de Vector', 'Plaines de Vecteur') },
  { x: 372, a: 'end', y: 1570, t: L('Lago dos Espelhos', 'Lake of Mirrors', 'Lago de los Espejos', 'Lac des Miroirs') },
  { x: 28, a: 'start', y: 1230, t: L('Montes de Ferro', 'Iron Mountains', 'Montes de Hierro', 'Monts de Fer') },
  { x: 372, a: 'end', y: 890, t: L('Bosque das Paredes', 'Wall Woods', 'Bosque de los Muros', 'Bois des Murs') },
  { x: 200, y: 260, t: L('Reino de Invera', 'Realm of Inversa', 'Reino de Inversa', 'Royaume d’Inversa') },
];
