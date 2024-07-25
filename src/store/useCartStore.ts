import { Option, Product } from "@prisma/client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ProductWithOptions = {
  product: Product & OptionType;
};

type OptionType = {
  options: Option[];
};

type State = {
  productInfoList: {
    product: Product & OptionType;
    quantity: number;
  }[];
  quantity: number;
  totalPrice: number;
};

type Actions = {
  addToCart: ({product}: ProductWithOptions) => void;
  removeFromCart: ({product}: ProductWithOptions) => void;
};

const INITIAL_STATE: State = {
  productInfoList: [],
  quantity: 0,
  totalPrice: 0,
};

export const useCartStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      productInfoList: INITIAL_STATE.productInfoList,
      quantity: INITIAL_STATE.quantity,
      totalPrice: INITIAL_STATE.totalPrice,

      addToCart: ({product}) => {
        const productInfoList = get().productInfoList;
        const isExistProduct = Boolean(
          productInfoList.find(
            (productInfo) => productInfo.product.id === product.id,
          ),
        );
        if (isExistProduct) {
          const updatedProductInfoList = productInfoList.map((productInfo) =>
            productInfo.product.id === product.id
              ? { ...productInfo, quantity: productInfo.quantity + 1 }
              : productInfo,
          );
          set((state) => ({
            productInfoList: updatedProductInfoList,
            quantity: state.quantity + 1,
            totalPrice: state.totalPrice + product.price,
          }));
        } else {
          const updatedProductInfoList = [
            ...productInfoList,
            { product, quantity: 1 },
          ];
          set((state) => ({
            productInfoList: updatedProductInfoList,
            quantity: state.quantity + 1,
            totalPrice: state.totalPrice + product.price,
          }));
        }
      },
      removeFromCart: ({product}) => {
        set((state) => ({
          productInfoList: state.productInfoList.filter(
            (productInfo) => productInfo.product.id !== product.id,
          ),
          quantity: state.quantity - 1,
          totalPrice: state.totalPrice - product.price,
        }));
      },
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        productInfoList: state.productInfoList,
        quantity: state.quantity,
        totalPrice: state.totalPrice,
      }),
      skipHydration: true,
    },
  ),
);
