import React from "react";

const Loading = () => {
  return (
    <div className="mx-auto min-h-screen max-w-screen-xl px-2 xl:px-0 py-32">
      <div className="h-8 w-1/4  bg-slate-200 text-lg font-semibold sm:text-2xl" />
      <div className="grid grid-cols-2 gap-5 pt-10 sm:grid-cols-4">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="rounded-md">
            <div className="flex flex-col text-sm md:text-base">
              <div className="">
                <div className="relative aspect-square w-full overflow-hidden rounded-t-md border-[1px] border-white bg-slate-200"></div>
                <div className="flex h-28  flex-col justify-between border-2 bg-slate-100 p-2">
                  <p className="h-14  bg-slate-200"></p>
                  <div className="">
                    <div className="text-xs text-gray-500 line-through md:text-sm">
                      <div className="h-4  bg-slate-200"></div>
                    </div>
                    <div className="flex gap-x-2">
                     
                    </div>
                    <div className="font-semibold">
                      <div className="h-4 w-full  bg-slate-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
