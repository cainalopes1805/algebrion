// Currículo passo a passo: cada CONCEITO tem uma mini-lição (páginas com prática imediata) e uma fase de treino
// com dificuldade crescente. Nada é cobrado antes de ser ensinado. Os textos estão em PT e EN (ES/FR caem para EN).
import { L } from '../i18n/core';

const M = (m, label, hl) => ({ m, label, hl });
const OP = (op) => ({ op });
const T = (pt, en) => L(pt, en);
const page = (title, body, tries, extra = {}) => ({ title, body, tries, ...extra });
// Toda fase de treino tem pelo menos MIN_PRACTICE atividades: se faltar, reforçamos os itens do meio (nível normal)
const MIN_PRACTICE = 12;
const concept = (title, pages, practice) => {
  const plan = practice.map(([n, c, l]) => [n, c, l]);
  const order = plan.map((_, i) => i).sort((a, b) => Math.abs((plan[a][2] || 2) - 2) - Math.abs((plan[b][2] || 2) - 2));
  let total = plan.reduce((s, [, c]) => s + c, 0), k = 0;
  while (total < MIN_PRACTICE) { plan[order[k % order.length]][1] += 1; total += 1; k += 1; }
  return { title, pages, practice: plan };
};

// Notação de treino: ['gerador', quantidade, nível]  (nível 1 = aquecimento, 2 = normal, 3 = desafio)
export const CURRICULUM = {
  /* ═════════════ 1 · Fundamentos dos Grimórios ═════════════ */
  1: [
    concept(T('A Tábua de Runas', 'The Rune Tablet'), [
      page(T('O segredo por trás da magia', 'The secret behind magic'),
        T('Todo feitiço de Algebrion, do mais simples ao mais poderoso, esconde uma tabela de números: uma **matriz**. Os magos a chamam de Ciência das Runas Ordenadas. Sem ela, magia é só faísca; com ela, vira arte.',
          'Every spell in Algebrion, from the simplest to the mightiest, hides a table of numbers: a **matrix**. Mages call it the Science of Ordered Runes. Without it magic is just sparks; with it, magic becomes craft.'),
        ['rowsCols@1', 'rowsCols@1'], { display: [M([[2, 5, 1], [7, 0, 4]], 'A')] }),
      page(T('Linhas e colunas', 'Rows and columns'),
        T('As fileiras **horizontais** da tábua são as **linhas**; as **verticais**, as **colunas**. Cada runa guardada em uma casinha é um **elemento** da matriz. Aqui: 2 linhas e 3 colunas.',
          'The **horizontal** lines of the tablet are the **rows**; the **vertical** ones, the **columns**. Each rune kept in a cell is an **entry** of the matrix. Here: 2 rows and 3 columns.'),
        ['rowsCols@2', 'rowsCols@2'], { display: [M([[2, 5, 1], [7, 0, 4]], 'A', [[0, 0], [0, 1], [0, 2]])] }),
    ], [['rowsCols', 4, 1], ['rowsCols', 4, 2], ['rowsCols', 3, 3]]),

    concept(T('A ordem m × n', 'The order m × n'), [
      page(T('Contando: linhas primeiro', 'Counting: rows first'),
        T('Para dizer o tamanho de uma matriz, contamos as **linhas** e depois as **colunas**: é a **ordem** **m × n**. Esta tábua tem 2 linhas e 3 colunas, então é **2 × 3** (lê-se “dois por três”).',
          'To state a matrix’s size we count the **rows** first, then the **columns**: its **order** is **m × n**. This tablet has 2 rows and 3 columns, so it is **2 × 3** (“two by three”).'),
        ['dim@1', 'dim@1'], { display: [M([[2, 5, 1], [7, 0, 4]], 'A')], formula: 'm × n = 2 × 3' }),
      page(T('Quantos elementos?', 'How many entries?'),
        T('O total de elementos é sempre **m · n**. Uma matriz 3 × 4 guarda 3 · 4 = **12** runas. Cuidado: 2 × 3 e 3 × 2 têm o mesmo total, mas são ordens diferentes!',
          'The total number of entries is always **m · n**. A 3 × 4 matrix holds 3 · 4 = **12** runes. Careful: 2 × 3 and 3 × 2 have the same total but different orders!'),
        ['count', 'dim@2'], { formula: '3 × 4 → 3 · 4 = 12' }),
    ], [['dim', 4, 1], ['count', 3, 2], ['dim', 4, 2], ['rowsCols', 2, 3]]),

    concept(T('O endereço aᵢⱼ', 'The address aᵢⱼ'), [
      page(T('Cada runa tem endereço', 'Every rune has an address'),
        T('Cada elemento tem um endereço **aᵢⱼ**: **i** é a linha e **j** é a coluna. Regra de ouro: **linha primeiro, coluna depois**. Na tábua abaixo, a₁₃ é o elemento da linha 1, coluna 3.',
          'Every entry has an address **aᵢⱼ**: **i** is the row and **j** is the column. Golden rule: **row first, column second**. In the tablet below, a₁₃ is the entry in row 1, column 3.'),
        ['elemClick', 'elemClick'], { display: [M([[2, 5, 1], [7, 0, 4]], 'A', [0, 2])], formula: 'a₁₃ = 1' }),
      page(T('Lendo e procurando', 'Reading and searching'),
        T('Com o endereço, você lê o valor: a₂₁ = 7. E o contrário também vale: se vir o número 4, saberá que ele mora em a₂₃. Os magos usam isso para achar runas dentro de grimórios enormes.',
          'With the address you read the value: a₂₁ = 7. The reverse works too: seeing the number 4 tells you it lives at a₂₃. Mages use this to locate runes inside huge grimoires.'),
        ['elemValue', 'findAddress@1'], { display: [M([[2, 5, 1], [7, 0, 4]], 'A', [[1, 0], [1, 2]])] }),
    ], [['elemClick', 3, 2], ['elemValue', 3, 2], ['findAddress', 3, 1], ['findAddress', 3, 2]]),

    concept(T('A lei de formação', 'The formation law'), [
      page(T('A receita da matriz', 'The matrix recipe'),
        T('Às vezes a matriz vem com uma **receita**: uma fórmula que diz quanto vale cada aᵢⱼ. Por exemplo **aᵢⱼ = i + j**. Para achar a₂₃, troque i por 2 e j por 3: 2 + 3 = **5**. As receitas podem ter também 2i, i · j, i²…',
          'Sometimes a matrix comes with a **recipe**: a formula telling what each aᵢⱼ is worth. For instance **aᵢⱼ = i + j**. To find a₂₃, put i = 2 and j = 3: 2 + 3 = **5**. Recipes may also use 2i, i · j, i²…'),
        ['formula', 'formula'], { formula: 'aᵢⱼ = i + j  →  a₂₃ = 2 + 3 = 5' }),
      page(T('Construindo a matriz inteira', 'Building the whole matrix'),
        T('Para montar a matriz, calcule a receita **casa por casa**: a₁₁, a₁₂, a₂₁, a₂₂… Com aᵢⱼ = i + j em 2 × 2 sai [[2, 3], [3, 4]]. Vá devagar e confira as posições!',
          'To build the matrix, evaluate the recipe **cell by cell**: a₁₁, a₁₂, a₂₁, a₂₂… With aᵢⱼ = i + j in 2 × 2 you get [[2, 3], [3, 4]]. Go slowly and check the positions!'),
        ['formationMatrix@1', 'formationMatrix@1'], { display: [M([[2, 3], [3, 4]], 'A')] }),
    ], [['formula', 3, 2], ['formationMatrix', 3, 1], ['formationMatrix', 3, 2], ['formationMatrix', 2, 3]]),

    concept(T('Linha, coluna e quadrada', 'Row, column and square'), [
      page(T('As famílias de matrizes', 'Families of matrices'),
        T('**Matriz linha**: só 1 linha (1 × n). **Matriz coluna**: só 1 coluna (m × 1). **Matriz quadrada**: mesmo número de linhas e colunas (n × n) — as mais importantes do reino!',
          '**Row matrix**: just 1 row (1 × n). **Column matrix**: just 1 column (m × 1). **Square matrix**: same number of rows and columns (n × n) — the most important ones in the realm!'),
        ['matrixType@1', 'matrixType@1'], { display: [M([[4, 7, 1]], '1×3'), M([[4], [7], [1]], '3×1'), M([[1, 2], [3, 4]], '2×2')] }),
      page(T('Retangular e nula', 'Rectangular and zero'),
        T('Se linhas ≠ colunas (com pelo menos 2 de cada), a matriz é **retangular**. Se todos os elementos são **0**, é a **matriz nula**, representada por **O**: o silêncio das runas.',
          'If rows ≠ columns (with at least 2 of each), the matrix is **rectangular**. If every entry is **0**, it is the **zero matrix**, written **O**: the silence of the runes.'),
        ['matrixType@2', 'matrixType@2'], { display: [M([[1, 2, 3], [4, 5, 6]], '2×3'), M([[0, 0], [0, 0]], 'O')] }),
    ], [['matrixType', 4, 1], ['matrixType', 5, 2], ['dim', 2, 2]]),

    concept(T('As diagonais', 'The diagonals'), [
      page(T('A diagonal principal', 'The main diagonal'),
        T('Numa matriz **quadrada**, a **diagonal principal** liga o canto superior esquerdo ao inferior direito: são os elementos com **i = j** (a₁₁, a₂₂, a₃₃…). A soma deles é o **traço** da matriz.',
          'In a **square** matrix the **main diagonal** links the top-left corner to the bottom-right one: the entries with **i = j** (a₁₁, a₂₂, a₃₃…). Their sum is the matrix’s **trace**.'),
        ['trace', 'trace'], { display: [M([[3, 8, 1], [4, 5, 2], [7, 0, 6]], 'A', [[0, 0], [1, 1], [2, 2]])], formula: 'traço = 3 + 5 + 6 = 14' }),
      page(T('A diagonal secundária', 'The secondary diagonal'),
        T('A **diagonal secundária** vai do canto superior direito ao inferior esquerdo: são os elementos com **i + j = n + 1**. Em 3 × 3 são a₁₃, a₂₂ e a₃₁.',
          'The **secondary diagonal** runs from the top-right corner to the bottom-left one: the entries with **i + j = n + 1**. In 3 × 3 they are a₁₃, a₂₂ and a₃₁.'),
        ['diagSum@1', 'diagSum@2'], { display: [M([[3, 8, 1], [4, 5, 2], [7, 0, 6]], 'A', [[0, 2], [1, 1], [2, 0]])] }),
    ], [['trace', 3, 2], ['diagSum', 3, 1], ['diagSum', 4, 2], ['trace', 2, 2]]),

    concept(T('Identidade, diagonal e triangulares', 'Identity, diagonal and triangular'), [
      page(T('Diagonal e identidade', 'Diagonal and identity'),
        T('Uma matriz **diagonal** só tem números na diagonal principal; o resto é 0. Se esses números forem todos **1**, temos a **identidade I** — o “número 1” das matrizes.',
          'A **diagonal** matrix only has numbers on the main diagonal; everything else is 0. If those numbers are all **1**, we have the **identity I** — the “number 1” of matrices.'),
        ['specialKind@0', 'specialKind@0'], { display: [M([[3, 0], [0, 5]], 'diag'), M([[1, 0], [0, 1]], 'I')] }),
      page(T('Triangulares', 'Triangular'),
        T('**Triangular superior**: tudo abaixo da diagonal principal é 0. **Triangular inferior**: tudo acima é 0. Quando há números dos dois lados, não é nenhuma dessas.',
          '**Upper triangular**: everything below the main diagonal is 0. **Lower triangular**: everything above is 0. With numbers on both sides it is neither.'),
        ['specialKind@1', 'specialKind@2'], { display: [M([[1, 4, 2], [0, 5, 3], [0, 0, 6]], 'sup.'), M([[1, 0, 0], [4, 5, 0], [2, 3, 6]], 'inf.')] }),
    ], [['specialKind', 4, 1], ['specialKind', 5, 2], ['matrixType', 2, 2]]),

    concept(T('Igualdade de matrizes', 'Equal matrices'), [
      page(T('Quando duas matrizes são iguais', 'When two matrices are equal'),
        T('Duas matrizes são **iguais** quando têm a **mesma ordem** e cada elemento é igual ao de mesma posição. Se A = B, então a₁₁ = b₁₁, a₁₂ = b₁₂ e assim por diante. Isso permite descobrir valores desconhecidos!',
          'Two matrices are **equal** when they have the **same order** and every entry equals the one in the same position. If A = B then a₁₁ = b₁₁, a₁₂ = b₁₂ and so on. That lets us find unknown values!'),
        ['equalUnknown@1', 'equalUnknown@1'], { display: [M([[2, 5], [1, 4]], 'A'), OP('='), M([['x', 5], [1, 4]], 'B')] }),
      page(T('Várias incógnitas', 'Several unknowns'),
        T('Com mais de uma letra, resolvemos posição por posição: cada casa dá uma pequena equação. Se aparecer algo como **x + 2**, é só isolar x: se x + 2 = 7, então x = 5.',
          'With more than one letter we solve position by position: each cell gives a tiny equation. If something like **x + 2** shows up, just isolate x: if x + 2 = 7 then x = 5.'),
        ['equalUnknown@2', 'equalUnknown@3'], { display: [M([[3, 6], [2, 8]], 'A'), OP('='), M([['x + 2', 6], [2, 'y']], 'B')] }),
    ], [['equalUnknown', 3, 1], ['equalUnknown', 4, 2], ['equalUnknown', 3, 3]]),
  ],

  /* ═════════════ 2 · O Vale da Alquimia Aditiva ═════════════ */
  2: [
    concept(T('Somando poções', 'Adding potions'), [
      page(T('A soma, posição a posição', 'Adding, position by position'),
        T('Uma poção é uma matriz de doses: cada célula diz quanto de um ingrediente entra. Para **somar** duas poções, some as doses de **mesma posição**: (A + B)ᵢⱼ = aᵢⱼ + bᵢⱼ. É a ciência secreta por trás de toda mistura mágica.',
          'A potion is a matrix of doses: each cell says how much of an ingredient goes in. To **add** two potions, add the doses in the **same position**: (A + B)ᵢⱼ = aᵢⱼ + bᵢⱼ. It is the secret science behind every magical mixture.'),
        ['sumCell', 'sumCell'], { display: [M([[1, 2], [3, 4]], 'A'), OP('+'), M([[5, 0], [1, 2]], 'B'), OP('='), M([[6, 2], [4, 6]], 'A+B')] }),
      page(T('A matriz inteira', 'The whole matrix'),
        T('Faça célula por célula, sem pular nenhuma. Com sinais negativos, capriche: 3 + (−5) = −2. Dica: escreva mentalmente “linha 1, coluna 1”, “linha 1, coluna 2”… e confira a posição de cada resposta.',
          'Go cell by cell, skipping none. With negative signs take care: 3 + (−5) = −2. Tip: say “row 1, column 1”, “row 1, column 2”… and check each answer’s position.'),
        ['sumMatrix', 'sumMatrix']),
    ], [['sumCell', 3, 2], ['sumMatrix', 4, 2], ['sumMatrix', 3, 2]]),

    concept(T('Quando a soma é possível', 'When adding is possible'), [
      page(T('Mesma ordem, sempre', 'Same order, always'),
        T('Só dá para somar matrizes de **mesma ordem**: uma célula sem par não tem com quem somar! Uma 2 × 3 não soma com uma 3 × 2, mesmo tendo 6 elementos cada.',
          'You can only add matrices of the **same order**: a cell without a partner has nothing to add to! A 2 × 3 cannot be added to a 3 × 2, even though both have 6 entries.'),
        ['sumPossible', 'sumPossible']),
      page(T('A ordem do resultado', 'The order of the result'),
        T('Quando a soma existe, o resultado tem **a mesma ordem** das parcelas: 2 × 3 + 2 × 3 = 2 × 3. Se as ordens forem diferentes, a resposta é “impossível”.',
          'When the sum exists, the result has **the same order** as its terms: 2 × 3 + 2 × 3 = 2 × 3. If the orders differ, the answer is “impossible”.'),
        ['sumOrder', 'sumOrder']),
    ], [['sumPossible', 4, 2], ['sumOrder', 4, 2], ['sumMatrix', 2, 2]]),

    concept(T('Oposta e subtração', 'Opposite and subtraction'), [
      page(T('A matriz oposta', 'The opposite matrix'),
        T('A **oposta** de A é **−A**: troque o sinal de todos os elementos. Ela desfaz a soma: A + (−A) = **O**, a matriz nula. É o antídoto perfeito!',
          'The **opposite** of A is **−A**: flip the sign of every entry. It cancels the sum: A + (−A) = **O**, the zero matrix. The perfect antidote!'),
        ['oppositeMatrix@1', 'oppositeMatrix@1'], { display: [M([[1, -2], [3, 0]], 'A'), OP('→'), M([[-1, 2], [-3, 0]], '−A')] }),
      page(T('Subtrair é somar a oposta', 'Subtracting is adding the opposite'),
        T('**A − B** significa A + (−B): subtraia elemento a elemento, aᵢⱼ − bᵢⱼ. Atenção: diferente da soma, a subtração **não** é comutativa: A − B ≠ B − A.',
          '**A − B** means A + (−B): subtract entry by entry, aᵢⱼ − bᵢⱼ. Watch out: unlike addition, subtraction is **not** commutative: A − B ≠ B − A.'),
        ['subMatrix', 'subMatrix']),
    ], [['oppositeMatrix', 3, 2], ['subMatrix', 5, 2], ['sumMatrix', 2, 2]]),

    concept(T('Propriedades da soma', 'Properties of addition'), [
      page(T('Comutativa e associativa', 'Commutative and associative'),
        T('A soma de matrizes obedece às regras que você já conhece: **A + B = B + A** (comutativa) e **(A + B) + C = A + (B + C)** (associativa). Podemos somar na ordem que quisermos.',
          'Matrix addition obeys rules you already know: **A + B = B + A** (commutative) and **(A + B) + C = A + (B + C)** (associative). We may add in any order.'),
        ['addProp@1', 'addProp@1']),
      page(T('Neutro e oposto', 'Neutral and opposite'),
        T('A matriz nula é o **elemento neutro**: **A + O = A**. E a oposta cancela: **A + (−A) = O**. Guarde estas quatro propriedades: elas transformam a álgebra de matrizes num jogo previsível.',
          'The zero matrix is the **neutral element**: **A + O = A**. And the opposite cancels: **A + (−A) = O**. Keep these four properties: they make matrix algebra a predictable game.'),
        ['addProp@2', 'addProp@2']),
    ], [['addProp', 6, 2], ['sumMatrix', 2, 2], ['oppositeMatrix', 2, 2]]),

    concept(T('Equações com matrizes', 'Matrix equations'), [
      page(T('Isolando X', 'Isolating X'),
        T('Uma incógnita pode ser uma matriz inteira! Em **X + A = B**, passe A para o outro lado subtraindo: **X = B − A**. É o mesmo raciocínio das equações de sempre, mas célula por célula.',
          'An unknown can be a whole matrix! In **X + A = B**, move A across by subtracting: **X = B − A**. Same reasoning as ordinary equations, but cell by cell.'),
        ['matrixEq@1', 'matrixEq@1']),
      page(T('Outras posições de X', 'Other positions of X'),
        T('Em **X − A = B**, passe A somando: **X = B + A**. Em **A − X = B**, isole X com cuidado: X = A − B. Sempre confira: substitua X e veja se a igualdade vale!',
          'In **X − A = B**, move A across by adding: **X = B + A**. In **A − X = B**, isolate X carefully: X = A − B. Always verify: substitute X and see if the equality holds!'),
        ['matrixEq@2', 'matrixEq@3']),
    ], [['matrixEq', 3, 1], ['matrixEq', 4, 2], ['matrixEq', 3, 3]]),
  ],

  /* ═════════════ 3 · O Forte dos Escalares ═════════════ */
  3: [
    concept(T('Amplificando: k · A', 'Amplifying: k · A'), [
      page(T('Multiplicar por um escalar', 'Multiplying by a scalar'),
        T('Um **escalar** é um número comum. Multiplicá-lo por uma matriz **amplifica** o feitiço: cada elemento é multiplicado por k. (k·A)ᵢⱼ = k · aᵢⱼ. Dobrar a potência de uma runa é multiplicar tudo por 2!',
          'A **scalar** is an ordinary number. Multiplying it by a matrix **amplifies** the spell: every entry is multiplied by k. (k·A)ᵢⱼ = k · aᵢⱼ. Doubling a rune’s power means multiplying everything by 2!'),
        ['scalarCell', 'scalarCell'], { display: [{ text: '2 ·' }, M([[1, 3], [0, 4]], 'A'), OP('='), M([[2, 6], [0, 8]], '2A')] }),
      page(T('A matriz inteira', 'The whole matrix'),
        T('Multiplique **todos** os elementos, sem esquecer nenhum — inclusive o zero (que continua zero). Com k negativo, o sinal de cada elemento também muda.',
          'Multiply **every** entry, forgetting none — including zero (which stays zero). With a negative k every sign flips too.'),
        ['scalarMatrix', 'scalarMatrix']),
    ], [['scalarCell', 3, 2], ['scalarMatrix', 5, 2], ['scalarMatrix', 3, 2]]),

    concept(T('Escalares especiais', 'Special scalars'), [
      page(T('Zero, um e menos um', 'Zero, one and minus one'),
        T('**0·A = O** (tudo se apaga). **1·A = A** (nada muda). **(−1)·A = −A** (só inverte os sinais). Estes três escalares são os “interruptores” do general: apagar, manter e inverter.',
          '**0·A = O** (everything vanishes). **1·A = A** (nothing changes). **(−1)·A = −A** (just flips the signs). These three scalars are the general’s “switches”: erase, keep and invert.'),
        ['scalarSpecial', 'scalarSpecial']),
    ], [['scalarSpecial', 4, 2], ['scalarMatrix', 4, 2], ['scalarCell', 2, 2]]),

    concept(T('Propriedades do escalar', 'Scalar properties'), [
      page(T('Distribuindo o poder', 'Distributing the power'),
        T('**k·(A + B) = k·A + k·B** e **(k + m)·A = k·A + m·A**: o escalar se distribui. Também **(k·m)·A = k·(m·A)**. A ordem da matriz nunca muda: k·A tem a mesma ordem de A.',
          '**k·(A + B) = k·A + k·B** and **(k + m)·A = k·A + m·A**: the scalar distributes. Also **(k·m)·A = k·(m·A)**. The matrix’s order never changes: k·A has the same order as A.'),
        ['scalarProp', 'scalarProp']),
    ], [['scalarProp', 5, 2], ['scalarMatrix', 3, 2]]),

    concept(T('Combinações lineares', 'Linear combinations'), [
      page(T('Misturando amplificações', 'Mixing amplifications'),
        T('Uma **combinação linear** mistura escalares e somas: **2A + 3B**. Calcule primeiro cada parte (2A e 3B) e depois some, célula a célula. É assim que os magos misturam feitiços em proporções exatas.',
          'A **linear combination** mixes scalars and sums: **2A + 3B**. Compute each part first (2A and 3B) and then add, cell by cell. This is how mages blend spells in exact proportions.'),
        ['combo', 'combo']),
    ], [['combo', 4, 2], ['scalarMatrix', 2, 2], ['combo', 3, 2]]),

    concept(T('Equações com escalares', 'Equations with scalars'), [
      page(T('Desfazendo uma amplificação', 'Undoing an amplification'),
        T('Se **2X = A**, divida todos os elementos de A por 2. Isso desfaz a amplificação e revela X.',
          'If **2X = A**, divide every entry of A by 2. That undoes the amplification and reveals X.'),
        ['scalarEq@1', 'scalarEq@1']),
      page(T('Duas etapas', 'Two steps'),
        T('Em **2X + B = A**, primeiro passe B para o outro lado (A − B), depois divida por 2: **X = (A − B) ÷ 2**.',
          'In **2X + B = A**, first move B across (A − B), then divide by 2: **X = (A − B) ÷ 2**.'),
        ['scalarEq@2', 'scalarEq@2']),
    ], [['scalarEq', 3, 1], ['scalarEq', 4, 2], ['combo', 2, 2]]),
  ],

  /* ═════════════ 4 · A Torre dos Espelhos ═════════════ */
  4: [
    concept(T('O reflexo: a ordem de Aᵀ', 'The reflection: the order of Aᵀ'), [
      page(T('Transpor: trocar linhas por colunas', 'Transposing: swapping rows and columns'),
        T('A **transposta** Aᵀ é o reflexo da matriz num espelho diagonal: as **linhas** de A viram as **colunas** de Aᵀ. Por isso, se A é **m × n**, então Aᵀ é **n × m**.',
          'The **transpose** Aᵀ is the matrix’s reflection in a diagonal mirror: the **rows** of A become the **columns** of Aᵀ. So if A is **m × n**, Aᵀ is **n × m**.'),
        ['transposeDim', 'transposeDim'], { display: [M([[1, 2, 3], [4, 5, 6]], 'A'), OP('→'), M([[1, 4], [2, 5], [3, 6]], 'Aᵀ')] }),
    ], [['transposeDim', 5, 2], ['dim', 2, 2]]),

    concept(T('Transpondo os elementos', 'Transposing the entries'), [
      page(T('Linha 1 vira coluna 1', 'Row 1 becomes column 1'),
        T('Para montar Aᵀ, escreva a primeira linha de A como primeira coluna, a segunda linha como segunda coluna, e assim por diante. Em símbolos: (Aᵀ)ᵢⱼ = aⱼᵢ.',
          'To build Aᵀ, write A’s first row as the first column, the second row as the second column, and so on. In symbols: (Aᵀ)ᵢⱼ = aⱼᵢ.'),
        ['transposeMatrix', 'transposeMatrix']),
    ], [['transposeMatrix', 5, 2], ['transposeDim', 3, 2]]),

    concept(T('Propriedades do espelho', 'Mirror properties'), [
      page(T('Refletir e combinar', 'Reflecting and combining'),
        T('**(Aᵀ)ᵀ = A**: refletir duas vezes devolve a original. **(A + B)ᵀ = Aᵀ + Bᵀ** e **(k·A)ᵀ = k·Aᵀ**. Na diagonal principal nada se move (i = j).',
          '**(Aᵀ)ᵀ = A**: reflecting twice returns the original. **(A + B)ᵀ = Aᵀ + Bᵀ** and **(k·A)ᵀ = k·Aᵀ**. On the main diagonal nothing moves (i = j).'),
        ['transProp', 'transProp']),
    ], [['transProp', 5, 2], ['transposeMatrix', 3, 2]]),

    concept(T('Matrizes simétricas', 'Symmetric matrices'), [
      page(T('Quando o reflexo é igual', 'When the reflection is identical'),
        T('Uma matriz é **simétrica** quando **Aᵀ = A**, ou seja, **aᵢⱼ = aⱼᵢ**: os elementos “espelhados” pela diagonal são iguais. Só quadradas podem ser simétricas.',
          'A matrix is **symmetric** when **Aᵀ = A**, i.e. **aᵢⱼ = aⱼᵢ**: entries “mirrored” across the diagonal are equal. Only square matrices can be symmetric.'),
        ['symmetric', 'symmetric'], { display: [M([[1, 7], [7, 3]], 'A')] }),
      page(T('Descobrindo incógnitas', 'Finding unknowns'),
        T('Se uma matriz é simétrica e um valor é desconhecido, use o **espelho**: o x tem o mesmo valor do elemento oposto pela diagonal.',
          'If a matrix is symmetric and one value is unknown, use the **mirror**: x equals the entry opposite it across the diagonal.'),
        ['symUnknown@1', 'symUnknown@2']),
    ], [['symmetric', 4, 2], ['symUnknown', 3, 1], ['symUnknown', 3, 2], ['transposeMatrix', 2, 2]]),
  ],

  /* ═════════════ 5 · A Forja da Multiplicação ═════════════ */
  5: [
    concept(T('Quando existe A · B', 'When A · B exists'), [
      page(T('A regra da forja', 'The forge’s rule'),
        T('O produto **A · B** só existe se o **número de colunas de A** for igual ao **número de linhas de B**. Se A é **m × n** e B é **n × p**, então A · B é **m × p**. Os “n” do meio precisam ser iguais e desaparecem.',
          'The product **A · B** only exists if the **number of columns of A** equals the **number of rows of B**. If A is **m × n** and B is **n × p**, then A · B is **m × p**. The middle “n”s must match and vanish.'),
        ['mulOrder', 'mulOrder'], { formula: '(m × n) · (n × p) = m × p' }),
    ], [['mulOrder', 6, 2], ['sumOrder', 2, 2]]),

    concept(T('Linha × coluna: um elemento', 'Row × column: one entry'), [
      page(T('Um elemento do produto', 'One entry of the product'),
        T('O elemento **(A·B)ᵢⱼ** nasce da **linha i de A** com a **coluna j de B**: multiplique os pares e some. Ex.: [2, 3] com [4, 5] dá 2·4 + 3·5 = 23.',
          'The entry **(A·B)ᵢⱼ** comes from **row i of A** with **column j of B**: multiply the pairs and add. E.g. [2, 3] with [4, 5] gives 2·4 + 3·5 = 23.'),
        ['mulCellBA@1', 'mulCell'], { formula: '[2 3] · [4 5]ᵀ = 2·4 + 3·5 = 23' }),
      page(T('Com mais termos', 'With more terms'),
        T('Se a linha tem 3 números, a coluna também tem 3: some 3 produtos. O número de termos é o “n” do meio da regra da forja.',
          'If the row has 3 numbers the column has 3 as well: add 3 products. The number of terms is the middle “n” of the forge’s rule.'),
        ['mulCellBA@2', 'mulCellBA@2']),
    ], [['mulCell', 3, 2], ['mulCellBA', 4, 2], ['mulCellBA', 3, 2]]),

    concept(T('Matriz vezes vetor', 'Matrix times vector'), [
      page(T('Um golpe de cada vez', 'One strike at a time'),
        T('Uma **matriz coluna** (vetor) é uma matriz n × 1. Multiplicar A por ela dá uma nova coluna: cada linha de A bate na única coluna do vetor. A · v tem uma linha por linha de A.',
          'A **column matrix** (vector) is an n × 1 matrix. Multiplying A by it gives a new column: every row of A strikes the vector’s single column. A · v has one row per row of A.'),
        ['mulVector', 'mulVector']),
    ], [['mulVector', 5, 2], ['mulCellBA', 3, 2], ['mulOrder', 2, 2]]),

    concept(T('O produto completo', 'The full product'), [
      page(T('Célula por célula', 'Cell by cell'),
        T('Para A · B completo, calcule **cada elemento** com a regra linha × coluna. Em 2 × 2 são 4 elementos: (1,1), (1,2), (2,1), (2,2). Trabalhe com organização: risque o que já fez.',
          'For the full A · B, compute **each entry** with the row × column rule. In 2 × 2 there are 4 entries: (1,1), (1,2), (2,1), (2,2). Stay organized: tick off what you have done.'),
        ['mulMatrix', 'mulMatrix']),
    ], [['mulMatrix', 4, 2], ['mulCellBA', 2, 2], ['mulMatrix', 3, 2]]),

    concept(T('A ordem importa', 'Order matters'), [
      page(T('O produto não é comutativo', 'The product is not commutative'),
        T('Com matrizes, **A · B quase nunca é igual a B · A**: às vezes um deles nem existe! Isso é diferente dos números comuns. Outras regras valem: **(A + B)·C = A·C + B·C** e **(A·B)ᵀ = Bᵀ·Aᵀ**.',
          'With matrices **A · B is almost never equal to B · A**: sometimes one of them does not even exist! That differs from ordinary numbers. Other rules hold: **(A + B)·C = A·C + B·C** and **(A·B)ᵀ = Bᵀ·Aᵀ**.'),
        ['mulProp@1', 'mulProp@1']),
    ], [['mulProp', 4, 1], ['mulMatrix', 3, 2], ['mulCellBA', 2, 2]]),

    concept(T('A identidade da forja', 'The forge’s identity'), [
      page(T('O “1” do produto', 'The “1” of the product'),
        T('A **identidade I** é neutra na multiplicação: **A · I = I · A = A**. Além disso, **A · O = O**. Cuidado: A · B = O não obriga A ou B a serem nulas!',
          'The **identity I** is neutral for multiplication: **A · I = I · A = A**. Also, **A · O = O**. Careful: A · B = O does not force A or B to be zero!'),
        ['mulIdentity@1', 'mulIdentity@2']),
    ], [['mulIdentity', 3, 1], ['mulIdentity', 2, 3], ['mulProp', 4, 2], ['mulMatrix', 2, 2]]),
  ],

  /* ═════════════ 6 · O Labirinto dos Determinantes ═════════════ */
  6: [
    concept(T('Determinante 2 × 2', '2 × 2 determinant'), [
      page(T('O número secreto da matriz', 'The matrix’s secret number'),
        T('Toda matriz **quadrada** esconde um número: o **determinante**. Ele diz se a magia da matriz “fecha” ou “colapsa”. Em 2 × 2: **det = a·d − b·c** (diagonal principal menos diagonal secundária).',
          'Every **square** matrix hides a number: the **determinant**. It tells whether the matrix’s magic “holds” or “collapses”. In 2 × 2: **det = a·d − b·c** (main diagonal minus secondary diagonal).'),
        ['det2', 'det2'], { display: [M([[3, 1], [2, 4]], 'A')], formula: 'det = 3·4 − 1·2 = 10' }),
    ], [['det2', 8, 2]]),

    concept(T('Regra de Sarrus (3 × 3)', 'Sarrus’ rule (3 × 3)'), [
      page(T('Três diagonais para cada lado', 'Three diagonals each way'),
        T('Em 3 × 3, repita as duas primeiras colunas à direita. Some os produtos das **3 diagonais descendentes** e subtraia os produtos das **3 diagonais ascendentes**. É a **Regra de Sarrus**.',
          'In 3 × 3, repeat the first two columns on the right. Add the products of the **3 downward diagonals** and subtract the products of the **3 upward diagonals**. This is **Sarrus’ rule**.'),
        ['det3', 'det3']),
    ], [['det3', 5, 2], ['det2', 3, 2]]),

    concept(T('Propriedades do determinante', 'Properties of the determinant'), [
      page(T('Regras que economizam contas', 'Rules that save work'),
        T('Linha de zeros → det = 0. Duas linhas iguais → det = 0. Trocar duas linhas → o sinal do det muda. det(Aᵀ) = det(A). Multiplicar UMA linha por k multiplica o det por k.',
          'A zero row → det = 0. Two equal rows → det = 0. Swapping two rows → the det’s sign flips. det(Aᵀ) = det(A). Multiplying ONE row by k multiplies the det by k.'),
        ['detProp', 'detProp']),
      page(T('Multiplicando a matriz toda', 'Scaling the whole matrix'),
        T('Se você multiplica **todas** as linhas por k numa matriz n × n, o det é multiplicado por **kⁿ**. Em 2 × 2: det(kA) = k² · det(A).',
          'If you multiply **all** rows by k in an n × n matrix, the det gets multiplied by **kⁿ**. In 2 × 2: det(kA) = k² · det(A).'),
        ['detScalar', 'detScalar']),
    ], [['detProp', 4, 2], ['detScalar', 3, 2], ['det2', 2, 2]]),

    concept(T('Determinante e inversa', 'Determinant and inverse'), [
      page(T('Parede ou porta', 'Wall or door'),
        T('No Labirinto: **det = 0** é uma **parede** (matriz singular, sem volta) e **det ≠ 0** é uma **porta** (a matriz tem inversa). Calcule o det e descubra por onde seguir.',
          'In the Labyrinth: **det = 0** is a **wall** (singular matrix, no way back) and **det ≠ 0** is a **door** (the matrix has an inverse). Compute the det and find the way.'),
        ['invertible', 'invertible']),
    ], [['invertible', 5, 2], ['det2', 3, 2], ['det3', 2, 2]]),

    concept(T('Incógnita no determinante', 'Unknown in the determinant'), [
      page(T('Para que valor vira parede?', 'For which value does it become a wall?'),
        T('Quando há um **x** na matriz, escreva o determinante como expressão e iguale a **0** para achar o valor que transforma a porta em parede. Ex.: det [[x, 3], [2, 1]] = x − 6 = 0 → x = 6.',
          'When there is an **x** in the matrix, write the determinant as an expression and set it to **0** to find the value that turns the door into a wall. E.g. det [[x, 3], [2, 1]] = x − 6 = 0 → x = 6.'),
        ['detUnknown', 'detUnknown']),
    ], [['detUnknown', 5, 2], ['invertible', 2, 2], ['det2', 2, 2]]),
  ],

  /* ═════════════ 7 · O Trono da Inversa ═════════════ */
  7: [
    concept(T('Desfazendo um feitiço', 'Undoing a spell'), [
      page(T('A matriz inversa', 'The inverse matrix'),
        T('A **inversa** de A, escrita **A⁻¹**, é a matriz que **desfaz** A: **A · A⁻¹ = A⁻¹ · A = I**. É o contra-feitiço definitivo. Só matrizes quadradas podem ter inversa.',
          'The **inverse** of A, written **A⁻¹**, is the matrix that **undoes** A: **A · A⁻¹ = A⁻¹ · A = I**. The ultimate counter-spell. Only square matrices can have an inverse.'),
        ['invConcept', 'invConcept']),
    ], [['invConcept', 6, 2], ['mulIdentity', 2, 2]]),

    concept(T('Quando a inversa existe', 'When the inverse exists'), [
      page(T('A condição do trono', 'The throne’s condition'),
        T('A inversa existe **se, e somente se, det(A) ≠ 0**. Matrizes com det = 0 são **singulares**: nenhum contra-feitiço as desfaz. Sempre comece calculando o determinante!',
          'The inverse exists **if and only if det(A) ≠ 0**. Matrices with det = 0 are **singular**: no counter-spell undoes them. Always start by computing the determinant!'),
        ['invertible', 'invertible']),
    ], [['invertible', 5, 2], ['invConcept', 3, 2], ['detUnknown', 2, 2]]),

    concept(T('A fórmula 2 × 2', 'The 2 × 2 formula'), [
      page(T('Trocar, inverter, dividir', 'Swap, flip, divide'),
        T('Para **A = [[a, b], [c, d]]**: **A⁻¹ = (1/det) · [[d, −b], [−c, a]]**. Troque **a ↔ d**, mude o sinal de **b** e **c** e divida tudo pelo determinante. Aqui usaremos matrizes com det = 1, para o resultado sair inteiro.',
          'For **A = [[a, b], [c, d]]**: **A⁻¹ = (1/det) · [[d, −b], [−c, a]]**. Swap **a ↔ d**, flip the signs of **b** and **c**, and divide everything by the determinant. Here we use matrices with det = 1 so the result stays whole.'),
        ['inv2', 'inv2'], { formula: 'A⁻¹ = (1/det) · [[d, −b], [−c, a]]' }),
    ], [['inv2', 5, 2], ['det2', 2, 2]]),

    concept(T('Conferindo a inversa', 'Checking the inverse'), [
      page(T('A prova dos nove', 'The proof'),
        T('Para saber se B é a inversa de A, **multiplique** A · B: se o resultado for a identidade **I**, acertou; se não, algo está errado. É a prova dos nove do contra-feitiço.',
          'To know whether B is A’s inverse, **multiply** A · B: if the result is the identity **I**, you got it; if not, something is off. The counter-spell’s proof.'),
        ['invVerify', 'invVerify']),
    ], [['invVerify', 5, 2], ['inv2', 3, 2], ['invConcept', 2, 2]]),

    concept(T('Resolvendo sistemas', 'Solving systems'), [
      page(T('O feitiço final: A · X = B', 'The final spell: A · X = B'),
        T('Um sistema de equações vira **A · X = B**. Se A tem inversa, multiplique os dois lados por **A⁻¹**: **X = A⁻¹ · B**. Assim, a inversa entrega a solução de uma vez.',
          'A system of equations becomes **A · X = B**. If A has an inverse, multiply both sides by **A⁻¹**: **X = A⁻¹ · B**. The inverse hands you the solution at once.'),
        ['solve', 'solve']),
    ], [['solve', 5, 2], ['inv2', 2, 2], ['invVerify', 2, 2]]),
  ],
};

export const CHAPTER_EXAM = T('Prova do Capítulo', 'Chapter Exam');
export const CHAPTER_EXAM_DESC = T('Um teste com tudo o que você aprendeu no capítulo.', 'A test covering everything you learned in the chapter.');
