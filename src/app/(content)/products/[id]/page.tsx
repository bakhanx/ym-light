import TempImage from "@/../public/images/entro-chandelier-001.jpg";
import Image from "next/image";
import ProductInfo from "../_components/productInfo";
import { formatOfPrice } from "@/libs/utils";
import {
  HeartIcon,
  ShoppingBagIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import Options from "../_components/options";
import NotFound from "@/app/not-found";
import db from "@/libs/db";
import { unstable_cache as nextCache } from "next/cache";

type Props = {
  params: {
    id: number;
  };
};

// 쿠폰시스템
// const coupon = [{ id: 1, name: "신규할인쿠폰", rate: 10 }];

const getProduct = async (id: number) => {
  const product = await db.product.findUnique({
    where: {
      id: +id,
    },
    select: {
      id: true,
      title: true,
      price: true,
      discount: true,
      photo: true,
      color: true,
      material: true,
      size: true,
      bulb: true,
      manufacturer: true,
      description: true,
      created_at: true,
      updated_at: true,
      options: true,
    },
  });
  return product;
};

const getCahcedProduct = nextCache(getProduct, ["product"], {
  tags: ["light"],
});

const ProductDetail = async ({ params }: Props) => {
  const product = await getCahcedProduct(params.id);
  return (
    <>
      {product ? (
        <div className="my-container pt-20">
          <div className="my-content m-auto w-[1280px] max-w-screen-xl px-10 pb-28 pt-8 ">
            <div className="my-column_bind flex divide-x-2 divide-slate-300">
              {/* left */}
              <div className="my-column-left w-[50%] pr-10">
                <div className="my-column-box">
                  <div className="my-banner-image ">
                    <div className="relative aspect-square w-full bg-slate-500">
                      <Image
                        src={`${product.photo}/sharpen=1,fit=scale-down,w=640`}
                        fill
                        alt="temp"
                        objectFit="cover"
                      />
                    </div>
                  </div>
                  <div className="my-banner-func pt-5">
                    <div className="h-16 w-full border-2">이미지 슬라이드</div>
                  </div>
                </div>
              </div>

              {/* right */}
              <div className="my-column-right w-[50%] pl-10">
                <div className="my-column-box">
                  {/* Info */}
                  <div className="my-product-info">
                    <div className="">
                      <div className="text-3xl font-semibold">{product.title}</div>

                      <div className="gap-x-2 pt-5 font-semibold">
                        {product?.discount && (
                          <div className="flex gap-x-2">
                            <span className="text-xl text-red-600">
                              {product?.discount}%
                            </span>

                            <span className="text-lg text-yellow-500 line-through opacity-60 ">
                              {formatOfPrice(product?.price)}원
                            </span>
                          </div>
                        )}

                        <span className="text-2xl">
                          {product?.discount
                            ? formatOfPrice(
                                product?.price *
                                  ((100 - product.discount) / 100),
                                "zh-CN",
                              )
                            : formatOfPrice(product?.price)}
                          원
                        </span>
                      </div>

                      <div className="flex flex-col gap-y-2 pt-20">
                        <ProductInfo label="색상" data={product?.color} />
                        <ProductInfo label="재질" data={product?.material} />
                        <ProductInfo label="사이즈" data={product?.size} />
                        <ProductInfo label="전구" data={product?.bulb} />
                        <ProductInfo
                          label="제조사"
                          data={product?.manufacturer}
                        />
                        <ProductInfo label="설명" data={product?.description} />
                      </div>
                    </div>
                  </div>

                  {/* Option */}
                  <Options
                    price={product.price}
                    discount={product?.discount || undefined}
                  />
                  <div className="my-btn-wrap mt-20 flex flex-col gap-y-5 font-bold text-white">
                    <button className="flex w-full items-center justify-center gap-x-1 rounded-md bg-amber-500 p-5 hover:bg-amber-600">
                      <TruckIcon className="h-7 w-7 " />
                      구매하기
                    </button>
                    <div className="flex gap-x-4">
                      <button className="flex w-full items-center justify-center gap-x-1 rounded-md bg-blue-500 p-5 hover:bg-blue-600">
                        <ShoppingBagIcon className="h-5 w-5 stroke-2" />
                        <span>장바구니</span>
                      </button>
                      <button className="flex w-full items-center justify-center gap-x-1 rounded-md bg-red-600 p-5 hover:bg-red-700">
                        <HeartIcon className="h-5 w-5 stroke-2" />
                        찜하기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-product-detail-content mt-14 ">
              <div className="my-product-detail-tap-wrap">
                <div className="my-product-detail-tab flex justify-center gap-x-36 border-b-2 border-t-2 border-b-orange-300 py-5">
                  <div>관련 상품</div>
                  <div>상품평</div>
                  <div>상품 문의</div>
                  <div>교환 및 반품</div>
                </div>
              </div>

              <div className="my-product-detail-item-wrap divide-y-[1px] ">
                <div className="my-product-detail-item item-notice pt-6 ">
                  <div className="my-item-title text-lg font-bold">
                    <p>판매자 공지사항</p>
                  </div>
                  <div className="my-item-content p-10 text-center text-slate-500">
                    <p>표시할 게시물이 없습니다.</p>
                  </div>
                </div>
                <div className="my-product-detail-item item-detail pt-6">
                  <div className="my-item-title text-lg font-bold">
                    <div>상품 상세정보</div>
                  </div>
                  <div className="my-item-content p-10 text-center text-slate-500">
                    <p>표시할 게시물이 없습니다.</p>
                  </div>
                </div>

                <div className="my-product-detail-item item-recommend pt-6">
                  <div className="my-item-title text-lg font-bold">
                    <div>상품평</div>
                  </div>
                  <div className="my-item-content p-10 text-center text-slate-500">
                    <p>표시할 게시물이 없습니다.</p>
                  </div>
                </div>
                <div className="my-product-detail-item item-recommend pt-6">
                  <div className="my-item-title text-lg font-bold">
                    <div>상품 문의</div>
                  </div>
                  <div className="my-item-content p-10 text-center text-slate-500">
                    <p>교환 및 반품</p>
                  </div>
                </div>
                <div className="my-product-detail-item item-recommend pt-6">
                  <div className="my-item-title text-lg font-bold">
                    <div>추천 상품</div>
                  </div>
                  <div className="my-item-content p-10 text-center text-slate-500">
                    <p>표시할 게시물이 없습니다.</p>
                  </div>
                </div>

                <div className="my-product-detail-item item-relative pt-6">
                  <div className="my-item-title text-lg font-bold">
                    <div>관련 상품</div>
                  </div>
                  <div className="my-item-content p-10 text-center text-slate-500">
                    <p>표시할 게시물이 없습니다.</p>
                  </div>
                </div>
              </div>

              <div className="pt-10"></div>
            </div>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default ProductDetail;

export async function generateStaticParams() {
  const products = await db.product.findMany({
    select: {
      id: true,
    },
  });

  return products.map((product) => ({
    id: product.id + "",
  }));
}
