"use client";

import React from "react";
import CloseButton from "./closeButton";
import ChatMessages from "@/components/chat-messages";
import { ChatMessagesType, ChatRoomType, UserType } from "../page";
import { useChatStore } from "@/store/useChatStore";

type ChatsProps = {
  user: UserType;
  chatRoom: ChatRoomType;
  initialMessages: ChatMessagesType;
};

const ChatModalLayout = ({ user, chatRoom, initialMessages }: ChatsProps) => {
  const isChatVisible = useChatStore((state) => state.isChatVisible);

  return (
    <>
      {isChatVisible && (
        <div className="fixed bottom-10 right-10 z-50 h-96 w-96  rounded-lg border-4 border-blue-950  bg-white">
          <div className="fixed flex h-12 w-96 -translate-x-1 -translate-y-1 items-center justify-between rounded-t-md border-4 border-b-0 border-blue-950 bg-gradient-to-tr from-blue-950 to-black px-2 text-white">
            <div className="flex w-full items-center justify-between gap-x-2 px-4">
              <span>{user?.username}님과의 대화</span>
              <span className="text-sm">
                <span className="text-green-500">●</span> 영업중
              </span>
            </div>
            <CloseButton />
          </div>
          <div>
            <div>
              <ChatMessages
                userId={user?.id!}
                username={user?.username!}
                chatRoomId={chatRoom?.id!}
                initialMessages={initialMessages}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatModalLayout;
