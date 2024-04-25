"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";


const Product = () => {
  const pathName = usePathname();

  return (
    <div className="pt-20">
      <div>상품관리페이지</div>
      <button className="boerder-sm border border-blue-500 p-2">
        <Link href={`${pathName}/upload`}>업로드</Link>
      </button>
    </div>
  );
};

export default Product;
