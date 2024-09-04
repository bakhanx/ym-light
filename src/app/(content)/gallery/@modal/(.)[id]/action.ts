"use server";

import db from "@/libs/db";
import getSession from "@/libs/session";
import { revalidateTag } from "next/cache";

export const likeGallery = async (galleryId: number) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        userId: session.id,
        galleryId,
      },
    });
    revalidateTag(`like-status-${galleryId}`);
    revalidateTag("gallery");
    
  } catch (e) {
    console.log("error : ", e);
  }
};

export const dislikeGallery = async (galleryId: number) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const session = await getSession();
  try {
    await db.like.delete({
      where: {
        id: {
          userId: session.id,
          galleryId,
        },
      },
    });
    revalidateTag(`like-status-${galleryId}`);
    revalidateTag("gallery");
  } catch (e) {
    console.log("error : ", e);
  }
};
