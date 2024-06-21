"use client";

import {
  ChatBubbleLeftEllipsisIcon,
  HandThumbUpIcon,
} from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { InitialGalleryListType } from "../../page";
import getMoreGalleryList from "../../action";
import Spinner from "@/../public/loaders/Spin-1s-200px.svg";
import Loader from "@/components/loader";

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

      <span
        ref={trigger}
        className="mx-auto mt-10 flex items-center justify-center"
      >
        {isLoading && <Loader/>}
      </span>
      
    </>
  );
};

export default GalleryList;
