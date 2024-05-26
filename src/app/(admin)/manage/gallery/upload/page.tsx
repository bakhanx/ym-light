"use client";

import FormButton from "@/components/form-button";
import FormInput from "@/components/form-input";
import { BoltIcon, PhotoIcon } from "@heroicons/react/16/solid";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import { handleForm } from "./actions";

const DEFAULT_CONTENT =
  "(예시) Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus sint architecto ut commodi. Optio nostrum aliquid tenetur labore voluptate consequuntur dolorem eius!";

const DEFAULT_TAG = "(예시) #서울전시회 #날씨좋음";

const Upload = () => {
  const [state, dispatch] = useFormState(handleForm, null);
  const [formValue, setFormValue] = useState([DEFAULT_CONTENT, DEFAULT_TAG]);

  const handleBlur = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    console.log(index);
    const temp = [...formValue];
    temp[index] = event.currentTarget.value;
    setFormValue(temp);
  };

  // useForm으로 수정

  return (
    <div className="h-screen border-2 border-blue-500 pt-20">
      <div className="mx-auto flex h-full max-w-screen-xl items-center">
        <div className="flex w-full px-10">
          {/* 미리보기 */}
          <div className="left flex  w-[50%] border-2 border-gray-300">
            <div className="w-full border p-10">
              {/* Image */}
              <div className="relative">
                <PhotoIcon className="w-full" />
              </div>

              {/* Text */}
              <div className="flex flex-col p-3 ">
                <ul>
                  <li className="flex items-center gap-x-1">
                    <div className="font-semibold">YM Light</div>
                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-black">
                      <BoltIcon className="h-3 w-3 rounded-full text-amber-300" />
                    </div>
                    <div className="text-gray-500">ymlight@gmail.com</div>
                    <div>·</div>
                    <div className="text-gray-500">2024-00-00</div>
                  </li>
                  <li className="pt-2">{formValue[0]}</li>

                  <li className="pt-5 font-semibold text-blue-600">
                    {formValue[1]}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 입력 */}
          <div className="right w-[50%]  flex-col border-2 border-gray-300 ">
            <div className="flex flex-col p-10 ">
              <p className="text-3xl font-bold ">갤러리 업로드</p>
              <p>
                <span className="text-red-500">* </span>
                <span className="opacity-70">는 필수 양식입니다.</span>
              </p>

              <div className="w-full pt-5">
                <form action={dispatch}>
                  <div className="flex flex-col gap-y-5">
                    <FormInput
                      label="내용"
                      name="content"
                      type="text"
                      placeholder="안녕하세요"
                      error={state?.fieldErrors.content}
                      required
                      textarea
                      minLength={1}
                      maxLength={1000}
                      onBlur={(e) => handleBlur(e, 0)}
                      className="resize-none border-2 p-2"
                    />
                    <FormInput
                      label="태그"
                      name="tag"
                      type="text"
                      placeholder="#명품"
                      error={state?.fieldErrors.tag}
                      maxLength={30}
                      onBlur={(e) => handleBlur(e, 1)}
                      className="h-10 border-2 p-2"
                    />
                  </div>

                  <div className="pt-20">
                    <FormButton name="업로드 하기" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
