import { Option, Product } from "@prisma/client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type OptionInfoList = {
  optionInfoList: {
    option: Option;
    quantity: number;
    price: number;
    totalPrice: number;
  }[];
};

type ProductProps = {
  productInfo: {
    product: Product;
    quantity: number;
  };
};

export type CartItem = ProductProps &
  OptionInfoList & {
    checked: boolean;
  };

type State = {
  cart: CartItem[];
  isDataLoaded: boolean;
};
type RemoveFromCart = {
  productId: number;
  optionId?: number;
};
type Actions = {
  addToCart: ({
    productInfo,
    optionInfoList,
  }: ProductProps & OptionInfoList) => void;
  removeFromCart: ({ productId, optionId }: RemoveFromCart) => void;
  setDataLoaded: () => void;
  
};
const INITIAL_STATE: State = {
  cart: [],
  isDataLoaded: false,
};

export const useCartStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      cart: INITIAL_STATE.cart,
      isDataLoaded: INITIAL_STATE.isDataLoaded,

      addToCart: ({ productInfo, optionInfoList }) => {
        console.log(productInfo);
        console.log(optionInfoList);
        const cart = get().cart;
        const indexExistedProduct = cart.findIndex(
          (item) => item.productInfo.product.id === productInfo.product.id,
        );

        console.log(indexExistedProduct);

        // 장바구니에 없으면
        if (indexExistedProduct === -1) {
          cart.push({
            productInfo: productInfo,
            optionInfoList: optionInfoList,
            checked: true,
          });
        }
        // 이미 장바구니에 있으면
        else {
          cart[indexExistedProduct].productInfo.quantity +=
            productInfo.quantity;
        }

        // Option
        // const currentCartIndex = cart.findIndex(
        //   (item) => item.productInfo.product.id === productInfo.product.id,
        // );

        // if (currentCartIndex !== -1) {

        //   cart.push({ productInfo, optionInfoList, checked:true });

        //   optionInfoList.map((optionInfo) => {
        //     const indexExistedOption = cart[
        //       currentCartIndex
        //     ].optionInfoList.findIndex(
        //       (_optionInfo) => _optionInfo.option?.id === optionInfo.option?.id,
        //     );
        //     if (indexExistedOption !== -1) {
        //       cart[currentCartIndex].optionInfoList[indexExistedOption]
        //         .quantity++;
        //     } else {
        //       cart[currentCartIndex].optionInfoList.push(optionInfo);
        //     }
        //   });
        // }

        set((state) => ({ cart: state.cart }));
      },

      removeFromCart: ({ productId }) => {
        const cart = get().cart;

        // 상품 제거
        if (productId) {
          const newCart = cart.filter(
            ({ productInfo }) => productInfo.product.id !== productId,
          );
          set((state) => ({ ...state, cart: newCart }));
        }

        // 옵션 제거
        // if (optionId) {
        //   const productIndex = cart.findIndex(
        //     (item) => item.productInfo.product.id === productId,
        //   );
        //   const newOptionList = cart[productIndex].optionInfoList.filter(
        //     (optionInfo) => optionInfo.option?.id !== optionId,
        //   );

        //   cart[productIndex].optionInfoList = newOptionList;
        // }
        // set((state) => ({ cart: state.cart }));
      },

      setDataLoaded: () => {
        set(() => ({ isDataLoaded:true }));        
      },
      setInitData : ()=>{

      }
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
