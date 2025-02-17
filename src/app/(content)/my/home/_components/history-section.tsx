import HistoryItem from "./history-item";
import { ChatBubbleLeftRightIcon, EnvelopeIcon, ShoppingCartIcon, TruckIcon } from "@heroicons/react/24/outline";

type HistorySectionProps = {
  orderCount: number;
  cartCount: number;
  chatCount: number;
  contactCount: number;
};

const HistorySection = ({
  orderCount,
  cartCount,
  chatCount,
  contactCount,
}: HistorySectionProps) => (
  <div className="flex justify-between rounded-md bg-white px-4 py-8">
    <HistoryItem
      href="/my/order"
      icon={TruckIcon}
      label="주문배송"
      count={orderCount}
    />
    <HistoryItem
      href="/my/cart"
      icon={ShoppingCartIcon}
      label="장바구니"
      count={cartCount}
    />
    <HistoryItem
      href="/my/chat"
      icon={ChatBubbleLeftRightIcon}
      label="대화내역"
      count={chatCount}
    />
    <HistoryItem
      href="/my/contact"
      icon={EnvelopeIcon}
      label="문의내역"
      count={contactCount}
    />
  </div>
);

export default HistorySection;