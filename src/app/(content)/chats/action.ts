"use server";

import db from "@/utils/db";
import getSession from "@/utils/session";
import { redirect, RedirectType, useRouter } from "next/navigation";

const ADMIN_ID = 1;

export const createChatRoom = async () => {
  const session = await getSession();
  if (!session.id) {
    // 게스트 생성
    const guestNumber = Date.now().toString().slice(9)
    const guest = await db.user.create({
      data: {
        username: `guest_${guestNumber}`,
        loginId: `guest_${guestNumber}`,
        password: "0000",
      },
      select: { id: true, username: true },
    });
    session.id = guest.id;
    session.save();
    await db.log.create({
      data: {
        userId: session.id,
      },
    });
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
    // redirect(`/chats/${existedChatRoom.id}`);
    return { roomId: existedChatRoom.id };
  } else {
    const newChatRoom = await db.chatRoom.create({
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
    // redirect(`/chats/${newChatRoom.id}`);
    return { roomId: newChatRoom.id };
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
