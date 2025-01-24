import { ReactNode } from "react";

const Item = ({ title, content }: { title: string; content: ReactNode }) => (
    <div className="my-product-detail-item pt-6">
      <div className="my-item-title text-base font-bold sm:text-lg">{title}</div>
      <div className="my-item-content p-10 text-center text-sm text-slate-500 sm:text-base">
        {content}
      </div>
    </div>
  );

  export default Item