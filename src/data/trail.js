import { L } from '../i18n/core';
import { MISSIONS } from './content';
import { SCENES } from './story';

// Encadeia as cenas antes de um destino: /story/a?then=/story/b?then=/destino.
// Numa etapa nova só entram as cenas ainda não vistas; ao refazer uma etapa concluída (replay), todas voltam — com opção de pular.
const chain = (p, ids, target, replay = false) =>
  ids
    .filter((id) => SCENES[id] && (replay || !p.story.seen[id]))
    .reduceRight((then, id) => `/story/${id}?then=${encodeURIComponent(then)}`, target);

const EPILOGUE_TITLE = L('O desfecho do capítulo', 'The chapter’s outcome', 'El desenlace del capítulo', 'Le dénouement du chapitre');

// Monta a trilha de cada unidade: passo (lição + treino) → … → prova → chefe → epílogo, com cenas de história entre os passos.
export function buildTrail(p) {
  const units = MISSIONS.map((m) => {
    const unlocked = p.unlockedMissions.includes(m.id);
    const nodes = [];
    const concepts = m.levels.filter((l) => l.concept);
    const exam = m.levels.find((l) => l.exam);
    const boss = m.levels.find((l) => l.boss);
    const introIds = m.id === 1 ? ['prologue', 'c1-intro'] : [`c${m.id}-intro`];
    const midAt = Math.ceil(concepts.length / 2); // a cena do meio do capítulo entra neste passo
    const levelDone = (lv) => !!p.completedLevels[`${m.id}-${lv.id}`];
    const stars = (lv) => p.completedLevels[`${m.id}-${lv.id}`]?.stars || 0;
    const prevDone = (lv) => lv.id === 1 || levelDone({ id: lv.id - 1 });

    concepts.forEach((lv, i) => {
      const ls = m.lessons[i];
      const read = !!p.lessonsRead[`${m.id}-${ls.id}`];
      nodes.push({
        kind: 'concept', key: `${m.id}-C${lv.id}`, mission: m, data: lv, lesson: ls, levelId: lv.id, title: ls.title,
        pages: ls.pages.length, count: lv.gen.reduce((s, [, c]) => s + c, 0),
        // primeira vez: começa pela lição; depois, direto no treino (a lição continua na página da missão)
        to: read ? `/mission/${m.id}/level/${lv.id}` : `/mission/${m.id}/lesson/${ls.id}`,
        done: levelDone(lv), stars: stars(lv), available: unlocked && prevDone(lv),
        before: i === midAt ? [`c${m.id}-mid`] : [],
      });
    });
    if (nodes.length) nodes[0].before = [...introIds, ...(nodes[0].before || [])];
    if (exam) {
      nodes.push({
        kind: 'level', key: `${m.id}-${exam.id}`, mission: m, data: exam, levelId: exam.id, title: exam.title,
        to: `/mission/${m.id}/level/${exam.id}`, done: levelDone(exam), stars: stars(exam), available: unlocked && prevDone(exam),
      });
    }
    if (boss) {
      nodes.push({
        kind: 'boss', key: `${m.id}-${boss.id}`, mission: m, data: boss, levelId: boss.id, title: boss.description,
        to: `/mission/${m.id}/level/${boss.id}`, done: levelDone(boss), stars: stars(boss), available: unlocked && prevDone(boss),
        before: [`c${m.id}-boss`],
      });
    }
    const endId = `c${m.id}-end`;
    nodes.push({
      kind: 'story', key: `${m.id}-S`, mission: m, data: SCENES[endId], icon: '📜', title: SCENES[endId]?.title || EPILOGUE_TITLE,
      to: `/story/${endId}?then=${encodeURIComponent('/trail')}`, done: !!p.story.seen[endId],
      available: unlocked && levelDone(boss),
    });
    // redireciona pelas cenas pendentes
    for (const node of nodes) if (node.before?.length) node.to = chain(p, node.before, node.to, node.done);
    return { mission: m, unlocked, nodes, done: nodes.filter((x) => x.done).length };
  });
  let current = null;
  for (const u of units) {
    const node = u.nodes.find((x) => !x.done && x.available);
    if (node) { current = node; break; }
  }
  return { units, current };
}

// Próximo passo depois de concluir uma fase: a etapa seguinte da trilha (com as cenas de história pendentes no caminho)
export function nextAfterLevel(p, missionId, levelId) {
  const { units } = buildTrail(p);
  const u = units.find((x) => x.mission.id === missionId);
  const i = u?.nodes.findIndex((n) => n.levelId === levelId) ?? -1;
  if (i < 0) return null;
  const next = u.nodes[i + 1];
  if (next && next.available) return next;
  const nu = units[units.indexOf(u) + 1];
  return nu?.unlocked ? nu.nodes[0] : null;
}
