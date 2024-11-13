import db from "@/utils/db";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import React from "react";
import Table from "../_components/table";
import { formatDate } from "@/utils/formatDate";
import Card from "../_components/card";

const Order = async () => {
  const orderList = await db.order.findMany({
    include: {
      user: true,
      cartItems: {
        include: {
          product: true,
          options: {
            include: {
              option: true,
            },
          },
        },
      },
    },
  });

  const headers = ["주문 ID", "고객명", "상품 정보", "주문일자"];

  const data = orderList.map((order) => {
    const orderData = [
      [order.id, "text-center"],
      [order.user.username, "text-center"],
      [
        order.cartItems.map((item) => (
          <div key={item.id} className="flex items-center gap-2 py-1">
            <div className="flex flex-col">
              <Image
                src={`${item.product.photos[0]}/w=200`}
                alt={item.product.title}
                className="h-16 w-16 object-cover"
                width={64}
                height={64}
              />
              <span className="text-sm">id: {item.id}</span>
            </div>
            <div>
              <span className="block overflow-hidden text-ellipsis whitespace-nowrap">
                {item.product.title}
              </span>
              {item.options.map((optionInfo) => (
                <div key={optionInfo.optionId} className="text-gray-500">
                  {optionInfo.option.name}
                </div>
              ))}
              <div>{`${formatPrice(item.product.price)}원`}</div>
              <div>{`할인율: ${item.product.discount || 0}%`}</div>
              <div>{`수량: ${item.quantity}`}</div>
            </div>
          </div>
        )),
        "text-left",
      ],
      [formatDate(order.created_at), "text-left"],
    ];
    return orderData;
  });

  return (
    <div className="mx-auto min-h-screen max-w-screen-xl px-2 pt-32 xl:px-0">
      <h1 className="text-xl font-bold">주문 리스트</h1>
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

export default Order;
