import { create } from 'zustand';
import { sounds } from '../utils/audio';

const STORAGE_KEY = 'algebrion_storage_v2';

const defaultProfile = {
  id: 'profile_1',
  name: 'Mago Aprendiz',
  title: 'Iniciado dos Números',
  avatar: '🧙‍♂️',
  coins: 100,
  hearts: 5,
  maxHearts: 5,
  xp: 0,
  streak: 1,
  unlockedMissions: [1],
  completedLevels: {}, // { "1-1": { stars: 3, score: 100 } }
  achievements: ['primeiro_passo'],
  language: 'pt',
  theme: 'dark',
  primaryColor: 'amber',
  soundEnabled: true,
};

const loadInitialState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.profiles && parsed.profiles.length > 0) {
        const active = parsed.profiles.find(p => p.id === parsed.activeProfileId) || parsed.profiles[0];
        return {
          profiles: parsed.profiles,
          activeProfileId: active.id,
          ...active
        };
      }
    }
  } catch (e) {
    console.error('Failed to load from localStorage:', e);
  }
  return {
    profiles: [defaultProfile],
    activeProfileId: defaultProfile.id,
    ...defaultProfile
  };
};

const persistState = (state) => {
  try {
    const currentActiveData = {
      id: state.id,
      name: state.name,
      title: state.title,
      avatar: state.avatar,
      coins: state.coins,
      hearts: state.hearts,
      maxHearts: state.maxHearts,
      xp: state.xp,
      streak: state.streak,
      unlockedMissions: state.unlockedMissions,
      completedLevels: state.completedLevels,
      achievements: state.achievements,
      language: state.language,
      theme: state.theme,
      primaryColor: state.primaryColor,
      soundEnabled: state.soundEnabled,
    };

    const updatedProfiles = state.profiles.map(p =>
      p.id === state.id ? { ...p, ...currentActiveData } : p
    );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        profiles: updatedProfiles,
        activeProfileId: state.activeProfileId,
      })
    );
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
};

