import { revalidatePath, revalidateTag } from "next/cache";
import Link from "next/link";

import React from "react";

const revalidateProducts = async () => {
  "use server";
  revalidateTag("product");
  alert("갱신 완료");
};

const navLinks = [
  { key: "upload", name: "업로드", href: "product/upload" },
  { key: "edit", name: "상품수정", href: "product/edit" },
];

const Product = () => {
  return (
    <div className="mx-auto h-screen max-w-screen-xl pt-28">
      <div>상품관리페이지</div>

      <div className="flex flex-col items-center gap-y-8 pt-10 sm:gap-x-8 md:flex-row [&>button]:w-40 ">
        {navLinks.map((navLink) => (
          <Link
            href={navLink.href}
            key={navLink.key}
            className="border-sm w-40 border border-blue-500 p-4 text-center hover:bg-blue-200"
          >
            {navLink.name}
          </Link>
        ))}

        <form action={revalidateProducts}>
          <button className="boerder-sm w-40 border border-blue-500 bg-amber-200 p-4 hover:bg-amber-300">
            상품 정보 갱신
          </button>
        </form>
      </div>
    </div>
  );
};

export default Product;
