import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type State = {
  isChatVisible: boolean;
  chatroomId: string;
};

type Actions = {
  setIsChatVisible: (isChatVisible: boolean) => void;
  setChatroomId: (chatroomId: string) => void;
};

const INITIAL_STATE: State = {
  isChatVisible: false,
  chatroomId: "",
};

export const useChatStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      isChatVisible: INITIAL_STATE.isChatVisible,
      chatroomId: INITIAL_STATE.chatroomId,
      setIsChatVisible: (isChatVisible) => {
        set({ isChatVisible });
      },
      setChatroomId: (chatroomId) => {
        set({ chatroomId });
      },
    }),
    {
      name: "chat",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ isChatVisible: state.isChatVisible, chatroomId: state.chatroomId }),
    },
  ),
);
