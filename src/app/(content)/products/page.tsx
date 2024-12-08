"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { CategoryNav } from "./_components/categoryNav";
import { SortOptionNav } from "./_components/sortOptionNav";
import ProductList from "./_components/productList";
import Pagination from "./_components/pagination";
import getProducts from "./actions/getProducts";
import { categoryMap, LIMIT_COUNT } from "./utils/constants";

export type ProductListType = {
  category: string;
  id: number;
  title: string;
  price: number;
  discount: number | null;
  photos: string[];
  stock: number;
  created_at: Date;
  updated_at: Date;
};

const ProductsLayout = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const category = searchParams.get("category") || "all";
  const query = searchParams.get("query") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const sortType = searchParams.get("sortType") || "popularity";

  const [products, setProducts] = useState<ProductListType[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = useCallback(async () => {
    const { products, totalPages } = await getProducts({
      page,
      limit: LIMIT_COUNT,
      category,
      query,
      sortType,
    });
    setProducts(products);
    setTotalPages(totalPages);
  }, [page, category, query, sortType]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", newPage.toString());
    window.history.pushState({}, "", `${pathname}?${newParams.toString()}`);
    fetchData(); // Fetch data again after URL is updated
  };

  const handleSortTypeChange = (newSortType: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("sortType", newSortType);
    if (totalPages === 1) {
      newParams.delete("page");
    } else {
      newParams.set("page", "1");
    }
    window.history.pushState({}, "", `${pathname}?${newParams.toString()}`);
    fetchData(); // Fetch data again after URL is updated
  };

  return (
    <div className="mx-auto min-h-screen max-w-screen-xl px-4 py-32 xl:px-0">
      <CategoryNav />
      <div className="px-2 pt-8 text-xl font-bold">{categoryMap[category]}</div>
      <SortOptionNav
        sortType={sortType}
        handleSortTypeChange={handleSortTypeChange}
      />
      <ProductList products={products} />

      <div className="pt-8">
        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default ProductsLayout;
