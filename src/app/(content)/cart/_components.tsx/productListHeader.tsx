import { cls } from "@/utils/cls";
import { CheckIcon } from "@heroicons/react/16/solid";
import React from "react";
import { boolean } from "zod";

const ProductListHeader = ({
  isSelect,
  onClick,
}: {
  isSelect: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <div>
      <div className="hidden border-b border-t-2 border-t-black bg-white p-2 text-center font-bold sm:flex sm:p-4">
        <button
          className={cls(
            isSelect
              ? "border-amber-400 bg-amber-400 text-white"
              : " border-amber-400 text-gray-400 ",
            "absolute flex items-center gap-x-1 rounded-md border-2 p-1",
          )}
          onClick={onClick}
        >
          <CheckIcon className="h-3 w-3 stroke-[3px] " />
        </button>

        <div className="hidden w-full sm:flex">
          <span className="w-[70%]">상품정보</span>
          <span className="w-[15%] ">상품금액</span>
          <span className="w-[15%] ">배송비</span>
        </div>
      </div>
    </div>
  );
};

export default ProductListHeader;
