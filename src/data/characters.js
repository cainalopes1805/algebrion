import { L } from '../i18n/core';

// Parâmetros visuais de cada personagem — desenhados em SVG por <Character />
export const CHARACTERS = {
  // ── Heróis jogáveis ──
  mage: {
    name: L('Mago', 'Mage', 'Mago', 'Mage'), role: L('Arcano das matrizes', 'Arcanist of matrices', 'Arcano de las matrices', 'Arcaniste des matrices'),
    skin: '#f0c9a0', robe: '#3b4fbf', robe2: '#2a3a94', trim: '#f2cf7a', hair: '#d9d9e8', beard: false, hat: 'wizard', hatColor: '#3b4fbf', prop: 'staff', glow: '#7fb2ff',
  },
  knight: {
    name: L('Cavaleiro', 'Knight', 'Caballero', 'Chevalier'), role: L('Guardião do determinante', 'Guardian of the determinant', 'Guardián del determinante', 'Gardien du déterminant'),
    skin: '#e8b98f', robe: '#8a94a6', robe2: '#5f6878', trim: '#d9a441', hair: '#5a3a22', beard: false, hat: 'helm', hatColor: '#aab3c2', prop: 'sword', glow: '#ffd27a', cape: '#a3262a',
  },
  ranger: {
    name: L('Arqueira', 'Ranger', 'Arquera', 'Archère'), role: L('Precisão nos elementos', 'Precision with entries', 'Precisión en los elementos', 'Précision sur les éléments'),
    skin: '#e7bd97', robe: '#2f7d4f', robe2: '#22603c', trim: '#c9a35a', hair: '#8a3b1f', beard: false, hat: 'hood', hatColor: '#2f7d4f', prop: 'bow', glow: '#8ce3b4', braid: true,
  },
  alchemist: {
    name: L('Alquimista', 'Alchemist', 'Alquimista', 'Alchimiste'), role: L('Mestre das somas', 'Master of sums', 'Maestro de las sumas', 'Maître des sommes'),
    skin: '#dcae86', robe: '#8a3fa8', robe2: '#682f80', trim: '#f2cf7a', hair: '#2b1d10', beard: true, beardColor: '#2b1d10', hat: 'goggles', hatColor: '#6b4a2a', prop: 'flask', glow: '#c48cff',
  },
  bard: {
    name: L('Bardo', 'Bard', 'Bardo', 'Barde'), role: L('Canta as fórmulas', 'Sings the formulas', 'Canta las fórmulas', 'Chante les formules'),
    skin: '#f0c9a0', robe: '#c2703a', robe2: '#9a5528', trim: '#f2cf7a', hair: '#7a4a24', beard: false, hat: 'feather', hatColor: '#2f7d4f', prop: 'lute', glow: '#ffb676',
  },
  // ── Mentores ──
  sage: {
    name: L('Mestre Arcano', 'Arcane Master', 'Maestro Arcano', 'Maître Arcane'), role: L('Guia dos Grimórios', 'Guide of the Grimoires', 'Guía de los Grimorios', 'Guide des Grimoires'),
    skin: '#e8c8a4', robe: '#2c6b8f', robe2: '#1f4f6b', trim: '#f2cf7a', hair: '#f0f0f5', beard: true, beardColor: '#f0f0f5', longBeard: true, hat: 'wizard', hatColor: '#2c6b8f', prop: 'book', glow: '#8fd4ff',
  },
  general: {
    name: L('General Vetor', 'General Vector', 'General Vector', 'Général Vecteur'), role: L('Comandante dos Escalares', 'Commander of Scalars', 'Comandante de los Escalares', 'Commandant des Scalaires'),
    skin: '#d9a57c', robe: '#a3262a', robe2: '#7d1c20', trim: '#f2cf7a', hair: '#333', beard: true, beardColor: '#3a2a1a', hat: 'helm', hatColor: '#c9a35a', prop: 'sword', glow: '#ff9a7a', cape: '#5a0f14', plume: '#d4453f',
  },
  witch: {
    name: L('Feiticeira Speculum', 'Sorceress Speculum', 'Hechicera Speculum', 'Sorcière Speculum'), role: L('Senhora dos Espelhos', 'Lady of Mirrors', 'Señora de los Espejos', 'Dame des Miroirs'),
    skin: '#e9d0c4', robe: '#6f3fc0', robe2: '#512f92', trim: '#c9b0ff', hair: '#e8e8ff', beard: false, hat: 'witch', hatColor: '#4a2a8a', prop: 'orb', glow: '#c9b0ff',
  },
  dwarf: {
    name: L('Brogar, o Ferreiro', 'Brogar the Smith', 'Brogar el Herrero', 'Brogar le Forgeron'), role: L('Mestre da Forja', 'Master of the Forge', 'Maestro de la Forja', 'Maître de la Forge'),
    skin: '#d99a72', robe: '#8a5a2b', robe2: '#5e3b1c', trim: '#ee7a2b', hair: '#b5541c', beard: true, beardColor: '#b5541c', longBeard: true, hat: 'helm', hatColor: '#7a7f8a', prop: 'hammer', glow: '#ffb676', short: true,
  },
  oracle: {
    name: L('Oráculo Determinus', 'Oracle Determinus', 'Oráculo Determinus', 'Oracle Determinus'), role: L('Vidente do Labirinto', 'Seer of the Labyrinth', 'Vidente del Laberinto', 'Voyant du Labyrinthe'),
    skin: '#cfd6e0', robe: '#1f6f6b', robe2: '#154d4a', trim: '#8ce3e0', hair: '#0b1d1c', beard: false, hat: 'hood', hatColor: '#154d4a', prop: 'orb', glow: '#6ff0e6', eyesGlow: true,
  },
  queen: {
    name: L('Rainha Invera', 'Queen Inversa', 'Reina Inversa', 'Reine Inversa'), role: L('Soberana do Trono', 'Sovereign of the Throne', 'Soberana del Trono', 'Souveraine du Trône'),
    skin: '#f0d0b4', robe: '#8e1f3a', robe2: '#65142a', trim: '#f2cf7a', hair: '#2a1a14', beard: false, hat: 'crown', hatColor: '#f2cf7a', prop: 'scepter', glow: '#ff9ab0', braid: true,
  },
};

