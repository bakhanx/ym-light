import { formatPrice } from "@/utils/formatPrice";
import ProductInfo from "./product-Info";
import { Product } from "@prisma/client";

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  return (
    <div className="my-product-info">
      <div className="text-xl font-semibold sm:text-3xl">{product.title}</div>

      <div className="gap-x-2 pt-5 font-semibold">
        {product.discount > 0 && (
          <div className="flex gap-x-2">
            <span className="text-lg text-red-600 sm:text-xl">{product.discount}%</span>
            <span className="text-sm text-yellow-500 line-through opacity-60 sm:text-base">{formatPrice(product.price)}원</span>
          </div>
        )}
        <span className="text-lg sm:text-2xl">
          {formatPrice(product.discount ? product.price * ((100 - product.discount) / 100) : product.price)}원
        </span>
      </div>

      <div className="flex flex-col gap-y-2 pt-8 text-sm sm:pt-10 sm:text-base">
        <ProductInfo label="색상" data={product.color} />
        <ProductInfo label="재질" data={product.material} />
        <ProductInfo label="사이즈" data={product.size} />
        <ProductInfo label="전구" data={product.bulb} />
        <ProductInfo label="제조사" data={product.manufacturer} />
        <ProductInfo label="설명" data={product.description} />
      </div>
    </div>
  );
};

export default ProductDetails;
