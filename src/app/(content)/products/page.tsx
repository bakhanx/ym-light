import React from "react";
import ProductList from "./_components/productList";
import getProducts from "./actions/getProducts";

const ProductsContainer = async () => {
  const products = await getProducts();
  return (
    <div className="mx-auto min-h-screen max-w-screen-xl px-4 py-32 xl:px-0">
      <ProductList products={products} />
    </div>
  );
};

export default ProductsContainer;
