"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { orderCartItems } from "./actions/orderCartItems";
import deleteCartItems from "@/app/(content)/cart/actions/deleteCartItems";
import { useUserStore } from "@/store/useUserStore";
import getCartItems from "./actions/getCartItems";

import CheckAllButton from "./_components.tsx/checkAllButton";
import DeleteButton from "./_components.tsx/deleteButton";
import CartHeader from "./_components.tsx/cartHeader";

import ProductList from "./_components.tsx/productList";
import PriceSummary from "./_components.tsx/priceSummary";
import ProductListHeader from "./_components.tsx/ProductListHeader";

// Issue
// 0. 선택하지 않은 옵션이 장바구니에 모두 담김
const DELIVERY_PRICE = 7000;

const Cart = () => {
  const [isSelectAllClick, setIsSelectAllClick] = useState(true);

  const { cart, removeFromCart, isDataLoaded, setInitData, setDataLoaded } =
    useCartStore();
  const { substractToCartItemCount } = useUserStore();
  const { user } = useUserStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const checkedCarts = useMemo(() => {
    return cart.filter((cartItem) => cartItem.checked);
  }, [cart]);
  const totalOriginalPrice = useMemo(() => {
    return checkedCarts
      .map((cartItem) => {
        console.log(cartItem);
        const productTotalPrice = cartItem.product.price * cartItem.quantity;
        const optionTotalPrice =
          cartItem.options.length > 0
            ? cartItem.options
                .map(
                  (option) =>
                    (cartItem.product.price + (option.option.price || 0)) *
                    option.quantity,
                )
                .reduce((acc, cur) => acc + cur, 0)
            : 0;
        return productTotalPrice + optionTotalPrice;
      })
      .reduce((acc, cur) => acc + cur, 0);
  }, [checkedCarts]);

  const totalDiscountPrice = useMemo(() => {
    return checkedCarts
      .map((cartItem) => {
        return (
          ((cartItem.product.price * (cartItem.product.discount || 0)) / 100) *
          (cartItem.quantity +
            cartItem.options
              .map((option) => option.quantity)
              .reduce((acc, cur) => acc + cur, 0))
        );
      })
      .reduce((acc, cur) => acc + cur, 0);
  }, [checkedCarts]);

  const totalDeliveryPrice = useMemo(() => {
    return checkedCarts.length * DELIVERY_PRICE;
  }, [checkedCarts]);

  const totalAllPrice = useMemo(() => {
    return totalOriginalPrice - totalDiscountPrice + totalDeliveryPrice;
  }, [totalOriginalPrice, totalDiscountPrice, totalDeliveryPrice]);

  // 장바구니 데이터 초기화 server -> zustand
  useEffect(() => {
    const getCart = async () => {
      if (!isDataLoaded && user) {
        setIsLoading(true);
        setDataLoaded();
        const cartItems = await getCartItems(user.id);
        if (cartItems) {
          setInitData(cartItems);
          console.log("cart store init");
          setIsLoading(false);
        }
      }
    };
    getCart();
  }, [user, isDataLoaded, setDataLoaded, setInitData]);

  const handleSelectAllClick = useCallback(() => {
    setIsSelectAllClick((prev) => !prev);
    useCartStore.setState((state) => ({
      cart: state.cart.map((cartItem) => ({
        ...cartItem,
        checked: !isSelectAllClick,
      })),
    }));
  }, [isSelectAllClick]);

  const handleDeleteClick = useCallback(() => {
    if (checkedCarts.length > 0) {
      checkedCarts.forEach((item) => {
        removeFromCart({
          productId: item.productId,
        });
        deleteCartItems(item.productId);
        substractToCartItemCount();
      });
    }
  }, [checkedCarts, removeFromCart, substractToCartItemCount]);

  const handleOrderClick = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      try {
        const res = await orderCartItems(checkedCarts);
        if (!res?.ok) {
          alert("로그인을 해주세요.");
          router.push("/login");
        } else if (res?.ok) {
          alert("주문이 완료되었습니다.");
          checkedCarts.forEach((item) => {
            removeFromCart({ productId: item.productId });
          });
          router.push("/");
        } else {
          alert("Error : 주문이 취소되었습니다. 관리자에게 문의해주세요.");
          router.push("/contact");
        }
      } catch (error) {
        console.log("Error : ", error);
      }
    },
    [checkedCarts, removeFromCart, router],
  );

  const handleBackButton = () => {
    router.back();
  };
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return (
    <>
      <div className="wrapper pt-24">
        <div className="divide-y-[1px] shadow-xl ">
          <CartHeader itemsCount={cart.length} />

          {/* check */}
          <div className=" py-5 text-sm">
            <div className="inner-content px-2 lg:max-w-screen-lg lg:px-0 xl:max-w-screen-xl">
              <div className="flex gap-x-2 divide-x-2">
                <div>
                  <CheckAllButton
                    onClick={handleSelectAllClick}
                    isSelect={isSelectAllClick}
                  />
                </div>
                <div className="px-2">
                  <DeleteButton onClick={handleDeleteClick} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* contents */}
        <div className="bg-gray-200 py-4 sm:py-10 ">
          <div className="m-auto max-w-screen-lg rounded-md px-2 shadow-xl lg:px-0 xl:max-w-screen-xl">
            {/* header */}
            <ProductListHeader
              isSelect={isSelectAllClick}
              onClick={handleSelectAllClick}
            />

            <ProductList cart={cart} isLoading={isLoading} />

            {/* Total */}
            <PriceSummary
              totalOriginalPrice={totalOriginalPrice}
              totalDiscountPrice={totalDiscountPrice}
              totalDeliveryPrice={totalDeliveryPrice}
              totalAllPrice={totalAllPrice}
            />

            {/* Back & Order Button */}
            <div className="flex justify-center gap-x-10 py-5">
              <button
                onClick={handleBackButton}
                className="w-1/2 rounded-md border border-amber-500 p-5 px-8 font-bold  text-amber-500 shadow-md sm:w-auto sm:p-5 sm:px-16 sm:text-xl"
              >
                돌아가기
              </button>

              <button
                onClick={handleOrderClick}
                className="w-1/2 rounded-md bg-amber-500 p-5 px-8 font-bold text-white shadow-md sm:w-auto sm:p-5 sm:px-16 sm:text-xl"
              >
                주문하기
              </button>
            </div>
          </div>
        </div>

        {/* Relate product */}
        <div className="h-32 sm:h-96"></div>
      </div>
    </>
  );
};

export default Cart;
