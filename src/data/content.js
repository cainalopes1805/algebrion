// Monta o catálogo final: missões 1–7, lições, chefes e construção de sessões.
import { L } from '../i18n/core';
import { legacyMissions } from './legacy';
import { newMissions } from './newMissions';
import { lessonsByMission } from './lessons';
import { buildSession, realize } from './generators';
import { makeRng } from '../utils/rng';

const legacyMeta = {
  1: { mentor: 'sage', boss: 'ghost', biome: 'emerald', bossPlan: [['dim', 2], ['elemClick', 2], ['elemValue', 2], ['formula', 1], ['trace', 1]] },
  2: { mentor: 'alchemist', boss: 'slime', biome: 'indigo', bossPlan: [['sumCell', 2], ['sumMatrix', 2], ['subMatrix', 2], ['sumPossible', 1], ['count', 1]] },
  3: { mentor: 'general', boss: 'golem', biome: 'amber', bossPlan: [['scalarCell', 2], ['scalarMatrix', 2], ['combo', 3], ['sumMatrix', 1]] },
};

const bossTitle = L('O Guardião', 'The Guardian', 'El Guardián', 'Le Gardien');

const fromLegacy = (m) => {
  const meta = legacyMeta[m.id];
  return {
    id: m.id,
    title: m.title,
    subtitle: m.subtitle,
    icon: m.icon,
    biome: meta.biome,
    mentor: meta.mentor,
    boss: meta.boss,
    intro: m.dialogues.intro.map((d) => d.text),
    levels: m.levels.map((lv) => ({
      id: lv.id,
      title: lv.title,
      description: lv.description,
      xpReward: lv.xpReward,
      goldReward: lv.coinsReward,
      activities: lv.activities,
      gen: [],
    })),
    bossPlan: meta.bossPlan,
  };
};

const withBoss = (m) => ({
  ...m,
  lessons: lessonsByMission[m.id] || [],
  levels: [
    ...m.levels,
    {
      id: m.levels.length + 1,
      boss: true,
      title: bossTitle,
      description: L('Derrote o chefe da região com tudo o que aprendeu.', 'Defeat the region’s boss with everything you learned.', 'Derrota al jefe de la región con todo lo aprendido.', 'Battez le boss de la région avec tout ce que vous avez appris.'),
      xpReward: 30 + m.id * 12,
      goldReward: 40 + m.id * 10,
      activities: [],
      gen: m.bossPlan,
    },
  ],
});

export const MISSIONS = [...legacyMissions.map(fromLegacy), ...newMissions].map(withBoss);
export const getMission = (id) => MISSIONS.find((m) => m.id === Number(id));
export const getLevel = (mid, lid) => getMission(mid)?.levels.find((l) => l.id === Number(lid));
export const bossLevelId = (m) => m.levels.length;
export const TOTAL_LEVELS = MISSIONS.reduce((n, m) => n + m.levels.length, 0);
export const TOTAL_LESSONS = MISSIONS.reduce((n, m) => n + m.lessons.length, 0);

// Sessão de um nível: curadas (ordem autoral) + geradas (frescas a cada tentativa)
export function buildLevelSession(mission, level, seed = Date.now()) {
  const rng = makeRng(seed);
  const gen = level.gen?.length ? buildSession(rng, level.gen) : [];
  return [...level.activities, ...gen];
}

// Um nível “treino”: mesmo tema do nível, 100% gerado — usado no modo Prática
export function buildPracticeSession(mission, seed = Date.now(), count = 8) {
  const rng = makeRng(seed);
  const plan = mission.bossPlan;
  const names = plan.flatMap(([n, c]) => Array(c).fill(n));
  return rng.shuffle(names).slice(0, count).map((n) => realize(n, rng));
}
