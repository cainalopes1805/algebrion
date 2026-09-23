// Normaliza as missões 1–3 originais: alternativas/pares antes só em português ganham 4 idiomas.
import { L } from '../i18n/core';
import { missionsData } from './missions';

const TRUE = L('Verdadeiro', 'True', 'Verdadero', 'Vrai');
const FALSE = L('Falso', 'False', 'Falso', 'Faux');

// pt → [en, es, fr]
const T = {
  'É o elemento neutro: A · I = A': ['It is the neutral element: A · I = A', 'Es el elemento neutro: A · I = A', 'C’est l’élément neutre : A · I = A'],
  'Zera toda a matriz resultante': ['It zeroes the whole result', 'Anula toda la matriz resultante', 'Elle annule toute la matrice résultante'],
  'Inverte o sinal dos elementos': ['It flips the sign of the entries', 'Invierte el signo de los elementos', 'Elle change le signe des éléments'],
  'Dobra os valores dos elementos': ['It doubles the entries', 'Duplica los valores de los elementos', 'Elle double les éléments'],
  'Linhas primeiro, Colunas depois (m × n e a_ij)': ['Rows first, columns second (m × n and a_ij)', 'Filas primero, columnas después (m × n y a_ij)', 'Lignes d’abord, colonnes ensuite (m × n et a_ij)'],
  'Colunas sempre vêm antes das Linhas': ['Columns always come before rows', 'Las columnas siempre van antes que las filas', 'Les colonnes viennent toujours avant les lignes'],
  'Toda matriz precisa ser quadrada': ['Every matrix must be square', 'Toda matriz debe ser cuadrada', 'Toute matrice doit être carrée'],
  'Elementos negativos não são permitidos': ['Negative entries are not allowed', 'No se permiten elementos negativos', 'Les éléments négatifs sont interdits'],
  'Não, pois têm ordens diferentes': ['No, they have different orders', 'No, tienen órdenes diferentes', 'Non, leurs ordres sont différents'],
  'Sim, o resultado será 3 × 3': ['Yes, the result will be 3 × 3', 'Sí, el resultado será 3 × 3', 'Oui, le résultat sera 3 × 3'],
  'Sim, o resultado será 2 × 2': ['Yes, the result will be 2 × 2', 'Sí, el resultado será 2 × 2', 'Oui, le résultat sera 2 × 2'],
  'Sim, qualquer matriz pode ser somada': ['Yes, any matrices can be added', 'Sí, cualquier matriz se puede sumar', 'Oui, on peut additionner n’importe quelles matrices'],
  'Matriz Nula': ['Zero Matrix', 'Matriz Nula', 'Matrice Nulle'],
  'Matriz Identidade': ['Identity Matrix', 'Matriz Identidad', 'Matrice Identité'],
  'Matriz Oposta': ['Opposite Matrix', 'Matriz Opuesta', 'Matrice Opposée'],
  'Matriz Singular': ['Singular Matrix', 'Matriz Singular', 'Matrice Singulière'],
  'Matriz Linha': ['Row Matrix', 'Matriz Fila', 'Matrice Ligne'],
  'Matriz Coluna': ['Column Matrix', 'Matriz Columna', 'Matrice Colonne'],
  'Matriz Quadrada': ['Square Matrix', 'Matriz Cuadrada', 'Matrice Carrée'],
  'Matriz Diagonal': ['Diagonal Matrix', 'Matriz Diagonal', 'Matrice Diagonale'],
  'Matriz Triangular': ['Triangular Matrix', 'Matriz Triangular', 'Matrice Triangulaire'],
  'Possui apenas 1 linha': ['Has only 1 row', 'Tiene solo 1 fila', 'N’a qu’une seule ligne'],
  'Possui apenas 1 coluna': ['Has only 1 column', 'Tiene solo 1 columna', 'N’a qu’une seule colonne'],
  'Nº de linhas = Nº de colunas': ['# of rows = # of columns', 'N.º de filas = N.º de columnas', 'Nb de lignes = nb de colonnes'],
  'Todos os elementos são 0': ['All entries are 0', 'Todos los elementos son 0', 'Tous les éléments valent 0'],
  'Todos elementos = 0': ['All entries = 0', 'Todos los elementos = 0', 'Tous les éléments = 0'],
  'Diag. 1s e resto 0s': ['1s on the diagonal, 0s elsewhere', '1 en la diagonal y 0 en el resto', '1 sur la diagonale, 0 ailleurs'],
  'Apenas diag. principal não nula': ['Only the main diagonal is nonzero', 'Solo la diagonal principal no es nula', 'Seule la diagonale principale est non nulle'],
  'Zeros acima ou abaixo da diagonal': ['Zeros above or below the diagonal', 'Ceros encima o debajo de la diagonal', 'Des zéros au-dessus ou en dessous de la diagonale'],
  'Diagonal Principal': ['Main Diagonal', 'Diagonal Principal', 'Diagonale Principale'],
  'Acima da Diagonal Principal': ['Above the Main Diagonal', 'Encima de la Diagonal Principal', 'Au-dessus de la Diagonale Principale'],
  'Abaixo da Diagonal Principal': ['Below the Main Diagonal', 'Debajo de la Diagonal Principal', 'En dessous de la Diagonale Principale'],
  'Diagonal Secundária': ['Secondary Diagonal', 'Diagonal Secundaria', 'Diagonale Secondaire'],
  'Mesma ordem e todos os elementos correspondentes iguais (a_ij = b_ij)': ['Same order and all matching entries equal (a_ij = b_ij)', 'Mismo orden y todos los elementos correspondientes iguales (a_ij = b_ij)', 'Même ordre et tous les éléments correspondants égaux (a_ij = b_ij)'],
  'Apenas terem a mesma soma de elementos': ['Just having the same sum of entries', 'Solo tener la misma suma de elementos', 'Seulement avoir la même somme d’éléments'],
  'Apenas terem o mesmo número de elementos': ['Just having the same number of entries', 'Solo tener el mismo número de elementos', 'Seulement avoir le même nombre d’éléments'],
  'Terem diagonais principais iguais': ['Having equal main diagonals', 'Tener diagonales principales iguales', 'Avoir des diagonales principales égales'],
  'Mesma ordem obrigatória e soma elemento a elemento': ['Same order required, entry-by-entry sum', 'Mismo orden obligatorio y suma elemento a elemento', 'Même ordre obligatoire et somme terme à terme'],
  'Qualquer matriz pode ser somada': ['Any matrices can be added', 'Cualquier matriz se puede sumar', 'On peut additionner n’importe quelles matrices'],
  'Soma multiplica os elementos': ['Addition multiplies the entries', 'La suma multiplica los elementos', 'L’addition multiplie les éléments'],
  'Subtração é comutativa': ['Subtraction is commutative', 'La resta es conmutativa', 'La soustraction est commutative'],
  'Infinito': ['Infinity', 'Infinito', 'Infini'],
  'Fica multiplicado por 9 (3²)': ['Gets multiplied by 9 (3²)', 'Queda multiplicado por 9 (3²)', 'Est multiplié par 9 (3²)'],
  'Fica multiplicado por 3': ['Gets multiplied by 3', 'Queda multiplicado por 3', 'Est multiplié par 3'],
  'Não se altera': ['Stays unchanged', 'No se altera', 'Ne change pas'],
  'Fica dividido por 3': ['Gets divided by 3', 'Queda dividido por 3', 'Est divisé par 3'],
  'Cada elemento individual da matriz é multiplicado pelo número real k': ['Every single entry is multiplied by the real number k', 'Cada elemento de la matriz se multiplica por el número real k', 'Chaque élément est multiplié par le réel k'],
  'Apenas a primeira linha é multiplicada': ['Only the first row is multiplied', 'Solo se multiplica la primera fila', 'Seule la première ligne est multipliée'],
  'A ordem da matriz é multiplicada por k': ['The order of the matrix is multiplied by k', 'El orden de la matriz se multiplica por k', 'L’ordre de la matrice est multiplié par k'],
  'Apenas a diagonal principal muda': ['Only the main diagonal changes', 'Solo cambia la diagonal principal', 'Seule la diagonale principale change'],
  'Comutativa': ['Commutative', 'Conmutativa', 'Commutative'],
  'Associativa': ['Associative', 'Asociativa', 'Associative'],
  'Elemento Neutro': ['Neutral Element', 'Elemento Neutro', 'Élément Neutre'],
  'Elemento Oposto': ['Opposite Element', 'Elemento Opuesto', 'Élément Opposé'],
  'A + O = A (Matriz Nula)': ['A + O = A (Zero Matrix)', 'A + O = A (Matriz Nula)', 'A + O = A (Matrice Nulle)'],
  'Dobra todos os elementos': ['Doubles every entry', 'Duplica todos los elementos', 'Double tous les éléments'],
  'Transforma na Matriz Nula': ['Turns it into the Zero Matrix', 'La convierte en la Matriz Nula', 'La transforme en Matrice Nulle'],
  'Inverte o sinal de todos': ['Flips the sign of every entry', 'Invierte el signo de todos', 'Change le signe de tous'],
  'Divide todos por 2': ['Divides every entry by 2', 'Divide todos entre 2', 'Divise tous par 2'],
  '[ [0, 0], [0, 0] ] (Nula)': ['[ [0, 0], [0, 0] ] (Zero)', '[ [0, 0], [0, 0] ] (Nula)', '[ [0, 0], [0, 0] ] (Nulle)'],
};

