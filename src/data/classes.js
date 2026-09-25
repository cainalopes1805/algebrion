import { L } from '../i18n/core';

export const RESPEC_GOLD_COST = 50;

export const ATTRIBUTE_IDS = ['intellect', 'vigor', 'focus', 'fortune'];

export const ATTRIBUTES = {
  intellect: {
    id: 'intellect',
    name: L('Intelecto', 'Intellect', 'Intelecto', 'Intellect'),
    desc: L(
      'Amplia a mente mágica. Cada ponto concede +1 de Mana Máxima para feitiços em batalha.',
      'Expands the magical mind. Each point grants +1 Maximum Mana for battle spells.',
      'Amplía la mente mágica. Cada punto otorga +1 de Maná Máximo para hechizos en batalla.',
      'Étend l’esprit magique. Chaque point accorde +1 Mana Maximum pour les sorts de combat.'
    ),
    statLabel: L('+1 Mana Máxima', '+1 Max Mana', '+1 Maná Máximo', '+1 Mana Maximum'),
    icon: 'Brain',
    color: '#6fa8ff',
    max: 10,
  },
  vigor: {
    id: 'vigor',
    name: L('Vigor', 'Vigor', 'Vigor', 'Vigueur'),
    desc: L(
      'Fortalece a resistência vital. Cada ponto concede +1 Coração Máximo de vida.',
      'Strengthens vital endurance. Each point grants +1 Maximum Heart of health.',
      'Fortalece la resistencia vital. Cada punto otorga +1 Corazón Máximo de salud.',
      'Renforce l’endurance vitale. Chaque point accorde +1 Cœur Maximum de santé.'
    ),
    statLabel: L('+1 Coração Máximo', '+1 Max Heart', '+1 Corazón Máximo', '+1 Cœur Maximum'),
    icon: 'Heart',
    color: '#e2554d',
    max: 10,
  },
  focus: {
    id: 'focus',
    name: L('Foco', 'Focus', 'Foco', 'Focalisation'),
    desc: L(
      'Aguça a concentração. Cada ponto concede +1 de Mana inicial em batalhas, e a cada 2 pontos concede +1 pista grátis por fase.',
      'Sharpens concentration. Each point grants +1 starting Mana in battles, and every 2 points grant +1 free clue per stage.',
      'Agudiza la concentración. Cada punto otorga +1 de Maná inicial en batallas, y cada 2 puntos otorgan +1 pista gratis por fase.',
      'Aiguise la concentration. Chaque point accorde +1 Mana de départ en combat, et tous les 2 points accordent +1 indice gratuit par niveau.'
    ),
    statLabel: L('+1 Mana Inicial (cada 2 pts: +1 Pista)', '+1 Start Mana (every 2 pts: +1 Clue)', '+1 Maná Inicial (cada 2 pts: +1 Pista)', '+1 Mana Départ (tous les 2 pts: +1 Indice)'),
    icon: 'Eye',
    color: '#e6c67f',
    max: 10,
  },
  fortune: {
    id: 'fortune',
    name: L('Fortuna', 'Fortune', 'Fortuna', 'Fortune'),
    desc: L(
      'Favorece a sorte e a recompensa. Cada ponto concede +5% de Ouro e +3% de XP ao concluir qualquer atividade ou fase.',
      'Favors luck and bounties. Each point grants +5% Gold and +3% XP upon completing any activity or stage.',
      'Favorece la suerte y la recompensa. Cada punto otorga +5% de Oro y +3% de EXP al completar cualquier actividad o fase.',
      'Favorise la chance et les récompenses. Chaque point accorde +5% d’Or et +3% d’XP à la fin de toute activité ou niveau.'
    ),
    statLabel: L('+5% Ouro, +3% XP', '+5% Gold, +3% XP', '+5% Oro, +3% EXP', '+5% Or, +3% XP'),
    icon: 'Coins',
    color: '#c79a46',
    max: 10,
  },
};

