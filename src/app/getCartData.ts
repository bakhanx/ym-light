"use server";

import db from "@/libs/db";

const getCartItems = async (userId: number) => {
  if (userId) {
    const cartData = await db.cart.findUnique({
      where: {
        userId,
      },
      select: {
        cartItems: {
          include: {
            options: {
              include:{
                option:true
              }
            },
            product:true,
          },
        },
        
      },
    });
    return cartData;
  }
};

export default getCartItems;
