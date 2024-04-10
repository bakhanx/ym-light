import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const createUser = async () => {
  const user = await db.user.create({
    data: {
      loginId: "asd",
      username: "test",
      password: "1234",
    },
  });
};
const createToken = async () => {
  const token = await db.sMSToken.create({
    data: {
      token: "1234",
      user: {
        connect: {
          id: 1,
        },
      },
    },
  });
};

// createUser();
// createToken();

export default db;
