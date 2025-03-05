import { cls } from "@/utils/cls";
import { formatPrice } from "@/utils/formatPrice";
import { Option } from "@prisma/client";

const OptionDropdown = ({
    options,
    isOpen,
    onToggle,
    onSelect,
  }: {
    options: Option[];
    isOpen: boolean;
    onToggle: () => void;
    onSelect: (index: number) => void;
  }) => {
    return (
      <div className={cls("dropbox-option mt-2 border text-xs font-semibold", isOpen ? "border-orange-300" : "border-slate-300")}>
        <button className="flex w-full justify-between border p-2 hover:bg-orange-50" onClick={onToggle}>
          <span>상품명</span>
          <span>🔽</span>
        </button>
        {isOpen && (
          <ul className="flex w-full flex-col divide-y-2 border bg-white">
            {options.map((option) => (
              <li key={option.index} className="p-2 hover:bg-orange-50" onClick={() => onSelect(option.index)}>
                {`${option.index + 1} : ${option.name}`} {option.price ? `(+${formatPrice(option.price)}원)` : ""} | {`${option.stock}개 남음`}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default OptionDropdown