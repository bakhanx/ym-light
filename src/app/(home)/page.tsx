import Image from "next/image";
import bannerImage from "@/../public/images/main-banner-1920.jpg";
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

          <div className="absolute z-10 flex h-full flex-col justify-center pl-4 text-white sm:pl-10 md:pl-20 ">
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

      <footer className="w-full bg-black text-white">
        <div className="mx-auto flex max-w-screen-2xl flex-col px-10 py-10">
          <div className="flex flex-col justify-between gap-y-4 md:flex-row">
            <div>
              <p className="pb-1 font-bold">CUSTOMER CENTER</p>
              <div className="text-sm text-gray-300">0000-0000</div>
              <table className="mt-2 text-gray-300">
                <tbody>
                  <tr className="text-left text-sm">
                    <th className="">평일</th>
                    <th className="pl-4">휴일</th>
                  </tr>
                  <tr className="text-sm font-bold">
                    <td>09:00 ~ 18:00</td>
                    <td className="pl-4">10:00 ~ 15:00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <p className="pb-1 font-bold">COMPANY</p>
              <ul className="flex flex-col gap-y-1 text-sm text-gray-300">
                <li>법인명(상호) : 영맨조명</li>
                <li>
                  <div className="flex">
                    <span>대표 : 박홍섭</span>
                    <span className="px-2">|</span>
                    <span>개인정보관리자 : 박한솔</span>
                  </div>
                </li>
                <li>이메일 : ymlight@gmail.com</li>
                <li>전화 : 0000-0000</li>
                <li>팩스 : 02-0000-0000</li>
                <li>사업자등록번호 : 000-00-00000</li>

                <li>통신판매신고번호 제 2024-서울-0000호</li>
              </ul>
            </div>

            {/* <div>
            <p className="font-bold">ADDRESS</p>
            <ul className="text-sm text-gray-300">
              <li>위치:서울특별시 도봉구 길동로 11-11</li>
            </ul>
          </div> */}

            <div>
              <p className="pb-1 font-bold">BANK INFO</p>
              <ul className="text-sm text-gray-300">
                <li>예금주 : 영맨조명 박홍섭</li>
                <li>영맨은행 122-333-00000</li>
              </ul>
            </div>
          </div>

          <div className="pt-10">
            <p className="flex flex-col text-sm text-gray-300">
              <span>
                Copyright © (c) <strong>ymlight.com</strong>
              </span>
              <span>All rights reserved. | 호스팅사업자 : 와이엠라이트</span>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
