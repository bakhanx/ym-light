import db from "@/libs/db";
import React from "react";
import DateTime from "@/components/datetime";
import Link from "next/link";
import Image from "next/image";
import DeleteForm from "@/app/(admin)/_components/deleteForm";
import { deleteProduct } from "./actions";

const getProducts = async () => {
  const products = await db.product.findMany({
    select: {
      id: true,
      title: true,
      photo: true,
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
      <ul className="flex w-full gap-x-6 border-b-2 border-black py-4">
        <li className="w-[5%]"></li>
        <li className="w-[2%] text-center">ID</li>
        <li className="w-[5%] text-center">사진</li>
        <li className="w-[30%]">상품명</li>
        <li className="w-[20%]">최근 업데이트</li>
        <li className="w-[20%]">게시일</li>
      </ul>
      {products.map((product) => (
        <div
          key={product.id}
          className="flex items-center gap-x-6 border-b-2 border-black pb-4"
        >
          <div className="flex w-[10%] gap-x-2">
            <Link href={`edit/${product.id}`}>
              <button className="bg-slate-200 p-2">편집</button>
            </Link>
            <DeleteForm id={product.id} action={deleteProduct} />
          </div>
          <div className="w-[2%] text-center">{product.id}</div>
          <div className="relative aspect-square w-[5%]">
            <Image
              fill
              alt={String(product.id)}
              src={`${product.photo}/thumbnail`}
            />
          </div>
          <div className="w-[30%]">{product.title}</div>
          <div className="w-[20%]">
            <DateTime date={product.updated_at} />
          </div>
          <div className="w-[20%]">
            <DateTime date={product.created_at} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Edit;
