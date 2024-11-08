import Image from "next/image";
import getProducts from "./actions/getProducts";

import Link from "next/link";
import { BLUR_DATA_URL_GRAY } from "../../../../public/images/base64/blur-gray-skeleton";
import { formatPrice } from "@/utils/formatPrice";

type ProductType = {
  id: number;
  title: string;
  price: number;
  discount: number | null;
  photo: string;
  color: string;
  material: string;
  size: string;
  bulb: string;
  manufacturer: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  options: string;
  userId: number;
};

const Product = async () => {
  const products = await getProducts();

  return (
    <div className="mx-auto min-h-screen max-w-screen-2xl px-4 py-32 md:px-20">
      <div className=" text-lg font-semibold sm:text-2xl">등록된 상품</div>

      <div className="grid grid-cols-2 gap-5 pt-10 sm:grid-cols-4">
        {products.map((product, index) => (
          <Link
            key={product.id}
            href={`products/${product.id}`}
            className="rounded-md  "
          >
            <div className="flex flex-col text-sm md:text-base">
              <div className="">
                <div className="relative aspect-square w-full overflow-hidden rounded-t-md border-[1px] border-white">
                  <Image
                    alt={product.title}
                    src={`${product.photo}/sharpen=1,fit=scale-down,w=640`}
                    fill
                    objectFit="cover"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL_GRAY}
                  />
                </div>

                <div className="flex h-28 flex-col justify-between border-2 p-2">
                  <p className="h-14">{product.title}</p>

                  <div className="">
                    {product.discount ? (
                      <>
                        <div className="text-xs text-gray-500 line-through md:text-sm ">
                          {formatPrice(product.price)}원
                        </div>

                        <div className="flex gap-x-2 ">
                          <span className="font-bold text-red-600  ">
                            {product.discount}%
                          </span>
                          <span className="font-semibold">
                            {formatPrice(
                              product?.price * ((100 - product.discount) / 100),
                            )}
                            원
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="font-semibold">
                        {formatPrice(product.price)}원
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Product;
