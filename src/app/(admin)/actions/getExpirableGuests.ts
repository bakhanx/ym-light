"use server";

import db from "@/utils/db";

const GUEST_EXPIRATION_DAYS = 3;

const getExpirableGuests = async () => {
  const expirationDate = new Date(
    new Date().setDate(new Date().getDate() - GUEST_EXPIRATION_DAYS),
  );
  try {
    const expirableGuests = await db.user.findMany({
      where: {
        loginId: {
          contains: "guest",
        },
        logs: {
          every: {
            updated_at: {
              lt: expirationDate,
            },
          },
        },
      },
      select: {
        id: true,
      },
    });
    return { success: true, expirableGuests };
  } catch (error) {
    console.log("Error: 게스트 계정 찾기에 실패했습니다. ", error);
    throw new Error("Error: 게스트 계정 찾기에러 ");
  }
};

export default getExpirableGuests;
