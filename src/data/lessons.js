// Lições (pergaminhos de estudo) — cada missão tem 2–3 lições curtas e visuais.
import { L } from '../i18n/core';

const M = (m, label, hl) => ({ m, label, hl });
const OP = (op) => ({ op });
const T = (text) => ({ text });
const page = (title, body, extra = {}) => ({ title, body, ...extra });

export const lessonsByMission = {
  /* ───────────── 1 · Grimórios ───────────── */
  1: [
    {
      id: 1,
      icon: '📜',
      title: L('O que é uma matriz?', 'What is a matrix?', '¿Qué es una matriz?', 'Qu’est-ce qu’une matrice ?'),
      pages: [
        page(
          L('A tábua mágica', 'The magic tablet', 'La tabla mágica', 'La tablette magique'),
          L('Uma **matriz** é uma tabela retangular de números, organizada em **linhas** (horizontais) e **colunas** (verticais). Os magos a usam para guardar muitos números num só feitiço.',
            'A **matrix** is a rectangular table of numbers arranged in **rows** (horizontal) and **columns** (vertical). Mages use it to store many numbers in a single spell.',
            'Una **matriz** es una tabla rectangular de números ordenada en **filas** (horizontales) y **columnas** (verticales). Los magos la usan para guardar muchos números en un solo hechizo.',
            'Une **matrice** est un tableau rectangulaire de nombres rangés en **lignes** (horizontales) et **colonnes** (verticales). Les mages s’en servent pour ranger plusieurs nombres dans un seul sort.'),
          { display: [M([[2, 5, 1], [7, 0, 4]], 'A')] },
        ),
        page(
          L('A ordem m × n', 'The order m × n', 'El orden m × n', 'L’ordre m × n'),
          L('Contamos primeiro as **linhas** e depois as **colunas**. Esta matriz tem 2 linhas e 3 colunas: sua ordem é **2 × 3**. O total de elementos é m·n = 6.',
            'We count **rows** first, then **columns**. This matrix has 2 rows and 3 columns: its order is **2 × 3**. The total number of entries is m·n = 6.',
            'Contamos primero las **filas** y luego las **columnas**. Esta matriz tiene 2 filas y 3 columnas: su orden es **2 × 3**. El total de elementos es m·n = 6.',
            'On compte d’abord les **lignes**, puis les **colonnes**. Cette matrice a 2 lignes et 3 colonnes : son ordre est **2 × 3**. Le nombre d’éléments est m·n = 6.'),
          { display: [M([[2, 5, 1], [7, 0, 4]], 'A')], formula: 'm × n = 2 × 3' },
        ),
        page(
          L('O endereço aᵢⱼ', 'The address aᵢⱼ', 'La dirección aᵢⱼ', 'L’adresse aᵢⱼ'),
          L('Cada elemento tem um endereço: **aᵢⱼ**, onde **i** é a linha e **j** é a coluna. Lembre: **LiCo** — Linha primeiro, Coluna depois. Aqui, a₁₃ = 1 (destacado).',
            'Every entry has an address: **aᵢⱼ**, where **i** is the row and **j** is the column. Remember: **Row first, Column second**. Here, a₁₃ = 1 (highlighted).',
            'Cada elemento tiene una dirección: **aᵢⱼ**, donde **i** es la fila y **j** la columna. Recuerda: **Fila primero, Columna después**. Aquí, a₁₃ = 1 (resaltado).',
            'Chaque élément a une adresse : **aᵢⱼ**, où **i** est la ligne et **j** la colonne. Retenez : **Ligne d’abord, Colonne ensuite**. Ici, a₁₃ = 1 (en surbrillance).'),
          { display: [M([[2, 5, 1], [7, 0, 4]], 'A', [0, 2])], formula: 'a₁₃ = 1' },
        ),
      ],
    },
    {
      id: 2,
      icon: '🗝️',
      title: L('Tipos especiais', 'Special types', 'Tipos especiales', 'Types spéciaux'),
      pages: [
        page(
          L('Linha, coluna e quadrada', 'Row, column and square', 'Fila, columna y cuadrada', 'Ligne, colonne et carrée'),
          L('**Matriz linha**: só 1 linha. **Matriz coluna**: só 1 coluna. **Matriz quadrada**: mesmo número de linhas e colunas (n × n) — as mais importantes do reino!',
            '**Row matrix**: just 1 row. **Column matrix**: just 1 column. **Square matrix**: same number of rows and columns (n × n) — the most important in the realm!',
            '**Matriz fila**: solo 1 fila. **Matriz columna**: solo 1 columna. **Matriz cuadrada**: igual número de filas y columnas (n × n) — ¡las más importantes del reino!',
            '**Matrice ligne** : 1 seule ligne. **Matrice colonne** : 1 seule colonne. **Matrice carrée** : autant de lignes que de colonnes (n × n) — les plus importantes du royaume !'),
          { display: [M([[4, 7, 1]], '1×3'), M([[4], [7], [1]], '3×1')] },
        ),
        page(
          L('As diagonais', 'The diagonals', 'Las diagonales', 'Les diagonales'),
          L('Numa matriz quadrada, a **diagonal principal** tem os elementos com **i = j**. A **diagonal secundária** tem os de **i + j = n + 1**.',
            'In a square matrix the **main diagonal** holds entries with **i = j**. The **secondary diagonal** holds those with **i + j = n + 1**.',
            'En una matriz cuadrada, la **diagonal principal** tiene los elementos con **i = j**. La **diagonal secundaria**, los de **i + j = n + 1**.',
            'Dans une matrice carrée, la **diagonale principale** contient les éléments où **i = j**. La **diagonale secondaire**, ceux où **i + j = n + 1**.'),
          { display: [M([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 'A', [[0, 0], [1, 1], [2, 2]])] },
        ),
        page(
          L('Nula, diagonal e identidade', 'Zero, diagonal and identity', 'Nula, diagonal e identidad', 'Nulle, diagonale et identité'),
          L('**Nula**: tudo 0. **Diagonal**: só a diagonal principal é não nula. **Identidade (I)**: diagonal de 1s e resto 0 — é o “número 1” das matrizes: **A·I = A**.',
            '**Zero**: all 0. **Diagonal**: only the main diagonal is nonzero. **Identity (I)**: 1s on the diagonal and 0 elsewhere — the matrix version of “1”: **A·I = A**.',
            '**Nula**: todo 0. **Diagonal**: solo la diagonal principal es no nula. **Identidad (I)**: 1 en la diagonal y 0 en el resto — el “1” de las matrices: **A·I = A**.',
            '**Nulle** : que des 0. **Diagonale** : seule la diagonale principale est non nulle. **Identité (I)** : des 1 sur la diagonale et 0 ailleurs — le « 1 » des matrices : **A·I = A**.'),
          { display: [M([[1, 0, 0], [0, 1, 0], [0, 0, 1]], 'I₃')] },
        ),
      ],
    },
  ],

  /* ───────────── 2 · Alquimia Aditiva ───────────── */
  2: [
    {
      id: 1,
      icon: '⚗️',
      title: L('Somando poções', 'Mixing potions', 'Sumando pociones', 'Mélanger les potions'),
      pages: [
        page(
          L('A Lei da Harmonia', 'The Law of Harmony', 'La Ley de la Armonía', 'La Loi de l’Harmonie'),
          L('Só podemos somar matrizes de **mesma ordem**. A soma é feita **elemento a elemento**: **cᵢⱼ = aᵢⱼ + bᵢⱼ**.',
            'We can only add matrices of the **same order**. The sum is done **entry by entry**: **cᵢⱼ = aᵢⱼ + bᵢⱼ**.',
            'Solo se pueden sumar matrices del **mismo orden**. La suma es **elemento a elemento**: **cᵢⱼ = aᵢⱼ + bᵢⱼ**.',
            'On ne peut additionner que des matrices de **même ordre**. La somme se fait **terme à terme** : **cᵢⱼ = aᵢⱼ + bᵢⱼ**.'),
          { display: [M([[1, 2], [3, 4]], 'A'), OP('+'), M([[5, 6], [7, 8]], 'B'), OP('='), M([[6, 8], [10, 12]], 'C')] },
        ),
        page(
          L('Subtração', 'Subtraction', 'Resta', 'Soustraction'),
          L('Subtrair é somar a **oposta**: A − B = A + (−B). Na prática: subtraia elemento a elemento, respeitando os sinais.',
            'Subtracting means adding the **opposite**: A − B = A + (−B). In practice: subtract entry by entry, mind the signs.',
            'Restar es sumar la **opuesta**: A − B = A + (−B). En la práctica: resta elemento a elemento, cuidando los signos.',
            'Soustraire revient à ajouter l’**opposée** : A − B = A + (−B). En pratique : soustrayez terme à terme en surveillant les signes.'),
          { display: [M([[5, 1], [0, 3]], 'A'), OP('−'), M([[2, 4], [1, 1]], 'B'), OP('='), M([[3, -3], [-1, 2]], 'C')] },
        ),
      ],
    },
    {
      id: 2,
      icon: '📚',
      title: L('Propriedades da soma', 'Properties of addition', 'Propiedades de la suma', 'Propriétés de l’addition'),
      pages: [
        page(
          L('As quatro leis', 'The four laws', 'Las cuatro leyes', 'Les quatre lois'),
          L('**Comutativa**: A + B = B + A. **Associativa**: (A + B) + C = A + (B + C). **Elemento neutro**: A + O = A. **Elemento oposto**: A + (−A) = O.',
            '**Commutative**: A + B = B + A. **Associative**: (A + B) + C = A + (B + C). **Neutral element**: A + O = A. **Opposite element**: A + (−A) = O.',
            '**Conmutativa**: A + B = B + A. **Asociativa**: (A + B) + C = A + (B + C). **Elemento neutro**: A + O = A. **Elemento opuesto**: A + (−A) = O.',
            '**Commutative** : A + B = B + A. **Associative** : (A + B) + C = A + (B + C). **Élément neutre** : A + O = A. **Élément opposé** : A + (−A) = O.'),
          { formula: 'A + B = B + A' },
        ),
        page(
          L('Igualdade de matrizes', 'Equal matrices', 'Igualdad de matrices', 'Égalité de matrices'),
          L('Duas matrizes são **iguais** quando têm a **mesma ordem** e **todos** os elementos correspondentes são iguais (aᵢⱼ = bᵢⱼ). Isso permite montar equações com incógnitas dentro da matriz!',
            'Two matrices are **equal** when they have the **same order** and **all** matching entries are equal (aᵢⱼ = bᵢⱼ). This lets you build equations with unknowns inside a matrix!',
            'Dos matrices son **iguales** cuando tienen el **mismo orden** y **todos** los elementos correspondientes son iguales (aᵢⱼ = bᵢⱼ). ¡Así se arman ecuaciones con incógnitas dentro de la matriz!',
            'Deux matrices sont **égales** si elles ont le **même ordre** et que **tous** les éléments correspondants sont égaux (aᵢⱼ = bᵢⱼ). On peut ainsi poser des équations avec des inconnues dans la matrice !'),
          { display: [M([['x', 2], [3, 'y']], 'A'), OP('='), M([[5, 2], [3, 8]], 'B')], formula: 'x = 5,  y = 8' },
        ),
      ],
    },
  ],

  /* ───────────── 3 · Escalares ───────────── */
  3: [
    {
      id: 1,
      icon: '⚡',
      title: L('Multiplicar por um escalar', 'Scalar multiplication', 'Multiplicar por un escalar', 'Multiplication par un scalaire'),
      pages: [
        page(
          L('k · A', 'k · A', 'k · A', 'k · A'),
          L('Um **escalar** é um número real. Em **k·A**, **todos** os elementos são multiplicados por k. A ordem da matriz não muda.',
            'A **scalar** is a real number. In **k·A**, **every** entry is multiplied by k. The order of the matrix does not change.',
            'Un **escalar** es un número real. En **k·A**, **todos** los elementos se multiplican por k. El orden de la matriz no cambia.',
            'Un **scalaire** est un nombre réel. Dans **k·A**, **tous** les éléments sont multipliés par k. L’ordre de la matrice ne change pas.'),
          { display: [T('3 ·'), M([[1, -2], [0, 4]], 'A'), OP('='), M([[3, -6], [0, 12]], '3A')] },
        ),
        page(
          L('Casos notáveis', 'Notable cases', 'Casos notables', 'Cas remarquables'),
          L('**k = 0** → matriz nula. **k = 1** → A não muda. **k = −1** → matriz oposta (−A). **k = 2** → dobra tudo.',
            '**k = 0** → zero matrix. **k = 1** → A unchanged. **k = −1** → the opposite matrix (−A). **k = 2** → doubles everything.',
            '**k = 0** → matriz nula. **k = 1** → A no cambia. **k = −1** → matriz opuesta (−A). **k = 2** → duplica todo.',
            '**k = 0** → matrice nulle. **k = 1** → A inchangée. **k = −1** → matrice opposée (−A). **k = 2** → tout est doublé.'),
          { display: [T('−1 ·'), M([[2, -5], [7, 0]], 'A'), OP('='), M([[-2, 5], [-7, 0]], '−A')] },
        ),
      ],
    },
    {
      id: 2,
      icon: '⚔️',
      title: L('Combinações lineares', 'Linear combinations', 'Combinaciones lineales', 'Combinaisons linéaires'),
      pages: [
        page(
          L('Somando escalares e matrizes', 'Mixing scalars and matrices', 'Mezclando escalares y matrices', 'Mélanger scalaires et matrices'),
          L('Combine tudo: **aA + bB**. Primeiro multiplique cada matriz pelo seu escalar; depois some elemento a elemento.',
            'Combine it all: **aA + bB**. First multiply each matrix by its scalar; then add entry by entry.',
            'Combina todo: **aA + bB**. Primero multiplica cada matriz por su escalar; luego suma elemento a elemento.',
            'Combinez tout : **aA + bB**. D’abord multipliez chaque matrice par son scalaire, puis additionnez terme à terme.'),
          { display: [T('2 ·'), M([[1, 2]], 'A'), OP('+'), T('3 ·'), M([[3, 0]], 'B'), OP('='), M([[11, 4]], '')] },
        ),
        page(
          L('Propriedades', 'Properties', 'Propiedades', 'Propriétés'),
          L('**k(A + B) = kA + kB** · **(a + b)A = aA + bA** · **a(bA) = (ab)A** · **1·A = A**. São as regras que permitem “fatorar” matrizes como números.',
            '**k(A + B) = kA + kB** · **(a + b)A = aA + bA** · **a(bA) = (ab)A** · **1·A = A**. They let you “factor” matrices like numbers.',
            '**k(A + B) = kA + kB** · **(a + b)A = aA + bA** · **a(bA) = (ab)A** · **1·A = A**. Permiten “factorizar” matrices como números.',
            '**k(A + B) = kA + kB** · **(a + b)A = aA + bA** · **a(bA) = (ab)A** · **1·A = A**. Elles permettent de « factoriser » les matrices comme des nombres.'),
          { formula: 'k(A + B) = kA + kB' },
        ),
      ],
    },
  ],

  /* ───────────── 4 · Torre dos Espelhos ───────────── */
  4: [
    {
      id: 1,
      icon: '🪞',
      title: L('A matriz transposta', 'The transpose', 'La matriz transpuesta', 'La matrice transposée'),
      pages: [
        page(
          L('Refletindo pela diagonal', 'Reflecting across the diagonal', 'Reflejando por la diagonal', 'Réfléchir selon la diagonale'),
          L('A **transposta Aᵀ** troca linhas por colunas: a linha i de A vira a **coluna i** de Aᵀ. Se A é m × n, então Aᵀ é **n × m**.',
            'The **transpose Aᵀ** swaps rows and columns: row i of A becomes **column i** of Aᵀ. If A is m × n, then Aᵀ is **n × m**.',
            'La **transpuesta Aᵀ** intercambia filas y columnas: la fila i de A pasa a ser la **columna i** de Aᵀ. Si A es m × n, Aᵀ es **n × m**.',
            'La **transposée Aᵀ** échange lignes et colonnes : la ligne i de A devient la **colonne i** de Aᵀ. Si A est m × n, Aᵀ est **n × m**.'),
          { display: [M([[1, 2, 3], [4, 5, 6]], 'A'), OP('→'), M([[1, 4], [2, 5], [3, 6]], 'Aᵀ')] },
        ),
        page(
          L('Em símbolos', 'In symbols', 'En símbolos', 'En symboles'),
          L('Cada elemento troca de endereço: **(Aᵀ)ᵢⱼ = aⱼᵢ**. A diagonal principal fica no lugar — ela é o próprio eixo do espelho.',
            'Every entry swaps address: **(Aᵀ)ᵢⱼ = aⱼᵢ**. The main diagonal stays in place — it is the mirror’s axis.',
            'Cada elemento cambia de dirección: **(Aᵀ)ᵢⱼ = aⱼᵢ**. La diagonal principal se queda en su sitio: es el eje del espejo.',
            'Chaque élément change d’adresse : **(Aᵀ)ᵢⱼ = aⱼᵢ**. La diagonale principale reste en place : c’est l’axe du miroir.'),
          { formula: '(Aᵀ)ᵢⱼ = aⱼᵢ' },
        ),
      ],
    },
    {
      id: 2,
      icon: '🔮',
      title: L('Propriedades do espelho', 'Mirror properties', 'Propiedades del espejo', 'Propriétés du miroir'),
      pages: [
        page(
          L('Quatro regras', 'Four rules', 'Cuatro reglas', 'Quatre règles'),
          L('**(Aᵀ)ᵀ = A** · **(A + B)ᵀ = Aᵀ + Bᵀ** · **(kA)ᵀ = k·Aᵀ** · **(A·B)ᵀ = Bᵀ·Aᵀ** (a ordem inverte!).',
            '**(Aᵀ)ᵀ = A** · **(A + B)ᵀ = Aᵀ + Bᵀ** · **(kA)ᵀ = k·Aᵀ** · **(A·B)ᵀ = Bᵀ·Aᵀ** (the order flips!).',
            '**(Aᵀ)ᵀ = A** · **(A + B)ᵀ = Aᵀ + Bᵀ** · **(kA)ᵀ = k·Aᵀ** · **(A·B)ᵀ = Bᵀ·Aᵀ** (¡el orden se invierte!).',
            '**(Aᵀ)ᵀ = A** · **(A + B)ᵀ = Aᵀ + Bᵀ** · **(kA)ᵀ = k·Aᵀ** · **(A·B)ᵀ = Bᵀ·Aᵀ** (l’ordre s’inverse !).'),
          { formula: '(A·B)ᵀ = Bᵀ·Aᵀ' },
        ),
      ],
    },
    {
      id: 3,
      icon: '⚖️',
      title: L('Simetria', 'Symmetry', 'Simetría', 'Symétrie'),
      pages: [
        page(
          L('Simétrica: A = Aᵀ', 'Symmetric: A = Aᵀ', 'Simétrica: A = Aᵀ', 'Symétrique : A = Aᵀ'),
          L('Uma matriz quadrada é **simétrica** se A = Aᵀ, isto é, **aᵢⱼ = aⱼᵢ**: os números se espelham em relação à diagonal principal.',
            'A square matrix is **symmetric** if A = Aᵀ, that is, **aᵢⱼ = aⱼᵢ**: numbers mirror across the main diagonal.',
            'Una matriz cuadrada es **simétrica** si A = Aᵀ, es decir, **aᵢⱼ = aⱼᵢ**: los números se reflejan respecto a la diagonal principal.',
            'Une matrice carrée est **symétrique** si A = Aᵀ, c’est-à-dire **aᵢⱼ = aⱼᵢ** : les nombres se reflètent par rapport à la diagonale principale.'),
          { display: [M([[1, 7, 3], [7, 2, 5], [3, 5, 9]], 'A')] },
        ),
        page(
          L('Antissimétrica: A = −Aᵀ', 'Antisymmetric: A = −Aᵀ', 'Antisimétrica: A = −Aᵀ', 'Antisymétrique : A = −Aᵀ'),
          L('Se **aᵢⱼ = −aⱼᵢ**, a matriz é **antissimétrica**. Consequência: a diagonal principal é toda **zero** (pois aᵢᵢ = −aᵢᵢ).',
            'If **aᵢⱼ = −aⱼᵢ**, the matrix is **antisymmetric**. Consequence: the main diagonal is all **zeros** (since aᵢᵢ = −aᵢᵢ).',
            'Si **aᵢⱼ = −aⱼᵢ**, la matriz es **antisimétrica**. Consecuencia: la diagonal principal es toda **cero** (pues aᵢᵢ = −aᵢᵢ).',
            'Si **aᵢⱼ = −aⱼᵢ**, la matrice est **antisymétrique**. Conséquence : la diagonale principale ne contient que des **zéros** (car aᵢᵢ = −aᵢᵢ).'),
          { display: [M([[0, 2, -4], [-2, 0, 6], [4, -6, 0]], 'A')] },
        ),
      ],
    },
  ],

  /* ───────────── 5 · Forja da Multiplicação ───────────── */
  5: [
    {
      id: 1,
      icon: '⚒️',
      title: L('Quando existe A·B', 'When A·B exists', 'Cuándo existe A·B', 'Quand A·B existe'),
      pages: [
        page(
          L('A regra do encaixe', 'The fitting rule', 'La regla del encaje', 'La règle d’emboîtement'),
          L('Para existir **A·B**, o nº de **colunas de A** deve ser igual ao nº de **linhas de B**. Se A é m × n e B é n × p, o resultado é **m × p**.',
            'For **A·B** to exist, the number of **columns of A** must equal the number of **rows of B**. If A is m × n and B is n × p, the result is **m × p**.',
            'Para que exista **A·B**, el n.º de **columnas de A** debe ser igual al n.º de **filas de B**. Si A es m × n y B es n × p, el resultado es **m × p**.',
            'Pour que **A·B** existe, le nombre de **colonnes de A** doit égaler le nombre de **lignes de B**. Si A est m × n et B est n × p, le résultat est **m × p**.'),
          { formula: '(m × n) · (n × p) = m × p' },
        ),
      ],
    },
    {
      id: 2,
      icon: '🔨',
      title: L('Linha × coluna', 'Row × column', 'Fila × columna', 'Ligne × colonne'),
      pages: [
        page(
          L('O golpe do martelo', 'The hammer strike', 'El golpe del martillo', 'Le coup de marteau'),
          L('Cada elemento (A·B)ᵢⱼ é a **linha i de A** multiplicada, termo a termo, pela **coluna j de B**, e somada. Ex.: (A·B)₁₁ = 1·5 + 2·7 = 19.',
            'Each entry (A·B)ᵢⱼ is **row i of A** multiplied term by term with **column j of B**, then summed. E.g. (A·B)₁₁ = 1·5 + 2·7 = 19.',
            'Cada elemento (A·B)ᵢⱼ es la **fila i de A** multiplicada término a término por la **columna j de B** y sumada. Ej.: (A·B)₁₁ = 1·5 + 2·7 = 19.',
            'Chaque élément (A·B)ᵢⱼ est la **ligne i de A** multipliée terme à terme par la **colonne j de B**, puis sommée. Ex. : (A·B)₁₁ = 1·5 + 2·7 = 19.'),
          { display: [M([[1, 2], [3, 4]], 'A', [0, 0]), OP('·'), M([[5, 6], [7, 8]], 'B'), OP('='), M([[19, 22], [43, 50]], 'A·B')] },
        ),
        page(
          L('Passo a passo', 'Step by step', 'Paso a paso', 'Pas à pas'),
          L('(A·B)₁₂ = 1·6 + 2·8 = 22 · (A·B)₂₁ = 3·5 + 4·7 = 43 · (A·B)₂₂ = 3·6 + 4·8 = 50. Cada casa exige uma “dança” de linha e coluna.',
            '(A·B)₁₂ = 1·6 + 2·8 = 22 · (A·B)₂₁ = 3·5 + 4·7 = 43 · (A·B)₂₂ = 3·6 + 4·8 = 50. Every cell needs a row-and-column “dance”.',
            '(A·B)₁₂ = 1·6 + 2·8 = 22 · (A·B)₂₁ = 3·5 + 4·7 = 43 · (A·B)₂₂ = 3·6 + 4·8 = 50. Cada celda pide una “danza” de fila y columna.',
            '(A·B)₁₂ = 1·6 + 2·8 = 22 · (A·B)₂₁ = 3·5 + 4·7 = 43 · (A·B)₂₂ = 3·6 + 4·8 = 50. Chaque case exige une « danse » ligne-colonne.'),
          { formula: '(A·B)ᵢⱼ = Σ aᵢₖ · bₖⱼ' },
        ),
      ],
    },
    {
      id: 3,
      icon: '🛡️',
      title: L('Propriedades do produto', 'Product properties', 'Propiedades del producto', 'Propriétés du produit'),
      pages: [
        page(
          L('Cuidado: não comuta!', 'Careful: it does not commute!', '¡Cuidado: no conmuta!', 'Attention : ça ne commute pas !'),
          L('Em geral, **A·B ≠ B·A** — a ordem importa! Valem: **(A·B)·C = A·(B·C)**, **A·(B + C) = A·B + A·C** e **A·I = I·A = A**.',
            'In general **A·B ≠ B·A** — order matters! These hold: **(A·B)·C = A·(B·C)**, **A·(B + C) = A·B + A·C** and **A·I = I·A = A**.',
            'En general **A·B ≠ B·A** — ¡el orden importa! Valen: **(A·B)·C = A·(B·C)**, **A·(B + C) = A·B + A·C** y **A·I = I·A = A**.',
            'En général **A·B ≠ B·A** — l’ordre compte ! Valent : **(A·B)·C = A·(B·C)**, **A·(B + C) = A·B + A·C** et **A·I = I·A = A**.'),
          { display: [M([[1, 2], [3, 4]], 'A'), OP('·'), M([[0, 1], [1, 0]], 'B'), OP('='), M([[2, 1], [4, 3]], 'AB')], formula: 'A·B ≠ B·A' },
        ),
      ],
    },
  ],

  /* ───────────── 6 · Labirinto dos Determinantes ───────────── */
  6: [
    {
      id: 1,
      icon: '🧭',
      title: L('Determinante 2 × 2', '2 × 2 determinant', 'Determinante 2 × 2', 'Déterminant 2 × 2'),
      pages: [
        page(
          L('ad − bc', 'ad − bc', 'ad − bc', 'ad − bc'),
          L('Só matrizes **quadradas** têm determinante. Em 2 × 2: **diagonal principal menos diagonal secundária**: det = a·d − b·c.',
            'Only **square** matrices have a determinant. For 2 × 2: **main diagonal minus secondary diagonal**: det = a·d − b·c.',
            'Solo las matrices **cuadradas** tienen determinante. En 2 × 2: **diagonal principal menos diagonal secundaria**: det = a·d − b·c.',
            'Seules les matrices **carrées** ont un déterminant. En 2 × 2 : **diagonale principale moins diagonale secondaire** : det = a·d − b·c.'),
          { display: [M([[3, 2], [1, 4]], 'A')], formula: 'det A = 3·4 − 2·1 = 10' },
        ),
      ],
    },
    {
      id: 2,
      icon: '🌀',
      title: L('Regra de Sarrus (3 × 3)', 'Sarrus’ rule (3 × 3)', 'Regla de Sarrus (3 × 3)', 'Règle de Sarrus (3 × 3)'),
      pages: [
        page(
          L('Repita e some', 'Repeat and add', 'Repite y suma', 'Répétez et additionnez'),
          L('Escreva as **duas primeiras colunas** à direita. Some os produtos das **3 diagonais descendentes** e subtraia os das **3 ascendentes**.',
            'Write the **first two columns** again on the right. Add the products of the **3 descending diagonals** and subtract those of the **3 ascending** ones.',
            'Escribe las **dos primeras columnas** de nuevo a la derecha. Suma los productos de las **3 diagonales descendentes** y resta los de las **3 ascendentes**.',
            'Réécrivez les **deux premières colonnes** à droite. Additionnez les produits des **3 diagonales descendantes** et soustrayez ceux des **3 montantes**.'),
          { display: [M([[1, 2, 3], [0, 1, 4], [5, 6, 0]], 'A')], formula: 'det A = 1' },
        ),
      ],
    },
    {
      id: 3,
      icon: '🚪',
      title: L('Propriedades do determinante', 'Determinant properties', 'Propiedades del determinante', 'Propriétés du déterminant'),
      pages: [
        page(
          L('As portas do labirinto', 'The maze doors', 'Las puertas del laberinto', 'Les portes du labyrinthe'),
          L('**det Aᵀ = det A** · **det(A·B) = det A · det B** · linha (ou coluna) toda **zero** ⇒ det = 0 · duas linhas **iguais** ⇒ det = 0 · **trocar duas linhas** troca o sinal · **det(kA) = kⁿ·det A**.',
            '**det Aᵀ = det A** · **det(A·B) = det A · det B** · a row (or column) of **zeros** ⇒ det = 0 · two **equal** rows ⇒ det = 0 · **swapping two rows** flips the sign · **det(kA) = kⁿ·det A**.',
            '**det Aᵀ = det A** · **det(A·B) = det A · det B** · fila (o columna) toda **cero** ⇒ det = 0 · dos filas **iguales** ⇒ det = 0 · **intercambiar dos filas** cambia el signo · **det(kA) = kⁿ·det A**.',
            '**det Aᵀ = det A** · **det(A·B) = det A · det B** · une ligne (ou colonne) de **zéros** ⇒ det = 0 · deux lignes **égales** ⇒ det = 0 · **échanger deux lignes** change le signe · **det(kA) = kⁿ·det A**.'),
          { formula: 'det(A·B) = det A · det B' },
        ),
      ],
    },
  ],

  /* ───────────── 7 · Trono da Inversa ───────────── */
  7: [
    {
      id: 1,
      icon: '👑',
      title: L('A matriz inversa', 'The inverse matrix', 'La matriz inversa', 'La matrice inverse'),
      pages: [
        page(
          L('O desfazedor de feitiços', 'The spell undoer', 'El deshacedor de hechizos', 'Le défaiseur de sorts'),
          L('A **inversa A⁻¹** desfaz A: **A·A⁻¹ = A⁻¹·A = I**. Só existe se A for quadrada e **det A ≠ 0** (matriz “invertível”). Se det = 0, A é **singular**.',
            'The **inverse A⁻¹** undoes A: **A·A⁻¹ = A⁻¹·A = I**. It exists only if A is square and **det A ≠ 0** (“invertible”). If det = 0, A is **singular**.',
            'La **inversa A⁻¹** deshace A: **A·A⁻¹ = A⁻¹·A = I**. Solo existe si A es cuadrada y **det A ≠ 0** (“invertible”). Si det = 0, A es **singular**.',
            'L’**inverse A⁻¹** défait A : **A·A⁻¹ = A⁻¹·A = I**. Elle n’existe que si A est carrée et **det A ≠ 0** (« inversible »). Si det = 0, A est **singulière**.'),
          { display: [M([[2, 1], [1, 1]], 'A'), OP('·'), M([[1, -1], [-1, 2]], 'A⁻¹'), OP('='), M([[1, 0], [0, 1]], 'I')] },
        ),
      ],
    },
    {
      id: 2,
      icon: '📐',
      title: L('Fórmula 2 × 2', '2 × 2 formula', 'Fórmula 2 × 2', 'Formule 2 × 2'),
      pages: [
        page(
          L('Troque, inverta, divida', 'Swap, flip, divide', 'Cambia, invierte, divide', 'Échangez, inversez, divisez'),
          L('Para A = [[a, b], [c, d]]: **A⁻¹ = (1/det A)·[[d, −b], [−c, a]]**. Troque **a ↔ d**, mude o sinal de **b e c** e divida tudo pelo determinante.',
            'For A = [[a, b], [c, d]]: **A⁻¹ = (1/det A)·[[d, −b], [−c, a]]**. Swap **a ↔ d**, flip the sign of **b and c**, and divide everything by the determinant.',
            'Para A = [[a, b], [c, d]]: **A⁻¹ = (1/det A)·[[d, −b], [−c, a]]**. Intercambia **a ↔ d**, cambia el signo de **b y c** y divide todo entre el determinante.',
            'Pour A = [[a, b], [c, d]] : **A⁻¹ = (1/det A)·[[d, −b], [−c, a]]**. Échangez **a ↔ d**, changez le signe de **b et c** et divisez tout par le déterminant.'),
          { display: [M([[2, 1], [1, 1]], 'A'), OP('→'), M([[1, -1], [-1, 2]], 'A⁻¹')], formula: 'det A = 2·1 − 1·1 = 1' },
        ),
      ],
    },
    {
      id: 3,
      icon: '🏰',
      title: L('Resolvendo sistemas', 'Solving systems', 'Resolviendo sistemas', 'Résoudre des systèmes'),
      pages: [
        page(
          L('A·X = B', 'A·X = B', 'A·X = B', 'A·X = B'),
          L('Um sistema linear vira uma equação matricial **A·X = B**. Se A é invertível, multiplique por A⁻¹: **X = A⁻¹·B**. O reino inteiro numa só conta!',
            'A linear system becomes a matrix equation **A·X = B**. If A is invertible, multiply by A⁻¹: **X = A⁻¹·B**. The whole realm in one computation!',
            'Un sistema lineal se vuelve una ecuación matricial **A·X = B**. Si A es invertible, multiplica por A⁻¹: **X = A⁻¹·B**. ¡Todo el reino en una sola cuenta!',
            'Un système linéaire devient une équation matricielle **A·X = B**. Si A est inversible, multipliez par A⁻¹ : **X = A⁻¹·B**. Tout le royaume en un seul calcul !'),
          { display: [M([[1, 1], [1, 2]], 'A'), OP('·'), T('X'), OP('='), M([[3], [5]], 'B')], formula: 'X = A⁻¹·B = (1, 2)' },
        ),
      ],
    },
  ],
};
