// Loja, conquistas, missões diárias e rivais.
import { L } from '../i18n/core';
import { MISSIONS, TOTAL_LESSONS, TOTAL_LEVELS } from './content';
import { levelFromXp } from './characters';
import { makeRng, hashString } from '../utils/rng';

/* ───────────────────────── Loja do Mercador ───────────────────────── */
export const CONSUMABLES = [
  { id: 'shield', icon: '🛡️', price: 80, name: L('Escudo Arcano', 'Arcane Shield', 'Escudo Arcano', 'Bouclier Arcanique'), desc: L('Absorve o próximo erro (sem perder coração).', 'Absorbs your next mistake (no heart lost).', 'Absorbe tu próximo error (sin perder corazón).', 'Absorbe votre prochaine erreur (aucun cœur perdu).') },
  { id: 'hint', icon: '📜', price: 40, name: L('Pergaminho de Dica', 'Hint Scroll', 'Pergamino de Pista', 'Parchemin d’Indice'), desc: L('Elimina 2 alternativas erradas ou revela uma pista.', 'Removes 2 wrong options or reveals a clue.', 'Elimina 2 opciones erróneas o revela una pista.', 'Retire 2 mauvaises options ou révèle un indice.') },
  { id: 'xpPotion', icon: '🧪', price: 90, name: L('Poção de XP', 'XP Potion', 'Poción de XP', 'Potion d’XP'), desc: L('+50% de XP na próxima fase concluída.', '+50% XP on the next stage you clear.', '+50 % de XP en la próxima fase superada.', '+50 % d’XP à la prochaine étape réussie.') },
  { id: 'heartRefill', icon: '❤️', price: 60, name: L('Elixir de Vida', 'Life Elixir', 'Elixir de Vida', 'Élixir de Vie'), desc: L('Restaura todos os corações agora.', 'Restores all hearts right now.', 'Restaura todos los corazones ahora.', 'Restaure tous vos cœurs immédiatement.'), instant: true },
];

export const COSMETICS = [
  // Molduras do retrato
  { id: 'frame_bronze', slot: 'frame', icon: '🟤', price: 100, name: L('Moldura de Bronze', 'Bronze Frame', 'Marco de Bronce', 'Cadre de Bronze') },
  { id: 'frame_silver', slot: 'frame', icon: '⚪', price: 250, name: L('Moldura de Prata', 'Silver Frame', 'Marco de Plata', 'Cadre d’Argent') },
  { id: 'frame_gold', slot: 'frame', icon: '🟡', price: 500, name: L('Moldura Dourada', 'Golden Frame', 'Marco Dorado', 'Cadre Doré') },
  { id: 'frame_arcane', slot: 'frame', icon: '🟣', price: 900, name: L('Moldura Arcana', 'Arcane Frame', 'Marco Arcano', 'Cadre Arcanique') },
  // Auras
  { id: 'aura_ember', slot: 'aura', icon: '🔥', price: 300, color: '#ee7a2b', name: L('Aura de Brasa', 'Ember Aura', 'Aura de Brasa', 'Aura de Braise') },
  { id: 'aura_frost', slot: 'aura', icon: '❄️', price: 300, color: '#55b8e8', name: L('Aura de Gelo', 'Frost Aura', 'Aura de Hielo', 'Aura de Givre') },
  { id: 'aura_arcane', slot: 'aura', icon: '🔮', price: 600, color: '#9b6bff', name: L('Aura Arcana', 'Arcane Aura', 'Aura Arcana', 'Aura Arcanique') },
  { id: 'aura_royal', slot: 'aura', icon: '👑', price: 1000, color: '#f2cf7a', name: L('Aura Real', 'Royal Aura', 'Aura Real', 'Aura Royale') },
  // Companheiros
  { id: 'pet_owl', slot: 'pet', icon: '🦉', price: 400, name: L('Coruja Sábia', 'Wise Owl', 'Búho Sabio', 'Chouette Sage') },
  { id: 'pet_cat', slot: 'pet', icon: '🐱', price: 350, name: L('Gato das Sombras', 'Shadow Cat', 'Gato de las Sombras', 'Chat des Ombres') },
  { id: 'pet_wisp', slot: 'pet', icon: '✨', price: 600, name: L('Fogo-Fátuo', 'Will-o’-Wisp', 'Fuego Fatuo', 'Feu Follet') },
  { id: 'pet_dragon', slot: 'pet', icon: '🐉', price: 800, name: L('Dragãozinho', 'Baby Dragon', 'Dragoncito', 'Bébé Dragon') },
  // Heróis
  { id: 'hero_knight', slot: 'hero', hero: 'knight', icon: '🛡️', price: 200, name: L('Herói: Cavaleiro', 'Hero: Knight', 'Héroe: Caballero', 'Héros : Chevalier') },
  { id: 'hero_ranger', slot: 'hero', hero: 'ranger', icon: '🏹', price: 200, name: L('Herói: Arqueira', 'Hero: Ranger', 'Héroe: Arquera', 'Héros : Archère') },
  { id: 'hero_alchemist', slot: 'hero', hero: 'alchemist', icon: '⚗️', price: 350, name: L('Herói: Alquimista', 'Hero: Alchemist', 'Héroe: Alquimista', 'Héros : Alchimiste') },
  { id: 'hero_bard', slot: 'hero', hero: 'bard', icon: '🎶', price: 350, name: L('Herói: Bardo', 'Hero: Bard', 'Héroe: Bardo', 'Héros : Barde') },
];
export const COSMETIC_BY_ID = Object.fromEntries(COSMETICS.map((c) => [c.id, c]));

