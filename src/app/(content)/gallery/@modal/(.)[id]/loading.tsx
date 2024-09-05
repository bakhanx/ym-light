/* Skeleton */

import React from "react";

import {
  BoltIcon,
  EyeIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import Loader from "@/components/loader";

const Loading = () => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center">
      <div className="absolute h-full w-full bg-black opacity-70" />

      <div className="absolute flex h-full w-full max-w-screen-sm flex-col justify-center bg-slate-50 sm:h-[75%] sm:w-[50%] ">
        <div className="flex h-full w-full items-center justify-center shadow-xl">
          <button className="absolute right-5 top-5 z-50 text-neutral-200">
            <XMarkIcon className="size-10" />
          </button>
          <div className="flex h-full w-full flex-col justify-start gap-x-5 ">
            {/* Image */}
            <div className="relative flex h-[75%] w-full bg-black">
              <Loader/>
            </div>

            {/* Text */}
            <div className="flex h-[25%] w-full flex-col p-2 text-sm">
              <div className="flex h-full flex-col">
                {/* button - Like, Comment*/}
                <div className="flex justify-between">
                  <div className="flex gap-x-2">
                    <HandThumbUpIcon className="size-5" />
                    <div className="flex gap-x-1">
                      <EyeIcon className="size-5" />
                    </div>
                  </div>
                </div>

                <div className="flex h-full flex-col justify-between ">
                  {/* Contents */}
                  <div className="items flex gap-x-1">
                    <div className="shrink-0 font-semibold">YM Light</div>

                    <div className="mt-1 flex h-3 w-3 items-center rounded-full bg-black ">
                      <BoltIcon className="size-3 rounded-full text-amber-300" />
                    </div>

                    <div className="w-[80%] whitespace-pre-wrap"></div>
                  </div>
                  {/* Tags */}
                  <div className="text-sm font-semibold text-blue-500"></div>

                  {/* Date */}
                  <div className="text-gray-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
