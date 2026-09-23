// Geradores procedurais de exercícios — infinitos, corretos por construção e nos 4 idiomas.
import { L } from '../i18n/core';
import {
  add, sub, scale, mul, transpose, det2, det3, inv2, isSymmetric, trace, mat, fmt, idx,
} from './mathkit';

const M = (m, label) => ({ m, label });
const OP = (op) => ({ op });
const orderStr = (r, c) => `${r} × ${c}`;

const distinctOrders = (rng, r, c) => {
  const set = new Set([orderStr(r, c), orderStr(c, r)]);
  let guard = 0;
  while (set.size < 4 && guard++ < 50) set.add(orderStr(rng.int(1, 4), rng.int(1, 4)));
  return rng.shuffle([...set]);
};

const TRUE = L('Verdadeiro', 'True', 'Verdadero', 'Vrai');
const FALSE = L('Falso', 'False', 'Falso', 'Faux');

/* ───────────────────────── Tier 1 — Fundamentos ───────────────────────── */
const g = {};

g.dim = (rng) => {
  const r = rng.int(1, 4);
  const c = rng.int(1, 4) + (r === 1 ? 1 : 0);
  const A = mat(rng, r, c, 0, 9);
  const o = orderStr(r, c);
  return {
    type: 'matrix_dimension',
    question: L('Qual é a ordem desta matriz?', 'What is the order of this matrix?', '¿Cuál es el orden de esta matriz?', 'Quel est l’ordre de cette matrice ?'),
    matrix: A,
    options: distinctOrders(rng, r, c),
    correctAnswer: o,
    explanation: L(
      `${r} linhas e ${c} colunas → ordem ${o} (linhas × colunas).`,
      `${r} rows and ${c} columns → order ${o} (rows × columns).`,
      `${r} filas y ${c} columnas → orden ${o} (filas × columnas).`,
      `${r} lignes et ${c} colonnes → ordre ${o} (lignes × colonnes).`,
    ),
  };
};

g.elemClick = (rng) => {
  const r = rng.int(2, 3), c = rng.int(2, 3);
  const A = mat(rng, r, c, 1, 9);
  const i = rng.int(1, r), j = rng.int(1, c);
  return {
    type: 'cell_click',
    question: L(
      `Toque no elemento a${idx(i, j)} (linha ${i}, coluna ${j}).`,
      `Tap element a${idx(i, j)} (row ${i}, column ${j}).`,
      `Toca el elemento a${idx(i, j)} (fila ${i}, columna ${j}).`,
      `Touchez l’élément a${idx(i, j)} (ligne ${i}, colonne ${j}).`,
    ),
    matrix: A,
    targetCell: { r: i - 1, c: j - 1 },
    explanation: L(
      `a${idx(i, j)} fica na linha ${i}, coluna ${j}: vale ${A[i - 1][j - 1]}.`,
      `a${idx(i, j)} sits in row ${i}, column ${j}: it equals ${A[i - 1][j - 1]}.`,
      `a${idx(i, j)} está en la fila ${i}, columna ${j}: vale ${A[i - 1][j - 1]}.`,
      `a${idx(i, j)} est en ligne ${i}, colonne ${j} : il vaut ${A[i - 1][j - 1]}.`,
    ),
  };
};

g.elemValue = (rng) => {
  const r = rng.int(2, 3), c = rng.int(2, 4);
  const A = mat(rng, r, c, -9, 9);
  const i = rng.int(1, r), j = rng.int(1, c);
  const v = A[i - 1][j - 1];
  return {
    type: 'numeric_input',
    question: L(`Quanto vale a${idx(i, j)}?`, `What is the value of a${idx(i, j)}?`, `¿Cuánto vale a${idx(i, j)}?`, `Combien vaut a${idx(i, j)} ?`),
    matrix: A,
    answer: v,
    explanation: L(
      `Linha ${i}, coluna ${j} → ${fmt(v)}.`, `Row ${i}, column ${j} → ${fmt(v)}.`,
      `Fila ${i}, columna ${j} → ${fmt(v)}.`, `Ligne ${i}, colonne ${j} → ${fmt(v)}.`,
    ),
  };
};