export const HERO_CLASSES = {
  mage: {
    id: 'mage',
    name: L('Mago', 'Mage', 'Mago', 'Mage'),
    role: L('Arcano das Matrizes', 'Arcanist of Matrices', 'Arcano de las Matrices', 'Arcaniste des Matrices'),
    passiveName: L('Econômico Arcano', 'Arcane Economy', 'Economía Arcana', 'Économie Arcane'),
    passiveDesc: L(
      'O primeiro feitiço lançado em cada batalha custa 1 de mana a menos (mínimo 1).',
      'The first spell cast in each battle costs 1 less mana (minimum 1).',
      'El primer hechizo lanzado en cada batalla cuesta 1 menos de maná (mínimo 1).',
      'Le premier sort lancé dans chaque combat coûte 1 mana de moins (minimum 1).'
    ),
    icon: 'WandSparkles',
    color: '#7fb2ff',
  },
  knight: {
    id: 'knight',
    name: L('Cavaleiro', 'Knight', 'Caballero', 'Chevalier'),
    role: L('Guardião do Determinante', 'Guardian of the Determinant', 'Guardián del Determinante', 'Gardien du Déterminant'),
    passiveName: L('Vanguarda Inabalável', 'Steadfast Vanguard', 'Vanguardia Inquebrantable', 'Avant-garde Inébranlable'),
    passiveDesc: L(
      'Começa cada batalha com 1 carga de escudo protetor contra erros.',
      'Starts each battle with 1 protective shield charge against mistakes.',
      'Comienza cada batalla con 1 carga de escudo protector contra errores.',
      'Commence chaque combat avec 1 charge de bouclier protecteur.'
    ),
    icon: 'Shield',
    color: '#ffd27a',
  },
  ranger: {
    id: 'ranger',
    name: L('Arqueira', 'Ranger', 'Arquera', 'Archère'),
    role: L('Precisão nos Elementos', 'Precision with Entries', 'Precisión en los Elementos', 'Précision sur les Éléments'),
    passiveName: L('Flecha Perfurante', 'Piercing Shot', 'Flecha Perforante', 'Tir Perforant'),
    passiveDesc: L(
      'Feitiços de resolver questões avançam +1 questão adicional.',
      'Spells that solve questions advance +1 additional question.',
      'Los hechizos que resuelven preguntas avanzan +1 pregunta adicional.',
      'Les sorts qui résolvent des questions avancent d’une question supplémentaire.'
    ),
    icon: 'Crosshair',
    color: '#8ce3b4',
  },
  alchemist: {
    id: 'alchemist',
    name: L('Alquimista', 'Alchemist', 'Alquimista', 'Alchimiste'),
    role: L('Mestre das Somas', 'Master of Sums', 'Maestro de las Sumas', 'Maître des Sommes'),
    passiveName: L('Infusão Vital', 'Vital Infusion', 'Infusión Vital', 'Infusion Vitale'),
    passiveDesc: L(
      'Feitiços e efeitos de cura restauram +1 coração adicional.',
      'Healing spells and effects restore +1 additional heart.',
      'Los hechizos y efectos de curación restauran +1 corazón adicional.',
      'Les sorts et effets de soin restaurent +1 cœur supplémentaire.'
    ),
    icon: 'FlaskConical',
    color: '#c48cff',
  },
  bard: {
    id: 'bard',
    name: L('Bardo', 'Bard', 'Bardo', 'Barde'),
    role: L('Canta as Fórmulas', 'Sings the Formulas', 'Canta las Fórmulas', 'Chante les Formules'),
    passiveName: L('Cadência Inspiradora', 'Inspiring Cadence', 'Cadencia Inspiradora', 'Cadence Inspirante'),
    passiveDesc: L(
      'Sequências de acertos (combo ≥ 3) rendem +1 de mana extra e +15% de XP na fase.',
      'Hit streaks (combo ≥ 3) grant +1 extra mana and +15% XP in the stage.',
      'Las rachas de aciertos (combo ≥ 3) otorgan +1 de maná adicional y +15% de EXP.',
      'Les séries de réussites (combo ≥ 3) accordent +1 mana supplémentaire et +15% d’XP.'
    ),
    icon: 'Music',
    color: '#ffb676',
  },
};

// Árvores de talentos por herói: 3 ramos x 3 níveis = 9 talentos por classe
export const CLASS_TALENT_BRANCHES = {
  mage: [
    L('Arcanismo', 'Arcanism', 'Arcanismo', 'Arcanisme'),
    L('Mente Serena', 'Serene Mind', 'Mente Serena', 'Esprit Serein'),
    L('Defesa Espectral', 'Spectral Defense', 'Defensa Espectral', 'Défense Spectrale'),
  ],
  knight: [
    L('Bastião', 'Bastion', 'Bastión', 'Bastion'),
    L('Liderança', 'Leadership', 'Liderazgo', 'Commandement'),
    L('Determinação', 'Determination', 'Determinación', 'Détermination'),
  ],
  ranger: [
    L('Precisão', 'Precision', 'Precisión', 'Précision'),
    L('Sobrevivência', 'Survival', 'Supervivencia', 'Survie'),
    L('Celeridade', 'Celerity', 'Celeridad', 'Vélocité'),
  ],
  alchemist: [
    L('Farmacopeia', 'Pharmacopeia', 'Farmacopea', 'Pharmacopée'),
    L('Transmutação', 'Transmutation', 'Transmutación', 'Transmutation'),
    L('Catalisadores', 'Catalysts', 'Catalizadores', 'Catalyseurs'),
  ],
  bard: [
    L('Harmonia', 'Harmony', 'Armonía', 'Harmonie'),
    L('Popularidade', 'Renown', 'Popularidad', 'Renommée'),
    L('Improviso', 'Improv', 'Improvisación', 'Improvisation'),
  ],
};

