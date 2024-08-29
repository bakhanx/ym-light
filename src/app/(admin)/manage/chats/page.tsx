import DateTime from "@/components/datetime";
import db from "@/libs/db";
import Link from "next/link";
import React from "react";

const Chat = async () => {
  const chatRooms = await db.chatRoom.findMany({
    include: {
      _count: true,
      users: true,
    },
  });

  return (
    <div className="pt-20">
      <p>채팅페이지</p>
      <div className="flex flex-col gap-y-10 pt-10">
        {chatRooms.map((room) => (
          <div key={room.id} className="flex w-full gap-x-5 border-2 p-2">
            <Link href={`/chats/${room.id}`} className="bg-gray-300 p-2">
              입장
            </Link>
            <div className="w-64">
              {
                room.users.filter((user) => user.username !== "admin")[0]
                  .username
              }
            </div>
            <div className="w-64">{room.id}</div>
            <DateTime date={room.updated_at} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