g.count = (rng) => {
  const r = rng.int(2, 6), c = rng.int(2, 6);
  return {
    type: 'numeric_input',
    question: L(
      `Quantos elementos tem uma matriz de ordem ${r} × ${c}?`,
      `How many elements does a ${r} × ${c} matrix have?`,
      `¿Cuántos elementos tiene una matriz de orden ${r} × ${c}?`,
      `Combien d’éléments compte une matrice d’ordre ${r} × ${c} ?`,
    ),
    answer: r * c,
    explanation: L(`${r} × ${c} = ${r * c}.`, `${r} × ${c} = ${r * c}.`, `${r} × ${c} = ${r * c}.`, `${r} × ${c} = ${r * c}.`),
  };
};

g.formula = (rng) => {
  const forms = [
    { s: 'i + j', f: (i, j) => i + j },
    { s: 'i · j', f: (i, j) => i * j },
    { s: '2i − j', f: (i, j) => 2 * i - j },
    { s: 'i² + j', f: (i, j) => i * i + j },
    { s: 'i − j', f: (i, j) => i - j },
  ];
  const { s, f } = rng.pick(forms);
  const i = rng.int(1, 3), j = rng.int(1, 3);
  const v = f(i, j);
  return {
    type: 'numeric_input',
    question: L(
      `Seja A = (aᵢⱼ) de ordem 3 × 3 com aᵢⱼ = ${s}. Calcule a${idx(i, j)}.`,
      `Let A = (aᵢⱼ) be 3 × 3 with aᵢⱼ = ${s}. Compute a${idx(i, j)}.`,
      `Sea A = (aᵢⱼ) de orden 3 × 3 con aᵢⱼ = ${s}. Calcula a${idx(i, j)}.`,
      `Soit A = (aᵢⱼ) d’ordre 3 × 3 avec aᵢⱼ = ${s}. Calculez a${idx(i, j)}.`,
    ),
    answer: v,
    explanation: L(
      `Substitua i = ${i} e j = ${j}: ${s} = ${fmt(v)}.`, `Substitute i = ${i}, j = ${j}: ${s} = ${fmt(v)}.`,
      `Sustituye i = ${i}, j = ${j}: ${s} = ${fmt(v)}.`, `Remplacez i = ${i}, j = ${j} : ${s} = ${fmt(v)}.`,
    ),
  };
};

g.trace = (rng) => {
  const n = rng.int(2, 3);
  const A = mat(rng, n, n, -5, 9);
  const t = trace(A);
  return {
    type: 'numeric_input',
    question: L(
      'Some os elementos da diagonal principal (o traço da matriz).',
      'Add the elements of the main diagonal (the trace of the matrix).',
      'Suma los elementos de la diagonal principal (la traza de la matriz).',
      'Additionnez les éléments de la diagonale principale (la trace de la matrice).',
    ),
    matrix: A,
    answer: t,
    explanation: L(
      `Diagonal: ${A.map((r, i) => fmt(r[i])).join(' + ')} = ${fmt(t)}.`,
      `Diagonal: ${A.map((r, i) => fmt(r[i])).join(' + ')} = ${fmt(t)}.`,
      `Diagonal: ${A.map((r, i) => fmt(r[i])).join(' + ')} = ${fmt(t)}.`,
      `Diagonale : ${A.map((r, i) => fmt(r[i])).join(' + ')} = ${fmt(t)}.`,
    ),
  };
};

/* ───────────────────────── Tier 2 — Soma, subtração, escalar ───────────────────────── */
g.sumCell = (rng) => {
  const r = rng.int(2, 3), c = rng.int(2, 3);
  const A = mat(rng, r, c, -5, 9), B = mat(rng, r, c, -5, 9);
  const i = rng.int(1, r), j = rng.int(1, c);
  const v = A[i - 1][j - 1] + B[i - 1][j - 1];
  return {
    type: 'numeric_input',
    question: L(
      `Se C = A + B, quanto vale c${idx(i, j)}?`, `If C = A + B, what is c${idx(i, j)}?`,
      `Si C = A + B, ¿cuánto vale c${idx(i, j)}?`, `Si C = A + B, combien vaut c${idx(i, j)} ?`,
    ),
    display: [M(A, 'A'), OP('+'), M(B, 'B')],
    answer: v,
    explanation: L(
      `c${idx(i, j)} = a${idx(i, j)} + b${idx(i, j)} = ${fmt(A[i - 1][j - 1])} + ${fmt(B[i - 1][j - 1])} = ${fmt(v)}.`,
      `c${idx(i, j)} = a${idx(i, j)} + b${idx(i, j)} = ${fmt(A[i - 1][j - 1])} + ${fmt(B[i - 1][j - 1])} = ${fmt(v)}.`,
      `c${idx(i, j)} = a${idx(i, j)} + b${idx(i, j)} = ${fmt(A[i - 1][j - 1])} + ${fmt(B[i - 1][j - 1])} = ${fmt(v)}.`,
      `c${idx(i, j)} = a${idx(i, j)} + b${idx(i, j)} = ${fmt(A[i - 1][j - 1])} + ${fmt(B[i - 1][j - 1])} = ${fmt(v)}.`,
    ),
  };
};

