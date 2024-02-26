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
      {product && (
        <div className="p-2">
          <div>상품명 : {product.name}</div>
          <div>가격 : {product.price}</div>
          <div>색상 : {product.color}</div>
          <div>성분 : {product.ingradient}</div>
          <div>
            사이즈 : Width: {product.size.width} / Height: {product.size.height}
          </div>
          <div>전구 : {product.bulb}</div>
          <div>제조사 : {product.manufacture}</div>
          <div>설명 : {product.description}</div>
          <div>이미지 : {product.image}</div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
