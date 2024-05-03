import { BoltIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import React from "react";

const Gallery = () => {
  return (
    <div className="m-auto w-[100%-40px] max-w-screen-lg p-10 pt-20">
      <div className="flex items-center gap-x-20 p-16">
        <div className="h-28 w-28 rounded-full bg-slate-500" />
        <div className="flex flex-col gap-y-10">
          <div className="flex items-center gap-x-2">
            <span className="text-lg font-semibold">YM Light</span>
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black">
              <BoltIcon className="rounded-ful h-4 w-4 text-amber-300" />
            </div>
          </div>
          <div className="flex gap-x-10">
            <div>게시물 10</div>
            <div>방문자 243</div>
          </div>
        </div>
      </div>

      <div className="h-1 w-full border-t-2 p-4" />

      <div className="grid  grid-cols-3 gap-2">
        {[...Array(5)].map((e, i) => (
          <Link href={`gallery/${i}`} key={i} scroll={false}>
            <div className=" flex aspect-square items-center justify-center bg-slate-200">
              <div>사진{i}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
