// Geradores adicionais — um por passo do currículo, com três níveis de dificuldade (lvl 1 = aquecimento … 3 = desafio).
import { L } from '../i18n/core';
import { add, sub, mul, inv2, mat, fmt, idx } from './mathkit';

const M = (m, label, hl) => ({ m, label, hl });
const OP = (op) => ({ op });
const TXT = (text) => ({ text });
const orderStr = (r, c) => `${r} × ${c}`;
const IMPOSSIBLE = L('Impossível', 'Impossible', 'Imposible', 'Impossible');

// afirmações verdadeiras/falsas: [verdadeira?, pt, en, es, fr, explicação pt, en, es, fr]
const statement = (rng, list) => {
  const [ok, pt, en, es, fr, xpt, xen, xes, xfr] = rng.pick(list);
  return {
    type: 'true_false',
    question: L(pt, en, es, fr),
    options: 'tf',
    correctBool: ok,
    explanation: L(xpt, xen, xes, xfr),
  };
};
const distinct = (rng, n, lo, hi) => rng.shuffle(Array.from({ length: hi - lo + 1 }, (_, i) => lo + i)).slice(0, n);

export const EXTRA = {};
const X = EXTRA;

/* ───────────── Grimórios (Missão 1) ───────────── */
X.rowsCols = (rng, lvl = 2) => {
  const r = rng.int(1, 1 + lvl), c = rng.int(2, 2 + lvl);
  const A = mat(rng, r, c, 0, 9);
  const rows = rng.chance(0.5);
  return {
    type: 'numeric_input',
    question: rows
      ? L('Quantas **linhas** tem esta matriz?', 'How many **rows** does this matrix have?', '¿Cuántas **filas** tiene esta matriz?', 'Combien de **lignes** cette matrice a-t-elle ?')
      : L('Quantas **colunas** tem esta matriz?', 'How many **columns** does this matrix have?', '¿Cuántas **columnas** tiene esta matriz?', 'Combien de **colonnes** cette matrice a-t-elle ?'),
    matrix: A,
    answer: rows ? r : c,
    explanation: rows
      ? L('Linhas são as fileiras horizontais (→).', 'Rows are the horizontal lines (→).', 'Las filas son las líneas horizontales (→).', 'Les lignes sont les rangées horizontales (→).')
      : L('Colunas são as fileiras verticais (↓).', 'Columns are the vertical lines (↓).', 'Las columnas son las líneas verticales (↓).', 'Les colonnes sont les rangées verticales (↓).'),
  };
};

X.findAddress = (rng, lvl = 2) => {
  const r = rng.int(2, lvl > 1 ? 3 : 2), c = rng.int(2, 3);
  const pool = distinct(rng, r * c, 1, 9);
  const A = Array.from({ length: r }, (_, i) => pool.slice(i * c, i * c + c));
  const i = rng.int(1, r), j = rng.int(1, c);
  const v = A[i - 1][j - 1];
  const addr = (a, b) => `a${idx(a, b)}`;
  const set = new Set([addr(i, j)]);
  if (j <= r && i <= c && i !== j) set.add(addr(j, i));
  let guard = 0;
  while (set.size < 4 && guard++ < 40) set.add(addr(rng.int(1, r), rng.int(1, c)));
  return {
    type: 'multiple_choice',
    question: L(`Em que endereço está o número **${v}**?`, `At which address is the number **${v}**?`, `¿En qué dirección está el número **${v}**?`, `À quelle adresse se trouve le nombre **${v}** ?`),
    matrix: A,
    options: rng.shuffle([...set]),
    correctAnswer: addr(i, j),
    explanation: L(`${v} está na linha ${i}, coluna ${j}: ${addr(i, j)}.`, `${v} sits in row ${i}, column ${j}: ${addr(i, j)}.`, `${v} está en la fila ${i}, columna ${j}: ${addr(i, j)}.`, `${v} est en ligne ${i}, colonne ${j} : ${addr(i, j)}.`),
  };
};

const FORMS = {
  1: [{ s: 'i + j', f: (i, j) => i + j }, { s: '2i', f: (i) => 2 * i }, { s: 'j + 1', f: (i, j) => j + 1 }, { s: 'i + 2', f: (i) => i + 2 }],
  2: [{ s: 'i · j', f: (i, j) => i * j }, { s: '2i − j', f: (i, j) => 2 * i - j }, { s: 'i − j', f: (i, j) => i - j }, { s: 'i + 2j', f: (i, j) => i + 2 * j }],
  3: [{ s: 'i² + j', f: (i, j) => i * i + j }, { s: 'i · j − 1', f: (i, j) => i * j - 1 }, { s: '2i + 3j', f: (i, j) => 2 * i + 3 * j }, { s: 'j² − i', f: (i, j) => j * j - i }],
};
X.formationMatrix = (rng, lvl = 2) => {
  const { s, f } = rng.pick(FORMS[lvl] || FORMS[2]);
  const r = 2, c = lvl >= 3 ? 3 : 2;
  const A = Array.from({ length: r }, (_, i) => Array.from({ length: c }, (_, j) => f(i + 1, j + 1)));
  return {
    type: 'matrix_fill',
    question: L(`Construa a matriz A = (aᵢⱼ) de ordem ${orderStr(r, c)} com aᵢⱼ = ${s}.`, `Build the matrix A = (aᵢⱼ) of order ${orderStr(r, c)} with aᵢⱼ = ${s}.`, `Construye la matriz A = (aᵢⱼ) de orden ${orderStr(r, c)} con aᵢⱼ = ${s}.`, `Construisez la matrice A = (aᵢⱼ) d’ordre ${orderStr(r, c)} avec aᵢⱼ = ${s}.`),
    rows: r, cols: c, answerMatrix: A,
    explanation: L(`Para cada posição, troque i e j pelos números da linha e da coluna. Ex.: a₁₁ = ${fmt(f(1, 1))}, a₁₂ = ${fmt(f(1, 2))}.`, `For each position, replace i and j with the row and column numbers. E.g. a₁₁ = ${fmt(f(1, 1))}, a₁₂ = ${fmt(f(1, 2))}.`, `Para cada posición, sustituye i y j por la fila y la columna. Ej.: a₁₁ = ${fmt(f(1, 1))}, a₁₂ = ${fmt(f(1, 2))}.`, `Pour chaque position, remplacez i et j par la ligne et la colonne. Ex. : a₁₁ = ${fmt(f(1, 1))}, a₁₂ = ${fmt(f(1, 2))}.`),
  };
};

