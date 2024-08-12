import db from "@/libs/db";
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

export const ChatDetail = async ({ params: { id } }: Props) => {
  const chatRoom = await getChatRoom(id);

  if(!chatRoom){
    return notFound()
  }

  return (
    <div>
      <ul>
        <li>채팅방 : {id}</li>

        {chatRoom?.users.map((user) => (
          <ul key={user.id}>
            <li>id : {user.id}</li>
            <li>name : {user.username}</li>
            <li>email : {user.email}</li>
          </ul>
        ))}

        <li>
          메시지 :
          {chatRoom?.messages.map((message) => (
            <li key={message.id}> {message.payload} </li>
          ))}
        </li>
      </ul>
    </div>
  );
};

export default ChatDetail;
