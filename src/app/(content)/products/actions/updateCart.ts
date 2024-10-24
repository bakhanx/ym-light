"use server";

import db from "@/utils/db";
import getSession from "@/utils/session";
import { CartItemDetail } from "@/store/useCartStore";

const updateCart = async ( cartItem : CartItemDetail) => {
  const session = await getSession();

  try {
    let cart = await db.cart.findUnique({
      where: {
        userId: session.id,
      },
      include: {
        cartItems: {
          select: {
            id: true,
            quantity: true,
            productId: true,
            options: {
              select: {
                optionId: true,
                quantity: true,
              },
            },
          },
        },
      },
    });

    if (!cart) {
      cart = await db.cart.create({
        data: {
          userId: session.id,
        },
        include: {
          cartItems: {
            select: {
              id: true,
              quantity: true,
              productId: true,
              options: {
                select: {
                  optionId: true,
                  quantity: true,
                },
              },
            },
          },
        },
      });
    }

    const existedItem = cart.cartItems.find(
      (item) => item.productId === cartItem.productId,
    );

    if (existedItem) {
      // no option : product quantity+
      if (existedItem.quantity > 0) {
        const updateCartItem = await db.cartItem.updateMany({
          where: {
            productId: cartItem.productId,
          },
          data: {
            quantity: existedItem.quantity + cartItem.quantity,
          },
        });
      }

      // option
      else {
        const updates = existedItem.options.forEach(async (option) => {
          console.log("options:", cartItem.options);
          console.log("optionId:", option.optionId);
          const newOption = cartItem.options.find(
            (v) => v.optionId === option.optionId,
          );
          console.log(newOption);
          if (option.quantity > 0) {
            console.log(newOption?.quantity);
            await db.cartItemOption.update({
              where: {
                id: {
                  optionId: option.optionId,
                  cartItemId: existedItem.id,
                },
              },
              data: {
                quantity: option.quantity + (newOption?.quantity || 0),
              },
            });
          } else if (newOption) {
            await db.cartItemOption.create({
              data: {
                optionId: option.optionId,
                quantity: newOption.quantity,
                cartItemId: existedItem.id,
              },
            });
          }
        });
      }
    }

    // option quantity
    if (!existedItem) {
      const createCartItem = await db.cartItem.create({
        data: {
          productId: cartItem.product.id,
          cartId: cart.id,
          quantity: cartItem.quantity,
          options: {
            create: cartItem.options.map((option) => ({
              optionId: option.option.id,
              quantity: option.quantity,
            })),
          },
        },
      });
    }
  } catch (e) {
    console.log("error:", e);
  }
};

export default updateCart;
