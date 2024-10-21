import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type State = {
  isChatVisible: boolean;
};

type Actions = {
  setIsChatVisible: (isChatVisible: boolean) => void;
};

const INITIAL_STATE: State = {
  isChatVisible: false,
};

export const useChatStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      isChatVisible: INITIAL_STATE.isChatVisible,

      setIsChatVisible: (isChatVisible) => {
        set({ isChatVisible });
      },
    }),
    {
      name: "chat",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ isChatVisible: state.isChatVisible }),
    },
  ),
);
