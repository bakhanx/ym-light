import { PhotoIcon } from "@heroicons/react/16/solid";
import { notFound } from "next/navigation";
import { unstable_cache as nextCache } from "next/cache";
import React from "react";
import db from "@/libs/db";
import BackButton from "@/app/(home)/_components/backButton";
import Image from "next/image";
import Link from "next/link";

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
      <div className="absolute flex h-[75%] w-[75%] flex-col items-center justify-center bg-black bg-opacity-60">
        <div className="flex h-full w-full items-center justify-center">
          <BackButton />
          <div className="flex h-full p-10  w-full max-w-screen-sm justify-center gap-x-5">

            <div className="relative  flex aspect-square  items-center justify-center rounded-md bg-neutral-700 text-neutral-200">
              {product.photo ? (
                <Image
                  src={`${product.photo}/sharpen=1,fit=scale-down,w=640`}
                  alt="product"
                  fill
                />
              ) : (
                <PhotoIcon className="h-28" />
              )}
            </div>

            <div className="flex flex-col justify-between text-white">
              <ul>
                <li>상품명 : {product.title}</li>
                <li>가격 : {product.price}</li>
              </ul>

              <Link href={`/products/${product.id}`} >
                <div className="rounded-md border-2 border-amber-400 p-2  text-center ">
                  자세히 보기
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