/* ───────────────────────── Conquistas ───────────────────────── */
const completedCount = (p) => Object.keys(p.completedLevels).length;
const totalStars = (p) => Object.values(p.completedLevels).reduce((s, l) => s + (l.stars || 0), 0);
const bossKeys = MISSIONS.map((m) => `${m.id}-${m.levels.length}`);
const bossesDone = (p) => bossKeys.filter((k) => p.completedLevels[k]).length;

export const ACHIEVEMENTS = [
  { id: 'first_step', icon: '👣', gold: 20, name: L('Primeiro Passo', 'First Step', 'Primer Paso', 'Premier Pas'), desc: L('Conclua sua primeira fase.', 'Clear your first stage.', 'Supera tu primera fase.', 'Terminez votre première étape.'), test: (p) => completedCount(p) >= 1 },
  { id: 'scholar', icon: '📖', gold: 30, name: L('Estudioso', 'Scholar', 'Estudioso', 'Érudit'), desc: L('Leia 5 lições.', 'Read 5 lessons.', 'Lee 5 lecciones.', 'Lisez 5 leçons.'), test: (p) => Object.keys(p.lessonsRead).length >= 5 },
  { id: 'bookworm', icon: '📚', gold: 120, name: L('Rato de Biblioteca', 'Bookworm', 'Ratón de Biblioteca', 'Rat de Bibliothèque'), desc: L('Leia todas as lições do reino.', 'Read every lesson in the realm.', 'Lee todas las lecciones del reino.', 'Lisez toutes les leçons du royaume.'), test: (p) => Object.keys(p.lessonsRead).length >= TOTAL_LESSONS },
  { id: 'flawless', icon: '💎', gold: 40, name: L('Impecável', 'Flawless', 'Impecable', 'Impeccable'), desc: L('Conclua uma fase sem errar.', 'Clear a stage with no mistakes.', 'Supera una fase sin errores.', 'Terminez une étape sans erreur.'), test: (p) => p.stats.perfect >= 1 },
  { id: 'combo5', icon: '🔥', gold: 30, name: L('Em Chamas', 'On Fire', 'En Llamas', 'En Feu'), desc: L('Alcance combo x5.', 'Reach a x5 combo.', 'Alcanza un combo x5.', 'Atteignez un combo x5.'), test: (p) => p.stats.bestCombo >= 5 },
  { id: 'combo12', icon: '🌋', gold: 90, name: L('Vulcão', 'Volcano', 'Volcán', 'Volcan'), desc: L('Alcance combo x12.', 'Reach a x12 combo.', 'Alcanza un combo x12.', 'Atteignez un combo x12.'), test: (p) => p.stats.bestCombo >= 12 },
  { id: 'hundred', icon: '🎯', gold: 50, name: L('Centurião', 'Centurion', 'Centurión', 'Centurion'), desc: L('Acerte 100 desafios.', 'Answer 100 challenges correctly.', 'Acierta 100 desafíos.', 'Réussissez 100 défis.'), test: (p) => p.stats.correct >= 100 },
  { id: 'fivehundred', icon: '🏹', gold: 150, name: L('Atirador de Elite', 'Elite Marksman', 'Tirador de Élite', 'Tireur d’Élite'), desc: L('Acerte 500 desafios.', 'Answer 500 challenges correctly.', 'Acierta 500 desafíos.', 'Réussissez 500 défis.'), test: (p) => p.stats.correct >= 500 },
  { id: 'slayer', icon: '🗡️', gold: 60, name: L('Caçador de Chefes', 'Boss Hunter', 'Cazador de Jefes', 'Chasseur de Boss'), desc: L('Derrote seu primeiro chefe.', 'Defeat your first boss.', 'Derrota a tu primer jefe.', 'Vainquez votre premier boss.'), test: (p) => bossesDone(p) >= 1 },
  { id: 'slayer_all', icon: '🐲', gold: 300, name: L('Matador de Lendas', 'Legend Slayer', 'Matador de Leyendas', 'Tueur de Légendes'), desc: L('Derrote os 7 chefes.', 'Defeat all 7 bosses.', 'Derrota a los 7 jefes.', 'Vainquez les 7 boss.'), test: (p) => bossesDone(p) >= MISSIONS.length },
  { id: 'streak3', icon: '📅', gold: 25, name: L('Constante', 'Steady', 'Constante', 'Constant'), desc: L('Sequência de 3 dias.', '3-day streak.', 'Racha de 3 días.', 'Série de 3 jours.'), test: (p) => p.bestStreak >= 3 },
  { id: 'streak7', icon: '🗓️', gold: 80, name: L('Devoto', 'Devoted', 'Devoto', 'Dévoué'), desc: L('Sequência de 7 dias.', '7-day streak.', 'Racha de 7 días.', 'Série de 7 jours.'), test: (p) => p.bestStreak >= 7 },
  { id: 'streak30', icon: '🏛️', gold: 400, name: L('Inabalável', 'Unshakable', 'Inquebrantable', 'Inébranlable'), desc: L('Sequência de 30 dias.', '30-day streak.', 'Racha de 30 días.', 'Série de 30 jours.'), test: (p) => p.bestStreak >= 30 },
  { id: 'arena10', icon: '🏟️', gold: 40, name: L('Gladiador', 'Gladiator', 'Gladiador', 'Gladiateur'), desc: L('Faça 1000 pontos na Arena.', 'Score 1000 in the Arena.', 'Logra 1000 puntos en la Arena.', 'Marquez 1000 points dans l’Arène.'), test: (p) => p.stats.arenaBest >= 1000 },
  { id: 'arena50', icon: '🏆', gold: 150, name: L('Campeão da Arena', 'Arena Champion', 'Campeón de la Arena', 'Champion de l’Arène'), desc: L('Faça 5000 pontos na Arena.', 'Score 5000 in the Arena.', 'Logra 5000 puntos en la Arena.', 'Marquez 5000 points dans l’Arène.'), test: (p) => p.stats.arenaBest >= 5000 },
  { id: 'level5', icon: '⭐', gold: 60, name: L('Herói Nível 5', 'Level 5 Hero', 'Héroe Nivel 5', 'Héros Niveau 5'), desc: L('Alcance o nível 5.', 'Reach level 5.', 'Alcanza el nivel 5.', 'Atteignez le niveau 5.'), test: (p) => levelFromXp(p.xp) >= 5 },
  { id: 'level10', icon: '🌟', gold: 200, name: L('Herói Nível 10', 'Level 10 Hero', 'Héroe Nivel 10', 'Héros Niveau 10'), desc: L('Alcance o nível 10.', 'Reach level 10.', 'Alcanza el nivel 10.', 'Atteignez le niveau 10.'), test: (p) => levelFromXp(p.xp) >= 10 },
  { id: 'stars', icon: '✨', gold: 120, name: L('Colecionador de Estrelas', 'Star Collector', 'Coleccionista de Estrellas', 'Collectionneur d’Étoiles'), desc: L('Some 40 estrelas.', 'Collect 40 stars.', 'Reúne 40 estrellas.', 'Cumulez 40 étoiles.'), test: (p) => totalStars(p) >= 40 },
  { id: 'rich', icon: '💰', gold: 0, name: L('Dragão do Tesouro', 'Treasure Dragon', 'Dragón del Tesoro', 'Dragon du Trésor'), desc: L('Ganhe 1000 de ouro no total.', 'Earn 1000 gold in total.', 'Gana 1000 de oro en total.', 'Gagnez 1000 pièces d’or au total.'), test: (p) => p.stats.goldEarned >= 1000 },
  { id: 'collector', icon: '🎁', gold: 80, name: L('Colecionador', 'Collector', 'Coleccionista', 'Collectionneur'), desc: L('Possua 5 itens cosméticos.', 'Own 5 cosmetic items.', 'Posee 5 objetos cosméticos.', 'Possédez 5 objets cosmétiques.'), test: (p) => p.owned.length >= 5 },
  { id: 'stylist', icon: '🎨', gold: 30, name: L('Estilista', 'Stylist', 'Estilista', 'Styliste'), desc: L('Personalize tema e cor de destaque.', 'Customize theme and accent color.', 'Personaliza tema y color de acento.', 'Personnalisez thème et couleur d’accent.'), test: (p) => p.flags.theme && p.flags.accent },
  { id: 'polyglot', icon: '🗣️', gold: 30, name: L('Poliglota', 'Polyglot', 'Políglota', 'Polyglotte'), desc: L('Mude o idioma do reino.', 'Change the realm’s language.', 'Cambia el idioma del reino.', 'Changez la langue du royaume.'), test: (p) => p.flags.language },
  { id: 'shard3', icon: '🔷', gold: 60, name: L('Colecionador de Fragmentos', 'Shard Collector', 'Coleccionista de Fragmentos', 'Collectionneur de Fragments'), desc: L('Recupere 3 Fragmentos da Grande Matriz.', 'Recover 3 shards of the Great Matrix.', 'Recupera 3 Fragmentos de la Gran Matriz.', 'Récupérez 3 fragments de la Grande Matrice.'), test: (p) => p.story.shards.length >= 3 },
  { id: 'great_matrix', icon: '🌌', gold: 250, name: L('A Grande Matriz', 'The Great Matrix', 'La Gran Matriz', 'La Grande Matrice'), desc: L('Reúna os 7 Fragmentos.', 'Gather all 7 shards.', 'Reúne los 7 Fragmentos.', 'Réunissez les 7 fragments.'), test: (p) => p.story.shards.length >= 7 },
  { id: 'mercy', icon: '🕊️', gold: 100, name: L('Misericórdia', 'Mercy', 'Misericordia', 'Miséricorde'), desc: L('Escolha restaurar Nullus.', 'Choose to restore Nullus.', 'Elige restaurar a Nullus.', 'Choisissez de restaurer Nullus.'), test: (p) => p.story.flags.ending === 'mercy' },
  { id: 'justice', icon: '⚖️', gold: 100, name: L('Justiça', 'Justice', 'Justicia', 'Justice'), desc: L('Escolha banir Nullus.', 'Choose to banish Nullus.', 'Elige desterrar a Nullus.', 'Choisissez de bannir Nullus.'), test: (p) => p.story.flags.ending === 'justice' },
  { id: 'grandmaster', icon: '👑', gold: 500, name: L('Grão-Mestre das Matrizes', 'Matrix Grandmaster', 'Gran Maestro de las Matrices', 'Grand Maître des Matrices'), desc: L('Conclua todas as fases do reino.', 'Clear every stage in the realm.', 'Supera todas las fases del reino.', 'Terminez toutes les étapes du royaume.'), test: (p) => completedCount(p) >= TOTAL_LEVELS },
];
export const ACH_BY_ID = Object.fromEntries(ACHIEVEMENTS.map((a) => [a.id, a]));

