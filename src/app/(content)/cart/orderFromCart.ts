"use server";

import db from "@/libs/db";
import getSession from "@/libs/session";
import { CartItemDetail } from "@/store/useCartStore";

export const orderFromCart = async (checkedItems: CartItemDetail[]) => {
  const session = await getSession();
  const cartItemIds = await Promise.all(
    checkedItems.map(async (item) => {
      const cartItem = await db.cartItem.findFirst({
        where: {
          productId: item.productId,
          cart: {
            userId: session.id,
          },
        },
        select: {
          id: true,
        },
      });
      return cartItem?.id || 0;
    }),
  );

  try {
    const orderProducts = await db.order.create({
      data: {
        user: {
          connect: {
            id: session.id,
          },
        },
        cartItems: {
          connect: cartItemIds.map((itemId) => ({
            id: itemId,
          })),
        },
      },
    });
    const updateCartItem = await db.cart.update({
      where: { userId: session.id },
      data: {
        cartItems: {
          disconnect: cartItemIds.map((itemId) => ({
            id: itemId,
          })),
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
