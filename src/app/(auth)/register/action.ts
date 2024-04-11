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
  return !Boolean(user);
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
        (phone) => {
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
      .refine(checkPhone, "이미 가입된 번호입니다.")
      .refine(validator.isMobilePhone),

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

// const tokenSchema = z.coerce
//   .number({
//     required_error: "인증번호를 입력하세요.",
//   })
//   .min(10000)
//   .max(99999);

// export const tokenAction = (prevState: any, formData: FormData) => {
//   const token = formData.get("token");

//   if (!prevState.token) {
//     const result = tokenSchema.safeParse(token);
//     if (!result.success) {
//       return {
//         token: false,
//       };
//     } else {
//       return { token: true };
//     }
//   }
// };

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

  if (!prevState.token) {
    const result = await registerSchema.safeParseAsync(data);

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
    const result = registerSchema.safeParse({ token, ...data });
    if (!result.success) {
      return {
        token: true,
        error: result.error.flatten(),
      };
    } else {
      redirect("/login");
    }
  }
};
