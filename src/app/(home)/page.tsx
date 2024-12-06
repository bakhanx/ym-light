import lightFlicker from "@/styles/LightFlicker.module.css";
import textFlicker from "@/styles/textFlicker.module.css";
import db from "@/utils/db";
import { Metadata } from "next";
import { unstable_cache as nextCache } from "next/cache";
import { Suspense } from "react";
import Card from "./_components/card";
import Link from "next/link";
import Image from "next/image";
import description from "@/../public/images/text/description.webp";

export const metadata: Metadata = {
  title: "Home",
};

const getProducts = async () => {
  const [allProducts, discountedProducts] = await Promise.all([
    db.product.findMany({
      select: {
        id: true,
        title: true,
        created_at: true,
        updated_at: true,
        photos: true,
        discount: true,
      },
      orderBy: {
        updated_at: "desc",
      },
      take: 4,
    }),
    db.product.findMany({
      where: {
        discount: {
          not: 0,
        },
      },
      select: {
        id: true,
        title: true,
        created_at: true,
        updated_at: true,
        photos: true,
        discount: true,
      },

      orderBy: {
        updated_at: "desc",
      },
      take: 4,
    }),
  ]);
  return { allProducts, discountedProducts };
};

const getCachedProducts = nextCache(getProducts, ["home-products"], {
  tags: ["products", "product"],
});

export default async function Home() {
  const { allProducts, discountedProducts } = await getCachedProducts();
  return (
    <div className="bg-black">
      <div className="h-screen ">
        <div className="relative flex h-full w-full justify-center ">
          {/* Background */}
          <div className={lightFlicker.light_container} />

          {/* Text */}
          <div className="absolute z-10 flex h-full w-full flex-col justify-center px-2 pt-24 xl:px-0 text-white sm:px-4 max-w-screen-xl">
            {/* <NeonText /> */}
            <div className="w-full ">
              <div className={textFlicker.light_container} />
              <div
                className="h-[60px] w-full  bg-no-repeat "
                style={{
                  backgroundImage: `url(${description.src})`,
                  backgroundSize: 'contain'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <Suspense fallback="Loading...">
        <div className="mx-auto max-w-screen-xl px-2 py-5 text-white sm:px-4 sm:py-10 xl:px-0">
          <div className="flex flex-col gap-y-10 divide-y-2">
            <div className="my-product-wrap">
              <div className=" text-lg font-semibold sm:text-2xl">
                새로 등록된 상품
              </div>
              <div className="grid  gap-8 px-4  pt-4 min-[320px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                {allProducts?.map((product) => (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <Card
                      key={product.id}
                      name={product.title}
                      photoURL={product.photos[0]}
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
                      photoURL={product.photos[0]}
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
