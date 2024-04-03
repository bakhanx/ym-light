"use client";

import FormButton from "@/components/form-button";
import FormInput from "@/components/form-input";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import { registerAction } from "./action";
import { PASSWORD_MIN_LENGTH, WORDS_MAX_LENGTH } from "@/libs/constants";

const Register = () => {
  const [isClick, setIsClick] = useState(false);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsClick(true);
  };

  const initialState = {
    token: false,
  };

  const [state, dispatch] = useFormState(registerAction, null);

  return (
    <div className="h-screen bg-gray-800  text-white">
      <div className="flex h-full max-w-screen-lg items-center justify-center">
        <form action={dispatch} className="w-80">
          <div className="flex flex-col gap-y-5">
            <FormInput
              label="아이디"
              name="userId"
              type="text"
              placeholder="ymlight123"
              error={state?.fieldErrors.userId}
              required
              maxLength={WORDS_MAX_LENGTH}
            />
            <FormInput
              label="비밀번호"
              name="password"
              type="text"
              placeholder="****"
              error={state?.fieldErrors.password}
              required
              minLength={PASSWORD_MIN_LENGTH}
            />
            <FormInput
              label="비밀번호 재확인"
              name="password_confirm"
              type="text"
              placeholder="****"
              error={state?.fieldErrors.password_confirm}
              required
              minLength={PASSWORD_MIN_LENGTH}
            />
            <FormInput
              label="이름"
              name="username"
              type="text"
              placeholder="홍길동"
              error={state?.fieldErrors.username}
              maxLength={WORDS_MAX_LENGTH}
              required
            />
            <FormInput
              label="전화번호 (선택)"
              name="phone"
              type="text"
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
            <div className="">
              <FormInput
                label="인증번호"
                name="token"
                type="number"
                // error={state?.fieldErrors.token}
                required
                min={10000}
                max={99999}
              />

             
                <legend>인증 방식</legend>
                <div className="flex gap-x-5">
                  <div>
                    <input
                      id="draft"
                      className="peer/draft"
                      type="radio"
                      name="mailbtn"
                      checked
                    />
                    <label
                     
                      htmlFor="draft"
                      className="peer-checked/draft:text-sky-500"
                    >
                      이메일
                    </label>
                  </div>
                  <div>
                    <input
                      id="published"
                      className="peer/published"
                      type="radio"
                      name="phonebtn"
                    />
                    <label
                      htmlFor="published"
                      className="peer-checked/published:text-sky-500"
                    >
                      전화번호
                    </label>
                  </div>
                </div>
      

              <div className="flex w-full justify-between gap-x-5 py-5">
                <button
                  onClick={handleButtonClick}
                  className="asd w-[50%] rounded-md border-2 bg-blue-500 p-2"
                >
                  이메일로 인증
                </button>
                <button
                  onClick={handleButtonClick}
                  className="peer-[asd]::border-none w-[50%] rounded-md bg-blue-500 p-2 hover:border-2"
                >
                  번호로 인증
                </button>
              </div>
            </div>
          </div>

          <div className="pt-10">
            <FormButton name="회원가입 하기" color="gray" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
