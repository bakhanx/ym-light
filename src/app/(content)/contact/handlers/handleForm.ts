"use server";

import { PASSWORD_REGEX } from "@/utils/constants/loginConstants";
import { z } from "zod";

const checkUsername = (username: string) => !username.includes("admin");

const checkContact = ({
  contact,
  contact_confirm,
}: {
  contact: string;
  contact_confirm: string;
}) => contact === contact_confirm;

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "올바르지 않은 이름입니다.",
        required_error: "이름을 반드시 입력해주세요.",
      })
      .min(2, "이름이 짧습니다.")
      .max(30, "이름이 깁니다.")
      .refine(checkUsername, "입력할 수 없는 이름입니다."),
    company: z
      .string()
      .min(1)
      .max(30)
      .optional()
      .transform((company) => `🏦 ${company}`),
    contact: z
      .string()
      .min(6, "연락처가 짧습니다.")
      .max(30, "연락처가 깁니다.")
      .trim()
      .toLowerCase(),
    contact_confirm: z.string().min(6).max(30).trim().toLowerCase(),
    content: z
      .string()
      .min(1, "내용을 입력해주세요.")
      .max(1000, "글자 수 한도를 초과하였습니다."),
  })
  .refine(checkContact, {
    message: "연락처가 일치하지 않습니다.",
    path: ["contact_confirm"],
  });

export const handleForm = async (prevState: any, formData: FormData) => {
  const data = {
    username: formData.get("username"),
    company: formData.get("company"),
    contact: formData.get("contact"),
    contact_confirm: formData.get("contact_confirm"),
    content: formData.get("content"),
  };

  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
};
