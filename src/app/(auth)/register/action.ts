"use server";

import {
  PASSWORD_CONFIRM_ERROR,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
  PASSWORD_REQUIRED_ERROR,
  WORDS_MAX_LENGTH,
} from "@/libs/constants";
import { z } from "zod";
import validator from "validator";
import { redirect } from "next/navigation";
import db from "@/libs/db";
import bcrypt from "bcrypt";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import getSession from "@/libs/session";

const checkPassowrd = ({
  password,
  password_confirm,
}: {
  password: string;
  password_confirm: string;
}) => password === password_confirm;

type ActionStateType = {
  token: boolean;
};

const checkLoginId = async (loginId: string) => {
  const user = await db.user.findUnique({
    where: {
      loginId: loginId,
    },
    select: {
      id: true,
    },
  });
  return !Boolean(user);
};
const checkPhone = async (phone: string) => {
  const user = await db.user.findUnique({
    where: {
      phone: phone,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};
const checkEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
    },
  });
  return !Boolean(user);
};

const registerSchema = z
  .object({
    loginId: z
      .string()
      .max(WORDS_MAX_LENGTH)
      .toLowerCase()
      .refine(checkLoginId, "이미 가입된 아이디입니다."),
    password: z
      .string({
        required_error: PASSWORD_REQUIRED_ERROR,
      })
      .min(PASSWORD_MIN_LENGTH)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    password_confirm: z.string(),
    username: z.string().max(WORDS_MAX_LENGTH),
    phone: z
      .string()
      .trim()
      .refine(
        async (phone) => {
          console.log(phone);
          if (phone === "") {
            return true;
          }
          if (!validator.isMobilePhone(phone || "", "ko-KR")) {
            return false;
          }
          return true;
        },
        { message: "유효하지 않은 번호입니다." },
      )
      .refine(
        async (phone) => {
          if (phone === "") {
            return true;
          }
          if (await checkPhone(phone)) {
            return false;
          }
          return true;
        },
        { message: "이미 가입된 번호입니다." },
      ),

    email: z.string().refine(checkEmail, "이미 가입된 이메일입니다."),
    token: z.coerce
      .number({
        required_error: "인증번호를 입력하세요.",
      })
      .min(10000, "5자리 입력해주세요")
      .max(99999, "5자리 입력해주세요")
      .optional(),
  })
  .refine(checkPassowrd, {
    message: PASSWORD_CONFIRM_ERROR,
    path: ["password_confirm"],
  });

type ActionState = {
  token: boolean;
};

export const registerAction = async (
  prevState: ActionState,
  formData: FormData,
) => {
  const data = {
    loginId: formData.get("loginId"),
    password: formData.get("password"),
    password_confirm: formData.get("password_confirm"),
    username: formData.get("username"),
    phone: formData.get("phone"),
    email: formData.get("email"),
  };

  const token = formData.get("token");

  if (!prevState?.token) {
    const result = await registerSchema.spa(data);

    // Form invalidate
    if (!result.success) {
      return {
        token: false,
        error: result.error.flatten(),
      };
    } else {
      return { token: true };
    }
  } else {
    // Form validate
    const result = await registerSchema.spa({ token, ...data });
    if (!result.success) {
      return {
        token: true,
        error: result.error.flatten(),
      };
    } else {
      const hashPassword = await bcrypt.hash(result.data.password, 10);
      const user = await db.user.create({
        data: {
          loginId: result.data.loginId,
          password: hashPassword,
          username: result.data.username,
          email: result.data.email,
          phone: result.data?.phone || null,
        },
        select: {
          id: true,
        },
      });

      const session = await getSession();
      session.id = user.id;
      await session.save();

      redirect("/login");
    }
  }
};
