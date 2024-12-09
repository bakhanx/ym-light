import db from "@/utils/db";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import React from "react";
import Table, { RowData } from "../_components/table";
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
    orderBy:{
      created_at:"desc"
    }
  });

  const headers = ["주문 ID", "고객명", "상품 정보", "주문일자"];

  const data: RowData[][] =
    orderList.length > 0
      ? orderList.map((order) => {
          const orderData: RowData[] = [
            [order.id, "text-center"],
            [order.user.username, "text-center"],
            [
              order.cartItems.map((item) => {
                const discountPrice =
                  (item.product.price * (100 - item.product.discount)) / 100;

                const totalPrice =
                  discountPrice * item.quantity +
                  item.options
                    .map(
                      (optionInfo) =>
                        (discountPrice + (optionInfo.option.price || 0)) *
                        optionInfo.quantity,
                    )
                    .reduce((acc, cur) => acc + cur, 0);

                return (
                  <div key={item.id} className="flex items-center gap-2 py-4">
                    <div className="relative flex flex-col">
                      <Image
                        src={`${item.product.photos[0]}/w=200`}
                        alt={item.product.title}
                        className="size-24 object-cover"
                        width={64}
                        height={64}
                      />
                      <span className="absolute -top-5 left-0 text-sm">
                        [id:{item.productId}]
                      </span>
                    </div>

                    <div>
                      <div className="block overflow-hidden text-ellipsis whitespace-nowrap">
                        <span className="font-semibold">상품명: </span>{" "}
                        {item.product.title}
                      </div>
                      <div>
                        <span className="font-semibold">가격: </span>
                        {`${formatPrice(item.product.price)}원`}
                      </div>
                      <div>
                        <span className="font-semibold">할인율: </span>
                        {`${item.product.discount || 0}%`}
                      </div>
                      {item.options.map((optionInfo, index) => (
                        <div key={optionInfo.optionId} className="text-sm">
                          옵션{index + 1}: {optionInfo.option.name} | (+{" "}
                          {formatPrice(optionInfo.option.price!)}원) |{" "}
                          {optionInfo.quantity}개
                        </div>
                      ))}
                      {item.quantity > 0 && (
                        <div>
                          <span className="font-semibold">수량: </span>
                          {item.quantity}
                        </div>
                      )}
                      <div className="pt-2">
                        <span className="font-semibold text-lg">총 가격 :</span>
                        {formatPrice(totalPrice)}원
                      </div>
                    </div>
                  </div>
                );
              }),
              "",
            ],
            [formatDate(order.created_at), ""],
          ];
          return orderData;
        })
      : [];

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