/* ───────────────────────── Missões diárias ───────────────────────── */
export const QUEST_KINDS = {
  levels: { icon: '🏰', unit: [1, 3], name: (n) => L(`Conclua ${n} fase${n > 1 ? 's' : ''}`, `Clear ${n} stage${n > 1 ? 's' : ''}`, `Supera ${n} fase${n > 1 ? 's' : ''}`, `Terminez ${n} étape${n > 1 ? 's' : ''}`) },
  correct: { icon: '🎯', unit: [10, 25], step: 5, name: (n) => L(`Acerte ${n} desafios`, `Answer ${n} challenges correctly`, `Acierta ${n} desafíos`, `Réussissez ${n} défis`) },
  xp: { icon: '⭐', unit: [60, 160], step: 20, name: (n) => L(`Ganhe ${n} XP`, `Earn ${n} XP`, `Gana ${n} XP`, `Gagnez ${n} XP`) },
  lessons: { icon: '📖', unit: [1, 2], name: (n) => L(`Leia ${n} lição${n > 1 ? 'ões' : ''}`, `Read ${n} lesson${n > 1 ? 's' : ''}`, `Lee ${n} lección${n > 1 ? 'es' : ''}`, `Lisez ${n} leçon${n > 1 ? 's' : ''}`) },
  arena: { icon: '🏟️', unit: [1, 2], name: (n) => L(`Jogue ${n} partida${n > 1 ? 's' : ''} na Arena`, `Play ${n} Arena run${n > 1 ? 's' : ''}`, `Juega ${n} partida${n > 1 ? 's' : ''} en la Arena`, `Jouez ${n} partie${n > 1 ? 's' : ''} dans l’Arène`) },
  combo: { icon: '🔥', unit: [4, 7], name: (n) => L(`Alcance combo x${n}`, `Reach a x${n} combo`, `Alcanza un combo x${n}`, `Atteignez un combo x${n}`) },
  perfect: { icon: '💎', unit: [1, 1], name: () => L('Conclua uma fase sem errar', 'Clear a stage flawlessly', 'Supera una fase sin errores', 'Terminez une étape sans faute') },
};

