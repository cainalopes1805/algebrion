// Demonstrações animadas do Tomo: cada uma produz "quadros" ({ items, note }) que o Tomo toca passo a passo.
// Os textos de cada quadro nascem dos próprios números, então continuam corretos se a matriz mudar.
import { L } from '../i18n/core';
import { add, sub, scale, mul, transpose, det2, det3, inv2, fmt, idx } from './mathkit';

const T = (pt, en) => L(pt, en);
const M = (m, label, hl) => ({ m, label, hl });
const OP = (op) => ({ op });
const TX = (text) => ({ text });
const blank = (r, c) => Array.from({ length: r }, () => Array(c).fill(''));
// só as primeiras k células (em ordem de leitura) aparecem preenchidas
const partial = (R, k) => R.map((row, i) => row.map((v, j) => (i * row.length + j < k ? v : '')));
const rowCells = (i, c) => Array.from({ length: c }, (_, j) => [i, j]);
const colCells = (j, r) => Array.from({ length: r }, (_, i) => [i, j]);
const F = (items, pt, en) => ({ items, note: T(pt, en) });

export const D = {};

// contar linhas, colunas e a ordem
D.order = (A) => {
  const r = A.length, c = A[0].length;
  return [
    ...Array.from({ length: r }, (_, i) => F([M(A, 'A', rowCells(i, c))], `Linha ${i + 1}: uma fileira horizontal.`, `Row ${i + 1}: a horizontal line.`)),
    ...Array.from({ length: c }, (_, j) => F([M(A, 'A', colCells(j, r))], `Coluna ${j + 1}: uma fileira vertical.`, `Column ${j + 1}: a vertical line.`)),
    F([M(A, 'A')], `${r} linhas × ${c} colunas: a ordem é ${r} × ${c}, com ${r * c} elementos.`, `${r} rows × ${c} columns: the order is ${r} × ${c}, with ${r * c} entries.`),
  ];
};

// localizar aᵢⱼ
D.address = (A, i, j) => [
  F([M(A, 'A', rowCells(i - 1, A[0].length))], `Primeiro a linha: ${i}.`, `First the row: ${i}.`),
  F([M(A, 'A', [...rowCells(i - 1, A[0].length), ...colCells(j - 1, A.length)])], `Depois a coluna: ${j}.`, `Then the column: ${j}.`),
  F([M(A, 'A', [[i - 1, j - 1]])], `O encontro das duas é a${idx(i, j)} = ${fmt(A[i - 1][j - 1])}.`, `Where they meet is a${idx(i, j)} = ${fmt(A[i - 1][j - 1])}.`),
];

// lei de formação
D.formation = (s, f, r, c) => {
  const R = Array.from({ length: r }, (_, i) => Array.from({ length: c }, (_, j) => f(i + 1, j + 1)));
  const frames = [F([TX(`aᵢⱼ = ${s}`), M(blank(r, c), 'A')], `A receita: aᵢⱼ = ${s}. Vamos preencher casa por casa.`, `The recipe: aᵢⱼ = ${s}. Let us fill it cell by cell.`)];
  for (let k = 0; k < r * c; k++) {
    const i = Math.floor(k / c) + 1, j = (k % c) + 1;
    frames.push(F([TX(`aᵢⱼ = ${s}`), M(partial(R, k + 1), 'A', [[i - 1, j - 1]])], `a${idx(i, j)}: i = ${i}, j = ${j} → ${fmt(R[i - 1][j - 1])}.`, `a${idx(i, j)}: i = ${i}, j = ${j} → ${fmt(R[i - 1][j - 1])}.`));
  }
  return frames;
};

// galeria: várias matrizes, cada uma com sua legenda [{ m, label, pt, en }]
D.gallery = (list) => list.map((g) => F([M(g.m, g.label)], g.pt, g.en));