const tr = (str) => {
  if (typeof str !== 'string') return str;
  if (T[str]) return L(str, ...T[str]);
  let m = str.match(/^(\d+) elementos?$/);
  if (m) {
    const n = m[1];
    return L(str, `${n} element${n === '1' ? '' : 's'}`, `${n} elemento${n === '1' ? '' : 's'}`, `${n} élément${n === '1' ? '' : 's'}`);
  }
  m = str.match(/^(\d+) células$/);
  if (m) return L(str, `${m[1]} cells`, `${m[1]} celdas`, `${m[1]} cellules`);
  return str;
};

const isTF = (o) => Array.isArray(o) && o.length === 2 && o[0] === 'Verdadeiro' && o[1] === 'Falso';

const normalizeActivity = (a) => {
  const out = { ...a };
  if (isTF(a.options)) {
    out.options = [TRUE, FALSE];
    out.correctAnswer = a.correctAnswer === 'Verdadeiro' ? TRUE : FALSE;
  } else if (a.options && a.type !== 'matrix_dimension') {
    out.options = a.options.map(tr);
    out.correctAnswer = tr(a.correctAnswer);
  }
  if (a.type === 'match_pairs') {
    out.pairs = Object.entries(a.pairs).map(([l, r]) => ({ l: tr(l), r: tr(r) }));
  }
  return out;
};

export const legacyMissions = missionsData.map((m) => ({
  ...m,
  levels: m.levels.map((lv) => ({ ...lv, activities: lv.activities.map(normalizeActivity) })),
}));
