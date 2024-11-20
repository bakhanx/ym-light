"use server";

import db from "@/utils/db";
import getSession from "@/utils/session";

const getCartItems = async () => {
  const session = await getSession();
  if (session.id) {
    const cartData = await db.cart.findUnique({
      where: {
        userId: session.id,
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
};

export default getCartItems;
