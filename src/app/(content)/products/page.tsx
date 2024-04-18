import db from "@/libs/db";
import Image from "next/image";

const getProduct = async () => {
  const product = await db.product.findUnique({
    where: {
      id: 1,
    },
  });
  return product;
};

const Product = async () => {
  const product = await getProduct();

  return (
    <div>
      {product && (
        <div className="pt-20">
          <div>This is Product</div>
          <div>{product.title}</div>
          <div>{product.color}</div>
          <div className="relative size-36 rounded-md overflow-hidden">
            <Image alt={product.title} src={product.photo} fill quality={75}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
