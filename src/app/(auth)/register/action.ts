import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from "@/libs/constants";
import { useFormStatus } from "react-dom";
import { z } from "zod";

const checkPassowrd = ({
  password,
  password_confirm,
}: {
  password: string;
  password_confirm: string;
}) => password === password_confirm;

const registerSchema = z
  .object({
    userId: z
      .string()
      .min(PASSWORD_MIN_LENGTH, "4자 이상 입력해주세요")
      .toLowerCase(),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH)
      .regex(PASSWORD_REGEX, "숫자, 소문자, 대문자, 특수문자를 조합해주세요."),
    password_confirm: z.string(),
    username: z.string(),
    phone: z.string().optional(),
    email: z.string(),
  })
  .refine(checkPassowrd, {
    message: "두 비밀번호가 일치하지 않습니다.",
    path: ["password_confirm"],
  });

export const registerAction = (prevState: any, formData: FormData) => {
  const data = {
    userId: formData.get("userId"),
    password: formData.get("password"),
    password_confirm: formData.get("password_confirm"),
    username: formData.get("username"),
    phone: formData.get("phone"),
    email: formData.get("email"),
  };

  const result = registerSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
};
