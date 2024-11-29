"use server";

import db from "@/utils/db";
/**
 * 상품정보를 가져오는 함수
 * @param id - 상품 id
 */
const getProduct = async (id: number) => {
  const product = await db.product.findUnique({
    where: {
      id: +id,
    },
    include: {
      options: true,
    },
  });
  return product;
};

export default getProduct;
