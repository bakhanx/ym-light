import db from "@/libs/db";
import {
  BoltIcon,
  ChatBubbleLeftEllipsisIcon,
  HandThumbUpIcon,
} from "@heroicons/react/16/solid";
import { unstable_cache as nextCache } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import profile from "@/../public/images/ym-light-001.jpg";

const getGallery = async () => {
  const gallery = await db.gallery.findMany({
    select: {
      id: true,
      photo: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return gallery;
};

const getCachedGallery = nextCache(getGallery, ["gallery"], {
  tags: ["gallery"],
});

const Gallery = async () => {
  const galleryList = await getCachedGallery();

  return (
    <div className="m-auto w-[100%-40px] max-w-screen-lg sm:p-10 px-4 pt-6 border-t-2">
      <div className=" flex flex-col">
        <div className="flex items-center gap-x-10 px-8 sm:pt-16 ">
          <div className="fill relative h-32 w-32 ">
            <Image alt="profile" src={profile} className="rounded-full" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-x-2">
              <span className="text-lg font-semibold">YM Light</span>

              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black">
                <BoltIcon className="h-4 w-4 rounded-full text-amber-300" />
              </div>
            </div>
            <div className="text-sm">Republic of Korea, Seoul (대한민국)</div>

            <div className="flex gap-x-10 pt-8">
              <div>
                게시물
                <span className="font-semibold">{galleryList.length}</span>
              </div>
              <div>
                방문자
                <span className="font-semibold">
                  {galleryList.length * 3 + 200}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 pb-16 pt-6">
          <div className="text-lg font-semibold"> 영맨조명</div>
          <div>조명 업계 경력 40년차</div>
        </div>
      </div>

      <div className="h-1 w-full border-t-2 p-4" />

      <div className="grid  grid-cols-3 gap-2">
        {galleryList.map((gallery) => (
          <Link href={`gallery/${gallery.id}`} key={gallery.id} scroll={false}>
            <div className="relative flex aspect-square items-center justify-center bg-slate-200 ">
              <Image
                alt={String(gallery.id)}
                src={`${gallery.photo}/hvga`}
                fill
                quality={90}
                className="object-cover"
              />
              <div className="group absolute  h-full w-full">
                <div className="invisible h-full w-full group-hover:visible">
                  <div
                    className="flex h-full w-full items-center justify-center gap-x-10 text-white"
                    style={{
                      backgroundColor: `rgba(0,0,0,0.5)`,
                    }}
                  >
                    <div className="flex items-center gap-x-2">
                      <ChatBubbleLeftEllipsisIcon className="h-5 w-5" />
                      {/* count of comments */}
                      <span>{10}</span>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <HandThumbUpIcon className="h-5 w-5" />
                      {/* count of hearts */}
                      <span>5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
