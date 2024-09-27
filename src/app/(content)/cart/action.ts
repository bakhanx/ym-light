"use server";

import db from "@/libs/db";
import getSession from "@/libs/session";
import { CartItem } from "@/store/useCartStore";
import { redirect } from "next/navigation";

export const order = async (checkedItem: CartItem[]) => {
  const session = await getSession();
  try {
    const orderProducts = await db.order.create({
      data: {
        user: {
          connect: {
            id: session.id,
          },
        },
        orderItems: {
          create: checkedItem.flatMap(
            (item) =>
              item.optionInfoList.map((info) => ({
                productId: item.product.id,
                optionId: info.option?.id,
                quantity: info.quantity,
              })),
          ),
        },
      },
    });
    return {
      ok: true,
    };
  } catch (e) {
    console.log("error : ", e);
  }
};
