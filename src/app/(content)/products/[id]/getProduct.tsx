"use server"

import db from "@/libs/db";

const getProduct = async (id : number) => {
  const product = await db.product.findUnique({
    where: {
      id
    },
  });
  return product;
};

export default getProduct;
