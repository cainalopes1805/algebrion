// Missões 4–7: exercícios curados + geradores procedurais (nunca repetem os números).
import { L } from '../i18n/core';

const TRUE = L('Verdadeiro', 'True', 'Verdadero', 'Vrai');
const FALSE = L('Falso', 'False', 'Falso', 'Faux');

const mc = (id, question, options, correctAnswer, explanation) => ({ id, type: 'multiple_choice', question, options, correctAnswer, explanation });
const tf = (id, question, value, explanation) => ({ id, type: 'true_false', question, options: [TRUE, FALSE], correctAnswer: value ? TRUE : FALSE, explanation });
const pairs = (id, question, list) => ({ id, type: 'match_pairs', question, pairs: list.map(([l, r]) => ({ l, r })) });
const steps = (id, question, list, explanation) => ({ id, type: 'order_steps', question, steps: list, explanation });

export const newMissions = [
  /* ═════════════════ 4 · Torre dos Espelhos ═════════════════ */
  {
    id: 4,
    title: L('A Torre dos Espelhos', 'The Tower of Mirrors', 'La Torre de los Espejos', 'La Tour des Miroirs'),
    subtitle: L('Transposta e Simetria', 'Transpose and Symmetry', 'Transpuesta y Simetría', 'Transposée et Symétrie'),
    icon: '🔮',
    biome: 'violet',
    mentor: 'witch',
    boss: 'bat',
    intro: [
      L('Shhh... Você ouve? Os espelhos sussurram. Nesta torre, cada matriz tem um reflexo: a sua **transposta**.',
        'Shhh... Do you hear it? The mirrors whisper. In this tower every matrix has a reflection: its **transpose**.',
        'Shhh... ¿Lo oyes? Los espejos susurran. En esta torre cada matriz tiene un reflejo: su **transpuesta**.',
        'Chut... Vous entendez ? Les miroirs murmurent. Dans cette tour, chaque matrice a un reflet : sa **transposée**.'),
      L('Trocar linhas por colunas parece pouco, mas é a chave da simetria. Cuidado com o Morcego Espelhado no topo!',
        'Swapping rows and columns seems small, yet it is the key to symmetry. Beware the Mirror Bat at the top!',
        'Cambiar filas por columnas parece poco, pero es la clave de la simetría. ¡Cuidado con el Murciélago Espejado en la cima!',
        'Échanger lignes et colonnes semble anodin, mais c’est la clé de la symétrie. Méfiez-vous de la Chauve-souris Miroir au sommet !'),
    ],
    levels: [
      {
        id: 1,
        title: L('O Reflexo', 'The Reflection', 'El Reflejo', 'Le Reflet'),
        description: L('Ordem e elementos da transposta.', 'Order and entries of the transpose.', 'Orden y elementos de la transpuesta.', 'Ordre et éléments de la transposée.'),
        xpReward: 40, goldReward: 30,
        activities: [
          mc('4-1-a', L('Se Aᵀ tem ordem 3 × 2, qual a ordem de A?', 'If Aᵀ has order 3 × 2, what is the order of A?', 'Si Aᵀ tiene orden 3 × 2, ¿cuál es el orden de A?', 'Si Aᵀ est d’ordre 3 × 2, quel est l’ordre de A ?'),
            ['2 × 3', '3 × 2', '3 × 3', '2 × 2'], '2 × 3',
            L('A e Aᵀ têm ordens “invertidas”.', 'A and Aᵀ have “swapped” orders.', 'A y Aᵀ tienen órdenes “invertidos”.', 'A et Aᵀ ont des ordres « inversés ».')),
          pairs('4-1-b', L('Associe cada matriz à ordem da sua transposta:', 'Match each matrix to the order of its transpose:', 'Asocia cada matriz con el orden de su transpuesta:', 'Associez chaque matrice à l’ordre de sa transposée :'), [
            [L('A é 1 × 4', 'A is 1 × 4', 'A es 1 × 4', 'A est 1 × 4'), 'Aᵀ: 4 × 1'],
            [L('A é 2 × 5', 'A is 2 × 5', 'A es 2 × 5', 'A est 2 × 5'), 'Aᵀ: 5 × 2'],
            [L('A é 3 × 3', 'A is 3 × 3', 'A es 3 × 3', 'A est 3 × 3'), 'Aᵀ: 3 × 3'],
          ]),
        ],
        gen: [['transposeDim', 3], ['transposeMatrix', 3]],
      },
      {
        id: 2,
        title: L('Propriedades do Espelho', 'Mirror Properties', 'Propiedades del Espejo', 'Propriétés du Miroir'),
        description: L('(Aᵀ)ᵀ, soma e produto transpostos.', '(Aᵀ)ᵀ, transposed sums and products.', '(Aᵀ)ᵀ, sumas y productos traspuestos.', '(Aᵀ)ᵀ, sommes et produits transposés.'),
        xpReward: 45, goldReward: 35,
        activities: [
          tf('4-2-a', L('(Aᵀ)ᵀ = A para qualquer matriz A.', '(Aᵀ)ᵀ = A for any matrix A.', '(Aᵀ)ᵀ = A para cualquier matriz A.', '(Aᵀ)ᵀ = A pour toute matrice A.'), true,
            L('Refletir duas vezes devolve a matriz original.', 'Reflecting twice returns the original.', 'Reflejar dos veces devuelve la original.', 'Réfléchir deux fois redonne l’originale.')),
          tf('4-2-b', L('(A·B)ᵀ = Aᵀ·Bᵀ.', '(A·B)ᵀ = Aᵀ·Bᵀ.', '(A·B)ᵀ = Aᵀ·Bᵀ.', '(A·B)ᵀ = Aᵀ·Bᵀ.'), false,
            L('Falso! O correto é (A·B)ᵀ = Bᵀ·Aᵀ — a ordem inverte.', 'False! The right rule is (A·B)ᵀ = Bᵀ·Aᵀ — the order flips.', '¡Falso! Lo correcto es (A·B)ᵀ = Bᵀ·Aᵀ: el orden se invierte.', 'Faux ! La bonne règle est (A·B)ᵀ = Bᵀ·Aᵀ — l’ordre s’inverse.')),
          pairs('4-2-c', L('Associe cada propriedade à sua expressão:', 'Match each property to its expression:', 'Asocia cada propiedad con su expresión:', 'Associez chaque propriété à son expression :'), [
            [L('Soma', 'Sum', 'Suma', 'Somme'), '(A + B)ᵀ = Aᵀ + Bᵀ'],
            [L('Escalar', 'Scalar', 'Escalar', 'Scalaire'), '(kA)ᵀ = k·Aᵀ'],
            [L('Produto', 'Product', 'Producto', 'Produit'), '(A·B)ᵀ = Bᵀ·Aᵀ'],
            [L('Dupla', 'Double', 'Doble', 'Double'), '(Aᵀ)ᵀ = A'],
          ]),
        ],
        gen: [['transposeMatrix', 2], ['combo', 2], ['symmetric', 1]],
      },
      {
        id: 3,
        title: L('Simetria Perfeita', 'Perfect Symmetry', 'Simetría Perfecta', 'Symétrie Parfaite'),
        description: L('Simétricas e antissimétricas.', 'Symmetric and antisymmetric matrices.', 'Simétricas y antisimétricas.', 'Symétriques et antisymétriques.'),
        xpReward: 50, goldReward: 40,
        activities: [
          mc('4-3-a', L('Numa matriz antissimétrica (A = −Aᵀ), a diagonal principal é...', 'In an antisymmetric matrix (A = −Aᵀ), the main diagonal is...', 'En una matriz antisimétrica (A = −Aᵀ), la diagonal principal es...', 'Dans une matrice antisymétrique (A = −Aᵀ), la diagonale principale est...'),
            [L('toda zero', 'all zeros', 'toda cero', 'toute nulle'), L('toda 1', 'all ones', 'toda 1', 'toute à 1'), L('positiva', 'positive', 'positiva', 'positive'), L('simétrica', 'symmetric', 'simétrica', 'symétrique')],
            L('toda zero', 'all zeros', 'toda cero', 'toute nulle'),
            L('aᵢᵢ = −aᵢᵢ ⇒ 2aᵢᵢ = 0 ⇒ aᵢᵢ = 0.', 'aᵢᵢ = −aᵢᵢ ⇒ 2aᵢᵢ = 0 ⇒ aᵢᵢ = 0.', 'aᵢᵢ = −aᵢᵢ ⇒ 2aᵢᵢ = 0 ⇒ aᵢᵢ = 0.', 'aᵢᵢ = −aᵢᵢ ⇒ 2aᵢᵢ = 0 ⇒ aᵢᵢ = 0.')),
          steps('4-3-b', L('Ordene os passos para testar se uma matriz é simétrica:', 'Order the steps to test whether a matrix is symmetric:', 'Ordena los pasos para comprobar si una matriz es simétrica:', 'Ordonnez les étapes pour tester si une matrice est symétrique :'), [
            L('Verifique que a matriz é quadrada', 'Check the matrix is square', 'Comprueba que la matriz es cuadrada', 'Vérifiez que la matrice est carrée'),
            L('Escreva a transposta Aᵀ', 'Write the transpose Aᵀ', 'Escribe la transpuesta Aᵀ', 'Écrivez la transposée Aᵀ'),
            L('Compare A e Aᵀ elemento a elemento', 'Compare A and Aᵀ entry by entry', 'Compara A y Aᵀ elemento a elemento', 'Comparez A et Aᵀ terme à terme'),
            L('Se todos coincidem, A é simétrica', 'If all match, A is symmetric', 'Si todos coinciden, A es simétrica', 'Si tout coïncide, A est symétrique'),
          ], L('Quadrada → transposta → comparar → concluir.', 'Square → transpose → compare → conclude.', 'Cuadrada → transpuesta → comparar → concluir.', 'Carrée → transposée → comparer → conclure.')),
        ],
        gen: [['symmetric', 4], ['trace', 1], ['transposeMatrix', 1]],
      },
    ],
    bossPlan: [['transposeDim', 2], ['transposeMatrix', 3], ['symmetric', 2], ['combo', 1]],
  },

  /* ═════════════════ 5 · Forja da Multiplicação ═════════════════ */
  {
    id: 5,
    title: L('A Forja da Multiplicação', 'The Forge of Multiplication', 'La Forja de la Multiplicación', 'La Forge de la Multiplication'),
    subtitle: L('Produto de Matrizes', 'Matrix Product', 'Producto de Matrices', 'Produit de Matrices'),
    icon: '⚒️',
    biome: 'ember',
    mentor: 'dwarf',
    boss: 'dragon',
    intro: [
      L('Bah! Multiplicar matrizes não é multiplicar elemento por elemento, jovem! É forja de verdade: **linha de A** contra **coluna de B**!',
        'Bah! Multiplying matrices is not entry-by-entry, youngster! It is true forging: **row of A** against **column of B**!',
        '¡Bah! Multiplicar matrices no es elemento por elemento, joven. ¡Es forja de verdad: **fila de A** contra **columna de B**!',
        'Bah ! Multiplier des matrices, ce n’est pas terme à terme, jeune ! C’est de la vraie forge : **ligne de A** contre **colonne de B** !'),
      L('E lembre: A·B quase nunca é igual a B·A. O dragão da forja adora quem esquece isso.',
        'And remember: A·B is almost never equal to B·A. The forge dragon loves those who forget it.',
        'Y recuerda: A·B casi nunca es igual a B·A. Al dragón de la forja le encantan quienes lo olvidan.',
        'Et souvenez-vous : A·B n’est presque jamais égal à B·A. Le dragon de la forge adore ceux qui l’oublient.'),
    ],
    levels: [
      {
        id: 1,
        title: L('A Regra da Forja', 'The Forge Rule', 'La Regla de la Forja', 'La Règle de la Forge'),
        description: L('Quando o produto existe e qual a sua ordem.', 'When the product exists and its order.', 'Cuándo existe el producto y cuál es su orden.', 'Quand le produit existe et son ordre.'),
        xpReward: 45, goldReward: 35,
        activities: [
          tf('5-1-a', L('A·B sempre é igual a B·A.', 'A·B always equals B·A.', 'A·B siempre es igual a B·A.', 'A·B est toujours égal à B·A.'), false,
            L('Falso! O produto de matrizes não é comutativo.', 'False! Matrix product is not commutative.', '¡Falso! El producto de matrices no es conmutativo.', 'Faux ! Le produit matriciel n’est pas commutatif.')),
          mc('5-1-b', L('Qual condição permite calcular A·B?', 'Which condition lets us compute A·B?', '¿Qué condición permite calcular A·B?', 'Quelle condition permet de calculer A·B ?'),
            [L('colunas de A = linhas de B', 'columns of A = rows of B', 'columnas de A = filas de B', 'colonnes de A = lignes de B'), L('linhas de A = linhas de B', 'rows of A = rows of B', 'filas de A = filas de B', 'lignes de A = lignes de B'), L('colunas de A = colunas de B', 'columns of A = columns of B', 'columnas de A = columnas de B', 'colonnes de A = colonnes de B'), L('A e B com ordens iguais', 'A and B of equal order', 'A y B con órdenes iguales', 'A et B de même ordre')],
            L('colunas de A = linhas de B', 'columns of A = rows of B', 'columnas de A = filas de B', 'colonnes de A = lignes de B'),
            L('O “miolo” n deve coincidir: (m × n)·(n × p).', 'The “inner” n must match: (m × n)·(n × p).', 'El “interior” n debe coincidir: (m × n)·(n × p).', 'Le « milieu » n doit coïncider : (m × n)·(n × p).')),
        ],
        gen: [['mulOrder', 4], ['sumPossible', 1]],
      },
      {
        id: 2,
        title: L('Golpe do Martelo', 'Hammer Strike', 'Golpe del Martillo', 'Coup de Marteau'),
        description: L('Calcule elementos do produto com linha × coluna.', 'Compute product entries with row × column.', 'Calcula elementos del producto con fila × columna.', 'Calculez les éléments du produit avec ligne × colonne.'),
        xpReward: 50, goldReward: 40,
        activities: [
          steps('5-2-a', L('Ordene o algoritmo para calcular (A·B)ᵢⱼ:', 'Order the algorithm to compute (A·B)ᵢⱼ:', 'Ordena el algoritmo para calcular (A·B)ᵢⱼ:', 'Ordonnez l’algorithme pour calculer (A·B)ᵢⱼ :'), [
            L('Pegue a linha i de A', 'Take row i of A', 'Toma la fila i de A', 'Prenez la ligne i de A'),
            L('Pegue a coluna j de B', 'Take column j of B', 'Toma la columna j de B', 'Prenez la colonne j de B'),
            L('Multiplique os pares na mesma posição', 'Multiply the pairs in the same position', 'Multiplica los pares en la misma posición', 'Multipliez les paires de même position'),
            L('Some todos os produtos', 'Add all the products', 'Suma todos los productos', 'Additionnez tous les produits'),
          ], L('Linha, coluna, multiplicar, somar.', 'Row, column, multiply, add.', 'Fila, columna, multiplicar, sumar.', 'Ligne, colonne, multiplier, additionner.')),
        ],
        gen: [['mulCell', 4], ['mulVector', 2]],
      },
      {
        id: 3,
        title: L('A Obra-Prima', 'The Masterpiece', 'La Obra Maestra', 'Le Chef-d’œuvre'),
        description: L('Produtos completos e propriedades.', 'Full products and properties.', 'Productos completos y propiedades.', 'Produits complets et propriétés.'),
        xpReward: 55, goldReward: 45,
        activities: [
          tf('5-3-a', L('Para qualquer matriz quadrada A e a identidade I de mesma ordem, A·I = A.', 'For any square matrix A and identity I of the same order, A·I = A.', 'Para cualquier matriz cuadrada A e identidad I del mismo orden, A·I = A.', 'Pour toute matrice carrée A et l’identité I de même ordre, A·I = A.'), true,
            L('I é o elemento neutro do produto.', 'I is the neutral element of the product.', 'I es el elemento neutro del producto.', 'I est l’élément neutre du produit.')),
          pairs('5-3-b', L('Associe cada propriedade ao seu nome:', 'Match each property to its name:', 'Asocia cada propiedad con su nombre:', 'Associez chaque propriété à son nom :'), [
            ['(A·B)·C = A·(B·C)', L('Associativa', 'Associative', 'Asociativa', 'Associative')],
            ['A·(B + C) = A·B + A·C', L('Distributiva', 'Distributive', 'Distributiva', 'Distributive')],
            ['A·I = A', L('Elemento neutro', 'Neutral element', 'Elemento neutro', 'Élément neutre')],
            ['A·B ≠ B·A', L('Não comutativa', 'Not commutative', 'No conmutativa', 'Non commutative')],
          ]),
        ],
        gen: [['mulMatrix', 4], ['mulCell', 2]],
      },
    ],
    bossPlan: [['mulOrder', 2], ['mulCell', 2], ['mulMatrix', 3], ['mulVector', 1]],
  },

  /* ═════════════════ 6 · Labirinto dos Determinantes ═════════════════ */
  {
    id: 6,
    title: L('O Labirinto dos Determinantes', 'The Labyrinth of Determinants', 'El Laberinto de los Determinantes', 'Le Labyrinthe des Déterminants'),
    subtitle: L('Determinantes 2×2 e 3×3', '2×2 and 3×3 Determinants', 'Determinantes 2×2 y 3×3', 'Déterminants 2×2 et 3×3'),
    icon: '🧭',
    biome: 'teal',
    mentor: 'oracle',
    boss: 'spider',
    intro: [
      L('Você chegou ao labirinto. Cada matriz quadrada esconde um número único, o **determinante**, que diz se o caminho tem saída.',
        'You have reached the labyrinth. Every square matrix hides a single number, the **determinant**, which tells whether the path has an exit.',
        'Has llegado al laberinto. Cada matriz cuadrada esconde un número único, el **determinante**, que dice si el camino tiene salida.',
        'Vous voici au labyrinthe. Chaque matrice carrée cache un nombre unique, le **déterminant**, qui dit si le chemin a une issue.'),
      L('Determinante zero significa parede. Diferente de zero, porta aberta. A Aranha Sombria guarda o centro.',
        'A zero determinant means a wall. Nonzero, an open door. The Shadow Spider guards the center.',
        'Determinante cero significa pared. Distinto de cero, puerta abierta. La Araña Sombría guarda el centro.',
        'Déterminant nul : un mur. Non nul : une porte ouverte. L’Araignée d’Ombre garde le centre.'),
    ],
    levels: [
      {
        id: 1,
        title: L('O Corredor 2 × 2', 'The 2 × 2 Corridor', 'El Pasillo 2 × 2', 'Le Couloir 2 × 2'),
        description: L('ad − bc em ação.', 'ad − bc in action.', 'ad − bc en acción.', 'ad − bc en action.'),
        xpReward: 50, goldReward: 40,
        activities: [
          tf('6-1-a', L('O determinante da matriz identidade I₂ é 1.', 'The determinant of the identity I₂ is 1.', 'El determinante de la identidad I₂ es 1.', 'Le déterminant de l’identité I₂ vaut 1.'), true,
            L('det I = 1·1 − 0·0 = 1.', 'det I = 1·1 − 0·0 = 1.', 'det I = 1·1 − 0·0 = 1.', 'det I = 1·1 − 0·0 = 1.')),
          mc('6-1-b', L('Só existe determinante para matrizes...', 'Only which matrices have a determinant?', 'Solo tienen determinante las matrices...', 'Seules ont un déterminant les matrices...'),
            [L('quadradas', 'square', 'cuadradas', 'carrées'), L('linha', 'row', 'fila', 'ligne'), L('coluna', 'column', 'columna', 'colonne'), L('quaisquer', 'any', 'cualesquiera', 'quelconques')],
            L('quadradas', 'square', 'cuadradas', 'carrées'),
            L('Precisamos do mesmo número de linhas e colunas.', 'We need equal numbers of rows and columns.', 'Necesitamos igual número de filas y columnas.', 'Il faut autant de lignes que de colonnes.')),
        ],
        gen: [['det2', 5]],
      },
      {
        id: 2,
        title: L('Sarrus, o Guia', 'Sarrus, the Guide', 'Sarrus, el Guía', 'Sarrus, le Guide'),
        description: L('Determinantes de ordem 3 pela regra de Sarrus.', 'Order-3 determinants via Sarrus’ rule.', 'Determinantes de orden 3 con la regla de Sarrus.', 'Déterminants d’ordre 3 par la règle de Sarrus.'),
        xpReward: 55, goldReward: 45,
        activities: [
          steps('6-2-a', L('Ordene a Regra de Sarrus:', 'Order Sarrus’ rule:', 'Ordena la regla de Sarrus:', 'Ordonnez la règle de Sarrus :'), [
            L('Repita as 2 primeiras colunas à direita', 'Repeat the first 2 columns on the right', 'Repite las 2 primeras columnas a la derecha', 'Répétez les 2 premières colonnes à droite'),
            L('Multiplique as 3 diagonais descendentes e some', 'Multiply the 3 descending diagonals and add', 'Multiplica las 3 diagonales descendentes y suma', 'Multipliez les 3 diagonales descendantes et additionnez'),
            L('Multiplique as 3 diagonais ascendentes', 'Multiply the 3 ascending diagonals', 'Multiplica las 3 diagonales ascendentes', 'Multipliez les 3 diagonales montantes'),
            L('Subtraia: descendentes − ascendentes', 'Subtract: descending − ascending', 'Resta: descendentes − ascendentes', 'Soustrayez : descendantes − montantes'),
          ], L('Repetir, somar as descendentes, calcular as ascendentes, subtrair.', 'Repeat, add descending, compute ascending, subtract.', 'Repetir, sumar descendentes, calcular ascendentes, restar.', 'Répéter, additionner les descendantes, calculer les montantes, soustraire.')),
        ],
        gen: [['det3', 4], ['det2', 2]],
      },
      {
        id: 3,
        title: L('Portas e Propriedades', 'Doors and Properties', 'Puertas y Propiedades', 'Portes et Propriétés'),
        description: L('Propriedades que poupam contas.', 'Properties that save computation.', 'Propiedades que ahorran cuentas.', 'Propriétés qui économisent des calculs.'),
        xpReward: 60, goldReward: 50,
        activities: [
          tf('6-3-a', L('det(A·B) = det(A) · det(B).', 'det(A·B) = det(A) · det(B).', 'det(A·B) = det(A) · det(B).', 'det(A·B) = det(A) · det(B).'), true,
            L('O determinante é multiplicativo.', 'The determinant is multiplicative.', 'El determinante es multiplicativo.', 'Le déterminant est multiplicatif.')),
          mc('6-3-b', L('Se uma matriz tem uma linha inteira de zeros, seu determinante é...', 'If a matrix has a whole row of zeros, its determinant is...', 'Si una matriz tiene una fila entera de ceros, su determinante es...', 'Si une matrice a une ligne entière de zéros, son déterminant est...'),
            ['0', '1', '−1', L('depende', 'it depends', 'depende', 'ça dépend')], '0',
            L('Toda parcela do desenvolvimento usa um zero, logo det = 0.', 'Every term includes a zero, so det = 0.', 'Cada término incluye un cero, luego det = 0.', 'Chaque terme contient un zéro, donc det = 0.')),
        ],
        gen: [['detScalar', 2], ['det3', 2], ['invertible', 2]],
      },
    ],
    bossPlan: [['det2', 3], ['det3', 2], ['invertible', 2], ['detScalar', 1]],
  },

  /* ═════════════════ 7 · Trono da Inversa ═════════════════ */
  {
    id: 7,
    title: L('O Trono da Inversa', 'The Throne of the Inverse', 'El Trono de la Inversa', 'Le Trône de l’Inverse'),
    subtitle: L('Matriz Inversa e Sistemas', 'Inverse Matrix and Systems', 'Matriz Inversa y Sistemas', 'Matrice Inverse et Systèmes'),
    icon: '👑',
    biome: 'crimson',
    mentor: 'queen',
    boss: 'lich',
    intro: [
      L('Bem-vindo ao Trono, viajante. Aqui governa a **inversa**: aquela que desfaz qualquer feitiço, se o determinante permitir.',
        'Welcome to the Throne, traveler. Here rules the **inverse**: the one that undoes any spell, if the determinant allows.',
        'Bienvenido al Trono, viajero. Aquí gobierna la **inversa**: la que deshace cualquier hechizo, si el determinante lo permite.',
        'Bienvenue au Trône, voyageur. Ici règne l’**inverse** : celle qui défait tout sort, si le déterminant le permet.'),
      L('Prove que domina todo o reino: derrote o Lich Inverso e receba a coroa de Mestre das Matrizes.',
        'Prove you master the whole realm: defeat the Inverse Lich and receive the crown of Matrix Master.',
        'Demuestra que dominas todo el reino: derrota al Lich Inverso y recibe la corona de Maestro de las Matrices.',
        'Prouvez que vous maîtrisez le royaume : vainquez le Lich Inverse et recevez la couronne de Maître des Matrices.'),
    ],
    levels: [
      {
        id: 1,
        title: L('A Condição do Trono', 'The Throne’s Condition', 'La Condición del Trono', 'La Condition du Trône'),
        description: L('Quando uma matriz é invertível.', 'When a matrix is invertible.', 'Cuándo una matriz es invertible.', 'Quand une matrice est inversible.'),
        xpReward: 55, goldReward: 45,
        activities: [
          mc('7-1-a', L('Se A é invertível, A·A⁻¹ é igual a...', 'If A is invertible, A·A⁻¹ equals...', 'Si A es invertible, A·A⁻¹ es igual a...', 'Si A est inversible, A·A⁻¹ est égal à...'),
            [L('a identidade I', 'the identity I', 'la identidad I', 'l’identité I'), L('a matriz nula', 'the zero matrix', 'la matriz nula', 'la matrice nulle'), 'A', 'Aᵀ'],
            L('a identidade I', 'the identity I', 'la identidad I', 'l’identité I'),
            L('Definição: a inversa desfaz A, resultando em I.', 'By definition the inverse undoes A, giving I.', 'Por definición, la inversa deshace A y da I.', 'Par définition, l’inverse défait A et donne I.')),
          tf('7-1-b', L('Toda matriz quadrada possui inversa.', 'Every square matrix has an inverse.', 'Toda matriz cuadrada tiene inversa.', 'Toute matrice carrée a une inverse.'), false,
            L('Falso! Só as de determinante diferente de zero.', 'False! Only those with a nonzero determinant.', '¡Falso! Solo las de determinante distinto de cero.', 'Faux ! Seulement celles de déterminant non nul.')),
        ],
        gen: [['invertible', 5]],
      },
      {
        id: 2,
        title: L('A Fórmula Real', 'The Royal Formula', 'La Fórmula Real', 'La Formule Royale'),
        description: L('Calcule inversas 2 × 2.', 'Compute 2 × 2 inverses.', 'Calcula inversas 2 × 2.', 'Calculez des inverses 2 × 2.'),
        xpReward: 60, goldReward: 50,
        activities: [
          steps('7-2-a', L('Ordene o cálculo da inversa 2 × 2:', 'Order the 2 × 2 inverse computation:', 'Ordena el cálculo de la inversa 2 × 2:', 'Ordonnez le calcul de l’inverse 2 × 2 :'), [
            L('Calcule o determinante ad − bc', 'Compute the determinant ad − bc', 'Calcula el determinante ad − bc', 'Calculez le déterminant ad − bc'),
            L('Confirme que det ≠ 0', 'Confirm det ≠ 0', 'Confirma que det ≠ 0', 'Vérifiez que det ≠ 0'),
            L('Troque a e d; mude o sinal de b e c', 'Swap a and d; flip the signs of b and c', 'Intercambia a y d; cambia el signo de b y c', 'Échangez a et d ; changez le signe de b et c'),
            L('Divida tudo pelo determinante', 'Divide everything by the determinant', 'Divide todo entre el determinante', 'Divisez tout par le déterminant'),
          ], L('Determinante, checagem, adjunta, divisão.', 'Determinant, check, adjugate, division.', 'Determinante, comprobación, adjunta, división.', 'Déterminant, vérification, adjointe, division.')),
        ],
        gen: [['inv2', 5], ['det2', 1]],
      },
      {
        id: 3,
        title: L('Sistemas do Reino', 'Systems of the Realm', 'Sistemas del Reino', 'Systèmes du Royaume'),
        description: L('Resolva A·X = B com a inversa.', 'Solve A·X = B with the inverse.', 'Resuelve A·X = B con la inversa.', 'Résolvez A·X = B avec l’inverse.'),
        xpReward: 65, goldReward: 55,
        activities: [
          mc('7-3-a', L('Se A·X = B e A é invertível, então X =', 'If A·X = B and A is invertible, then X =', 'Si A·X = B y A es invertible, entonces X =', 'Si A·X = B et A est inversible, alors X ='),
            ['A⁻¹·B', 'B·A⁻¹', 'B − A', 'Aᵀ·B'], 'A⁻¹·B',
            L('Multiplique ambos os lados, à esquerda, por A⁻¹.', 'Multiply both sides, on the left, by A⁻¹.', 'Multiplica ambos lados, por la izquierda, por A⁻¹.', 'Multipliez les deux côtés, à gauche, par A⁻¹.')),
        ],
        gen: [['solve', 5], ['invertible', 1]],
      },
    ],
    bossPlan: [['inv2', 3], ['solve', 2], ['invertible', 1], ['mulMatrix', 1], ['detScalar', 1]],
  },
];
