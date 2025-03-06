import {
  ShoppingBagIcon,
  TruckIcon,
  HeartIcon,
} from "@heroicons/react/16/solid";

interface ProductButtonsProps {
  onAddToCart: () => void;
  onOrderClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ProductButtons = ({ onAddToCart, onOrderClick }: ProductButtonsProps) => {
  return (
    <div className="my-btn-wrap flex flex-col gap-y-5 pt-5 text-sm font-bold text-white sm:text-base">
      <button
        onClick={onOrderClick}
        className="flex w-full items-center justify-center gap-x-1 rounded-md bg-amber-500 p-4 hover:bg-amber-600 sm:p-5"
      >
        <TruckIcon className="h-5 w-5 sm:h-7 sm:w-7" />
        바로주문하기
      </button>
      <div className="flex gap-x-4">
        <button
          onClick={onAddToCart}
          className="flex w-full items-center justify-center gap-x-1 rounded-md bg-blue-500 p-4 hover:bg-blue-600 sm:p-5"
        >
          <ShoppingBagIcon className="h-4 w-4 stroke-2 sm:h-5 sm:w-5" />
          <span>장바구니</span>
        </button>
        <button className="flex w-full items-center justify-center gap-x-1 rounded-md bg-red-600 p-4 hover:bg-red-700 sm:p-5">
          <HeartIcon className="h-4 w-4 stroke-2 sm:h-5 sm:w-5" />
          찜하기
        </button>
      </div>
    </div>
  );
};

export default ProductButtons;
