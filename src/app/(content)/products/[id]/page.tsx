import productData from "@/db/productInfo-kor.json";
import { Fragment } from "react";

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
      <div>This page is Product {params.id}</div>
      <div className="my-container">
        <div className="my-content m-auto w-[1280px] max-w-screen-xl px-10 pb-28 pt-8 ">
          <div
            className="my-column_bind flex divide-x-2 divide-slate-300
          "
          >
            <div className="my-column-left w-[50%] pr-10">
              <div className="my-column-box">
                <div className="my-banner-image ">
                  <div className="aspect-square w-full bg-slate-500">사진</div>
                </div>
                <div className="my-banner-func pt-5">
                  <div className="h-16 w-full bg-slate-500">기능</div>
                </div>
              </div>
            </div>

            <div className="my-column-right w-[50%] pl-10">
              <div className="my-column-box">
                <div className="my-product-info">
                  <div className="p-2">
                    <div className=""></div>
                    <div className="text-2xl font-bold">{product?.name}</div>
                    <div className="pt-5 text-xl font-bold">
                      {product?.price}원
                    </div>
                    <div className="flex gap-x-5 pt-20">
                      <p className="w-12 text-slate-200">색상</p>
                      <div className="flex items-center gap-x-1">
                        <div className="h-3 w-3 bg-white"></div>
                        <p>{product?.color}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="my-btn-wrap gap-y-5 flex flex-col mt-40">
                  <button className="w-full bg-slate-500 p-5 rounded-md">구매하기</button>
                  <button className="w-full bg-slate-500 p-5 rounded-md">장바구니</button>
                  <button className="w-full bg-slate-500 p-5 rounded-md">찜하기</button>

                </div>
              </div>
            </div>
          </div>

          <div className="my-product-detail-item-conent mt-14 ">
            <div className="my-product-detail-tap-wrap">
              <div className="my-product-detail-tab flex justify-center gap-x-20 border-b-[1px] border-t-2 border-b-slate-300 py-5">
                <div>상품 상세정보</div>
                <div>상품평</div>
                <div>상품 문의</div>
                <div>교환 및 반품</div>
              </div>
            </div>

            <div className="pt-10">
              <div className="flex gap-x-5">
                <p className="w-12 text-slate-200">성분 </p>
                <div>
                  <p>{product?.ingradient.join(", ")}</p>
                </div>
              </div>

              <div className="flex gap-x-5">
                <p className="w-12 text-slate-200">사이즈</p>
                <div className="flex gap-x-2">
                  <p>W: {product?.size.width}</p>
                  <p>H: {product?.size.height}</p>
                </div>
              </div>
              <div>전구 : {product?.bulb}</div>
              <div>제조사 : {product?.manufacture}</div>
              <div>설명 : {product?.description}</div>
              <div>이미지 : {product?.image}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
