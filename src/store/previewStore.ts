import { create } from 'zustand';

interface PreviewState {
    sideBySide: boolean;
    setSideBySide: (value: boolean) => void;
}

export const usePreviewStore = create<PreviewState>((set) => ({
    sideBySide: false,
    setSideBySide: (value) => set({ sideBySide: value }),
}));
