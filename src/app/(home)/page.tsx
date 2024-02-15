"use client";

import Image from "next/image";
import bannerImage from "@/../public/images/main-banner-1920.jpg";
import productData from "@/db/productInfo-kor.json";
import product1 from "@/../public/images/mega-crystal-001.jpg";
import product3 from "@/../public/images/neon-001.jpg";
import { useState } from "react";
import Card from "./component/card";

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
    <div>
      <div className="h-[640px] bg-slate-300">
        <div className="relative h-full w-full bg-black">
          <Image
            src={bannerImage}
            fill
            style={{ objectFit: "cover", objectPosition: "top" }}
            quality={100}
            alt="bannerImage"
          />
          <div className="absolute h-full w-full bg-black opacity-50" />

          <div className="absolute z-10 flex h-full w-full flex-col justify-center pl-20 text-white">
            <div className="text-5xl font-bold">YM Light</div>
            <div className="w-[30%] text-balance pt-2 text-2xl">
              YM Lights are always made by experts with over 30 years of
              experience.
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto pt-10">
        <div className="flex flex-col items-center justify-center gap-y-10">
          <div className="text-2xl font-bold text-white">New Release</div>
          <div className="grid px-5 min-[320px]:grid-cols-2  sm:gap-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-24 gap-10">
            {products.map((product) => (
              <Card key={product.id} name={product.name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
