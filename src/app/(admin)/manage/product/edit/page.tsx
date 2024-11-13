import db from "@/utils/db";
import React from "react";

import Link from "next/link";
import Image from "next/image";
import DeleteForm from "@/app/(admin)/_components/deleteForm";
import { deleteProduct } from "../actions/deleteProduct";
import { formatPrice } from "@/utils/formatPrice";
import { formatDate } from "@/utils/formatDate";

const getProducts = async () => {
  const products = await db.product.findMany({
    select: {
      id: true,
      title: true,
      photos: true,
      price: true,
      discount: true,
      created_at: true,
      updated_at: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  return products;
};
const Edit = async () => {
  const products = await getProducts();

  return (
    <div className="m-auto h-screen flex max-w-screen-xl flex-col gap-y-5 pt-24 text-sm md:text-base xl:px-0 px-2">
      {/* Header */}
      <div className="hidden w-full gap-x-6 border-b-2 border-black py-4 sm:flex">
        <ul className="flex w-[10%] gap-x-2">
          <li className="w-[80%] "></li>
          <li className="w-[20%] text-center">ID</li>
        </ul>

        <ul className="flex w-[90%] gap-x-2 md:gap-x-8">
          <li className="w-[10%] text-center">사진</li>
          <ul className="flex w-full">
            <li className="w-[30%] ">상품명</li>
            <li className="w-[10%] ">할인율</li>
            <li className="w-[30%] ">가격</li>
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
          <div className="flex flex-row-reverse  gap-x-2 sm:flex-row sm:items-center sm:justify-normal md:w-[10%]">
            <div className="flex w-[80%] flex-row justify-end gap-x-2 gap-y-1 sm:flex-col sm:items-center sm:justify-normal">
              <Link href={`edit/${product.id}`}>
                <button className="bg-slate-200 p-2">편집</button>
              </Link>
              <DeleteForm id={product.id} action={deleteProduct} />
            </div>

            <div className="w-[20%] sm:flex sm:text-center ">{product.id}</div>
          </div>

          <div className="flex w-full gap-x-2 pt-4  sm:w-[90%] sm:items-center sm:pt-0 md:gap-x-8">
            <div className="relative aspect-square w-[30%] sm:w-[10%]">
              <Image
                fill
                alt={String(product.id)}
                src={`${product.photos[0]}/thumbnail`}
              />
            </div>

            <ul className="flex w-full flex-col items-center justify-center sm:flex-row">
              <li className=" pb-4 font-bold sm:w-[30%] sm:pb-0 sm:font-normal">
                {product.title}
              </li>
              <li className="sm:w-[10%]">
                {product.discount && `${product.discount}%`}
              </li>
              <li className="sm:w-[30%]">{formatPrice(product.price)}원</li>
              <li className="text-xs sm:w-[25%] md:text-base">
                <span className="text-gray-600 sm:hidden">(최근 수정일) </span>
                {formatDate(product.updated_at)}
              </li>
              <li className="text-xs sm:w-[25%] md:text-base">
                <span className="text-gray-600 sm:hidden">(등록일) </span>
                {formatDate(product.created_at)}
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Edit;
