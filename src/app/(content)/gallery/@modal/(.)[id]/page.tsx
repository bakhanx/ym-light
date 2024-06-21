import { BoltIcon, PhotoIcon } from "@heroicons/react/16/solid";
import { notFound } from "next/navigation";

import React from "react";
import db from "@/libs/db";

import Image from "next/image";

import BackButton from "../_components/backButton";
import DateTime from "@/components/datetime";
import {
  ChatBubbleLeftEllipsisIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";

type Props = {
  params: {
    id: string;
  };
};

` getGallery Schema
id
writer
photo
content
created_at (time ago)
isUpdated
likes
comments

link (첨부 링크)
`;

const getGallery = async (id: number) => {
  const gallery = await db.gallery.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      content: true,
      photo: true,
      tags: true,
      created_at: true,
      updated_at: true,
    },
    
  });
  return gallery;
};

// const getCachedProduct = nextCache(
//   (id) => getProduct(id),
//   [`product-${id}`],
//   { tags: [`product-${id}`],}
// );

const Modal = async ({ params }: Props) => {
  const gallery = await getGallery(Number(params.id));
  if (!gallery) {
    return notFound();
  }

  return (
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
                    className="z-40"
                    objectFit="contain"
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
                <div className="flex gap-x-2 py-2 ">
                  <HandThumbUpIcon className="h-5 w-5" />
                  <ChatBubbleLeftEllipsisIcon className="h-5 w-5" />
                </div>

                <div className="flex h-full flex-col justify-between ">
                  {/* Contents */}
                  <div className="flex items gap-x-1">

                    <div className="font-semibold shrink-0">YM Light</div>

                    <div className="flex h-3 w-3 mt-1 items-center rounded-full bg-black ">
                      <BoltIcon className="rounded-ful h-3 w-3 text-amber-300" />
                    </div>

                    <div className="w-[80%] whitespace-pre-wrap">{gallery.content}</div>
                  </div>
                  {/* Tags */}
                  <div className="text-sm font-semibold text-blue-500">
                    {gallery.tags.map((tag) => tag.name)}
                  </div>

                  {/* Date */}
                  <div className="text-gray-500">
                    <DateTime date={gallery.created_at} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;