g.sumMatrix = (rng) => {
  const r = 2, c = rng.int(2, 3);
  const A = mat(rng, r, c, -4, 9), B = mat(rng, r, c, -4, 9);
  return {
    type: 'matrix_fill',
    question: L('Calcule A + B, célula por célula.', 'Compute A + B, cell by cell.', 'Calcula A + B, celda por celda.', 'Calculez A + B, cellule par cellule.'),
    display: [M(A, 'A'), OP('+'), M(B, 'B'), OP('=')],
    rows: r, cols: c, answerMatrix: add(A, B),
    explanation: L('Some os elementos de mesma posição.', 'Add entries in the same position.', 'Suma los elementos de la misma posición.', 'Additionnez les éléments de même position.'),
  };
};

g.subMatrix = (rng) => {
  const r = 2, c = rng.int(2, 3);
  const A = mat(rng, r, c, -4, 9), B = mat(rng, r, c, -4, 9);
  return {
    type: 'matrix_fill',
    question: L('Calcule A − B.', 'Compute A − B.', 'Calcula A − B.', 'Calculez A − B.'),
    display: [M(A, 'A'), OP('−'), M(B, 'B'), OP('=')],
    rows: r, cols: c, answerMatrix: sub(A, B),
    explanation: L('Subtraia elemento a elemento: aᵢⱼ − bᵢⱼ.', 'Subtract entry by entry: aᵢⱼ − bᵢⱼ.', 'Resta elemento a elemento: aᵢⱼ − bᵢⱼ.', 'Soustrayez terme à terme : aᵢⱼ − bᵢⱼ.'),
  };
};

g.sumPossible = (rng) => {
  const [r1, c1] = [rng.int(1, 3), rng.int(1, 3)];
  const same = rng.chance(0.5);
  const [r2, c2] = same ? [r1, c1] : [rng.int(1, 3), rng.int(1, 3)];
  const ok = r1 === r2 && c1 === c2;
  return {
    type: 'true_false',
    question: L(
      `É possível calcular A + B se A é ${orderStr(r1, c1)} e B é ${orderStr(r2, c2)}?`,
      `Can A + B be computed if A is ${orderStr(r1, c1)} and B is ${orderStr(r2, c2)}?`,
      `¿Se puede calcular A + B si A es ${orderStr(r1, c1)} y B es ${orderStr(r2, c2)}?`,
      `Peut-on calculer A + B si A est ${orderStr(r1, c1)} et B est ${orderStr(r2, c2)} ?`,
    ),
    options: 'tf', correctBool: ok,
    explanation: L(
      ok ? 'Sim: as ordens são iguais.' : 'Não: só se somam matrizes de mesma ordem.',
      ok ? 'Yes: same order.' : 'No: only matrices of the same order can be added.',
      ok ? 'Sí: mismo orden.' : 'No: solo se suman matrices del mismo orden.',
      ok ? 'Oui : même ordre.' : 'Non : on n’additionne que des matrices de même ordre.',
    ),
  };
};

