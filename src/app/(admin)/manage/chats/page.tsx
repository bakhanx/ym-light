import db from "@/utils/db";
import React from "react";

import ChatEnterButton from "./_components/chat-enter-button";
import { formatDate } from "@/utils/formatDate";
import Table, { RowData } from "../_components/table";
import Card from "../_components/card";

const getChatRooms = async () => {
  const chatRooms = await db.chatRoom.findMany({
    select: {
      id: true,
      updated_at: true,
      _count: {
        select: { users: true, messages: true },
      },
      users: {
        select: { username: true, loginId: true },
        where: { loginId: { not: "admin" } },
      },
      messages: {
        select: { payload: true },
        take: 1,
        orderBy: { updated_at: "desc" },
      },
    },
    orderBy: { updated_at: "desc" },
  });

  return chatRooms;
};

const ChatsList = async () => {
  const chatRooms = await getChatRooms();
  const headers = ["참여자", "채팅방 ID", "최근 메세지", "최근 업데이트", ""];

  const data: RowData[][] = chatRooms.map((room) => [
    [
      room.users.filter((user) => user.loginId !== "admin")[0]?.username ||
        "",
      "text-center whitespace-nowrap",
    ],
    [room.id, "whitespace-nowrap"],
    [room.messages[0]?.payload || [], ""],
    [formatDate(room.updated_at), ""],
    [<ChatEnterButton key={room.id} roomId={room.id} />, "text-center whitespace-nowrap"],
  ]);

  return (
    <div className="mx-auto min-h-screen max-w-screen-2xl px-4 pt-28  md:px-20">
      <h1 className="text-xl font-bold">채팅페이지</h1>
      <div className="pt-10">
        <div className="hidden md:block">
          <Table headers={headers} data={data} />
        </div>
        <div className="block md:hidden">
          <Card headers={headers} data={data} />
        </div>
      </div>
    </div>
  );
};

export default ChatsList;
