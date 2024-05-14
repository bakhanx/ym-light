import Image from "next/image";
import getProducts from "./getProducts";
import { formatOfPrice } from "@/libs/utils";
import Link from "next/link";

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
    <div className="mx-auto max-w-screen-2xl pt-20 ">
      <div>등록된 상품</div>
      <div className="grid grid-cols-4 gap-5">
        {products.map((product, index) => (
          <Link
            key={product.id}
            href={`products/${product.id}`}
            className="border-orange-600 hover:border"
          >
            <div className="flex flex-col p-2">
              <div className="">
                <div className="pb-2 text-xl font-bold text-amber-600">
                  {index + 1}
                </div>
                <div className="relative aspect-square w-full overflow-hidden rounded-md">
                  <Image
                    alt={product.title}
                    src={`${product.photo}/sharpen=1,fit=scale-down,w=640`}
                    fill
                    objectFit="cover"
                  />
                </div>
                <p className="text-lg">{product.title}</p>
                <div className="">
                  {product.discount ? (
                    <>
                      <div className="text-gray-500 line-through ">
                        {formatOfPrice(product.price)}원
                      </div>
                      <div className="flex gap-x-2  text-lg">
                        <span className="font-bold text-red-600">
                          {product.discount}%
                        </span>
                        <span className="font-semibold">
                          {formatOfPrice(
                            product?.price * ((100 - product.discount) / 100),
                          )}
                          원
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="text-lg font-semibold">
                      {formatOfPrice(product.price)}원
                    </div>
                  )}
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
