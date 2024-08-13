"use server";

import db from "@/libs/db";
import getSession from "@/libs/session";
import { redirect } from "next/navigation";

const ADMIN_ID = 1;

export const createChatRoom = async () => {
  const session = await getSession();

  if (!session.id) {
    // 게스트 생성
    const guest = await db.user.create({
      data: {
        username: `guest_${Date.now()}`,
        loginId: `guest_${Date.now()}`,
        password: "0000",
      },
      select: { id: true, username: true },
    });
    session.id = guest.id;
    session.save();
  }

  const existedChatRoom = await db.chatRoom.findFirst({
    where: {
      users: {
        some: {
          id: session.id,
        },
      },
    },
    select: { id: true },
  });

  if (existedChatRoom) {
    redirect(`/chats/${existedChatRoom.id}`);
  } else {
    const newChaRroom = await db.chatRoom.create({
      data: {
        users: {
          connect: [
            {
              id: ADMIN_ID,
            },
            {
              id: session.id,
            },
          ],
        },
      },
    });
    redirect(`/chats/${newChaRroom.id}`);
  }
};

export const saveChatMessages = async (
  payload: string,
  chatRoomId: string,
  userId: number,
) => {
  const message = await db.message.create({
    data: {
      payload,
      chatRoomId,
      userId,
    },
    select: {
      id: true,
    },
  });
};
