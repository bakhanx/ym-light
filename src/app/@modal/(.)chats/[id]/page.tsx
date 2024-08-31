import ChatMessages from "@/components/chat-messages";
import db from "@/libs/db";
import getSession from "@/libs/session";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const getChatRoom = async (id: string) => {
  const chatroom = await db.chatRoom.findUnique({
    where: {
      id,
    },
    include: {
      users: true,
      messages: true,
    },
  });
  return chatroom;
};

const getChatMessages = async (id: string) => {
  const messages = await db.message.findMany({
    where: {
      chatRoomId: id,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
  return messages;
};

const getUser = async (id: number) => {
  const user = await db.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      username: true,
    },
  });
  return user;
};

export type initialMessages = Prisma.PromiseReturnType<typeof getChatMessages>;

const Modal = async ({ params: { id } }: Props) => {
  const chatRoom = await getChatRoom(id);
  const session = await getSession();
  const user = await getUser(session.id);
  const initialMessages = await getChatMessages(id);

  if (!chatRoom) {
    return notFound();
  }
  return (
    <div className="fixed bottom-10 right-10 z-50 h-96 w-96  rounded-lg border-4 border-yellow-500  bg-white">
      <div className="fixed flex h-12 w-96 -translate-x-1 -translate-y-1 items-center justify-between rounded-t-md border-4 border-yellow-500 border-b-0 bg-gradient-to-tr from-yellow-500 to-yellow-200 px-2">
        <span>{user?.username}님과의 대화</span>
        <span className="text-sm">
          <span className="text-green-500">●</span> Online
        </span>
      </div>
      <div>
        <div>
          <ChatMessages
            userId={user?.id!}
            username={user?.username!}
            chatRoomId={chatRoom.id}
            initialMessages={initialMessages}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