g.scalarCell = (rng) => {
  const r = rng.int(2, 3), c = rng.int(2, 3);
  const A = mat(rng, r, c, -6, 9);
  const k = rng.pick([2, 3, 4, -1, -2, 5]);
  const i = rng.int(1, r), j = rng.int(1, c);
  const v = k * A[i - 1][j - 1];
  return {
    type: 'numeric_input',
    question: L(
      `Se B = ${fmt(k)}·A, quanto vale b${idx(i, j)}?`, `If B = ${fmt(k)}·A, what is b${idx(i, j)}?`,
      `Si B = ${fmt(k)}·A, ¿cuánto vale b${idx(i, j)}?`, `Si B = ${fmt(k)}·A, combien vaut b${idx(i, j)} ?`,
    ),
    matrix: A, answer: v,
    explanation: L(
      `b${idx(i, j)} = ${fmt(k)} · ${fmt(A[i - 1][j - 1])} = ${fmt(v)}.`, `b${idx(i, j)} = ${fmt(k)} · ${fmt(A[i - 1][j - 1])} = ${fmt(v)}.`,
      `b${idx(i, j)} = ${fmt(k)} · ${fmt(A[i - 1][j - 1])} = ${fmt(v)}.`, `b${idx(i, j)} = ${fmt(k)} · ${fmt(A[i - 1][j - 1])} = ${fmt(v)}.`,
    ),
  };
};

g.scalarMatrix = (rng) => {
  const A = mat(rng, 2, rng.int(2, 3), -5, 6);
  const k = rng.pick([2, 3, -1, -2, 4]);
  return {
    type: 'matrix_fill',
    question: L(`Calcule ${fmt(k)}·A.`, `Compute ${fmt(k)}·A.`, `Calcula ${fmt(k)}·A.`, `Calculez ${fmt(k)}·A.`),
    display: [{ text: `${fmt(k)} ·` }, M(A, 'A'), OP('=')],
    rows: 2, cols: A[0].length, answerMatrix: scale(k, A),
    explanation: L('Multiplique TODOS os elementos pelo escalar.', 'Multiply EVERY entry by the scalar.', 'Multiplica TODOS los elementos por el escalar.', 'Multipliez TOUS les éléments par le scalaire.'),
  };
};

g.combo = (rng) => {
  const A = mat(rng, 2, 2, -3, 5), B = mat(rng, 2, 2, -3, 5);
  const a = rng.pick([2, 3]), b = rng.pick([1, 2, -1]);
  const R = add(scale(a, A), scale(b, B));
  return {
    type: 'matrix_fill',
    question: L(`Calcule ${a}A ${b < 0 ? '−' : '+'} ${Math.abs(b) === 1 ? '' : Math.abs(b)}B.`, `Compute ${a}A ${b < 0 ? '−' : '+'} ${Math.abs(b) === 1 ? '' : Math.abs(b)}B.`,
      `Calcula ${a}A ${b < 0 ? '−' : '+'} ${Math.abs(b) === 1 ? '' : Math.abs(b)}B.`, `Calculez ${a}A ${b < 0 ? '−' : '+'} ${Math.abs(b) === 1 ? '' : Math.abs(b)}B.`),
    display: [M(A, 'A'), OP(','), M(B, 'B')],
    rows: 2, cols: 2, answerMatrix: R,
    explanation: L('Primeiro os escalares, depois a soma elemento a elemento.', 'Scalars first, then entrywise sum.', 'Primero los escalares, luego la suma elemento a elemento.', 'D’abord les scalaires, puis la somme terme à terme.'),
  };
};

/* ───────────────────────── Tier 3 — Transposta e produto ───────────────────────── */
g.transposeDim = (rng) => {
  const r = rng.int(1, 4), c = rng.int(2, 4);
  return {
    type: 'matrix_dimension',
    question: L(`Se A tem ordem ${orderStr(r, c)}, qual é a ordem de Aᵀ?`, `If A has order ${orderStr(r, c)}, what is the order of Aᵀ?`, `Si A tiene orden ${orderStr(r, c)}, ¿cuál es el orden de Aᵀ?`, `Si A est d’ordre ${orderStr(r, c)}, quel est l’ordre de Aᵀ ?`),
    options: distinctOrders(rng, r, c), correctAnswer: orderStr(c, r),
    explanation: L('A transposta troca linhas por colunas.', 'The transpose swaps rows and columns.', 'La transpuesta intercambia filas y columnas.', 'La transposée échange lignes et colonnes.'),
  };
};

