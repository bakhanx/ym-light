"use server";

import db from "@/utils/db";
import React from "react";

const getStockOfProducts = async () => {
  const stock = await db.product.findMany({
    select: {
      title: true,
      stock: true,
    },
    orderBy: {
      stock: "asc",
    },
  });

  return stock;
};

export default getStockOfProducts;
