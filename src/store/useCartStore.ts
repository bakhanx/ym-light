import { create } from "zustand";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  quantity: number;
  options: {};
};

type State = {
  cart: Product[];
  totalItems: number;
  totalPrice: number;
};

type Actions = {
  addToCart: (item: Product) => void;
  removeFromCart: (item: Product) => void;
};

const INITIAL_STATE: State = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCartStore = create<State & Actions>((set, get) => ({
  cart: INITIAL_STATE.cart,
  totalItems: INITIAL_STATE.totalItems,
  totalPrice: INITIAL_STATE.totalPrice,

  addToCart: (product: Product) => {
    const cart = get().cart;
    const cartItem = cart.find((item) => item.id === product.id);
    if (cartItem) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
      set((state) => ({
        cart: updatedCart,
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + product.price,
      }));
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      set((state) => ({
        cart: updatedCart,
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + product.price,
      }));
    }
  },
  removeFromCart: (product: Product) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== product.id),
      totalItems: state.totalItems - 1,
      totalPrice: state.totalPrice - product.price,
    }));
  },
}));