const NAMES = {
  row: L('Matriz linha', 'Row matrix', 'Matriz fila', 'Matrice ligne'),
  col: L('Matriz coluna', 'Column matrix', 'Matriz columna', 'Matrice colonne'),
  sq: L('Matriz quadrada', 'Square matrix', 'Matriz cuadrada', 'Matrice carrée'),
  rect: L('Retangular (m ≠ n)', 'Rectangular (m ≠ n)', 'Rectangular (m ≠ n)', 'Rectangulaire (m ≠ n)'),
  nul: L('Matriz nula', 'Zero matrix', 'Matriz nula', 'Matrice nulle'),
  id: L('Matriz identidade', 'Identity matrix', 'Matriz identidad', 'Matrice identité'),
  diag: L('Matriz diagonal', 'Diagonal matrix', 'Matriz diagonal', 'Matrice diagonale'),
  up: L('Triangular superior', 'Upper triangular', 'Triangular superior', 'Triangulaire supérieure'),
  low: L('Triangular inferior', 'Lower triangular', 'Triangular inferior', 'Triangulaire inférieure'),
  none: L('Nenhuma dessas', 'None of these', 'Ninguna de estas', 'Aucune de celles-ci'),
};
const nz = (rng, lo = 1, hi = 9) => { let v = 0; while (v === 0) v = rng.int(lo, hi) * (rng.chance(0.25) ? -1 : 1); return v; };

X.matrixType = (rng, lvl = 2) => {
  const kinds = lvl >= 2 ? ['row', 'col', 'sq', 'rect', 'nul'] : ['row', 'col', 'sq', 'rect'];
  const kind = rng.pick(kinds);
  let A;
  if (kind === 'row') A = mat(rng, 1, rng.int(2, 4), 1, 9);
  else if (kind === 'col') A = mat(rng, rng.int(2, 4), 1, 1, 9);
  else if (kind === 'sq') { const n = rng.int(2, 3); A = mat(rng, n, n, 1, 9); }
  else if (kind === 'rect') { const r = rng.int(2, 3); A = mat(rng, r, r === 2 ? 3 : 2, 1, 9); }
  else A = Array.from({ length: 2 }, () => Array.from({ length: rng.int(2, 3) }, () => 0));
  const [r, c] = [A.length, A[0].length];
  return {
    type: 'multiple_choice',
    question: L('Qual é o nome **mais específico** desta matriz?', 'What is the **most specific** name for this matrix?', '¿Cuál es el nombre **más específico** de esta matriz?', 'Quel est le nom **le plus précis** de cette matrice ?'),
    matrix: A,
    options: kinds.map((k) => NAMES[k]),
    correctAnswer: NAMES[kind],
    explanation: L(`Ordem ${orderStr(r, c)}. ${kind === 'row' ? 'Só 1 linha.' : kind === 'col' ? 'Só 1 coluna.' : kind === 'sq' ? 'Linhas = colunas.' : kind === 'rect' ? 'Linhas ≠ colunas.' : 'Todos os elementos são zero.'}`, `Order ${orderStr(r, c)}. ${kind === 'row' ? 'Just 1 row.' : kind === 'col' ? 'Just 1 column.' : kind === 'sq' ? 'Rows = columns.' : kind === 'rect' ? 'Rows ≠ columns.' : 'Every entry is zero.'}`, `Orden ${orderStr(r, c)}. ${kind === 'row' ? 'Solo 1 fila.' : kind === 'col' ? 'Solo 1 columna.' : kind === 'sq' ? 'Filas = columnas.' : kind === 'rect' ? 'Filas ≠ columnas.' : 'Todos los elementos son cero.'}`, `Ordre ${orderStr(r, c)}. ${kind === 'row' ? '1 seule ligne.' : kind === 'col' ? '1 seule colonne.' : kind === 'sq' ? 'Lignes = colonnes.' : kind === 'rect' ? 'Lignes ≠ colonnes.' : 'Tous les éléments sont nuls.'}`),
  };
};

X.diagSum = (rng, lvl = 2) => {
  const n = lvl > 1 ? 3 : 2;
  const A = mat(rng, n, n, -3, 9);
  const main = rng.chance(0.5);
  const els = A.map((row, i) => row[main ? i : n - 1 - i]);
  const sum = els.reduce((s, v) => s + v, 0);
  return {
    type: 'numeric_input',
    question: main
      ? L('Some os elementos da **diagonal principal** (i = j).', 'Add the elements of the **main diagonal** (i = j).', 'Suma los elementos de la **diagonal principal** (i = j).', 'Additionnez les éléments de la **diagonale principale** (i = j).')
      : L('Some os elementos da **diagonal secundária** (i + j = n + 1).', 'Add the elements of the **secondary diagonal** (i + j = n + 1).', 'Suma los elementos de la **diagonal secundaria** (i + j = n + 1).', 'Additionnez les éléments de la **diagonale secondaire** (i + j = n + 1).'),
    matrix: A,
    answer: sum,
    explanation: L(`${els.map(fmt).join(' + ')} = ${fmt(sum)}.`, `${els.map(fmt).join(' + ')} = ${fmt(sum)}.`, `${els.map(fmt).join(' + ')} = ${fmt(sum)}.`, `${els.map(fmt).join(' + ')} = ${fmt(sum)}.`),
  };
};

