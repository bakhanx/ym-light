"use client";

import Image from "next/image";
import bannerImage from "@/../public/images/main-banner-1920.jpg";
import productData from "@/db/productInfo-kor.json";
import product1 from "@/../public/images/mega-crystal-001.jpg";
import product3 from "@/../public/images/neon-001.jpg";
import { useState } from "react";
import Card from "./component/card";
import Link from "next/link";

// export const metadata: Metadata = {
//   title: "Home",
// };

type ProductType = {
  id: number;
  name: string;
  price: number;
  color: string;
  ingradient: string[];
  weight: number;
  bulb: string;
  manufacture: string;
  description: string;
  image: string;
};

type ProductResponse = {
  products: ProductType[];
};

export default function Home() {
  const { products }: ProductResponse = productData;

  return (
    <>
      <div className="h-[640px]">
        <div className="relative h-full w-full">
          <Image
            src={bannerImage}
            fill
            style={{ objectFit: "cover", objectPosition: "top" }}
            quality={100}
            alt="bannerImage"
          />

          <div className="absolute h-full w-full bg-black opacity-50" />

          <div className="absolute z-10 flex h-full flex-col justify-center pl-20 text-white ">
            <div>
              <span className="gradient-text animate-gradient text-5xl font-bold">
                YM Light
              </span>
            </div>

            <div className="text-balance pt-2 text-2xl">
              YM Lights are always made by experts with over 30 years of
              experience.
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl pt-10">
        <div className="flex flex-col gap-y-10 divide-y-2">

          <div className="my-product-wrap">
            <div className="pl-5 text-2xl font-bold pt-6">새로 등록된 상품</div>
            <div className="grid gap-10 px-5 min-[320px]:grid-cols-2 sm:gap-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-10 pt-4">
              {products.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <Card key={product.id} name={product.name} />
                </Link>
              ))}
            </div>
          </div>

          <div className="my-product-wrap">
            <div className="pl-5 text-2xl font-bold pt-6">할인 상품</div>
            <div className="grid gap-10 px-5 min-[320px]:grid-cols-2 sm:gap-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-10 pt-4">
              {products.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <Card key={product.id} name={product.name} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
