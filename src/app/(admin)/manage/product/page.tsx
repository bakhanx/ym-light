import { revalidatePath, revalidateTag } from "next/cache";
import Link from "next/link";

import React from "react";

const revalidateProducts = async () => {
  "use server";
  revalidateTag("product");
};

const Product = () => {
  return (
    <div className="pt-20 ">
      <div>상품관리페이지</div>

      <div className="flex gap-x-5 p-10">
        <button className="boerder-sm border border-blue-500 p-2">
          <Link href={`product/upload`}>업로드</Link>
        </button>
        <button className="boerder-sm border border-blue-500 p-2">
          <Link href={`product/edit`}>상품수정</Link>
        </button>
        <form action={revalidateProducts}>
          <button className="boerder-sm border border-blue-500 p-2">
            상품 정보 갱신
          </button>
        </form>

      </div>
    </div>
  );
};

export default Product;
