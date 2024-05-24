"use server";
import { z } from "zod";

const formSchema = z.object({
  content: z
    .string()
    .min(1, "내용을 입력해주세요.")
    .max(1000, "글자 수 한도를 초과하였습니다."),
  tag: z
    .string()
    .min(1, "내용을 입력해주세요.")
    .max(30, "태그 수가 너무 많습니다."),
});

export const handleForm = async (prevState: any, formData: FormData) => {
  const data = {
    content: formData.get("content"),
    tag: formData.get("tag"),
  };

  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
};
