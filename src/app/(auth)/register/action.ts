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

const checkPassowrd = ({
  password,
  password_confirm,
}: {
  password: string;
  password_confirm: string;
}) => password === password_confirm;

type ActionStateType = {
  token :boolean
}

const registerSchema = z
  .object({
    userId: z.string().max(WORDS_MAX_LENGTH).toLowerCase(),
    password: z
      .string({
        required_error: PASSWORD_REQUIRED_ERROR,
      })
      .min(PASSWORD_MIN_LENGTH)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    password_confirm: z.string(),
    username: z.string().max(WORDS_MAX_LENGTH),
    phone: z.string().trim().optional().refine((phone)=> validator.isMobilePhone(phone || "" , "ko-KR")),
    email: z.string(),
  })
  .refine(checkPassowrd, {
    message: PASSWORD_CONFIRM_ERROR,
    path: ["password_confirm"],
  });

const tokenSchema = z.coerce
  .number({
    required_error: "인증번호를 입력하세요.",
  })
  .min(10000)
  .max(99999);

export const registerAction = (prevState: any, formData: FormData) => {
  const data = {
    userId: formData.get("userId"),
    password: formData.get("password"),
    password_confirm: formData.get("password_confirm"),
    username: formData.get("username"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    
  };

  const data2 = {
    token: (formData.get("token")),
  }

  const result = registerSchema.safeParse(data);

  const result2 = tokenSchema.safeParse(data2);

  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
};
