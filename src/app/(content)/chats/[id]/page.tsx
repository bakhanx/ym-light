import ChatMessages from "@/components/chat-messages";
import db from "@/utils/db";
import getSession from "@/utils/session";
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

const ChatDetail = async ({ params: { id } }: Props) => {
  const chatRoom = await getChatRoom(id);
  const session = await getSession();
  const user = await getUser(session.id);
  const initialMessages = await getChatMessages(id);

  if (!chatRoom) {
    return notFound();
  }
  return (
    <div>
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

export default ChatDetail;
