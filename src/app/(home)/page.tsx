"use client";

import { Metadata } from "next";
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

      <div className="mx-auto  pt-10">
        <div className="text-2xl font-bold text-white">New Release</div>
        <div className="flex justify-center pt-5">
          <div className="grid gap-24 min-[320px]:grid-cols-2 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 ">
            {products.map((product, i) => (
              <div
                key={product.id}
                className="h-80 w-64 rounded-xl bg-gray-800 shadow-md"
              >
                <div className="space-y-1 p-2">
                  <div className="relative h-48  rounded-xl">
                    <Image
                      src={product1}
                      fill
                      style={{ objectFit: "cover", objectPosition: "top" }}
                      quality={100}
                      alt="product1"
                      className="rounded-md"
                    />
                  </div>
                  <div className="flex h-28 items-center justify-center rounded-xl text-white">
                    {product.name}
                  </div>
                </div>
              </div>
            ))}

            {Array(8)
              .fill(0)
              .map((e, i) => (
                <div key={i}>
                  <Card />
                </div>
              ))}
          </div>
        </div>
      </div>
      
    </div>
  );
}
