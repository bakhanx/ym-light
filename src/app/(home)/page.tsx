import lightFlicker from "@/styles/LightFlicker.module.css";
import textFlicker from "@/styles/textFlicker.module.css";
import db from "@/utils/db";
import { Metadata } from "next";
import { unstable_cache as nextCache } from "next/cache";
import { memo } from "react";
import description from "@/../public/images/text/description.webp";
import ProductSection from "./_components/product-section";
import { LIMIT_COUNT } from "../(content)/products/utils/constants";

const PRODUCTS_LIMIT = 4;

export const metadata: Metadata = {
  title: "Home",
};

const getProducts = async () => {
  const [allProducts, discountedProducts] = await Promise.all([
    db.product.findMany({
      select: {
        id: true,
        title: true,
        photos: true,
        discount: true,
      },
      orderBy: {
        updated_at: "desc",
      },
      take: PRODUCTS_LIMIT,
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
      take: PRODUCTS_LIMIT,
    }),
  ]);
  return { allProducts, discountedProducts };
};

const getCachedProducts = nextCache(getProducts, ["home-products"], {
  tags: ["products", "product"],
});

const LightFlicker = memo(() => (
  <div className={lightFlicker.light_container} />
));
LightFlicker.displayName = "LightFlicker";

const TextFlicker = memo(() => <div className={textFlicker.light_container} />);
TextFlicker.displayName = "TextFlicker";

export default async function Home() {
  const { allProducts, discountedProducts } = await getCachedProducts();
  return (
    <div className="bg-black">
      <div className="h-screen ">
        <div className="relative flex h-full w-full justify-center ">
          {/* Background */}
          <LightFlicker />

          {/* Text */}
          <div className="absolute z-10 flex h-full w-full max-w-screen-xl flex-col justify-center px-2 pt-24 text-white sm:px-4 xl:px-0">
            {/* <NeonText /> */}
            <div className="w-full ">
              <TextFlicker />
              <div
                className="h-[60px] w-full  bg-no-repeat "
                style={{
                  backgroundImage: `url(${description.src})`,
                  backgroundSize: "contain",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl px-2 py-5 text-white sm:px-4 sm:py-10 xl:px-0">
        <div className="flex flex-col gap-y-10 divide-y-2">
          <ProductSection
            title="새로 등록된 상품"
            products={allProducts}
            count={LIMIT_COUNT}
          />

          <ProductSection
            title="할인 상품"
            products={discountedProducts}
            count={LIMIT_COUNT}
          />
        </div>
      </div>
    </div>
  );
}
