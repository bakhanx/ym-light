import deleteCartItems from "@/app/(content)/cart/actions/deleteCartItems";
import { CartItemDetail, useCartStore } from "@/store/useCartStore";
import { useUserStore } from "@/store/useUserStore";
import { cls } from "@/utils/cls";
import { formatPrice } from "@/utils/formatPrice";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type ProductProps = {
  cartItem: CartItemDetail;
  index: number;
};

const Product = ({ cartItem, index }: ProductProps) => {
  // ======================== CONST ==========================
  // 1. 원래가격
  const _originProductPrice = cartItem.product.price;

  const _optionProductPrice =
    cartItem.options
      .map(
        (option) =>
          (cartItem.product.price + (option.option.price || 0)) *
          option.quantity,
      )
      .reduce((acc, cur) => acc + cur, 0) ||
    _originProductPrice * cartItem.quantity;

  const _productQuantity =
    cartItem.quantity +
    cartItem.options
      .map((option) => option.quantity)
      .reduce((acc, cur) => acc + cur, 0);

  const _discountRate = cartItem?.product.discount || 0;
  const _discountPrice = _originProductPrice * (_discountRate / 100);
  // 2. 할인된 가격
  const _discountedProductPrice = _originProductPrice - _discountPrice;

  const _deliveryPrice = 7000;

  // 선택상품금액
  const _selectProductPrice =
    cartItem?.options?.length > 0
      ? _optionProductPrice
      : _originProductPrice * _productQuantity;

  const _discountTotalPrice = _discountPrice * _productQuantity;
  const _pureTotalPrice = _selectProductPrice - _discountTotalPrice;
  const _TotalPrice = _pureTotalPrice + _deliveryPrice;

  // ============================================================

  const { cart, removeFromCart } = useCartStore((state) => state);
  const { substractToCartItemCount } = useUserStore();
  useEffect(() => {
    useCartStore.setState((state) => ({
      cart: state.cart.map((cartItem) => ({ ...cartItem, checked: true })),
    }));
  }, []);

  const updatedCheckedStatus = (index: number, checked: boolean) => {
    useCartStore.setState((state) => ({
      cart: state.cart.map((cartItem, _index) =>
        _index === index ? { ...cartItem, checked } : cartItem,
      ),
    }));
  };
  const handleSelectClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    event.preventDefault();
    updatedCheckedStatus(index, !cart[index].checked);
  };

  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeFromCart({
      productId: cartItem.productId,
    });
    deleteCartItems(cartItem.productId);
    substractToCartItemCount();
  };

  return (
    <div className="flex flex-col px-2 py-4 sm:px-4">
      <div className="flex w-full flex-col justify-center lg:flex-row lg:divide-x-[1px]">
        <div className="relative flex flex-col p-2 sm:p-10 lg:w-[70%]">
          <div className="flex">
            <button
              className={cls(
                cart[index].checked
                  ? "border-amber-400 bg-amber-400 text-white"
                  : " border-amber-400 text-gray-400 ",
                "absolute left-0 flex items-center gap-x-1 rounded-md border-2 p-1",
              )}
              onClick={(e) => handleSelectClick(e, index)}
            >
              <CheckIcon className="h-3 w-3 stroke-2" />
            </button>

            {/* Image */}
            <div className="relative pl-6 sm:pl-0">
              <div className="relative h-20 w-20 bg-slate-500">
                <Image
                  alt={`${cartItem.product.title}`}
                  src={`${cartItem.product.photos[0]}/thumbnail`}
                  fill
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex w-full flex-col px-5 sm:px-10">
              <div className="flex flex-col">
                <strong>{cartItem.product.title}</strong>

                <div className="flex flex-col gap-x-2 text-sm sm:text-base">
                  {_discountRate > 0 ? (
                    <>
                      <div className="text-xs text-gray-500 line-through md:text-sm ">
                        {formatPrice(_originProductPrice)}원
                      </div>

                      <div className="flex gap-x-2 ">
                        <span className="font-bold text-red-600  ">
                          {_discountRate}%
                        </span>
                        <span className="font-semibold">
                          {formatPrice(_discountedProductPrice)}원
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="font-semibold">
                      {formatPrice(_originProductPrice)}원
                    </div>
                  )}
                </div>
                {cartItem.options.length === 0 && (
                  <div className="pt-2 text-sm text-gray-500">
                    상품개수 : {cartItem.quantity}개
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Option */}
          {cartItem.options.length > 0 && (
            <ul className="mt-4 flex flex-col gap-y-4 bg-gray-50  p-2 text-sm text-gray-600 sm:text-base [&>li]:border-b-[1px] [&>li]:py-2">
              {cartItem.options.map((option, idx) => (
                // 옵션 인덱스 필요
                <li key={option.option.index}>
                  <div className="flex items-start justify-between">
                    <span>
                      {option.option.index}. {option.option.name} |{" "}
                      {option.quantity}개
                    </span>
                    <div className="flex gap-x-2">
                      <span>
                        {" "}
                        ( +
                        {formatPrice(
                          (option.option.price || 0) * option.quantity,
                        )}
                        원 )
                      </span>
                      <button className=" text-gray-400">
                        <XMarkIcon className="h-4 w-4 stroke-2" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Delete Button */}
          <button
            onClick={handleDeleteClick}
            className="absolute right-0 text-gray-400 sm:right-6"
          >
            <XMarkIcon className="h-6 w-6 stroke-2" />
          </button>
        </div>

        {/* Price */}
        <div className="text-sm sm:text-base lg:flex lg:w-[30%] lg:justify-center lg:divide-x-[1px]">
          <div className="flex items-center justify-between gap-x-5 px-4 sm:px-10 lg:w-1/2 lg:justify-center lg:p-5">
            <span className="text-gray-500 lg:hidden">선택상품금액</span>
            <span className="lg:hidden">
              {formatPrice(_selectProductPrice)}원
            </span>
            {/* 할인된 총 상품금액 (배송비x) */}
            <span className="hidden lg:block">
              {formatPrice(_pureTotalPrice)}원
            </span>
          </div>
          <div className="flex items-center justify-between gap-x-5 px-4 lg:hidden sm:px-10 lg:w-1/2 lg:justify-center lg:p-5">
            <span className="text-gray-500 lg:hidden lg:text-black ">
              할인금액
            </span>
            <span className="text-red-500 lg:text-black">
              -{formatPrice(_discountTotalPrice)}원
            </span>
          </div>

          <div className="flex items-center justify-between gap-x-5 px-4 sm:px-10 lg:w-1/2 lg:justify-center lg:p-5 ">
            <span className="text-gray-500 lg:hidden">총 배송비</span>
            <span>{formatPrice(_deliveryPrice)}원</span>
          </div>
        </div>
      </div>

      {/* Total Price */}
      <div className="w-full items-center justify-center lg:flex lg:border-t lg:py-5 ">
        <div className="hidden items-center justify-between pl-8 sm:w-[70%] lg:flex">
          <div className="flex flex-col text-center">
            <span>선택상품금액</span>
            <span className="font-bold">
              {formatPrice(_selectProductPrice)}원
            </span>
          </div>

          <div className="font-bold">-</div>

          <div className="flex flex-col text-center">
            <span className="text-red-500 lg:text-black">할인금액</span>
            <span className="font-bold text-red-500">
              {formatPrice(_discountTotalPrice)}원
            </span>
          </div>

          <div className="font-bold">+</div>

          <div className="flex flex-col text-center">
            <span>총 배송비</span>
            <span className="font-bold">{formatPrice(_deliveryPrice)}원</span>
          </div>
          <div className="hidden lg:block">=</div>
        </div>

        <div className="flex items-center justify-between gap-x-5 px-4 text-center lg:w-[30%] sm:px-10 lg:flex-col lg:justify-center">
          <span className="font-bold">주문금액</span>
          <span className="font-bold text-amber-500">
            {formatPrice(_TotalPrice)}원
          </span>
        </div>
      </div>
    </div>
  );
};

export default Product;