X.specialKind = (rng, lvl = 2) => {
  const n = lvl > 1 ? 3 : 2;
  const kinds = lvl > 1 ? ['id', 'diag', 'up', 'low', 'nul', 'none'] : lvl === 0 ? ['id', 'diag'] : ['id', 'diag', 'up', 'low'];
  const kind = rng.pick(kinds);
  const A = Array.from({ length: n }, () => Array(n).fill(0));
  if (kind === 'id') for (let i = 0; i < n; i++) A[i][i] = 1;
  if (kind === 'diag') { for (let i = 0; i < n; i++) A[i][i] = nz(rng, 1, 7); if (A.every((_, i) => A[i][i] === 1)) A[0][0] = 3; }
  if (kind === 'up' || kind === 'low' || kind === 'none') {
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      const up = j > i, lo = j < i;
      if (i === j) A[i][j] = rng.int(0, 6);
      else if (kind === 'up' && up) A[i][j] = rng.int(1, 7);
      else if (kind === 'low' && lo) A[i][j] = rng.int(1, 7);
      else if (kind === 'none') A[i][j] = rng.int(1, 7);
    }
  }
  return {
    type: 'multiple_choice',
    question: L('Qual é o tipo **mais específico** desta matriz quadrada?', 'What is the **most specific** type of this square matrix?', '¿Cuál es el tipo **más específico** de esta matriz cuadrada?', 'Quel est le type **le plus précis** de cette matrice carrée ?'),
    matrix: A,
    options: kinds.map((k) => NAMES[k]),
    correctAnswer: NAMES[kind],
    explanation: {
      id: L('Diagonal de 1 e o resto 0: identidade (I).', 'Ones on the diagonal, zeros elsewhere: identity (I).', 'Unos en la diagonal y ceros fuera: identidad (I).', 'Des 1 sur la diagonale, 0 ailleurs : identité (I).'),
      diag: L('Só a diagonal principal tem valores; fora dela, zeros.', 'Only the main diagonal has values; zeros elsewhere.', 'Solo la diagonal principal tiene valores; el resto ceros.', 'Seule la diagonale principale a des valeurs ; ailleurs, des zéros.'),
      up: L('Zeros abaixo da diagonal principal: triangular superior.', 'Zeros below the main diagonal: upper triangular.', 'Ceros bajo la diagonal principal: triangular superior.', 'Des zéros sous la diagonale principale : triangulaire supérieure.'),
      low: L('Zeros acima da diagonal principal: triangular inferior.', 'Zeros above the main diagonal: lower triangular.', 'Ceros sobre la diagonal principal: triangular inferior.', 'Des zéros au-dessus de la diagonale principale : triangulaire inférieure.'),
      nul: L('Todos os elementos são 0: matriz nula.', 'Every entry is 0: zero matrix.', 'Todos los elementos son 0: matriz nula.', 'Tous les éléments valent 0 : matrice nulle.'),
      none: L('Há números não nulos acima e abaixo da diagonal: nenhuma dessas.', 'There are nonzero numbers above and below the diagonal: none of these.', 'Hay números no nulos sobre y bajo la diagonal: ninguna.', 'Il y a des non-nuls au-dessus et en dessous : aucune.'),
    }[kind],
  };
};

X.equalUnknown = (rng, lvl = 2) => {
  const A = mat(rng, 2, 2, 1, 9);
  const B = A.map((r) => [...r]);
  const i = rng.int(0, 1), j = rng.int(0, 1);
  const [pi, pj] = [1 - i, 1 - j];
  let ans, label;
  if (lvl >= 3) {
    const k = rng.int(1, 4);
    B[i][j] = `x + ${k}`;
    ans = A[i][j] - k;
    label = `x + ${k} = ${A[i][j]}`;
  } else {
    B[i][j] = 'x';
    ans = A[i][j];
    label = `x = ${A[i][j]}`;
  }
  if (lvl >= 2) B[pi][pj] = 'y';
  const askY = lvl >= 2 && rng.chance(0.4);
  const target = askY ? A[pi][pj] : ans;
  return {
    type: 'numeric_input',
    question: askY
      ? L('Duas matrizes são **iguais** quando cada elemento coincide. Se A = B, quanto vale **y**?', 'Two matrices are **equal** when every entry matches. If A = B, what is **y**?', 'Dos matrices son **iguales** cuando cada elemento coincide. Si A = B, ¿cuánto vale **y**?', 'Deux matrices sont **égales** quand chaque élément coïncide. Si A = B, combien vaut **y** ?')
      : L('Duas matrizes são **iguais** quando cada elemento coincide. Se A = B, quanto vale **x**?', 'Two matrices are **equal** when every entry matches. If A = B, what is **x**?', 'Dos matrices son **iguales** cuando cada elemento coincide. Si A = B, ¿cuánto vale **x**?', 'Deux matrices sont **égales** quand chaque élément coïncide. Si A = B, combien vaut **x** ?'),
    display: [M(A, 'A'), OP('='), M(B, 'B')],
    answer: target,
    explanation: askY
      ? L(`Elementos de mesma posição são iguais: y = ${A[pi][pj]}.`, `Entries in the same position are equal: y = ${A[pi][pj]}.`, `Los elementos de la misma posición son iguales: y = ${A[pi][pj]}.`, `Les éléments de même position sont égaux : y = ${A[pi][pj]}.`)
      : L(`Elementos de mesma posição são iguais: ${label}.`, `Entries in the same position are equal: ${label}.`, `Los elementos de la misma posición son iguales: ${label}.`, `Les éléments de même position sont égaux : ${label}.`),
  };
};

/* ───────────── Alquimia aditiva (Missão 2) ───────────── */
X.sumOrder = (rng) => {
  const r1 = rng.int(1, 3), c1 = rng.int(1, 3);
  const same = rng.chance(0.6);
  const [r2, c2] = same ? [r1, c1] : [rng.int(1, 3), rng.int(1, 3)];
  const ok = r1 === r2 && c1 === c2;
  const pool = [...new Set([orderStr(r1, c1), orderStr(c1, r1), orderStr(r1 + 1, c1), orderStr(r1, c1 + 1)])].slice(0, 3);
  if (!pool.includes(orderStr(r1, c1))) pool[0] = orderStr(r1, c1);
  const options = rng.shuffle([...new Set([...pool, IMPOSSIBLE.pt])]).map((o) => (o === IMPOSSIBLE.pt ? IMPOSSIBLE : o));
  return {
    type: 'multiple_choice',
    question: L(`A é ${orderStr(r1, c1)} e B é ${orderStr(r2, c2)}. Qual é a ordem de A + B?`, `A is ${orderStr(r1, c1)} and B is ${orderStr(r2, c2)}. What is the order of A + B?`, `A es ${orderStr(r1, c1)} y B es ${orderStr(r2, c2)}. ¿Cuál es el orden de A + B?`, `A est ${orderStr(r1, c1)} et B est ${orderStr(r2, c2)}. Quel est l’ordre de A + B ?`),
    options,
    correctAnswer: ok ? orderStr(r1, c1) : IMPOSSIBLE,
    explanation: ok
      ? L('Mesma ordem: a soma existe e mantém a ordem.', 'Same order: the sum exists and keeps that order.', 'Mismo orden: la suma existe y conserva el orden.', 'Même ordre : la somme existe et garde cet ordre.')
      : L('Ordens diferentes: a soma não existe.', 'Different orders: the sum does not exist.', 'Órdenes distintos: la suma no existe.', 'Ordres différents : la somme n’existe pas.'),
  };
};

