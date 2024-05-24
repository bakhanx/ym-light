"use client";

import Link from "next/link";
import React from "react";

const Manage = () => {
  return (
    <div className="pt-20">
      <div className="flex gap-x-2 p-10">
        <button className="boerder-sm border border-blue-500 p-2">
          <Link href={`/manage/product`}>상품관리</Link>
        </button>
        <button className="boerder-sm border border-blue-500 p-2">
          <Link href={`/manage/gallery`}>갤러리관리</Link>
        </button>
        <button className="boerder-sm border border-blue-500 p-2">
          소개관리
        </button>
        <button className="boerder-sm border border-blue-500 p-2">
          연락관리
        </button>
        <button className="boerder-sm border border-blue-500 p-2">
          FAQ관리
        </button>
      </div>
    </div>
  );
};

export default Manage;
