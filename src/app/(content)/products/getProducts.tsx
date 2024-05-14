import db from "@/libs/db";
import React from "react";

const getProducts = async () => {
  const products = await db.product.findMany({});

  return products
};

export default getProducts;
