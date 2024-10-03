"use server";

import db from "@/libs/db";
import getSession from "@/libs/session";
import { Option, Product } from "@prisma/client";

type ProductProps = {
  productInfo: {
    product: Product;
    quantity: number;
  };
};

type OptionInfoList = {
  optionInfoList: {
    option: Option;
    quantity: number;
    price: number;
    totalPrice: number;
  }[];
};

type CartProps = ProductProps & OptionInfoList;

const updateCart = async ({ productInfo, optionInfoList }: CartProps) => {
  const session = await getSession();

  try {
    let cart = await db.cart.findUnique({
      where: {
        userId: session.id,
      },
    });
    if (!cart) {
      cart = await db.cart.create({
        data: {
          userId: session.id,
        },
        include: { cartItems: true },
      });
    }
    const cartItem = await db.cartItem.create({
      data: {
        productId: productInfo.product.id,
        cartId: cart.id,
        quantity: productInfo.quantity,
        options: {
          create: optionInfoList.map((optionInfo) => ({
            optionId: optionInfo.option.id,
            quantity: optionInfo.quantity,
          })),
        },
      },
    });
  } catch (e) {
    console.log("error:", e);
  }
};

export default updateCart;
