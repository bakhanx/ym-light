import React from "react";
import Image01 from "@/../public/images/contact01-lg.jpg";
import Image from "next/image";

const Contact = () => {
  return (
    <>
      <div className="top-wrap">
        <div className="Image-Wrap relative h-screen w-full">
          <div className="absolute z-10 h-full w-full bg-black opacity-80" />
          <Image src={Image01} alt="contact" fill objectFit="cover" />
          <div className="flex h-full items-center ">
            <div className="absolute z-20 flex w-full px-20 text-white">
              <div className="left flex w-[50%] flex-col items-center ">
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
                          우측 양식을 간단하게 적어주셔도 문제 없습니다.
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
                    <span className="opacity-70">
                    는 필수 양식입니다.
                    </span>
                  </p>
                 
                  <div className="w-full pt-5">
                    <form>
                      <div className="flex flex-col gap-y-5">
                        <div className="flex flex-col ">
                          <label htmlFor="name">
                            이름<span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            className=" p-2 text-black"
                          />
                        </div>

                        <div className="flex flex-col ">
                          <label htmlFor="name">회사이름</label>
                          <input
                            type="text"
                            name="name"
                            className=" p-2 text-black"
                          />
                        </div>

                        <div className="flex flex-col ">
                          <label htmlFor="name">
                            연락처<span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            className=" p-2 text-black"
                          />
                        </div>
                        <div className="flex flex-col ">
                          <label htmlFor="name">
                            내용<span className="text-red-500">*</span>
                          </label>
                          <textarea
                            name="content"
                            className="h-28 resize-none text-black"
                          />
                        </div>
                      </div>

                      <div className="pt-5">
                        <button className="w-full rounded-md bg-blue-500 p-4">
                          제출하기
                        </button>
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
