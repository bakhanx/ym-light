"use server";

import db from "@/utils/db";

const deleteExpirableGuests = async (userIds: number[]) => {
  if (userIds && userIds.length > 0) {
    try {
      await db.user.deleteMany({
        where: {
          id: { in: userIds },
        },
      });

      return { success: true };
    } catch (error) {
      console.log("Error: 게스트 계정 삭제 에러", error);
      throw new Error("Error: 게스트 계정 삭제 에러");
    }
  }
};

export default deleteExpirableGuests;
