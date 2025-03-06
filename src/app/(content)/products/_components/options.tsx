"use client";

import { cls } from "@/utils/cls";
import { formatPrice } from "@/utils/formatPrice";
import { Option } from "@prisma/client";
import React, { useEffect, useMemo, useState } from "react";
import OptionDropdown from "./options-dropdown";
import TotalPriceInfo from "./options-totalPriceInfo";
import SelectedList from "./options-selectedList";

export type selectedItemType = {
  option: Option;
  quantity: number;
  totalPrice: number;
};

type OptionsType = {
  options: Option[];
  price: number;
  discount: number | null;
  parentFunc: (items: selectedItemType[]) => void;
};

const Options = ({ options, price, discount, parentFunc }: OptionsType) => {
  const calcPrice = useMemo(
    () => (price: number) => {
      return discount ? price - (price * discount) / 100 : price;
    },
    [discount],
  );

  const [selectedItemList, setSelectedItemList] = useState<selectedItemType[]>(
    [],
  );
  const [isOpenOption, setIsOpenOption] = useState(false);

  const totalItemListPrice = useMemo(() => {
    return selectedItemList.reduce((acc, item) => acc + item.totalPrice, 0);
  }, [selectedItemList]);

  const totalOriginalPrice = useMemo(() => {
    return selectedItemList.reduce(
      (acc, item) => acc + item.quantity * (price + (item.option.price || 0)),
      0,
    );
  }, [selectedItemList, price]);

  const handleSelectOption = (index: number) => {
    setSelectedItemList((prev) => {
      const existingItem = prev.find((item) => item.option.index === index);
      if (existingItem) {
        return prev.map((item) =>
          item.option.index === index
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice:
                  item.totalPrice + calcPrice(price) + (item.option.price || 0),
              }
            : item,
        );
      }
      return [
        ...prev,
        {
          option: options[index],
          quantity: 1,
          totalPrice: calcPrice(price) + (options[index].price || 0),
        },
      ];
    });
    setIsOpenOption(false);
  };

  const handleDeleteOption = (index: number) => {
    setSelectedItemList((prev) =>
      prev.filter((item) => item.option.index !== index),
    );
  };

  const handleQuantityChange = (index: number, change: number) => {
    setSelectedItemList((prev) =>
      prev.map((item) =>
        item.option.index === index
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + change),
              totalPrice:
                (calcPrice(price) + (item.option.price || 0)) *
                Math.max(1, item.quantity + change),
            }
          : item,
      ),
    );
  };

  useEffect(() => {
    parentFunc(selectedItemList);
  }, [selectedItemList, parentFunc]);

  return (
    <div className="option pt-10">
      <label className="text-sm font-semibold sm:text-base">상품옵션</label>
      <OptionDropdown
        options={options}
        isOpen={isOpenOption}
        onToggle={() => setIsOpenOption((prev) => !prev)}
        onSelect={handleSelectOption}
      />
      <SelectedList
        selectedItems={selectedItemList}
        onQuantityChange={handleQuantityChange}
        onDelete={handleDeleteOption}
      />
      <TotalPriceInfo
        totalOriginalPrice={totalOriginalPrice}
        totalItemListPrice={totalItemListPrice}
      />
    </div>
  );
};

export default Options;
