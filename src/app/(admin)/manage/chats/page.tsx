import db from "@/utils/db";
import { useChatStore } from "@/store/useChatStore";
import Link from "next/link";
import React from "react";
import EnterButton from "./_components/chat-enter-button";
import { formatDate } from "@/utils/formatDate";

const Chat = async () => {
  const chatRooms = await db.chatRoom.findMany({
    include: {
      _count: true,
      users: true,
    },
    orderBy: {
      updated_at: "desc",
    },
  });

  return (
    <div className="pt-20">
      <p>채팅페이지</p>
      <div className="flex flex-col gap-y-10 pt-10">
        {chatRooms.map((room) => (
          <div
            key={room.id}
            className="flex w-full items-center gap-x-5 border-2 p-2"
          >
            <EnterButton roomId={room.id} />

            <div className="w-64">
              {
                room.users.filter((user) => user.username !== "admin")[0]
                  .username
              }
            </div>
            <div className="w-64">{room.id}</div>
            <span>{formatDate(room.updated_at)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
