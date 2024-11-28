import db from "@/utils/db";
import React from "react";
import Link from "next/link";

import { formatPrice } from "@/utils/formatPrice";
import { formatDate } from "@/utils/formatDate";
import DeleteForm from "@/app/(admin)/_components/deleteForm";
import { deleteProduct } from "../actions/deleteProduct";
import Table, { RowData } from "../../_components/table";
import Card from "../../_components/card";

const getProducts = async () => {
  const products = await db.product.findMany({
    select: {
      id: true,
      title: true,
      photos: true,
      price: true,
      discount: true,
      stock:true,
      created_at: true,
      updated_at: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  return products;
};

const Edit = async () => {
  const products = await getProducts();

  const headers = [
    "ID",
    "사진",
    "상품명",
    "할인율",
    "가격",
    "재고",
    "최근 수정일",
    "등록일",
    "",
  ];

  const data: RowData[][] =
    products.map((product) => [
      [product.id, "text-center"],
      [product.photos[0],"text-center"],
      [product.title, "text-left"],
      [`${product.discount || 0}%`, "text-center"],
      [`${formatPrice(product.price)}원`, "text-left whitespace-nowrap"],
      [product.stock, "text-left"],
      [formatDate(product.updated_at), "text-left"],
      [formatDate(product.created_at), "text-left"],
      [
        <div key={product.id} className="flex gap-x-2 xl:flex-col whitespace-nowrap">
          <Link href={`edit/${product.id}`}>
            <button className="bg-slate-200 p-2">편집</button>
          </Link>
          <DeleteForm id={product.id} action={deleteProduct} />
        </div>,
        "text-center",
      ],
    ]);

  return (
    <div className="mx-auto min-h-screen max-w-screen-xl px-2 pt-24 xl:px-0">
      <h1 className="text-xl font-bold">상품 리스트</h1>
      <div className="pt-10">
        <div className="hidden lg:block">
          <Table headers={headers} data={data} />
        </div>
        <div className="block lg:hidden">
          <Card headers={headers} data={data} />
        </div>
      </div>
    </div>
  );
};

export default Edit;
