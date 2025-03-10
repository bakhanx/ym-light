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
        set((state) => {
          const cart = [...state.cart]; // 새로운 배열을 생성하여 상태 변경 감지

          const indexExistedProduct = cart.findIndex(
            (item) => item.productId === cartItem.productId,
          );

          // 장바구니에 상품이 없으면 추가
          if (indexExistedProduct === -1) {
            return { cart: [...cart, { ...cartItem, checked: true }] };
          }

          // 이미 장바구니에 있는 상품이면 수량 증가
          const updatedCart = cart.map((item, index) => {
            if (index !== indexExistedProduct) return item; // 해당 상품이 아니라면 그대로 유지

            // 옵션이 없는 경우, 수량만 증가
            if (cartItem.options.length === 0) {
              return { ...item, quantity: item.quantity + cartItem.quantity };
            }

            // 옵션이 있는 경우, 기존 옵션의 수량을 증가하거나 새로운 옵션 추가
            const updatedOptions = [...item.options];
            cartItem.options.forEach((newOption) => {
              const optionIndex = updatedOptions.findIndex(
                (option) => option.optionId === newOption.optionId,
              );

              if (optionIndex !== -1) {
                updatedOptions[optionIndex].quantity += newOption.quantity;
              } else {
                updatedOptions.push(newOption);
              }
            });

            return { ...item, options: updatedOptions };
          });

          return { cart: updatedCart };
        });
      },

      removeFromCart: ({ productId }) => {
        set((state) => ({
          cart: [
            ...state.cart.filter(
              (cartItem) => cartItem.productId !== productId,
            ),
          ],
        }));

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
        isExist: state.isExist,
      }),
      skipHydration: true,
    },
  ),
);
