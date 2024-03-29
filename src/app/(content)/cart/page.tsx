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
        <div className="bg-gray-100 py-10">
          <div className="m-auto max-w-screen-xl rounded-md bg-white shadow-xl">
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
                  <CheckIcon className="h-3 w-3 stroke-[3px] " />
                </button>
                <span className="w-[848px]">상품정보</span>
                <span className="w-[200px]">상품금액</span>
                <span className="w-[200px]">배송비</span>
              </div>
            </div>
            {/* products */}
            {Array(totalQuantity)
              .fill(0)
              .map((e, index) => (
                <div key={index} className="border-b-[1px] border-gray-300">
                  <Products />
                </div>
              ))}

            {/* Total */}
            <div className="flex border-b px-4 py-6">
              <div className="flex w-[848px] items-center justify-center gap-x-16 border-r">
                <div className="flex flex-col">
                  <span className="text-center text-gray-400">상품금액</span>
                  <span className="font-bold">33,000,000원</span>
                </div>
                <div>
                  <span className="text-4xl">-</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-center text-gray-400">할인금액</span>
                  <span className="font-bold text-red-500">3,200,000원</span>
                </div>

                <div>
                  <span className="text-4xl">+</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-center text-gray-400">배송비</span>
                  <span className="font-bold text-green-500">7,000원</span>
                </div>
              </div>

              <div className="flex w-[400px] flex-col items-center justify-center rounded-xl">
                <span className="font-bold text-gray-600">주문금액</span>
                <span className="text-2xl font-bold text-blue-500">
                  28,507,000원
                </span>
              </div>
            </div>

            <div className="flex justify-center gap-x-10 py-5">
              <button className="rounded-md border border-amber-500 p-5 px-16 text-xl  font-bold text-amber-500">
                돌아가기
              </button>
              <button className="rounded-md bg-amber-500 p-5 px-16 text-xl font-bold text-white">
                주문하기
              </button>
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="pt-20">footer</div>
      </div>
    </>
  );
};

export default Cart;
