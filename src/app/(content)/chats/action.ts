"use server";

import db from "@/libs/db";
import getSession from "@/libs/session";
import { redirect } from "next/navigation";

const ADMIN_ID = 1;

export const createChatRoom = async () => {
  // 게스트
  const guest = await db.user.create({
    data: {
      username: `guest_${Date.now()}`,
      loginId: `guest_${Date.now()}`,
      password: "0000",
    },
    select: { id: true, username: true },
  });

  // 회원
  const session = await getSession();

  const chatroom = await db.chatRoom.create({
    data: {
      users: {
        connect: [
          {
            id: ADMIN_ID,
          },
          {
            id: guest.id,
            // id: session.id
          },
        ],
      },
    },
  });

  //   채팅창 모달
  redirect(`/chats/${chatroom.id}`);
};
