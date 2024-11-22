"use client";

import FormButton from "@/components/form-button";
import FormInput from "@/components/form-input";
import React, { useState } from "react";
import { registerAction } from "../../../actions/register";
import {
  PASSWORD_MIN_LENGTH,
  WORDS_MAX_LENGTH,
} from "@/utils/constants/loginConstants";
import useCustomFormState from "@/hooks/useCustomFormState";
import { useUserStore } from "@/store/useUserStore";

type RegisterForm = {
  username: string;
  cartItemCount: number;
  token: boolean;
  jwtToken: string;
};

const Register = () => {
  const [isClick, setIsClick] = useState(false);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsClick(true);
  };

  const initFormState = {
    token: false,
    error: undefined,
  };

  const { setUser } = useUserStore();

  const [state, dispatch] = useCustomFormState<RegisterForm>(
    { token: false, jwtToken: "", username: "", cartItemCount: 0 },
    registerAction,
    (result) => {
      if (result.success) {
        setUser({
          username: result.data.username,
          cartItemCount: result.data.cartItemCount,
        });
        sessionStorage.setItem("jwt_token", result.data.jwtToken);
        window.location.href = "/";
      } else {
        console.log("Error: 회원가입실패", result.error);
      }
    },
  );
  // const [state, dispatch] = useFormState(registerAction, initFormState);

  return (
    <div className=" bg-gray-800  text-white">
      <div className="mx-auto flex h-full max-w-screen-lg items-center justify-center pb-12 pt-32">
        <form action={dispatch} className="w-80">
          <div className="flex flex-col gap-y-5">
            <FormInput
              label="아이디"
              name="loginId"
              type="text"
              placeholder="ymlight123"
              error={state?.error?.fieldErrors.loginId}
              required
              maxLength={WORDS_MAX_LENGTH}
            />
            <FormInput
              label="비밀번호"
              name="password"
              type="password"
              placeholder="****"
              error={state?.error?.fieldErrors.password}
              required
              minLength={PASSWORD_MIN_LENGTH}
            />
            <FormInput
              label="비밀번호 재확인"
              name="password_confirm"
              type="password"
              placeholder="****"
              error={state?.error?.fieldErrors.password_confirm}
              required
              minLength={PASSWORD_MIN_LENGTH}
            />
            <FormInput
              label="이름"
              name="username"
              type="text"
              placeholder="홍길동"
              error={state?.error?.fieldErrors.username}
              maxLength={WORDS_MAX_LENGTH}
              required
            />
            <FormInput
              label="전화번호 (선택)"
              name="phone"
              type="text"
              placeholder="01012345678"
              error={state?.error?.fieldErrors.phone}
            />
            <FormInput
              label="이메일"
              name="email"
              type="email"
              placeholder="ymlight@ym.com"
              error={state?.error?.fieldErrors.email}
              required
            />

            <div className="">
              {state?.data.token && (
                <FormInput
                  label="인증번호"
                  name="token"
                  type="number"
                  error={state?.error?.fieldErrors.token}
                  required
                  min={10000}
                  max={99999}
                />
              )}

              <div className="flex gap-x-5">
                <div>
                  <input
                    id="tokenMail"
                    className="peer/tokenMail"
                    type="radio"
                    name="tokenType"
                    defaultChecked
                  />
                  <label
                    htmlFor="tokenMail"
                    className="peer-checked/tokenMail:text-sky-500"
                  >
                    이메일
                  </label>
                </div>
                <div>
                  <input
                    id="tokenPhone"
                    className="peer/tokenPhone"
                    type="radio"
                    name="tokenType"
                  />
                  <label
                    htmlFor="tokenPhone"
                    className="peer-checked/tokenPhone:text-sky-500"
                  >
                    전화번호
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-10">
            <FormButton name="인증 요청하기" color="gray" />
            {/* <FormButton name="회원가입 하기" color="gray" /> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