g.transposeMatrix = (rng) => {
  const r = rng.int(2, 3), c = rng.int(2, 3);
  const A = mat(rng, r, c, 0, 9);
  return {
    type: 'matrix_fill',
    question: L('Escreva a transposta Aᵀ.', 'Write the transpose Aᵀ.', 'Escribe la transpuesta Aᵀ.', 'Écrivez la transposée Aᵀ.'),
    display: [M(A, 'A'), OP('→ Aᵀ =')],
    rows: c, cols: r, answerMatrix: transpose(A),
    explanation: L('A linha i de A vira a coluna i de Aᵀ.', 'Row i of A becomes column i of Aᵀ.', 'La fila i de A pasa a ser la columna i de Aᵀ.', 'La ligne i de A devient la colonne i de Aᵀ.'),
  };
};

g.symmetric = (rng) => {
  const n = rng.int(2, 3);
  const A = mat(rng, n, n, 0, 9);
  for (let i = 0; i < n; i++) for (let j = 0; j < i; j++) A[i][j] = A[j][i];
  if (rng.chance(0.5)) A[n - 1][0] += rng.int(1, 3);
  const ok = isSymmetric(A);
  return {
    type: 'true_false',
    question: L('Esta matriz é simétrica (A = Aᵀ)?', 'Is this matrix symmetric (A = Aᵀ)?', '¿Es simétrica esta matriz (A = Aᵀ)?', 'Cette matrice est-elle symétrique (A = Aᵀ) ?'),
    matrix: A, options: 'tf', correctBool: ok,
    explanation: L(
      ok ? 'Sim: aᵢⱼ = aⱼᵢ para todos os pares.' : 'Não: existe um par com aᵢⱼ ≠ aⱼᵢ.',
      ok ? 'Yes: aᵢⱼ = aⱼᵢ for every pair.' : 'No: some pair has aᵢⱼ ≠ aⱼᵢ.',
      ok ? 'Sí: aᵢⱼ = aⱼᵢ para todos los pares.' : 'No: hay un par con aᵢⱼ ≠ aⱼᵢ.',
      ok ? 'Oui : aᵢⱼ = aⱼᵢ pour tous les couples.' : 'Non : un couple a aᵢⱼ ≠ aⱼᵢ.',
    ),
  };
};

g.mulOrder = (rng) => {
  const m = rng.int(1, 4), n = rng.int(1, 4), p = rng.int(1, 4);
  const ok = rng.chance(0.65);
  const q = ok ? n : (n === 4 ? 3 : n + 1);
  const IMP = L('Impossível', 'Impossible', 'Imposible', 'Impossible');
  const wrong = [...new Set([orderStr(p, m), orderStr(m, n), orderStr(n, p), orderStr(q, p)])].filter((o) => o !== orderStr(m, p));
  const pool = ok ? [orderStr(m, p), ...wrong.slice(0, 2), IMP] : [IMP, orderStr(m, p), ...wrong.slice(0, 2)];
  return {
    type: 'multiple_choice',
    question: L(
      `A é ${orderStr(m, n)} e B é ${orderStr(q, p)}. Qual a ordem de A·B?`,
      `A is ${orderStr(m, n)} and B is ${orderStr(q, p)}. What is the order of A·B?`,
      `A es ${orderStr(m, n)} y B es ${orderStr(q, p)}. ¿Cuál es el orden de A·B?`,
      `A est ${orderStr(m, n)} et B est ${orderStr(q, p)}. Quel est l’ordre de A·B ?`,
    ),
    options: rng.shuffle(pool),
    correctAnswer: ok ? orderStr(m, p) : IMP,
    explanation: L(
      ok ? `Colunas de A (${n}) = linhas de B (${q}) → resultado ${orderStr(m, p)}.` : `Colunas de A (${n}) ≠ linhas de B (${q}): o produto não existe.`,
      ok ? `Columns of A (${n}) = rows of B (${q}) → result ${orderStr(m, p)}.` : `Columns of A (${n}) ≠ rows of B (${q}): the product does not exist.`,
      ok ? `Columnas de A (${n}) = filas de B (${q}) → resultado ${orderStr(m, p)}.` : `Columnas de A (${n}) ≠ filas de B (${q}): el producto no existe.`,
      ok ? `Colonnes de A (${n}) = lignes de B (${q}) → résultat ${orderStr(m, p)}.` : `Colonnes de A (${n}) ≠ lignes de B (${q}) : le produit n’existe pas.`,
    ),
  };
};

