"use client";

import React, { useEffect } from "react";
import Image01 from "@/../public/images/contact01-lg.jpg";
import Image from "next/image";
import FormInput from "@/components/form-input";
import FormButton from "@/components/form-button";
import { useFormState } from "react-dom";
import { handleForm } from "./actions";

type formType = {
  username: string;
  company: string;
  contact: string;
  content: string;
};

type stateProps = {
  ok: boolean;
  data: any;
};

const Contact = () => {
  const [state, dispatch] = useFormState(handleForm, null);

  // useEffect(() => {
  //   if(state?.ok){
  //     console.log(state?.)
  //   }
  //   else {
  //     console.log("Error");
  //   }
  // }, [state]);

  return (
    <>
      {/* Issue: items-center와 screen-h에 따른 pt 충돌 */}
      <div className="">
        <div className="Image-Wrap h-screen w-full pt-20">
          <div className="absolute h-screen w-full">
            <div className="relative h-screen w-full">
              <Image src={Image01} alt="contact" fill objectFit="cover" />
              <div className="h-full w-full bg-black opacity-80" />
            </div>
          </div>

          <div className="Content-Wrap flex h-full items-center ">
            <div className="z-20 flex w-full px-20 pt-8 text-white">
              <div className="left flex w-[50%] flex-col items-center">
                <div className="flex flex-col gap-y-10">
                  <div>
                    <p className="text-3xl font-bold">
                      Ask how we can help you
                    </p>
                    <div className="flex flex-col gap-y-10 pt-6">
                      <div>
                        <p className="font-bold">부담없는 1:1 친절 상담</p>
                        <p className="opacity-70">
                          오직 사장님과 다이렉트로 상담이 이루어집니다.
                        </p>
                      </div>
                      <div>
                        <p className="font-bold">24시간 이내 빠른 연락</p>
                        <p className="opacity-70">
                          퇴근 후에도 연락이 가능합니다. (새벽 제외)
                        </p>
                      </div>
                      <div>
                        <p className="font-bold">간단한 양식 제출</p>
                        <p className="opacity-70">
                          우측 양식을 간단하게 적어주셔도 좋습니다.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-3xl font-bold">Points of Contact</p>
                    <div className="flex flex-col gap-y-3 pt-6">
                      <div>
                        <p className="font-bold">Address | South Korea.</p>
                        <p className="opacity-70">
                          서울특별시 도봉구 길동로 123 1층
                        </p>
                      </div>
                      <div>
                        <p className="font-bold">FAX</p>
                        <p className="opacity-70">(02)-000-0000</p>
                      </div>
                      <div>
                        <p className="font-bold">Email</p>
                        <p className="opacity-70">ymlight@gmail.com</p>
                      </div>
                      <div>
                        <p className="font-bold">페이지 관리자</p>
                        <p className="opacity-70">bkndev7@gmail.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="right flex w-[50%] flex-col items-center ">
                <div className="flex w-[80%] flex-col">
                  <p className="text-3xl font-bold ">Contact Us</p>
                  <p>
                    <span className="text-red-500">* </span>
                    <span className="opacity-70">는 필수 양식입니다.</span>
                  </p>

                  <div className="w-full pt-5">
                    <form action={dispatch}>
                      <div className="flex flex-col gap-y-5">
                        <FormInput
                          label="이름"
                          name="username"
                          type="text"
                          placeholder="홍길동"
                          error={state?.fieldErrors.username}
                          
                        />
                        <FormInput
                          label="회사이름"
                          name="company"
                          type="text"
                          placeholder=""
                          error={state?.fieldErrors.company}
                        />
                        <FormInput
                          label="연락처"
                          name="contact"
                          type="text"
                          placeholder="전화번호 또는 이메일주소"
                          error={state?.fieldErrors.contact}
                        />
                        <FormInput
                          label="연락처 재확인"
                          name="contact_confirm"
                          type="text"
                          placeholder="전화번호 또는 이메일주소"
                          error={state?.fieldErrors.contact_confirm}
                        />

                        <FormInput
                          label="내용"
                          name="content"
                          type="text"
                          placeholder="안녕하세요"
                          error={state?.fieldErrors.content}
                          textarea
                        />
                      </div>

                      <div className="pt-5">
                        <FormButton name="제출하기" />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
