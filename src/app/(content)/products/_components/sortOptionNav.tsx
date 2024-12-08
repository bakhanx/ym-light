import SortButton from "./sortButton";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

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
    <>
      {/* PC */}
      <div className="hidden border-t-2 border-black bg-gray-200 py-4 sm:mt-8 sm:block w-full">
        <div className="flex gap-2 px-2 text-sm">
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

      {/* mobile */}
      <div className="flex items-center justify-end sm:flex-col sm:items-baseline sm:justify-between">
        <div className="relative pr-2 sm:hidden">
          <select
            value={sortType}
            onChange={(e) => handleSortTypeChange(e.target.value)}
            className="block w-full appearance-none rounded-md bg-transparent py-2 pr-6 text-end text-sm"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-1 top-1/2 size-5 -translate-y-1/2 transform text-gray-500" />
        </div>
      </div>
    </>
  );
};