// diagonais
D.diagonal = (A, main = true) => {
  const n = A.length;
  const cells = Array.from({ length: n }, (_, i) => [i, main ? i : n - 1 - i]);
  let sum = 0;
  return [
    F([M(A, 'A')], main ? 'Ligue o canto superior esquerdo ao inferior direito.' : 'Ligue o canto superior direito ao inferior esquerdo.', main ? 'Link the top-left corner to the bottom-right one.' : 'Link the top-right corner to the bottom-left one.'),
    ...cells.map(([i, j], k) => { sum += A[i][j]; return F([M(A, 'A', cells.slice(0, k + 1))], `a${idx(i + 1, j + 1)} = ${fmt(A[i][j])} · soma parcial: ${fmt(sum)}.`, `a${idx(i + 1, j + 1)} = ${fmt(A[i][j])} · running sum: ${fmt(sum)}.`); }),
  ];
};

// igualdade de matrizes: A e B com incógnitas
D.equal = (A, B) => {
  const frames = [F([M(A, 'A'), OP('='), M(B, 'B')], 'A = B só se tiverem a mesma ordem e todos os elementos correspondentes forem iguais.', 'A = B only if they have the same order and every matching entry is equal.')];
  A.forEach((row, i) => row.forEach((v, j) => {
    const b = B[i][j];
    const unknown = typeof b === 'string';
    frames.push(F([M(A, 'A', [[i, j]]), OP('='), M(B, 'B', [[i, j]])], unknown ? `${b} = ${fmt(v)}: achamos a incógnita!` : `${fmt(v)} = ${fmt(b)} ✓`, unknown ? `${b} = ${fmt(v)}: found the unknown!` : `${fmt(v)} = ${fmt(b)} ✓`));
  }));
  return frames;
};

// soma / subtração / oposta / escalar, célula a célula
const perCell = (A, B, op, fn, ptOp, enOp) => {
  const r = A.length, c = A[0].length;
  const R = A.map((row, i) => row.map((v, j) => fn(v, B ? B[i][j] : 0)));
  const frames = [F(B ? [M(A, 'A'), OP(op), M(B, 'B'), OP('='), M(blank(r, c), '?')] : [M(A, 'A'), OP('→'), M(blank(r, c), '?')], `${ptOp} Vamos célula por célula.`, `${enOp} Let us go cell by cell.`)];
  for (let k = 0; k < r * c; k++) {
    const i = Math.floor(k / c), j = k % c;
    const hl = [[i, j]];
    frames.push(F(B ? [M(A, 'A', hl), OP(op), M(B, 'B', hl), OP('='), M(partial(R, k + 1), '', hl)] : [M(A, 'A', hl), OP('→'), M(partial(R, k + 1), '', hl)],
      B ? `${fmt(A[i][j])} ${op} ${fmt(B[i][j])} = ${fmt(R[i][j])}` : `${fmt(A[i][j])} → ${fmt(R[i][j])}`, B ? `${fmt(A[i][j])} ${op} ${fmt(B[i][j])} = ${fmt(R[i][j])}` : `${fmt(A[i][j])} → ${fmt(R[i][j])}`));
  }
  return frames;
};
D.sum = (A, B) => perCell(A, B, '+', (a, b) => a + b, 'Somamos as doses de mesma posição.', 'We add the doses in the same position.');
D.sub = (A, B) => perCell(A, B, '−', (a, b) => a - b, 'Subtraímos as doses de mesma posição.', 'We subtract the doses in the same position.');
D.opposite = (A) => perCell(A, null, '−', (a) => (a === 0 ? 0 : -a), 'A oposta troca o sinal de cada elemento.', 'The opposite flips the sign of every entry.');
D.scalar = (k, A) => {
  const r = A.length, c = A[0].length, R = scale(k, A);
  const frames = [F([TX(`${fmt(k)} ·`), M(A, 'A'), OP('='), M(blank(r, c), '?')], `O escalar ${fmt(k)} vai multiplicar TODOS os elementos.`, `The scalar ${fmt(k)} will multiply EVERY entry.`)];
  for (let n = 0; n < r * c; n++) {
    const i = Math.floor(n / c), j = n % c, hl = [[i, j]];
    frames.push(F([TX(`${fmt(k)} ·`), M(A, 'A', hl), OP('='), M(partial(R, n + 1), '', hl)], `${fmt(k)} · ${fmt(A[i][j])} = ${fmt(R[i][j])}`, `${fmt(k)} · ${fmt(A[i][j])} = ${fmt(R[i][j])}`));
  }
  return frames;
};

