"use client";

import { HandThumbUpIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { InitialGalleryListType } from "../../page";
import getMoreGalleryList from "../../actions/getGalleryList";
import Loader from "@/components/loader";
import { EyeIcon } from "@heroicons/react/16/solid";
import { BLUR_DATA_URL_GRAY } from "../../../../../../public/images/base64/blur-gray-skeleton";

type GalleryListProps = {
  initialGalleryList: InitialGalleryListType;
};

const GalleryList = ({ initialGalleryList }: GalleryListProps) => {
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [galleryList, setGalleryList] = useState(initialGalleryList);
  const [isLastPage, setIsLastPage] = useState(false);
  const trigger = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver,
      ) => {
        const element = entries[0];
        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setIsLoading(true);
          const newGalleryList = await getMoreGalleryList(page + 1);
          if (newGalleryList.length !== 0) {
            setPage((prev) => prev + 1);
            setGalleryList((prev) => [...prev, ...newGalleryList]);
          } else {
            setIsLastPage(true);
          }
          setIsLoading(false);
        }
      },
      { threshold: 1.0 },
    );

    if (trigger.current) {
      observer.observe(trigger.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [page]);

  return (
    <>
      <div className="grid  grid-cols-3 gap-2">
        {galleryList.map((gallery) => (
          <Link href={`gallery/${gallery.id}`} key={gallery.id} scroll={false}>
            <div className="relative flex aspect-square items-center justify-center bg-slate-200 ">
              <Image
                alt={String(gallery.id)}
                src={`${gallery.photo}/hvga`}
                fill
                sizes="1"
                quality={90}
                className="object-cover"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL_GRAY}
              />
              <div className="group absolute  h-full w-full">
                <div className="invisible h-full w-full group-hover:visible">
                  <div
                    className="flex h-full w-full items-center justify-center gap-x-4 text-sm text-white sm:gap-x-10 sm:text-base"
                    style={{
                      backgroundColor: `rgba(0,0,0,0.5)`,
                    }}
                  >
                    <div className="flex items-center gap-x-1 sm:gap-x-2">
                      <EyeIcon className="size-4 sm:size-5" />
                      <span>{gallery.views}</span>
                    </div>
                    <div className="flex items-center gap-x-1 sm:gap-x-2">
                      <HandThumbUpIcon className="size-4 sm:size-5" />
                      {/* count of hearts */}
                      <span>{gallery._count.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <span
        ref={trigger}
        className="mx-auto mt-10 flex items-center justify-center"
      >
        {isLoading && <Loader />}
      </span>
    </>
  );
};

export default GalleryList;
