import { BoltIcon, EyeIcon, PhotoIcon } from "@heroicons/react/16/solid";
import { notFound } from "next/navigation";
import React from "react";
import db from "@/utils/db";
import Image from "next/image";
import BackButton from "../_components/backButton";
import PreventScroll from "@/utils/preventScroll";
import getSession from "@/utils/session";
import { unstable_cache as nextCache } from "next/cache";
import LikeButton from "../_components/likeButton";
import { formatDate } from "@/utils/formatDate";

type Props = {
  params: {
    id: string;
  };
};

const getGallery = async (id: number) => {
  try {
    const gallery = await db.gallery.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
      select: {
        id: true,
        content: true,
        photo: true,
        tags: true,
        views: true,
        created_at: true,
        updated_at: true,
      },
    });
    return gallery;
  } catch (e) {
    return null;
  }
};

const getCachedGallery = (galleryId: number) => {
  const cachedOperator = nextCache(getGallery, [`gallery-detail`], {
    tags: [`gallery-detail-${galleryId}`],
    revalidate: 60,
  });

  return cachedOperator(galleryId);
};

const getLikeStatus = async (galleryId: number, userId: number) => {
  const isLiked = Boolean(
    await db.like.findFirst({
      where: {
        galleryId,
        userId,
      },
    }),
  );
  const likeCount = await db.like.count({
    where: {
      galleryId,
    },
  });
  return {
    likeCount,
    isLiked,
  };
};

const getCachedLikeStatus = async (galleryId: number) => {
  const session = await getSession();
  const userId = session.id;
  const cachedOperator = nextCache(getLikeStatus, ["gallery-like-status"], {
    tags: [`like-status-${galleryId}`],
  });
  return cachedOperator(galleryId, userId);
};

const Modal = async ({ params }: Props) => {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const gallery = await getCachedGallery(id);
  if (!gallery) {
    return notFound();
  }
  const { isLiked, likeCount } = await getCachedLikeStatus(id);

  return (
    <>
      <PreventScroll />
      <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center">
        <div className="absolute h-full w-full bg-black opacity-70" />

        <div className="absolute flex h-full w-full max-w-screen-sm flex-col justify-center bg-slate-50 sm:h-[75%] sm:w-[50%] ">
          <div className="flex h-full w-full items-center justify-center shadow-xl">
            <BackButton />
            <div className="flex h-full w-full flex-col justify-start gap-x-5 ">
              {/* Image */}
              <div className="relative flex h-[75%] w-full bg-black">
                {gallery.photo ? (
                  <>
                    <Image
                      src={`${gallery.photo}/public`}
                      alt="gallery"
                      quality={90}
                      fill
                      sizes="1"
                      className="z-40 object-contain"
                      
                    />
                  </>
                ) : (
                  <PhotoIcon className="h-28" />
                )}
              </div>

              {/* Text */}
              <div className="flex h-[25%] w-full flex-col p-2 text-sm">
                <div className="flex h-full flex-col">
                  {/* button - Like, Comment*/}
                  <div className="flex justify-between">
                    <div className="flex gap-x-2">
                      <LikeButton
                        isLiked={isLiked}
                        galleryId={id}
                        likeCount={likeCount}
                      />
                      <div className="flex gap-x-1">
                        <EyeIcon className="h-5 w-5 text-slate-600" />
                        <span>{gallery.views}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex h-full flex-col justify-between ">
                    {/* Contents */}
                    <div className="items flex gap-x-1">
                      <div className="shrink-0 font-semibold">YM Light</div>

                      <div className="mt-1 flex h-3 w-3 items-center rounded-full bg-black ">
                        <BoltIcon className="rounded-ful h-3 w-3 text-amber-300" />
                      </div>

                      <div className="w-[80%] whitespace-pre-wrap">
                        {gallery.content}
                      </div>
                    </div>
                    {/* Tags */}
                    <div className="text-sm font-semibold text-blue-500">
                      {gallery.tags.map((tag) => tag.name)}
                    </div>

                    {/* Date */}
                    <div className="text-gray-500">
                      {formatDate(gallery.created_at)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;
