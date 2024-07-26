"use client";

import { formatOfPrice } from "@/libs/utils";
import {
  HeartIcon,
  ShoppingBagIcon,
  TruckIcon,
} from "@heroicons/react/16/solid";
import React, { useState } from "react";
import Options from "./options";
import ProductInfo from "./productInfo";
import Image from "next/image";
import { ProductWithOptions, useCartStore } from "@/store/useCartStore";
import { Option } from "@prisma/client";

const ProductContents = ({ product }: ProductWithOptions) => {
  const { addToCart, quantity } = useCartStore((state) => state);
  const [selectedOptionList, setSelectedOptionList] = useState<Option[]>([]);
  const parentFunc = (item: Option[]) => {
    setSelectedOptionList(item);
  };

  const handleAddToCart = () => {};

  return (
    <div className="my-column_bind flex flex-col divide-y-2 divide-slate-300 sm:flex-row sm:divide-x-2 sm:divide-y-0">
      {/* left */}
      <div className="my-column-left pb-4 sm:w-[50%] sm:pr-10 ">
        <div className="my-column-box">
          <div className="my-banner-image ">
            <div className="relative aspect-square w-full bg-slate-500">
              <Image
                src={`${product.photo}/sharpen=1,fit=scale-down,w=640`}
                fill
                alt="temp"
                objectFit="cover"
              />
            </div>
          </div>
          <div className="my-banner-func pt-5">
            <div className="h-16 w-full border-2">이미지 슬라이드</div>
          </div>
        </div>
      </div>

      {/* right */}
      <div className="my-column-right pt-4 sm:w-[50%] sm:pl-10">
        <div className="my-column-box">
          {/* Info */}
          <div className="my-product-info">
            <div className="">
              <div className="text-xl font-semibold sm:text-3xl">
                {product.title}
              </div>

              <div className="gap-x-2 pt-5 font-semibold">
                {product?.discount && (
                  <div className="flex gap-x-2">
                    <span className="text-lg text-red-600 sm:text-xl">
                      {product?.discount}%
                    </span>

                    <span className="text-sm text-yellow-500 line-through opacity-60 sm:text-base ">
                      {formatOfPrice(product?.price)}원
                    </span>
                  </div>
                )}

                <span className="text-lg sm:text-2xl">
                  {product?.discount
                    ? formatOfPrice(
                        product?.price * ((100 - product.discount) / 100),
                      )
                    : formatOfPrice(product?.price)}
                  원
                </span>
              </div>

              <div className="flex flex-col gap-y-2 pt-8 text-sm sm:pt-10 sm:text-base">
                <ProductInfo label="배송비" data={"무료배송"} />
                <ProductInfo label="색상" data={product?.color} />
                <ProductInfo label="재질" data={product?.material} />
                <ProductInfo label="사이즈" data={product?.size} />
                <ProductInfo label="전구" data={product?.bulb} />
                <ProductInfo label="제조사" data={product?.manufacturer} />
                <ProductInfo label="설명" data={product?.description} />
              </div>
            </div>
          </div>

          {/* Option */}

          {product.options.length > 0 ? (
            <Options
              options={product.options}
              price={product.price}
              discount={product.discount}
              parentFunc={parentFunc}
            />
          ) : (
            <div className="flex items-end justify-end gap-x-5 py-5 pt-16">
              <div className="text-gray-500">총 금액</div>
              <span className="w-36 text-right text-xl font-bold">
                <span className="text-lg sm:text-2xl">
                  {product?.discount
                    ? formatOfPrice(
                        product?.price * ((100 - product.discount) / 100),
                      )
                    : formatOfPrice(product?.price)}
                  원
                </span>
              </span>
            </div>
          )}

          {/* 구매 장바구니 찜 버튼 */}
          <div className="my-btn-wrap flex flex-col gap-y-5 pt-5 text-sm font-bold text-white sm:text-base">
            <button className="flex w-full items-center justify-center gap-x-1 rounded-md bg-amber-500 p-4 hover:bg-amber-600 sm:p-5">
              <TruckIcon className="h-5 w-5 sm:h-7 sm:w-7 " />
              구매하기
            </button>
            <div className="flex gap-x-4">
              <button
                onClick={() => addToCart({ product, selectedOptionList })}
                className="flex w-full items-center justify-center gap-x-1 rounded-md bg-blue-500 p-4 hover:bg-blue-600 sm:p-5"
              >
                <ShoppingBagIcon className="h-4 w-4 stroke-2 sm:h-5 sm:w-5" />
                <span>장바구니</span>
              </button>
              <button className="flex w-full items-center justify-center gap-x-1 rounded-md bg-red-600 p-4 hover:bg-red-700 sm:p-5">
                <HeartIcon className="h-4 w-4 stroke-2 sm:h-5 sm:w-5" />
                찜하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductContents;
