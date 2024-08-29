"use client";

import { createChatRoom } from "@/app/(content)/chats/action";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Loader from "./loader";

const FloatingButton = () => {
  const router = useRouter();
  const [isShowModal, setIsShowModal] = useState(false);

  const EnterChatRoom = () => {
    setIsShowModal(true);
    createChatRoom().then((res) => {
      router.push(`/chats/${res.roomId}`, { scroll: false });
      //깜빡임 방지
      setTimeout(() => {
        setIsShowModal(false);
      }, 300);
    });
  };
  return (
    <div>
      <button
        onClick={EnterChatRoom}
        className="fixed bottom-10 right-10 z-40 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-500"
      >
        <ChatBubbleLeftEllipsisIcon className="h-10 w-10 text-white" />
      </button>
      {isShowModal && (
        <div className="fixed bottom-10 right-10 z-50 flex h-96 w-96 flex-col items-center justify-center rounded-lg border-4 border-amber-300 bg-white p-5">
          <Loader />
          채팅방 요청중...
        </div>
      )}
    </div>
  );
};

export default FloatingButton;
