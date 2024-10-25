"use server";

import { CartItemDetail } from "@/store/useCartStore";
import db from "@/utils/db";
import getSession from "@/utils/session";
import React from "react";

const createDirectOrder = async (cartItem: CartItemDetail) => {
  const session = await getSession();
  try {
    await db.order.create({
      data: {
        userId: session.id,
        cartItems: {
          create: {
            productId: cartItem.product.id,
            quantity: cartItem.quantity,
            options: {
              create: cartItem.options.map((option) => ({
                optionId: option.option.id,
                quantity: option.quantity,
              })),
            },
          },
        },
      },
    });
    return { ok: true };
  } catch (error) {
    console.log("Error: 주문 생성 에러", error);
    throw new Error("Error: 주문 생성 에러");
  }
};

export default createDirectOrder;
