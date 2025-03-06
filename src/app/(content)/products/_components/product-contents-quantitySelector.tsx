import { formatPrice } from "@/utils/formatPrice";

interface QuantitySelectorProps {
    quantity: number;
    onChange: (value: number) => void;
    price?: number; 
    discount?: number;
  }
  
  const QuantitySelector = ({ quantity, onChange, price, discount }: QuantitySelectorProps) => {
    const handleQuantityButton = (type: "add" | "subtract") => {
      onChange(type === "add" ? quantity + 1 : Math.max(1, quantity - 1));
    };
  
    return (
      <div className="flex items-end justify-between pb-4 pt-16">
        <div className="count-btn flex text-black">
          <button
            className="flex h-6 w-6 items-center justify-center border p-2 hover:bg-orange-50"
            onClick={() => handleQuantityButton("subtract")}
          >
            -
          </button>
          <input
            className="flex h-6 w-10 items-center justify-center border text-center"
            type="number"
            value={quantity}
            onChange={(e) => onChange(Number(e.target.value))}
          />
          <button
            className="flex h-6 w-6 items-center justify-center border p-2 hover:bg-orange-50"
            onClick={() => handleQuantityButton("add")}
          >
            +
          </button>
        </div>
  
        {/* price가 있을 때만 총 금액 표시 */}
        {price !== undefined && (
          <div className="flex items-end gap-x-5">
            <div className="text-gray-500">총 금액</div>
            <span className="text-right text-xl font-bold">
              <span className="whitespace-nowrap text-lg sm:text-2xl">
                {discount
                  ? formatPrice(price * ((100 - discount) / 100) * quantity)
                  : formatPrice(price * quantity)}
                원
              </span>
            </span>
          </div>
        )}
      </div>
    );
  };
  
  export default QuantitySelector;
  