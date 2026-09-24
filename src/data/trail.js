import { L } from '../i18n/core';
import { MISSIONS } from './content';
import { SCENES } from './story';

// Encadeia cenas ainda não vistas antes de um destino: /story/a?then=/story/b?then=/destino
const chain = (p, ids, target) =>
  ids
    .filter((id) => SCENES[id] && !p.story.seen[id])
    .reduceRight((then, id) => `/story/${id}?then=${encodeURIComponent(then)}`, target);

const EPILOGUE_TITLE = L('O desfecho do capítulo', 'The chapter’s outcome', 'El desenlace del capítulo', 'Le dénouement du chapitre');

// Monta a trilha de cada unidade: lição → fase → … → chefe → epílogo, com cenas de história entre os passos.
export function buildTrail(p) {
  const units = MISSIONS.map((m) => {
    const unlocked = p.unlockedMissions.includes(m.id);
    const nodes = [];
    const normal = m.levels.filter((l) => !l.boss);
    const boss = m.levels.find((l) => l.boss);
    const n = Math.max(m.lessons.length, normal.length);
    const introIds = m.id === 1 ? ['prologue', 'c1-intro'] : [`c${m.id}-intro`];
    for (let i = 0; i < n; i++) {
      const ls = m.lessons[i];
      if (ls) {
        nodes.push({
          kind: 'lesson', key: `${m.id}-L${ls.id}`, mission: m, data: ls, icon: ls.icon, title: ls.title,
          to: `/mission/${m.id}/lesson/${ls.id}`, done: !!p.lessonsRead[`${m.id}-${ls.id}`], available: unlocked,
        });
      }
      const lv = normal[i];
      if (lv) {
        nodes.push({
          kind: 'level', key: `${m.id}-${lv.id}`, mission: m, data: lv, icon: '⚔️', title: lv.title,
          to: `/mission/${m.id}/level/${lv.id}`, done: !!p.completedLevels[`${m.id}-${lv.id}`], stars: p.completedLevels[`${m.id}-${lv.id}`]?.stars || 0,
          available: unlocked && (lv.id === 1 || !!p.completedLevels[`${m.id}-${lv.id - 1}`]),
          before: lv.id === 2 ? [`c${m.id}-mid`] : [],
        });
      }
    }
    if (nodes.length) nodes[0].before = [...introIds, ...(nodes[0].before || [])];
    if (boss) {
      nodes.push({
        kind: 'boss', key: `${m.id}-${boss.id}`, mission: m, data: boss, icon: '👹', title: boss.description,
        to: `/mission/${m.id}/level/${boss.id}`, done: !!p.completedLevels[`${m.id}-${boss.id}`], stars: p.completedLevels[`${m.id}-${boss.id}`]?.stars || 0,
        available: unlocked && !!p.completedLevels[`${m.id}-${boss.id - 1}`],
        before: [`c${m.id}-boss`],
      });
    }
    const endId = `c${m.id}-end`;
    nodes.push({
      kind: 'story', key: `${m.id}-S`, mission: m, data: SCENES[endId], icon: '📜', title: SCENES[endId]?.title || EPILOGUE_TITLE,
      to: `/story/${endId}?then=${encodeURIComponent('/trail')}`, done: !!p.story.seen[endId],
      available: unlocked && !!p.completedLevels[`${m.id}-${m.levels.length}`],
    });
    // redireciona pelas cenas pendentes
    for (const node of nodes) if (node.before?.length) node.to = chain(p, node.before, node.to);
    return { mission: m, unlocked, nodes, done: nodes.filter((x) => x.done).length };
  });
  let current = null;
  for (const u of units) {
    const node = u.nodes.find((x) => !x.done && x.available);
    if (node) { current = node; break; }
  }
  return { units, current };
}
