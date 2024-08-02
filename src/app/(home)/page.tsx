import Image from "next/image";
import bannerImage from "/public/images/main-banner.jpg";
import Card from "./_components/card";
import Link from "next/link";
import db from "@/libs/db";
import { Metadata } from "next";
import { unstable_cache as nextCache } from "next/cache";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Home",
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
    take: 4,
  });

  return products;
};

const getDiscontProducts = async () => {
  const products = await db.product.findMany({
    where: {
      discount: {
        not: null,
      },
    },
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
    take: 4,
  });

  return products;
};

const getCachedProducts = nextCache(getProducts, ["home-products"], {
  tags: ["products", "product"],
});
const getCachedDiscountProducts = nextCache(
  getDiscontProducts,
  ["home-discount-products"],
  {
    tags: ["products", "product"],
  },
);

export default async function Home() {
  const products = await getCachedProducts();
  const discountedProducts = await getCachedDiscountProducts();
  return (
    <>
      <div className="h-[576px] sm:h-[768px]">
        <div className="relative h-full w-full flex justify-center">
          <Image
            src={bannerImage}
            fill
            style={{ objectFit: "cover", objectPosition: "top" }}
            quality={100}
            sizes="1"
            alt="bannerImage"
          />

          <div className="absolute h-full w-full bg-black opacity-50" />

          <div className="absolute z-10 flex h-full flex-col max-w-screen-2xl md:px-20 px-4 w-full justify-center text-white ">
            <div>
              <span className="gradient-text animate-gradient text-3xl font-bold sm:text-5xl">
                YM Light
              </span>
            </div>

            <div className="w-[80%] text-balance pt-2 text-lg sm:text-2xl">
              YM Lights are always made by experts with over 30 years of
              experience.
            </div>
          </div>
        </div>
      </div>

      <Suspense fallback="Loading...">
        <div className="mx-auto max-w-screen-2xl px-4 py-5 sm:px-10 sm:py-10">
          <div className="flex flex-col gap-y-10 divide-y-2">
            <div className="my-product-wrap">
              <div className=" text-lg font-semibold sm:text-2xl">
                새로 등록된 상품
              </div>
              <div className="grid gap-1 pt-4 min-[320px]:grid-cols-2 sm:gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 xl:gap-2">
                {products.map((product) => (
                  <Link key={product.id} href={`/products/${product.id}`}>
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

            <div className="my-product-wrap">
              <div className="pt-6 text-lg font-semibold sm:text-2xl">
                할인 상품
              </div>
              <div className="grid gap-2 pt-4 min-[320px]:grid-cols-2 sm:gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 xl:gap-2">
                {discountedProducts.map((product) => (
                  <Link key={product.id} href={`/products/${product.id}`}>
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
      </Suspense>


    </>
  );
}
