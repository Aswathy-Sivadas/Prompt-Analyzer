import { create } from 'zustand';

interface ThemeStore {
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

// Initialize theme from localStorage
const getInitialTheme = (): boolean => {
  if (typeof window === 'undefined') return true;
  const stored = localStorage.getItem('theme');
  if (stored) return stored === 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  isDark: getInitialTheme(),
  toggleTheme: () => set((state) => {
    const newIsDark = !state.isDark;
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newIsDark);
    return { isDark: newIsDark };
  }),
  setTheme: (isDark: boolean) => set(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDark);
    return { isDark };
  }),
}));
