import { Option, Product } from "@prisma/client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ProductInfo = {
  productInfo: {
    product: Product;
    quantity: number;
  };
};
type OptionInfoList = {
  optionInfoList: {
    option: Option;
    quantity: number;
    totalPrice: number;
  }[];
};

export type CartItem = ProductInfo &
  OptionInfoList & {
    checked: boolean;
  };

type State = {
  cart: CartItem[];
};
type RemoveFromCart = {
  productId: number;
  optionId?: number;
};
type Actions = {
  addToCart: ({
    productInfo,
    optionInfoList,
  }: ProductInfo & OptionInfoList) => void;
  removeFromCart: ({ productId, optionId }: RemoveFromCart) => void;
};
const INITIAL_STATE: State = {
  cart: [],
};

export const useCartStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      cart: INITIAL_STATE.cart,

      addToCart: ({ productInfo, optionInfoList }) => {
        const cart = get().cart;
        const indexExistedProduct = cart.findIndex(
          (item) => item.productInfo.product.id === productInfo.product.id,
        );

        if (indexExistedProduct !== -1) {
          cart[indexExistedProduct].productInfo.quantity +=
            productInfo.quantity;
        } else {
          cart.push({ productInfo: productInfo, optionInfoList: [], checked:true });
        }

        // Option
        const currentCartIndex = cart.findIndex(
          (item) => item.productInfo.product.id === productInfo.product.id,
        );

        if (optionInfoList.length > 0) {
          optionInfoList.map((optionInfo) => {
            const indexExistedOption = cart[
              currentCartIndex
            ].optionInfoList.findIndex(
              (_optionInfo) => _optionInfo.option.id === optionInfo.option.id,
            );
            if (indexExistedOption >= 0) {
              cart[currentCartIndex].optionInfoList[indexExistedOption]
                .quantity++;
            } else {
              cart[currentCartIndex].optionInfoList.push(optionInfo);
            }
          });
        }

        set((state) => ({ cart: state.cart }));
      },

      removeFromCart: ({ productId, optionId }) => {
        const cart = get().cart;

        // 상품 제거
        if (productId) {
          const newCart = cart.filter(
            ({ productInfo }) => productInfo.product.id !== productId,
          );
        }

        // 옵션 제거
        if (optionId) {
          const productIndex = cart.findIndex(
            (item) => item.productInfo.product.id === productId,
          );
          const newOptionList = cart[productIndex].optionInfoList.filter(
            (optionInfo) => optionInfo.option.id !== optionId,
          );

          cart[productIndex].optionInfoList = newOptionList;
        }
        set((state) => ({ cart: state.cart }));
      },
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        cart: state.cart,
      }),
      skipHydration: true,
    },
  ),
);