g.mulCell = (rng) => {
  const A = mat(rng, 2, 2, -2, 4), B = mat(rng, 2, 2, -2, 4);
  const i = rng.int(1, 2), j = rng.int(1, 2);
  const P = mul(A, B);
  const terms = [0, 1].map((k) => `${fmt(A[i - 1][k])}·${fmt(B[k][j - 1])}`).join(' + ');
  return {
    type: 'numeric_input',
    question: L(`Qual o elemento (A·B)${idx(i, j)}?`, `What is entry (A·B)${idx(i, j)}?`, `¿Cuál es el elemento (A·B)${idx(i, j)}?`, `Quel est l’élément (A·B)${idx(i, j)} ?`),
    display: [M(A, 'A'), OP('·'), M(B, 'B')],
    answer: P[i - 1][j - 1],
    explanation: L(
      `Linha ${i} de A com coluna ${j} de B: ${terms} = ${fmt(P[i - 1][j - 1])}.`,
      `Row ${i} of A with column ${j} of B: ${terms} = ${fmt(P[i - 1][j - 1])}.`,
      `Fila ${i} de A con columna ${j} de B: ${terms} = ${fmt(P[i - 1][j - 1])}.`,
      `Ligne ${i} de A avec colonne ${j} de B : ${terms} = ${fmt(P[i - 1][j - 1])}.`,
    ),
  };
};

g.mulMatrix = (rng) => {
  const A = mat(rng, 2, 2, -1, 3), B = mat(rng, 2, 2, -1, 3);
  return {
    type: 'matrix_fill',
    question: L('Calcule A·B completo.', 'Compute the full product A·B.', 'Calcula el producto A·B completo.', 'Calculez le produit A·B complet.'),
    display: [M(A, 'A'), OP('·'), M(B, 'B'), OP('=')],
    rows: 2, cols: 2, answerMatrix: mul(A, B),
    explanation: L('Cada célula é (linha de A) × (coluna de B).', 'Each cell is (row of A) · (column of B).', 'Cada celda es (fila de A) · (columna de B).', 'Chaque case est (ligne de A) · (colonne de B).'),
  };
};

g.mulVector = (rng) => {
  const A = mat(rng, 2, 3, -2, 4), v = mat(rng, 3, 1, -2, 4);
  return {
    type: 'matrix_fill',
    question: L('Calcule A·v (matriz coluna).', 'Compute A·v (column matrix).', 'Calcula A·v (matriz columna).', 'Calculez A·v (matrice colonne).'),
    display: [M(A, 'A'), OP('·'), M(v, 'v'), OP('=')],
    rows: 2, cols: 1, answerMatrix: mul(A, v),
    explanation: L('Duas linhas de A × a única coluna de v.', 'Two rows of A against the single column of v.', 'Dos filas de A por la única columna de v.', 'Deux lignes de A par l’unique colonne de v.'),
  };
};

/* ───────────────────────── Tier 4 — Determinantes e inversa ───────────────────────── */
g.det2 = (rng) => {
  const A = mat(rng, 2, 2, -4, 6);
  const d = det2(A);
  return {
    type: 'numeric_input',
    question: L('Calcule o determinante.', 'Compute the determinant.', 'Calcula el determinante.', 'Calculez le déterminant.'),
    matrix: A, answer: d,
    explanation: L(
      `ad − bc = ${fmt(A[0][0])}·${fmt(A[1][1])} − ${fmt(A[0][1])}·${fmt(A[1][0])} = ${fmt(d)}.`, `ad − bc = ${fmt(A[0][0])}·${fmt(A[1][1])} − ${fmt(A[0][1])}·${fmt(A[1][0])} = ${fmt(d)}.`,
      `ad − bc = ${fmt(A[0][0])}·${fmt(A[1][1])} − ${fmt(A[0][1])}·${fmt(A[1][0])} = ${fmt(d)}.`, `ad − bc = ${fmt(A[0][0])}·${fmt(A[1][1])} − ${fmt(A[0][1])}·${fmt(A[1][0])} = ${fmt(d)}.`,
    ),
    hint: L('Diagonal principal menos diagonal secundária.', 'Main diagonal minus secondary diagonal.', 'Diagonal principal menos diagonal secundaria.', 'Diagonale principale moins diagonale secondaire.'),
  };
};