export function questsForDay(day) {
  const rng = makeRng(`quests-${day}`);
  const kinds = rng.shuffle(Object.keys(QUEST_KINDS)).slice(0, 3);
  return kinds.map((kind) => {
    const k = QUEST_KINDS[kind];
    const [lo, hi] = k.unit;
    const step = k.step || 1;
    const target = lo + step * rng.int(0, Math.floor((hi - lo) / step));
    return { id: `${day}-${kind}`, kind, target, progress: 0, claimed: false, gold: 30 + rng.int(0, 3) * 10, xp: 20 + rng.int(0, 2) * 10 };
  });
}

/* ───────────────────────── Rivais simulados ───────────────────────── */
const RIVAL_BASE = [
  ['Aldric o Pálido', 'knight', 5200], ['Isolde Ventonegro', 'ranger', 4300], ['Morgana Lírio', 'mage', 3900], ['Fergus Punho-de-Ferro', 'knight', 3300],
  ['Elowen das Cinzas', 'alchemist', 2800], ['Thorn Filho-de-Gralha', 'bard', 2300], ['Bryn Sombra-Longa', 'ranger', 1800], ['Cedric Manto-Rubro', 'mage', 1400],
  ['Sigrid Coração-de-Gelo', 'knight', 1000], ['Odo, o Estudioso', 'alchemist', 700], ['Wynn Pé-de-Lã', 'bard', 420], ['Pip, o Escudeiro', 'mage', 200],
];

export function getRivals(now = new Date()) {
  const monday = new Date(now);
  const dow = (monday.getDay() + 6) % 7;
  monday.setHours(0, 0, 0, 0);
  monday.setDate(monday.getDate() - dow);
  const frac = Math.min(1, (now - monday) / (7 * 86400000));
  const wk = `${monday.getFullYear()}-${monday.getMonth()}-${monday.getDate()}`;
  return RIVAL_BASE.map(([name, hero, base], i) => {
    const seed = hashString(`${wk}-${name}`)();
    const pace = 120 + (seed % 700) + i * 4;
    const weekly = Math.round(pace * frac * (0.75 + ((seed >> 8) % 50) / 100));
    const arena = Math.round(base * 0.9 + (seed % 900));
    return { id: `rival-${i}`, rival: true, name, hero, xp: base + weekly, weeklyXp: weekly, arenaBest: arena };
  });
}
