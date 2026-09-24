// Feitiços de batalha: cada conceito dominado ensina um. Os melhores exigem uma "fórmula mágica"
// (um exercício do próprio conceito) para serem lançados.
import { L } from '../i18n/core';

// Pontos de maestria necessários para aprender o feitiço (uma execução perfeita rende ~105: é preciso treinar de novo)
export const MASTERY_GOAL = 150;
export const MAX_SLOTS = 4;
export const MAX_MANA = 6;

// Ganhos de maestria
export const MASTERY = { lesson: 15, lessonTry: 2, correct: 6, retryCorrect: 2, perfectBonus: 10 };

const S = (mission, concept, icon, name, effect, cost, formula = null) => ({ id: `${mission}-${concept}`, mission, concept, icon, name: L(name[0], name[1]), effect, cost, formula });

export const SPELLS = [
  /* 1 · Grimórios */
  S(1, 1, 'Sparkles', ['Centelha Rúnica', 'Runic Spark'], { skip: 1 }, 2),
  S(1, 2, 'Ruler', ['Medida Exata', 'Exact Measure'], { reveal: 1 }, 2),
  S(1, 3, 'MapPin', ['Endereço Certeiro', 'Unerring Address'], { skip: 1 }, 3),
  S(1, 4, 'ScrollText', ['Lei da Formação', 'Law of Formation'], { shield: 1 }, 3),
  S(1, 5, 'Heart', ['Família de Runas', 'Family of Runes'], { heal: 1 }, 3),
  S(1, 6, 'Sword', ['Diagonal Cortante', 'Cutting Diagonal'], { skip: 2 }, 4, 'diagSum@2'),
  S(1, 7, 'ShieldCheck', ['Identidade Radiante', 'Radiant Identity'], { shield: 2 }, 5, 'specialKind@2'),
  S(1, 8, 'Equal', ['Selo da Igualdade', 'Seal of Equality'], { heal: 2 }, 5, 'equalUnknown@3'),
  /* 2 · Alquimia aditiva */
  S(2, 1, 'Droplets', ['Gota Dupla', 'Double Drop'], { skip: 1 }, 2),
  S(2, 2, 'Eye', ['Filtro da Harmonia', 'Harmony Filter'], { reveal: 2 }, 3),
  S(2, 3, 'FlaskConical', ['Antídoto Oposto', 'Opposite Antidote'], { heal: 1 }, 3),
  S(2, 4, 'Scale', ['Equilíbrio Alquímico', 'Alchemical Balance'], { shield: 2 }, 4, 'addProp@2'),
  S(2, 5, 'Zap', ['Elixir de Isolamento', 'Isolation Elixir'], { skip: 2 }, 5, 'matrixEq@2'),
  /* 3 · Escalares */
  S(3, 1, 'Zap', ['Amplificação', 'Amplification'], { skip: 2 }, 3),
  S(3, 2, 'WandSparkles', ['Interruptor de Runas', 'Rune Switch'], { reveal: 2 }, 3),
  S(3, 3, 'Layers', ['Distribuição do Poder', 'Power Distribution'], { shield: 1 }, 3),
  S(3, 4, 'Merge', ['Mistura Perfeita', 'Perfect Blend'], { skip: 2 }, 4, 'combo@2'),
  S(3, 5, 'RotateCcw', ['Desfazer Amplificação', 'Undo Amplification'], { heal: 2 }, 5, 'scalarEq@2'),
  /* 4 · Espelhos */
  S(4, 1, 'FlipHorizontal', ['Reflexo Curto', 'Quick Reflection'], { skip: 1 }, 2),
  S(4, 2, 'Gem', ['Espelho Verdadeiro', 'True Mirror'], { reveal: 2 }, 3),
  S(4, 3, 'Moon', ['Lei do Espelho', 'Law of the Mirror'], { shield: 2 }, 4, 'transposeMatrix'),
  S(4, 4, 'Infinity', ['Simetria Perfeita', 'Perfect Symmetry'], { skip: 3 }, 5, 'symUnknown@2'),
  /* 5 · Forja */
  S(5, 1, 'Anvil', ['Regra da Forja', 'Forge Rule'], { reveal: 1 }, 2),
  S(5, 2, 'Hammer', ['Golpe do Martelo', 'Hammer Strike'], { skip: 1 }, 3),
  S(5, 3, 'Flame', ['Golpe em Cadeia', 'Chain Strike'], { skip: 2 }, 4, 'mulVector'),
  S(5, 4, 'Star', ['Obra-Prima', 'Masterpiece'], { skip: 3 }, 5, 'mulMatrix'),
  S(5, 5, 'Lock', ['Ordem Inviolável', 'Inviolable Order'], { shield: 2 }, 4, 'mulProp@2'),
  S(5, 6, 'Sun', ['Chama da Identidade', 'Flame of Identity'], { heal: 2 }, 5, 'mulIdentity@2'),
  /* 6 · Labirinto */
  S(6, 1, 'Eye', ['Olho do Labirinto', 'Labyrinth’s Eye'], { reveal: 2 }, 3),
  S(6, 2, 'Compass', ['Sarrus, o Guia', 'Sarrus the Guide'], { skip: 2 }, 4, 'det3'),
  S(6, 3, 'Puzzle', ['Regras do Oráculo', 'Oracle’s Rules'], { shield: 2 }, 4, 'detProp'),
  S(6, 4, 'KeyRound', ['Porta ou Parede', 'Door or Wall'], { heal: 1 }, 4, 'invertible'),
  S(6, 5, 'Sigma', ['Quebra-Parede', 'Wallbreaker'], { skip: 3 }, 5, 'detUnknown'),
  /* 7 · Trono */
  S(7, 1, 'RotateCcw', ['Contra-Feitiço', 'Counter-Spell'], { shield: 1 }, 3),
  S(7, 2, 'Crown', ['Condição do Trono', 'Throne’s Condition'], { reveal: 2 }, 3),
  S(7, 3, 'Orbit', ['Inversão Real', 'Royal Inversion'], { skip: 2 }, 5, 'inv2'),
  S(7, 4, 'BookOpenCheck', ['Prova dos Nove', 'The Proof'], { shield: 2 }, 5, 'invVerify'),
  S(7, 5, 'Swords', ['Decreto Final', 'Final Decree'], { skip: 3 }, 6, 'solve'),
];

