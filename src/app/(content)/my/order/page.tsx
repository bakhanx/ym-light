import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const dummy = [
  {
    id: 0,
    date: "2024.10.28",
    name: "생이새우 100마리",
    price: 5500,
    photo: "",
  },
  {
    id: 1,
    date: "2024.10.28",
    name: "생이새우 100마리",
    price: 5500,
    photo: "",
  },
  {
    id: 2,
    date: "2024.10.28",
    name: "생이새우 100마리",
    price: 5500,
    photo: "",
  },
  {
    id: 3,
    date: "2024.10.28",
    name: "생이새우 100마리",
    price: 5500,
    photo: "",
  },
];

const Order = () => {
  return (
    <div className="right flex w-full flex-col gap-y-4">
      <div className="flex gap-x-2 rounded-md bg-white p-4 text-lg">
        <span>나의쇼핑 &gt;</span>
        <span className="font-bold">주문내역</span>
      </div>

      {dummy.map((e) => (
        <div key={e.id} className="rounded-md bg-white">
          <div className="flex flex-col gap-y-2 p-4">
            <div className="font-semibold">구매확정완료</div>
            <div className="flex gap-x-4">
              {e.photo ? (
                <Image alt={e.name} src={e.photo} />
              ) : (
                <div className="size-24 rounded-md bg-gray-500" />
              )}
              <div>
                <div className="text-gray-500">{e.date}</div>
                <div>{e.name}</div>
                <div className="font-semibold">{formatPrice(e.price)}</div>
                <div className="text-orange-500">상세보기 &gt; </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Order;