g.det3 = (rng) => {
  const A = mat(rng, 3, 3, -2, 4);
  const d = det3(A);
  return {
    type: 'numeric_input',
    question: L('Use a Regra de Sarrus para achar o determinante.', 'Use Sarrus’ rule to find the determinant.', 'Usa la regla de Sarrus para hallar el determinante.', 'Utilisez la règle de Sarrus pour trouver le déterminant.'),
    matrix: A, answer: d,
    explanation: L(
      `Somando as 3 diagonais principais e subtraindo as 3 secundárias: det = ${fmt(d)}.`,
      `Add the 3 main diagonals and subtract the 3 secondary ones: det = ${fmt(d)}.`,
      `Suma las 3 diagonales principales y resta las 3 secundarias: det = ${fmt(d)}.`,
      `Additionnez les 3 diagonales principales et soustrayez les 3 secondaires : det = ${fmt(d)}.`,
    ),
    hint: L('Repita as duas primeiras colunas à direita.', 'Repeat the first two columns on the right.', 'Repite las dos primeras columnas a la derecha.', 'Répétez les deux premières colonnes à droite.'),
  };
};

g.invertible = (rng) => {
  const singular = rng.chance(0.5);
  let A;
  if (singular) {
    const a = rng.int(1, 4), b = rng.int(1, 4), k = rng.int(2, 3);
    A = [[a, b], [k * a, k * b]];
  } else {
    do { A = mat(rng, 2, 2, -3, 5); } while (det2(A) === 0);
  }
  const d = det2(A);
  return {
    type: 'true_false',
    question: L('Esta matriz possui inversa?', 'Does this matrix have an inverse?', '¿Tiene inversa esta matriz?', 'Cette matrice a-t-elle une inverse ?'),
    matrix: A, options: 'tf', correctBool: d !== 0,
    explanation: L(
      d === 0 ? 'det = 0 → matriz singular, sem inversa.' : `det = ${fmt(d)} ≠ 0 → existe inversa.`,
      d === 0 ? 'det = 0 → singular matrix, no inverse.' : `det = ${fmt(d)} ≠ 0 → an inverse exists.`,
      d === 0 ? 'det = 0 → matriz singular, sin inversa.' : `det = ${fmt(d)} ≠ 0 → existe inversa.`,
      d === 0 ? 'det = 0 → matrice singulière, sans inverse.' : `det = ${fmt(d)} ≠ 0 → une inverse existe.`,
    ),
  };
};

g.inv2 = (rng) => {
  // a·d − b·c = 1 → inversa com entradas inteiras
  const b = rng.int(0, 3), c = rng.int(1, 3);
  const A = rng.chance(0.5) ? [[1, b], [c, 1 + b * c]] : [[1 + b * c, b], [c, 1]];
  return {
    type: 'matrix_fill',
    question: L('Encontre A⁻¹ (o determinante é 1).', 'Find A⁻¹ (the determinant is 1).', 'Encuentra A⁻¹ (el determinante es 1).', 'Trouvez A⁻¹ (le déterminant vaut 1).'),
    matrix: A, rows: 2, cols: 2, answerMatrix: inv2(A),
    explanation: L(
      'A⁻¹ = (1/det)·[[d, −b], [−c, a]]. Troque a↔d e inverta o sinal de b e c.',
      'A⁻¹ = (1/det)·[[d, −b], [−c, a]]. Swap a↔d and flip the signs of b and c.',
      'A⁻¹ = (1/det)·[[d, −b], [−c, a]]. Intercambia a↔d y cambia el signo de b y c.',
      'A⁻¹ = (1/det)·[[d, −b], [−c, a]]. Échangez a↔d et changez le signe de b et c.',
    ),
    hint: L('Troque a e d; mude o sinal de b e c.', 'Swap a and d; flip the signs of b and c.', 'Intercambia a y d; cambia el signo de b y c.', 'Échangez a et d ; changez le signe de b et c.'),
  };
};

