"use server"

import db from "@/libs/db";
import { revalidatePath, revalidateTag } from "next/cache";

export const deleteGallery = async (id: number) => {
  await db.gallery.delete({
    where: {
      id: Number(id),
    },
  });

  revalidatePath("/manage/gallery/edit");
  revalidateTag("gallery");
};
