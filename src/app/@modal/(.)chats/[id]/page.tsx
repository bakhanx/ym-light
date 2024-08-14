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
    <div className="fixed bottom-10 right-10 max-w-screen-sm bg-white p-5 z-50 h-96 overflow-y-scroll border-amber-300 border-4 rounded-lg">
      <div>
        <h1>채팅방 : {id}</h1>
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
