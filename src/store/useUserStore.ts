import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type User = {
  username: string;
  cartItemCount: number;
};

type State = {
  user: User | null;
};

type Actions = {
  setUser: (user: User) => void;
  addToCartItemCount: () => void;
  substractToCartItemCount: (quantity?: number) => void;
  removeUser: () => void;
};

const INITIAL_STATE: State = {
  user: null,
};

export const useUserStore = create<State & Actions>()(
  persist(
    (set) => ({
      user: INITIAL_STATE.user,
      setUser: (user) => set({ user }),
      removeUser: () => set({ user: null }),
      addToCartItemCount: () =>
        set((state) => {
          if (state.user) {
            console.log("state user : ", state.user);
            return {
              user: {
                ...state.user,
                cartItemCount: state.user.cartItemCount + 1,
              },
            };
          }
          return state;
        }),
      substractToCartItemCount: (quantity: number = 1) =>
        set((state) => {
          if (state.user) {
            return {
              user: {
                ...state.user,
                cartItemCount: state.user.cartItemCount - quantity,
              },
            };
          }
          return state;
        }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user }),
    },
  ),
);
