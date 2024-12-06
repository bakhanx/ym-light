import React from "react";

type SortButtonType = {
  sortType: string;
  type: string;
  handleSortTypeChange: (newSortType: string) => void
  children: string;
};

const SortButton = ({
  sortType,
  handleSortTypeChange,
  type,
  children,
}: SortButtonType) => {
  return (
    <button
      onClick={() => handleSortTypeChange(type)}
      className={`rounded-full p-2 px-4 border-[1px] border-gray-300 ${sortType === type ? "bg-[#181a2a] text-white border-none" : "bg-gray-100 text-gray-700"}`}
    >
      {children}
    </button>
  );
};

export default SortButton;