export const CLASS_TALENTS = {
  // ── Mago ──
  mage: [
    // Ramo 0: Arcanismo
    {
      id: 'mage_b0_t1',
      branch: 0,
      tier: 1,
      name: L('Fluxo Mágico', 'Magic Flow', 'Flujo Mágico', 'Flux Magique'),
      desc: L('+1 de Mana inicial em batalhas.', '+1 starting Mana in battles.', '+1 de Maná inicial en batallas.', '+1 Mana de départ en combat.'),
      icon: 'Zap',
      requires: null,
      effect: { startMana: 1 },
    },
    {
      id: 'mage_b0_t2',
      branch: 0,
      tier: 2,
      name: L('Canalização Arcana', 'Arcane Channeling', 'Canalización Arcana', 'Canalisation Arcane'),
      desc: L('+1 de Mana Máxima.', '+1 Maximum Mana.', '+1 de Maná Máximo.', '+1 Mana Maximum.'),
      icon: 'Brain',
      requires: 'mage_b0_t1',
      effect: { maxMana: 1 },
    },
    {
      id: 'mage_b0_t3',
      branch: 0,
      tier: 3,
      name: L('Epifania Elemental', 'Elemental Epiphany', 'Epifanía Elemental', 'Épiphanie Élémentaire'),
      desc: L('Acertos perfeitos regeneram +1 mana adicional em batalhas.', 'Perfect answers restore +1 additional mana in battles.', 'Aciertos perfectos restauran +1 maná adicional.', 'Les réussites parfaites restaurent +1 mana supplémentaire.'),
      icon: 'Sparkles',
      requires: 'mage_b0_t2',
      effect: { perfectMana: 1 },
    },
    // Ramo 1: Mente Serena
    {
      id: 'mage_b1_t1',
      branch: 1,
      tier: 1,
      name: L('Olhar Analítico', 'Analytical Eye', 'Mirada Analítica', 'Œil Analytique'),
      desc: L('+1 pista reveladora gratuita por fase.', '+1 free revealing clue per stage.', '+1 pista gratuita por fase.', '+1 indice gratuit par niveau.'),
      icon: 'Eye',
      requires: null,
      effect: { hints: 1 },
    },
    {
      id: 'mage_b1_t2',
      branch: 1,
      tier: 2,
      name: L('Estudo Metódico', 'Methodical Study', 'Estudio Metódico', 'Étude Méthodique'),
      desc: L('+10% de XP ao concluir fases.', '+10% XP on stage completion.', '+10% de EXP al completar fases.', '+10% d’XP en fin de niveau.'),
      icon: 'Target',
      requires: 'mage_b1_t1',
      effect: { xpBonus: 10 },
    },
    {
      id: 'mage_b1_t3',
      branch: 1,
      tier: 3,
      name: L('Clube dos Sábios', 'Scholars’ Club', 'Club de los Sabios', 'Cercle des Érudits'),
      desc: L('+15% de Ouro obtido em provas e lições.', '+15% Gold gained from exams and lessons.', '+15% de Oro en exámenes y lecciones.', '+15% d’Or dans les examens et leçons.'),
      icon: 'Coins',
      requires: 'mage_b1_t2',
      effect: { goldBonus: 15 },
    },
    // Ramo 2: Defesa Espectral
    {
      id: 'mage_b2_t1',
      branch: 2,
      tier: 1,
      name: L('Barreira Rúnica', 'Runic Barrier', 'Barrera Rúnica', 'Barrière Runique'),
      desc: L('+1 carga de escudo inicial em batalhas de chefe.', '+1 starting shield charge in boss battles.', '+1 escudo inicial en batallas de jefe.', '+1 bouclier de départ contre les boss.'),
      icon: 'Shield',
      requires: null,
      effect: { bossShield: 1 },
    },
    {
      id: 'mage_b2_t2',
      branch: 2,
      tier: 2,
      name: L('Aura Protetora', 'Protective Aura', 'Aura Protectora', 'Aura Protectrice'),
      desc: L('+1 Coração Máximo.', '+1 Maximum Heart.', '+1 Corazón Máximo.', '+1 Cœur Maximum.'),
      icon: 'Heart',
      requires: 'mage_b2_t1',
      effect: { maxHearts: 1 },
    },
    {
      id: 'mage_b2_t3',
      branch: 2,
      tier: 3,
      name: L('Prece Arcana', 'Arcane Prayer', 'Rezo Arcano', 'Prière Arcane'),
      desc: L('Vencer qualquer fase restaura 1 coração extra.', 'Clearing any stage restores 1 extra heart.', 'Superar cualquier fase restaura 1 corazón extra.', 'Terminer un niveau restaure 1 cœur supplémentaire.'),
      icon: 'Heart',
      requires: 'mage_b2_t2',
      effect: { winHeal: 1 },
    },
  ],

  // ── Cavaleiro ──
  knight: [
    // Ramo 0: Bastião
    {
      id: 'knight_b0_t1',
      branch: 0,
      tier: 1,
      name: L('Couraça Forjada', 'Forged Cuirass', 'Coraza Forjada', 'Cuirasse Forgée'),
      desc: L('+1 carga de escudo adicional em batalhas.', '+1 additional shield charge in battles.', '+1 carga de escudo adicional en batallas.', '+1 charge de bouclier supplémentaire en combat.'),
      icon: 'Shield',
      requires: null,
      effect: { startShield: 1 },
    },
    {
      id: 'knight_b0_t2',
      branch: 0,
      tier: 2,
      name: L('Constituição Inabalável', 'Unyielding Constitution', 'Constitución Inquebrantable', 'Constitution Inébranlable'),
      desc: L('+1 Coração Máximo.', '+1 Maximum Heart.', '+1 Corazón Máximo.', '+1 Cœur Maximum.'),
      icon: 'Heart',
      requires: 'knight_b0_t1',
      effect: { maxHearts: 1 },
    },
    {
      id: 'knight_b0_t3',
      branch: 0,
      tier: 3,
      name: L('Bastião Sagrado', 'Holy Bastion', 'Bastión Sagrado', 'Bastion Sacré'),
      desc: L('+1 escudo adicional contra chefes e +1 Coração Máximo.', '+1 extra shield against bosses and +1 Max Heart.', '+1 escudo extra contra jefes y +1 Corazón Máximo.', '+1 bouclier extra contre les boss et +1 Cœur Maximum.'),
      icon: 'ShieldCheck',
      requires: 'knight_b0_t2',
      effect: { bossShield: 1, maxHearts: 1 },
    },
    // Ramo 1: Liderança
    {
      id: 'knight_b1_t1',
      branch: 1,
      tier: 1,
      name: L('Soldo da Guarda', 'Guard’s Pay', 'Paga de la Guardia', 'Solde de la Garde'),
      desc: L('+10% de Ouro obtido ao vencer fases.', '+10% Gold earned from stage victories.', '+10% de Oro obtenido al superar fases.', '+10% d’Or obtenu en fin de niveau.'),
      icon: 'Coins',
      requires: null,
      effect: { goldBonus: 10 },
    },
    {
      id: 'knight_b1_t2',
      branch: 1,
      tier: 2,
      name: L('Ordem de Cavalaria', 'Chivalric Order', 'Orden de Caballería', 'Ordre de Chevalerie'),
      desc: L('+10% de XP ao concluir fases.', '+10% XP on stage completion.', '+10% de EXP al completar fases.', '+10% d’XP en fin de niveau.'),
      icon: 'Award',
      requires: 'knight_b1_t1',
      effect: { xpBonus: 10 },
    },
    {
      id: 'knight_b1_t3',
      branch: 1,
      tier: 3,
      name: L('Vitória Triunfal', 'Triumphal Victory', 'Victoria Triunfal', 'Victoire Triomphale'),
      desc: L('+15% de Ouro e +10% de XP em chefes e provas.', '+15% Gold and +10% XP in bosses and exams.', '+15% de Oro y +10% de EXP en jefes y exámenes.', '+15% d’Or et +10% d’XP contre les boss et examens.'),
      icon: 'Coins',
      requires: 'knight_b1_t2',
      effect: { goldBonus: 15, xpBonus: 10 },
    },
    // Ramo 2: Determinação
    {
      id: 'knight_b2_t1',
      branch: 2,
      tier: 1,
      name: L('Foco Marcial', 'Martial Focus', 'Foco Marcial', 'Focus Martial'),
      desc: L('+1 de Mana inicial em batalhas.', '+1 starting Mana in battles.', '+1 de Maná inicial en batallas.', '+1 Mana de départ en combat.'),
      icon: 'Zap',
      requires: null,
      effect: { startMana: 1 },
    },
    {
      id: 'knight_b2_t2',
      branch: 2,
      tier: 2,
      name: L('Postura Inflexível', 'Steadfast Stance', 'Postura Inflexible', 'Posture Inflexible'),
      desc: L('Vencer uma fase restaura 1 coração.', 'Clearing a stage restores 1 heart.', 'Superar una fase restaura 1 corazón.', 'Terminer un niveau restaure 1 cœur.'),
      icon: 'Heart',
      requires: 'knight_b2_t1',
      effect: { winHeal: 1 },
    },
    {
      id: 'knight_b2_t3',
      branch: 2,
      tier: 3,
      name: L('Vontade de Ferro', 'Iron Will', 'Voluntad de Hierro', 'Volonté de Fer'),
      desc: L('+1 Mana Máxima e +1 Pista gratuita por fase.', '+1 Max Mana and +1 free clue per stage.', '+1 Maná Máximo y +1 pista gratis por fase.', '+1 Mana Maximum et +1 indice gratuit par niveau.'),
      icon: 'Brain',
      requires: 'knight_b2_t2',
      effect: { maxMana: 1, hints: 1 },
    },
  ],

  // ── Arqueira ──
  ranger: [
    // Ramo 0: Precisão
    {
      id: 'ranger_b0_t1',
      branch: 0,
      tier: 1,
      name: L('Visão Aguçada', 'Keen Sight', 'Visión Aguzada', 'Vue Aiguisée'),
      desc: L('+1 pista reveladora gratuita por fase.', '+1 free revealing clue per stage.', '+1 pista gratuita por fase.', '+1 indice gratuit par niveau.'),
      icon: 'Eye',
      requires: null,
      effect: { hints: 1 },
    },
    {
      id: 'ranger_b0_t2',
      branch: 0,
      tier: 2,
      name: L('Disparo Preciso', 'Accurate Shot', 'Disparo Preciso', 'Tir Précis'),
      desc: L('+12% de XP ao concluir fases.', '+12% XP upon completing stages.', '+12% de EXP al completar fases.', '+12% d’XP en fin de niveau.'),
      icon: 'Crosshair',
      requires: 'ranger_b0_t1',
      effect: { xpBonus: 12 },
    },
    {
      id: 'ranger_b0_t3',
      branch: 0,
      tier: 3,
      name: L('Flecha Perfeita', 'Perfect Arrow', 'Flecha Perfecta', 'Flèche Parfaite'),
      desc: L('Feitiços de resolução avançam +1 questão extra.', 'Solving spells advance +1 additional question.', 'Hechizos de resolución avanzan +1 pregunta extra.', 'Les sorts de résolution avancent d’une question supplémentaire.'),
      icon: 'Target',
      requires: 'ranger_b0_t2',
      effect: { skipBonus: 1 },
    },
    // Ramo 1: Sobrevivência
    {
      id: 'ranger_b1_t1',
      branch: 1,
      tier: 1,
      name: L('Passos Silenciosos', 'Silent Steps', 'Pasos Silenciosos', 'Pas Silencieux'),
      desc: L('+1 carga de escudo inicial em batalhas.', '+1 starting shield charge in battles.', '+1 escudo inicial en batallas.', '+1 bouclier de départ en combat.'),
      icon: 'Shield',
      requires: null,
      effect: { startShield: 1 },
    },
    {
      id: 'ranger_b1_t2',
      branch: 1,
      tier: 2,
      name: L('Ervas da Floresta', 'Woodland Herbs', 'Hierbas del Bosque', 'Herbes des Bois'),
      desc: L('Vencer uma fase restaura 1 coração.', 'Clearing a stage restores 1 heart.', 'Superar una fase restaura 1 corazón.', 'Terminer un niveau restaure 1 cœur.'),
      icon: 'Heart',
      requires: 'ranger_b1_t1',
      effect: { winHeal: 1 },
    },
    {
      id: 'ranger_b1_t3',
      branch: 1,
      tier: 3,
      name: L('Instinto Predador', 'Apex Instinct', 'Instinto Depredador', 'Instinct de Prédateur'),
      desc: L('+1 Coração Máximo.', '+1 Maximum Heart.', '+1 Corazón Máximo.', '+1 Cœur Maximum.'),
      icon: 'Heart',
      requires: 'ranger_b1_t2',
      effect: { maxHearts: 1 },
    },
    // Ramo 2: Celeridade
    {
      id: 'ranger_b2_t1',
      branch: 2,
      tier: 1,
      name: L('Coleta Rápida', 'Swift Harvest', 'Recolección Rápida', 'Récolte Rapide'),
      desc: L('+10% de Ouro obtido ao vencer fases.', '+10% Gold earned from stage victories.', '+10% de Oro al superar fases.', '+10% d’Or en fin de niveau.'),
      icon: 'Coins',
      requires: null,
      effect: { goldBonus: 10 },
    },
    {
      id: 'ranger_b2_t2',
      branch: 2,
      tier: 2,
      name: L('Fôlego Arcano', 'Arcane Breath', 'Aliento Arcano', 'Souffle Arcane'),
      desc: L('+1 de Mana Máxima e +1 de Mana inicial em batalhas.', '+1 Max Mana and +1 starting Mana in battles.', '+1 Maná Máximo y +1 Maná inicial.', '+1 Mana Maximum et +1 Mana de départ.'),
      icon: 'Zap',
      requires: 'ranger_b2_t1',
      effect: { maxMana: 1, startMana: 1 },
    },
    {
      id: 'ranger_b2_t3',
      branch: 2,
      tier: 3,
      name: L('Tiro Múltiplo', 'Multi-Shot', 'Disparo Múltiple', 'Tir Multiple'),
      desc: L('Acertos com combo ≥ 3 concedem +1 de mana extra.', 'Answers with combo ≥ 3 grant +1 extra mana.', 'Aciertos con combo ≥ 3 otorgan +1 de maná extra.', 'Réussites avec combo ≥ 3 accordent +1 mana supplémentaire.'),
      icon: 'Sparkles',
      requires: 'ranger_b2_t2',
      effect: { comboManaBonus: 1 },
    },
  ],

  // ── Alquimista ──
  alchemist: [
    // Ramo 0: Farmacopeia
    {
      id: 'alchemist_b0_t1',
      branch: 0,
      tier: 1,
      name: L('Tônico de Ervas', 'Herbal Tonic', 'Tónico de Hierbas', 'Tonique d’Herbes'),
      desc: L('Feitiços e efeitos de cura restauram +1 coração adicional.', 'Healing spells and effects restore +1 extra heart.', 'Hechizos y efectos de cura restauran +1 corazón adicional.', 'Les sorts et effets de soin restaurent +1 cœur supplémentaire.'),
      icon: 'FlaskConical',
      requires: null,
      effect: { healBonus: 1 },
    },
    {
      id: 'alchemist_b0_t2',
      branch: 0,
      tier: 2,
      name: L('Elixir da Vitalidade', 'Elixir of Vitality', 'Elixir de Vitalidad', 'Élixir de Vitalité'),
      desc: L('+1 Coração Máximo.', '+1 Maximum Heart.', '+1 Corazón Máximo.', '+1 Cœur Maximum.'),
      icon: 'Heart',
      requires: 'alchemist_b0_t1',
      effect: { maxHearts: 1 },
    },
    {
      id: 'alchemist_b0_t3',
      branch: 0,
      tier: 3,
      name: L('Panaceia Filosofal', 'Philosopher’s Panacea', 'Panacea Filosofal', 'Panacée Philosophale'),
      desc: L('Vencer uma fase restaura 1 coração extra e concede +1 escudo contra chefes.', 'Clearing a stage restores 1 extra heart and grants +1 shield against bosses.', 'Superar una fase restaura 1 corazón extra y da +1 escudo contra jefes.', 'Terminer un niveau restaure 1 cœur et accorde +1 bouclier contre les boss.'),
      icon: 'Heart',
      requires: 'alchemist_b0_t2',
      effect: { winHeal: 1, bossShield: 1 },
    },
    // Ramo 1: Transmutação
    {
      id: 'alchemist_b1_t1',
      branch: 1,
      tier: 1,
      name: L('Crisopeia Menor', 'Lesser Chrysopoeia', 'Crisopeya Menor', 'Chrysopée Mineure'),
      desc: L('+12% de Ouro obtido ao vencer fases.', '+12% Gold earned from stage victories.', '+12% de Oro obtenido al superar fases.', '+12% d’Or obtenu en fin de niveau.'),
      icon: 'Coins',
      requires: null,
      effect: { goldBonus: 12 },
    },
    {
      id: 'alchemist_b1_t2',
      branch: 1,
      tier: 2,
      name: L('Destilação de Sabedoria', 'Wisdom Distillation', 'Destilación de Sabiduría', 'Distillation de Sagesse'),
      desc: L('+10% de XP ao concluir fases.', '+10% XP on stage completion.', '+10% de EXP al completar fases.', '+10% d’XP en fin de niveau.'),
      icon: 'Brain',
      requires: 'alchemist_b1_t1',
      effect: { xpBonus: 10 },
    },
    {
      id: 'alchemist_b1_t3',
      branch: 1,
      tier: 3,
      name: L('Pedra Filosofal', 'Philosopher’s Stone', 'Piedra Filosofal', 'Pierre Philosophale'),
      desc: L('+15% de Ouro e +10% de XP em todas as fases.', '+15% Gold and +10% XP across all stages.', '+15% de Oro y +10% de EXP en todas las fases.', '+15% d’Or et +10% d’XP sur tous les niveaux.'),
      icon: 'Coins',
      requires: 'alchemist_b1_t2',
      effect: { goldBonus: 15, xpBonus: 10 },
    },
    // Ramo 2: Catalisadores
    {
      id: 'alchemist_b2_t1',
      branch: 2,
      tier: 1,
      name: L('Reagente Volátil', 'Volatile Reagent', 'Reactivo Volátil', 'Réactif Volatil'),
      desc: L('+1 de Mana inicial em batalhas.', '+1 starting Mana in battles.', '+1 de Maná inicial en batallas.', '+1 Mana de départ en combat.'),
      icon: 'Zap',
      requires: null,
      effect: { startMana: 1 },
    },
    {
      id: 'alchemist_b2_t2',
      branch: 2,
      tier: 2,
      name: L('Solvente Puro', 'Pure Solvent', 'Solvente Puro', 'Solvant Pur'),
      desc: L('+1 pista reveladora gratuita por fase.', '+1 free revealing clue per stage.', '+1 pista gratuita por fase.', '+1 indice gratuit par niveau.'),
      icon: 'Eye',
      requires: 'alchemist_b2_t1',
      effect: { hints: 1 },
    },
    {
      id: 'alchemist_b2_t3',
      branch: 2,
      tier: 3,
      name: L('Catalisador Arcano', 'Arcane Catalyst', 'Catalizador Arcano', 'Catalyseur Arcane'),
      desc: L('+1 Mana Máxima e +1 de Mana inicial em batalhas.', '+1 Max Mana and +1 starting Mana in battles.', '+1 Maná Máximo y +1 Maná inicial.', '+1 Mana Maximum et +1 Mana de départ.'),
      icon: 'Sparkles',
      requires: 'alchemist_b2_t2',
      effect: { maxMana: 1, startMana: 1 },
    },
  ],

  // ── Bardo ──
  bard: [
    // Ramo 0: Harmonia
    {
      id: 'bard_b0_t1',
      branch: 0,
      tier: 1,
      name: L('Canto Rítmico', 'Rhythmic Chant', 'Canto Rítmico', 'Chant Rythmé'),
      desc: L('Combos de acerto rendem +1 de mana extra.', 'Hit streaks grant +1 extra mana.', 'Rachas de aciertos otorgan +1 de maná extra.', 'Les séries de réussites accordent +1 mana supplémentaire.'),
      icon: 'Music',
      requires: null,
      effect: { comboManaBonus: 1 },
    },
    {
      id: 'bard_b0_t2',
      branch: 0,
      tier: 2,
      name: L('Balada Heroica', 'Heroic Ballad', 'Balada Heroica', 'Ballade Héroïque'),
      desc: L('+12% de XP ao concluir fases.', '+12% XP upon completing stages.', '+12% de EXP al completar fases.', '+12% d’XP en fin de niveau.'),
      icon: 'Award',
      requires: 'bard_b0_t1',
      effect: { xpBonus: 12 },
    },
    {
      id: 'bard_b0_t3',
      branch: 0,
      tier: 3,
      name: L('Crescendo Sublime', 'Sublime Crescendo', 'Crescendo Sublime', 'Crescendo Sublime'),
      desc: L('+15% de XP e +1 de Mana inicial em batalhas.', '+15% XP and +1 starting Mana in battles.', '+15% de EXP y +1 de Maná inicial.', '+15% d’XP et +1 Mana de départ.'),
      icon: 'Sparkles',
      requires: 'bard_b0_t2',
      effect: { xpBonus: 15, startMana: 1 },
    },
    // Ramo 1: Popularidade
    {
      id: 'bard_b1_t1',
      branch: 1,
      tier: 1,
      name: L('Chapéu de Moedas', 'Coin Hat', 'Sombrero de Monedas', 'Chapeau aux Pièces'),
      desc: L('+10% de Ouro obtido em vitórias.', '+10% Gold earned on stage victories.', '+10% de Oro obtenido en victorias.', '+10% d’Or obtenu lors des victoires.'),
      icon: 'Coins',
      requires: null,
      effect: { goldBonus: 10 },
    },
    {
      id: 'bard_b1_t2',
      branch: 1,
      tier: 2,
      name: L('Gorjeta Farta', 'Handsome Tip', 'Propina Generosa', 'Pourboire Généreux'),
      desc: L('+15% de Ouro adicional em provas e chefes.', '+15% extra Gold in exams and bosses.', '+15% de Oro adicional en exámenes y jefes.', '+15% d’Or supplémentaire dans les examens et boss.'),
      icon: 'Coins',
      requires: 'bard_b1_t1',
      effect: { goldBonus: 15 },
    },
    {
      id: 'bard_b1_t3',
      branch: 1,
      tier: 3,
      name: L('Menestrel do Rei', 'King’s Minstrel', 'Menestrel del Rey', 'Ménestrel du Roi'),
      desc: L('+20% de Ouro em todas as atividades.', '+20% Gold in all activities.', '+20% de Oro en todas las actividades.', '+20% d’Or sur toutes les activités.'),
      icon: 'Award',
      requires: 'bard_b1_t2',
      effect: { goldBonus: 20 },
    },
    // Ramo 2: Improviso
    {
      id: 'bard_b2_t1',
      branch: 2,
      tier: 1,
      name: L('Truque Teatral', 'Theatrical Trick', 'Truco Teatral', 'Tour Théâtral'),
      desc: L('+1 pista reveladora gratuita por fase.', '+1 free revealing clue per stage.', '+1 pista gratuita por fase.', '+1 indice gratuit par niveau.'),
      icon: 'Eye',
      requires: null,
      effect: { hints: 1 },
    },
    {
      id: 'bard_b2_t2',
      branch: 2,
      tier: 2,
      name: L('Presença de Espírito', 'Presence of Mind', 'Presencia de Ánimo', 'Présence d’Esprit'),
      desc: L('+1 carga de escudo inicial em batalhas.', '+1 starting shield charge in battles.', '+1 escudo inicial en batallas.', '+1 bouclier de départ en combat.'),
      icon: 'Shield',
      requires: 'bard_b2_t1',
      effect: { startShield: 1 },
    },
    {
      id: 'bard_b2_t3',
      branch: 2,
      tier: 3,
      name: L('Acorde da Vida', 'Chord of Life', 'Acorde de la Vida', 'Accord de Vie'),
      desc: L('+1 Coração Máximo e vencer qualquer fase restaura 1 coração.', '+1 Max Heart and clearing any stage restores 1 heart.', '+1 Corazón Máximo y superar fases restaura 1 corazón.', '+1 Cœur Maximum et terminer un niveau restaure 1 cœur.'),
      icon: 'Heart',
      requires: 'bard_b2_t2',
      effect: { maxHearts: 1, winHeal: 1 },
    },
  ],
};

