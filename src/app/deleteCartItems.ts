"use server";

import db from "@/libs/db";
import getSession from "@/libs/session";

const deleteCartItems = async (productId: number) => {
  const session = await getSession();
  try {
    console.log(productId);
    if (productId) {
      const deleteItems = await db.cartItem.deleteMany({
        where: {
          cart: {
            userId: session.id,
          },
          productId,
        },
      });
      return deleteItems;
    }
  } catch (e) {
    console.log(e);
  }
};

export default deleteCartItems;
