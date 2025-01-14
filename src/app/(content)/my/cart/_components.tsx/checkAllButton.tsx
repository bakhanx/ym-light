import { cls } from "@/utils/cls";
import { CheckIcon } from "@heroicons/react/16/solid";
import React from "react";

const CheckAllButton = ({
  isSelect,
  onClick,
}: {
  isSelect: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      className={cls(
        isSelect
          ? "border-amber-400 bg-amber-400 text-white"
          : " border-amber-400 ",
        "flex items-center gap-x-1 rounded-md border-2 p-1 text-gray-600",
      )}
      onClick={onClick}
    >
      <CheckIcon className="h-3 w-3 stroke-[3px] " />

      <span>전체선택</span>
    </button>
  );
};

export default CheckAllButton;
