const shuffleArray = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

const generateIntroLevel = (levelId) => {
  return Array.from({ length: 10 }, (_, i) => {
    const rows = Math.floor(Math.random() * 3) + 2;
    const cols = Math.floor(Math.random() * 3) + 2;
    return {
      id: `1-${levelId}-${i+1}`,
      type: 'multiple_choice',
      question: { 
        pt: `Qual é a dimensão de uma matriz com ${rows} linhas e ${cols} colunas?`,
        en: `What is the dimension of a matrix with ${rows} rows and ${cols} columns?`,
        es: `¿Cuál es la dimensión de una matriz con ${rows} filas y ${cols} columnas?`,
        fr: `Quelle est la dimension d'une matrice avec ${rows} lignes et ${cols} colonnes?`
      },
      options: shuffleArray([`${rows}x${cols}`, `${cols}x${rows}`, `${rows+cols}`, `${rows*cols}`]),
      correctAnswer: `${rows}x${cols}`,
      reward: 10
    };
  });
};

const generateElementsLevel = (levelId) => {
  return Array.from({ length: 10 }, (_, i) => {
    if (i % 3 === 0) {
      // Atividade de Combine os Pares
      const pairsObj = {
        'a11': 'Linha 1, Coluna 1',
        'a23': 'Linha 2, Coluna 3',
        'a32': 'Linha 3, Coluna 2',
        'a12': 'Linha 1, Coluna 2'
      };
      // O react component ActivityEngine usa keys -> values and values -> keys pra check.
      const pairs = { ...pairsObj };
      Object.keys(pairsObj).forEach(k => pairs[pairsObj[k]] = k);

      return {
        id: `1-${levelId}-${i+1}`,
        type: 'match_pairs',
        question: { pt: `Combine os elementos com suas posições:` },
        items: shuffleArray(Object.keys(pairs)),
        pairs: pairs,
        reward: 20
      };
    } else {
      const row = Math.floor(Math.random() * 3) + 1;
      const col = Math.floor(Math.random() * 3) + 1;
      return {
        id: `1-${levelId}-${i+1}`,
        type: 'multiple_choice',
        question: { pt: `Onde se localiza o elemento a${row}${col}?` },
        options: shuffleArray([
          `Linha ${row}, Coluna ${col}`, 
          `Linha ${col}, Coluna ${row}`, 
          `Linha ${row+1}, Coluna ${col}`, 
          `Coluna ${row}, Linha ${col}`
        ]),
        correctAnswer: `Linha ${row}, Coluna ${col}`,
        reward: 15
      };
    }
  });
};

const generateTypesLevel = (levelId) => {
  return Array.from({ length: 10 }, (_, i) => {
    return {
      id: `1-${levelId}-${i+1}`,
      type: 'true_false',
      question: { pt: `Atividade ${i+1}: Uma Matriz Quadrada possui o mesmo número de linhas e colunas.` },
      options: ['Verdadeiro', 'Falso'],
      correctAnswer: 'Verdadeiro',
      reward: 15
    };
  });
};

const generateAdditionLevel = (levelId) => {
  return Array.from({ length: 10 }, (_, i) => {
    return {
      id: `2-${levelId}-${i+1}`,
      type: 'true_false',
      question: { pt: `Atividade ${i+1}: Só é possível somar matrizes que possuam a mesma dimensão.` },
      options: ['Verdadeiro', 'Falso'],
      correctAnswer: 'Verdadeiro',
      reward: 15
    };
  });
};

const generateMultiplicationLevel = (levelId) => {
  return Array.from({ length: 10 }, (_, i) => {
    const scalar = Math.floor(Math.random() * 5) + 2;
    const element = Math.floor(Math.random() * 10) + 1;
    return {
      id: `3-${levelId}-${i+1}`,
      type: 'multiple_choice',
      question: { pt: `Se multiplicarmos a matriz por um escalar ${scalar}, o elemento que era ${element} passará a ser:` },
      options: shuffleArray([`${scalar * element}`, `${scalar + element}`, `${element}`, `${scalar * element + 1}`]),
      correctAnswer: `${scalar * element}`,
      reward: 20
    };
  });
};

export const missionsData = [
  {
    id: 1,
    title: { pt: 'O Despertar da Magia (Matrizes)' },
    description: { pt: 'Dimensões, linhas e elementos mágicos.' },
    dialogues: {
      intro: [
        { speaker: 'Mago Alfa', text: { pt: 'Saudações, jovem aprendiz! Para conjurar feitiços matriciais, primeiro você deve entender as dimensões.' } },
        { speaker: 'Mago Alfa', text: { pt: 'Uma matriz é como um grimório: dividida em Linhas (horizontais) e Colunas (verticais).' } },
      ],
      outro: []
    },
    levels: [
      { id: 1, title: { pt: 'Feitiços de Dimensão' }, activities: generateIntroLevel(1) },
      { id: 2, title: { pt: 'Elementos Ocultos' }, activities: generateElementsLevel(2) },
      { id: 3, title: { pt: 'Grimórios Especiais' }, activities: generateTypesLevel(3) }
    ]
  },
  {
    id: 2,
    title: { pt: 'Alquimia: Soma e Subtração' },
    description: { pt: 'Combinando elementos iguais.' },
    dialogues: {
      intro: [
        { speaker: 'Alquimista Beta', text: { pt: 'Bem-vindo ao laboratório! Para somar poções (matrizes), elas precisam ter o mesmo tamanho exato!' } }
      ],
      outro: []
    },
    levels: [
      { id: 1, title: { pt: 'A Regra de Ouro' }, activities: generateAdditionLevel(1) },
      { id: 2, title: { pt: 'Mistura Prática' }, activities: generateAdditionLevel(2) },
      { id: 3, title: { pt: 'Subtração Escura' }, activities: generateAdditionLevel(3) }
    ]
  },
  {
    id: 3,
    title: { pt: 'Poder Escalar' },
    description: { pt: 'Multiplicando seu poder.' },
    dialogues: {
      intro: [
        { speaker: 'Rei Escalar', text: { pt: 'Eu sou o Rei Escalar. Qualquer número que você me der, multiplicarei por todos os elementos do seu grimório!' } }
      ],
      outro: []
    },
    levels: [
      { id: 1, title: { pt: 'O Toque do Rei' }, activities: generateMultiplicationLevel(1) },
      { id: 2, title: { pt: 'Amplificação' }, activities: generateMultiplicationLevel(2) },
      { id: 3, title: { pt: 'Batalha Final' }, activities: generateMultiplicationLevel(3) }
    ]
  }
];
