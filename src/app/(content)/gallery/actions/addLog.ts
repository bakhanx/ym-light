"use server";

import db from "@/utils/db";
import getSession from "@/utils/session";

export const addLog = async () => {
  const session = await getSession();
  try {
    const lastLogTime = await db.log.findFirst({
      where: {
        userId: session.id,
      },
      orderBy: {
        created_at: "desc",
      },
      select: {
        created_at: true,
      },
    });

    if (
      !lastLogTime ||
      Number(new Date()) - Number(lastLogTime?.created_at) > 3600000
    ) {
      await db.log.create({
        data: {
          userId: session.id,
        },
      });
    }
  } catch (e) {
    console.log(e);
  }
};
