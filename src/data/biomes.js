// Cores de região: escuras e dessaturadas (nada de tons vivos)
export const BIOMES = {
  emerald: '#4b7a63',
  indigo: '#5d6798',
  amber: '#a4854a',
  violet: '#7d6aa6',
  ember: '#a8623a',
  teal: '#467f7e',
  crimson: '#9a4a48',
};
export const biomeColor = (b) => BIOMES[b] || '#a4854a';
export const darken = (hex, k = 0.55) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgb(${Math.round(((n >> 16) & 255) * k)} ${Math.round(((n >> 8) & 255) * k)} ${Math.round((n & 255) * k)})`;
};

// Cenário de fundo de cada unidade (as lições e fases acontecem dentro do local)
export const MISSION_BG = { 1: 'abbey', 2: 'lab', 3: 'fort', 4: 'tower', 5: 'forge', 6: 'maze', 7: 'throne' };