X.oppositeMatrix = (rng, lvl = 2) => {
  const A = mat(rng, 2, rng.int(2, 3), lvl > 1 ? -5 : 1, 9);
  return {
    type: 'matrix_fill',
    question: L('A **oposta** de A é −A: troque o sinal de cada elemento. Calcule −A.', 'The **opposite** of A is −A: flip the sign of every entry. Compute −A.', 'La **opuesta** de A es −A: cambia el signo de cada elemento. Calcula −A.', 'L’**opposée** de A est −A : changez le signe de chaque élément. Calculez −A.'),
    display: [TXT('−'), M(A, 'A'), OP('=')],
    rows: 2, cols: A[0].length, answerMatrix: A.map((r) => r.map((v) => (v === 0 ? 0 : -v))),
    explanation: L('Cada aᵢⱼ vira −aᵢⱼ. O zero continua zero.', 'Each aᵢⱼ becomes −aᵢⱼ. Zero stays zero.', 'Cada aᵢⱼ pasa a −aᵢⱼ. El cero sigue siendo cero.', 'Chaque aᵢⱼ devient −aᵢⱼ. Le zéro reste zéro.'),
  };
};

const pickBy = (list, lvl, easy) => (lvl <= 1 ? easy.map((i) => list[i]) : list);
X.addProp = (rng, lvl = 2) => statement(rng, pickBy([
  [true, 'A + B = B + A (a soma de matrizes é comutativa).', 'A + B = B + A (matrix addition is commutative).', 'A + B = B + A (la suma de matrices es conmutativa).', 'A + B = B + A (l’addition de matrices est commutative).', 'Somamos elemento a elemento; a ordem dos números não importa.', 'We add entry by entry; the order of the numbers does not matter.', 'Sumamos elemento a elemento; el orden no importa.', 'On additionne terme à terme ; l’ordre ne compte pas.'],
  [true, '(A + B) + C = A + (B + C) (associativa).', '(A + B) + C = A + (B + C) (associative).', '(A + B) + C = A + (B + C) (asociativa).', '(A + B) + C = A + (B + C) (associative).', 'Podemos agrupar as somas como quisermos.', 'We may group the sums however we like.', 'Podemos agrupar las sumas como queramos.', 'On peut regrouper les sommes comme on veut.'],
  [true, 'A + O = A, em que O é a matriz nula da mesma ordem.', 'A + O = A, where O is the zero matrix of the same order.', 'A + O = A, donde O es la matriz nula del mismo orden.', 'A + O = A, où O est la matrice nulle de même ordre.', 'A nula é o elemento neutro da soma.', 'The zero matrix is the additive identity.', 'La nula es el elemento neutro de la suma.', 'La nulle est l’élément neutre de l’addition.'],
  [true, 'A + (−A) = O.', 'A + (−A) = O.', 'A + (−A) = O.', 'A + (−A) = O.', 'Cada elemento cancela com seu oposto.', 'Each entry cancels with its opposite.', 'Cada elemento se cancela con su opuesto.', 'Chaque élément s’annule avec son opposé.'],
  [false, 'A − B = B − A.', 'A − B = B − A.', 'A − B = B − A.', 'A − B = B − A.', 'Falso: a subtração NÃO é comutativa (troca o sinal do resultado).', 'False: subtraction is NOT commutative (it flips the sign).', 'Falso: la resta NO es conmutativa (cambia el signo).', 'Faux : la soustraction n’est PAS commutative (le signe change).'],
  [false, 'A + B só existe quando A e B são quadradas.', 'A + B only exists when A and B are square.', 'A + B solo existe cuando A y B son cuadradas.', 'A + B n’existe que si A et B sont carrées.', 'Falso: basta terem a MESMA ordem.', 'False: they only need the SAME order.', 'Falso: basta con tener el MISMO orden.', 'Faux : il suffit d’avoir le MÊME ordre.'],
  [false, 'A + O = O.', 'A + O = O.', 'A + O = O.', 'A + O = O.', 'Falso: somar a nula não muda A.', 'False: adding the zero matrix does not change A.', 'Falso: sumar la nula no cambia A.', 'Faux : ajouter la nulle ne change pas A.'],
], lvl, [0, 1, 4, 5]));

X.matrixEq = (rng, lvl = 2) => {
  const A = mat(rng, 2, 2, -3, 6), B = mat(rng, 2, 2, -3, 8);
  let display, ans, hint;
  if (lvl <= 1) { display = [TXT('X +'), M(A, 'A'), OP('='), M(B, 'B')]; ans = sub(B, A); hint = L('X = B − A', 'X = B − A', 'X = B − A', 'X = B − A'); }
  else if (lvl === 2) { display = [TXT('X −'), M(A, 'A'), OP('='), M(B, 'B')]; ans = add(B, A); hint = L('X = B + A', 'X = B + A', 'X = B + A', 'X = B + A'); }
  else { display = [M(A, 'A'), TXT('− X ='), M(B, 'B')]; ans = sub(A, B); hint = L('X = A − B', 'X = A − B', 'X = A − B', 'X = A − B'); }
  return {
    type: 'matrix_fill',
    question: L('Encontre a matriz X.', 'Find the matrix X.', 'Encuentra la matriz X.', 'Trouvez la matrice X.'),
    display, rows: 2, cols: 2, answerMatrix: ans, hint,
    explanation: L('Isole X como numa equação comum, operando elemento a elemento.', 'Isolate X like in an ordinary equation, working entry by entry.', 'Aísla X como en una ecuación común, elemento a elemento.', 'Isolez X comme dans une équation ordinaire, terme à terme.'),
  };
};

/* ───────────── Escalares (Missão 3) ───────────── */
X.scalarSpecial = (rng) => {
  const k = rng.pick([0, 1, -1]);
  const o = { A: L('A', 'A', 'A', 'A'), mA: L('−A', '−A', '−A', '−A'), O: L('A matriz nula O', 'The zero matrix O', 'La matriz nula O', 'La matrice nulle O'), tA: L('2A', '2A', '2A', '2A') };
  return {
    type: 'multiple_choice',
    question: L(`Quanto é **${fmt(k)}·A**?`, `What is **${fmt(k)}·A**?`, `¿Cuánto es **${fmt(k)}·A**?`, `Que vaut **${fmt(k)}·A** ?`),
    options: [o.A, o.mA, o.O, o.tA],
    correctAnswer: k === 0 ? o.O : k === 1 ? o.A : o.mA,
    explanation: k === 0 ? L('Zero vezes tudo é zero: sobra a matriz nula.', 'Zero times everything is zero: the zero matrix remains.', 'Cero por todo es cero: queda la matriz nula.', 'Zéro fois tout, c’est zéro : reste la matrice nulle.')
      : k === 1 ? L('Multiplicar por 1 não muda nada.', 'Multiplying by 1 changes nothing.', 'Multiplicar por 1 no cambia nada.', 'Multiplier par 1 ne change rien.')
        : L('Multiplicar por −1 troca o sinal de cada elemento.', 'Multiplying by −1 flips the sign of every entry.', 'Multiplicar por −1 cambia el signo de cada elemento.', 'Multiplier par −1 change le signe de chaque élément.'),
  };
};

