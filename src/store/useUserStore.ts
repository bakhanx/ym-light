import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type User = {
  username: string;
  id: number;
};

type State = {
  user: User | null;
};

type Actions = {
  setUser: (user: User) => void;
  removeUser: () => void;
};

const INITIAL_STATE: State = {
  user: null,
};

export const useUserStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      user: INITIAL_STATE.user,
      setUser: (user) => set({ user }),
      removeUser: () => set({ user: null }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user }),
    },
  ),
);
