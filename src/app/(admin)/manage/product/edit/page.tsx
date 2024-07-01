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
    <div className="m-auto flex max-w-screen-2xl flex-col gap-y-5 p-4 text-sm md:text-base lg:px-20">
      {/* Header */}
      <div className="hidden w-full gap-x-6 border-b-2 border-black py-4 sm:flex">
        <ul className="flex w-[10%] gap-x-2">
          <li className="w-[80%] "></li>
          <li className="w-[20%] text-center">ID</li>
        </ul>

        <ul className="flex w-[90%] md:gap-x-8 gap-x-2">
          <li className="w-[10%] text-center">사진</li>
          <ul className="flex w-full">
            <li className="w-[50%] ">상품명</li>
            <li className="w-[25%]">최근 수정일</li>
            <li className="w-[25%]">등록일</li>
          </ul>
        </ul>
      </div>

      {/* Product List */}
      {products.map((product) => (
        <div
          key={product.id}
          className="flex flex-col gap-x-6 border-b-2 border-black pb-4 sm:flex-row"
        >
          <div className="flex flex-row-reverse  gap-x-2 md:w-[10%] sm:flex-row sm:justify-normal sm:items-center">
            <div className="flex w-[80%] flex-row justify-end gap-x-2 gap-y-1 sm:flex-col sm:items-center sm:justify-normal">
              <Link href={`edit/${product.id}`}>
                <button className="bg-slate-200 p-2">편집</button>
              </Link>
              <DeleteForm id={product.id} action={deleteProduct} />
            </div>

            <div className="w-[20%] sm:text-center sm:flex ">{product.id}</div>
          </div>

          <div className="flex w-full gap-x-2 sm:w-[90%]  md:gap-x-8 sm:items-center pt-4 sm:pt-0">
            <div className="relative aspect-square w-[30%] sm:w-[10%]">
              <Image
                fill
                alt={String(product.id)}
                src={`${product.photo}/thumbnail`}
              />
            </div>

            <ul className="flex w-full flex-col sm:flex-row items-center justify-center">
              <li className=" pb-4 font-bold sm:w-[50%] sm:pb-0 sm:font-normal">
                {product.title}
              </li>
              <li className="text-xs sm:w-[25%] md:text-base">
                <span className="sm:hidden text-gray-600">(최근 수정일) </span>
                <DateTime date={product.updated_at} />
              </li>
              <li className="text-xs sm:w-[25%] md:text-base">
                <span className="sm:hidden text-gray-600">(등록일) </span>
                <DateTime date={product.created_at} />
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Edit;