X.scalarProp = (rng) => statement(rng, [
  [true, 'k·(A + B) = k·A + k·B.', 'k·(A + B) = k·A + k·B.', 'k·(A + B) = k·A + k·B.', 'k·(A + B) = k·A + k·B.', 'O escalar se distribui sobre a soma.', 'The scalar distributes over the sum.', 'El escalar se distribuye sobre la suma.', 'Le scalaire se distribue sur la somme.'],
  [true, '(k + m)·A = k·A + m·A.', '(k + m)·A = k·A + m·A.', '(k + m)·A = k·A + m·A.', '(k + m)·A = k·A + m·A.', 'A distributiva também vale sobre a soma dos escalares.', 'Distribution also works over a sum of scalars.', 'La distributiva también vale sobre la suma de escalares.', 'La distributivité vaut aussi sur la somme de scalaires.'],
  [true, '(k·m)·A = k·(m·A).', '(k·m)·A = k·(m·A).', '(k·m)·A = k·(m·A).', '(k·m)·A = k·(m·A).', 'Podemos multiplicar os escalares antes.', 'We may multiply the scalars first.', 'Podemos multiplicar los escalares antes.', 'On peut multiplier les scalaires d’abord.'],
  [true, 'Se k = 0, então k·A é a matriz nula.', 'If k = 0, then k·A is the zero matrix.', 'Si k = 0, entonces k·A es la matriz nula.', 'Si k = 0, alors k·A est la matrice nulle.', 'Todo elemento vira 0.', 'Every entry becomes 0.', 'Todo elemento pasa a 0.', 'Chaque élément devient 0.'],
  [false, 'k·A muda a ordem da matriz A.', 'k·A changes the order of A.', 'k·A cambia el orden de A.', 'k·A change l’ordre de A.', 'Falso: só os valores mudam; a ordem continua a mesma.', 'False: only the values change; the order stays the same.', 'Falso: solo cambian los valores; el orden sigue igual.', 'Faux : seules les valeurs changent ; l’ordre reste.'],
  [false, 'k·A soma k a cada elemento de A.', 'k·A adds k to every entry of A.', 'k·A suma k a cada elemento de A.', 'k·A ajoute k à chaque élément de A.', 'Falso: k MULTIPLICA cada elemento, não soma.', 'False: k MULTIPLIES every entry; it does not add.', 'Falso: k MULTIPLICA cada elemento, no suma.', 'Faux : k MULTIPLIE chaque élément, il n’additionne pas.'],
  [false, '(−1)·A = A.', '(−1)·A = A.', '(−1)·A = A.', '(−1)·A = A.', 'Falso: (−1)·A = −A, a oposta.', 'False: (−1)·A = −A, the opposite.', 'Falso: (−1)·A = −A, la opuesta.', 'Faux : (−1)·A = −A, l’opposée.'],
]);

X.scalarEq = (rng, lvl = 2) => {
  const k = rng.pick([2, 3]);
  const Xm = mat(rng, 2, 2, -3, 5), B = mat(rng, 2, 2, -3, 6);
  const kX = Xm.map((r) => r.map((v) => k * v));
  const A = lvl <= 1 ? kX : add(kX, B);
  return {
    type: 'matrix_fill',
    question: L('Encontre a matriz X.', 'Find the matrix X.', 'Encuentra la matriz X.', 'Trouvez la matrice X.'),
    display: lvl <= 1 ? [TXT(`${k}X =`), M(A, 'A')] : [TXT(`${k}X +`), M(B, 'B'), OP('='), M(A, 'A')],
    rows: 2, cols: 2, answerMatrix: Xm,
    hint: lvl <= 1 ? L(`X = A ÷ ${k}`, `X = A ÷ ${k}`, `X = A ÷ ${k}`, `X = A ÷ ${k}`) : L(`Passe B para o outro lado e divida por ${k}.`, `Move B across and divide by ${k}.`, `Pasa B al otro lado y divide por ${k}.`, `Passez B de l’autre côté et divisez par ${k}.`),
    explanation: lvl <= 1 ? L(`Divida cada elemento de A por ${k}.`, `Divide every entry of A by ${k}.`, `Divide cada elemento de A por ${k}.`, `Divisez chaque élément de A par ${k}.`) : L(`${k}X = A − B; depois divida tudo por ${k}.`, `${k}X = A − B; then divide everything by ${k}.`, `${k}X = A − B; luego divide todo por ${k}.`, `${k}X = A − B ; puis divisez tout par ${k}.`),
  };
};

