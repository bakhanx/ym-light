import {
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
  PASSWORD_REQUIRED_ERROR,
  USERID_REQUIRED_ERROR,
} from "@/libs/constants";
import { z } from "zod";

const loginSchema = z.object({
  userId: z
    .string({
      required_error: USERID_REQUIRED_ERROR,
    })
    .toLowerCase(),
  password: z.string({
    required_error: PASSWORD_REQUIRED_ERROR,
  }),
});



export const loginActions = async (prevState: any, formData: FormData) => {
  const data = {
    userId: formData.get("userId"),
    password: formData.get("password"),
  };

  const result = loginSchema.safeParse(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
};