// combinação linear a·A + b·B
D.combo = (a, A, b, B) => {
  const aA = scale(a, A), bB = scale(b, B), R = add(aA, bB);
  return [
    F([TX(`${a}A + ${b < 0 ? `(${b})` : b}B`), M(A, 'A'), OP(','), M(B, 'B')], 'Uma combinação linear mistura escalares e somas.', 'A linear combination mixes scalars and sums.'),
    F([TX(`${a}A =`), M(aA, '')], `Primeiro ${a}A: multiplicamos A por ${a}.`, `First ${a}A: multiply A by ${a}.`),
    F([TX(`${b < 0 ? `(${b})` : b}B =`), M(bB, '')], `Depois ${b}B: multiplicamos B por ${b}.`, `Then ${b}B: multiply B by ${b}.`),
    F([M(aA, `${a}A`), OP('+'), M(bB, `${b}B`), OP('='), M(R, '')], 'Por fim, somamos célula a célula.', 'Finally we add cell by cell.'),
  ];
};

// equação X + A = B (e variações), mostrando o isolamento
D.equation = (kind, A, B) => {
  const X = kind === 'plus' ? sub(B, A) : kind === 'minus' ? add(B, A) : sub(A, B);
  const eq = kind === 'plus' ? 'X + A = B' : kind === 'minus' ? 'X − A = B' : 'A − X = B';
  const iso = kind === 'plus' ? 'X = B − A' : kind === 'minus' ? 'X = B + A' : 'X = A − B';
  return [
    F([TX(eq), M(A, 'A'), OP(','), M(B, 'B')], 'Uma matriz inteira é a incógnita. Isolamos X como numa equação comum.', 'A whole matrix is the unknown. We isolate X as in an ordinary equation.'),
    F([TX(iso)], `Passando os termos para o outro lado: ${iso}.`, `Moving terms across: ${iso}.`),
    F([TX(`${iso} =`), M(X, 'X')], 'Calculamos célula por célula.', 'We compute cell by cell.'),
  ];
};

// transposição
D.transpose = (A) => {
  const r = A.length, c = A[0].length, T2 = transpose(A);
  const frames = [F([M(A, 'A'), OP('→'), M(blank(c, r), 'Aᵀ')], 'A transposta é o reflexo num espelho diagonal.', 'The transpose is the reflection in a diagonal mirror.')];
  for (let i = 0; i < r; i++) {
    const filled = T2.map((row, a) => row.map((v, b) => (b <= i ? v : '')));
    frames.push(F([M(A, 'A', rowCells(i, c)), OP('→'), M(filled, 'Aᵀ', colCells(i, c))], `A linha ${i + 1} de A vira a coluna ${i + 1} de Aᵀ.`, `Row ${i + 1} of A becomes column ${i + 1} of Aᵀ.`));
  }
  frames.push(F([M(A, `A · ${r}×${c}`), OP('→'), M(T2, `Aᵀ · ${c}×${r}`)], `A ordem também se inverte: ${r} × ${c} vira ${c} × ${r}.`, `The order flips too: ${r} × ${c} becomes ${c} × ${r}.`));
  return frames;
};

