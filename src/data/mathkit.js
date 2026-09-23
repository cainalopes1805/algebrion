// Pequena biblioteca de álgebra de matrizes para gerar e validar exercícios.
export const SUB = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'];
export const subs = (n) => String(n).split('').map((d) => SUB[+d]).join('');
export const idx = (i, j) => `${subs(i)}${subs(j)}`; // ₁₂

export const fmt = (n) => (n < 0 ? `−${Math.abs(n)}` : String(n));

export const mat = (rng, r, c, lo, hi) =>
  Array.from({ length: r }, () => Array.from({ length: c }, () => rng.int(lo, hi)));

export const dims = (m) => [m.length, m[0].length];
export const add = (a, b) => a.map((row, i) => row.map((v, j) => v + b[i][j]));
export const sub = (a, b) => a.map((row, i) => row.map((v, j) => v - b[i][j]));
export const scale = (k, a) => a.map((row) => row.map((v) => k * v));
export const transpose = (a) => a[0].map((_, j) => a.map((row) => row[j]));
export const mul = (a, b) =>
  a.map((row) => b[0].map((_, j) => row.reduce((s, v, k) => s + v * b[k][j], 0)));
export const det2 = ([[a, b], [c, d]]) => a * d - b * c;
export const det3 = (m) =>
  m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
  m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
  m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
export const isSymmetric = (m) => m.length === m[0].length && m.every((row, i) => row.every((v, j) => v === m[j][i]));
export const trace = (m) => m.reduce((s, row, i) => s + row[i], 0);
export const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// Inversa inteira de matriz 2x2 com det = ±1
export const inv2 = ([[a, b], [c, d]]) => {
  const det = a * d - b * c;
  return [[d / det, -b / det], [-c / det, a / det]].map((r) => r.map((v) => (v === 0 ? 0 : v)));
};

// Alternativas numéricas plausíveis (inclui a correta), sempre distintas
export const numChoices = (rng, correct, extra = []) => {
  const set = new Set([correct]);
  const cands = [correct + 1, correct - 1, correct + 2, correct - 2, -correct, correct * 2, correct + 10, ...extra];
  for (const c of rng.shuffle(cands)) {
    if (set.size >= 4) break;
    set.add(c);
  }
  let k = 3;
  while (set.size < 4) set.add(correct + k++);
  return rng.shuffle([...set]).map(fmt);
};

// Interpreta a resposta digitada: aceita −, vírgula decimal e frações a/b
export const parseNumber = (raw) => {
  if (raw == null) return NaN;
  const s = String(raw).trim().replace('−', '-').replace(',', '.');
  if (s === '' || s === '-') return NaN;
  if (s.includes('/')) {
    const [n, d] = s.split('/');
    const nn = Number(n);
    const dd = Number(d);
    return dd === 0 || Number.isNaN(nn) || Number.isNaN(dd) ? NaN : nn / dd;
  }
  return Number(s);
};
export const sameNumber = (a, b) => Math.abs(a - b) < 1e-9;
