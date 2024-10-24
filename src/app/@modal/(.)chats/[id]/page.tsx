import db from "@/utils/db";
import getSession from "@/utils/session";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import ChatModalLayout from "./_components/chatModalLayout";

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
export type ChatRoomType = Prisma.PromiseReturnType<typeof getChatRoom>;
export type ChatMessagesType = Prisma.PromiseReturnType<typeof getChatMessages>;
export type UserType = Prisma.PromiseReturnType<typeof getUser>;

const Modal = async ({ params: { id } }: Props) => {
  const chatRoom = await getChatRoom(id);
  const session = await getSession();
  const user = await getUser(session.id);
  const initialMessages = await getChatMessages(id);

  if (!chatRoom) {
    return notFound();
  }

  return (
    <div>
      <ChatModalLayout
        chatRoom={chatRoom}
        user={user}
        initialMessages={initialMessages}
      />
    </div>
  );
};

export default Modal;
