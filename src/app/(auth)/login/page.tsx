"use client";

import FormButton from "@/components/form-button";
import FormInput from "@/components/form-input";
import Link from "next/link";
import React from "react";
import { useFormState } from "react-dom";
import { loginActions } from "./actions";

const Login = () => {
  const [state, dispatch] = useFormState(loginActions, null);

  console.log(state);

  return (
    <div className="h-screen bg-gray-800  text-white">
      <div className="flex h-full max-w-screen-lg items-center justify-center">
        <form action={dispatch}>
          <div className="flex flex-col gap-y-5">
            <FormInput
              label="아이디"
              name="userId"
              type="text"
              placeholder="ymlight123"
              // error={state?.fieldErrors.username}
              required
              minLength={2}
              maxLength={30}
            />
            <FormInput
              label="비밀번호"
              name="password"
              type="password"
              placeholder="****"
              // error={state?.fieldErrors.content}
              required
              minLength={1}
              maxLength={1000}
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
