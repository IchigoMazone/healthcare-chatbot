import { create } from "zustand";

interface ContextState {
  content: string | null;
  image_url: string | null;
  setContent: (content: string) => void;
  setImageUrl: (image_url: string) => void;
}

export const useContextStore = create<ContextState>((set) => ({
  content: null,
  image_url: null,
  setContent: (content) => set({ content }),
  setImageUrl: (image_url) => set({ image_url }),
}));
