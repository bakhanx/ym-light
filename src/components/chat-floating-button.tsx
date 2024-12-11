"use client";

import { createChatRoom } from "@/app/(content)/chats/action";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Loader from "./loader";
import { useChatStore } from "@/store/useChatStore";

const ChatFloatingButton = ({ sessionId }: { sessionId: number }) => {
  const router = useRouter();
  const { chatroomId, setChatroomId, setIsChatVisible } = useChatStore();

  const [isLoading, setIsLoading] = useState(false);

  const EnterChatRoom = async () => {
    if (chatroomId) {
      router.push(`/chats/${chatroomId}`, { scroll: false });
      setIsChatVisible(true);
      return;
    }

    setIsLoading(true);
    setIsChatVisible(true);

    try {
      const res = await createChatRoom();
      setChatroomId(res.roomId);
      router.push(`/chats/${res.roomId}`, { scroll: false });
    } catch (error) {
      console.error("채팅방 생성 에러: ", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };
  const navigateToChatsPage = () => {
    router.push("/manage/chats");
  };

  return (
    <>
      {sessionId === 1 ? (
        <button
          onClick={navigateToChatsPage}
          className="fixed bottom-10 right-10 z-floating-button flex h-20 w-20 items-center justify-center rounded-full bg-blue-900"
        >
          <ChatBubbleLeftEllipsisIcon className="h-10 w-10 text-white" />
        </button>
      ) : (
        <>
          <button
            onClick={EnterChatRoom}
            className="fixed bottom-10 right-10 z-40 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-500"
          >
            <ChatBubbleLeftEllipsisIcon className="h-10 w-10 text-white" />
          </button>
          {/* 아래를 다른 컴포넌트로 분리할 예정 */}

          {isLoading && (
            <div className="fixed bottom-10 right-10 z-50 flex h-96 w-96 flex-col items-center justify-center rounded-lg border-4 border-amber-300 bg-white p-5 transition-opacity duration-500">
              <Loader />
              채팅방 요청중...
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ChatFloatingButton;
