import productData from "@/db/productInfo-kor.json";
import { Fragment } from "react";
import TempImage from "@/../public/images/entro-chandelier-001.jpg";
import Image from "next/image";
import ProductInfo from "../_components/productInfo";

type Props = {
  params: {
    id: string;
  };
};

const ProductDetail = ({ params }: Props) => {
  const product = productData.products.find(
    (product) => String(product.id) === params.id,
  );

  console.log(product);

  return (
    <>
      {product && (
        <div className="my-container">
          <div className="my-content m-auto w-[1280px] max-w-screen-xl px-10 pb-28 pt-8 ">
            <div
              className="my-column_bind flex divide-x-2 divide-slate-300
          "
            >
              <div className="my-column-left w-[50%] pr-10">
                <div className="my-column-box">
                  <div className="my-banner-image ">
                    <div className="aspect-square w-full bg-slate-500">
                      <Image src={TempImage} alt="temp" />
                    </div>
                  </div>
                  <div className="my-banner-func pt-5">
                    <div className="h-16 w-full border-2">이미지 슬라이드</div>
                  </div>
                </div>
              </div>

              <div className="my-column-right w-[50%] pl-10">
                <div className="my-column-box">
                  <div className="my-product-info">
                    <div className="p-2">
                      <div className=""></div>
                      <div className="text-3xl font-bold">{product?.name}</div>

                      <div className="gap-x-2 pt-5 font-bold">
                        <div className="flex gap-x-2">
                          <span className="text-xl text-red-600">
                            {product?.discount}%
                          </span>

                          <span className="text-lg text-yellow-500 line-through opacity-60 ">
                            {product?.price.toLocaleString("ko-KR")}원
                          </span>
                        </div>

                        <span className="text-2xl">
                          {product?.discount
                            ? (
                                product?.price *
                                ((100 - product.discount) / 100)
                              ).toLocaleString("ko-KR")
                            : product?.price.toLocaleString("ko-KR")}
                          원
                        </span>
                      </div>

                      <div className="pt-20">
                        <ProductInfo label="색상" data={product?.color} />
                        <ProductInfo
                          label="재질"
                          data={product?.ingradient.join(", ")}
                        />
                        <ProductInfo
                          label="사이즈"
                          data={`W: ${product?.size.width} H: ${product?.size.height}`}
                        />
                        <ProductInfo label="전구" data={product?.bulb} />
                        <ProductInfo
                          label="제조사"
                          data={product?.manufacture}
                        />
                        <ProductInfo label="설명" data={product?.description} />
                      </div>
                    </div>
                  </div>
                  <div className="my-btn-wrap mt-52 flex flex-col gap-y-5 text-white">
                    <button className="w-full rounded-md bg-slate-800 p-5">
                      구매하기
                    </button>
                    <button className="w-full rounded-md bg-slate-800 p-5">
                      장바구니
                    </button>
                    <button className="w-full rounded-md bg-slate-800 p-5">
                      찜하기
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-product-detail-item-conent mt-14 ">
              <div className="my-product-detail-tap-wrap">
                <div className="my-product-detail-tab flex justify-center gap-x-36 border-b-[1px] border-t-2 border-b-slate-500 py-5">
                  <div>관련 상품</div>
                  <div>상품평</div>
                  <div>상품 문의</div>
                  <div>교환 및 반품</div>
                </div>
              </div>

              <div className="pt-10"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
