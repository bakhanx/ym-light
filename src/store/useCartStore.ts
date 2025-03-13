import { CartItem, CartItemOption, Option, Product } from "@prisma/client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type OptionProps = {
  option: Option;
};

export type CartItemDetail = CartItem & {
  product: Product;
  options: (CartItemOption & OptionProps)[];
  checked?: boolean;
};

type State = {
  cart: CartItemDetail[];
  isDataLoaded: boolean;
  isExist: boolean;
};
type RemoveFromCart = {
  productId: number;
  optionId?: number;
};
type Actions = {
  addToCart: (cartItem: CartItemDetail) => void;
  removeFromCart: ({ productId, optionId }: RemoveFromCart) => void;
  removeOptionFromCart: ({ productId, optionId }: RemoveFromCart) => void;
  setDataLoaded: () => void;
  setInitData: ({ cartItems }: { cartItems: CartItemDetail[] }) => void;
};
const INITIAL_STATE: State = {
  cart: [],
  isExist: false,
  isDataLoaded: false,
};

export const useCartStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      cart: INITIAL_STATE.cart,
      isDataLoaded: INITIAL_STATE.isDataLoaded,
      isExist: INITIAL_STATE.isExist,

      addToCart: (cartItem) => {
        const cart = get().cart;
        const indexExistedProduct = cart.findIndex(
          (item) => item.productId === cartItem.productId,
        );

        const isExist = indexExistedProduct !== -1;
        set({ isExist });

        // 장바구니에 없으면
        if (!isExist) {
          cart.push({ ...cartItem, checked: true });
        }

        // 이미 장바구니에 있으면
        else {
          //  no option
          if (cartItem.quantity > 0) {
            cart[indexExistedProduct].quantity += cartItem.quantity;
          }

          // Option
          else {
            const currentCartIndex = cart.findIndex(
              (item) => item.productId === cartItem.productId,
            );
            if (currentCartIndex !== -1) {
              cartItem.options.map((optionInfo) => {
                const indexExistedOption = cart[
                  currentCartIndex
                ].options.findIndex(
                  (_optionInfo) => _optionInfo.optionId === optionInfo.optionId,
                );
                if (indexExistedOption !== -1) {
                  cart[currentCartIndex].options[indexExistedOption].quantity +=
                    optionInfo.quantity;
                } else {
                  cart[currentCartIndex].options.push(optionInfo);
                }
              });
            }
          }
        }

        set((state) => ({ cart: state.cart }));
      },

      removeFromCart: ({ productId }) => {
        const cart = get().cart;
        if (cart) {
          const newCart = cart.filter(
            (cartItem) => cartItem.productId !== productId,
          );
          set((state) => ({ ...state, cart: newCart }));
        }
      },
      removeOptionFromCart: ({ productId, optionId }) => {
        const cart = get().cart;
        if (cart) {
          const updatedCart = cart
            .map((cartItem) => {
              if (cartItem.productId === productId) {
                const updatedOptions = cartItem.options.filter(
                  (option) => option.optionId !== optionId,
                );

                if (updatedOptions.length === 0) {
                  return undefined;
                }

                return { ...cartItem, options: updatedOptions };
              }
              return cartItem;
            })
            .filter((cartItem) => cartItem !== undefined);

          set((state) => ({
            ...state,
            cart: updatedCart,
          }));
        }
      },

      setDataLoaded: () => {
        set(() => ({ isDataLoaded: true }));
      },
      setInitData: ({ cartItems }) => {
        const updateToCheckCartItems = cartItems.map((item) => ({
          ...item,
          checked: true,
        }));
        set(() => ({ cart: updateToCheckCartItems }));
      },
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        cart: state.cart,
        isDataLoaded: state.isDataLoaded,
      }),
      skipHydration: true,
    },
  ),
);
