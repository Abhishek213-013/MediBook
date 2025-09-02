//src/store/auth.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Role } from '@/types';

interface AuthState {
  user: any | null;
  token: string | null;
  role: Role | null;
  isAuthenticated: boolean;
  login: (user: any, token: string, role: Role) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      role: null,
      isAuthenticated: false,
      login: (user, token, role) => set({ user, token, role, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, role: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);