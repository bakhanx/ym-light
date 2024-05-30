"use server"

import db from "@/libs/db";
import { revalidatePath, revalidateTag } from "next/cache";

export const deleteProduct = async (id:number) => {
  await db.product.delete({
    where: {
      id: Number(id),
    },
  });

  revalidateTag("product");
  revalidatePath("/manage/product/edit");
};
