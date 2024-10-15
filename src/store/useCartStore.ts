import { CartItem, CartItemOption, Option, Product } from "@prisma/client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// type 동일시하기
// 1. (cart) client -> server
//                  -> zustand

// 2. (cart) zustand -> server -> zustand -> client

// 3. (order) zustand -> server

type OptionInfoList = {
  optionInfoList: {
    option: Option;
    quantity: number;
  }[];
};

type ProductProps = {
  productInfo: {
    product: Product;
    quantity: number;
  };
};

//for client -> zustand
export type Cart = CartItemWithOptions & {
  checked: boolean;
};

type OptionProps = {
  option: Option;
};

// for server -> zustand
export type CartItemWithOptions = {
  cartItem: CartItem & {
    product: Product;
    options: (CartItemOption & OptionProps)[];
  };
};

type State = {
  cart: Cart[];
  isDataLoaded: boolean;
};
type RemoveFromCart = {
  productId: number;
  optionId?: number;
};
type Actions = {
  addToCart: ({ cartItem }: CartItemWithOptions) => void;
  removeFromCart: ({ productId, optionId }: RemoveFromCart) => void;
  setDataLoaded: () => void;
  setInitData: (cartItem: CartItemWithOptions[]) => void;
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

      addToCart: ({ cartItem }) => {
        const cart = get().cart;
        const indexExistedProduct = cart.findIndex(
          (item) => item.cartItem.productId === cartItem.productId,
        );

        console.log(indexExistedProduct);

        // 장바구니에 없으면
        if (indexExistedProduct === -1) {
          cart.push({
            cartItem,
            checked: true,
          });
        }
        // 이미 장바구니에 있으면
        else {
          //  no option
          if (cartItem.quantity > 0) {
            cart[indexExistedProduct].cartItem.quantity += cartItem.quantity;
          }

          // Option
          else {
            const currentCartIndex = cart.findIndex(
              (item) => item.cartItem.productId === cartItem.productId,
            );
            if (currentCartIndex !== -1) {
              cartItem.options.map((optionInfo) => {
                const indexExistedOption = cart[
                  currentCartIndex
                ].cartItem.options.findIndex(
                  (_optionInfo) => _optionInfo.optionId === optionInfo.optionId,
                );
                if (indexExistedOption !== -1) {
                  cart[currentCartIndex].cartItem.options[indexExistedOption]
                    .quantity += optionInfo.quantity;
                } else {
                  cart[currentCartIndex].cartItem.options.push(optionInfo);
                }
              });
            }
          }
        }

        set((state) => ({ cart: state.cart }));
      },

      removeFromCart: ({ productId }) => {
        const cart = get().cart;

        // 상품 제거
        if (productId) {
          const newCart = cart.filter(
            ({ cartItem }) => cartItem.productId !== productId,
          );
          set((state) => ({ ...state, cart: newCart }));
        }

        // 옵션 제거
        // if (productId) {
        //   const productIndex = cart.findIndex(
        //     (item) => item.cartItem.productId === productId,
        //   );
        //   const newOptionList = cart[productIndex].cartItem.productId !== productId

        //   // cart[productIndex].cartItem = newOptionList;
        // }
        // set((state) => ({ cart: state.cart }));
      },

      setDataLoaded: () => {
        set(() => ({ isDataLoaded: true }));
      },
      setInitData: (cart) => {},
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
