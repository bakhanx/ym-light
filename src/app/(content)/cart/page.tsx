"use client";

import { cls } from "@/libs/utils";
import { useState } from "react";
import Products from "./_components.tsx/products";
import Link from "next/link";
import { CheckIcon, TrashIcon } from "@heroicons/react/24/outline";

const Cart = () => {
  const [totalQuantity, setTotalQuantity] = useState(3);
  const [isSelectAllClick, setisSelectAllClick] = useState(true);

  const handleSelectAllClick = () => {
    setisSelectAllClick((prev) => !prev);
  };

  return (
    <>
      <div className="wrapper">
        {/* Header */}
        <div className="divide-y-[1px] shadow-xl">
          {/* title  */}
          <div className="flex items-center divide-x-[1px] py-5 sm:flex-col sm:items-stretch sm:divide-y-[1px] sm:py-0">
            <div className="sm:py-5">
              <div className="inner-content px-4 lg:max-w-screen-lg lg:px-0 xl:max-w-screen-xl">
                <span className="text-xl font-bold sm:text-2xl md:text-3xl">
                  장바구니
                </span>
              </div>
            </div>

            {/* total Qunatity */}
            <div className="sm:py-5">
              <div className="inner-content px-4 lg:max-w-screen-lg lg:px-0 xl:max-w-screen-xl">
                <div className="flex gap-x-1 font-bold">
                  <span className="text-base sm:text-lg md:text-xl">전체</span>
                  <div className="flex h-5 w-5 items-center justify-center rounded-md bg-amber-200 p-3 text-lg">
                    <span> {totalQuantity}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* check all */}
          <div className=" py-5 text-sm">
            <div className="inner-content px-4 lg:max-w-screen-lg lg:px-0 xl:max-w-screen-xl">
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
                    <CheckIcon className="h-3 w-3 stroke-[3px] " />

                    <span>전체선택</span>
                  </button>
                </div>
                <div className="px-2">
                  <button className="flex items-center rounded-md border-2 p-1 text-gray-600">
                    <span>
                      <TrashIcon className="h-4 w-4" />
                    </span>
                    <span>선택삭제</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* contents */}
        <div className="bg-gray-200 py-4 sm:py-10 ">
          <div className="m-auto max-w-screen-lg rounded-md px-4 shadow-xl lg:px-0 xl:max-w-screen-xl">
            {/* header */}
            <div>
              <div className="hidden border-b border-t-2 border-t-black bg-white p-2 text-center font-bold sm:flex sm:p-4">
                <button
                  className={cls(
                    isSelectAllClick
                      ? "border-amber-400 bg-amber-400 text-white"
                      : " border-amber-400 text-gray-400 ",
                    "absolute flex items-center gap-x-1 rounded-md border-2 p-1",
                  )}
                  onClick={handleSelectAllClick}
                >
                  <CheckIcon className="h-3 w-3 stroke-[3px] " />
                </button>

                <div className="hidden w-full sm:flex">
                  <span className="w-[70%]">상품정보</span>
                  <span className="w-[15%] ">상품금액</span>
                  <span className="w-[15%] ">배송비</span>
                </div>
              </div>
            </div>
            {/* products */}
            {Array(totalQuantity)
              .fill(0)
              .map((e, index) => (
                <div
                  key={index}
                  className="my-4 rounded-md border-b-[1px] border-gray-300 bg-white"
                >
                  <Products />
                </div>
              ))}

            {/* Total */}
            <div className="flex rounded-md border-4 border-amber-300 bg-white sm:px-4 px-2 py-6 shadow-md sm:flex-row flex-col justify-center items-center">
              <div className="flex sm:w-[70%] items-center justify-between lg:justify-center sm:gap-x-4 gap-x-1 sm:border-r md:gap-x-8 lg:gap-x-16 w-full px-4">
                <div className="flex flex-col text-sm md:text-base">
                  <span className="text-center text-gray-400">상품금액</span>
                  <span className="font-bold">33,000,000원</span>
                </div>
                <div>
                  <span className="text-2xl lg:text-4xl ">-</span>
                </div>
                <div className="flex flex-col text-sm md:text-base">
                  <span className="text-center text-gray-400">할인금액</span>
                  <span className="font-bold text-red-500">3,200,000원</span>
                </div>

                <div>
                  <span className="text-2xl lg:text-4xl ">+</span>
                </div>

                <div className="flex flex-col text-sm md:text-base">
                  <span className="text-center text-gray-400">배송비</span>
                  <span className="font-bold text-green-500">7,000원</span>
                </div>
              </div>


              <div className="flex sm:pt-0 mt-4 sm:w-[30%] w-full flex-col lg:items-center items-end justify-end pr-4 lg:pr-0 sm:mt-0">
                <span className="font-bold text-gray-600">총 금액</span>
                <span className="text-xl font-bold  text-blue-500 md:text-2xl">
                  28,507,000원
                </span>
              </div>
            </div>

            <div className="flex justify-center gap-x-10 py-5">
              <button className="rounded-md border border-amber-500 p-5 font-bold text-amber-500 shadow-md  sm:p-5 sm:px-16 px-8 sm:text-xl w-1/2 sm:w-auto">
                돌아가기
              </button>
              <button className="rounded-md bg-amber-500 p-5 font-bold text-white shadow-md sm:p-5 sm:px-16 px-8 sm:text-xl w-1/2 sm:w-auto">
                주문하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
