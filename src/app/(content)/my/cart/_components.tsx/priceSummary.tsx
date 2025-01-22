import { formatPrice } from "@/utils/formatPrice";
import React from "react";

const PriceSummary = ({
  totalOriginalPrice,
  totalDiscountPrice,
  totalDeliveryPrice,
  totalAllPrice,
}: {
  totalOriginalPrice: number;
  totalDiscountPrice: number;
  totalDeliveryPrice: number;
  totalAllPrice: number;
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-md border-4 border-amber-300 bg-white px-2 py-6 shadow-md md:flex-row md:px-2">
      <div className="flex w-full items-center justify-between gap-x-1 px-4 md:w-[70%] md:gap-x-4 md:border-r lg:justify-center lg:gap-x-12">
        <div className="flex flex-col text-center text-sm md:text-base">
          <span className=" text-gray-400">상품금액</span>
          <span className="font-bold">{formatPrice(totalOriginalPrice)}원</span>
        </div>
        <div>
          <span className="text-2xl lg:text-4xl ">-</span>
        </div>
        <div className="flex flex-col text-center text-sm md:text-base ">
          <span className="text-gray-400">할인금액</span>
          <span className="font-bold text-red-500">
            {formatPrice(totalDiscountPrice)}원
          </span>
        </div>

        <div>
          <span className="text-2xl lg:text-4xl ">+</span>
        </div>

        <div className="flex flex-col text-center text-sm md:text-base">
          <span className="text-gray-400">배송비</span>
          <span className="font-bold text-green-500">
            {formatPrice(totalDeliveryPrice)}원
          </span>
        </div>
      </div>

      <div className="mt-4 flex w-full flex-col items-end justify-end pr-4 md:mt-0 md:w-[30%] md:pt-0 md:items-center md:pr-0 ">
        <span className="font-bold text-gray-600">총 금액</span>
        <span className="text-lg font-bold  text-blue-500 lg:text-2xl">
          {formatPrice(totalAllPrice)}원
        </span>
      </div>
    </div>
  );
};

export default PriceSummary;
