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
      <div className="my-container flex justify-center">
        <div className="my-content m-auto w-[1280px] max-w-screen-xl px-10 pb-28 pt-8">
          <div className="my-column_bind flex">
            <div className="my-column-left w-[50%] pr-10">
              <div className="my-column-box">
                <div className="my-banner-image ">
                  <div className="aspect-square w-full bg-slate-500"></div>
                </div>
                <div className="my-banner-func"></div>
              </div>
            </div>

            <div className="my-column-right w-[50%] pl-10">
              <div className="my-column-box">
                <div className="my-product-info">
                  <div className="p-2">
                    <div className=""></div>
                    <div>상품명 : {product?.name}</div>
                    <div>가격 : {product?.price}</div>
                    <div>색상 : {product?.color}</div>
                    <div>성분 :{product?.ingradient.join(", ")}</div>
                    <div>
                      사이즈 : W: {product?.size.width}, H:{" "}
                      {product?.size.height}
                    </div>
                    <div>전구 : {product?.bulb}</div>
                    <div>제조사 : {product?.manufacture}</div>
                    <div>설명 : {product?.description}</div>
                    <div>이미지 : {product?.image}</div>
                  </div>
                </div>
                <div className="my-btn-wrap"></div>
              </div>
            </div>
          </div>
          <div className="my-product-detail-item-conent"></div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
