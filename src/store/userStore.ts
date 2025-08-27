import { create } from 'zustand';

export interface UserProfile {
    id: string;
    displayName: string;
    email: string;
    avatarUrl?: string;
}

interface UserState {
    user: UserProfile | null;
    setUser: (user: UserProfile | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}));
