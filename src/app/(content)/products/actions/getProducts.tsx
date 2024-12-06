"use server";

import db from "@/utils/db";
import { categoryMap, LIMIT_COUNT } from "../utils/constants";

type getProductsProps = {
  page: number;
  limit: number;
  category: string;
  query: string;
  sortType: string;
};

const getProducts = async ({
  page = 1,
  limit = LIMIT_COUNT,
  category,
  query,
  sortType,
}: getProductsProps) => {
  const offset = (page - 1) * limit;
  let where: any = {};
  if (category && category !== "all") {
    where.category = categoryMap[category] || category;
  }
  if (query) {
    where.title = { contains: query, mode: "insensitive" };
  }

  const orderBy: any = {};
  switch (sortType) {
    case "latest":
      orderBy.created_at = "desc";
      break;
    case "popularity":
      orderBy.stock = "desc";
      break;
    case "lowToHigh":
      orderBy.price = "asc";
      break;
    case "highToLow":
      orderBy.price = "desc";
      break;
    case "highRate":
      orderBy.discount = "desc";
      break;
    default:
      orderBy.updated_at = "desc";
  }

  const totalCount = await db.product.count({ where });
  const products = await db.product.findMany({
    where: category === "all" ? {} : where,
    orderBy,
    select: {
      id: true,
      title: true,
      discount: true,
      category: true,
      photos: true,
      price: true,
      stock: true,
      updated_at: true,
      created_at: true,
    },
    skip: offset,
    take: limit,
  });

  return {
    products,
    totalPages: Math.ceil(totalCount / limit),
  };
};

export default getProducts;
