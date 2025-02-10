"use client";

import React, { useMemo } from "react";
import contactImg from "/public/images/contact.jpg";
import Image from "next/image";
import FormInput from "@/components/form-input";
import FormButton from "@/components/form-button";
import { useFormState } from "react-dom";
import { handleForm } from "./handlers/handleForm";
import { BLUR_DATA_CONTACT } from "../../../../public/images/base64/blur_contact";

const InfoBlock = ({ title, desc }: { title: string; desc: string }) => (
  <div>
    <p className="font-bold">{title}</p>
    <p className="text-sm opacity-70">{desc}</p>
  </div>
);

const Contact = () => {
  const [state, dispatch] = useFormState(handleForm, null);

  const formInputs = [
    {
      label: "이름",
      name: "username",
      type: "text",
      placeholder: "홍길동",
      required: true,
      minLength: 2,
      maxLength: 30,
    },
    {
      label: "회사이름",
      name: "company",
      type: "text",
      placeholder: "",
      minLength: 1,
      maxLength: 30,
    },
    {
      label: "연락처",
      name: "contact",
      type: "text",
      placeholder: "번호 또는 이메일",
      required: true,
    },
    {
      label: "연락처 재확인",
      name: "contact_confirm",
      type: "text",
      placeholder: "번호 또는 이메일",
      required: true,
      minLength: 6,
      maxLength: 30,
    },
    {
      label: "내용",
      name: "content",
      type: "text",
      placeholder: "안녕하세요",
      required: true,
      textarea: true,
      minLength: 1,
      maxLength: 1000,
    },
  ];

  return (
    <>
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
                sizes="1"
                className="object-cover"
              />
              <div className="h-full w-full bg-black opacity-80" />
            </div>
          </div>

          <div className="Content-Wrap mx-auto flex max-w-screen-xl items-center px-2 pb-12 pt-24 sm:px-4 sm:pt-28 xl:px-0 ">
            <div className="z-20 flex w-full gap-x-4 pt-8 text-white  ">
              <div className="left flex w-[50%] flex-col items-center">
                <div className="flex flex-col gap-y-10">
                  <section>
                    <h2 className="text-xl font-bold sm:text-3xl">
                      Ask how we can help you
                    </h2>
                    <div className="flex flex-col gap-y-10 pt-6">
                      <InfoBlock
                        title="부담없는 1:1 친절 상담"
                        desc="오직 사장님과 다이렉트로 상담이 이루어집니다."
                      />
                      <InfoBlock
                        title="24시간 이내 빠른 연락"
                        desc="퇴근 후에도 연락이 가능합니다. (새벽 제외)"
                      />
                      <InfoBlock
                        title="간단한 양식 제출"
                        desc="우측 양식을 간단하게 적어주셔도 좋습니다."
                      />
                    </div>
                  </section>

                  <section>
                    <h2 className="text-xl font-bold sm:text-3xl">
                      Points of Contact
                    </h2>
                    <div className="flex flex-col gap-y-3 pt-6">
                      <InfoBlock
                        title="Address | South Korea."
                        desc="서울특별시 도봉구 길동로 123 1층"
                      />
                      <InfoBlock title="FAX" desc="(02)-000-0000" />
                      <InfoBlock title="Email" desc="ymlight@gmail.com" />
                      <InfoBlock
                        title="페이지 관리자"
                        desc="bkndev7@gmail.com"
                      />
                    </div>
                  </section>
                </div>
              </div>

              <div className="right flex w-[50%] flex-col items-center ">
                <div className="flex w-full flex-col sm:w-[80%]">
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
                        {formInputs.map(({ label, name, ...props }) => (
                          <FormInput
                            key={name}
                            label={label}
                            name={name}
                            error={
                              state?.fieldErrors?.[
                                name as keyof typeof state.fieldErrors
                              ]
                            }
                            {...props}
                          />
                        ))}
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
