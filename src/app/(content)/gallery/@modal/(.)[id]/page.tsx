import { BoltIcon, PhotoIcon } from "@heroicons/react/16/solid";
import { notFound } from "next/navigation";

import React from "react";
import db from "@/libs/db";

import Image from "next/image";

import BackButton from "../_components/backButton";
import DateTime from "@/components/datetime";

type Props = {
  params: {
    id: string;
  };
};

` getGallery Schema
id
writer
title
photo
content
created_at (time ago)
isUpdated
likes
comments

link (첨부 링크)
`


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
      created_at: true,
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
      <div className="absolute flex h-[75%] w-[50%] flex-col  justify-center bg-slate-50 bg-opacity-60">
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
            <div className="flex flex-col p-3 text-sm">
              <ul>
                <li className="font-semibold flex items-center gap-x-1">
                  YM Light
                  <div className="flex h-3 w-3 items-center justify-center rounded-full bg-black">
                    <BoltIcon className="rounded-ful h-3 w-3 text-amber-300" />
                  </div>
                </li>
                <li>{product.title}</li>
                <li>가격 : {product.price}</li>
                <li>
                  <DateTime date={product.created_at} />{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
