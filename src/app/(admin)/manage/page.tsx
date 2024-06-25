"use client";

import Link from "next/link";
import React from "react";

const Manage = () => {
  return (
    <div className="sm:h-[60vh] max-w-screen-2xl mx-auto">
      <div className="flex sm:gap-x-8 gap-y-8 p-10 flex-col  md:flex-row items-center [&>button]:w-40 ">
        <button className="boerder-sm border border-blue-500 p-4">
          <Link href={`/manage/product`}>상품관리</Link>
        </button>
        <button className="boerder-sm border border-blue-500 p-4">
          <Link href={`/manage/gallery`}>갤러리관리</Link>
        </button>
        <button className="boerder-sm border border-blue-500 p-4 cursor-not-allowed text-gray-300">
          소개관리
        </button>
        <button className="boerder-sm border border-blue-500 p-4 cursor-not-allowed text-gray-300">
          연락관리
        </button>
        <button className="boerder-sm border border-blue-500 p-4 cursor-not-allowed text-gray-300">
          FAQ관리
        </button>
      </div>
    </div>
  );
};

export default Manage;
