import { create } from 'zustand';

interface ThemeState {
    useLightTheme: boolean;
    setUseLightTheme: (value: boolean) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
    useLightTheme: localStorage.getItem('use-light-theme') === 'true',
    setUseLightTheme: (value: boolean) => {
        set({ useLightTheme: value });
        localStorage.setItem('use-light-theme', String(value));
    },
}));
