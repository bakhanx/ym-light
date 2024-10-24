"use client";

import React, { useEffect } from "react";
import contactImg from "/public/images/contact.jpg";
import Image from "next/image";
import FormInput from "@/components/form-input";
import FormButton from "@/components/form-button";
import { useFormState } from "react-dom";
import { handleForm } from "./handlers/handleForm";
import { BLUR_DATA_CONTACT } from "../../../../public/images/base64/blur_contact";

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

  return (
    <>
      {/* Issue: items-center와 screen-h에 따른 pt 충돌 */}
      <div className="bg-black">
        <div className="Image-Wrap h-full w-full sm:h-screen">
          <div className="absolute h-full w-full">
            <div className="relative h-full w-full">
              <Image
                src={contactImg}
                alt="contact"
                fill
                placeholder="blur"
                blurDataURL={BLUR_DATA_CONTACT}
                objectFit="cover"
              />
              <div className="h-full w-full bg-black opacity-80" />
            </div>
          </div>

          <div className="Content-Wrap h-f mx-auto flex max-w-screen-xl items-center pb-12 pt-32">
            <div className="z-20 flex w-full px-5 pt-8 text-white sm:px-20">
              <div className="left flex w-[50%] flex-col items-center">
                <div className="flex flex-col gap-y-10">
                  <div>
                    <p className="text-xl font-bold sm:text-3xl">
                      Ask how we can help you
                    </p>
                    <div className="flex flex-col gap-y-10 pt-6">
                      <div>
                        <p className="font-bold">부담없는 1:1 친절 상담</p>
                        <p className="text-sm opacity-70">
                          오직 사장님과 다이렉트로 상담이 이루어집니다.
                        </p>
                      </div>
                      <div>
                        <p className="font-bold">24시간 이내 빠른 연락</p>
                        <p className="text-sm opacity-70">
                          퇴근 후에도 연락이 가능합니다. (새벽 제외)
                        </p>
                      </div>
                      <div>
                        <p className="font-bold">간단한 양식 제출</p>
                        <p className="text-sm opacity-70">
                          우측 양식을 간단하게 적어주셔도 좋습니다.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xl font-bold sm:text-3xl">
                      Points of Contact
                    </p>
                    <div className="flex flex-col gap-y-3 pt-6">
                      <div>
                        <p className="font-bold">Address | South Korea.</p>
                        <p className="text-sm opacity-70">
                          서울특별시 도봉구 길동로 123 1층
                        </p>
                      </div>
                      <div>
                        <p className="font-bold">FAX</p>
                        <p className="text-sm opacity-70">(02)-000-0000</p>
                      </div>
                      <div>
                        <p className="font-bold">Email</p>
                        <p className="text-sm opacity-70">ymlight@gmail.com</p>
                      </div>
                      <div>
                        <p className="font-bold">페이지 관리자</p>
                        <p className="text-sm opacity-70">bkndev7@gmail.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="right flex w-[50%] flex-col items-center ">
                <div className="flex w-[80%] flex-col">
                  <p className="text-xl font-bold sm:text-3xl ">Contact Us</p>
                  <p>
                    <span className="text-red-500">* </span>
                    <span className="text-sm opacity-70">
                      는 필수 양식입니다.
                    </span>
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
                          required
                          minLength={2}
                          maxLength={30}
                        />
                        <FormInput
                          label="회사이름"
                          name="company"
                          type="text"
                          placeholder=""
                          error={state?.fieldErrors.company}
                          minLength={1}
                          maxLength={30}
                        />
                        <FormInput
                          label="연락처"
                          name="contact"
                          type="text"
                          placeholder="전화번호 또는 이메일주소"
                          error={state?.fieldErrors.contact}
                          required
                        />
                        <FormInput
                          label="연락처 재확인"
                          name="contact_confirm"
                          type="text"
                          placeholder="전화번호 또는 이메일주소"
                          error={state?.fieldErrors.contact_confirm}
                          required
                          minLength={6}
                          maxLength={30}
                        />
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
