"use client";

import { cls } from "@/libs/utils";
import { useState } from "react";

const Cart = () => {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [isSelectAllClick, setisSelectAllClick] = useState(true);

  const handleSelectAllClick = () => {
    setisSelectAllClick((prev) => !prev);
  };

  return (
    <>
      <div className="wrapper pt-20">
        {/* Header */}
        <div className="divide-y-[1px] shadow-xl">
          {/* title  */}
          <div className=" py-10">
            <div className="inner-content max-w-screen-xl ">
              <span className="text-3xl font-bold">장바구니</span>
            </div>
          </div>

          {/* total Qunatity */}
          <div className=" py-5">
            <div className="inner-content max-w-screen-xl">
              <div className="flex gap-x-1 font-bold">
                <span className="text-xl">전체</span>
                <div className="flex h-5 w-5 items-center justify-center rounded-md bg-amber-200 p-3 text-lg">
                  <span> {totalQuantity}</span>
                </div>
              </div>
            </div>
          </div>
          {/* check all */}
          <div className=" py-5 text-sm">
            <div className="inner-content max-w-screen-xl">
              <div className="flex gap-x-2 divide-x-2">
                <div className="">
                  <button
                    className={cls(
                      isSelectAllClick
                        ? "border-amber-400 bg-amber-400 text-white"
                        : " border-amber-400 ",
                      "flex items-center gap-x-1 rounded-md border-2 p-1 text-gray-600",
                    )}
                    onClick={handleSelectAllClick}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="currentColor"
                      className="h-3 w-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>

                    <span>전체선택</span>
                  </button>
                </div>
                <div className="px-2">
                  <button className="flex items-center rounded-md border-2 p-1 text-gray-600">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </span>
                    <span>선택삭제</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* contents */}
        <div className="h-full bg-gray-100 py-10">
          <div className="m-auto h-96 max-w-screen-xl rounded-md bg-white">
            {/* header */}
            <div>
              <div className="flex border-b border-t-2 border-t-black p-4 text-center font-bold">
                <button
                  className={cls(
                    isSelectAllClick
                      ? "border-amber-400 bg-amber-400 text-white"
                      : " border-amber-400 text-gray-400 ",
                    "absolute flex items-center gap-x-1 rounded-md border-2 p-1",
                  )}
                  onClick={handleSelectAllClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="h-3 w-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                </button>
                <span className="w-[848px]">상품정보</span>
                <span className="w-[200px]">상품금액</span>
                <span className="w-[200px]">배송비</span>
              </div>
            </div>
            {/* products */}
            <div>
              <div className="flex p-4">
                <button
                  className={cls(
                    isSelectAllClick
                      ? "border-amber-400 bg-amber-400 text-white"
                      : " border-amber-400 text-gray-400 ",
                    "absolute flex items-center gap-x-1 rounded-md border-2 p-1",
                  )}
                  onClick={handleSelectAllClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="h-3 w-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                </button>
                <div className="flex justify-center divide-x-[1px]">

                  <div className="flex w-[848px] pl-10">
                    <div className="relative">
                      <div className="h-20 w-20 bg-slate-500"></div>
                    </div>
                    <div className="flex flex-col px-10 ">
                      <strong>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Ab earum quos, illum unde eos, illum unde eos,
                        illum unde eos, illum unde eos
                      </strong>
                      <ul className="flex flex-col gap-y-4 pt-2 text-gray-500 [&>li]:border-b-[1px] [&>li]:py-2">
                        <li>01. This is a option.</li>
                        <li>02. This is a option.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex w-[200px] items-center justify-center ">
                    <span>350,000원</span>
                  </div>

                  <div className="flex w-[200px] items-center justify-center">
                    <span>7,000원</span>
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

export default Cart;
