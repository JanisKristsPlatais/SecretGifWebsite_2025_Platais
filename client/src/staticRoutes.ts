import { create } from 'zustand';

// Static implementation of the server routes for GitHub Pages deployment
export interface AccessState {
  hasAccess: boolean;
  setAccess: (value: boolean) => void;
}

// Create a static store for access state
export const useAccessStateStore = create<AccessState>((set) => ({
  hasAccess: false,
  setAccess: (value: boolean) => set({ hasAccess: value }),
}));

// Static implementation of the API for GitHub Pages
export const staticApi = {
  // Check access status - this will be handled in-memory for GitHub Pages
  checkAccessStatus: async (): Promise<{hasAccess: boolean}> => {
    return { hasAccess: useAccessStateStore.getState().hasAccess };
  },

  // Grant access - this will be handled in-memory for GitHub Pages
  grantAccess: async (): Promise<void> => {
    useAccessStateStore.getState().setAccess(true);
  },

  // Reset access - this will be handled in-memory for GitHub Pages
  resetAccess: async (): Promise<void> => {
    useAccessStateStore.getState().setAccess(false);
  }
};