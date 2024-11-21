"use server";

import db from "@/utils/db";
import getSession from "@/utils/session";

const getCartItems = async (userId: number) => {
    const cartData = await db.cart.findUnique({
      where: {
        userId,
      },
      select: {
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
    return cartData;
  }
export default getCartItems;
