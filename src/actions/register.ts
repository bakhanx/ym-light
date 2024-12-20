"use server";

import {
  PASSWORD_CONFIRM_ERROR,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
  PASSWORD_REQUIRED_ERROR,
  WORDS_MAX_LENGTH,
} from "@/utils/constants/loginConstants";
import { z } from "zod";
import validator from "validator";
import db from "@/utils/db";
import bcrypt from "bcrypt";
import getSession from "@/utils/session";
import { createToken } from "@/utils/jwt";
import { revalidatePath } from "next/cache";

const checkPassword = ({
  password,
  password_confirm,
}: {
  password: string;
  password_confirm: string;
}) => password === password_confirm;

const checkLoginId = async (loginId: string) => {
  const user = await db.user.findUnique({
    where: {
      loginId: loginId,
    },
    select: {
      id: true,
    },
  });
  return !user;
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
  return !!user;
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
  return !user;
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
          if (phone === "") {
            return true;
          }
          if (!validator.isMobilePhone(phone || "", "ko-KR")) {
            return false;
          }
          return !(await checkPhone(phone));
        },
        { message: "유효하지 않은 번호이거나 이미 가입된 번호입니다." },
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
  .refine(checkPassword, {
    message: PASSWORD_CONFIRM_ERROR,
    path: ["password_confirm"],
  });

type ValidationError = {
  fieldErrors: {
    loginId?: string[];
    password?: string[];
    password_confirm?: string[];
    username?: string[];
    phone?: string[];
    email?: string[];
  };
};

type FormState<T> = {
  data: T;
  error: ValidationError | null;
  success: boolean;
};

type ActionStateType = {
  username: string;
  cartItemCount: number;
  jwtToken: string;
  token: boolean;
};

export const registerAction = async (
  prevState: ActionStateType,
  formData: FormData,
): Promise<FormState<ActionStateType>> => {
  const data = {
    loginId: formData.get("loginId"),
    password: formData.get("password"),
    password_confirm: formData.get("password_confirm"),
    username: formData.get("username"),
    phone: formData.get("phone"),
    email: formData.get("email"),
  };

  const token = parseInt(formData.get("token")?.toString() || "0", 10);

  if (!prevState?.token) {
    const result = await registerSchema.spa(data);

    // Form invalidate
    if (!result.success) {
      return {
        data: {
          ...prevState,
          token: false,
        },
        error: result.error.flatten(),
        success: false,
      };
    } else {
      return {
        data: {
          ...prevState,
          token: true,
        },
        error: null,
        success: false,
      };
    }
  } else {
    // Form validate
    const result = await registerSchema.spa({ token, ...data });
    if (!result.success) {
      return {
        data: {
          ...prevState,
          token: true,
        },
        error: result.error.flatten(),
        success: false,
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
          username: true,
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

      const session = await getSession();
      session.id = user.id;
      session.save();

      const jwtToken = createToken(user.id);

      await db.log.create({
        data: {
          userId: session.id,
        },
      });
      revalidatePath("/");
      return {
        data: {
          username: user.username,
          cartItemCount: user.carts?.[0]?.cartItems?.length || 0,
          jwtToken: jwtToken,
          token: true,
        },
        error: null,
        success: true,
      };
    }
  }
};
