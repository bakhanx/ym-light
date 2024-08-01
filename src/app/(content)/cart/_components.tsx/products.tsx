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
  const initOptionTotalPrice = optionInfoList
    .map((optionInfo) => optionInfo.option.price || 0)
    .reduce((acc, cur) => acc + cur, 0);

  const productPrice = productInfo.product.price * productInfo.quantity;
  const optionPrice =
    optionInfoList.length > 0
      ? optionInfoList
          .map(
            (optionInfo) =>
              (productInfo.product.price + (optionInfo.option.price || 0)) *
              optionInfo.quantity,
          )
          .reduce((acc, cur) => acc + cur, 0)
      : 0;

  const initOriginTotalPrice = productPrice + optionPrice;

  const initDiscountTotalPrice =
    ((productInfo.product.price * (productInfo.product.discount || 0)) / 100) *
    (productInfo.quantity +
      optionInfoList
        .map((optionInfo) => optionInfo.quantity)
        .reduce((acc, cur) => acc + cur, 0));

  const { cart } = useCartStore((state) => state);

  useEffect(() => {
    useCartStore.setState((state) => ({
      cart: state.cart.map((cartItem) => ({ ...cartItem, checked: true })),
    }));
    console.log("set all true");
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

  useEffect(() => {
    console.log("index ", index, cart[index].checked);
  }, [cart, index]);

  const [optionTotalPrice, setOptionTotalPrice] =
    useState(initOptionTotalPrice);

  const [originTotalPrice, setOriginTotalPrice] =
    useState(initOriginTotalPrice);
  const [deliveryPrice, setDeliveryPrice] = useState(7000);
  const [discountTotalPrice, setDiscountTotalPrice] = useState(
    initDiscountTotalPrice,
  );

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
                  {productInfo.product.discount ? (
                    <>
                      <div className="text-xs text-gray-500 line-through md:text-sm ">
                        {formatOfPrice(productInfo.product.price)}원
                      </div>

                      <div className="flex gap-x-2 ">
                        <span className="font-bold text-red-600  ">
                          {productInfo.product.discount}%
                        </span>
                        <span className="font-semibold">
                          {formatOfPrice(
                            productInfo.product?.price *
                              ((100 - productInfo.product.discount) / 100),
                          )}
                          원
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="font-semibold">
                      {formatOfPrice(productInfo.product.price)}원
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
          {optionInfoList.length > 0 && (
            <ul className="mt-4 flex flex-col gap-y-4 bg-gray-50  p-2 text-sm text-gray-600 sm:text-base [&>li]:border-b-[1px] [&>li]:py-2">
              {optionInfoList.map((optionInfo) => (
                <li key={optionInfo.option.index}>
                  <div className="flex items-start justify-between">
                    <span>
                      {optionInfo.option.index}. {optionInfo.option.name} |{" "}
                      {optionInfo.quantity}개
                    </span>
                    <div className="flex gap-x-2">
                      <span>
                        {" "}
                        ( +{formatOfPrice(optionInfo.option.price!)}원 )
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
          <div className="flex items-center justify-between gap-x-5 px-4 sm:px-20 lg:w-1/2 lg:justify-center lg:p-5  ">
            <span className="text-gray-500 lg:hidden">선택상품금액</span>
            <span>{formatOfPrice(originTotalPrice)}원</span>
          </div>
          <div className="flex items-center justify-between gap-x-5 px-4 sm:hidden sm:px-20 lg:w-1/2 lg:justify-center lg:p-5">
            <span className="text-gray-500 lg:hidden lg:text-black ">
              할인금액
            </span>
            <span className="text-red-500 lg:text-black">
              {formatOfPrice(discountTotalPrice)}원
            </span>
          </div>

          <div className="flex items-center justify-between gap-x-5 px-4 sm:px-20 lg:w-1/2 lg:justify-center lg:p-5 ">
            <span className="text-gray-500 lg:hidden">총 배송비</span>
            <span>{formatOfPrice(deliveryPrice)}원</span>
          </div>
        </div>
      </div>

      {/* Total Price */}
      <div className="w-full items-center justify-center lg:flex lg:border-t lg:py-5">
        <div className="hidden items-center gap-x-20 lg:flex">
          <div className="flex flex-col">
            <span>선택상품금액</span>
            <span className="font-bold">
              {formatOfPrice(originTotalPrice)}원
            </span>
          </div>

          <div className="">-</div>

          <div className="flex flex-col text-center">
            <span className="text-red-500 lg:text-black">할인금액</span>
            <span className="font-bold text-red-500">
              {formatOfPrice(discountTotalPrice)}원
            </span>
          </div>

          <div className="font-bold">+</div>

          <div className="flex flex-col">
            <span>총 배송비</span>
            <span className="font-bold">{formatOfPrice(deliveryPrice)}원</span>
          </div>
          <div className="hidden lg:block">=</div>
        </div>

        <div className="flex items-center justify-between gap-x-5 px-4 sm:px-20   lg:flex-col lg:justify-center ">
          <span className="font-bold">주문금액</span>
          <span className="font-bold text-amber-500">
            {formatOfPrice(
              originTotalPrice + deliveryPrice - discountTotalPrice,
            )}
            원
          </span>
        </div>
      </div>
    </div>
  );
};

export default Products;
