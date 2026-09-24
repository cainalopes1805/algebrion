// O Tomo dos Feitiços: para cada conceito, a história ancestral da magia, o método passo a passo,
// demonstrações animadas e o "aviso dos antigos". A chave é "missão-conceito" (a mesma dos feitiços).
import { L } from '../i18n/core';
import { D, demoHelpers } from './demos';

const { M, OP, TX } = demoHelpers;
const T = (pt, en) => L(pt, en);
const S = (tpt, ten, bpt, ben) => ({ title: T(tpt, ten), body: T(bpt, ben) });
const demo = (tpt, ten, frames) => ({ title: T(tpt, ten), frames });

export const TOME = {
  /* ══════════════ I · Fundamentos dos Grimórios ══════════════ */
  '1-1': {
    origin: T('Muito antes dos reinos, os escribas de Algebrion gravavam feitiços em tábuas de argila divididas em casinhas. Perceberam que a mesma runa muda de poder conforme a casa onde repousa. Assim nasceu a Ciência das Runas Ordenadas — o que hoje chamamos de matriz —, o segredo escondido por trás de toda magia.',
      'Long before the kingdoms, the scribes of Algebrion carved spells into clay tablets split into little cells. They noticed that the same rune changes its power depending on the cell where it rests. Thus was born the Science of Ordered Runes — what we now call a matrix — the secret hidden behind all magic.'),
    steps: [
      S('Uma tábua, muitos números', 'One tablet, many numbers', 'Uma matriz é uma tabela retangular de números. Em vez de espalhar runas soltas, o mago as organiza em casinhas alinhadas.', 'A matrix is a rectangular table of numbers. Instead of scattering loose runes, the mage arranges them in aligned cells.'),
      S('As fileiras deitadas: linhas', 'The lying rows: rows', 'As fileiras horizontais chamam-se linhas. Leia-as da esquerda para a direita, como uma frase escrita.', 'The horizontal lines are called rows. Read them from left to right, like a written sentence.'),
      S('As fileiras em pé: colunas', 'The standing rows: columns', 'As fileiras verticais chamam-se colunas. Imagine as colunas de um templo, sustentando a tábua.', 'The vertical lines are called columns. Picture a temple’s pillars holding up the tablet.'),
      S('Cada casinha é um elemento', 'Each cell is an entry', 'O número guardado numa casinha é um elemento da matriz. Uma tábua com 2 linhas e 3 colunas guarda 6 elementos.', 'The number kept in a cell is an entry of the matrix. A tablet with 2 rows and 3 columns holds 6 entries.'),
    ],
    demos: [demo('Contando as fileiras', 'Counting the lines', D.order([[2, 5, 1], [7, 0, 4]]))],
    tip: T('Os antigos ensinavam: “linha é o que corre como a escrita; coluna é o que se ergue como o pilar”.', 'The ancients taught: “a row runs like writing; a column rises like a pillar”.'),
  },
  '1-2': {
    origin: T('Quando dois escribas trocavam tábuas, era comum se enganarem sobre o tamanho. Por isso criaram um selo gravado no canto: dois números, primeiro as linhas e depois as colunas. O selo m × n virou a assinatura de toda matriz.',
      'When two scribes swapped tablets they often mistook the size. So they created a seal carved in the corner: two numbers, first the rows and then the columns. The m × n seal became every matrix’s signature.'),
    steps: [
      S('Conte as linhas', 'Count the rows', 'Percorra a tábua de cima para baixo contando as fileiras horizontais. Esse é o número m.', 'Walk down the tablet counting the horizontal lines. That is the number m.'),
      S('Conte as colunas', 'Count the columns', 'Agora conte, da esquerda para a direita, as fileiras verticais. Esse é o número n.', 'Now count, left to right, the vertical lines. That is the number n.'),
      S('Escreva “m × n”', 'Write “m × n”', 'A ordem é lida “m por n”. Regra de ouro: sempre linhas primeiro, colunas depois.', 'The order is read “m by n”. Golden rule: always rows first, columns second.'),
      S('O total de elementos', 'The total number of entries', 'Multiplique: m · n é a quantidade de casinhas. Uma tábua 3 × 2 tem 6 runas.', 'Multiply: m · n is the number of cells. A 3 × 2 tablet holds 6 runes.'),
    ],
    demos: [demo('Descobrindo a ordem', 'Finding the order', D.order([[1, 4], [2, 5], [3, 6]]))],
    tip: T('Cuidado: 2 × 3 e 3 × 2 têm o mesmo número de runas, mas são tábuas diferentes!', 'Careful: 2 × 3 and 3 × 2 hold the same number of runes, but they are different tablets!'),
  },
  '1-3': {
    origin: T('Na Grande Biblioteca de Algebrion, cada livro tinha um endereço: a estante e a prateleira. Os escribas copiaram a ideia para as tábuas: cada runa ganhou o seu endereço aᵢⱼ, que a encontra em segundos mesmo no maior dos grimórios.',
      'In Algebrion’s Great Library every book had an address: the shelf and the level. The scribes copied the idea for the tablets: each rune received its address aᵢⱼ, which finds it in seconds even in the largest grimoire.'),
    steps: [
      S('i é a linha', 'i is the row', 'O primeiro número do endereço é a linha, contada de cima para baixo.', 'The first number of the address is the row, counted from top to bottom.'),
      S('j é a coluna', 'j is the column', 'O segundo número é a coluna, contada da esquerda para a direita.', 'The second number is the column, counted from left to right.'),
      S('Onde as duas se encontram', 'Where they meet', 'O elemento aᵢⱼ mora no cruzamento da linha i com a coluna j. Em a₂₃: linha 2, coluna 3.', 'The entry aᵢⱼ lives where row i and column j cross. In a₂₃: row 2, column 3.'),
      S('Procurando pelo valor', 'Searching by value', 'Também dá para ir ao contrário: vendo o número, descubra em que casinha ele mora.', 'You can also go backwards: given the number, work out which cell it lives in.'),
    ],
    demos: [demo('Encontrando a₂₃', 'Finding a₂₃', D.address([[6, 2, 9], [4, 7, 1], [3, 8, 5]], 2, 3))],
    tip: T('Lembre-se do sussurro dos bibliotecários: “linha primeiro, coluna depois”.', 'Remember the librarians’ whisper: “row first, column second”.'),
  },
  '1-4': {
    origin: T('Alguns feitiços eram tão longos que gravá-los inteiros custaria uma vida. Os magos inventaram então a lei de formação: uma receita curta que ensina como calcular cada runa a partir do seu endereço.',
      'Some spells were so long that carving them whole would cost a lifetime. The mages then invented the formation law: a short recipe that tells how to compute each rune from its address.'),
    steps: [
      S('Leia a receita', 'Read the recipe', 'A lei vem como “aᵢⱼ = i + j”: ela diz o valor de qualquer casinha usando i e j.', 'The law comes as “aᵢⱼ = i + j”: it gives the value of any cell using i and j.'),
      S('Troque i e j', 'Swap in i and j', 'Para achar a₂₃, troque i por 2 e j por 3 na receita: 2 + 3.', 'To find a₂₃, put i = 2 and j = 3 in the recipe: 2 + 3.'),
      S('Calcule', 'Compute', 'Faça a conta com calma, respeitando potências e sinais: 2 + 3 = 5.', 'Do the math calmly, respecting powers and signs: 2 + 3 = 5.'),
      S('Monte a tábua inteira', 'Build the whole tablet', 'Repita para cada casinha, sempre na ordem de leitura: linha 1 da esquerda para a direita, depois linha 2…', 'Repeat for each cell, always in reading order: row 1 left to right, then row 2…'),
    ],
    demos: [demo('Construindo com aᵢⱼ = i + j', 'Building with aᵢⱼ = i + j', D.formation('i + j', (i, j) => i + j, 2, 3))],
    tip: T('Errar a posição é o deslize mais comum: confira sempre qual é o i e qual é o j.', 'Mixing up positions is the most common slip: always check which is i and which is j.'),
  },
  '1-5': {
    origin: T('Os feiticeiros separavam as tábuas pelo formato, como quem organiza uma estante: as compridas (linha), as altas (coluna) e as perfeitas, de lados iguais, consideradas sagradas — as quadradas. E a tábua vazia, sem runa alguma, era o silêncio: a matriz nula.',
      'The sorcerers sorted the tablets by shape, like shelving books: the long ones (row), the tall ones (column) and the perfect ones, with equal sides, deemed sacred — the square ones. And the empty tablet, without a single rune, was silence: the zero matrix.'),
    steps: [
      S('Matriz linha', 'Row matrix', 'Só uma linha, com n colunas: ordem 1 × n.', 'Just one row, with n columns: order 1 × n.'),
      S('Matriz coluna', 'Column matrix', 'Só uma coluna, com m linhas: ordem m × 1.', 'Just one column, with m rows: order m × 1.'),
      S('Matriz quadrada', 'Square matrix', 'Linhas e colunas em igual número: ordem n × n. As mais poderosas do reino.', 'Equal numbers of rows and columns: order n × n. The mightiest in the realm.'),
      S('Retangular e nula', 'Rectangular and zero', 'Se linhas ≠ colunas (com pelo menos 2 de cada) é retangular. Se todos os elementos são 0, é a matriz nula, O.', 'If rows ≠ columns (at least 2 of each) it is rectangular. If every entry is 0, it is the zero matrix, O.'),
    ],
    demos: [demo('A galeria das tábuas', 'The gallery of tablets', D.gallery([
      { m: [[4, 7, 1]], label: '1 × 3', pt: 'Matriz linha: uma única linha.', en: 'Row matrix: a single row.' },
      { m: [[4], [7], [1]], label: '3 × 1', pt: 'Matriz coluna: uma única coluna.', en: 'Column matrix: a single column.' },
      { m: [[1, 2], [3, 4]], label: '2 × 2', pt: 'Matriz quadrada: 2 linhas e 2 colunas.', en: 'Square matrix: 2 rows and 2 columns.' },
      { m: [[1, 2, 3], [4, 5, 6]], label: '2 × 3', pt: 'Matriz retangular: linhas ≠ colunas.', en: 'Rectangular matrix: rows ≠ columns.' },
      { m: [[0, 0], [0, 0]], label: 'O', pt: 'Matriz nula: todos os elementos valem 0.', en: 'Zero matrix: every entry is 0.' },
    ]))],
    tip: T('Uma matriz pode ter vários nomes: se tiver todos os elementos 0 e for quadrada, é nula e também quadrada — escolha o nome mais específico.', 'A matrix may have several names: an all-zero square matrix is both zero and square — pick the most specific name.'),
  },
  '1-6': {
    origin: T('Nas tábuas quadradas, os magos notaram duas trilhas de luz que as atravessavam de canto a canto. A trilha que desce da esquerda para a direita foi chamada de diagonal principal; a outra, de diagonal secundária. Somar a primeira revela o traço, uma assinatura da matriz.',
      'On square tablets the mages noticed two trails of light crossing them corner to corner. The trail descending from left to right was called the main diagonal; the other, the secondary diagonal. Summing the first reveals the trace, a signature of the matrix.'),
    steps: [
      S('Só nas quadradas', 'Only in square ones', 'Diagonais fazem sentido em matrizes quadradas, porque só nelas os cantos se encontram.', 'Diagonals make sense in square matrices, since only there do the corners meet.'),
      S('Diagonal principal: i = j', 'Main diagonal: i = j', 'Passa por a₁₁, a₂₂, a₃₃… — os elementos cujo endereço tem i igual a j.', 'It passes through a₁₁, a₂₂, a₃₃… — the entries whose address has i equal to j.'),
      S('O traço', 'The trace', 'Somando a diagonal principal obtemos o traço da matriz.', 'Adding the main diagonal gives the trace of the matrix.'),
      S('Diagonal secundária: i + j = n + 1', 'Secondary diagonal: i + j = n + 1', 'Liga o canto superior direito ao inferior esquerdo. Em 3 × 3: a₁₃, a₂₂ e a₃₁.', 'It links the top-right corner to the bottom-left one. In 3 × 3: a₁₃, a₂₂ and a₃₁.'),
    ],
    demos: [
      demo('A diagonal principal e o traço', 'The main diagonal and the trace', D.diagonal([[3, 8, 1], [4, 5, 2], [7, 0, 6]], true)),
      demo('A diagonal secundária', 'The secondary diagonal', D.diagonal([[3, 8, 1], [4, 5, 2], [7, 0, 6]], false)),
    ],
    tip: T('O elemento central de uma matriz 3 × 3 pertence às duas diagonais ao mesmo tempo.', 'The central entry of a 3 × 3 matrix belongs to both diagonals at once.'),
  },
  '1-7': {
    origin: T('Entre as matrizes quadradas, algumas eram tão especiais que ganharam nome de família. A diagonal, com números só na trilha principal. A identidade, o “1” das matrizes, que nada altera. E as triangulares, com o silêncio do zero abaixo ou acima da diagonal.',
      'Among square matrices, some were so special that they earned family names. The diagonal one, with numbers only along the main trail. The identity, the “1” of matrices, which changes nothing. And the triangular ones, with the silence of zero below or above the diagonal.'),
    steps: [
      S('Matriz diagonal', 'Diagonal matrix', 'Só a diagonal principal tem números; todo o resto é zero.', 'Only the main diagonal holds numbers; everything else is zero.'),
      S('Matriz identidade I', 'Identity matrix I', 'Uma diagonal só de uns e zeros no resto: é o “número 1” das matrizes.', 'A diagonal of ones and zeros elsewhere: it is the “number 1” of matrices.'),
      S('Triangular superior', 'Upper triangular', 'Tudo abaixo da diagonal principal é zero.', 'Everything below the main diagonal is zero.'),
      S('Triangular inferior', 'Lower triangular', 'Tudo acima da diagonal principal é zero. Se houver números dos dois lados, não é nenhuma delas.', 'Everything above the main diagonal is zero. With numbers on both sides it is neither.'),
    ],
    demos: [demo('A família das quadradas', 'The square family', D.gallery([
      { m: [[3, 0, 0], [0, 5, 0], [0, 0, 2]], label: 'diagonal', pt: 'Diagonal: números só na diagonal principal.', en: 'Diagonal: numbers only on the main diagonal.' },
      { m: [[1, 0, 0], [0, 1, 0], [0, 0, 1]], label: 'I', pt: 'Identidade: a diagonal é toda de 1.', en: 'Identity: the diagonal is all ones.' },
      { m: [[1, 4, 2], [0, 5, 3], [0, 0, 6]], label: 'superior', pt: 'Triangular superior: zeros abaixo da diagonal.', en: 'Upper triangular: zeros below the diagonal.' },
      { m: [[1, 0, 0], [4, 5, 0], [2, 3, 6]], label: 'inferior', pt: 'Triangular inferior: zeros acima da diagonal.', en: 'Lower triangular: zeros above the diagonal.' },
    ]))],
    tip: T('A identidade é diagonal e também triangular — mas o nome mais específico é “identidade”.', 'The identity is diagonal and triangular too — but its most specific name is “identity”.'),
  },
  '1-8': {
    origin: T('Certa vez, dois grimórios pareciam idênticos, mas um deles falhava ao ser recitado. Descobriu-se que uma única runa diferia. Desde então, o Conselho dos Escribas decretou: duas matrizes só são iguais se forem da mesma ordem e cada runa coincidir com a sua parceira de posição.',
      'Once, two grimoires looked identical, yet one failed when recited. A single rune differed. Since then the Council of Scribes decreed: two matrices are equal only if they share the same order and every rune matches its partner in position.'),
    steps: [
      S('Mesma ordem primeiro', 'Same order first', 'Se as ordens diferem, as matrizes nunca são iguais, por mais parecidas que pareçam.', 'If the orders differ, the matrices are never equal, however alike they look.'),
      S('Compare posição por posição', 'Compare position by position', 'a₁₁ com b₁₁, a₁₂ com b₁₂, e assim por diante.', 'a₁₁ with b₁₁, a₁₂ with b₁₂, and so on.'),
      S('Cada par vira uma equação', 'Each pair becomes an equation', 'Se um dos lados tem uma letra, como x, a igualdade da posição diz quanto ela vale.', 'If one side holds a letter such as x, the equality at that position says what it is worth.'),
      S('Isole a incógnita', 'Isolate the unknown', 'Se aparecer x + 2 = 7, isole x: x = 5.', 'If x + 2 = 7 shows up, isolate x: x = 5.'),
    ],
    demos: [demo('Comparando as tábuas', 'Comparing the tablets', D.equal([[2, 5], [1, 4]], [['x', 5], [1, 'y']]))],
    tip: T('Uma só posição diferente basta para as matrizes serem diferentes.', 'A single differing position is enough to make the matrices different.'),
  },

  /* ══════════════ II · O Vale da Alquimia Aditiva ══════════════ */
  '2-1': {
    origin: T('Os alquimistas do Vale guardavam suas fórmulas em tábuas de doses: cada casinha dizia quanto de um ingrediente entrava na poção. Para misturar duas poções, bastava somar as doses de mesma posição. Nascia a soma de matrizes, alicerce de todo elixir.',
      'The Valley’s alchemists kept their formulas on dose tablets: each cell said how much of an ingredient went into the potion. To mix two potions, they simply added the doses in the same position. Matrix addition was born, the foundation of every elixir.'),
    steps: [
      S('Alinhe as duas tábuas', 'Line up both tablets', 'Coloque A e B lado a lado, com as casinhas de mesma posição correspondendo uma à outra.', 'Place A and B side by side, matching cells of the same position.'),
      S('Some par a par', 'Add pair by pair', '(A + B)ᵢⱼ = aᵢⱼ + bᵢⱼ: some só os números que ocupam a mesma casinha.', '(A + B)ᵢⱼ = aᵢⱼ + bᵢⱼ: add only the numbers sharing the same cell.'),
      S('Escreva o resultado', 'Write the result', 'Cada soma vai para a mesma posição na tábua nova.', 'Each sum goes into the same position on the new tablet.'),
      S('Cuidado com os sinais', 'Mind the signs', 'Com negativos, lembre: 3 + (−5) = −2.', 'With negatives remember: 3 + (−5) = −2.'),
    ],
    demos: [demo('Misturando duas poções', 'Mixing two potions', D.sum([[1, 2], [3, 4]], [[5, 0], [1, 2]]))],
    tip: T('Nunca misture doses de posições diferentes: cada ingrediente só se soma com o seu igual.', 'Never mix doses of different positions: each ingredient only adds to its own kind.'),
  },
  '2-2': {
    origin: T('Um aprendiz tentou somar uma tábua 2 × 3 com uma 3 × 2 e a poção explodiu: sobravam casinhas sem par. Desde então os alquimistas gravam na porta do laboratório: só se soma o que tem o mesmo tamanho.',
      'An apprentice tried to add a 2 × 3 tablet with a 3 × 2 and the potion exploded: cells were left without partners. Since then the alchemists carve on the laboratory door: only equal sizes may be added.'),
    steps: [
      S('Compare as ordens', 'Compare the orders', 'Olhe o selo m × n de cada matriz antes de qualquer conta.', 'Look at each matrix’s m × n seal before any calculation.'),
      S('Iguais? Pode somar', 'Equal? You may add', 'Se as ordens são idênticas, a soma existe.', 'If the orders are identical, the sum exists.'),
      S('O resultado mantém a ordem', 'The result keeps the order', '2 × 3 + 2 × 3 = 2 × 3. A soma não muda o tamanho da tábua.', '2 × 3 + 2 × 3 = 2 × 3. The sum does not change the tablet’s size.'),
      S('Diferentes? Impossível', 'Different? Impossible', 'Sem casinha correspondente, a soma simplesmente não existe.', 'Without a matching cell, the sum simply does not exist.'),
    ],
    demos: [demo('Pode somar?', 'May we add?', D.frames([
      [[M([[1, 2, 3], [4, 5, 6]], 'A · 2×3'), OP('+'), M([[6, 5, 4], [3, 2, 1]], 'B · 2×3')], 'Mesma ordem, 2 × 3: a soma existe.', 'Same order, 2 × 3: the sum exists.'],
      [[M([[1, 2, 3], [4, 5, 6]], 'A · 2×3'), OP('='), M([[7, 7, 7], [7, 7, 7]], 'A + B · 2×3')], 'O resultado também é 2 × 3.', 'The result is 2 × 3 too.'],
      [[M([[1, 2, 3], [4, 5, 6]], 'A · 2×3'), OP('+'), M([[1, 2], [3, 4], [5, 6]], 'C · 3×2')], 'Ordens diferentes: sobram casinhas sem par.', 'Different orders: cells are left without partners.'],
      [[TX('A + C não existe')], 'Impossível! As ordens precisam ser iguais.', 'Impossible! The orders must be equal.'],
    ]))],
    tip: T('Ter o mesmo total de elementos não basta: a forma da tábua tem de ser a mesma.', 'Having the same number of entries is not enough: the tablet’s shape must match.'),
  },
  '2-3': {
    origin: T('Todo veneno precisa de um antídoto. Os alquimistas descobriram que, para cada poção A, existia uma poção oposta, −A, que a cancelava por completo. Subtrair passou a significar somar o antídoto.',
      'Every poison needs an antidote. The alchemists found that for each potion A there was an opposite potion, −A, that cancelled it completely. Subtracting came to mean adding the antidote.'),
    steps: [
      S('A oposta −A', 'The opposite −A', 'Troque o sinal de todos os elementos de A. O zero continua zero.', 'Flip the sign of every entry of A. Zero stays zero.'),
      S('O antídoto perfeito', 'The perfect antidote', 'A + (−A) dá a matriz nula: cada elemento cancela com o seu oposto.', 'A + (−A) gives the zero matrix: each entry cancels with its opposite.'),
      S('Subtrair é somar a oposta', 'Subtracting is adding the opposite', 'A − B é o mesmo que A + (−B): subtraia elemento a elemento, aᵢⱼ − bᵢⱼ.', 'A − B is the same as A + (−B): subtract entry by entry, aᵢⱼ − bᵢⱼ.'),
      S('A ordem importa', 'Order matters', 'A − B e B − A dão resultados de sinais opostos.', 'A − B and B − A give results with opposite signs.'),
    ],
    demos: [demo('A poção oposta', 'The opposite potion', D.opposite([[1, -2], [3, 0]])), demo('Subtraindo', 'Subtracting', D.sub([[5, 2], [7, 1]], [[1, 3], [2, 1]]))],
    tip: T('Mesmo A − B e B − A existindo, eles quase nunca coincidem: a subtração não é comutativa.', 'Even though A − B and B − A both exist, they almost never coincide: subtraction is not commutative.'),
  },
  '2-4': {
    origin: T('Os alquimistas mais velhos perceberam que a soma de matrizes obedecia às mesmas regras de sempre: podia-se trocar a ordem das poções, agrupá-las como se quisesse, e a poção vazia nunca alterava nada. Essas regras foram gravadas na pedra do Vale.',
      'The oldest alchemists noticed that matrix addition obeyed the same old rules: you could swap the order of potions, group them as you wished, and the empty potion never changed anything. These rules were carved in the Valley’s stone.'),
    steps: [
      S('Comutativa', 'Commutative', 'A + B = B + A. A ordem das parcelas não altera o resultado.', 'A + B = B + A. The order of the terms does not change the result.'),
      S('Associativa', 'Associative', '(A + B) + C = A + (B + C). Agrupe como preferir.', '(A + B) + C = A + (B + C). Group as you prefer.'),
      S('Elemento neutro', 'Neutral element', 'A + O = A: somar a matriz nula não muda nada.', 'A + O = A: adding the zero matrix changes nothing.'),
      S('Elemento oposto', 'Opposite element', 'A + (−A) = O: cada matriz é cancelada pela sua oposta.', 'A + (−A) = O: each matrix is cancelled by its opposite.'),
    ],
    demos: [demo('A + B = B + A', 'A + B = B + A', D.frames([
      [[M([[1, 2], [3, 4]], 'A'), OP('+'), M([[5, 0], [1, 2]], 'B'), OP('='), M([[6, 2], [4, 6]], 'A+B')], 'Somando A + B obtemos esta matriz.', 'Adding A + B gives this matrix.'],
      [[M([[5, 0], [1, 2]], 'B'), OP('+'), M([[1, 2], [3, 4]], 'A'), OP('='), M([[6, 2], [4, 6]], 'B+A')], 'Trocando a ordem, B + A dá exatamente a mesma matriz.', 'Swapping the order, B + A gives exactly the same matrix.'],
      [[M([[1, 2], [3, 4]], 'A'), OP('+'), M([[0, 0], [0, 0]], 'O'), OP('='), M([[1, 2], [3, 4]], 'A')], 'E somar a nula não muda nada: A + O = A.', 'And adding the zero matrix changes nothing: A + O = A.'],
    ]))],
    tip: T('Estas regras valem para a soma. A subtração, como já vimos, é mais caprichosa.', 'These rules hold for addition. Subtraction, as we saw, is fussier.'),
  },
  '2-5': {
    origin: T('“Quanto de essência falta na poção?” perguntava o mestre alquimista. Para responder, escondia a dose desconhecida numa matriz X e montava uma equação. Isolar X passou a ser a arte de descobrir o ingrediente que falta.',
      '“How much essence is missing from the potion?” the master alchemist would ask. To answer, he hid the unknown dose in a matrix X and built an equation. Isolating X became the art of discovering the missing ingredient.'),
    steps: [
      S('X é uma matriz', 'X is a matrix', 'A incógnita pode ser uma matriz inteira, com a mesma ordem das demais.', 'The unknown can be a whole matrix, with the same order as the others.'),
      S('Passe termos para o outro lado', 'Move terms across', 'Em X + A = B, subtraia A dos dois lados: X = B − A.', 'In X + A = B, subtract A from both sides: X = B − A.'),
      S('Atenção ao sinal', 'Mind the sign', 'Em X − A = B, some A: X = B + A. Em A − X = B, cuidado: X = A − B.', 'In X − A = B, add A: X = B + A. In A − X = B, careful: X = A − B.'),
      S('Confira', 'Check', 'Substitua X na equação e veja se a igualdade se sustenta.', 'Substitute X into the equation and see whether the equality holds.'),
    ],
    demos: [demo('Descobrindo X', 'Finding X', D.equation('plus', [[1, 2], [0, 3]], [[4, 5], [2, 7]]))],
    tip: T('Se em dúvida, teste: some A a X e veja se dá B.', 'If in doubt, test it: add A to X and see whether you get B.'),
  },

  /* ══════════════ III · O Forte dos Escalares ══════════════ */
  '3-1': {
    origin: T('O General Vetor descobriu que um feitiço podia ser amplificado sem mudar sua forma: bastava multiplicar todas as runas pelo mesmo número. Esse número, sem direção nem lugar, foi chamado de escalar — o que “escala” a magia.',
      'General Vector found that a spell could be amplified without changing its shape: it sufficed to multiply every rune by the same number. That number, with no direction or place, was called a scalar — what “scales” the magic.'),
    steps: [
      S('O escalar', 'The scalar', 'É um número comum, k, que vai multiplicar a matriz inteira.', 'It is an ordinary number, k, that will multiply the whole matrix.'),
      S('Multiplique todos os elementos', 'Multiply every entry', '(k·A)ᵢⱼ = k · aᵢⱼ. Nenhuma casinha fica de fora, nem as de valor zero.', '(k·A)ᵢⱼ = k · aᵢⱼ. No cell is left out, not even zeros.'),
      S('A ordem não muda', 'The order stays', 'k·A tem a mesma ordem de A: só os valores crescem.', 'k·A has the same order as A: only the values grow.'),
      S('Escalar negativo', 'Negative scalar', 'Se k < 0, os sinais de todos os elementos também se invertem.', 'If k < 0, the signs of every entry flip too.'),
    ],
    demos: [demo('Dobrando o poder', 'Doubling the power', D.scalar(2, [[1, 3], [0, 4]]))],
    tip: T('Multiplicar por um escalar NÃO soma o número a cada elemento: multiplica.', 'Multiplying by a scalar does NOT add the number to every entry: it multiplies.'),
  },
  '3-2': {
    origin: T('Três escalares eram chamados de interruptores do General: o zero, que apagava toda a magia; o um, que a mantinha intacta; e o menos um, que a espelhava, invertendo todos os sinais.',
      'Three scalars were called the General’s switches: zero, which erased all the magic; one, which kept it untouched; and minus one, which mirrored it, flipping every sign.'),
    steps: [
      S('Zero apaga', 'Zero erases', '0·A = O: todas as runas viram zero, restando a matriz nula.', '0·A = O: every rune becomes zero, leaving the zero matrix.'),
      S('Um mantém', 'One keeps', '1·A = A: multiplicar por 1 não muda nada.', '1·A = A: multiplying by 1 changes nothing.'),
      S('Menos um inverte', 'Minus one flips', '(−1)·A = −A: é a matriz oposta, com todos os sinais trocados.', '(−1)·A = −A: the opposite matrix, with every sign flipped.'),
      S('Como reconhecer', 'How to recognize them', 'Sempre que o escalar for 0, 1 ou −1, a resposta sai sem nenhuma conta.', 'Whenever the scalar is 0, 1 or −1, the answer comes without any calculation.'),
    ],
    demos: [demo('Os três interruptores', 'The three switches', D.frames([
      [[TX('0 ·'), M([[2, -1], [3, 4]], 'A'), OP('='), M([[0, 0], [0, 0]], 'O')], 'Com k = 0 tudo se apaga: a matriz nula.', 'With k = 0 everything vanishes: the zero matrix.'],
      [[TX('1 ·'), M([[2, -1], [3, 4]], 'A'), OP('='), M([[2, -1], [3, 4]], 'A')], 'Com k = 1 nada muda.', 'With k = 1 nothing changes.'],
      [[TX('(−1) ·'), M([[2, -1], [3, 4]], 'A'), OP('='), M([[-2, 1], [-3, -4]], '−A')], 'Com k = −1 os sinais se invertem: a oposta.', 'With k = −1 the signs flip: the opposite.'],
    ]))],
    tip: T('Multiplicar por 0 é o feitiço de apagar — use com cuidado em batalha!', 'Multiplying by 0 is the erasing spell — use it carefully in battle!'),
  },
  '3-3': {
    origin: T('Os estrategistas do Forte queriam saber: dá no mesmo amplificar duas tropas juntas ou amplificar cada uma e depois reuni-las? A resposta, gravada no portão, é que dá exatamente no mesmo: o escalar se distribui.',
      'The Stronghold’s strategists wondered: is it the same to amplify two troops together or amplify each one and then join them? The answer, carved on the gate, is that it is exactly the same: the scalar distributes.'),
    steps: [
      S('Distributiva sobre a soma', 'Distributive over sums', 'k·(A + B) = k·A + k·B.', 'k·(A + B) = k·A + k·B.'),
      S('Distributiva sobre escalares', 'Distributive over scalars', '(k + m)·A = k·A + m·A.', '(k + m)·A = k·A + m·A.'),
      S('Associativa', 'Associative', '(k·m)·A = k·(m·A): multiplique os escalares antes, se quiser.', '(k·m)·A = k·(m·A): multiply the scalars first if you wish.'),
      S('O que não muda', 'What never changes', 'A ordem de k·A é sempre a de A.', 'The order of k·A is always that of A.'),
    ],
    demos: [demo('k·(A + B) = k·A + k·B', 'k·(A + B) = k·A + k·B', D.frames([
      [[TX('2 ·('), M([[1, 2], [0, 3]], 'A'), OP('+'), M([[2, 1], [1, 0]], 'B'), TX(')')], 'Podemos somar primeiro e amplificar depois…', 'We may add first and amplify afterwards…'],
      [[TX('2 ·'), M([[3, 3], [1, 3]], 'A+B'), OP('='), M([[6, 6], [2, 6]], '2(A+B)')], '…obtendo esta matriz.', '…getting this matrix.'],
      [[M([[2, 4], [0, 6]], '2A'), OP('+'), M([[4, 2], [2, 0]], '2B'), OP('='), M([[6, 6], [2, 6]], '2A+2B')], 'Ou amplificar cada uma e somar: exatamente o mesmo resultado.', 'Or amplify each and add: exactly the same result.'],
    ]))],
    tip: T('A distributividade é a chave para simplificar grandes expressões antes de calcular.', 'Distributivity is the key to simplifying large expressions before computing.'),
  },
  '3-4': {
    origin: T('Nos campos de treino, o General misturava esquadrões em proporções exatas: “duas partes de A e três de B”. Essa mistura de escalares e somas ganhou o nome de combinação linear, a base de quase toda estratégia.',
      'On the training grounds the General mixed squads in exact proportions: “two parts of A and three of B”. This blend of scalars and sums earned the name linear combination, the basis of nearly every strategy.'),
    steps: [
      S('Leia a receita', 'Read the recipe', 'Em 2A + 3B, o 2 amplifica A e o 3 amplifica B.', 'In 2A + 3B, the 2 amplifies A and the 3 amplifies B.'),
      S('Calcule cada parte', 'Compute each part', 'Primeiro 2A, depois 3B, sempre multiplicando todos os elementos.', 'First 2A, then 3B, always multiplying every entry.'),
      S('Some as partes', 'Add the parts', 'Depois some os resultados posição por posição.', 'Then add the results position by position.'),
      S('Escalares negativos', 'Negative scalars', 'Em 2A − B, trate como 2A + (−1)·B.', 'In 2A − B, treat it as 2A + (−1)·B.'),
    ],
    demos: [demo('Misturando 2A + 3B', 'Mixing 2A + 3B', D.combo(2, [[1, 0], [2, 1]], 3, [[0, 1], [1, 2]]))],
    tip: T('Resolva sempre de dentro para fora: primeiro os escalares, depois a soma.', 'Always work from the inside out: scalars first, then the sum.'),
  },
  '3-5': {
    origin: T('Um esquadrão foi amplificado por engano e ninguém sabia o tamanho original. O General resolveu o mistério “desamplificando”: dividindo tudo pelo mesmo escalar. Nascia a equação com escalares.',
      'A squad was amplified by mistake and nobody knew its original size. The General solved the mystery by “de-amplifying”: dividing everything by the same scalar. The equation with scalars was born.'),
    steps: [
      S('Desfaça o escalar', 'Undo the scalar', 'Em 2X = A, divida todos os elementos de A por 2.', 'In 2X = A, divide every entry of A by 2.'),
      S('Dois passos', 'Two steps', 'Em 2X + B = A, primeiro passe B para o outro lado: 2X = A − B.', 'In 2X + B = A, first move B across: 2X = A − B.'),
      S('Depois divida', 'Then divide', 'X = (A − B) ÷ 2: divida cada elemento do resultado por 2.', 'X = (A − B) ÷ 2: divide each entry of the result by 2.'),
      S('Confira', 'Check', 'Multiplique X por 2 e some B: deve dar A.', 'Multiply X by 2 and add B: you should get A.'),
    ],
    demos: [demo('Desamplificando', 'De-amplifying', D.frames([
      [[TX('2X ='), M([[4, 6], [2, 8]], 'A')], 'Sabemos que 2X = A e queremos X.', 'We know that 2X = A and want X.'],
      [[TX('X = A ÷ 2')], 'Dividimos os dois lados por 2.', 'We divide both sides by 2.'],
      [[TX('X ='), M([[2, 3], [1, 4]], 'X')], 'Cada elemento de A dividido por 2.', 'Each entry of A divided by 2.'],
      [[TX('2 ·'), M([[2, 3], [1, 4]], 'X'), OP('='), M([[4, 6], [2, 8]], 'A')], 'A prova: 2X devolve A.', 'The proof: 2X returns A.'],
    ]))],
    tip: T('Divida só depois de isolar 2X. Dividir antes bagunça os termos.', 'Divide only after isolating 2X. Dividing sooner scrambles the terms.'),
  },

  /* ══════════════ IV · A Torre dos Espelhos ══════════════ */
  '4-1': {
    origin: T('A Feiticeira Speculum forjou o primeiro espelho diagonal: uma superfície que, ao refletir uma tábua, trocava suas linhas por colunas. O reflexo era a matriz transposta, e ela descobriu que, ao virar, o tamanho da tábua também se invertia.',
      'The Sorceress Speculum forged the first diagonal mirror: a surface that, when reflecting a tablet, swapped its rows for columns. The reflection was the transposed matrix, and she discovered that, in turning, the tablet’s size flipped too.'),
    steps: [
      S('O espelho diagonal', 'The diagonal mirror', 'A transposta Aᵀ é o reflexo de A numa diagonal imaginária que liga o canto superior esquerdo ao inferior direito.', 'The transpose Aᵀ is A’s reflection in an imaginary diagonal linking the top-left corner to the bottom-right one.'),
      S('Linhas viram colunas', 'Rows become columns', 'A primeira linha de A é a primeira coluna de Aᵀ, e assim por diante.', 'The first row of A is the first column of Aᵀ, and so on.'),
      S('A ordem se inverte', 'The order flips', 'Se A é m × n, então Aᵀ é n × m.', 'If A is m × n, then Aᵀ is n × m.'),
      S('Quadradas', 'Square ones', 'Numa matriz quadrada a ordem permanece n × n.', 'In a square matrix the order stays n × n.'),
    ],
    demos: [demo('Refletindo A', 'Reflecting A', D.transpose([[1, 2, 3], [4, 5, 6]]))],
    tip: T('Uma forma rápida de conferir: some as ordens — 2 × 3 vira 3 × 2, nunca 2 × 3.', 'A quick check: the orders swap — 2 × 3 becomes 3 × 2, never 2 × 3.'),
  },
  '4-2': {
    origin: T('Depois do tamanho, Speculum quis dominar os elementos do reflexo. Percebeu uma regra simples que valia para qualquer tábua: o elemento que estava na linha i e coluna j passa a morar na linha j e coluna i. Trocar os dois números do endereço é o segredo do espelho.',
      'After the size, Speculum wanted to master the entries of the reflection. She spotted a simple rule that held for any tablet: the entry sitting in row i and column j moves to row j and column i. Swapping the two numbers of the address is the mirror’s secret.'),
    steps: [
      S('Troque i e j', 'Swap i and j', '(Aᵀ)ᵢⱼ = aⱼᵢ: o endereço se inverte.', '(Aᵀ)ᵢⱼ = aⱼᵢ: the address flips.'),
      S('Escreva linha por linha', 'Write row by row', 'Copie a linha 1 de A como coluna 1 de Aᵀ; depois a linha 2 como coluna 2…', 'Copy row 1 of A as column 1 of Aᵀ; then row 2 as column 2…'),
      S('A diagonal fica parada', 'The diagonal stays put', 'Elementos com i = j não se movem no reflexo.', 'Entries with i = j do not move in the reflection.'),
      S('Confira as ordens', 'Check the orders', 'Aᵀ deve ter tantas linhas quanto A tem colunas.', 'Aᵀ must have as many rows as A has columns.'),
    ],
    demos: [demo('Um reflexo 3 × 2', 'A 3 × 2 reflection', D.transpose([[2, 7], [4, 1], [5, 3]]))],
    tip: T('Escreva a transposta devagar, coluna por coluna. Pressa aqui gera erros de troca.', 'Write the transpose slowly, column by column. Rushing here breeds swap errors.'),
  },
  '4-3': {
    origin: T('Speculum testou o espelho de mil formas. Descobriu que refletir duas vezes devolve a tábua original, que refletir uma soma equivale a somar os reflexos, e que o escalar atravessa o espelho sem se alterar. Eram as leis do espelho.',
      'Speculum tested the mirror a thousand ways. She found that reflecting twice returns the original tablet, that reflecting a sum equals summing the reflections, and that a scalar passes through the mirror unchanged. They were the laws of the mirror.'),
    steps: [
      S('Refletir duas vezes', 'Reflect twice', '(Aᵀ)ᵀ = A: o segundo reflexo devolve a original.', '(Aᵀ)ᵀ = A: the second reflection returns the original.'),
      S('Soma', 'Sum', '(A + B)ᵀ = Aᵀ + Bᵀ: pode transpor antes ou depois de somar.', '(A + B)ᵀ = Aᵀ + Bᵀ: you may transpose before or after adding.'),
      S('Escalar', 'Scalar', '(k·A)ᵀ = k·Aᵀ: o escalar sai da transposição.', '(k·A)ᵀ = k·Aᵀ: the scalar walks out of the transposition.'),
      S('Diagonal principal', 'Main diagonal', 'A e Aᵀ partilham a mesma diagonal principal.', 'A and Aᵀ share the same main diagonal.'),
    ],
    demos: [demo('Refletir duas vezes', 'Reflecting twice', D.frames([
      [[M([[1, 2, 3], [4, 5, 6]], 'A')], 'Começamos com A, de ordem 2 × 3.', 'We start with A, of order 2 × 3.'],
      [[M([[1, 2, 3], [4, 5, 6]], 'A'), OP('→'), M([[1, 4], [2, 5], [3, 6]], 'Aᵀ')], 'Primeiro reflexo: Aᵀ, de ordem 3 × 2.', 'First reflection: Aᵀ, of order 3 × 2.'],
      [[M([[1, 4], [2, 5], [3, 6]], 'Aᵀ'), OP('→'), M([[1, 2, 3], [4, 5, 6]], '(Aᵀ)ᵀ')], 'Segundo reflexo: voltamos à original!', 'Second reflection: we are back at the original!'],
    ]))],
    tip: T('Nada de inventar regras: a transposição só “passa” por somas e escalares. Para produtos há uma regra especial, que você conhecerá na Forja.', 'Do not invent rules: transposition only “passes” through sums and scalars. For products there is a special rule, which you will meet in the Forge.'),
  },
  '4-4': {
    origin: T('Certa vez, Speculum encontrou uma tábua que não mudava ao ser refletida: o espelho devolvia exatamente a mesma imagem. Chamou-a de simétrica e afirmou que só matrizes quadradas podem ter essa perfeição. Nos feitiços de equilíbrio, ela é a base.',
      'Once Speculum found a tablet that did not change when reflected: the mirror returned exactly the same image. She called it symmetric and declared that only square matrices can have this perfection. In balance spells it is the foundation.'),
    steps: [
      S('Aᵀ = A', 'Aᵀ = A', 'Uma matriz é simétrica quando o seu reflexo é igual a ela mesma.', 'A matrix is symmetric when its reflection equals itself.'),
      S('aᵢⱼ = aⱼᵢ', 'aᵢⱼ = aⱼᵢ', 'Os elementos espelhados pela diagonal são iguais.', 'Entries mirrored across the diagonal are equal.'),
      S('Só quadradas', 'Square only', 'Se a ordem não for n × n, o reflexo tem outro tamanho e não pode ser igual.', 'If the order is not n × n, the reflection has another size and cannot be equal.'),
      S('Descobrindo incógnitas', 'Finding unknowns', 'Se há um x, ele vale o mesmo que o seu espelho pela diagonal.', 'If there is an x, it equals its mirror across the diagonal.'),
    ],
    demos: [demo('Pares espelhados', 'Mirrored pairs', D.symmetric([[1, 7, 4], [7, 3, 9], [4, 9, 2]]))],
    tip: T('Na hora de conferir, foque só nos pares acima da diagonal — os de baixo repetem os de cima.', 'When checking, focus only on the pairs above the diagonal — the ones below repeat them.'),
  },

  /* ══════════════ V · A Forja da Multiplicação ══════════════ */
  '5-1': {
    origin: T('O Anão-Mestre da Forja ensinava: só se malham dois metais se as bordas encaixam. Do mesmo modo, só se multiplicam duas tábuas se as colunas da primeira forem tantas quanto as linhas da segunda. Esse é o encaixe da Forja.',
      'The Forge’s Dwarf-Master taught: two metals can be hammered together only if their edges fit. Likewise, two tablets can be multiplied only if the first one’s columns match the second one’s rows. That is the Forge’s fit.'),
    steps: [
      S('Escreva as duas ordens lado a lado', 'Write both orders side by side', 'Se A é m × n e B é p × q, escreva (m × n)(p × q).', 'If A is m × n and B is p × q, write (m × n)(p × q).'),
      S('Os números do meio', 'The middle numbers', 'O produto só existe se n = p: colunas de A = linhas de B.', 'The product exists only if n = p: columns of A = rows of B.'),
      S('O resultado', 'The result', 'Os números do meio somem e sobram os de fora: A · B é m × q.', 'The middle numbers vanish and the outer ones remain: A · B is m × q.'),
      S('Impossível', 'Impossible', 'Se os do meio diferem, o produto não existe.', 'If the middle numbers differ, the product does not exist.'),
    ],
    demos: [demo('O encaixe', 'The fit', D.frames([
      [[M([[1, 2, 3], [4, 5, 6]], 'A · 2×3'), OP('·'), M([[1, 0], [0, 1], [2, 2]], 'B · 3×2')], 'Ordens: (2 × 3)(3 × 2). Os números do meio são iguais: 3 e 3.', 'Orders: (2 × 3)(3 × 2). The middle numbers match: 3 and 3.'],
      [[TX('(2 × 3)(3 × 2) = 2 × 2')], 'O 3 do meio desaparece: o produto A · B tem ordem 2 × 2.', 'The middle 3 vanishes: the product A · B has order 2 × 2.'],
      [[TX('(2 × 3)(2 × 3) ✗')], 'Já (2 × 3)(2 × 3) não encaixa: 3 ≠ 2, o produto não existe.', 'But (2 × 3)(2 × 3) does not fit: 3 ≠ 2, the product does not exist.'],
    ]))],
    tip: T('Sempre verifique o encaixe antes de qualquer conta: é o erro que mais custa tempo.', 'Always check the fit before any calculation: it is the mistake that costs the most time.'),
  },
  '5-2': {
    origin: T('Cada golpe do martelo bate uma linha de A contra uma coluna de B. Os ferreiros cruzavam as duas, multiplicavam os pares que se encontravam e somavam o resultado: o produto escalar, a faísca de toda multiplicação de matrizes.',
      'Each hammer strike hits a row of A against a column of B. The smiths crossed the two, multiplied the pairs that met and added the results: the dot product, the spark of every matrix multiplication.'),
    steps: [
      S('Escolha o elemento', 'Choose the entry', 'Para (A·B)ᵢⱼ, use a linha i de A e a coluna j de B.', 'For (A·B)ᵢⱼ, use row i of A and column j of B.'),
      S('Emparelhe', 'Pair them up', 'O primeiro da linha com o primeiro da coluna, o segundo com o segundo…', 'The first of the row with the first of the column, the second with the second…'),
      S('Multiplique os pares', 'Multiply the pairs', 'Cada par gera um produto.', 'Each pair yields a product.'),
      S('Some tudo', 'Add everything', 'A soma dos produtos é o elemento procurado.', 'The sum of the products is the wanted entry.'),
    ],
    demos: [demo('Um golpe do martelo', 'One hammer strike', D.mulCell([[2, 3], [1, 4]], [[4, 1], [5, 2]], false))],
    tip: T('Em cada elemento, o número de produtos a somar é o “n” do meio da regra da Forja.', 'In each entry, the number of products to add is the middle “n” of the Forge’s rule.'),
  },
  '5-3': {
    origin: T('Antes de forjar armas inteiras, os ferreiros treinavam com o vetor: uma tábua de uma só coluna. Cada linha da matriz golpeava a coluna do vetor uma vez, e o resultado era uma nova coluna, uma linha para cada golpe.',
      'Before forging entire weapons, the smiths practiced with the vector: a single-column tablet. Each row of the matrix struck the vector’s column once, and the result was a new column, one row for each strike.'),
    steps: [
      S('O vetor é uma coluna', 'The vector is a column', 'Uma matriz n × 1, com tantas linhas quanto A tem colunas.', 'An n × 1 matrix, with as many rows as A has columns.'),
      S('Uma linha de cada vez', 'One row at a time', 'Cada linha de A bate na única coluna do vetor.', 'Each row of A strikes the vector’s single column.'),
      S('Uma coluna nova', 'A new column', 'O resultado A · v tem uma linha para cada linha de A.', 'The result A · v has one row for each row of A.'),
    ],
    demos: [demo('Matriz vezes vetor', 'Matrix times vector', D.mulCell([[1, 2, 3], [4, 5, 6]], [[1], [0], [2]], true))],
    tip: T('A ordem do resultado é (linhas de A) × 1: sempre uma coluna.', 'The result’s order is (rows of A) × 1: always a column.'),
  },
  '5-4': {
    origin: T('Dominados os golpes isolados, o Anão-Mestre mostrou como forjar a obra-prima: aplicar a regra da linha × coluna a cada casinha do resultado. Uma tábua 2 × 2 leva quatro golpes; uma 3 × 3, nove. Organização é tudo na Forja.',
      'With single strikes mastered, the Dwarf-Master showed how to forge the masterpiece: apply the row × column rule to every cell of the result. A 2 × 2 tablet takes four strikes; a 3 × 3, nine. Organization is everything in the Forge.'),
    steps: [
      S('Conte os elementos do resultado', 'Count the result’s entries', 'O resultado tem m × q casinhas.', 'The result has m × q cells.'),
      S('Calcule uma de cada vez', 'Compute one at a time', 'Em ordem: (1,1), (1,2), (2,1), (2,2)…', 'In order: (1,1), (1,2), (2,1), (2,2)…'),
      S('Risque o que fez', 'Tick off what you did', 'Marque cada elemento pronto para não pular nenhum.', 'Mark each finished entry so you skip none.'),
      S('Confira as ordens', 'Check the orders', 'O resultado deve ter a ordem prevista pelo encaixe.', 'The result must have the order predicted by the fit.'),
    ],
    demos: [demo('Forjando o produto 2 × 2', 'Forging the 2 × 2 product', D.mulCell([[1, 2], [0, 1]], [[3, 1], [2, 0]], true))],
    tip: T('Cada elemento do produto usa uma linha inteira de A e uma coluna inteira de B — nunca só um número.', 'Each entry of the product uses a whole row of A and a whole column of B — never just one number.'),
  },
  '5-5': {
    origin: T('“Bater o martelo e depois a lima não é o mesmo que a lima e depois o martelo”, dizia o Anão-Mestre. As matrizes obedecem à mesma sabedoria: A·B quase nunca é igual a B·A. Por isso, na Forja, a ordem dos golpes é lei.',
      '“Hammer then file is not the same as file then hammer,” the Dwarf-Master would say. Matrices obey the same wisdom: A·B is almost never equal to B·A. That is why, in the Forge, the order of strikes is law.'),
    steps: [
      S('Não comutativo', 'Not commutative', 'Em geral, A·B ≠ B·A. Às vezes um deles nem existe.', 'In general, A·B ≠ B·A. Sometimes one of them does not even exist.'),
      S('Distributiva', 'Distributive', '(A + B)·C = A·C + B·C: essa lei continua valendo.', '(A + B)·C = A·C + B·C: this law still holds.'),
      S('Transposta do produto', 'Transpose of a product', '(A·B)ᵀ = Bᵀ·Aᵀ: a ordem se inverte no espelho.', '(A·B)ᵀ = Bᵀ·Aᵀ: the order flips in the mirror.'),
      S('Produto nulo', 'Zero product', 'A·B = O não obriga A ou B a serem nulas.', 'A·B = O does not force A or B to be zero.'),
    ],
    demos: [demo('A·B contra B·A', 'A·B versus B·A', D.frames([
      [[M([[1, 2], [0, 1]], 'A'), OP('·'), M([[1, 0], [3, 1]], 'B'), OP('='), M([[7, 2], [3, 1]], 'A·B')], 'Multiplicando A por B, obtemos esta matriz.', 'Multiplying A by B gives this matrix.'],
      [[M([[1, 0], [3, 1]], 'B'), OP('·'), M([[1, 2], [0, 1]], 'A'), OP('='), M([[1, 2], [3, 7]], 'B·A')], 'Trocando a ordem, o resultado é diferente!', 'Swapping the order, the result is different!'],
      [[M([[7, 2], [3, 1]], 'A·B'), OP('≠'), M([[1, 2], [3, 7]], 'B·A')], 'Conclusão: A·B ≠ B·A. A ordem importa.', 'Conclusion: A·B ≠ B·A. Order matters.'],
    ]))],
    tip: T('Nunca “troque a ordem” de dois fatores só por conveniência: você mudaria o resultado.', 'Never “swap the order” of two factors for convenience: you would change the result.'),
  },
  '5-6': {
    origin: T('Entre todos os metais da Forja havia um que jamais alterava outro ao ser fundido com ele: o metal neutro. Na multiplicação de matrizes, esse metal é a identidade I, a tábua de uns na diagonal. Multiplicar por ela é como não fazer nada.',
      'Among all the Forge’s metals there was one that never altered another when fused with it: the neutral metal. In matrix multiplication that metal is the identity I, the tablet of ones on the diagonal. Multiplying by it is like doing nothing.'),
    steps: [
      S('A identidade I', 'The identity I', 'Uns na diagonal principal e zeros no resto.', 'Ones on the main diagonal and zeros elsewhere.'),
      S('Elemento neutro', 'Neutral element', 'A·I = I·A = A: nenhum elemento muda.', 'A·I = I·A = A: no entry changes.'),
      S('O tamanho de I', 'The size of I', 'Use a identidade de ordem compatível com o encaixe da Forja.', 'Use the identity whose order fits the Forge’s rule.'),
      S('A matriz nula', 'The zero matrix', 'A·O = O: tudo multiplicado por zero desaparece.', 'A·O = O: everything multiplied by zero vanishes.'),
    ],
    demos: [demo('Multiplicando pela identidade', 'Multiplying by the identity', D.mulCell([[2, 3], [4, 5]], [[1, 0], [0, 1]], true))],
    tip: T('Se o resultado de um produto com I não for a matriz original, refaça a conta: há erro.', 'If a product with I does not return the original matrix, redo it: there is a mistake.'),
  },

  /* ══════════════ VI · O Labirinto dos Determinantes ══════════════ */
  '6-1': {
    origin: T('O Oráculo do Labirinto guardava um segredo: toda tábua quadrada esconde um número que revela sua alma. Se a alma é nula, o caminho está fechado; se não, uma porta se abre. Em 2 × 2, esse número nasce de uma disputa entre as duas diagonais.',
      'The Labyrinth’s Oracle kept a secret: every square tablet hides a number that reveals its soul. If the soul is null, the way is shut; if not, a door opens. In 2 × 2, that number is born from a contest between the two diagonals.'),
    steps: [
      S('Diagonal principal', 'Main diagonal', 'Multiplique a · d.', 'Multiply a · d.'),
      S('Diagonal secundária', 'Secondary diagonal', 'Multiplique b · c.', 'Multiply b · c.'),
      S('Subtraia', 'Subtract', 'det = a·d − b·c. A principal menos a secundária.', 'det = a·d − b·c. The main minus the secondary.'),
      S('Leia o número', 'Read the number', 'det = 0 é parede; det ≠ 0 é porta.', 'det = 0 is a wall; det ≠ 0 is a door.'),
    ],
    demos: [demo('Disputa de diagonais', 'A contest of diagonals', D.det2([[3, 1], [2, 4]]))],
    tip: T('A ordem da subtração importa: sempre a principal menos a secundária.', 'The order of the subtraction matters: always main minus secondary.'),
  },
  '6-2': {
    origin: T('O Oráculo ensinou que, nas tábuas 3 × 3, três caminhos descem pela esquerda e três sobem pela direita. Um estudioso chamado Sarrus desenhou o truque: repetir as duas primeiras colunas ao lado da tábua, tornando as diagonais visíveis a olho nu.',
      'The Oracle taught that in 3 × 3 tablets three paths go down on the left and three go up on the right. A scholar named Sarrus drew the trick: repeat the first two columns beside the tablet, making the diagonals visible at a glance.'),
    steps: [
      S('Estenda a tábua', 'Extend the tablet', 'Copie as duas primeiras colunas à direita.', 'Copy the first two columns on the right.'),
      S('Três diagonais descendentes', 'Three downward diagonals', 'Multiplique cada uma e some os três produtos.', 'Multiply each one and add the three products.'),
      S('Três diagonais ascendentes', 'Three upward diagonals', 'Multiplique cada uma e some; esse total será subtraído.', 'Multiply each and add them; this total will be subtracted.'),
      S('Subtraia', 'Subtract', 'det = (soma das descendentes) − (soma das ascendentes).', 'det = (sum of the downward ones) − (sum of the upward ones).'),
    ],
    demos: [demo('A regra de Sarrus', 'Sarrus’ rule', D.sarrus([[2, 0, 1], [1, 3, 2], [1, 1, 4]]))],
    tip: T('A regra de Sarrus só vale para 3 × 3. Para matrizes maiores há outros métodos.', 'Sarrus’ rule only holds for 3 × 3. Larger matrices need other methods.'),
  },
  '6-3': {
    origin: T('As paredes do Labirinto seguiam regras: virar duas linhas trocava o sinal da alma; duas linhas iguais a apagavam; uma linha nula a matava. Conhecer essas regras poupava dias de contas a quem sabia usá-las.',
      'The Labyrinth’s walls followed rules: swapping two rows flipped the soul’s sign; two equal rows erased it; a null row killed it. Knowing these rules spared days of calculations to those who used them.'),
    steps: [
      S('Linha nula ou iguais', 'Zero row or equal rows', 'Se uma linha é toda zero, ou duas são iguais, det = 0.', 'If a row is all zeros, or two are equal, det = 0.'),
      S('Trocar duas linhas', 'Swapping two rows', 'O determinante troca de sinal.', 'The determinant flips its sign.'),
      S('Multiplicar uma linha por k', 'Multiplying a row by k', 'O determinante fica multiplicado por k.', 'The determinant gets multiplied by k.'),
      S('A matriz toda por k', 'The whole matrix by k', 'Em n × n, det(kA) = kⁿ · det(A). Em 2 × 2, é k² · det(A).', 'In n × n, det(kA) = kⁿ · det(A). In 2 × 2, it is k² · det(A).'),
    ],
    demos: [demo('Trocando duas linhas', 'Swapping two rows', D.frames([
      [[M([[3, 1], [2, 4]], 'A'), TX('det = 10')], 'Esta matriz tem determinante 10.', 'This matrix has determinant 10.'],
      [[M([[3, 1], [2, 4]], 'A', [[0, 0], [0, 1], [1, 0], [1, 1]]), OP('→'), M([[2, 4], [3, 1]], 'A′')], 'Trocamos as duas linhas de lugar.', 'We swap the two rows.'],
      [[M([[2, 4], [3, 1]], 'A′'), TX('det = 2·1 − 4·3 = −10')], 'O determinante virou −10: o sinal se inverteu.', 'The determinant became −10: the sign flipped.'],
    ]))],
    tip: T('Antes de calcular um determinante grande, procure linhas nulas ou repetidas: elas resolvem tudo.', 'Before computing a big determinant, look for zero or repeated rows: they settle everything.'),
  },
  '6-4': {
    origin: T('O maior segredo do Labirinto: o determinante decide se uma matriz pode ser desfeita. Se é zero, a matriz é uma parede — nada a inverte; se não, é uma porta, e do outro lado existe uma matriz inversa. Nenhum mago entra no Trono sem dominar essa distinção.',
      'The Labyrinth’s greatest secret: the determinant decides whether a matrix can be undone. If it is zero, the matrix is a wall — nothing reverses it; if not, it is a door, and on the other side lies an inverse matrix. No mage enters the Throne without mastering this distinction.'),
    steps: [
      S('Calcule o determinante', 'Compute the determinant', 'Use a fórmula de 2 × 2 ou Sarrus, conforme a ordem.', 'Use the 2 × 2 formula or Sarrus, depending on the order.'),
      S('det = 0: parede', 'det = 0: wall', 'A matriz é singular e não tem inversa.', 'The matrix is singular and has no inverse.'),
      S('det ≠ 0: porta', 'det ≠ 0: door', 'A matriz é invertível: existe uma inversa.', 'The matrix is invertible: an inverse exists.'),
    ],
    demos: [demo('Porta ou parede?', 'Door or wall?', D.frames([
      [[M([[2, 4], [1, 2]], 'A'), TX('det = 4 − 4 = 0')], 'Determinante zero: uma parede.', 'Determinant zero: a wall.'],
      [[M([[2, 1], [1, 1]], 'B'), TX('det = 2 − 1 = 1')], 'Determinante 1: uma porta!', 'Determinant 1: a door!'],
    ]))],
    tip: T('Uma linha que é múltipla da outra (como [2, 4] e [1, 2]) denuncia uma parede.', 'A row that is a multiple of another (like [2, 4] and [1, 2]) gives a wall away.'),
  },
  '6-5': {
    origin: T('Às vezes o Labirinto pregava peças: escondia um x dentro da matriz e desafiava o viajante a descobrir para que valor a porta virava parede. A saída era simples: escrever o determinante como expressão e igualar a zero.',
      'Sometimes the Labyrinth played tricks: it hid an x inside the matrix and challenged the traveler to find the value at which the door turned into a wall. The way out was simple: write the determinant as an expression and set it to zero.'),
    steps: [
      S('Escreva det em função de x', 'Write det in terms of x', 'Aplique a fórmula normalmente, deixando o x como está.', 'Apply the formula normally, leaving x as it is.'),
      S('Iguale a zero', 'Set it to zero', 'Queremos a parede: det = 0.', 'We want the wall: det = 0.'),
      S('Resolva a equação', 'Solve the equation', 'Isole x com a álgebra de sempre.', 'Isolate x with ordinary algebra.'),
      S('Confira', 'Check', 'Substitua x e veja se o determinante zera.', 'Substitute x and see whether the determinant vanishes.'),
    ],
    demos: [demo('Achando x', 'Finding x', D.frames([
      [[M([['x', 3], [2, 1]], 'A')], 'Queremos o x que faz det(A) = 0.', 'We want the x that makes det(A) = 0.'],
      [[M([['x', 3], [2, 1]], 'A', [[0, 0], [1, 1]]), TX('x · 1')], 'Diagonal principal: x · 1 = x.', 'Main diagonal: x · 1 = x.'],
      [[M([['x', 3], [2, 1]], 'A', [[0, 1], [1, 0]]), TX('3 · 2 = 6')], 'Diagonal secundária: 3 · 2 = 6.', 'Secondary diagonal: 3 · 2 = 6.'],
      [[TX('det = x − 6 = 0'), OP('→'), TX('x = 6')], 'Igualando a zero: x − 6 = 0, logo x = 6.', 'Setting it to zero: x − 6 = 0, hence x = 6.'],
    ]))],
    tip: T('Se x aparecer nas duas diagonais, você terá uma equação do 2º grau. Respire e resolva com calma.', 'If x appears on both diagonals, you will get a quadratic equation. Breathe and solve calmly.'),
  },

  /* ══════════════ VII · O Trono da Inversa ══════════════ */
  '7-1': {
    origin: T('A Rainha Inversa guardava o mais antigo dos contra-feitiços: para cada feitiço A capaz de ser desfeito, existia um A⁻¹ que o anulava por completo, devolvendo a identidade. Foi ela quem provou que nem todo feitiço tem contra-feitiço.',
      'Queen Inversa guarded the oldest of counter-spells: for each spell A that could be undone there existed an A⁻¹ that cancelled it entirely, returning the identity. She was the one who proved that not every spell has a counter-spell.'),
    steps: [
      S('O que a inversa faz', 'What the inverse does', 'A⁻¹ desfaz o efeito de A: A · A⁻¹ = A⁻¹ · A = I.', 'A⁻¹ undoes A’s effect: A · A⁻¹ = A⁻¹ · A = I.'),
      S('Só para quadradas', 'Only for square matrices', 'Só matrizes quadradas podem ter inversa.', 'Only square matrices can have an inverse.'),
      S('Nem todas têm', 'Not all have one', 'Se det = 0, não existe contra-feitiço.', 'If det = 0, no counter-spell exists.'),
      S('Propriedades', 'Properties', '(A⁻¹)⁻¹ = A e a inversa de I é I.', '(A⁻¹)⁻¹ = A and the inverse of I is I.'),
    ],
    demos: [demo('O contra-feitiço', 'The counter-spell', D.inv2([[2, 1], [1, 1]]))],
    tip: T('A inversa NÃO é 1/A elemento a elemento. Ela é uma nova matriz que deve ser construída.', 'The inverse is NOT 1/A entry by entry. It is a new matrix that must be built.'),
  },
  '7-2': {
    origin: T('“Antes de tentar desfazer, saiba se é possível”, avisava a Rainha. O critério do Trono é o determinante: se for diferente de zero, existe inversa; se for zero, é inútil tentar. Esse é o primeiro passo de todo mago sensato.',
      '“Before trying to undo it, know whether it is possible,” the Queen warned. The Throne’s criterion is the determinant: if it is nonzero, an inverse exists; if zero, it is useless to try. That is every sensible mage’s first step.'),
    steps: [
      S('Calcule o determinante', 'Compute the determinant', 'Antes de qualquer outra coisa.', 'Before anything else.'),
      S('det ≠ 0', 'det ≠ 0', 'A matriz é invertível e existe A⁻¹.', 'The matrix is invertible and A⁻¹ exists.'),
      S('det = 0', 'det = 0', 'A matriz é singular. Pare: não há inversa.', 'The matrix is singular. Stop: there is no inverse.'),
    ],
    demos: [demo('Existe inversa?', 'Does an inverse exist?', D.frames([
      [[M([[1, 2], [2, 4]], 'A'), TX('det = 4 − 4 = 0')], 'Determinante zero: nenhuma inversa.', 'Determinant zero: no inverse.'],
      [[M([[1, 2], [3, 5]], 'B'), TX('det = 5 − 6 = −1')], 'Determinante −1: a inversa existe!', 'Determinant −1: the inverse exists!'],
    ]))],
    tip: T('Se você tentar inverter uma matriz singular, a fórmula pedirá uma divisão por zero — um alarme.', 'If you try to invert a singular matrix, the formula asks for a division by zero — an alarm.'),
  },
  '7-3': {
    origin: T('Para as tábuas 2 × 2, a Rainha deixou uma fórmula gravada no espelho do Trono: trocar dois números de lugar, mudar o sinal de outros dois e dividir tudo pelo determinante. Três gestos simples, um contra-feitiço perfeito.',
      'For 2 × 2 tablets the Queen left a formula engraved on the Throne’s mirror: swap two numbers, flip the signs of two others and divide everything by the determinant. Three simple gestures, one perfect counter-spell.'),
    steps: [
      S('Calcule det', 'Compute det', 'det = a·d − b·c. Precisa ser diferente de zero.', 'det = a·d − b·c. It must be nonzero.'),
      S('Troque a e d', 'Swap a and d', 'Os elementos da diagonal principal trocam de lugar.', 'The main-diagonal entries swap places.'),
      S('Mude o sinal de b e c', 'Flip the signs of b and c', 'Os da diagonal secundária ficam onde estão, mas com sinal oposto.', 'The secondary-diagonal entries stay put but with the opposite sign.'),
      S('Divida por det', 'Divide by det', 'Multiplique tudo por 1/det.', 'Multiply everything by 1/det.'),
    ],
    demos: [demo('Invertendo uma tábua', 'Inverting a tablet', D.inv2([[3, 2], [1, 1]]))],
    tip: T('Sempre prove: multiplique A por A⁻¹ e veja se surge a identidade.', 'Always prove it: multiply A by A⁻¹ and see whether the identity appears.'),
  },
  '7-4': {
    origin: T('Nunca confie num contra-feitiço sem testá-lo. Os magos do Trono tinham uma prova: se B é mesmo a inversa de A, então A · B dá a identidade. Qualquer diferença, por menor que seja, denuncia um erro.',
      'Never trust a counter-spell untested. The Throne’s mages had a proof: if B truly is the inverse of A, then A · B gives the identity. Any difference, however small, betrays a mistake.'),
    steps: [
      S('Multiplique A · B', 'Multiply A · B', 'Faça o produto completo, célula por célula.', 'Do the full product, cell by cell.'),
      S('Compare com I', 'Compare with I', 'Ele deve ter uns na diagonal e zeros no resto.', 'It must show ones on the diagonal and zeros elsewhere.'),
      S('É igual? É a inversa', 'Equal? It is the inverse', 'Se A · B = I, então B = A⁻¹.', 'If A · B = I, then B = A⁻¹.'),
      S('Diferente? Não é', 'Different? It is not', 'Se algum elemento discorda, B não é a inversa.', 'If any entry disagrees, B is not the inverse.'),
    ],
    demos: [demo('A prova dos nove', 'The proof', D.frames([
      [[M([[2, 1], [1, 1]], 'A'), OP('·'), M([[1, -1], [-1, 2]], 'B'), OP('='), M([[1, 0], [0, 1]], 'A·B')], 'A · B dá a identidade: B é a inversa de A.', 'A · B gives the identity: B is the inverse of A.'],
      [[M([[2, 1], [1, 1]], 'A'), OP('·'), M([[1, -1], [-1, 1]], 'C'), OP('='), M([[1, -1], [0, 0]], 'A·C')], 'Com C, o produto não é a identidade: C não é a inversa.', 'With C, the product is not the identity: C is not the inverse.'],
    ]))],
    tip: T('Basta um elemento errado para reprovar a candidata a inversa.', 'A single wrong entry is enough to fail the candidate inverse.'),
  },
  '7-5': {
    origin: T('O feitiço final do reino não foi um golpe, mas uma equação: A · X = B. Se A tem inversa, basta multiplicar os dois lados por A⁻¹ para revelar X, a solução de todo o sistema. Foi assim que a Rainha desfez os sortilégios de Nullus.',
      'The realm’s final spell was no strike but an equation: A · X = B. If A has an inverse, multiplying both sides by A⁻¹ reveals X, the solution of the whole system. That is how the Queen undid Nullus’s curses.'),
    steps: [
      S('Escreva A · X = B', 'Write A · X = B', 'Organize os coeficientes em A, as incógnitas em X e os resultados em B.', 'Arrange the coefficients in A, the unknowns in X and the results in B.'),
      S('Verifique det(A)', 'Check det(A)', 'Só é possível se det(A) ≠ 0.', 'It is only possible if det(A) ≠ 0.'),
      S('Multiplique por A⁻¹', 'Multiply by A⁻¹', 'À esquerda dos dois lados: A⁻¹·A·X = A⁻¹·B.', 'On the left of both sides: A⁻¹·A·X = A⁻¹·B.'),
      S('X = A⁻¹ · B', 'X = A⁻¹ · B', 'A⁻¹·A vira I e sobra X sozinho.', 'A⁻¹·A becomes I and X is left alone.'),
    ],
    demos: [demo('Resolvendo o sistema', 'Solving the system', D.solve([[2, 1], [1, 1]], [[1], [3]]))],
    tip: T('A ordem dos fatores importa: multiplique A⁻¹ sempre pela esquerda.', 'The order of the factors matters: always multiply A⁻¹ on the left.'),
  },
};

export const tomeOf = (mission, concept) => TOME[`${mission}-${concept}`] || null;
