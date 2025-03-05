import { formatPrice } from "@/utils/formatPrice";
import { selectedItemType } from "./options";

const SelectedList = ({
    selectedItems,
    onQuantityChange,
    onDelete,
  }: {
    selectedItems: selectedItemType[];
    onQuantityChange: (index: number, change: number) => void;
    onDelete: (index: number) => void;
  }) => {
    return (
      <div className="pt-10">
        {selectedItems.map((item) => (
          <div key={item.option.id} className="flex flex-col gap-y-5 border-b-2 bg-slate-50 p-3">
            <div className="flex justify-between">
              <span>{item.option.name}</span>
              <button onClick={() => onDelete(item.option.index)}>❌</button>
            </div>
            <div className="flex justify-between">
              <div className="count-btn flex">
                <button className="flex h-6 w-6 items-center justify-center border p-2 hover:bg-orange-50" onClick={() => onQuantityChange(item.option.index, -1)}>
                  -
                </button>
                <span className="h-6 w-10 text-center">{item.quantity}</span>
                <button className="flex h-6 w-6 items-center justify-center border p-2 hover:bg-orange-50" onClick={() => onQuantityChange(item.option.index, 1)}>
                  +
                </button>
              </div>
              <span>{formatPrice(item.totalPrice)}원</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  export default SelectedList
  