/* ───────────── Espelhos (Missão 4) ───────────── */
X.transProp = (rng) => statement(rng, [
  [true, '(Aᵀ)ᵀ = A.', '(Aᵀ)ᵀ = A.', '(Aᵀ)ᵀ = A.', '(Aᵀ)ᵀ = A.', 'Refletir duas vezes devolve a original.', 'Reflecting twice returns the original.', 'Reflejar dos veces devuelve la original.', 'Réfléchir deux fois redonne l’originale.'],
  [true, '(A + B)ᵀ = Aᵀ + Bᵀ.', '(A + B)ᵀ = Aᵀ + Bᵀ.', '(A + B)ᵀ = Aᵀ + Bᵀ.', '(A + B)ᵀ = Aᵀ + Bᵀ.', 'Transpor e somar podem ser feitos em qualquer ordem.', 'Transposing and adding can be done in either order.', 'Transponer y sumar se pueden hacer en cualquier orden.', 'Transposer et additionner se font dans n’importe quel ordre.'],
  [true, '(k·A)ᵀ = k·Aᵀ.', '(k·A)ᵀ = k·Aᵀ.', '(k·A)ᵀ = k·Aᵀ.', '(k·A)ᵀ = k·Aᵀ.', 'O escalar sai da transposição sem problemas.', 'The scalar passes through the transpose freely.', 'El escalar sale de la transposición sin problema.', 'Le scalaire sort de la transposition sans problème.'],
  [true, 'Se A é quadrada, Aᵀ tem a mesma ordem de A.', 'If A is square, Aᵀ has the same order as A.', 'Si A es cuadrada, Aᵀ tiene el mismo orden que A.', 'Si A est carrée, Aᵀ a le même ordre que A.', 'n × n continua n × n.', 'n × n stays n × n.', 'n × n sigue siendo n × n.', 'n × n reste n × n.'],
  [true, 'A diagonal principal de A e a de Aᵀ têm os mesmos elementos.', 'A and Aᵀ share the same main diagonal.', 'A y Aᵀ comparten la misma diagonal principal.', 'A et Aᵀ ont la même diagonale principale.', 'Quando i = j, aᵢⱼ = aⱼᵢ: nada se move.', 'When i = j, aᵢⱼ = aⱼᵢ: nothing moves.', 'Cuando i = j, aᵢⱼ = aⱼᵢ: nada se mueve.', 'Quand i = j, aᵢⱼ = aⱼᵢ : rien ne bouge.'],
  [false, 'A e Aᵀ sempre têm a mesma ordem.', 'A and Aᵀ always have the same order.', 'A y Aᵀ siempre tienen el mismo orden.', 'A et Aᵀ ont toujours le même ordre.', 'Falso: se A é 2 × 3, Aᵀ é 3 × 2.', 'False: if A is 2 × 3, Aᵀ is 3 × 2.', 'Falso: si A es 2 × 3, Aᵀ es 3 × 2.', 'Faux : si A est 2 × 3, Aᵀ est 3 × 2.'],
  [false, 'Transpor uma matriz troca o sinal de todos os elementos.', 'Transposing a matrix flips the sign of every entry.', 'Transponer una matriz cambia el signo de todos los elementos.', 'Transposer une matrice change le signe de tous les éléments.', 'Falso: transpor apenas troca linhas por colunas.', 'False: transposing only swaps rows and columns.', 'Falso: transponer solo intercambia filas y columnas.', 'Faux : transposer échange seulement lignes et colonnes.'],
]);

X.symUnknown = (rng, lvl = 2) => {
  const n = lvl > 1 ? 3 : 2;
  const A = mat(rng, n, n, 1, 9);
  for (let i = 0; i < n; i++) for (let j = 0; j < i; j++) A[i][j] = A[j][i];
  const S = A.map((r) => [...r]);
  const i = 0, j = n - 1;
  S[i][j] = 'x';
  return {
    type: 'numeric_input',
    question: L('Esta matriz é **simétrica** (Aᵀ = A). Quanto vale **x**?', 'This matrix is **symmetric** (Aᵀ = A). What is **x**?', 'Esta matriz es **simétrica** (Aᵀ = A). ¿Cuánto vale **x**?', 'Cette matrice est **symétrique** (Aᵀ = A). Combien vaut **x** ?'),
    matrix: S, answer: A[j][i],
    explanation: L(`x fica em a${idx(i + 1, j + 1)}; o espelho é a${idx(j + 1, i + 1)} = ${A[j][i]}. Então x = ${A[j][i]}.`, `x sits at a${idx(i + 1, j + 1)}; its mirror is a${idx(j + 1, i + 1)} = ${A[j][i]}. So x = ${A[j][i]}.`, `x está en a${idx(i + 1, j + 1)}; su espejo es a${idx(j + 1, i + 1)} = ${A[j][i]}. Entonces x = ${A[j][i]}.`, `x est en a${idx(i + 1, j + 1)} ; son miroir est a${idx(j + 1, i + 1)} = ${A[j][i]}. Donc x = ${A[j][i]}.`),
  };
};

/* ───────────── Forja (Missão 5) ───────────── */
X.mulCellBA = (rng, lvl = 2) => {
  const A = mat(rng, 2, lvl > 1 ? 3 : 2, -2, 4), B = mat(rng, lvl > 1 ? 3 : 2, 2, -2, 4);
  const i = rng.int(1, 2), j = rng.int(1, 2);
  const P = mul(A, B), inner = A[0].length;
  const terms = Array.from({ length: inner }, (_, k) => `${fmt(A[i - 1][k])}·${fmt(B[k][j - 1])}`).join(' + ');
  return {
    type: 'numeric_input',
    question: L(`Qual é o elemento (A·B)${idx(i, j)}?`, `What is the entry (A·B)${idx(i, j)}?`, `¿Cuál es el elemento (A·B)${idx(i, j)}?`, `Quel est l’élément (A·B)${idx(i, j)} ?`),
    display: [M(A, 'A', [i - 1, 0]), OP('·'), M(B, 'B', [0, j - 1])],
    answer: P[i - 1][j - 1],
    explanation: L(`Linha ${i} de A com coluna ${j} de B: ${terms} = ${fmt(P[i - 1][j - 1])}.`, `Row ${i} of A with column ${j} of B: ${terms} = ${fmt(P[i - 1][j - 1])}.`, `Fila ${i} de A con columna ${j} de B: ${terms} = ${fmt(P[i - 1][j - 1])}.`, `Ligne ${i} de A avec colonne ${j} de B : ${terms} = ${fmt(P[i - 1][j - 1])}.`),
  };
};

X.mulIdentity = (rng, lvl = 2) => {
  const c = lvl >= 3 ? 3 : 2;
  const A = mat(rng, 2, c, -3, 8);
  const left = rng.chance(0.5);
  const I = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
  const display = left ? [M(I(2), 'I'), OP('·'), M(A, 'A'), OP('=')] : [M(A, 'A'), OP('·'), M(I(c), 'I'), OP('=')];
  return {
    type: 'matrix_fill',
    question: L('Calcule o produto. (Dica: I é a identidade.)', 'Compute the product. (Hint: I is the identity.)', 'Calcula el producto. (Pista: I es la identidad.)', 'Calculez le produit. (Indice : I est l’identité.)'),
    display, rows: 2, cols: c, answerMatrix: A,
    explanation: L('A identidade é o “1” das matrizes: I·A = A·I = A.', 'The identity is the “1” of matrices: I·A = A·I = A.', 'La identidad es el “1” de las matrices: I·A = A·I = A.', 'L’identité est le « 1 » des matrices : I·A = A·I = A.'),
  };
};

