import db from "@/utils/db";
import React from "react";

const getProducts = async () => {
  const products = await db.product.findMany({
    orderBy:{
      updated_at:"desc"
    }
  });

  return products
};

export default getProducts;
