import { create } from "zustand";

interface AuthState {
  userId: string | null;
  accessToken: string | null;

  setAuth: (userId: string, accessToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  accessToken: null,

  setAuth: (userId, accessToken) =>
    set({
      userId,
      accessToken,
    }),

  logout: () =>
    set({
      userId: null,
      accessToken: null,
    }),
}));