// ── Elenco da história ──
CHARACTERS.innkeeper = {
  name: L('Marta, a Taverneira', 'Marta the Innkeeper', 'Marta, la Tabernera', 'Marta, l’Aubergiste'), role: L('Dona do Javali Dourado', 'Keeper of the Golden Boar', 'Dueña del Jabalí Dorado', 'Patronne du Sanglier Doré'),
  skin: '#e9c4a0', robe: '#7a4a3a', robe2: '#5a3428', trim: '#d8b070', hair: '#7a3a1c', braid: true, hat: 'none', prop: 'flask', glow: '#ffb676',
};
CHARACTERS.nullus = {
  name: L('Nullus, o Senhor do Zero', 'Nullus, Lord of Zero', 'Nullus, el Señor del Cero', 'Nullus, Seigneur du Zéro'), role: L('O Vazio que devora números', 'The Void that devours numbers', 'El Vacío que devora números', 'Le Vide qui dévore les nombres'),
  skin: '#b8bcc8', robe: '#24242f', robe2: '#15151e', trim: '#8a8fa8', hair: '#111', hat: 'hood', hatColor: '#15151e', prop: 'orb', glow: '#9aa0c0', eyesGlow: true,
};

export const HERO_IDS = ['mage', 'knight', 'ranger', 'alchemist', 'bard'];

// Chefes de cada missão (desenhados em SVG por <Monster />)
export const MONSTERS = {
  ghost: { name: L('Espectro dos Índices', 'Specter of Indices', 'Espectro de los Índices', 'Spectre des Indices'), color: '#9fd8ff' },
  slime: { name: L('Gosma Alquímica', 'Alchemical Slime', 'Baba Alquímica', 'Gelée Alchimique'), color: '#7be08a' },
  golem: { name: L('Golem Escalar', 'Scalar Golem', 'Gólem Escalar', 'Golem Scalaire'), color: '#b8a48a' },
  bat: { name: L('Morcego Espelhado', 'Mirror Bat', 'Murciélago Espejado', 'Chauve-souris Miroir'), color: '#b98cff' },
  dragon: { name: L('Dragão da Forja', 'Forge Dragon', 'Dragón de la Forja', 'Dragon de la Forge'), color: '#e0563a' },
  spider: { name: L('Aranha Sombria', 'Shadow Spider', 'Araña Sombría', 'Araignée d’Ombre'), color: '#4fd6c9' },
  lich: { name: L('Lich Inverso', 'Inverse Lich', 'Lich Inverso', 'Liche Inverse'), color: '#c9f06a' },
};

// Títulos por nível do jogador
export const RANKS = [
  L('Escudeiro dos Números', 'Squire of Numbers', 'Escudero de los Números', 'Écuyer des Nombres'),
  L('Aprendiz de Grimório', 'Grimoire Apprentice', 'Aprendiz de Grimorio', 'Apprenti de Grimoire'),
  L('Alquimista Iniciado', 'Initiate Alchemist', 'Alquimista Iniciado', 'Alchimiste Initié'),
  L('Cavaleiro Escalar', 'Scalar Knight', 'Caballero Escalar', 'Chevalier Scalaire'),
  L('Mago do Espelho', 'Mirror Mage', 'Mago del Espejo', 'Mage du Miroir'),
  L('Ferreiro de Produtos', 'Product Smith', 'Herrero de Productos', 'Forgeron de Produits'),
  L('Cartógrafo do Labirinto', 'Labyrinth Cartographer', 'Cartógrafo del Laberinto', 'Cartographe du Labyrinthe'),
  L('Arquimago das Inversas', 'Archmage of Inverses', 'Archimago de las Inversas', 'Archimage des Inverses'),
  L('Mestre das Matrizes', 'Matrix Master', 'Maestro de las Matrices', 'Maître des Matrices'),
  L('Lenda de Algebrion', 'Legend of Algebrion', 'Leyenda de Algebrion', 'Légende d’Algebrion'),
];
export const rankFor = (level) => RANKS[Math.min(RANKS.length - 1, Math.floor((level - 1) / 2))];

// XP → nível (cada nível exige mais)
export const xpForLevel = (lvl) => Math.round(60 * (lvl - 1) ** 1.6 + 80 * (lvl - 1)); // XP acumulado para ALCANÇAR lvl
export const levelFromXp = (xp) => {
  let lvl = 1;
  while (xp >= xpForLevel(lvl + 1)) lvl++;
  return lvl;
};
export const levelProgress = (xp) => {
  const lvl = levelFromXp(xp);
  const a = xpForLevel(lvl), b = xpForLevel(lvl + 1);
  return { level: lvl, into: xp - a, needed: b - a, pct: (xp - a) / (b - a) };
};
