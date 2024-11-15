import React from "react";

const CartHeader = ({ itemsCount }: { itemsCount: number }) => {
  return (
    <div className="flex items-center divide-x-[1px] py-5 sm:flex-col sm:items-stretch sm:divide-y-[1px] sm:py-0">
      <div className="sm:py-5">
        <div className="inner-content max-w-screen-xl px-2 sm:px-4 xl:px-0">
          <span className="text-xl font-bold sm:text-2xl md:text-3xl">
            장바구니
          </span>
        </div>
      </div>

      {/* total Qunatity */}
      <div className="sm:py-5">
        <div className="inner-content max-w-screen-xl px-2 sm:px-4 xl:px-0">
          <div className="flex gap-x-1 font-bold">
            <span className="text-base sm:text-lg md:text-xl">전체</span>
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-amber-200 p-3 text-lg">
              <span>{itemsCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartHeader;
