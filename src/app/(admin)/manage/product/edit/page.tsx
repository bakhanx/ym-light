import db from "@/libs/db";
import React from "react";
import DateTime from "@/components/datetime";

const getProducts = async () => {
  const products = await db.product.findMany({
    select: {
      id: true,
      title: true,
      created_at: true,
      updated_at: true,
    },
  });

  return products;
};

const Edit = async () => {
  const products = await getProducts();

  return (
    <div className="flex flex-col gap-y-5 p-2 pt-20">
      <ul className="flex w-full border-b-2 border-black py-4">
        <li className="w-[5%]"></li>
        <li className="w-[5%]">ID</li>
        <li className="w-[30%]">상품명</li>
        <li className="w-[30%]">최근 업데이트</li>
        <li className="w-[30%]">게시일</li>
      </ul>
      {products.map((product) => (
        <div key={product.id} className="flex items-center border-b-2 border-black pb-4">
          <div className="w-[5%]">
            <button className="bg-slate-200 p-2">편집</button>
          </div>
          <div className="w-[5%]">{product.id}</div>
          <div className="w-[30%]">{product.title}</div>
          <div className="w-[30%]">
            <DateTime date={product.updated_at} />
          </div>
          <div className="w-[30%]">
            <DateTime date={product.created_at} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Edit;
