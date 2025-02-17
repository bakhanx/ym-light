// Statistics.tsx
import { formatPrice } from "@/utils/formatPrice";

interface StatisticsProps {
  totalOrderPrice: number;
  totalOrderCount: number;
  visitCount: number;
}

const Statistics = ({
  totalOrderPrice,
  totalOrderCount,
  visitCount,
}: StatisticsProps) => (
  <div className="flex gap-x-4">
    <div className="flex w-1/3 min-w-64 shrink-0 flex-col gap-y-4 rounded-md bg-white p-4">
      <div>
        총 구매 금액 :{" "}
        <span className="font-bold">{formatPrice(totalOrderPrice)}원</span>
      </div>
      <div>
        총 구매 개수 : <span className="font-bold">{totalOrderCount}</span>
      </div>
      <div>
        사이트 방문 횟수 : <span className="font-bold">{visitCount}</span>
      </div>
    </div>
    <div className="w-full rounded-md bg-white p-4">
      <div>구매 카테고리 분포</div>
      {/* Pie Graph */}
      <div className="m-auto aspect-square w-full max-w-lg p-4">
        <div className="h-full w-full rounded-full bg-gray-200" />
      </div>
    </div>
  </div>
);

export default Statistics;
