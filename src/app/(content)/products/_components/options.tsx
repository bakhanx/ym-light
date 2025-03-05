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
      {/* <div
        className={cls(
          "dropbox-option mt-2 border text-xs font-semibold",
          isOpenOption ? "border-orange-300" : "border-slate-300",
        )}
      >
        <button
          className="flex w-full justify-between border p-2 hover:bg-orange-50"
          onClick={handleOpenOption}
        >
          <span>상품명</span>
          <span>🔽</span>
        </button>
        {isOpenOption && (
          <ul className="flex w-full flex-col divide-y-2 border bg-white">
            {options.map((option) => (
              <li
                key={option.index}
                className="p-2 hover:bg-orange-50"
                onClick={() => handleSelectOption(option.index)}
              >
                {`${option.index + 1} : ${option.name}`}{" "}
                {option.price ? `(+${formatPrice(option.price)}원)` : ""} |{" "}
                {`${option.stock}개 남음`}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="pt-10">
        {selectedItemList.map((item) => (
          <div
            key={item.option.id}
            className="flex flex-col gap-y-5 border-b-2 bg-slate-50 p-3"
          >
            <div className="flex justify-between">
              <span>{item.option.name}</span>
              <button onClick={() => handleDeleteOption(item.option.index)}>
                ❌
              </button>
            </div>
            <div className="flex justify-between">
              <div className="count-btn flex">
                <button
                  className="flex h-6 w-6 items-center justify-center border p-2 hover:bg-orange-50"
                  onClick={() => handleQuantityChange(item.option.index, -1)}
                >
                  -
                </button>
                <span className="h-6 w-10 text-center">{item.quantity}</span>
                <button
                  className="flex h-6 w-6 items-center justify-center border p-2 hover:bg-orange-50"
                  onClick={() => handleQuantityChange(item.option.index, 1)}
                >
                  +
                </button>
              </div>
              <span>{formatPrice(item.totalPrice)}원</span>
            </div>
          </div>
        ))}
        <div className="px-3 pt-5">
          {totalOriginalPrice - totalItemListPrice > 0 && (
            <div className="flex items-end justify-end gap-x-10">
              <span className="text-sm font-semibold text-red-500">
                추가 할인
              </span>
              <span className="w-36 text-right font-bold text-red-500">
                {formatPrice(totalOriginalPrice - totalItemListPrice)}원
              </span>
            </div>
          )}
          <div className="flex items-end justify-end gap-x-10">
            <span className="font-semibold text-slate-700">총 금액</span>
            <span className="w-36 text-right text-xl font-bold">
              {formatPrice(totalItemListPrice)}원
            </span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Options;
