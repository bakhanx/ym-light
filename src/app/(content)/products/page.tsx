import Image from "next/image";
import getProduct from "./[id]/getProduct";
import AddBtn from "./component";

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
  const product = await getProduct(1);

  return (
    <div>
      {product && (
        <div className="pt-20">
          <div>This is Product</div>
          <div>{product.title}</div>
          <div>{product.color}</div>
          <div className="relative size-36 overflow-hidden rounded-md">
            <Image alt={product.title} src={product.photo} fill quality={75} />
          </div>
          <div>{product.price}</div>

          <AddBtn />
          
        </div>
      )}


      <div className="pt-20 flex max-w-screen-lg justify-center">
        <div>asd</div>
        <input type="text" />
      </div>


    </div>
  );
};

export default Product;
