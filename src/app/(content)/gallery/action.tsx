"use server";

import db from "@/libs/db";

const NUMBER_OF_GALLERY = 3;

const getMoreGalleryList = async (page: number) => {
  const galleryList = await db.gallery.findMany({
    select: {
      id: true,
      photo: true,
      views: true,
      _count: {
        select: { likes: true },
      },
    },
    skip: NUMBER_OF_GALLERY * page,
    take: NUMBER_OF_GALLERY,
    orderBy: {
      created_at: "desc",
    },
  });

  return galleryList;
};

export default getMoreGalleryList;
