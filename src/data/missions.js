export const missionsData = [
  {
    id: 1,
    title: { pt: 'A Descoberta das Matrizes', en: 'The Discovery of Matrices', es: 'El Descubrimiento de las Matrices' },
    description: { pt: 'Aprenda os conceitos básicos.', en: 'Learn the basics.', es: 'Aprende los conceptos básicos.' },
    dialogues: {
      intro: [
        { speaker: 'Algebrion', text: { pt: 'Olá! Bem-vindo ao mundo das Matrizes!', en: 'Hello! Welcome to the world of Matrices!', es: '¡Hola! ¡Bienvenido al mundo de las Matrices!' } },
        { speaker: 'Algebrion', text: { pt: 'Hoje vamos aprender como organizar dados em linhas e colunas.', en: 'Today we will learn how to organize data in rows and columns.', es: 'Hoy aprenderemos a organizar datos en filas y columnas.' } }
      ],
      outro: [
        { speaker: 'Algebrion', text: { pt: 'Excelente! Você completou sua primeira missão!', en: 'Excellent! You completed your first mission!', es: '¡Excelente! ¡Completaste tu primera misión!' } }
      ]
    },
    levels: [
      {
        id: 1,
        title: { pt: 'Nível 1: O que é uma matriz?', en: 'Level 1: What is a matrix?', es: 'Nivel 1: ¿Qué es una matriz?' },
        activities: Array.from({ length: 10 }, (_, i) => ({
          id: `1-1-${i+1}`,
          type: 'multiple_choice',
          question: { pt: `Atividade ${i+1}: Qual a dimensão desta matriz?`, en: `Activity ${i+1}: What is the dimension of this matrix?`, es: `Actividad ${i+1}: ¿Cuál es la dimensión de esta matriz?` },
          options: ['2x2', '3x3', '2x3', '3x2'],
          correctAnswer: '2x2',
          reward: 10
        }))
      },
      {
        id: 2,
        title: { pt: 'Nível 2: Elementos de uma matriz', en: 'Level 2: Elements of a matrix', es: 'Nivel 2: Elementos de una matriz' },
        activities: Array.from({ length: 10 }, (_, i) => ({
          id: `1-2-${i+1}`,
          type: 'true_false',
          question: { pt: `Atividade ${i+1}: O elemento a11 está na primeira linha e primeira coluna.`, en: `Activity ${i+1}: The element a11 is in the first row and first column.`, es: `Actividad ${i+1}: El elemento a11 está en la primera fila y primera columna.` },
          options: ['Verdadeiro', 'Falso'],
          correctAnswer: 'Verdadeiro',
          reward: 10
        }))
      },
      {
        id: 3,
        title: { pt: 'Nível 3: Tipos especiais', en: 'Level 3: Special types', es: 'Nivel 3: Tipos especiales' },
        activities: Array.from({ length: 10 }, (_, i) => ({
          id: `1-3-${i+1}`,
          type: 'multiple_choice',
          question: { pt: `Atividade ${i+1}: O que é uma matriz identidade?`, en: `Activity ${i+1}: What is an identity matrix?`, es: `Actividad ${i+1}: ¿Qué es una matriz identidad?` },
          options: ['Diagonal principal com 1', 'Todos os elementos zero', 'Apenas uma linha', 'Apenas uma coluna'],
          correctAnswer: 'Diagonal principal com 1',
          reward: 15
        }))
      }
    ]
  },
  {
    id: 2,
    title: { pt: 'Operações Básicas', en: 'Basic Operations', es: 'Operaciones Básicas' },
    description: { pt: 'Adição e Subtração.', en: 'Addition and Subtraction.', es: 'Adición y Sustracción.' },
    dialogues: {
      intro: [
        { speaker: 'Algebrion', text: { pt: 'Agora que você conhece as matrizes, vamos somá-las!', en: 'Now that you know matrices, lets add them!', es: '¡Ahora que conoces las matrices, vamos a sumarlas!' } }
      ],
      outro: []
    },
    levels: [
      { id: 1, title: { pt: 'Nível 1', en: 'Level 1', es: 'Nivel 1' }, activities: Array.from({ length: 10 }, (_, i) => ({ id: `2-1-${i+1}`, type: 'multiple_choice', question: {pt: `Atividade ${i+1}`}, options: ['A','B'], correctAnswer: 'A', reward: 10})) },
      { id: 2, title: { pt: 'Nível 2', en: 'Level 2', es: 'Nivel 2' }, activities: Array.from({ length: 10 }, (_, i) => ({ id: `2-2-${i+1}`, type: 'multiple_choice', question: {pt: `Atividade ${i+1}`}, options: ['A','B'], correctAnswer: 'A', reward: 10})) },
      { id: 3, title: { pt: 'Nível 3', en: 'Level 3', es: 'Nivel 3' }, activities: Array.from({ length: 10 }, (_, i) => ({ id: `2-3-${i+1}`, type: 'multiple_choice', question: {pt: `Atividade ${i+1}`}, options: ['A','B'], correctAnswer: 'A', reward: 10})) }
    ]
  }
];