X.mulProp = (rng, lvl = 2) => statement(rng, pickBy([
  [false, 'A·B = B·A para quaisquer matrizes A e B.', 'A·B = B·A for any matrices A and B.', 'A·B = B·A para cualesquiera matrices A y B.', 'A·B = B·A pour toutes matrices A et B.', 'Falso: o produto de matrizes NÃO é comutativo em geral.', 'False: matrix multiplication is NOT commutative in general.', 'Falso: el producto de matrices NO es conmutativo en general.', 'Faux : le produit de matrices n’est PAS commutatif en général.'],
  [true, 'A·I = I·A = A (I é a identidade).', 'A·I = I·A = A (I is the identity).', 'A·I = I·A = A (I es la identidad).', 'A·I = I·A = A (I est l’identité).', 'A identidade é o elemento neutro do produto.', 'The identity is the multiplicative neutral element.', 'La identidad es el elemento neutro del producto.', 'L’identité est l’élément neutre du produit.'],
  [true, '(A + B)·C = A·C + B·C.', '(A + B)·C = A·C + B·C.', '(A + B)·C = A·C + B·C.', '(A + B)·C = A·C + B·C.', 'A distributiva vale para o produto.', 'The distributive law holds for the product.', 'La distributiva vale para el producto.', 'La distributivité vaut pour le produit.'],
  [true, '(A·B)ᵀ = Bᵀ·Aᵀ.', '(A·B)ᵀ = Bᵀ·Aᵀ.', '(A·B)ᵀ = Bᵀ·Aᵀ.', '(A·B)ᵀ = Bᵀ·Aᵀ.', 'Ao transpor um produto, a ordem se inverte.', 'Transposing a product reverses the order.', 'Al transponer un producto, el orden se invierte.', 'Transposer un produit inverse l’ordre.'],
  [false, '(A·B)ᵀ = Aᵀ·Bᵀ.', '(A·B)ᵀ = Aᵀ·Bᵀ.', '(A·B)ᵀ = Aᵀ·Bᵀ.', '(A·B)ᵀ = Aᵀ·Bᵀ.', 'Falso: o correto é Bᵀ·Aᵀ.', 'False: the correct rule is Bᵀ·Aᵀ.', 'Falso: lo correcto es Bᵀ·Aᵀ.', 'Faux : la bonne règle est Bᵀ·Aᵀ.'],
  [false, 'Se A·B = O, então A = O ou B = O.', 'If A·B = O, then A = O or B = O.', 'Si A·B = O, entonces A = O o B = O.', 'Si A·B = O, alors A = O ou B = O.', 'Falso: duas matrizes não nulas podem ter produto nulo.', 'False: two nonzero matrices can have a zero product.', 'Falso: dos matrices no nulas pueden tener producto nulo.', 'Faux : deux matrices non nulles peuvent avoir un produit nul.'],
  [true, 'A·O = O.', 'A·O = O.', 'A·O = O.', 'A·O = O.', 'Tudo vezes zero é zero.', 'Anything times zero is zero.', 'Todo por cero es cero.', 'Tout fois zéro, c’est zéro.'],
], lvl, [0, 3, 4, 6]));

/* ───────────── Labirinto (Missão 6) ───────────── */
X.detProp = (rng) => statement(rng, [
  [true, 'Se uma linha é toda de zeros, o determinante é 0.', 'If a row is all zeros, the determinant is 0.', 'Si una fila es toda de ceros, el determinante es 0.', 'Si une ligne est nulle, le déterminant vaut 0.', 'Uma linha nula “apaga” o determinante.', 'A zero row “erases” the determinant.', 'Una fila nula “borra” el determinante.', 'Une ligne nulle « efface » le déterminant.'],
  [true, 'Trocar duas linhas de lugar troca o sinal do determinante.', 'Swapping two rows flips the sign of the determinant.', 'Intercambiar dos filas cambia el signo del determinante.', 'Échanger deux lignes change le signe du déterminant.', 'det passa de d para −d.', 'det goes from d to −d.', 'det pasa de d a −d.', 'det passe de d à −d.'],
  [true, 'Se duas linhas são iguais, o determinante é 0.', 'If two rows are equal, the determinant is 0.', 'Si dos filas son iguales, el determinante es 0.', 'Si deux lignes sont égales, le déterminant vaut 0.', 'Trocá-las não muda a matriz, então d = −d, logo d = 0.', 'Swapping them changes nothing, so d = −d, hence d = 0.', 'Intercambiarlas no cambia nada, así d = −d, luego d = 0.', 'Les échanger ne change rien, donc d = −d, d’où d = 0.'],
  [true, 'det(Aᵀ) = det(A).', 'det(Aᵀ) = det(A).', 'det(Aᵀ) = det(A).', 'det(Aᵀ) = det(A).', 'Transpor não altera o determinante.', 'Transposing does not change the determinant.', 'Transponer no altera el determinante.', 'Transposer ne change pas le déterminant.'],
  [true, 'Multiplicar UMA linha por k multiplica o determinante por k.', 'Multiplying ONE row by k multiplies the determinant by k.', 'Multiplicar UNA fila por k multiplica el determinante por k.', 'Multiplier UNE ligne par k multiplie le déterminant par k.', 'Só essa linha cresce k vezes.', 'Only that row grows k times.', 'Solo esa fila crece k veces.', 'Seule cette ligne est multipliée par k.'],
  [false, 'det(A + B) = det(A) + det(B).', 'det(A + B) = det(A) + det(B).', 'det(A + B) = det(A) + det(B).', 'det(A + B) = det(A) + det(B).', 'Falso: o determinante não “distribui” sobre a soma.', 'False: the determinant does not “distribute” over addition.', 'Falso: el determinante no “distribuye” sobre la suma.', 'Faux : le déterminant ne « distribue » pas sur la somme.'],
  [false, 'Se A é 2 × 2, então det(3A) = 3·det(A).', 'If A is 2 × 2, then det(3A) = 3·det(A).', 'Si A es 2 × 2, entonces det(3A) = 3·det(A).', 'Si A est 2 × 2, alors det(3A) = 3·det(A).', 'Falso: multiplica as DUAS linhas, então det(3A) = 3²·det(A) = 9·det(A).', 'False: both rows get scaled, so det(3A) = 3²·det(A) = 9·det(A).', 'Falso: se escalan las DOS filas, así det(3A) = 3²·det(A) = 9·det(A).', 'Faux : les DEUX lignes sont multipliées, donc det(3A) = 3²·det(A) = 9·det(A).'],
]);

