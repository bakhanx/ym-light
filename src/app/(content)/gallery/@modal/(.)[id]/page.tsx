import { PhotoIcon } from "@heroicons/react/16/solid";
import { notFound } from "next/navigation";
import { unstable_cache as nextCache } from "next/cache";
import React from "react";
import db from "@/libs/db";

import Image from "next/image";
import Link from "next/link";
import EnterButton from "../_components/enterButton";
import BackButton from "../_components/backButton";

type Props = {
  params: {
    id: string;
  };
};

const getProduct = async (id: number) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      photo: true,
      price: true,
    },
  });
  return product;
};

// const getCachedProduct = nextCache(
//   (id) => getProduct(id),
//   [`product-${id}`],
//   { tags: [`product-${id}`],}
// );

const Modal = async ({ params }: Props) => {
  const product = await getProduct(Number(params.id));
  if (!product) {
    return notFound();
  }

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center">
      <div className="absolute flex h-[75%] w-[50%] flex-col  justify-center bg-slate-50 bg-opacity-50">
        <div className="flex h-full w-full items-center justify-center shadow-xl">
          <BackButton />
          <div className="flex h-full w-full max-w-screen-sm  flex-col justify-start gap-x-5">
            {/* Image */}
            <div className="relative flex h-[75%] w-full">
              {product.photo ? (
                <Image
                  src={`${product.photo}/sharpen=1,fit=scale-down,w=640`}
                  alt="product"
                  fill
                  objectFit="cover"
                />
              ) : (
                <PhotoIcon className="h-28" />
              )}
            </div>

            {/* Text */}
            <div className="flex flex-col p-2">
              <ul>
                <li>상품명 : {product.title}</li>
                <li>가격 : {product.price}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
