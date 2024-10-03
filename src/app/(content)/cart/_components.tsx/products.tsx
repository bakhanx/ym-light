import { cls, formatOfPrice } from "@/libs/utils";
import { CartItem, useCartStore } from "@/store/useCartStore";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type ProductsProps = {
  cartItem: CartItem;
  index: number;
  isSelectAllClick: boolean;
};

const Products = ({
  cartItem: { productInfo, optionInfoList },
  index,
  isSelectAllClick,
}: ProductsProps) => {
  // 가격 정리

  // origin price
  // discount Rate
  // discount price
  // discounted price
  // delivery price
  // origin total price
  // discount total price
  // discounted total price
  // option total price
  // All total price

  // 1. 원래가격
  const _originProductPrice = productInfo.product.price;

  const _optionProductPrice =
    optionInfoList
      .map(
        (option) =>
          (productInfo.product.price + option.price) * option.quantity,
      )
      .reduce((acc, cur) => acc + cur, 0 ) || _originProductPrice * productInfo.quantity;

  const _productQuantity =
    productInfo.quantity +
    optionInfoList
      .map((option) => option.quantity)
      .reduce((acc, cur) => acc + cur, 0);

  const _discountRate = productInfo.product.discount || 0;
  const _discountPrice = _originProductPrice * (_discountRate / 100);
  // 2. 할인된 가격
  const _discountedProductPrice = _originProductPrice - _discountPrice;
  
  const _deliveryPrice = 7000;

  // 선택상품금액
  const _selectProductPrice =
    optionInfoList.length > 0 ? _optionProductPrice : _originProductPrice * _productQuantity;

  const _discountTotalPrice = _discountPrice * _productQuantity;
  const _pureTotalPrice = _selectProductPrice - _discountTotalPrice;
  const _TotalPrice = _pureTotalPrice + _deliveryPrice;
  const { cart } = useCartStore((state) => state);

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

  useEffect(() => {}, [cart, index]);

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
                  alt={`${productInfo.product.title}`}
                  src={`${productInfo.product.photo}/thumbnail`}
                  fill
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex w-full flex-col px-5 sm:px-10">
              <div className="flex flex-col">
                <strong>{productInfo.product.title}</strong>

                <div className="flex flex-col gap-x-2 text-sm sm:text-base">
                  {_discountRate > 0 ? (
                    <>
                      <div className="text-xs text-gray-500 line-through md:text-sm ">
                        {formatOfPrice(_originProductPrice)}원
                      </div>

                      <div className="flex gap-x-2 ">
                        <span className="font-bold text-red-600  ">
                          {_discountRate}%
                        </span>
                        <span className="font-semibold">
                          {formatOfPrice(_discountedProductPrice)}원
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="font-semibold">
                      {formatOfPrice(_originProductPrice)}원
                    </div>
                  )}
                </div>
                {optionInfoList.length === 0 && (
                  <div className="pt-2 text-sm text-gray-500">
                    상품개수 : {productInfo.quantity}개
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Option */}
          {optionInfoList !== null && (
            <ul className="mt-4 flex flex-col gap-y-4 bg-gray-50  p-2 text-sm text-gray-600 sm:text-base [&>li]:border-b-[1px] [&>li]:py-2">
              {optionInfoList.map((optionInfo) => (
                <li key={optionInfo.option?.index}>
                  <div className="flex items-start justify-between">
                    <span>
                      {optionInfo.option?.index}. {optionInfo.option?.name} |{" "}
                      {optionInfo.quantity}개
                    </span>
                    <div className="flex gap-x-2">
                      <span>
                        {" "}
                        ( +
                        {formatOfPrice(
                          (optionInfo.option?.price || 0) * optionInfo.quantity,
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
          <button className="absolute right-0 text-gray-400 sm:right-6">
            <XMarkIcon className="h-6 w-6 stroke-2" />
          </button>
        </div>

        {/* Price */}
        <div className="text-sm sm:text-base lg:flex lg:w-[30%] lg:justify-center lg:divide-x-[1px]">
          <div className="flex items-center justify-between gap-x-5 px-4 sm:px-20 lg:w-1/2 lg:justify-center lg:p-5">
            <span className="text-gray-500 lg:hidden">선택상품금액</span>
            <span className="lg:hidden">
              {formatOfPrice(_selectProductPrice)}원
            </span>
            {/* 할인된 총 상품금액 (배송비x) */}
            <span className="hidden lg:block">
              {formatOfPrice(_pureTotalPrice)}원
            </span>
          </div>
          <div className="flex items-center justify-between gap-x-5 px-4 sm:hidden sm:px-20 lg:w-1/2 lg:justify-center lg:p-5">
            <span className="text-gray-500 lg:hidden lg:text-black ">
              할인금액
            </span>
            <span className="text-red-500 lg:text-black">
              -{formatOfPrice(_discountTotalPrice)}원
            </span>
          </div>

          <div className="flex items-center justify-between gap-x-5 px-4 sm:px-20 lg:w-1/2 lg:justify-center lg:p-5 ">
            <span className="text-gray-500 lg:hidden">총 배송비</span>
            <span>{formatOfPrice(_deliveryPrice)}원</span>
          </div>
        </div>
      </div>

      {/* Total Price */}
      <div className="w-full items-center justify-center lg:flex lg:border-t lg:py-5">
        <div className="hidden items-center gap-x-20 lg:flex">
          <div className="flex flex-col text-center">
            <span>선택상품금액</span>
            <span className="font-bold">
              {formatOfPrice(_selectProductPrice)}원
            </span>
          </div>

          <div className="">-</div>

          <div className="flex flex-col text-center">
            <span className="text-red-500 lg:text-black">할인금액</span>
            <span className="font-bold text-red-500">
              {formatOfPrice(_discountTotalPrice)}원
            </span>
          </div>

          <div className="font-bold">+</div>

          <div className="flex flex-col text-center">
            <span>총 배송비</span>
            <span className="font-bold">{formatOfPrice(_deliveryPrice)}원</span>
          </div>
          <div className="hidden lg:block">=</div>
        </div>

        <div className="flex items-center justify-between gap-x-5 px-4 text-center   sm:px-20 lg:flex-col lg:justify-center">
          <span className="font-bold">주문금액</span>
          <span className="font-bold text-amber-500">
            {formatOfPrice(_TotalPrice)}원
          </span>
        </div>
      </div>
    </div>
  );
};

export default Products;
