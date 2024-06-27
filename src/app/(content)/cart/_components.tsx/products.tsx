import { cls } from "@/libs/utils";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

const Products = () => {
  const [isSelectAllClick, setisSelectAllClick] = useState(true);

  const handleSelectAllClick = () => {
    setisSelectAllClick((prev) => !prev);
  };

  return (
    <div className="flex px-4 py-4">
      <div className="flex lg:flex-row flex-col w-full justify-center lg:divide-x-[1px]">
        <div className="relative flex lg:w-[70%] p-10">
          <button
            className={cls(
              isSelectAllClick
                ? "border-amber-400 bg-amber-400 text-white"
                : " border-amber-400 text-gray-400 ",
              "absolute left-0 top-10 flex items-center gap-x-1 rounded-md border-2 p-1",
            )}
            onClick={handleSelectAllClick}
          >
            <CheckIcon className="h-3 w-3 stroke-2" />
          </button>

          <div className="relative">
            <div className="h-20 w-20 bg-slate-500"></div>
          </div>

          <div className="flex w-full flex-col px-10">
            <strong className="flex flex-col gap-y-2">
              <p>메가 크리스탈 라이트</p>
              <p className="flex gap-x-2">
                <span>1,920,000원</span>
                <span className="text-red-500 line-through">3,200,000원</span>
              </p>
            </strong>

            <ul className="flex flex-col gap-y-4 pt-2 text-gray-500 [&>li]:border-b-[1px] [&>li]:py-2 [&>li]:text-sm">
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
          </div>

          <button className="absolute right-6 text-gray-400">
            <XMarkIcon className="h-6 w-6 stroke-2" />
          </button>
        </div>


        <div className="flex lg:w-[15%] items-center lg:justify-center justify-between lg:p-5 px-20 gap-x-5 lg:pr-0">
          <span className="lg:hidden">주문금액</span>
          <span>350,000원</span>
        </div>

        <div className="flex lg:w-[15%] items-center lg:justify-center justify-between lg:p-5 gap-x-5 px-20 lg:pr-0">
          <span className="lg:hidden">총 배송비</span>
          <span>7,000원</span>
        </div>
      </div>
    </div>
  );
};

export default Products;