export const useAppStore = create((set, get) => ({
  ...loadInitialState(),

  // Profile Management
  switchProfile: (id) => {
    set((state) => {
      // Sync current before switching
      const currentActiveData = {
        id: state.id,
        name: state.name,
        title: state.title,
        avatar: state.avatar,
        coins: state.coins,
        hearts: state.hearts,
        maxHearts: state.maxHearts,
        xp: state.xp,
        streak: state.streak,
        unlockedMissions: state.unlockedMissions,
        completedLevels: state.completedLevels,
        achievements: state.achievements,
        language: state.language,
        theme: state.theme,
        primaryColor: state.primaryColor,
        soundEnabled: state.soundEnabled,
      };

      const updatedProfiles = state.profiles.map(p =>
        p.id === state.id ? { ...p, ...currentActiveData } : p
      );

      const target = updatedProfiles.find(p => p.id === id) || updatedProfiles[0];
      const newState = {
        profiles: updatedProfiles,
        activeProfileId: target.id,
        ...target,
      };
      persistState(newState);
      return newState;
    });
  },

  createProfile: (name, avatar, title = 'Iniciado dos Números') => {
    set((state) => {
      const currentActiveData = {
        id: state.id,
        name: state.name,
        title: state.title,
        avatar: state.avatar,
        coins: state.coins,
        hearts: state.hearts,
        maxHearts: state.maxHearts,
        xp: state.xp,
        streak: state.streak,
        unlockedMissions: state.unlockedMissions,
        completedLevels: state.completedLevels,
        achievements: state.achievements,
        language: state.language,
        theme: state.theme,
        primaryColor: state.primaryColor,
        soundEnabled: state.soundEnabled,
      };

      const updatedProfiles = state.profiles.map(p =>
        p.id === state.id ? { ...p, ...currentActiveData } : p
      );

      const newProfile = {
        ...defaultProfile,
        id: `profile_${Date.now()}`,
        name: name || 'Novo Aventureiro',
        avatar: avatar || '🧙‍♂️',
        title,
      };

      const newState = {
        profiles: [...updatedProfiles, newProfile],
        activeProfileId: newProfile.id,
        ...newProfile,
      };
      persistState(newState);
      return newState;
    });
  },

  deleteProfile: (id) => {
    set((state) => {
      if (state.profiles.length <= 1) return state; // Don't delete last profile
      const remaining = state.profiles.filter(p => p.id !== id);
      const nextActive = remaining[0];
      const newState = {
        profiles: remaining,
        activeProfileId: nextActive.id,
        ...nextActive,
      };
      persistState(newState);
      return newState;
    });
  },

  // Game Mechanics: Hearts
  loseHeart: () => {
    const currentHearts = get().hearts;
    if (currentHearts <= 1) {
      set({ hearts: 0 });
      sounds.playHeartLost();
      persistState(get());
      return false; // Out of hearts
    }
    const newHearts = currentHearts - 1;
    set({ hearts: newHearts });
    sounds.playHeartLost();
    persistState(get());
    return true;
  },

  refillHearts: (cost = 50) => {
    const { coins, maxHearts } = get();
    if (coins >= cost) {
      set({
        coins: coins - cost,
        hearts: maxHearts,
      });
      sounds.playCorrect();
      persistState(get());
      return true;
    }
    return false;
  },

  freeHeartPractice: () => {
    const { hearts, maxHearts } = get();
    if (hearts < maxHearts) {
      set({ hearts: Math.min(maxHearts, hearts + 1) });
      sounds.playCorrect();
      persistState(get());
    }
  },

  // Progression & Economy
  addCoins: (amount) => {
    set((state) => {
      const newState = { ...state, coins: state.coins + amount };
      persistState(newState);
      return newState;
    });
  },

  addXp: (amount) => {
    set((state) => {
      const newXp = state.xp + amount;
      const newState = { ...state, xp: newXp };
      persistState(newState);
      return newState;
    });
  },

  completeLevel: (missionId, levelId, stars = 3, xpGained = 25, coinsGained = 15) => {
    set((state) => {
      const key = `${missionId}-${levelId}`;
      const completedLevels = {
        ...state.completedLevels,
        [key]: { stars, completedAt: Date.now() },
      };

      // Check if this completes mission and unlocks next
      let unlockedMissions = [...state.unlockedMissions];
      if (levelId === 3 && !unlockedMissions.includes(missionId + 1)) {
        unlockedMissions.push(missionId + 1);
      }

      // Achievement checks
      const achievements = [...state.achievements];
      if (!achievements.includes('primeiro_passo')) {
        achievements.push('primeiro_passo');
      }
      if (Object.keys(completedLevels).length >= 3 && !achievements.includes('alquimista_mirim')) {
        achievements.push('alquimista_mirim');
      }
      if (unlockedMissions.includes(2) && !achievements.includes('conquistador_setor1')) {
        achievements.push('conquistador_setor1');
      }

      const newState = {
        ...state,
        completedLevels,
        unlockedMissions,
        achievements,
        xp: state.xp + xpGained,
        coins: state.coins + coinsGained,
      };

      persistState(newState);
      return newState;
    });
  },

  unlockMission: (missionId) => {
    set((state) => {
      if (state.unlockedMissions.includes(missionId)) return state;
      const newState = {
        ...state,
        unlockedMissions: [...state.unlockedMissions, missionId],
      };
      persistState(newState);
      return newState;
    });
  },

  addAchievement: (achievementId) => {
    set((state) => {
      if (state.achievements.includes(achievementId)) return state;
      const newState = {
        ...state,
        achievements: [...state.achievements, achievementId],
      };
      persistState(newState);
      return newState;
    });
  },

  // Settings & Customization
  setLanguage: (lang) => {
    set((state) => {
      const newState = { ...state, language: lang };
      persistState(newState);
      return newState;
    });
  },

  setTheme: (theme) => {
    set((state) => {
      const newState = { ...state, theme };
      persistState(newState);
      return newState;
    });
  },

  setPrimaryColor: (color) => {
    set((state) => {
      const newState = { ...state, primaryColor: color };
      persistState(newState);
      return newState;
    });
  },

  setSoundEnabled: (enabled) => {
    sounds.enabled = enabled;
    set((state) => {
      const newState = { ...state, soundEnabled: enabled };
      persistState(newState);
      return newState;
    });
  },
}));
