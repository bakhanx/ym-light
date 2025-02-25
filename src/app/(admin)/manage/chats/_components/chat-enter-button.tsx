"use client";

import Loader from "@/components/loader";
import { useChatStore } from "@/store/useChatStore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";

const ChatEnterButton = ({ roomId }: { roomId: string }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isShowModal, setIsShowModal] = useState(false);
  const setIsChatVisible = useChatStore((state) => state.setIsChatVisible);

  const EnterChatRoom = () => {
    if (isShowModal) return;

    setIsShowModal(true);
    setIsChatVisible(true);
    router.push(`/chats/${roomId}`, { scroll: false });
  };

  useEffect(() => {
    if (isShowModal) {
      const timer = setTimeout(() => {
        setIsShowModal(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isShowModal]);

  return (
    <>
      <button className="bg-blue-900 p-2  text-white" onClick={EnterChatRoom}>
        입장
      </button>
      {isShowModal ||
        (isPending && (
          <div className="fixed bottom-10 right-10 z-50 flex h-96 w-96 flex-col items-center justify-center rounded-lg border-4 border-amber-300 bg-white p-5">
            <Loader />
            채팅방 요청중...
          </div>
        ))}
    </>
  );
};

export default ChatEnterButton;
