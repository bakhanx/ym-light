"use client";

import { createChatRoom } from "@/app/(content)/chats/action";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import React from "react";

const FloatingButton = () => {
  const router = useRouter();
  const EnterChatRoom = () => {
    createChatRoom().then((res) => {
      router.push(`/chats/${res.roomId}`);
    });
  };
  return (
    <button
      onClick={EnterChatRoom}
      className="fixed bottom-10 right-10 z-50 flex h-20 w-20 items-center justify-center rounded-full bg-amber-500"
    >
      <ChatBubbleLeftEllipsisIcon className="h-10 w-10 text-white" />
    </button>
  );
};

export default FloatingButton;
