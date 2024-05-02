import Image from "next/image";
import bannerImage from "@/../public/images/main-banner-1920.jpg";
import Card from "./_components/card";
import Link from "next/link";

import db from "@/libs/db";
import { Metadata } from "next";
import { unstable_cache as nextCache } from "next/cache";

export const metadata: Metadata = {
  title: "Home",
};

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

type ProductsType = {
  id: number;
  title: string;
  photo: string;
  created_at: Date;
  updated_at: Date;
};

const getProducts = async () => {
  const products = await db.product.findMany({
    select: {
      id: true,
      title: true,
      created_at: true,
      updated_at: true,
      photo: true,
      discount: true,
    },
    orderBy: {
      updated_at: "desc",
    },
  });

  return products;
};
// const getCachedProducts = nextCache(getProducts, ["home-products"], {
//   tags: ["products"],
// });

export default async function Home() {
  const products = await getProducts();
  const discountedProducts = products.filter((product) => product.discount);
  return (
    <>
      <div className="h-[768px]">
        <div className="relative h-full w-full">
          <Image
            src={bannerImage}
            fill
            style={{ objectFit: "cover", objectPosition: "top" }}
            quality={100}
            sizes="1"
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
            <div className="pl-5 pt-6 text-2xl font-bold">새로 등록된 상품</div>
            <div className="grid gap-10 px-5 pt-4 min-[320px]:grid-cols-2 sm:gap-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-10">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  scroll={false}
                >
                  <Card
                    key={product.id}
                    name={product.title}
                    photoURL={product.photo}
                    discount={product.discount || 0}
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="my-product-wrap">
            <div className="pl-5 pt-6 text-2xl font-bold">할인 상품</div>
            <div className="grid gap-10 px-5 pt-4 min-[320px]:grid-cols-2 sm:gap-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-10">
              {discountedProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  scroll={false}
                >
                  <Card
                    key={product.id}
                    name={product.title}
                    photoURL={product.photo}
                    discount={product.discount || undefined}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
