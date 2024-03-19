import { cls } from "@/libs/utils";
import React, { useState } from "react";

const Products = () => {
  const [isSelectAllClick, setisSelectAllClick] = useState(true);

  const handleSelectAllClick = () => {
    setisSelectAllClick((prev) => !prev);
  };
  
  return (
    <div className="flex relative pl-4">
      <button
        className={cls(
          isSelectAllClick
            ? "border-amber-400 bg-amber-400 text-white"
            : " border-amber-400 text-gray-400 ",
          "absolute flex items-center gap-x-1 rounded-md border-2 p-1 top-10",
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
        <div className="flex w-[848px] p-10">
          <div className="relative">
            <div className="h-20 w-20 bg-slate-500"></div>
          </div>
          <div className="flex flex-col px-10 ">
            <strong>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab earum
              quos, illum unde eos, illum unde eos, illum unde eos, illum unde
              eos
            </strong>
            <ul className="flex flex-col gap-y-4 pt-2 text-gray-500 [&>li]:border-b-[1px] [&>li]:py-2">
              <li>01. This is a option.</li>
              <li>02. This is a option.</li>
            </ul>
          </div>
        </div>

        <div className="flex w-[200px] items-center justify-center p-5">
          <span>350,000원</span>
        </div>

        <div className="flex w-[200px] items-center justify-center p-10">
          <span>7,000원</span>
        </div>
      </div>
    </div>
  );
};

export default Products;