// simetria: pares espelhados
D.symmetric = (A) => {
  const n = A.length, frames = [F([M(A, 'A')], 'Numa matriz simétrica, aᵢⱼ = aⱼᵢ.', 'In a symmetric matrix, aᵢⱼ = aⱼᵢ.')];
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) frames.push(F([M(A, 'A', [[i, j], [j, i]])], `a${idx(i + 1, j + 1)} = a${idx(j + 1, i + 1)} = ${fmt(A[i][j])}`, `a${idx(i + 1, j + 1)} = a${idx(j + 1, i + 1)} = ${fmt(A[i][j])}`));
  frames.push(F([M(A, 'A'), OP('='), M(transpose(A), 'Aᵀ')], 'O reflexo é idêntico: Aᵀ = A.', 'The reflection is identical: Aᵀ = A.'));
  return frames;
};

// produto: um elemento (linha × coluna) e depois a matriz inteira
D.mulCell = (A, B, full = true) => {
  const P = mul(A, B), r = A.length, c = B[0].length, n = A[0].length;
  const terms = (i, j) => Array.from({ length: n }, (_, k) => `${fmt(A[i][k])}·${fmt(B[k][j])}`).join(' + ');
  const frames = [F([M(A, 'A', rowCells(0, n)), OP('·'), M(B, 'B', colCells(0, n))], 'Para o elemento (1,1): linha 1 de A com coluna 1 de B.', 'For entry (1,1): row 1 of A with column 1 of B.')];
  const all = [];
  for (let i = 0; i < r; i++) for (let j = 0; j < c; j++) all.push([i, j]);
  (full ? all : [[0, 0]]).forEach(([i, j], k) => {
    frames.push(F([M(A, 'A', rowCells(i, n)), OP('·'), M(B, 'B', colCells(j, n)), OP('='), M(partial(P, all.findIndex((x) => x[0] === i && x[1] === j) + 1), '', [[i, j]])],
      `(${i + 1},${j + 1}): ${terms(i, j)} = ${fmt(P[i][j])}`, `(${i + 1},${j + 1}): ${terms(i, j)} = ${fmt(P[i][j])}`));
    void k;
  });
  return frames;
};

// determinante 2×2
D.det2 = (A) => {
  const [[a, b], [c, d]] = A;
  return [
    F([M(A, 'A')], 'O determinante 2 × 2 compara as duas diagonais.', 'The 2 × 2 determinant compares the two diagonals.'),
    F([M(A, 'A', [[0, 0], [1, 1]])], `Diagonal principal: ${fmt(a)}·${fmt(d)} = ${fmt(a * d)}.`, `Main diagonal: ${fmt(a)}·${fmt(d)} = ${fmt(a * d)}.`),
    F([M(A, 'A', [[0, 1], [1, 0]])], `Diagonal secundária: ${fmt(b)}·${fmt(c)} = ${fmt(b * c)}.`, `Secondary diagonal: ${fmt(b)}·${fmt(c)} = ${fmt(b * c)}.`),
    F([M(A, 'A'), TX(`det = ${fmt(a * d)} − ${fmt(b * c)} = ${fmt(det2(A))}`)], `det(A) = ${fmt(a * d)} − ${fmt(b * c)} = ${fmt(det2(A))}.`, `det(A) = ${fmt(a * d)} − ${fmt(b * c)} = ${fmt(det2(A))}.`),
  ];
};

