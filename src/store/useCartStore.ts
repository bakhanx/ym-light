import { create } from "zustand";

type Product = {
  id: number;
  title: string;
  color: string;
  price: number;
  options: {
    id: number;
    index: number;
    name: string;
    price: number | null;
    stock: number;
    productId: number;
  }[];
  discount: number | null;
};

type State = {
  productInfoList: { product: Product; quantity: number }[];
  quantity: number;
  totalPrice: number;
};

type Actions = {
  addToCart: (item: Product) => void;
  removeFromCart: (item: Product) => void;
};

const INITIAL_STATE: State = {
  productInfoList: [],
  quantity: 0,
  totalPrice: 0,
};

export const useCartStore = create<State & Actions>((set, get) => ({
  productInfoList: INITIAL_STATE.productInfoList,
  quantity: INITIAL_STATE.quantity,
  totalPrice: INITIAL_STATE.totalPrice,

  addToCart: (product: Product) => {
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
  removeFromCart: (product: Product) => {
    set((state) => ({
      productInfoList: state.productInfoList.filter(
        (productInfo) => productInfo.product.id !== product.id,
      ),
      quantity: state.quantity - 1,
      totalPrice: state.totalPrice - product.price,
    }));
  },
}));
