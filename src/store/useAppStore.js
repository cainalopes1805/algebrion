import { create } from 'zustand';

export const useAppStore = create((set) => ({
  // Idioma
  language: 'pt', // pt, en, es
  setLanguage: (lang) => set({ language: lang }),

  // Customização do Site
  theme: 'light', // light = parchment, dark = tavern
  primaryColor: 'amber',
  setTheme: (theme) => set({ theme }),
  setPrimaryColor: (color) => set({ primaryColor: color }),

  // Progresso
  coins: 0,
  addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),
  
  unlockedMissions: [1],
  unlockMission: (missionId) => set((state) => ({ 
    unlockedMissions: state.unlockedMissions.includes(missionId) ? state.unlockedMissions : [...state.unlockedMissions, missionId] 
  })),

  // Conquistas
  achievements: [],
  addAchievement: (achievementId) => set((state) => ({
    achievements: state.achievements.includes(achievementId) ? state.achievements : [...state.achievements, achievementId]
  })),
}));
