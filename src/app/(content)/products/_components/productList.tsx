"use client";

import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BLUR_DATA_URL_GRAY } from "../../../../../public/images/base64/blur-gray-skeleton";
import { formatPrice } from "@/utils/formatPrice";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import SortButton from "./sortButton";
import { ProductListType } from "../page";

const sortOptions = [
  { value: "popularity", label: "인기순" },
  { value: "latest", label: "최신등록순" },
  { value: "lowToHigh", label: "낮은가격순" },
  { value: "highToLow", label: "높은가격순" },
  { value: "highRate", label: "할인율순" },
];

type sortType = (typeof sortOptions)[number]["value"];

const ProductList = ({ products }: { products: ProductListType[] }) => {
  const [filteredProducts, setFilterdProducts] =
    useState<ProductListType[]>(products);
  const [sortType, setSortType] = useState<sortType>("latest");

  // client측 정렬
  // useEffect(() => {
  //   let sortedProducts = [...products];
  //   switch (sortType) {
  //     case "latest":
  //       sortedProducts.sort(
  //         (a, b) =>
  //           new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  //       );
  //       break;
  //     case "popularity":
  //       sortedProducts.sort((a, b) => a.stock - b.stock);
  //       break;
  //     case "lowToHigh":
  //       sortedProducts.sort((a, b) => a.price - b.price);
  //       break;
  //     case "highToLow":
  //       sortedProducts.sort((a, b) => b.price - a.price);
  //       break;
  //     case "highRate":
  //       sortedProducts.sort((a, b) => (b.discount || 0) - (a.discount || 0));
  //     default:
  //       break;
  //   }
  //   setFilterdProducts(sortedProducts);
  // }, [sortType, products]);
  return (
    <>


      <div className="grid grid-cols-2 gap-5 pt-10 sm:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`products/${product.id}`}
            className="rounded-md"
          >
            <div className="flex flex-col text-sm md:text-base">
              <div className="">
                <div className="relative aspect-square w-full overflow-hidden rounded-t-md border-[1px] border-white">
                  <Image
                    alt={product.title}
                    src={`${product.photos[0]}/sharpen=1,fit=scale-down,w=640`}
                    fill
                    sizes="1"
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL_GRAY}
                  />
                </div>
                <div className="flex h-28 flex-col justify-between border-2 p-2">
                  <p className="h-14">{product.title}</p>
                  <div className="">
                    {product.discount ? (
                      <>
                        <div className="text-xs text-gray-500 line-through md:text-sm">
                          {formatPrice(product.price)}원
                        </div>
                        <div className="flex gap-x-2">
                          <span className="font-bold text-red-600">
                            {product.discount}%
                          </span>
                          <span className="font-semibold">
                            {formatPrice(
                              product.price * ((100 - product.discount) / 100),
                            )}
                            원
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="font-semibold">
                        {formatPrice(product.price)}원
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ProductList;
