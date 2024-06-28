import { cls } from "@/libs/utils";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

const Products = () => {
  const [isSelectAllClick, setisSelectAllClick] = useState(true);

  const handleSelectAllClick = () => {
    setisSelectAllClick((prev) => !prev);
  };

  return (
    <div className="flex flex-col px-2 py-4 sm:px-4">
      <div className="flex w-full flex-col justify-center lg:flex-row lg:divide-x-[1px]">
        <div className="relative flex flex-col p-2 sm:p-10 lg:w-[70%]">
          <div className="flex">
            <button
              className={cls(
                isSelectAllClick
                  ? "border-amber-400 bg-amber-400 text-white"
                  : " border-amber-400 text-gray-400 ",
                "absolute left-0 flex items-center gap-x-1 rounded-md border-2 p-1",
              )}
              onClick={handleSelectAllClick}
            >
              <CheckIcon className="h-3 w-3 stroke-2" />
            </button>

            {/* Image */}
            <div className="relative pl-8 sm:pl-0">
              <div className="h-20 w-20 bg-slate-500"></div>
            </div>

            {/* Content */}
            <div className="flex w-full flex-col px-5 sm:px-10">
              <strong className="flex flex-col gap-y-2">
                <p>메가 크리스탈 라이트</p>
                <p className="flex flex-col gap-x-2 text-sm sm:text-base">
                  <span className="text-xs text-red-500 line-through sm:text-base">
                    3,200,000원
                  </span>
                  <span>1,920,000원</span>
                </p>
              </strong>
            </div>
          </div>

          {/* Option */}
          <ul className="mt-4 flex flex-col gap-y-4 bg-gray-50 p-2 text-sm text-gray-600 sm:text-base [&>li]:border-b-[1px] [&>li]:py-2">
            <li className="">
              <div className="flex justify-between">
                <span>01. 색상 : 화이트 / 1개</span>
                <div className="flex items-center gap-x-2">
                  <button className=" text-gray-400">
                    <XMarkIcon className="h-4 w-4 stroke-2" />
                  </button>
                </div>
              </div>
            </li>
            <li>
              <div className="flex justify-between">
                <span>02. 색상 : 블랙 / 1개</span>
                <div className="flex items-center gap-x-2">
                  <span> ( +1,132,000원 )</span>
                  <button className=" text-gray-400">
                    <XMarkIcon className="h-4 w-4 stroke-2" />
                  </button>
                </div>
              </div>
            </li>
          </ul>

          {/* Delete Button */}
          <button className="absolute right-0 text-gray-400 sm:right-6">
            <XMarkIcon className="h-6 w-6 stroke-2" />
          </button>
        </div>

        {/* Price */}
        <div className="text-sm sm:text-base lg:flex lg:w-[30%] lg:justify-center lg:divide-x-[1px]">
          <div className="flex items-center justify-between gap-x-5 px-4 sm:px-20 lg:w-1/2 lg:justify-center lg:p-5  ">
            <span className="text-gray-500 lg:hidden">선택상품금액</span>
            <span>6,400,000원</span>
          </div>

          <div className="flex items-center justify-between gap-x-5 px-4 sm:px-20 lg:w-1/2 lg:justify-center lg:p-5 ">
            <span className="text-gray-500 lg:hidden">총 배송비</span>
            <span>7,000원</span>
          </div>
        </div>
      </div>

      {/* Total Price */}
      <div className="w-full items-center justify-center lg:border-t lg:py-5 lg:flex">
        <div className="hidden items-center gap-x-20 lg:flex">
          <div className="flex flex-col">
            <span>선택상품금액</span>
            <span className="font-bold">6,400,000원</span>
          </div>
          <div className="">+</div>
          <div className="flex flex-col">
            <span>총 배송비</span>
            <span className="font-bold">7,000원</span>
          </div>
          <div className="font-bold">-</div>
        </div>

        <div className="flex items-center justify-between gap-x-5 px-4 sm:px-20 lg:flex-col  lg:justify-center text-sm sm:text-base">
          <span className="text-red-500 lg:text-black">할인금액</span>
          <span className="text-red-500 font-bold">- 2,560,000원</span>
        </div>

        <div className="hidden lg:block">=</div>
        <div className="flex items-center justify-between gap-x-5 px-4 sm:px-20   lg:flex-col lg:justify-center ">
          <span className="font-bold">주문금액</span>
          <span className="font-bold text-amber-500">3,847,000원</span>
        </div>
      </div>
    </div>
  );
};

export default Products;
