import React from "react";

const CardSkeleton = ({ count = 4 }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex justify-center">
          <div className="h-[190px] w-[120px] rounded-xl bg-gray-300 min-[480px]:h-[284px] min-[480px]:w-[180px] sm:h-[316px] sm:w-[200px] md:h-[221px] md:w-[140px] lg:h-[316px] lg:w-[200px] xl:h-[379px] xl:w-[240px]">
            <div className="relative h-full rounded-xl bg-gray-400">
              <div className="h-full w-full animate-pulse bg-gray-500" />
              <div className="absolute bottom-0 z-20 flex w-full items-center justify-center rounded-b-md bg-black bg-opacity-50 px-2 py-3 text-xs text-white min-[480px]:py-5 sm:py-5 md:py-4 lg:py-7 lg:text-sm xl:text-base">
                <p className="truncate">Loading...</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardSkeleton;