X.detUnknown = (rng) => {
  let a, b, c, x, guard = 0;
  do { a = rng.int(2, 6); b = rng.int(2, 5); c = rng.int(1, 3); x = (a * b) / c; guard++; } while ((!Number.isInteger(x) || x > 12) && guard < 60);
  if (!Number.isInteger(x)) { a = 4; b = 3; c = 2; x = 6; }
  return {
    type: 'numeric_input',
    question: L('Para que valor de **x** o determinante desta matriz é **zero**?', 'For what value of **x** is the determinant of this matrix **zero**?', '¿Para qué valor de **x** el determinante de esta matriz es **cero**?', 'Pour quelle valeur de **x** le déterminant de cette matrice est-il **nul** ?'),
    matrix: [['x', a], [b, c]],
    answer: x,
    explanation: L(`det = x·${c} − ${a}·${b} = 0 → ${c}x = ${a * b} → x = ${x}.`, `det = x·${c} − ${a}·${b} = 0 → ${c}x = ${a * b} → x = ${x}.`, `det = x·${c} − ${a}·${b} = 0 → ${c}x = ${a * b} → x = ${x}.`, `det = x·${c} − ${a}·${b} = 0 → ${c}x = ${a * b} → x = ${x}.`),
  };
};

/* ───────────── Trono (Missão 7) ───────────── */
X.invConcept = (rng) => statement(rng, [
  [true, 'Se det(A) ≠ 0, a matriz A tem inversa.', 'If det(A) ≠ 0, the matrix A has an inverse.', 'Si det(A) ≠ 0, la matriz A tiene inversa.', 'Si det(A) ≠ 0, la matrice A a une inverse.', 'det ≠ 0 é exatamente a condição.', 'det ≠ 0 is exactly the condition.', 'det ≠ 0 es exactamente la condición.', 'det ≠ 0 est exactement la condition.'],
  [true, 'A·A⁻¹ = A⁻¹·A = I.', 'A·A⁻¹ = A⁻¹·A = I.', 'A·A⁻¹ = A⁻¹·A = I.', 'A·A⁻¹ = A⁻¹·A = I.', 'A inversa “desfaz” A e dá a identidade.', 'The inverse “undoes” A and gives the identity.', 'La inversa “deshace” A y da la identidad.', 'L’inverse « défait » A et donne l’identité.'],
  [true, 'A inversa da matriz identidade é a própria identidade.', 'The inverse of the identity matrix is the identity itself.', 'La inversa de la matriz identidad es la propia identidad.', 'L’inverse de l’identité est l’identité elle-même.', 'I·I = I.', 'I·I = I.', 'I·I = I.', 'I·I = I.'],
  [true, '(A⁻¹)⁻¹ = A.', '(A⁻¹)⁻¹ = A.', '(A⁻¹)⁻¹ = A.', '(A⁻¹)⁻¹ = A.', 'Desfazer o desfazer devolve A.', 'Undoing the undo returns A.', 'Deshacer lo deshecho devuelve A.', 'Défaire le défaire redonne A.'],
  [true, 'Só matrizes quadradas podem ter inversa.', 'Only square matrices can have an inverse.', 'Solo las matrices cuadradas pueden tener inversa.', 'Seules les matrices carrées peuvent avoir une inverse.', 'A inversa exige A·A⁻¹ = A⁻¹·A = I.', 'The inverse needs A·A⁻¹ = A⁻¹·A = I.', 'La inversa exige A·A⁻¹ = A⁻¹·A = I.', 'L’inverse exige A·A⁻¹ = A⁻¹·A = I.'],
  [false, 'Toda matriz quadrada tem inversa.', 'Every square matrix has an inverse.', 'Toda matriz cuadrada tiene inversa.', 'Toute matrice carrée a une inverse.', 'Falso: se det = 0, não há inversa.', 'False: if det = 0 there is no inverse.', 'Falso: si det = 0, no hay inversa.', 'Faux : si det = 0, il n’y a pas d’inverse.'],
  [false, 'A matriz nula possui inversa.', 'The zero matrix has an inverse.', 'La matriz nula tiene inversa.', 'La matrice nulle a une inverse.', 'Falso: seu determinante é 0.', 'False: its determinant is 0.', 'Falso: su determinante es 0.', 'Faux : son déterminant vaut 0.'],
  [false, 'A⁻¹ é a matriz em que cada elemento é 1/aᵢⱼ.', 'A⁻¹ is the matrix whose entries are 1/aᵢⱼ.', 'A⁻¹ es la matriz cuyos elementos son 1/aᵢⱼ.', 'A⁻¹ est la matrice dont les éléments sont 1/aᵢⱼ.', 'Falso: a inversa de matriz não é elemento a elemento.', 'False: the matrix inverse is not entry by entry.', 'Falso: la inversa de una matriz no es elemento a elemento.', 'Faux : l’inverse d’une matrice n’est pas terme à terme.'],
]);

X.invVerify = (rng) => {
  const b = rng.int(0, 3), c = rng.int(1, 3);
  const A = rng.chance(0.5) ? [[1, b], [c, 1 + b * c]] : [[1 + b * c, b], [c, 1]];
  const inv = inv2(A);
  const ok = rng.chance(0.5);
  const B = inv.map((r) => [...r]);
  if (!ok) B[rng.int(0, 1)][rng.int(0, 1)] += rng.pick([1, -1, 2]);
  const P = mul(A, B);
  return {
    type: 'true_false',
    question: L('B é a **inversa** de A? (Verifique se A·B = I.)', 'Is B the **inverse** of A? (Check whether A·B = I.)', '¿B es la **inversa** de A? (Comprueba si A·B = I.)', 'B est-elle l’**inverse** de A ? (Vérifiez si A·B = I.)'),
    display: [M(A, 'A'), TXT(','), M(B, 'B')],
    options: 'tf', correctBool: ok,
    explanation: L(`A·B = [[${P[0].map(fmt).join(', ')}], [${P[1].map(fmt).join(', ')}]] ${ok ? '= I: sim!' : '≠ I: não é.'}`, `A·B = [[${P[0].map(fmt).join(', ')}], [${P[1].map(fmt).join(', ')}]] ${ok ? '= I: yes!' : '≠ I: no.'}`, `A·B = [[${P[0].map(fmt).join(', ')}], [${P[1].map(fmt).join(', ')}]] ${ok ? '= I: ¡sí!' : '≠ I: no.'}`, `A·B = [[${P[0].map(fmt).join(', ')}], [${P[1].map(fmt).join(', ')}]] ${ok ? '= I : oui !' : '≠ I : non.'}`),
  };
};
