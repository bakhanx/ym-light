import styles from "@/styles/Bulb.module.css";
import flickers from "@/styles/NeonFlicker.module.css";
import signs from "@/styles/NeonSquare.module.css";
import Card from "./_components/card";
import Link from "next/link";
import db from "@/libs/db";
import { Metadata } from "next";
import { unstable_cache as nextCache } from "next/cache";
import { Suspense } from "react";

import dynamic from "next/dynamic";

const NeonText = dynamic(() => import("./_components/neon-text"), {
  ssr: false,
});

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
    <div className="bg-black">
      <div className="h-screen ">
        <div className="relative flex h-full w-full justify-center">
          {/* Background */}
          <div className={styles.light_container} />

          {/* Open Neon */}
          {/* <div className="absolute right-6 md:top-24 top-56">
            <div className={flickers.container}>
              <span className={flickers.text}>OPEN</span>
            </div>
          </div> */}

          {/* Text */}
          <div className="absolute z-10 flex h-full w-full max-w-screen-2xl flex-col justify-center px-4 pt-24 text-white md:px-20">
            <NeonText />
          </div>
        </div>
      </div>

      <Suspense fallback="Loading...">
        <div className="mx-auto max-w-screen-2xl px-4 py-5 text-white sm:px-10  sm:py-10">
          <div className="flex flex-col gap-y-10 divide-y-2">
            <div className="my-product-wrap">
              <div className=" text-lg font-semibold sm:text-2xl">
                새로 등록된 상품
              </div>
              <div className="grid gap-1 gap-y-8 pt-4 min-[320px]:grid-cols-2 sm:gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 xl:gap-2">
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
              <div className="grid gap-2 gap-y-8 pt-4 min-[320px]:grid-cols-2 sm:gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 xl:gap-2">
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
    </div>
  );
}