export const SPELL_BY_ID = Object.fromEntries(SPELLS.map((s) => [s.id, s]));
export const spellsOfMission = (mid) => SPELLS.filter((s) => s.mission === mid);

// O que o feitiço faz, em linguagem de jogo
export function effectText(effect) {
  const { skip: k, shield: sh, heal: h, reveal: r } = effect;
  if (k) return k === 1 ? L('Resolve a questão atual e fere o inimigo.', 'Solves the current question and hurts the enemy.') : L(`Resolve ${k} questões seguidas e fere o inimigo.`, `Solves ${k} questions in a row and hurts the enemy.`);
  if (sh) return sh === 1 ? L('Absorve o próximo erro, sem perder coração.', 'Absorbs the next mistake, no heart lost.') : L(`Absorve os próximos ${sh} erros, sem perder coração.`, `Absorbs the next ${sh} mistakes, no heart lost.`);
  if (h) return h === 1 ? L('Restaura 1 coração.', 'Restores 1 heart.') : L(`Restaura ${h} corações.`, `Restores ${h} hearts.`);
  if (r) return r === 1 ? L('Revela uma pista: elimina alternativas erradas.', 'Reveals a clue: removes wrong options.') : L(`Revela ${r} pistas: eliminam alternativas erradas.`, `Reveals ${r} clues: remove wrong options.`);
  return L('Efeito misterioso.', 'Mysterious effect.');
}
export const effectKind = (effect) => (effect.skip ? 'skip' : effect.shield ? 'shield' : effect.heal ? 'heal' : 'reveal');

export const masteryKey = (mission, concept) => `${mission}-${concept}`;
export const masteryOf = (p, spell) => Math.min(MASTERY_GOAL, p.skills?.mastery?.[spell.id] || 0);
export const isLearned = (p, spell) => masteryOf(p, spell) >= MASTERY_GOAL;
export const learnedSpells = (p) => SPELLS.filter((s) => isLearned(p, s));
