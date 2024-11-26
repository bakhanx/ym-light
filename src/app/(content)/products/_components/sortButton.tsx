import React from "react";

type SortButtonType = {
  sortType: string;
  type: string;
  setSortType: (type: string) => void;
  children: string;
};

const SortButton = ({
  sortType,
  setSortType,
  type,
  children,
}: SortButtonType) => {
  return (
    <button
      onClick={() => setSortType(type)}
      className={`rounded-full p-2 px-4 ${sortType === type ? "bg-[#181a2a] text-white" : "bg-gray-100 text-gray-700"}`}
    >
      {children}
    </button>
  );
};

export default SortButton;
