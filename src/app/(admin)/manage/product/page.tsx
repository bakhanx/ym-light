import { revalidatePath, revalidateTag } from "next/cache";
import Link from "next/link";

import React from "react";

const revalidateProducts = async () => {
  "use server";
  revalidateTag("product");
};

const Product = () => {
  return (
    <div className="mx-auto h-[60vh] max-w-screen-2xl pt-10">
      <div>상품관리페이지</div>

      <div className="flex flex-col items-center gap-y-8 p-10  sm:gap-x-8 md:flex-row [&>button]:w-40 ">
        <button className="boerder-sm border border-blue-500 p-4">
          <Link href={`product/upload`}>업로드</Link>
        </button>
        <button className="boerder-sm border border-blue-500 p-4">
          <Link href={`product/edit`}>상품수정</Link>
        </button>

        <form action={revalidateProducts}>
          <button className="boerder-sm w-40 border border-blue-500  p-4">
            상품 정보 갱신
          </button>
        </form>
      </div>
    </div>
  );
};

export default Product;
