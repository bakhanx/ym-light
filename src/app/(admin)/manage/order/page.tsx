import db from "@/libs/db";
import { formatOfPrice } from "@/libs/utils";
import React from "react";

const Order = async () => {
  const orderList = await db.order.findMany({
    include: {
      user: true,
      cartItems:{
        include:{
          product:true,
          options:{
            include:{
              option:true,
            }
          },
        }
      }
    },
  });
  return (
    <div className="h-screen px-2 pt-32">
      <h1 className="">주문 리스트</h1>
      <div className="flex gap-x-28 border-b-2">
        <span>주문id</span>
        <span>고객명</span>
        <span>상품id</span>
        <span>상품명</span>
        <span>상품가격</span>
        <span>할인율</span>
        <span>수량</span>
      </div>
      {orderList.map((order) => (
        <div key={order.id} className="flex gap-x-28 border-b-2 py-5">
          <div>{order.id}</div>
          <div>{order.user.username}</div>
          <div>
            {order.cartItems.map((item) => (
              <div key={item.id} className="flex gap-x-28">
                <div>{item.id}</div>
                <div className="flex flex-col">
                  <div>{item.product.title}</div>
                  <div>
                    {item.options.map((optionInfo) => (
                      <div key={optionInfo.optionId} className="text-gray-500">
                        {optionInfo.option.name} {}
                      </div>
                    ))}
                  </div>
                </div>
                <div>{formatOfPrice(item.product.price)}원</div>
                {/* <div>{item.product.photo}</div> */}
                <div>{item.product.discount || 0}%</div>
                <div>{item.quantity}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Order;
