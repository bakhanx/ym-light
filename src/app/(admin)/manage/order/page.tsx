import db from "@/utils/db";
import { formatPrice } from "@/utils/formatPrice";
import React from "react";

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
  return (
    <div className="h-screen max-w-screen-lg px-2 pt-32 mx-auto">
      <h1 className="">주문 리스트</h1>
      <div className="pt-10">
        <div className="flex  divide-x-2 border-2  border-b-2 border-gray-500 text-center p-2 [&>span]:p-2">
          <span className="w-16">주문ID</span>
          <span className="w-36">고객명</span>
          <span className="w-16">상품ID</span>
          <span className="w-96">상품명</span>
          <span className="w-48">상품가격</span>
          <span className="w-20">할인율</span>
          <span className="w-16">수량</span>
        </div>
        {orderList.map((order) => (
          <div
            key={order.id}
            className="flex items-center divide-x-2 border-2 border-t-0 p-2 border-gray-500"
          >
            <div className="w-16  text-center">{order.id}</div>
            <div className="w-36 p-2">{order.user.username}</div>
            <div className="divide-y-2">
              {order.cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center divide-x-2 [&>div]:p-2"
                >
                  <div className="w-16  text-center">{item.id}</div>
                  <div className="flex w-96 flex-col">
                    <div className="">{item.product.title}</div>
                    <div>
                      {item.options.map((optionInfo) => (
                        <div
                          key={optionInfo.optionId}
                          className="text-gray-500"
                        >
                          {optionInfo.option.name} {}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-48">
                    {formatPrice(item.product.price)}원
                  </div>
                  {/* <div>{item.product.photo}</div> */}
                  <div className="w-20  text-center">
                    {item.product.discount || 0}%
                  </div>
                  <div className="w-16  text-center">
                    {item.quantity ||
                      item.options.map((option) => option.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
