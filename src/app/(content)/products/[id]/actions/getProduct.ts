"use server"

import db from "@/utils/db";
import { unstable_cache as nextCache } from "next/cache";

const getProduct = async (id: number) => {
  try {
    const product = await db.product.findUnique({
      where: {
        id: +id,
      },
      select: {
        id: true,
        title: true,
        price: true,
        discount: true,
        photos: true,
        detailPhotos: true,
        color: true,
        material: true,
        category: true,
        size: true,
        stock: true,
        bulb: true,
        manufacturer: true,
        description: true,
        created_at: true,
        updated_at: true,
        options: true,
      },
    });
    return product;
  } catch (error) {
    console.error("getProduct Error", error);
    return null;
  }
};

export const getCachedProduct = async (id: number) => {
    const cachedProduct =  nextCache(
      async () => {
        return await getProduct(id);
      },
      [String(id)],  // 여기에서 id를 keyPart로 전달
      {
        tags: ["product"],
      }
    );

    return await cachedProduct()
  };