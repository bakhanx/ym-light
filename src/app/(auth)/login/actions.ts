"use server";

import {
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
  PASSWORD_REQUIRED_ERROR,
  LOGINID_REQUIRED_ERROR,
} from "@/libs/constants";
import db from "@/libs/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import getSession from "@/libs/session";
import { RedirectType, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const checkLoginIdExists = async (loginId: string) => {
  const user = await db.user.findUnique({
    where: {
      loginId,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};

const loginSchema = z.object({
  loginId: z
    .string({
      required_error: LOGINID_REQUIRED_ERROR,
    })
    .toLowerCase()
    .refine(checkLoginIdExists, { message: "존재하지 않는 아이디입니다." }),
  password: z.string({
    required_error: PASSWORD_REQUIRED_ERROR,
  }),
});

export const loginActions = async (prevState: any, formData: FormData) => {
  const data = {
    loginId: formData.get("loginId"),
    password: formData.get("password"),
  };

  const result = await loginSchema.spa(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        loginId: result.data.loginId,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const ok = await bcrypt.compare(result.data.password, user!.password);

    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      session.save();

      await db.log.create({
        data: {
          userId: session.id,
        },
      });

      revalidatePath("/");
      redirect("/");
    } else {
      return {
        fieldErrors: {
          loginId: [],
          password: ["잘못된 비밀번호 입니다."],
        },
      };
    }
  }
};
