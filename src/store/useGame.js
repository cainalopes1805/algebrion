import { create } from 'zustand';
import { sounds } from '../utils/audio';
import { dayKey, weekKey, daysBetween } from '../utils/rng';
import { levelFromXp } from '../data/characters';
import { ACHIEVEMENTS, ACH_BY_ID, CONSUMABLES, COSMETIC_BY_ID, questsForDay } from '../data/economy';
import { MISSIONS } from '../data/content';

const KEY = 'algebrion_v3';
const LEGACY_KEY = 'algebrion_storage_v2';
export const HEART_REGEN_MS = 8 * 60 * 1000;

export const DEFAULT_SETTINGS = {
  language: 'pt',
  theme: 'crypt',
  accent: 'gold',
  fontScale: 1,
  motion: 'full', // full | reduced | off
  particles: 'embers', // embers | fireflies | snow | runes | none
  particleDensity: 1,
  vignette: true,
  grain: true,
  torch: true,
  confetti: true,
  screenShake: true,
  sound: true,
  volume: 0.7,
  music: false,
  musicVolume: 0.4,
};

const emptyProfile = (name = 'Aprendiz', hero = 'mage') => ({
  id: `p_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
  name,
  hero,
  createdAt: Date.now(),
  gold: 120,
  hearts: 5,
  maxHearts: 5,
  heartsAt: Date.now(),
  xp: 0,
  weekly: { week: weekKey(), xp: 0 },
  streak: 0,
  bestStreak: 0,
  lastDay: null,
  unlockedMissions: [1],
  completedLevels: {}, // "m-l": { stars, count, at }
  lessonsRead: {}, // "m-l": true
  achievements: {}, // id: timestamp
  owned: [],
  equipped: { frame: null, aura: null, pet: null },
  items: { shield: 1, hint: 2, xpPotion: 0 },
  quests: { day: null, list: [] },
  flags: {},
  stats: { correct: 0, wrong: 0, bestCombo: 0, perfect: 0, arenaBest: 0, arenaRuns: 0, goldEarned: 0, levelsCleared: 0 },
});

/* ───────────── Carga / migração ───────────── */
function migrateLegacy() {
  try {
    const raw = localStorage.getItem(LEGACY_KEY);
    if (!raw) return null;
    const old = JSON.parse(raw);
    if (!old.profiles?.length) return null;
    const settings = { ...DEFAULT_SETTINGS };
    const active = old.profiles.find((p) => p.id === old.activeProfileId) || old.profiles[0];
    if (['pt', 'en', 'es', 'fr'].includes(active.language)) settings.language = active.language;
    const profiles = {};
    for (const op of old.profiles) {
      const np = emptyProfile(op.name || 'Aprendiz');
      np.id = op.id || np.id;
      np.gold = op.coins ?? np.gold;
      np.xp = op.xp ?? 0;
      np.streak = op.streak ?? 0;
      np.bestStreak = np.streak;
      np.unlockedMissions = op.unlockedMissions?.length ? op.unlockedMissions : [1];
      np.completedLevels = Object.fromEntries(
        Object.entries(op.completedLevels || {}).map(([k, v]) => [k, { stars: v.stars || 1, count: 1, at: v.completedAt || Date.now() }]),
      );
      profiles[np.id] = np;
    }
    return { settings, profiles, activeId: (old.activeProfileId && profiles[old.activeProfileId] ? old.activeProfileId : Object.keys(profiles)[0]) };
  } catch {
    return null;
  }
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const data = JSON.parse(raw);
      if (data.profiles && Object.keys(data.profiles).length) {
        const base = emptyProfile();
        const profiles = Object.fromEntries(
          Object.entries(data.profiles).map(([id, p]) => [id, { ...base, ...p, stats: { ...base.stats, ...p.stats }, equipped: { ...base.equipped, ...p.equipped }, items: { ...base.items, ...p.items } }]),
        );
        return {
          settings: { ...DEFAULT_SETTINGS, ...data.settings },
          profiles,
          activeId: profiles[data.activeId] ? data.activeId : Object.keys(profiles)[0],
        };
      }
    }
  } catch (e) {
    console.error('Falha ao ler o save', e);
  }
  const migrated = migrateLegacy();
  if (migrated) return migrated;
  const first = emptyProfile('Aprendiz');
  return { settings: { ...DEFAULT_SETTINGS }, profiles: { [first.id]: first }, activeId: first.id };
}

let saveTimer = null;
const persist = (state) => {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ v: 3, settings: state.settings, profiles: state.profiles, activeId: state.activeId }));
    } catch (e) {
      console.error('Falha ao salvar', e);
    }
  }, 150);
};

/* ───────────── Regras puras sobre o perfil ───────────── */
const bumpQuest = (p, kind, amount, mode = 'add') => {
  if (!p.quests.list.length) return p;
  const list = p.quests.list.map((q) => {
    if (q.kind !== kind || q.claimed) return q;
    const progress = mode === 'max' ? Math.max(q.progress, amount) : q.progress + amount;
    return { ...q, progress: Math.min(q.target, progress) };
  });
  return { ...p, quests: { ...p.quests, list } };
};

// Aplica XP/ouro, atualiza XP semanal e retorna { p, leveledTo }
const grant = (p, { xp = 0, gold = 0 }) => {
  const before = levelFromXp(p.xp);
  let np = { ...p, xp: p.xp + xp, gold: p.gold + gold };
  np.stats = { ...np.stats, goldEarned: np.stats.goldEarned + gold };
  const wk = weekKey();
  np.weekly = np.weekly.week === wk ? { ...np.weekly, xp: np.weekly.xp + xp } : { week: wk, xp };
  if (xp > 0) np = bumpQuest(np, 'xp', xp);
  const after = levelFromXp(np.xp);
  return { p: np, leveledTo: after > before ? after : null };
};

const checkAchievements = (p) => {
  const unlocked = [];
  let np = p;
  for (const a of ACHIEVEMENTS) {
    if (np.achievements[a.id]) continue;
    if (a.test(np)) {
      np = { ...np, achievements: { ...np.achievements, [a.id]: Date.now() } };
      if (a.gold) np = { ...np, gold: np.gold + a.gold, stats: { ...np.stats, goldEarned: np.stats.goldEarned + a.gold } };
      unlocked.push(a.id);
    }
  }
  return { p: np, unlocked };
};

export const starsFor = (mistakes) => (mistakes <= 1 ? 3 : mistakes <= 3 ? 2 : 1);
export const isBossLevel = (mid, lid) => {
  const m = MISSIONS.find((x) => x.id === mid);
  return !!m && lid === m.levels.length;
};

let eventId = 0;

export const useGame = create((set, get) => {
  const initial = load();

  // Aplica uma transformação no perfil ativo e devolve efeitos colaterais (eventos)
  const mutate = (fn) => {
    const s = get();
    const cur = s.profiles[s.activeId];
    const result = fn(cur) || {};
    let np = result.p || cur;
    const events = [];
    if (result.leveledTo) events.push({ type: 'levelup', level: result.leveledTo });
    const ach = checkAchievements(np);
    np = ach.p;
    for (const id of ach.unlocked) events.push({ type: 'achievement', id });
    set((st) => ({
      profiles: { ...st.profiles, [st.activeId]: np },
      events: [...st.events, ...events.map((e) => ({ ...e, id: ++eventId }))],
    }));
    if (events.some((e) => e.type === 'levelup')) sounds.levelUp();
    else if (ach.unlocked.length) sounds.achievement();
    persist(get());
    return result.out;
  };

  return {
    settings: initial.settings,
    profiles: initial.profiles,
    activeId: initial.activeId,
    events: [],

    /* ───── Configurações ───── */
    setSetting: (key, value) => {
      set((s) => ({ settings: { ...s.settings, [key]: value } }));
      const flagMap = { language: 'language', theme: 'theme', accent: 'accent' };
      if (flagMap[key]) mutate((p) => ({ p: { ...p, flags: { ...p.flags, [flagMap[key]]: true } } }));
      persist(get());
    },
    resetSettings: () => {
      set({ settings: { ...DEFAULT_SETTINGS, language: get().settings.language } });
      persist(get());
    },

    /* ───── Perfis ───── */
    createProfile: (name, hero = 'mage') => {
      const np = emptyProfile(name?.trim() || 'Aventureiro', hero);
      set((s) => ({ profiles: { ...s.profiles, [np.id]: np }, activeId: np.id }));
      get().touchDay();
      persist(get());
    },
    switchProfile: (id) => {
      if (!get().profiles[id]) return;
      set({ activeId: id });
      get().touchDay();
      persist(get());
    },
    deleteProfile: (id) => {
      const s = get();
      const ids = Object.keys(s.profiles);
      if (ids.length <= 1) return;
      const { [id]: _removed, ...rest } = s.profiles;
      set({ profiles: rest, activeId: s.activeId === id ? Object.keys(rest)[0] : s.activeId });
      persist(get());
    },
    renameProfile: (name) => mutate((p) => ({ p: { ...p, name: name.trim().slice(0, 24) || p.name } })),
    setHero: (hero) => mutate((p) => (hero === 'mage' || p.owned.includes(`hero_${hero}`) ? { p: { ...p, hero } } : null)),

    /* ───── Dia / sequência / regeneração ───── */
    touchDay: () =>
      mutate((p) => {
        const today = dayKey();
        let np = p;
        if (p.lastDay !== today) {
          const streak = p.lastDay && daysBetween(p.lastDay, today) === 1 ? p.streak + 1 : 1;
          np = { ...np, streak, bestStreak: Math.max(p.bestStreak, streak), lastDay: today };
        }
        if (np.quests.day !== today) np = { ...np, quests: { day: today, list: questsForDay(today) } };
        const wk = weekKey();
        if (np.weekly.week !== wk) np = { ...np, weekly: { week: wk, xp: 0 } };
        return { p: np };
      }),
    tickHearts: () => {
      const s = get();
      const p = s.profiles[s.activeId];
      if (p.hearts >= p.maxHearts) return;
      const n = Math.floor((Date.now() - p.heartsAt) / HEART_REGEN_MS);
      if (n <= 0) return;
      const hearts = Math.min(p.maxHearts, p.hearts + n);
      mutate((cur) => ({ p: { ...cur, hearts, heartsAt: hearts >= cur.maxHearts ? Date.now() : cur.heartsAt + n * HEART_REGEN_MS } }));
    },

    /* ───── Combate / respostas ───── */
    recordAnswer: ({ correct, combo = 0 }) =>
      mutate((p) => {
        let np = { ...p, stats: { ...p.stats, correct: p.stats.correct + (correct ? 1 : 0), wrong: p.stats.wrong + (correct ? 0 : 1), bestCombo: Math.max(p.stats.bestCombo, combo) } };
        if (correct) np = bumpQuest(np, 'correct', 1);
        if (combo > 0) np = bumpQuest(np, 'combo', combo, 'max');
        return { p: np };
      }),
    // devolve { absorbed, hearts }
    loseHeart: () =>
      mutate((p) => {
        if (p.items.shield > 0) return { p: { ...p, items: { ...p.items, shield: p.items.shield - 1 } }, out: { absorbed: true, hearts: p.hearts } };
        const hearts = Math.max(0, p.hearts - 1);
        return { p: { ...p, hearts, heartsAt: p.hearts >= p.maxHearts ? Date.now() : p.heartsAt }, out: { absorbed: false, hearts } };
      }),
    useHint: () =>
      mutate((p) => (p.items.hint > 0 ? { p: { ...p, items: { ...p.items, hint: p.items.hint - 1 } }, out: true } : { out: false })),
    addReward: (reward) => mutate((p) => grant(p, reward)),

    completeLevel: ({ missionId, levelId, mistakes, xp, gold }) =>
      mutate((p) => {
        const key = `${missionId}-${levelId}`;
        const prev = p.completedLevels[key];
        const stars = starsFor(mistakes);
        const first = !prev;
        let gainXp = first ? xp : Math.round(xp * 0.4);
        const gainGold = first ? gold : Math.round(gold * 0.4);
        let items = p.items;
        let potion = false;
        if (items.xpPotion > 0) {
          potion = true;
          gainXp = Math.round(gainXp * 1.5);
          items = { ...items, xpPotion: items.xpPotion - 1 };
        }
        const boss = isBossLevel(missionId, levelId);
        let np = { ...p, items };
        np.completedLevels = { ...p.completedLevels, [key]: { stars: Math.max(prev?.stars || 0, stars), count: (prev?.count || 0) + 1, at: Date.now() } };
        np.stats = { ...np.stats, levelsCleared: np.stats.levelsCleared + 1, perfect: np.stats.perfect + (mistakes === 0 ? 1 : 0) };
        let unlockedMission = null;
        if (boss && !np.unlockedMissions.includes(missionId + 1) && MISSIONS.some((m) => m.id === missionId + 1)) {
          np.unlockedMissions = [...np.unlockedMissions, missionId + 1];
          unlockedMission = missionId + 1;
        }
        np = bumpQuest(np, 'levels', 1);
        if (mistakes === 0) np = bumpQuest(np, 'perfect', 1);
        const g = grant(np, { xp: gainXp, gold: gainGold });
        return { p: g.p, leveledTo: g.leveledTo, out: { stars, xp: gainXp, gold: gainGold, first, potion, unlockedMission, boss } };
      }),

    readLesson: (missionId, lessonId) =>
      mutate((p) => {
        const key = `${missionId}-${lessonId}`;
        if (p.lessonsRead[key]) return { out: { first: false, xp: 0, gold: 0 } };
        let np = { ...p, lessonsRead: { ...p.lessonsRead, [key]: true } };
        np = bumpQuest(np, 'lessons', 1);
        const g = grant(np, { xp: 15, gold: 8 });
        return { p: g.p, leveledTo: g.leveledTo, out: { first: true, xp: 15, gold: 8 } };
      }),

    finishArena: ({ score, correct }) =>
      mutate((p) => {
        const record = score > p.stats.arenaBest;
        let np = { ...p, stats: { ...p.stats, arenaBest: Math.max(p.stats.arenaBest, score), arenaRuns: p.stats.arenaRuns + 1 } };
        np = bumpQuest(np, 'arena', 1);
        const gold = Math.floor(score / 40);
        const xp = Math.floor(score / 25) + correct;
        const g = grant(np, { xp, gold });
        return { p: g.p, leveledTo: g.leveledTo, out: { record, gold, xp } };
      }),

    /* ───── Missões diárias ───── */
    claimQuest: (id) =>
      mutate((p) => {
        const q = p.quests.list.find((x) => x.id === id);
        if (!q || q.claimed || q.progress < q.target) return null;
        const np = { ...p, quests: { ...p.quests, list: p.quests.list.map((x) => (x.id === id ? { ...x, claimed: true } : x)) } };
        const g = grant(np, { xp: q.xp, gold: q.gold });
        sounds.coin();
        return { p: g.p, leveledTo: g.leveledTo, out: true };
      }),

    /* ───── Mercador ───── */
    buyConsumable: (id) => {
      const item = CONSUMABLES.find((c) => c.id === id);
      if (!item) return false;
      const ok = mutate((p) => {
        if (p.gold < item.price) return { out: false };
        if (id === 'heartRefill') {
          if (p.hearts >= p.maxHearts) return { out: false };
          return { p: { ...p, gold: p.gold - item.price, hearts: p.maxHearts, heartsAt: Date.now() }, out: true };
        }
        return { p: { ...p, gold: p.gold - item.price, items: { ...p.items, [id]: (p.items[id] || 0) + 1 } }, out: true };
      });
      if (ok) sounds.buy();
      return ok;
    },
    buyCosmetic: (id) => {
      const item = COSMETIC_BY_ID[id];
      if (!item) return false;
      const ok = mutate((p) => {
        if (p.owned.includes(id) || p.gold < item.price) return { out: false };
        let np = { ...p, gold: p.gold - item.price, owned: [...p.owned, id] };
        if (item.slot === 'hero') np = { ...np, hero: item.hero };
        else np = { ...np, equipped: { ...np.equipped, [item.slot]: id } };
        return { p: np, out: true };
      });
      if (ok) sounds.buy();
      return ok;
    },
    equip: (slot, id) =>
      mutate((p) => (id === null || p.owned.includes(id) ? { p: { ...p, equipped: { ...p.equipped, [slot]: id } } } : null)),

    /* ───── Dados ───── */
    exportData: () => JSON.stringify({ v: 3, settings: get().settings, profiles: get().profiles, activeId: get().activeId }, null, 2),
    importData: (json) => {
      try {
        const data = JSON.parse(json);
        if (!data.profiles || !Object.keys(data.profiles).length) return false;
        localStorage.setItem(KEY, JSON.stringify(data));
        const loaded = load();
        set({ settings: loaded.settings, profiles: loaded.profiles, activeId: loaded.activeId });
        persist(get());
        return true;
      } catch {
        return false;
      }
    },
    resetProgress: () => {
      const s = get();
      const cur = s.profiles[s.activeId];
      const fresh = { ...emptyProfile(cur.name, 'mage'), id: cur.id };
      set({ profiles: { ...s.profiles, [cur.id]: fresh } });
      get().touchDay();
      persist(get());
    },

    dismissEvent: (id) => set((s) => ({ events: s.events.filter((e) => e.id !== id) })),
  };
});

export const useProfile = () => useGame((s) => s.profiles[s.activeId]);
export { ACH_BY_ID };
