"use server";

import NotFound from "@/app/not-found";
import db from "./db";
import getSession from "./session";

export const getUser = async () => {
  const session = await getSession();

  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session?.id,
      },
      select: {
        username: true,
        id: true,
        loginId: true,
      },
    });
    if (user) return user;
  }
  NotFound();
};
