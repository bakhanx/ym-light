import { Metadata } from "next";
import Image from "next/image";
import bannerImage from "@/../public/images/main-banner-1920.jpg";
import productData from "@/db/productInfo-kor.json";
import product1 from "@/../public/images/mega-crystal-001.jpg";
import product2 from "@/../public/images/entro-chandelier-001.jpg";
import product3 from "@/../public/images/neon-001.jpg";

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

const Card = () => {
  return (
    <div className="w-64 h-80 rounded-xl shadow-md bg-gray-800">
      <div className="p-2 space-y-1">
        <div className="relative h-48 bg-slate-200 rounded-xl">
          <Image
            src={product2}
            fill
            style={{ objectFit: "cover", objectPosition: "top" }}
            quality={100}
            alt="product2"
            className="rounded-md"
          />
        </div>
        <div className="flex justify-center items-center h-28 rounded-xl text-white">
          Super light
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const { products }: ProductResponse = productData;

  return (
    <div>
      <div className="h-[640px] bg-slate-300">
        <div className="relative w-full h-full bg-black">
          <Image
            src={bannerImage}
            fill
            style={{ objectFit: "cover", objectPosition: "top" }}
            quality={100}
            alt="bannerImage"
          />
          <div className="absolute bg-black w-full h-full opacity-50" />

          <div className="absolute w-full text-white flex flex-col justify-center pl-20 h-full z-10">
            <div className="text-5xl font-bold">YM Light</div>
            <div className="text-2xl w-[30%] text-balance pt-2">
              YM Lights are always made by experts with over 30 years of
              experience.
            </div>
          </div>
        </div>
      </div>

      <div className="pt-10 w-[1024px] mx-auto">
        <div className="font-bold text-2xl text-white">New Release</div>
        <div className="flex justify-center pt-5">
          <div className="grid grid-cols-4 gap-24 ">
            {products.map((product, i) => (
              <div
                key={product.id}
                className="w-64 h-80 rounded-xl shadow-md bg-gray-800"
              >
                <div className="p-2 space-y-1">
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
                  <div className="flex justify-center items-center h-28 rounded-xl text-white">
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
