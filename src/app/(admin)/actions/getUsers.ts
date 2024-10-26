"use server"

import db from "@/utils/db";

const getUsers = async () => {
  const users = await db.user.findMany({
    select: {
      id: true,
      username: true,
      loginId: true,
      phone: true,
      email: true,
      created_at: true,
      updated_at: true,
      logs: {
        take: 1,
        orderBy: {
          updated_at: "desc",
        },
      },
      orders: {
        select: {
          _count: true,
        },
      },
    },
    orderBy:{
      id:"asc"
    }
  });
  return users;
};

export default getUsers;
