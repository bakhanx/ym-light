import db from "@/libs/db";
import { BoltIcon } from "@heroicons/react/16/solid";

import Image from "next/image";
import profile from "@/../public/images/ym-light-001.jpg";
import GalleryList from "./@modal/_components/gallery-list";
import { Prisma } from "@prisma/client";
import { unstable_cache as nextCache } from "next/cache";

const getGallery = async () => {
  const gallery = await db.gallery.findMany({
    select: {
      id: true,
    },
  });
  return gallery;
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

const getCachedGalleryList = nextCache(getInitialGalleryList, ["gallery-list"], {
  tags: ["gallery"],
  revalidate:60
});

export type InitialGalleryListType = Prisma.PromiseReturnType<
  typeof getInitialGalleryList
>;

const Gallery = async () => {
  const gallery = await getGallery();
  const initialGalleryList = await getCachedGalleryList();

  return (
    <div className="m-auto w-[100%-40px] max-w-screen-lg border-t-2 px-4 py-8 sm:px-10 md:px-20">
      <div className=" flex flex-col px-4 py-4 sm:px-8 sm:py-20">
        <div className="flex items-center gap-x-10 ">
          <div className="fill relative h-24 w-24 shrink-0 sm:h-32 sm:w-32">
            <Image alt="profile" src={profile} className="rounded-full" />
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
                <span className="font-semibold">{gallery.length}</span>
              </div>
              <div>
                방문자
                <span className="font-semibold">
                  {gallery.length * 3 + 200}
                </span>
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