// Indexador rápido de talentos por ID
export const TALENT_BY_ID = Object.fromEntries(
  Object.values(CLASS_TALENTS).flatMap((list) => list.map((t) => [t.id, t]))
);

/* ───────────── Cálculos puros de pontos e bônus ───────────── */

export function getTotalAttributePoints(level) {
  return Math.max(0, (level - 1) * 2);
}

export function getSpentAttributePoints(attributes = {}) {
  return ATTRIBUTE_IDS.reduce((acc, id) => acc + (attributes[id] || 0), 0);
}

export function getAvailableAttributePoints(level, attributes = {}) {
  return Math.max(0, getTotalAttributePoints(level) - getSpentAttributePoints(attributes));
}

export function getTotalTalentPoints(level) {
  return Math.floor(level / 3);
}

export function getSpentTalentPoints(talents = {}, heroId) {
  return (talents[heroId] || []).length;
}

export function getAvailableTalentPoints(level, talents = {}, heroId) {
  return Math.max(0, getTotalTalentPoints(level) - getSpentTalentPoints(talents, heroId));
}

// Bônus consolidados (atributos + talentos do herói ativo + passivos de classe)
export function calculateHeroBonuses(profile) {
  const heroId = profile?.hero || 'mage';
  const attr = profile?.attributes || {};
  const learned = profile?.talents?.[heroId] || [];

  const bonuses = {
    maxMana: attr.intellect || 0,
    maxHearts: attr.vigor || 0,
    startMana: attr.focus || 0,
    hints: Math.floor((attr.focus || 0) / 2),
    goldBonus: (attr.fortune || 0) * 5,
    xpBonus: (attr.fortune || 0) * 3,
    startShield: 0,
    bossShield: 0,
    winHeal: 0,
    skipBonus: 0,
    healBonus: 0,
    comboManaBonus: 0,
    perfectMana: 0,
  };

  // Passivos de classe
  if (heroId === 'knight') {
    bonuses.startShield += 1;
  } else if (heroId === 'ranger') {
    bonuses.skipBonus += 1;
  } else if (heroId === 'alchemist') {
    bonuses.healBonus += 1;
  } else if (heroId === 'bard') {
    bonuses.comboManaBonus += 1;
    bonuses.xpBonus += 15;
  }

  // Talentos aprendidos do herói atual
  for (const tid of learned) {
    const t = TALENT_BY_ID[tid];
    if (!t?.effect) continue;
    for (const [k, v] of Object.entries(t.effect)) {
      bonuses[k] = (bonuses[k] || 0) + v;
    }
  }

  return bonuses;
}

export function calculateMaxHearts(profile) {
  const base = 5;
  const bonuses = calculateHeroBonuses(profile);
  return base + (bonuses.maxHearts || 0);
}

export function calculateMaxMana(profile) {
  const base = 6;
  const bonuses = calculateHeroBonuses(profile);
  return base + (bonuses.maxMana || 0);
}
