"use client"

import FormButton from "@/components/form-button";
import FormInput from "@/components/form-input";
import React from "react";
import { useFormState } from "react-dom";
import { registerAction } from "./action";

const Register = () => {

  const [state, dispatch] = useFormState(registerAction, null);

  return (
    <div className="h-screen bg-gray-800  text-white">
      <div className="flex max-w-screen-lg justify-center items-center h-full">
        <form action={dispatch} className="w-64">
          <div className="flex flex-col gap-y-5">
            <FormInput
              label="아이디"
              name="userId"
              type="text"
              placeholder="ymlight123"
              error={state?.fieldErrors.userId}
              required
              minLength={4}
              maxLength={20}
            />
            <FormInput
              label="비밀번호"
              name="password"
              type="text"
              placeholder="****"
              error={state?.fieldErrors.password}
              required
              minLength={6}
            />
            <FormInput
              label="비밀번호 재확인"
              name="password_confirm"
              type="text"
              placeholder="****"
              error={state?.fieldErrors.password_confirm}
              required
              minLength={6}
            />
            <FormInput
              label="이름"
              name="username"
              type="text"
              placeholder="홍길동"
              error={state?.fieldErrors.username}
              minLength={2}
              maxLength={30}
              required
            />
            <FormInput
              label="전화번호"
              name="phone"
              type="number"
              placeholder="01012345678"
              error={state?.fieldErrors.phone}
            />
            <FormInput
              label="이메일"
              name="email"
              type="email"
              placeholder="ymlight@ym.com"
              error={state?.fieldErrors.email}
              required
            />
          </div>

          <div className="pt-10">
            <FormButton name="회원가입 하기" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