// regra de Sarrus
D.sarrus = (A) => {
  const E = A.map((row) => [...row, row[0], row[1]]);
  const down = [0, 1, 2].map((s) => [0, 1, 2].map((i) => [i, i + s]));
  const up = [0, 1, 2].map((s) => [0, 1, 2].map((i) => [2 - i, i + s]));
  const prod = (cells) => cells.reduce((p, [i, j]) => p * E[i][j], 1);
  const frames = [F([M(E, 'A + 2 colunas')], 'Repetimos as duas primeiras colunas à direita.', 'We repeat the first two columns on the right.')];
  let pos = 0, neg = 0;
  down.forEach((c, k) => { pos += prod(c); frames.push(F([M(E, '', c)], `Descendo (+): ${c.map(([i, j]) => fmt(E[i][j])).join('·')} = ${fmt(prod(c))} · soma ${fmt(pos)}.`, `Going down (+): ${c.map(([i, j]) => fmt(E[i][j])).join('·')} = ${fmt(prod(c))} · sum ${fmt(pos)}.`)); void k; });
  up.forEach((c) => { neg += prod(c); frames.push(F([M(E, '', c)], `Subindo (−): ${c.map(([i, j]) => fmt(E[i][j])).join('·')} = ${fmt(prod(c))} · soma ${fmt(neg)}.`, `Going up (−): ${c.map(([i, j]) => fmt(E[i][j])).join('·')} = ${fmt(prod(c))} · sum ${fmt(neg)}.`)); });
  frames.push(F([M(A, 'A'), TX(`det = ${fmt(pos)} − ${fmt(neg)} = ${fmt(det3(A))}`)], `det(A) = ${fmt(pos)} − ${fmt(neg)} = ${fmt(det3(A))}.`, `det(A) = ${fmt(pos)} − ${fmt(neg)} = ${fmt(det3(A))}.`));
  return frames;
};

// inversa 2×2 (com det = 1)
D.inv2 = (A) => {
  const [[a, b], [c, d]] = A, det = det2(A), Iv = inv2(A);
  const swapped = [[d, b], [c, a]], flipped = [[d, -b === 0 ? 0 : -b], [-c === 0 ? 0 : -c, a]];
  return [
    F([M(A, 'A'), TX(`det = ${fmt(det)}`)], `Primeiro o determinante: ${fmt(det)} (≠ 0, então existe inversa).`, `First the determinant: ${fmt(det)} (≠ 0, so an inverse exists).`),
    F([M(A, 'A', [[0, 0], [1, 1]]), OP('→'), M(swapped, '', [[0, 0], [1, 1]])], `Trocamos de lugar a e d: ${fmt(a)} ↔ ${fmt(d)}.`, `Swap a and d: ${fmt(a)} ↔ ${fmt(d)}.`),
    F([M(swapped, '', [[0, 1], [1, 0]]), OP('→'), M(flipped, '', [[0, 1], [1, 0]])], 'Trocamos o sinal de b e de c.', 'Flip the signs of b and c.'),
    F([TX(`1/${fmt(det)} ·`), M(flipped, ''), OP('='), M(Iv, 'A⁻¹')], `Dividimos tudo pelo determinante (${fmt(det)}): eis a inversa.`, `Divide everything by the determinant (${fmt(det)}): here is the inverse.`),
    F([M(A, 'A'), OP('·'), M(Iv, 'A⁻¹'), OP('='), M(mul(A, Iv), 'I')], 'A prova: A · A⁻¹ dá a identidade.', 'The proof: A · A⁻¹ gives the identity.'),
  ];
};

// sistema A·X = B resolvido com a inversa
D.solve = (A, X) => {
  const B = mul(A, X), Iv = inv2(A);
  return [
    F([M(A, 'A'), OP('·'), M(blank(2, 1), 'X'), OP('='), M(B, 'B')], 'O sistema vira A · X = B.', 'The system becomes A · X = B.'),
    F([M(Iv, 'A⁻¹'), OP('·'), M(B, 'B')], 'Multiplicamos os dois lados por A⁻¹.', 'Multiply both sides by A⁻¹.'),
    F([TX('X ='), M(X, 'X')], 'X = A⁻¹ · B entrega a solução de uma vez.', 'X = A⁻¹ · B hands over the solution at once.'),
  ];
};

// quadros livres, quando a explicação pede algo próprio
D.frames = (list) => list.map(([items, pt, en]) => F(items, pt, en));
export const demoHelpers = { M, OP, TX, blank, T };
