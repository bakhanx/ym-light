"use client"

import { useEffect, useMemo, useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { useUserStore } from "@/store/useUserStore";
import getCartItems from "../actions/getCartItems";
import ProductListHeader from "./productListHeader";
import ProductList from "./productList";
import PriceSummary from "./priceSummary";
import DeleteButton from "./deleteButton";
import CheckAllButton from "./checkAllButton";
import CartHeader from "./cartHeader";
import deleteCartItems from "../actions/deleteCartItems";

const DELIVERY_PRICE = 7000;

const Cart = ({ userId }: { userId: number | null }) => {
  const [isSelectAllClick, setIsSelectAllClick] = useState(true);
  const { cart, removeFromCart, setInitData } = useCartStore();
  const { substractToCartItemCount } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!userId) return;
      setIsLoading(true);
      const cartItems = await getCartItems(userId);
      if (cartItems) {
        setInitData(cartItems); // 상태 업데이트
      }
      setIsLoading(false);
    };

    if (userId) {
      fetchCartItems();
    }
  }, [userId, setInitData]); // userId가 변경될 때만 데이터 호출

  const checkedCarts = useMemo(
    () => cart.filter((item) => item.checked),
    [cart],
  );

  const totalOriginalPrice = useMemo(() => {
    return checkedCarts.reduce((acc, cartItem) => {
      const productTotalPrice =
        cartItem.options.length > 0
          ? 0
          : cartItem.product.price * cartItem.quantity;
      const optionTotalPrice = cartItem.options.reduce(
        (sum, option) =>
          sum +
          (cartItem.product.price + (option.option.price || 0)) *
            option.quantity,
        0,
      );
      return acc + productTotalPrice + optionTotalPrice;
    }, 0);
  }, [checkedCarts]);

  const totalDiscountPrice = useMemo(() => {
    return checkedCarts.reduce((acc, cartItem) => {
      const totalQuantity =
        cartItem.options.length > 0
          ? cartItem.options.reduce((sum, option) => sum + option.quantity, 0)
          : cartItem.quantity;
      return (
        acc +
        ((cartItem.product.price * (cartItem.product.discount || 0)) / 100) *
          totalQuantity
      );
    }, 0);
  }, [checkedCarts]);

  const totalDeliveryPrice = useMemo(
    () => checkedCarts.length * DELIVERY_PRICE,
    [checkedCarts],
  );
  const totalAllPrice = useMemo(
    () => totalOriginalPrice - totalDiscountPrice + totalDeliveryPrice,
    [totalOriginalPrice, totalDiscountPrice, totalDeliveryPrice],
  );

  return (
    <div className="rounded-md bg-white">
      <div className="divide-y-[1px]">
        <CartHeader itemsCount={cart.length} />
        <div className="py-5 text-sm">
          <div className="inner-content max-w-screen-xl px-2 sm:px-4 xl:px-0">
            <div className="flex gap-x-2 divide-x-2 px-2">
              <CheckAllButton
                onClick={() => setIsSelectAllClick(!isSelectAllClick)}
                isSelect={isSelectAllClick}
              />
              <DeleteButton
                onClick={() =>
                  checkedCarts.forEach((item) => {
                    removeFromCart({ productId: item.productId });
                    deleteCartItems(item.productId);
                    substractToCartItemCount();
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="py-4 sm:py-10">
        <div className="m-auto max-w-screen-xl rounded-md px-2 sm:px-4 xl:px-0">
          <ProductListHeader
            isSelect={isSelectAllClick}
            onClick={() => setIsSelectAllClick(!isSelectAllClick)}
          />
          <ProductList cart={cart} isLoading={isLoading} />
          <PriceSummary
            totalOriginalPrice={totalOriginalPrice}
            totalDiscountPrice={totalDiscountPrice}
            totalDeliveryPrice={totalDeliveryPrice}
            totalAllPrice={totalAllPrice}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
