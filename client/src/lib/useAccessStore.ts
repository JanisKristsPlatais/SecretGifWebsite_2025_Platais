import { create } from "zustand";

interface AccessStore {
  accessGranted: boolean;
  grantAccess: () => void;
  resetAccess: () => void;
}

export const useAccessStore = create<AccessStore>((set) => ({
  accessGranted: false,
  grantAccess: () => set({ accessGranted: true }),
  resetAccess: () => set({ accessGranted: false }),
}));
 

