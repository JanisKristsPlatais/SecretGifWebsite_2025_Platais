import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AccessStore {
  accessGranted: boolean;
  grantAccess: () => void;
  resetAccess: () => void;
}

// Create a persisted store that saves to localStorage
export const useAccessStore = create<AccessStore>()(
  persist(
    (set) => ({
      accessGranted: false,
      grantAccess: () => set({ accessGranted: true }),
      resetAccess: () => set({ accessGranted: false }),
    }),
    {
      name: 'secret-gif-access',
    }
  )
);
 

