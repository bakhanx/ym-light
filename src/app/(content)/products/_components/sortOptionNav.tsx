import { Dispatch, SetStateAction } from "react";
import SortButton from "./sortButton";

const sortOptions = [
  { value: "popularity", label: "인기순" },
  { value: "latest", label: "최신등록순" },
  { value: "lowToHigh", label: "낮은가격순" },
  { value: "highToLow", label: "높은가격순" },
  { value: "highRate", label: "할인율순" },
];

type sortType = (typeof sortOptions)[number]["value"];

type SortOptionNav = {
  sortType: sortType;
  handleSortTypeChange: (newSortType: string) => void;
};

export const SortOptionNav = ({
  sortType,
  handleSortTypeChange,
}: SortOptionNav) => {
  return (
    <div className="hidden sm:block sm:mt-8 py-4 bg-gray-200 border-t-2 border-black">
      <div className="flex gap-2 text-sm px-2">
        {sortOptions.map((option) => (
          <SortButton
            key={option.value}
            sortType={sortType}
            handleSortTypeChange={handleSortTypeChange}
            type={option.value}
          >
            {option.label}
          </SortButton>
        ))}
      </div>
    </div>
  );
};
