"use client";

import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BLUR_DATA_URL_GRAY } from "../../../../../public/images/base64/blur-gray-skeleton";
import { formatPrice } from "@/utils/formatPrice";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import SortButton from "./sortButton";

const sortOptions = [
  { value: "latest", label: "최신등록순" },
  { value: "popularity", label: "인기순" },
  { value: "lowToHigh", label: "판매량낮은순" },
  { value: "highToLow", label: "판매량높은순" },
];

const ProductList = ({ products }: { products: Product[] }) => {
  const [filteredProducts, setFilterdProducts] = useState<Product[]>(products);
  const [sortType, setSortType] = useState<string>("latest");

  useEffect(() => {
    let sortedProducts = [...products];
    switch (sortType) {
      case "latest":
        sortedProducts.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
        break;
      case "popularity":
        sortedProducts.sort((a, b) => a.stock - b.stock);
        break;
      case "lowToHigh":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "highToLow":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    setFilterdProducts(sortedProducts);
  }, [sortType, products]);
  return (
    <>
      <div className="flex items-center justify-end sm:justify-between">
        <div className="hidden sm:block">
          <div className="flex gap-2">
            {sortOptions.map((option) => (
              <SortButton
                key={option.value}
                sortType={sortType}
                setSortType={setSortType}
                type={option.value}
              >
                {option.label}
              </SortButton>
            ))}
          </div>
        </div>
        <div className="relative pr-2 sm:hidden">
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="block w-full appearance-none rounded-md bg-transparent py-2 pr-6 text-end text-sm"
          >
            <option value="latest">최신등록순</option>
            <option value="popularity">인기순</option>
            <option value="lowToHigh">판매량낮은순</option>
            <option value="highToLow">판매량높은순</option>
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-1 top-1/2 size-5 -translate-y-1/2 transform text-gray-500" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 pt-10 sm:grid-cols-4">
        {filteredProducts.map((product) => (
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
