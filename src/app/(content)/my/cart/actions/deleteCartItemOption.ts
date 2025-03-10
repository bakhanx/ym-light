"use server";

import db from "@/utils/db";
import getSession from "@/utils/session";

type OptionProps = {
  productId: number;
  optionId: number;
};

const deleteCartItemOption = async ({ productId, optionId }: OptionProps) => {
  const session = await getSession();
  try {
    const cart = await db.cart.findUnique({
      where: {
        userId: session.id,
      },
      include: {
        cartItems: {
          include: {
            options: true,
          },
        },
      },
    });
    if (!cart) return null;

    const cartItem = cart.cartItems.find((item) => item.id === productId);
    if (!cartItem) return null;

    // 삭제
    await db.cartItemOption.delete({
      where: {
        id: {
          optionId,
          cartItemId: cartItem.id,
        },
      },
    });

    const remainingOptions = await db.cartItemOption.findMany({
      where: {
        cartItemId: cartItem.id,
      },
    });

    if (remainingOptions.length === 0) {
      await db.cartItem.delete({
        where: {
          id: cartItem.id,
        },
      });
    }
  } catch (e) {
    console.log(e);
  }
};

export default deleteCartItemOption;
