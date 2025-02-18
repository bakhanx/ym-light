import db from "@/utils/db";
import { BoltIcon } from "@heroicons/react/16/solid";

import Image from "next/image";
import profile from "@/../public/images/ym-light-001.jpg";
import GalleryList from "./@modal/_components/gallery-list";
import { Prisma } from "@prisma/client";
import { unstable_cache as nextCache } from "next/cache";
import getSession from "@/utils/session";
import { useEffect } from "react";
import { BLUR_DATA_PROFILE } from "../../../../public/images/base64/blur-profile";
import { headers } from "next/headers";
import { addLog } from "./actions/addLog";

const getGalleryCount = async () => {
  const galleryCount = await db.gallery.count();
  return galleryCount;
};

const getInitialGalleryList = async () => {
  const gallery = await db.gallery.findMany({
    select: {
      id: true,
      photo: true,
      views: true,
      _count: {
        select: {
          likes: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
    take: 3,
  });
  return gallery;
};

const getCachedGalleryList = nextCache(
  getInitialGalleryList,
  ["gallery-list"],
  {
    tags: ["gallery"],
    revalidate: 60,
  },
);


const logCount = async () => {
  return await db.log.count();
};

export type InitialGalleryListType = Prisma.PromiseReturnType<
  typeof getInitialGalleryList
>;

const Gallery = async () => {
  const galleryCount = await getGalleryCount();
  const initialGalleryList = await getCachedGalleryList();
  await addLog();
  const visitorCount = await logCount();

  return (
    <div className="m-auto w-[100%-40px] border-t-2 px-2 py-8 sm:max-w-screen-md sm:px-4 xl:max-w-screen-lg xl:px-0">
      <div className=" flex flex-col px-4 py-20">
        <div className="flex items-center gap-x-10 ">
          <div className="fill relative h-24 w-24 shrink-0 sm:h-32 sm:w-32">
            <Image
              alt="profile"
              src={profile}
              placeholder="blur"
              blurDataURL={BLUR_DATA_PROFILE}
              className="rounded-full"
              priority
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-x-2">
              <span className="text-lg font-semibold">YM Light</span>

              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-black">
                <BoltIcon className="h-4 w-4 rounded-full text-amber-300" />
              </div>
            </div>
            <div className="flex flex-col text-sm">
              <span>Republic of Korea, Seoul </span>
              <span>(대한민국)</span>
            </div>

            <div className="flex gap-x-10 pt-8 text-sm sm:text-base">
              <div>
                게시물
                <span className="font-semibold">{galleryCount}</span>
              </div>
              <div>
                방문자
                <span className="font-semibold">{visitorCount + 300}</span>
              </div>
            </div>
          </div>
        </div>

        <div className=" pt-4 sm:pt-8">
          <div className="text-base font-semibold sm:text-lg"> 영맨조명</div>
          <div className="text-sm sm:text-base">조명 업계 경력 40년차</div>
        </div>
      </div>

      <div className="h-1 w-full border-t-2 p-4" />

      <GalleryList initialGalleryList={initialGalleryList} />
    </div>
  );
};

export default Gallery;
