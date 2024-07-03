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
    <div className="mx-auto max-w-screen-2xl px-4 py-10 md:px-20">
      <div>등록된 상품</div>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
        {products.map((product, index) => (
          <Link
            key={product.id}
            href={`products/${product.id}`}
            className="border-b-2 sm:border-b-0 sm:border-orange-600 sm:hover:border-2"
          >
            <div className="flex flex-col p-2 ">
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

                <div className="mt-2">
                  <p className="mb-1">{product.title}</p>

                  <div className="text-lg">
                    {product.discount ? (
                      <>
                        <div className="text-sm text-gray-500 line-through ">
                          {formatOfPrice(product.price)}원
                        </div>

                        <div className="flex gap-x-2 ">
                          <span className="font-bold text-red-600  ">
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
                      <div className="font-semibold">
                        {formatOfPrice(product.price)}원
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