g.detScalar = (rng) => {
  const A = mat(rng, 2, 2, -3, 5);
  const k = rng.pick([2, 3]);
  const d = det2(A);
  return {
    type: 'numeric_input',
    question: L(
      `Se det(A) = ${fmt(d)} e A é 2 × 2, quanto vale det(${k}A)?`, `If det(A) = ${fmt(d)} and A is 2 × 2, what is det(${k}A)?`,
      `Si det(A) = ${fmt(d)} y A es 2 × 2, ¿cuánto vale det(${k}A)?`, `Si det(A) = ${fmt(d)} et A est 2 × 2, que vaut det(${k}A) ?`,
    ),
    answer: k * k * d,
    explanation: L(
      `det(kA) = kⁿ·det(A) com n = 2: ${k}² · ${fmt(d)} = ${fmt(k * k * d)}.`, `det(kA) = kⁿ·det(A) with n = 2: ${k}² · ${fmt(d)} = ${fmt(k * k * d)}.`,
      `det(kA) = kⁿ·det(A) con n = 2: ${k}² · ${fmt(d)} = ${fmt(k * k * d)}.`, `det(kA) = kⁿ·det(A) avec n = 2 : ${k}² · ${fmt(d)} = ${fmt(k * k * d)}.`,
    ),
  };
};

g.solve = (rng) => {
  // A·X = B com A de determinante 1: X = A⁻¹·B
  const b = rng.int(0, 2), c = rng.int(1, 2);
  const A = [[1, b], [c, 1 + b * c]];
  const X = mat(rng, 2, 1, -3, 4);
  const B = mul(A, X);
  return {
    type: 'matrix_fill',
    question: L('Resolva o sistema A·X = B (dica: X = A⁻¹·B).', 'Solve the system A·X = B (hint: X = A⁻¹·B).', 'Resuelve el sistema A·X = B (pista: X = A⁻¹·B).', 'Résolvez le système A·X = B (indice : X = A⁻¹·B).'),
    display: [M(A, 'A'), OP('·'), { text: 'X' }, OP('='), M(B, 'B')],
    rows: 2, cols: 1, answerMatrix: X,
    explanation: L(
      'Multiplique os dois lados por A⁻¹: X = A⁻¹·B. Confira: A·X deve dar B.',
      'Multiply both sides by A⁻¹: X = A⁻¹·B. Check: A·X must give B.',
      'Multiplica ambos lados por A⁻¹: X = A⁻¹·B. Comprueba: A·X debe dar B.',
      'Multipliez les deux côtés par A⁻¹ : X = A⁻¹·B. Vérifiez : A·X doit donner B.',
    ),
    hint: L('Você também pode testar valores: A·X precisa dar B.', 'You can also test values: A·X must equal B.', 'También puedes probar valores: A·X debe dar B.', 'Vous pouvez aussi tester des valeurs : A·X doit donner B.'),
  };
};

export const GENERATORS = g;
export const TIERS = {
  1: ['dim', 'elemClick', 'elemValue', 'count', 'formula', 'trace'],
  2: ['sumCell', 'sumMatrix', 'subMatrix', 'sumPossible', 'scalarCell', 'scalarMatrix', 'combo'],
  3: ['transposeDim', 'transposeMatrix', 'symmetric', 'mulOrder', 'mulCell', 'mulMatrix', 'mulVector'],
  4: ['det2', 'det3', 'invertible', 'inv2', 'detScalar', 'solve'],
};

let uid = 0;
// Converte a saída bruta do gerador em atividade completa
export function realize(name, rng) {
  const a = { ...g[name](rng), id: `gen-${name}-${++uid}`, gen: name };
  if (a.options === 'tf') {
    a.options = [TRUE, FALSE];
    a.correctAnswer = a.correctBool ? TRUE : FALSE;
  }
  return a;
}

// Sessão: lista [[gerador, quantidade], ...] → atividades embaralhadas
export function buildSession(rng, plan) {
  const out = [];
  for (const [name, n] of plan) for (let i = 0; i < n; i++) out.push(realize(name, rng));
  return rng.shuffle(out);
}

export function tierSession(rng, tiers, count) {
  const pool = tiers.flatMap((t) => TIERS[t]);
  const out = [];
  for (let i = 0; i < count; i++) out.push(realize(rng.pick(pool), rng));
  return out;
}

