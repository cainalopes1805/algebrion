export const missionsData = [
  {
    id: 1,
    title: {
      pt: 'Fundamentos dos Grimórios',
      en: 'Grimoire Fundamentals',
      es: 'Fundamentos de los Grimorios',
      fr: 'Fondements des Grimoires',
    },
    subtitle: {
      pt: 'Dimensões, Elementos e Notação',
      en: 'Dimensions, Elements, and Notation',
      es: 'Dimensiones, Elementos y Notación',
      fr: 'Dimensions, Éléments et Notation',
    },
    icon: '📜',
    biome: 'emerald',
    character: 'Mestre Arcano',
    dialogues: {
      intro: [
        {
          speaker: 'Mestre Arcano',
          avatar: '🧙‍♂️',
          text: {
            pt: 'Saudações, jovem mago! Matrizes são as tábuas mágicas do cosmos: arranjos retangulares de números dispostos em linhas (horizontais) e colunas (verticais).',
            en: 'Greetings, young mage! Matrices are the magical tables of the cosmos: rectangular arrays of numbers arranged in rows (horizontal) and columns (vertical).',
          },
        },
        {
          speaker: 'Mestre Arcano',
          avatar: '🧙‍♂️',
          text: {
            pt: 'Uma matriz com m linhas e n colunas é dita de ordem m × n. Cada elemento é identificado por a_ij, onde i é a linha e j é a coluna.',
            en: 'A matrix with m rows and n columns is said to have order m × n. Each element is denoted by a_ij, where i is the row and j is the column.',
          },
        },
      ],
    },
    levels: [
      {
        id: 1,
        title: {
          pt: 'Fase 1: Dimensão e Notação m × n',
          en: 'Stage 1: Dimensions and m × n Notation',
        },
        description: {
          pt: 'Domine a identificação de linhas e colunas.',
          en: 'Master identifying rows and columns.',
        },
        xpReward: 30,
        coinsReward: 20,
        activities: [
          {
            id: '1-1-1',
            type: 'matrix_dimension',
            question: {
              pt: 'Observe o grimório abaixo. Qual é a ordem (dimensão) desta matriz?',
              en: 'Observe the grimoire below. What is the order (dimension) of this matrix?',
            },
            matrix: [
              [3, 7, 1],
              [9, 0, 4],
            ],
            options: ['2 × 3', '3 × 2', '2 × 2', '6 × 1'],
            correctAnswer: '2 × 3',
            explanation: {
              pt: 'A matriz possui 2 linhas horizontais e 3 colunas verticais, portanto sua ordem é 2 × 3 (linhas × colunas).',
              en: 'The matrix has 2 horizontal rows and 3 vertical columns, so its order is 2 × 3.',
            },
          },
          {
            id: '1-1-2',
            type: 'cell_click',
            question: {
              pt: 'Toque diretamente no elemento a₁₂ (1ª linha, 2ª coluna) da matriz:',
              en: 'Touch the element a₁₂ (row 1, column 2) in the matrix:',
            },
            matrix: [
              [5, 9],
              [2, 8],
            ],
            targetCell: { r: 0, c: 1 }, // row 0, col 1 in 0-indexed = row 1, col 2
            explanation: {
              pt: 'O elemento a₁₂ está na linha 1 e coluna 2. O valor correto é 9.',
              en: 'Element a₁₂ is in row 1 and column 2. The correct value is 9.',
            },
          },
          {
            id: '1-1-3',
            type: 'multiple_choice',
            question: {
              pt: 'Quantos elementos possui uma matriz de ordem 3 × 4?',
              en: 'How many elements does a 3 × 4 matrix have?',
            },
            options: ['12 elementos', '7 elementos', '1 elemento', '14 elementos'],
            correctAnswer: '12 elementos',
            explanation: {
              pt: 'O número total de elementos é o produto do número de linhas pelo de colunas: 3 × 4 = 12.',
              en: 'The total number of elements is 3 × 4 = 12.',
            },
          },
          {
            id: '1-1-4',
            type: 'matrix_dimension',
            question: {
              pt: 'Qual é a ordem desta Matriz Coluna?',
              en: 'What is the order of this Column Matrix?',
            },
            matrix: [[4], [1], [6]],
            options: ['3 × 1', '1 × 3', '3 × 3', '1 × 1'],
            correctAnswer: '3 × 1',
            explanation: {
              pt: 'Possui 3 linhas e apenas 1 coluna. Por isso é chamada de Matriz Coluna.',
              en: 'It has 3 rows and 1 column. Hence, it is a Column Matrix.',
            },
          },
          {
            id: '1-1-5',
            type: 'cell_click',
            question: {
              pt: 'Toque no elemento a₂₁ (2ª linha, 1ª coluna):',
              en: 'Touch the element a₂₁ (row 2, column 1):',
            },
            matrix: [
              [10, 20, 30],
              [40, 50, 60],
              [70, 80, 90],
            ],
            targetCell: { r: 1, c: 0 },
            explanation: {
              pt: 'Linha 2, Coluna 1 corresponde ao valor 40.',
              en: 'Row 2, Column 1 corresponds to value 40.',
            },
          },
          {
            id: '1-1-6',
            type: 'true_false',
            question: {
              pt: 'Na notação a_ij, o índice i sempre indica a coluna e j indica a linha.',
              en: 'In notation a_ij, the index i always represents the column and j the row.',
            },
            options: ['Verdadeiro', 'Falso'],
            correctAnswer: 'Falso',
            explanation: {
              pt: 'Falso! Lembre-se da regra mnemônica: "LiCo" -> Linha primeiro (i), Coluna depois (j).',
              en: 'False! Row comes first (i), Column second (j).',
            },
          },
          {
            id: '1-1-7',
            type: 'matrix_dimension',
            question: {
              pt: 'Qual é a ordem desta Matriz Linha?',
              en: 'What is the order of this Row Matrix?',
            },
            matrix: [[7, 2, 5, 8]],
            options: ['1 × 4', '4 × 1', '1 × 1', '4 × 4'],
            correctAnswer: '1 × 4',
            explanation: {
              pt: 'Ela possui exatamente 1 linha e 4 colunas: ordem 1 × 4.',
              en: 'It has 1 row and 4 columns: order 1 × 4.',
            },
          },
          {
            id: '1-1-8',
            type: 'match_pairs',
            question: {
              pt: 'Associe cada tipo especial de matriz à sua característica:',
              en: 'Match each special matrix type to its characteristic:',
            },
            pairs: {
              'Matriz Linha': 'Possui apenas 1 linha',
              'Matriz Coluna': 'Possui apenas 1 coluna',
              'Matriz Quadrada': 'Nº de linhas = Nº de colunas',
              'Matriz Nula': 'Todos os elementos são 0',
            },
          },
          {
            id: '1-1-9',
            type: 'cell_click',
            question: {
              pt: 'Encontre o elemento a₃₂ (3ª linha, 2ª coluna) neste cristal numérico:',
              en: 'Find element a₃₂ (row 3, column 2) in this number crystal:',
            },
            matrix: [
              [1, 2],
              [3, 4],
              [5, 6],
            ],
            targetCell: { r: 2, c: 1 },
            explanation: {
              pt: 'Na 3ª linha e 2ª coluna está o número 6.',
              en: 'In row 3, column 2 sits the number 6.',
            },
          },
          {
            id: '1-1-10',
            type: 'multiple_choice',
            question: {
              pt: 'Uma matriz quadrada de ordem 3 possui quantas células no total?',
              en: 'A square matrix of order 3 has how many cells in total?',
            },
            options: ['9 células', '6 células', '3 células', '12 células'],
            correctAnswer: '9 células',
            explanation: {
              pt: 'Matriz quadrada de ordem 3 é 3 × 3 = 9 elementos.',
              en: 'Square matrix of order 3 means 3 × 3 = 9 elements.',
            },
          },
        ],
      },
      {
        id: 2,
        title: {
          pt: 'Fase 2: Diagonais e Fórmulas de Formação',
          en: 'Stage 2: Diagonals and Formula Generation',
        },
        description: {
          pt: 'Descubra a Diagonal Principal e leis de formação a_ij.',
          en: 'Discover the Main Diagonal and generator laws.',
        },
        xpReward: 35,
        coinsReward: 25,
        activities: [
          {
            id: '1-2-1',
            type: 'cell_click',
            question: {
              pt: 'Clique no elemento da Diagonal Principal que pertence à 2ª linha (a₂₂):',
              en: 'Click on the Main Diagonal element belonging to row 2 (a₂₂):',
            },
            matrix: [
              [8, 3, 1],
              [4, 9, 2],
              [7, 5, 6],
            ],
            targetCell: { r: 1, c: 1 },
            explanation: {
              pt: 'A Diagonal Principal contém os elementos onde i = j (a₁₁, a₂₂, a₃₃). Aqui, a₂₂ = 9.',
              en: 'The Main Diagonal contains elements where i = j. Here, a₂₂ = 9.',
            },
          },
          {
            id: '1-2-2',
            type: 'true_false',
            question: {
              pt: 'Em qualquer matriz retangular m ≠ n existe uma Diagonal Principal completa.',
              en: 'In any rectangular matrix m ≠ n there exists a complete Main Diagonal.',
            },
            options: ['Falso', 'Verdadeiro'],
            correctAnswer: 'Falso',
            explanation: {
              pt: 'A Diagonal Principal só é definida de ponta a ponta em Matrizes Quadradas (onde m = n).',
              en: 'Main Diagonal is only defined from corner to corner in Square Matrices (m = n).',
            },
          },
          {
            id: '1-2-3',
            type: 'multiple_choice',
            question: {
              pt: 'Se a lei de formação de uma matriz 2 × 2 é a_ij = i + j, qual é o valor de a₁₂?',
              en: 'If the formation rule of a 2 × 2 matrix is a_ij = i + j, what is a₁₂?',
            },
            options: ['3', '2', '1', '4'],
            correctAnswer: '3',
            explanation: {
              pt: 'Para i = 1 e j = 2, temos a₁₂ = 1 + 2 = 3.',
              en: 'For i = 1 and j = 2, a₁₂ = 1 + 2 = 3.',
            },
          },
          {
            id: '1-2-4',
            type: 'cell_click',
            question: {
              pt: 'Toque no primeiro elemento da Diagonal Principal (a₁₁):',
              en: 'Touch the first element of the Main Diagonal (a₁₁):',
            },
            matrix: [
              [100, 20],
              [30, 200],
            ],
            targetCell: { r: 0, c: 0 },
            explanation: {
              pt: 'O elemento a₁₁ é o ponto superior esquerdo: 100.',
              en: 'Element a₁₁ is the top-left item: 100.',
            },
          },
          {
            id: '1-2-5',
            type: 'multiple_choice',
            question: {
              pt: 'Dada a lei a_ij = 2i - j em uma matriz 2 × 2, qual é o elemento a₂₁?',
              en: 'Given a_ij = 2i - j for a 2 × 2 matrix, what is a₂₁?',
            },
            options: ['3', '2', '1', '0'],
            correctAnswer: '3',
            explanation: {
              pt: 'Para i = 2 e j = 1: a₂₁ = 2(2) - 1 = 4 - 1 = 3.',
              en: 'For i = 2 and j = 1: a₂₁ = 2(2) - 1 = 3.',
            },
          },
          {
            id: '1-2-6',
            type: 'match_pairs',
            question: {
              pt: 'Combine a posição i,j com a sua classificação geométrica:',
              en: 'Match position i,j with its geometric classification:',
            },
            pairs: {
              'i = j': 'Diagonal Principal',
              'i < j': 'Acima da Diagonal Principal',
              'i > j': 'Abaixo da Diagonal Principal',
              'i + j = n + 1': 'Diagonal Secundária',
            },
          },
          {
            id: '1-2-7',
            type: 'cell_click',
            question: {
              pt: 'Toque no último elemento da Diagonal Principal (a₃₃):',
              en: 'Touch the last element of the Main Diagonal (a₃₃):',
            },
            matrix: [
              [1, 0, 0],
              [0, 5, 0],
              [0, 0, 9],
            ],
            targetCell: { r: 2, c: 2 },
            explanation: {
              pt: 'O elemento a₃₃ está na linha 3 e coluna 3, valor 9.',
              en: 'Element a₃₃ is at row 3 and column 3, value 9.',
            },
          },
          {
            id: '1-2-8',
            type: 'multiple_choice',
            question: {
              pt: 'Qual é o traço da matriz [ [4, 1], [3, 6] ]? (Dica: o traço é a soma da Diagonal Principal)',
              en: 'What is the trace of matrix [ [4, 1], [3, 6] ]? (Hint: trace is the sum of Main Diagonal)',
            },
            options: ['10', '14', '7', '4'],
            correctAnswer: '10',
            explanation: {
              pt: 'O traço é a soma dos elementos onde i = j: a₁₁ + a₂₂ = 4 + 6 = 10.',
              en: 'Trace is sum of main diagonal: 4 + 6 = 10.',
            },
          },
          {
            id: '1-2-9',
            type: 'cell_click',
            question: {
              pt: 'Encontre o elemento a₁₃ nesta matriz mágica:',
              en: 'Find element a₁₃ in this magical matrix:',
            },
            matrix: [
              [12, 15, 99],
              [44, 55, 66],
            ],
            targetCell: { r: 0, c: 2 },
            explanation: {
              pt: 'Linha 1, Coluna 3 = 99.',
              en: 'Row 1, Column 3 = 99.',
            },
          },
          {
            id: '1-2-10',
            type: 'true_false',
            question: {
              pt: 'Em uma matriz identidade, todos os elementos fora da diagonal principal são iguais a 0.',
              en: 'In an identity matrix, all elements off the main diagonal are equal to 0.',
            },
            options: ['Verdadeiro', 'Falso'],
            correctAnswer: 'Verdadeiro',
            explanation: {
              pt: 'Exatamente! Na matriz identidade I, a_ij = 1 se i = j, e a_ij = 0 se i ≠ j.',
              en: 'Correct! On main diagonal elements are 1, all others are 0.',
            },
          },
        ],
      },
      {
        id: 3,
        title: {
          pt: 'Fase 3: O Guardião dos Tipos Especiais',
          en: 'Stage 3: Guardian of Special Matrices',
        },
        description: {
          pt: 'Matriz Nula, Diagonal, Escalar e Identidade.',
          en: 'Zero, Diagonal, Scalar, and Identity Matrices.',
        },
        xpReward: 40,
        coinsReward: 30,
        activities: [
          {
            id: '1-3-1',
            type: 'multiple_choice',
            question: {
              pt: 'Qual destas é a Matriz Identidade de ordem 2 (I₂)?',
              en: 'Which of these is the 2 × 2 Identity Matrix (I₂)?',
            },
            options: ['[ [1, 0], [0, 1] ]', '[ [0, 1], [1, 0] ]', '[ [1, 1], [1, 1] ]', '[ [0, 0], [0, 0] ]'],
            correctAnswer: '[ [1, 0], [0, 1] ]',
            explanation: {
              pt: 'A matriz identidade possui 1s na diagonal principal e 0s em todas as outras posições.',
              en: 'Identity matrix has 1s on main diagonal and 0s elsewhere.',
            },
          },
          {
            id: '1-3-2',
            type: 'cell_click',
            question: {
              pt: 'Toque no número que impede esta matriz de ser uma Matriz Nula:',
              en: 'Touch the number that prevents this matrix from being a Zero Matrix:',
            },
            matrix: [
              [0, 0, 0],
              [0, 7, 0],
              [0, 0, 0],
            ],
            targetCell: { r: 1, c: 1 },
            explanation: {
              pt: 'A matriz nula deve ter TODOS os elementos iguais a zero. O elemento 7 quebra essa regra!',
              en: 'A zero matrix must have ALL elements equal to 0. 7 breaks the rule!',
            },
          },
          {
            id: '1-3-3',
            type: 'match_pairs',
            question: {
              pt: 'Conecte cada conceito à sua descrição mágica:',
              en: 'Connect each concept to its magical description:',
            },
            pairs: {
              'Matriz Nula': 'Todos elementos = 0',
              'Matriz Identidade': 'Diag. 1s e resto 0s',
              'Matriz Diagonal': 'Apenas diag. principal não nula',
              'Matriz Triangular': 'Zeros acima ou abaixo da diagonal',
            },
          },
          {
            id: '1-3-4',
            type: 'true_false',
            question: {
              pt: 'Toda matriz identidade é também uma matriz quadrada e diagonal.',
              en: 'Every identity matrix is also a square and diagonal matrix.',
            },
            options: ['Verdadeiro', 'Falso'],
            correctAnswer: 'Verdadeiro',
            explanation: {
              pt: 'Verdadeiro! Ela é quadrada (n × n) e diagonal (elementos fora da diagonal são zero).',
              en: 'True! It is square (n × n) and diagonal (off-diagonal elements are 0).',
            },
          },
          {
            id: '1-3-5',
            type: 'cell_click',
            question: {
              pt: 'Na matriz triangular superior abaixo, clique em um dos zeros que formam o triângulo inferior:',
              en: 'In the upper triangular matrix below, click on one of the zeros forming the lower triangle:',
            },
            matrix: [
              [5, 8, 2],
              [0, 3, 9],
              [0, 0, 4],
            ],
            targetCell: { r: 1, c: 0 },
            explanation: {
              pt: 'Numa matriz triangular superior, todos os elementos ABAIXO da diagonal principal são zeros.',
              en: 'In an upper triangular matrix, all elements below main diagonal are zero.',
            },
          },
          {
            id: '1-3-6',
            type: 'multiple_choice',
            question: {
              pt: 'Qual é o papel da Matriz Identidade na multiplicação matricial?',
              en: 'What is the role of the Identity Matrix in matrix multiplication?',
            },
            options: [
              'É o elemento neutro: A · I = A',
              'Zera toda a matriz resultante',
              'Inverte o sinal dos elementos',
              'Dobra os valores dos elementos',
            ],
            correctAnswer: 'É o elemento neutro: A · I = A',
            explanation: {
              pt: 'A matriz identidade atua como o número 1 na multiplicação: A · I = I · A = A.',
              en: 'Identity matrix acts like number 1 in scalar multiplication: A · I = A.',
            },
          },
          {
            id: '1-3-7',
            type: 'matrix_dimension',
            question: {
              pt: 'Qual é a ordem da matriz identidade I₃?',
              en: 'What is the order of identity matrix I₃?',
            },
            matrix: [
              [1, 0, 0],
              [0, 1, 0],
              [0, 0, 1],
            ],
            options: ['3 × 3', '3 × 1', '1 × 3', '9 × 9'],
            correctAnswer: '3 × 3',
            explanation: {
              pt: 'I₃ representa a matriz identidade de ordem 3 (3 linhas e 3 colunas).',
              en: 'I₃ stands for 3 × 3 identity matrix.',
            },
          },
          {
            id: '1-3-8',
            type: 'true_false',
            question: {
              pt: 'Uma matriz 2 × 3 pode ser uma matriz identidade.',
              en: 'A 2 × 3 matrix can be an identity matrix.',
            },
            options: ['Falso', 'Verdadeiro'],
            correctAnswer: 'Falso',
            explanation: {
              pt: 'Falso! A matriz identidade é OBRIGATORIAMENTE quadrada (m = n).',
              en: 'False! Identity matrix must always be square (m = n).',
            },
          },
          {
            id: '1-3-9',
            type: 'cell_click',
            question: {
              pt: 'Selecione o elemento neutro central a₂₂ da matriz identidade I₃:',
              en: 'Select the central neutral element a₂₂ of identity matrix I₃:',
            },
            matrix: [
              [1, 0, 0],
              [0, 1, 0],
              [0, 0, 1],
            ],
            targetCell: { r: 1, c: 1 },
            explanation: {
              pt: 'O elemento a₂₂ = 1, bem no centro da diagonal principal.',
              en: 'Element a₂₂ = 1, right in the center of the main diagonal.',
            },
          },
          {
            id: '1-3-10',
            type: 'multiple_choice',
            question: {
              pt: 'Parabéns pela conclusão do Setor 1! Qual é a regra dourada das matrizes?',
              en: 'Congratulations on completing Sector 1! What is the golden rule of matrices?',
            },
            options: [
              'Linhas primeiro, Colunas depois (m × n e a_ij)',
              'Colunas sempre vêm antes das Linhas',
              'Toda matriz precisa ser quadrada',
              'Elementos negativos não são permitidos',
            ],
            correctAnswer: 'Linhas primeiro, Colunas depois (m × n e a_ij)',
            explanation: {
              pt: 'Linha sempre vem primeiro: m linhas, n colunas, elemento a_ij (linha i, coluna j)!',
              en: 'Rows always come first!',
            },
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: {
      pt: 'O Vale da Alquimia Aditiva',
      en: 'The Valley of Additive Alchemy',
      es: 'El Valle de la Alquimia Aditiva',
      fr: 'La Vallée de l\'Alchimie Additive',
    },
    subtitle: {
      pt: 'Adição, Subtração e Propriedades',
      en: 'Addition, Subtraction, and Properties',
      es: 'Adición, Sustracción y Propiedades',
      fr: 'Addition, Soustraction et Propriétés',
    },
    icon: '⚗️',
    biome: 'indigo',
    character: 'Alquimista Elden',
    dialogues: {
      intro: [
        {
          speaker: 'Alquimista Elden',
          avatar: '🧪',
          text: {
            pt: 'Bem-vindo ao meu laboratório! Para fundir duas matrizes através da Adição ou Subtração, existe uma Lei Sagrada: elas DEVEM ter exatamente a mesma ordem (dimensão)!',
            en: 'Welcome to my lab! To fuse two matrices via Addition or Subtraction, there is a Sacred Law: they MUST have the exact same dimensions!',
          },
        },
        {
          speaker: 'Alquimista Elden',
          avatar: '🧪',
          text: {
            pt: 'A soma é feita elemento a elemento: c_ij = a_ij + b_ij. É simples, harmonioso e poderoso!',
            en: 'Addition is done element by element: c_ij = a_ij + b_ij.',
          },
        },
      ],
    },
    levels: [
      {
        id: 1,
        title: {
          pt: 'Fase 1: A Lei da Harmonia Dimensional',
          en: 'Stage 1: Law of Dimensional Harmony',
        },
        description: {
          pt: 'Aprenda quando duas matrizes podem ser somadas.',
          en: 'Learn when two matrices can be added.',
        },
        xpReward: 35,
        coinsReward: 25,
        activities: [
          {
            id: '2-1-1',
            type: 'multiple_choice',
            question: {
              pt: 'É possível somar uma matriz A de ordem 2 × 3 com uma matriz B de ordem 3 × 2?',
              en: 'Can we add a 2 × 3 matrix A to a 3 × 2 matrix B?',
            },
            options: [
              'Não, pois têm ordens diferentes',
              'Sim, o resultado será 3 × 3',
              'Sim, o resultado será 2 × 2',
              'Sim, qualquer matriz pode ser somada',
            ],
            correctAnswer: 'Não, pois têm ordens diferentes',
            explanation: {
              pt: 'Só é possível somar matrizes de MESMA ordem! 2 × 3 é diferente de 3 × 2.',
              en: 'Matrices must have the same dimension to be added.',
            },
          },
          {
            id: '2-1-2',
            type: 'true_false',
            question: {
              pt: 'Se A e B são de ordem 3 × 3, a matriz soma C = A + B também terá ordem 3 × 3.',
              en: 'If A and B are 3 × 3, the sum matrix C = A + B will also be 3 × 3.',
            },
            options: ['Verdadeiro', 'Falso'],
            correctAnswer: 'Verdadeiro',
            explanation: {
              pt: 'A soma preserva rigorosamente a ordem das matrizes parcelas: 3 × 3.',
              en: 'Sum maintains the exact dimensions of operands.',
            },
          },
          {
            id: '2-1-3',
            type: 'fill_blank',
            question: {
              pt: 'Calcule o elemento c₁₁ da soma: [ [3, 4] ] + [ [5, 2] ] = [ [?, 6] ]',
              en: 'Calculate element c₁₁ of sum: [ [3, 4] ] + [ [5, 2] ] = [ [?, 6] ]',
            },
            options: ['8', '7', '15', '2'],
            correctAnswer: '8',
            explanation: {
              pt: 'c₁₁ = a₁₁ + b₁₁ = 3 + 5 = 8.',
              en: 'c₁₁ = 3 + 5 = 8.',
            },
          },
          {
            id: '2-1-4',
            type: 'fill_blank',
            question: {
              pt: 'Qual o valor que completa a soma: [ [1], [6] ] + [ [4], [3] ] = [ [5], [?] ]',
              en: 'Find the missing value: [ [1], [6] ] + [ [4], [3] ] = [ [5], [?] ]',
            },
            options: ['9', '18', '3', '7'],
            correctAnswer: '9',
            explanation: {
              pt: 'Linha 2: 6 + 3 = 9.',
              en: 'Row 2: 6 + 3 = 9.',
            },
          },
          {
            id: '2-1-5',
            type: 'match_pairs',
            question: {
              pt: 'Associe as propriedades da adição matricial aos seus significados:',
              en: 'Match properties of matrix addition to their meanings:',
            },
            pairs: {
              'Comutativa': 'A + B = B + A',
              'Associativa': '(A + B) + C = A + (B + C)',
              'Elemento Neutro': 'A + O = A (Matriz Nula)',
              'Elemento Oposto': 'A + (-A) = O',
            },
          },
          {
            id: '2-1-6',
            type: 'fill_blank',
            question: {
              pt: 'Some as matrizes: [ [10, 5], [2, 1] ] + [ [3, 4], [8, 9] ]. Qual é o elemento c₂₁?',
              en: 'Sum the matrices. What is element c₂₁?',
            },
            options: ['10', '13', '7', '9'],
            correctAnswer: '10',
            explanation: {
              pt: 'c₂₁ = a₂₁ + b₂₁ = 2 + 8 = 10.',
              en: 'c₂₁ = 2 + 8 = 10.',
            },
          },
          {
            id: '2-1-7',
            type: 'true_false',
            question: {
              pt: 'A adição matricial é comutativa: sempre temos A + B = B + A.',
              en: 'Matrix addition is commutative: A + B = B + A is always true.',
            },
            options: ['Verdadeiro', 'Falso'],
            correctAnswer: 'Verdadeiro',
            explanation: {
              pt: 'Verdadeiro! Como a soma de números reais é comutativa, a soma de matrizes também é.',
              en: 'True! Element-wise addition inherits commutativity.',
            },
          },
          {
            id: '2-1-8',
            type: 'fill_blank',
            question: {
              pt: 'Complete a soma: [ [7, -2], [4, 0] ] + [ [3, 5], [-1, 6] ]. Elemento c₁₂ = ?',
              en: 'Element c₁₂ = ? for [ [7, -2], [4, 0] ] + [ [3, 5], [-1, 6] ]',
            },
            options: ['3', '-7', '7', '10'],
            correctAnswer: '3',
            explanation: {
              pt: 'c₁₂ = -2 + 5 = 3.',
              en: 'c₁₂ = -2 + 5 = 3.',
            },
          },
          {
            id: '2-1-9',
            type: 'multiple_choice',
            question: {
              pt: 'Qual é a matriz oposta de A = [ [3, -5], [0, 2] ]?',
              en: 'What is the opposite matrix of A = [ [3, -5], [0, 2] ]?',
            },
            options: [
              '[ [-3, 5], [0, -2] ]',
              '[ [3, 5], [0, 2] ]',
              '[ [-3, -5], [0, -2] ]',
              '[ [5, -3], [-2, 0] ]',
            ],
            correctAnswer: '[ [-3, 5], [0, -2] ]',
            explanation: {
              pt: 'A matriz oposta -A inverte o sinal de todos os elementos: 3 vira -3, -5 vira 5, 2 vira -2.',
              en: 'The opposite matrix negates every element.',
            },
          },
          {
            id: '2-1-10',
            type: 'fill_blank',
            question: {
              pt: 'Subtração: [ [8, 6], [10, 4] ] - [ [3, 2], [5, 1] ]. Elemento c₂₂ = ?',
              en: 'Subtraction: Element c₂₂ = ?',
            },
            options: ['3', '5', '9', '4'],
            correctAnswer: '3',
            explanation: {
              pt: 'c₂₂ = 4 - 1 = 3.',
              en: 'c₂₂ = 4 - 1 = 3.',
            },
          },
        ],
      },
      {
        id: 2,
        title: {
          pt: 'Fase 2: Fusão Elemental de Subtrações',
          en: 'Stage 2: Subtraction Elemental Fusion',
        },
        description: {
          pt: 'Domine a subtração e números negativos em matrizes.',
          en: 'Master subtraction and negative numbers in matrices.',
        },
        xpReward: 40,
        coinsReward: 30,
        activities: [
          {
            id: '2-2-1',
            type: 'fill_blank',
            question: {
              pt: 'Calcule: [ [5, 3] ] - [ [8, -2] ] = [ [?, 5] ]',
              en: 'Calculate: [ [5, 3] ] - [ [8, -2] ] = [ [?, 5] ]',
            },
            options: ['-3', '13', '3', '-13'],
            correctAnswer: '-3',
            explanation: {
              pt: '5 - 8 = -3. E na segunda posição: 3 - (-2) = 3 + 2 = 5.',
              en: '5 - 8 = -3.',
            },
          },
          {
            id: '2-2-2',
            type: 'fill_blank',
            question: {
              pt: 'Encontre o valor misterioso: [ [12, ?] ] - [ [4, 7] ] = [ [8, 5] ]',
              en: 'Find the mystery value: [ [12, ?] ] - [ [4, 7] ] = [ [8, 5] ]',
            },
            options: ['12', '2', '-2', '14'],
            correctAnswer: '12',
            explanation: {
              pt: '? - 7 = 5  =>  ? = 5 + 7 = 12.',
              en: '? - 7 = 5 => ? = 12.',
            },
          },
          {
            id: '2-2-3',
            type: 'true_false',
            question: {
              pt: 'A subtração de matrizes é comutativa: A - B = B - A.',
              en: 'Matrix subtraction is commutative: A - B = B - A.',
            },
            options: ['Falso', 'Verdadeiro'],
            correctAnswer: 'Falso',
            explanation: {
              pt: 'Falso! Assim como 5 - 3 ≠ 3 - 5, A - B ≠ B - A (na verdade, A - B = -(B - A)).',
              en: 'False! Subtraction is not commutative.',
            },
          },
          {
            id: '2-2-4',
            type: 'match_pairs',
            question: {
              pt: 'Ligue cada operação com sua matriz resultante:',
              en: 'Match each operation with its resulting matrix:',
            },
            pairs: {
              '[ [2] ] + [ [3] ]': '[ [5] ]',
              '[ [2] ] - [ [3] ]': '[ [-1] ]',
              '[ [2] ] + [ [-2] ]': '[ [0] ]',
              '[ [-2] ] - [ [-3] ]': '[ [1] ]',
            },
          },
          {
            id: '2-2-5',
            type: 'fill_blank',
            question: {
              pt: 'Resolva a equação matricial: X + [ [2, 1], [0, 4] ] = [ [5, 3], [1, 7] ]. Elemento x₁₁ = ?',
              en: 'Solve matrix equation: Element x₁₁ = ?',
            },
            options: ['3', '7', '-3', '2'],
            correctAnswer: '3',
            explanation: {
              pt: 'x₁₁ + 2 = 5  =>  x₁₁ = 5 - 2 = 3.',
              en: 'x₁₁ + 2 = 5 => x₁₁ = 3.',
            },
          },
          {
            id: '2-2-6',
            type: 'fill_blank',
            question: {
              pt: 'Na mesma equação anterior, qual é o valor de x₂₂?',
              en: 'In the same equation, what is x₂₂?',
            },
            options: ['3', '11', '4', '28'],
            correctAnswer: '3',
            explanation: {
              pt: 'x₂₂ + 4 = 7  =>  x₂₂ = 7 - 4 = 3.',
              en: 'x₂₂ + 4 = 7 => x₂₂ = 3.',
            },
          },
          {
            id: '2-2-7',
            type: 'multiple_choice',
            question: {
              pt: 'Se A - A = O, qual é o nome da matriz O?',
              en: 'If A - A = O, what is the name of matrix O?',
            },
            options: ['Matriz Nula', 'Matriz Identidade', 'Matriz Oposta', 'Matriz Singular'],
            correctAnswer: 'Matriz Nula',
            explanation: {
              pt: 'Qualquer matriz subtraída de si mesma resulta na Matriz Nula (todos elementos iguais a 0).',
              en: 'A matrix minus itself equals the Zero Matrix.',
            },
          },
          {
            id: '2-2-8',
            type: 'fill_blank',
            question: {
              pt: 'Subtraia: [ [0, -4], [6, 1] ] - [ [-3, 2], [1, -5] ]. Elemento c₁₁ = ?',
              en: 'Subtract: Element c₁₁ = ?',
            },
            options: ['3', '-3', '0', '4'],
            correctAnswer: '3',
            explanation: {
              pt: '0 - (-3) = 0 + 3 = 3.',
              en: '0 - (-3) = 3.',
            },
          },
          {
            id: '2-2-9',
            type: 'fill_blank',
            question: {
              pt: 'Na mesma subtração anterior, qual é o elemento c₂₂?',
              en: 'In the same subtraction, what is c₂₂?',
            },
            options: ['6', '-4', '-5', '5'],
            correctAnswer: '6',
            explanation: {
              pt: '1 - (-5) = 1 + 5 = 6.',
              en: '1 - (-5) = 6.',
            },
          },
          {
            id: '2-2-10',
            type: 'true_false',
            question: {
              pt: 'Se A + B = A, então B é obrigatoriamente a Matriz Nula da mesma ordem que A.',
              en: 'If A + B = A, then B must be the Zero Matrix of same order.',
            },
            options: ['Verdadeiro', 'Falso'],
            correctAnswer: 'Verdadeiro',
            explanation: {
              pt: 'Verdadeiro! A matriz nula é o único elemento neutro aditivo.',
              en: 'True! Zero matrix is the unique additive identity.',
            },
          },
        ],
      },
      {
        id: 3,
        title: {
          pt: 'Fase 3: O Duelo Alquímico Final',
          en: 'Stage 3: Final Alchemical Duel',
        },
        description: {
          pt: 'Resolva equações matriciais complexas e vença o Guardião.',
          en: 'Solve complex matrix equations and defeat the Guardian.',
        },
        xpReward: 45,
        coinsReward: 35,
        activities: [
          {
            id: '2-3-1',
            type: 'fill_blank',
            question: {
              pt: 'Dadas A = [ [1, 2], [3, 4] ] e B = [ [5, 6], [7, 8] ], calcule o traço de A + B:',
              en: 'Calculate the trace of A + B:',
            },
            options: ['18', '20', '12', '10'],
            correctAnswer: '18',
            explanation: {
              pt: 'c₁₁ = 1 + 5 = 6; c₂₂ = 4 + 8 = 12. O traço é a soma da diagonal: 6 + 12 = 18.',
              en: 'Trace = (1 + 5) + (4 + 8) = 6 + 12 = 18.',
            },
          },
          {
            id: '2-3-2',
            type: 'fill_blank',
            question: {
              pt: 'Se X - [ [3, 1] ] = [ [4, 9] ], qual é a matriz X?',
              en: 'If X - [ [3, 1] ] = [ [4, 9] ], what is matrix X?',
            },
            options: ['[ [7, 10] ]', '[ [1, 8] ]', '[ [-1, -8] ]', '[ [12, 9] ]'],
            correctAnswer: '[ [7, 10] ]',
            explanation: {
              pt: 'X = [ [4, 9] ] + [ [3, 1] ] = [ [4+3, 9+1] ] = [ [7, 10] ].',
              en: 'X = [ [7, 10] ].',
            },
          },
          {
            id: '2-3-3',
            type: 'match_pairs',
            question: {
              pt: 'Harmonize cada matriz com sua respectiva matriz oposta -A:',
              en: 'Match each matrix with its opposite -A:',
            },
            pairs: {
              '[ [1, -2] ]': '[ [-1, 2] ]',
              '[ [-3, 4] ]': '[ [3, -4] ]',
              '[ [0, 5] ]': '[ [0, -5] ]',
              '[ [-6, -7] ]': '[ [6, 7] ]',
            },
          },
          {
            id: '2-3-4',
            type: 'true_false',
            question: {
              pt: 'Podemos subtrair uma matriz linha 1 × 3 de uma matriz coluna 3 × 1 se tiverem 3 elementos.',
              en: 'Can we subtract a 1 × 3 row matrix from a 3 × 1 column matrix if both have 3 elements?',
            },
            options: ['Falso', 'Verdadeiro'],
            correctAnswer: 'Falso',
            explanation: {
              pt: 'Falso! Mesmo tendo 3 elementos, a ordem 1 × 3 é diferente de 3 × 1. A subtração é impossível.',
              en: 'False! Orders do not match.',
            },
          },
          {
            id: '2-3-5',
            type: 'fill_blank',
            question: {
              pt: 'Complete: [ [x + 2, 3] ] = [ [7, y - 1] ]. Então x = ? e y = ?',
              en: 'Find x and y:',
            },
            options: ['x = 5, y = 4', 'x = 9, y = 2', 'x = 5, y = 2', 'x = 7, y = 3'],
            correctAnswer: 'x = 5, y = 4',
            explanation: {
              pt: 'Igualdade de matrizes: x + 2 = 7 => x = 5. E y - 1 = 3 => y = 4.',
              en: 'x + 2 = 7 => x = 5; y - 1 = 3 => y = 4.',
            },
          },
          {
            id: '2-3-6',
            type: 'multiple_choice',
            question: {
              pt: 'Qual é a condição para que duas matrizes A e B sejam iguais (A = B)?',
              en: 'What is the condition for two matrices to be equal (A = B)?',
            },
            options: [
              'Mesma ordem e todos os elementos correspondentes iguais (a_ij = b_ij)',
              'Apenas terem a mesma soma de elementos',
              'Apenas terem o mesmo número de elementos',
              'Terem diagonais principais iguais',
            ],
            correctAnswer: 'Mesma ordem e todos os elementos correspondentes iguais (a_ij = b_ij)',
            explanation: {
              pt: 'Duas matrizes são iguais se, e somente se, têm a mesma ordem e elementos correspondentes idênticos.',
              en: 'Equal matrices require identical order and identical corresponding elements.',
            },
          },
          {
            id: '2-3-7',
            type: 'fill_blank',
            question: {
              pt: 'Calcule: [ [1, 2], [3, 4] ] + [ [0, 0], [0, 0] ] = ?',
              en: 'Calculate: A + O = ?',
            },
            options: ['[ [1, 2], [3, 4] ]', '[ [0, 0], [0, 0] ]', '[ [2, 4], [6, 8] ]', '[ [1, 1], [1, 1] ]'],
            correctAnswer: '[ [1, 2], [3, 4] ]',
            explanation: {
              pt: 'Somar a matriz nula não altera a matriz original (elemento neutro).',
              en: 'Adding zero matrix preserves the original.',
            },
          },
          {
            id: '2-3-8',
            type: 'fill_blank',
            question: {
              pt: 'Se A + B = C e a₁₁ = 14, c₁₁ = 20, quanto vale b₁₁?',
              en: 'If A + B = C and a₁₁ = 14, c₁₁ = 20, what is b₁₁?',
            },
            options: ['6', '34', '-6', '14'],
            correctAnswer: '6',
            explanation: {
              pt: '14 + b₁₁ = 20  =>  b₁₁ = 20 - 14 = 6.',
              en: '14 + b₁₁ = 20 => b₁₁ = 6.',
            },
          },
          {
            id: '2-3-9',
            type: 'true_false',
            question: {
              pt: 'Em toda adição A + B = C, o traço da soma é igual à soma dos traços: tr(A + B) = tr(A) + tr(B).',
              en: 'Is tr(A + B) = tr(A) + tr(B) always true?',
            },
            options: ['Verdadeiro', 'Falso'],
            correctAnswer: 'Verdadeiro',
            explanation: {
              pt: 'Verdadeiro! O traço é uma operação linear, então o traço da soma é a soma dos traços.',
              en: 'True! Trace is linear.',
            },
          },
          {
            id: '2-3-10',
            type: 'multiple_choice',
            question: {
              pt: 'Você derrotou o Guardião Alquímico! O que aprendemos sobre a adição?',
              en: 'What did we master in matrix addition?',
            },
            options: [
              'Mesma ordem obrigatória e soma elemento a elemento',
              'Qualquer matriz pode ser somada',
              'Soma multiplica os elementos',
              'Subtração é comutativa',
            ],
            correctAnswer: 'Mesma ordem obrigatória e soma elemento a elemento',
            explanation: {
              pt: 'Excelente! Dominou a adição e subtração de matrizes com maestria.',
              en: 'Excellent mastery of matrix addition!',
            },
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: {
      pt: 'O Forte dos Escalares',
      en: 'The Scalar Stronghold',
      es: 'El Fuerte de los Escalares',
      fr: 'Le Fort des Scalaires',
    },
    subtitle: {
      pt: 'Multiplicação por Escalar e Amplificação',
      en: 'Scalar Multiplication and Amplification',
      es: 'Multiplicación por Escalar y Amplificación',
      fr: 'Multiplication par Scalaire et Amplification',
    },
    icon: '⚡',
    biome: 'amber',
    character: 'General Vetor',
    dialogues: {
      intro: [
        {
          speaker: 'General Vetor',
          avatar: '⚔️',
          text: {
            pt: 'Atenção, recruta! Um "escalar" nada mais é do que um número real (como 2, -3 ou 0.5). Quando multiplicamos uma matriz por um escalar k, TODOS os seus elementos são multiplicados por k!',
            en: 'Attention, recruit! A "scalar" is simply a real number. When we multiply a matrix by scalar k, ALL its elements are multiplied by k!',
          },
        },
        {
          speaker: 'General Vetor',
          avatar: '⚔️',
          text: {
            pt: 'Se k = 2, a matriz dobra de intensidade. Se k = -1, ela tem seus sinais invertidos. Prove seu valor nas batalhas!',
            en: 'If k = 2, the matrix doubles. If k = -1, it inverts signs.',
          },
        },
      ],
    },
    levels: [
      {
        id: 1,
        title: {
          pt: 'Fase 1: O Toque Amplificador (k · A)',
          en: 'Stage 1: The Amplifying Touch (k · A)',
        },
        description: {
          pt: 'Multiplique matrizes por escalares positivos e negativos.',
          en: 'Multiply matrices by positive and negative scalars.',
        },
        xpReward: 40,
        coinsReward: 30,
        activities: [
          {
            id: '3-1-1',
            type: 'fill_blank',
            question: {
              pt: 'Calcule 2 · [ [3, 5], [1, 4] ]. Qual é o elemento resultante b₁₁?',
              en: 'Calculate 2 · [ [3, 5], [1, 4] ]. Element b₁₁ = ?',
            },
            options: ['6', '5', '9', '3'],
            correctAnswer: '6',
            explanation: {
              pt: '2 · 3 = 6.',
              en: '2 · 3 = 6.',
            },
          },
          {
            id: '3-1-2',
            type: 'fill_blank',
            question: {
              pt: 'Na mesma multiplicação 2 · [ [3, 5], [1, 4] ], qual é o elemento b₁₂?',
              en: 'What is element b₁₂?',
            },
            options: ['10', '7', '25', '2'],
            correctAnswer: '10',
            explanation: {
              pt: '2 · 5 = 10.',
              en: '2 · 5 = 10.',
            },
          },
          {
            id: '3-1-3',
            type: 'true_false',
            question: {
              pt: 'Ao multiplicar uma matriz 2 × 3 por um escalar k, a ordem da matriz resultante continua sendo 2 × 3.',
              en: 'Multiplying a 2 × 3 matrix by scalar k keeps its order as 2 × 3.',
            },
            options: ['Verdadeiro', 'Falso'],
            correctAnswer: 'Verdadeiro',
            explanation: {
              pt: 'Verdadeiro! A multiplicação por escalar altera os valores dos elementos, mas NÃO altera a ordem da matriz.',
              en: 'True! Scalar multiplication changes element values, not dimensions.',
            },
          },
          {
            id: '3-1-4',
            type: 'fill_blank',
            question: {
              pt: 'Multiplicação por escalar negativo: -3 · [ [2, -4] ] = [ [?, 12] ]',
              en: 'Calculate: -3 · [ [2, -4] ] = [ [?, 12] ]',
            },
            options: ['-6', '6', '-1', '5'],
            correctAnswer: '-6',
            explanation: {
              pt: '-3 · 2 = -6. E -3 · (-4) = 12.',
              en: '-3 · 2 = -6.',
            },
          },
          {
            id: '3-1-5',
            type: 'match_pairs',
            question: {
              pt: 'Combine a multiplicação escalar com o efeito nos elementos:',
              en: 'Match scalar multiplication with its effect:',
            },
            pairs: {
              'k = 2': 'Dobra todos os elementos',
              'k = 0': 'Transforma na Matriz Nula',
              'k = -1': 'Inverte o sinal de todos',
              'k = 1/2': 'Divide todos por 2',
            },
          },
          {
            id: '3-1-6',
            type: 'fill_blank',
            question: {
              pt: 'Se 0 · A = O, qual é o valor de qualquer elemento da matriz resultante?',
              en: 'If 0 · A = O, what is any element in the result?',
            },
            options: ['0', '1', 'A', 'Infinito'],
            correctAnswer: '0',
            explanation: {
              pt: 'Multiplicar qualquer número por 0 resulta em 0, gerando a Matriz Nula.',
              en: '0 times any element yields 0.',
            },
          },
          {
            id: '3-1-7',
            type: 'multiple_choice',
            question: {
              pt: 'Qual é o resultado de 3 · [ [1, 0], [0, 1] ] (ou seja, 3 vezes a Matriz Identidade I₂)?',
              en: 'What is 3 · I₂?',
            },
            options: [
              '[ [3, 0], [0, 3] ]',
              '[ [3, 3], [3, 3] ]',
              '[ [1, 0], [0, 1] ]',
              '[ [0, 3], [3, 0] ]',
            ],
            correctAnswer: '[ [3, 0], [0, 3] ]',
            explanation: {
              pt: 'Multiplica cada elemento: 3·1 = 3 e 3·0 = 0. Obtemos a Matriz Escalar [ [3, 0], [0, 3] ].',
              en: 'Result is [ [3, 0], [0, 3] ].',
            },
          },
          {
            id: '3-1-8',
            type: 'fill_blank',
            question: {
              pt: 'Resolva a combinação: 2 · [ [3] ] + 3 · [ [4] ] = [ [?] ]',
              en: 'Solve: 2 · [ [3] ] + 3 · [ [4] ] = [ [?] ]',
            },
            options: ['18', '14', '24', '12'],
            correctAnswer: '18',
            explanation: {
              pt: '2 · 3 = 6; 3 · 4 = 12. Soma: 6 + 12 = 18.',
              en: '2·3 + 3·4 = 6 + 12 = 18.',
            },
          },
          {
            id: '3-1-9',
            type: 'true_false',
            question: {
              pt: 'A propriedade distributiva é válida: k · (A + B) = k·A + k·B.',
              en: 'Is k · (A + B) = k·A + k·B always true?',
            },
            options: ['Verdadeiro', 'Falso'],
            correctAnswer: 'Verdadeiro',
            explanation: {
              pt: 'Verdadeiro! O escalar distribui sobre a soma de matrizes.',
              en: 'True! Scalar multiplication distributes over addition.',
            },
          },
          {
            id: '3-1-10',
            type: 'fill_blank',
            question: {
              pt: 'Se k · [ [4, 6] ] = [ [12, 18] ], qual é o valor do escalar k?',
              en: 'If k · [ [4, 6] ] = [ [12, 18] ], what is k?',
            },
            options: ['3', '2', '4', '6'],
            correctAnswer: '3',
            explanation: {
              pt: '4 · k = 12  =>  k = 12 / 4 = 3.',
              en: '4k = 12 => k = 3.',
            },
          },
        ],
      },
      {
        id: 2,
        title: {
          pt: 'Fase 2: Batalha de Equações Escalares',
          en: 'Stage 2: Battle of Scalar Equations',
        },
        description: {
          pt: 'Resolva sistemas lineares matriciais e expressões.',
          en: 'Solve matrix expressions and systems.',
        },
        xpReward: 45,
        coinsReward: 35,
        activities: [
          {
            id: '3-2-1',
            type: 'fill_blank',
            question: {
              pt: 'Se 2A = [ [10, 8], [6, 4] ], qual é o elemento a₁₁ da matriz A?',
              en: 'If 2A = [ [10, 8], [6, 4] ], what is element a₁₁ of A?',
            },
            options: ['5', '20', '8', '2'],
            correctAnswer: '5',
            explanation: {
              pt: 'Dividimos por 2: a₁₁ = 10 / 2 = 5.',
              en: 'a₁₁ = 10 / 2 = 5.',
            },
          },
          {
            id: '3-2-2',
            type: 'fill_blank',
            question: {
              pt: 'Calcule 1/2 · [ [16, 20], [8, -4] ]. Elemento b₂₂ = ?',
              en: 'Element b₂₂ = ? for 1/2 · [ [16, 20], [8, -4] ]',
            },
            options: ['-2', '2', '-8', '4'],
            correctAnswer: '-2',
            explanation: {
              pt: '1/2 · (-4) = -2.',
              en: '1/2 · (-4) = -2.',
            },
          },
          {
            id: '3-2-3',
            type: 'match_pairs',
            question: {
              pt: 'Combine a expressão escalar com o valor correspondente para A = [ [2] ]:',
              en: 'Match scalar expression with its value for A = [ [2] ]:',
            },
            pairs: {
              '3 · A': '[ [6] ]',
              '-2 · A': '[ [-4] ]',
              '0.5 · A': '[ [1] ]',
              '0 · A': '[ [0] ]',
            },
          },
          {
            id: '3-2-4',
            type: 'fill_blank',
            question: {
              pt: 'Resolva: 3 · [ [1, 2] ] - 2 · [ [1, 1] ] = [ [?, 4] ]',
              en: 'Solve: 3 · [ [1, 2] ] - 2 · [ [1, 1] ] = [ [?, 4] ]',
            },
            options: ['1', '2', '5', '0'],
            correctAnswer: '1',
            explanation: {
              pt: 'Linha 1: 3(1) - 2(1) = 3 - 2 = 1. Na 2ª coluna: 3(2) - 2(1) = 6 - 2 = 4.',
              en: '3(1) - 2(1) = 1.',
            },
          },
          {
            id: '3-2-5',
            type: 'true_false',
            question: {
              pt: 'A multiplicação de matriz por escalar satisfaz (c + d) · A = c·A + d·A.',
              en: 'Does (c + d) · A = c·A + d·A always hold?',
            },
            options: ['Verdadeiro', 'Falso'],
            correctAnswer: 'Verdadeiro',
            explanation: {
              pt: 'Verdadeiro! É a distributividade em relação à soma de escalares.',
              en: 'True! Distributive law over scalar sum.',
            },
          },
          {
            id: '3-2-6',
            type: 'fill_blank',
            question: {
              pt: 'Se 3X + [ [1, 2] ] = [ [10, 14] ], quanto vale x₁₁?',
              en: 'If 3X + [ [1, 2] ] = [ [10, 14] ], what is x₁₁?',
            },
            options: ['3', '9', '11', '1'],
            correctAnswer: '3',
            explanation: {
              pt: '3·x₁₁ + 1 = 10  =>  3·x₁₁ = 9  =>  x₁₁ = 3.',
              en: '3·x₁₁ = 9 => x₁₁ = 3.',
            },
          },
          {
            id: '3-2-7',
            type: 'fill_blank',
            question: {
              pt: 'Na mesma equação anterior, quanto vale x₁₂?',
              en: 'In the same equation, what is x₁₂?',
            },
            options: ['4', '12', '16', '2'],
            correctAnswer: '4',
            explanation: {
              pt: '3·x₁₂ + 2 = 14  =>  3·x₁₂ = 12  =>  x₁₂ = 4.',
              en: '3·x₁₂ = 12 => x₁₂ = 4.',
            },
          },
          {
            id: '3-2-8',
            type: 'multiple_choice',
            question: {
              pt: 'O que acontece com o determinante de uma matriz 2 × 2 ao multiplicá-la por 3?',
              en: 'What happens to the determinant of a 2 × 2 matrix when multiplied by 3?',
            },
            options: ['Fica multiplicado por 9 (3²)', 'Fica multiplicado por 3', 'Não se altera', 'Fica dividido por 3'],
            correctAnswer: 'Fica multiplicado por 9 (3²)',
            explanation: {
              pt: 'Para uma matriz de ordem n, det(k·A) = kⁿ · det(A). Como n = 2, temos 3² = 9!',
              en: 'det(k·A) = kⁿ · det(A). For n = 2, 3² = 9.',
            },
          },
          {
            id: '3-2-9',
            type: 'fill_blank',
            question: {
              pt: 'Calcule: -1 · [ [-7, 8], [0, -3] ]. Elemento resultante c₁₁ = ?',
              en: 'Calculate: -1 · [ [-7, 8], [0, -3] ]. Element c₁₁ = ?',
            },
            options: ['7', '-7', '1', '0'],
            correctAnswer: '7',
            explanation: {
              pt: '-1 · (-7) = 7.',
              en: '-1 · (-7) = 7.',
            },
          },
          {
            id: '3-2-10',
            type: 'true_false',
            question: {
              pt: 'Se k · A = O e A ≠ O, então o escalar k é obrigatoriamente 0.',
              en: 'If k · A = O and A ≠ O, then scalar k must be 0.',
            },
            options: ['Verdadeiro', 'Falso'],
            correctAnswer: 'Verdadeiro',
            explanation: {
              pt: 'Verdadeiro! Se a matriz possui pelo menos um elemento não-nulo, a única forma do produto ser zero é com k = 0.',
              en: 'True! Since A has non-zero elements, k must be 0.',
            },
          },
        ],
      },
      {
        id: 3,
        title: {
          pt: 'Fase 3: O Julgamento do General',
          en: 'Stage 3: The General\'s Trial',
        },
        description: {
          pt: 'Desafio mestre combinando adição, subtração e escalares.',
          en: 'Master challenge combining addition, subtraction, and scalars.',
        },
        xpReward: 50,
        coinsReward: 40,
        activities: [
          {
            id: '3-3-1',
            type: 'fill_blank',
            question: {
              pt: 'Dadas A = [ [1, 2] ] e B = [ [3, 0] ], calcule 2A + 3B:',
              en: 'Given A = [ [1, 2] ] and B = [ [3, 0] ], calculate 2A + 3B:',
            },
            options: ['[ [11, 4] ]', '[ [8, 4] ]', '[ [10, 6] ]', '[ [7, 2] ]'],
            correctAnswer: '[ [11, 4] ]',
            explanation: {
              pt: '2A = [ [2, 4] ]; 3B = [ [9, 0] ]. Soma = [ [2+9, 4+0] ] = [ [11, 4] ].',
              en: '2A + 3B = [ [2+9, 4+0] ] = [ [11, 4] ].',
            },
          },
          {
            id: '3-3-2',
            type: 'fill_blank',
            question: {
              pt: 'Calcule o elemento c₁₁ de 4A - 2B para A = [ [5] ] e B = [ [6] ]:',
              en: 'Calculate c₁₁ for 4A - 2B with A = [ [5] ] and B = [ [6] ]:',
            },
            options: ['8', '14', '20', '-8'],
            correctAnswer: '8',
            explanation: {
              pt: '4(5) - 2(6) = 20 - 12 = 8.',
              en: '4(5) - 2(6) = 8.',
            },
          },
          {
            id: '3-3-3',
            type: 'match_pairs',
            question: {
              pt: 'Associe as operações para A = [ [1, 0], [0, 1] ]:',
              en: 'Match operations for Identity matrix A:',
            },
            pairs: {
              '5 · A': '[ [5, 0], [0, 5] ]',
              '-1 · A': '[ [-1, 0], [0, -1] ]',
              '2 · A + 3 · A': '[ [5, 0], [0, 5] ] (5A)',
              'A - A': '[ [0, 0], [0, 0] ] (Nula)',
            },
          },
          {
            id: '3-3-4',
            type: 'true_false',
            question: {
              pt: 'k · (c · A) = (k · c) · A para quaisquer escalares reais k e c.',
              en: 'Is k · (c · A) = (k · c) · A always true?',
            },
            options: ['Verdadeiro', 'Falso'],
            correctAnswer: 'Verdadeiro',
            explanation: {
              pt: 'Verdadeiro! É a propriedade associativa da multiplicação por escalares.',
              en: 'True! Associative scalar property.',
            },
          },
          {
            id: '3-3-5',
            type: 'fill_blank',
            question: {
              pt: 'Se 2X = [ [6, 12], [-4, 0] ], qual é o traço de X?',
              en: 'If 2X = [ [6, 12], [-4, 0] ], what is the trace of X?',
            },
            options: ['3', '6', '12', '0'],
            correctAnswer: '3',
            explanation: {
              pt: 'X = [ [3, 6], [-2, 0] ]. O traço é x₁₁ + x₂₂ = 3 + 0 = 3.',
              en: 'Trace = 3 + 0 = 3.',
            },
          },
          {
            id: '3-3-6',
            type: 'fill_blank',
            question: {
              pt: 'Resolva a equação 5A - 2A = 3A. Se a₁₁ = 4, quanto vale o elemento na matriz final?',
              en: 'For 3A with a₁₁ = 4, what is the final element?',
            },
            options: ['12', '7', '15', '4'],
            correctAnswer: '12',
            explanation: {
              pt: '3 · 4 = 12.',
              en: '3 · 4 = 12.',
            },
          },
          {
            id: '3-3-7',
            type: 'multiple_choice',
            question: {
              pt: 'Qual é o escalar k que transforma A = [ [2, 4] ] em B = [ [-6, -12] ]?',
              en: 'What scalar k transforms A into B?',
            },
            options: ['-3', '3', '-2', '6'],
            correctAnswer: '-3',
            explanation: {
              pt: '2 · (-3) = -6 e 4 · (-3) = -12.',
              en: 'k = -3.',
            },
          },
          {
            id: '3-3-8',
            type: 'true_false',
            question: {
              pt: 'Multiplicar uma matriz por 1 resulta exatamente na mesma matriz (1 · A = A).',
              en: 'Does 1 · A = A always hold?',
            },
            options: ['Verdadeiro', 'Falso'],
            correctAnswer: 'Verdadeiro',
            explanation: {
              pt: 'Verdadeiro! O número 1 é o elemento neutro escalar.',
              en: 'True! 1 is the scalar multiplicative identity.',
            },
          },
          {
            id: '3-3-9',
            type: 'fill_blank',
            question: {
              pt: 'Calcule: 10 · [ [0.2, 0.5], [1.1, 0] ]. Elemento c₂₁ = ?',
              en: 'Calculate: 10 · [ [0.2, 0.5], [1.1, 0] ]. Element c₂₁ = ?',
            },
            options: ['11', '1.1', '10', '2'],
            correctAnswer: '11',
            explanation: {
              pt: '10 · 1.1 = 11.',
              en: '10 · 1.1 = 11.',
            },
          },
          {
            id: '3-3-10',
            type: 'multiple_choice',
            question: {
              pt: 'Parabéns por conquistar o Forte! Como resumir a multiplicação por escalar?',
              en: 'Summary of scalar multiplication:',
            },
            options: [
              'Cada elemento individual da matriz é multiplicado pelo número real k',
              'Apenas a primeira linha é multiplicada',
              'A ordem da matriz é multiplicada por k',
              'Apenas a diagonal principal muda',
            ],
            correctAnswer: 'Cada elemento individual da matriz é multiplicado pelo número real k',
            explanation: {
              pt: 'Perfeito! Cada elemento a_ij vira k · a_ij. O Reino dos Escalares está aos seus pés!',
              en: 'Perfect! Every element is multiplied by k.',
            },
          },
        ],
      },
    ],
  },
];
