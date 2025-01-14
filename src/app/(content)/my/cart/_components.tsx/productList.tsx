import Loader from "@/components/loader";
import { CartItemDetail } from "@/store/useCartStore";
import React from "react";
import Product from "./product";

const ProductList = ({
  cart,
  isLoading,
}: {
  cart: CartItemDetail[];
  isLoading: boolean;
}) => {
  return (
    <>
      {isLoading ? (
        <div className="py-20">
          <Loader />
        </div>
      ) : (
        <>
          {/* products */}
          {cart.length > 0 ? (
            cart.map((cartItem, index) => (
              <div
                key={index}
                className="my-4 rounded-md border-b-[1px] border-gray-300 bg-white"
              >
                <Product
                  cartItem={cartItem}
                  index={index}
                />
              </div>
            ))
          ) : (
            <div className="w-full bg-white p-10 text-center">
              장바구니에 담긴 상품이 없습니다.
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProductList;
