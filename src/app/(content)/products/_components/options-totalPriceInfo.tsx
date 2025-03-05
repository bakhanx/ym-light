import { formatPrice } from "@/utils/formatPrice";

const TotalPriceInfo = ({
    totalOriginalPrice,
    totalItemListPrice,
  }: {
    totalOriginalPrice: number;
    totalItemListPrice: number;
  }) => {
    return (
      <div className="px-3 pt-5">
        {totalOriginalPrice - totalItemListPrice > 0 && (
          <div className="flex items-end justify-end gap-x-10">
            <span className="text-sm font-semibold text-red-500">추가 할인</span>
            <span className="w-36 text-right font-bold text-red-500">
              {formatPrice(totalOriginalPrice - totalItemListPrice)}원
            </span>
          </div>
        )}
        <div className="flex items-end justify-end gap-x-10">
          <span className="font-semibold text-slate-700">총 금액</span>
          <span className="w-36 text-right text-xl font-bold">{formatPrice(totalItemListPrice)}원</span>
        </div>
      </div>
    );
  };
  
  export default TotalPriceInfo