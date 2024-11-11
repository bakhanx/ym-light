"use server";

import {
  PASSWORD_REQUIRED_ERROR,
  LOGINID_REQUIRED_ERROR,
} from "@/utils/constants/loginConstants";
import db from "@/utils/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import getSession from "@/utils/session";
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

type User = {
  id: number;
  username: string;
  cartItemCount: number;
};

type ValidationError = {
  fieldErrors: { loginId?: string[]; password?: string[] };
};
type FormState<T> = {
  data: T;
  error: ValidationError | null;
  success: boolean;
};

export const login = async (
  prevState: any,
  formData: FormData,
): Promise<FormState<User>> => {
  const data = {
    loginId: formData.get("loginId"),
    password: formData.get("password"),
  };
  const result = await loginSchema.spa(data);

  if (!result.success) {
    return { data: prevState, error: result.error.flatten(), success: false };
  } else {
    const user = await db.user.findUnique({
      where: {
        loginId: result.data.loginId,
      },
      select: {
        id: true,
        username: true,
        password: true,

        carts: {
          select: {
            cartItems: {
              select: {
                _count: true,
              },
            },
          },
        },
      },
    });

    if (!user || !(await bcrypt.compare(result.data.password, user.password))) {
      return {
        data: prevState,
        error: {
          fieldErrors: { loginId: [], password: ["잘못된 비밀번호 입니다."] },
        },
        success: false,
      };
    }
    const session = await getSession();
    session.id = user.id;
    await session.save();

    await db.log.create({ data: { userId: session.id } });

    revalidatePath("/");

    return {
      data: {
        id: user.id,
        username: user.username,
        cartItemCount: user.carts?.[0]?.cartItems?.length || 0,
      },
      error: null,
      success: true,
    };
  }
};
