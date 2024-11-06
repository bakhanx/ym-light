import db from "@/utils/db";
import { useChatStore } from "@/store/useChatStore";
import Link from "next/link";
import React from "react";
import ChatEnterButton from "./_components/chat-enter-button";
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
    <div className="min-h-screen md:px-20 px-4 sm:pt-20 pt-32 max-w-screen-2xl mx-auto">
      <p>채팅페이지</p>
      <div className="flex flex-col gap-y-10 pt-10">
        <div className="">
          {/* PC */}
          <table className="hidden md:table border-collapse border border-gray-200 min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">입장</th>
                <th className="border border-gray-300 px-4 py-2">참여자</th>
                <th className="border border-gray-300 px-4 py-2">채팅방 ID</th>
                <th className="border border-gray-300 px-4 py-2">최근 업데이트</th>
              </tr>
            </thead>
            <tbody>
              {chatRooms.map((room) => (
                <tr key={room.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 w-20">
                    <ChatEnterButton roomId={room.id} />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {room.users.filter((user) => user.username !== "admin")[0]?.username}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{room.id}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {formatDate(room.updated_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile */}
          <div className="md:hidden">
            {chatRooms.map((room) => (
              <div key={room.id} className="border border-gray-200 p-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="font-bold">참여자:</span>
                  <span>
                    {room.users.filter((user) => user.username !== "admin")[0]?.username}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-bold">채팅방 ID:</span>
                  <span>{room.id}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-bold">최근 업데이트:</span>
                  <span>{formatDate(room.updated_at)}</span>
                </div>
                <div className="flex justify-end">
                  <ChatEnterButton roomId={room.id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
