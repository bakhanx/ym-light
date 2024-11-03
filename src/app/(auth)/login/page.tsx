"use client";

import FormButton from "@/components/form-button";
import FormInput from "@/components/form-input";
import Link from "next/link";
import React from "react";
import { login } from "../../../actions/login";
import {
  PASSWORD_MIN_LENGTH,
  WORDS_MAX_LENGTH,
} from "@/utils/constants/loginConstants";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import useCustomFormState from "@/hooks/useCustomFormState";

type LoginForm = {
  id: number;
  username: string;
};

const Login = () => {
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();
  // const [state, dispatch] = useFormState(login, null);

  const [state, dispatch] = useCustomFormState<LoginForm>(
    { id: 0, username: "" },
    login,
    (result) => {
      if (result.success) {
        setUser({
          id: result.data.id,
          username: result.data.username,
        });
        router.push("/");
      } else {
        console.log("Error: 로그인 실패, ", result.error);
      }
    },
  );

  return (
    <div className="h-screen bg-gray-800  text-white">
      <div className="mx-auto flex h-full max-w-screen-xl items-center justify-center">
        <form action={dispatch}>
          <div className="flex flex-col gap-y-5">
            <FormInput
              label="아이디"
              name="loginId"
              type="text"
              placeholder="ymlight123"
              required
              max={WORDS_MAX_LENGTH}
              error={state?.error?.loginId}
            />

            <FormInput
              label="비밀번호"
              name="password"
              type="password"
              placeholder="****"
              required
              min={PASSWORD_MIN_LENGTH}
              error={state?.error?.password}
            />
          </div>

          <div className="pt-5">
            <FormButton name="로그인" />
          </div>
          <div className="pt-5 text-sm text-gray-400">
            <ul className="flex justify-center divide-x-[1px] divide-gray-400 hover:[&>li]:underline">
              <li>
                <Link href="/contact" className="px-5">
                  아이디 찾기
                </Link>
              </li>
              <li>
                <Link href="/register" className="px-5">
                  회원가입
                </Link>
              </li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
