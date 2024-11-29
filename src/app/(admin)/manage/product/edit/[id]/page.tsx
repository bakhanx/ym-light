"use client";

import Upload from "../../upload/page";
import { useEffect, useState } from "react";
import getProduct from "@/app/(content)/products/actions/getProduct";

const EditProduct = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [product, setProduct] = useState<any>(null);
  useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await getProduct(+id);
      console.log("fetch");
      setProduct(fetchedProduct);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;
  return (
    <div>
      <Upload product={product} isEdit={true} />
    </div>
  );
};

export default EditProduct;
