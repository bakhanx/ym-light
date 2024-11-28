"use server";
import db from "@/utils/db";
import React from "react";

const getOrder = async (year: number, month: number) => {
  // 선택한 년월의 첫 날
  const startDate = new Date(year, month - 1, 1);
  // 선택한 년월의 마지막 날
  const endDate = new Date(year, month, 0);

  const orders = await db.order.findMany({
    where: {
      created_at: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      user: {
        select: {
          id: true,
          username: true,
        },
      },
      created_at: true,
      cartItems: {
        select: {
          quantity: true,
          product: {
            select: {
              price: true,
              title: true,
            },
          },

          options: {
            select: {
              quantity: true,
              option: {
                select: {
                  name: true,
                  price: true,
                },
              },
            },
          },
        },
      },
    },
  });

  const daysInMonth = endDate.getDate();
  type OrderCountData = {
    date: string;
    count: number;
  };

  const orderCountData: OrderCountData[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(Date.UTC(year, month - 1, day))
      .toISOString()
      .split("T")[0];
    orderCountData.push({ date, count: 0 });
  }

  // 로그 데이터를 해당 날짜에 반영
  orders.forEach((order) => {
    const date = order.created_at.toISOString().split("T")[0];
    const index = orderCountData.findIndex((item) => item.date === date);
    if (index !== -1) {
      orderCountData[index].count += 1;
    }
  });

  return orderCountData;
};

export default getOrder;
