"use client";

import { cls, formatOfPrice } from "@/libs/utils";
import React, { useEffect, useState } from "react";

type selectedItemType = {
  id: number;
  index: number;
  name: string;
  price: number | null;
  productId: number;
  quantity: number;
  stock: number;
  totalPrice: number;
};

type OptionType = {
  id: number;
  index: number;
  name: string;
  price: number | null;
  stock: number;
  productId: number;
  quantity?: number;
};

type ItemType = {
  index: number;
  quantity: number;
};

type OptionsType = {
  options: OptionType[];
  price: number;
  discount: number | null;
  parentFunc: Function;
};

const Options = ({ options, price, discount, parentFunc }: OptionsType) => {
  const calcPrice = (price: number) => {
    if (discount) {
      return price - (price * discount) / 100;
    }
    return price;
  };

  const [selectedItemList, setSelectedItemList] = useState<selectedItemType[]>(
    [],
  );
  const [totalItemListPrice, setTotalItemListPrice] = useState(0);
  const [totalOriginalPrice, setTotalOriginalPrice] = useState(0);
  const [quantity, setQuantity] = useState(Array(options.length).fill(0));

  const [isOpenOption, setIsOpenOption] = useState(false);

  const handleOpenOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpenOption((prev) => !prev);
  };

  const handleSelectOption = (index: number, e: any) => {
    const temp = [...quantity];
    temp[index]++;
    setQuantity(temp);

    const clickedItem = options.find((option) => option.index === index)!;
    const isExistItemInList = selectedItemList.find(
      (selectedItem) => selectedItem.index === clickedItem.index,
    );

    if (!isExistItemInList) {
      const newClickedItem = {
        ...clickedItem,
        quantity: 1,
        totalPrice: calcPrice(price as number) + (clickedItem.price || 0),
      };
      setSelectedItemList((prev) => [...prev, newClickedItem]);
    } else {
      const newSelectedItemList = [...selectedItemList];
      const foundItem = newSelectedItemList.find(
        (selectedItem) => selectedItem.index === clickedItem.index,
      );
      if (foundItem) {
        foundItem.quantity++;
        foundItem.totalPrice +=
          calcPrice(price) + (foundItem.price || 0) * foundItem.quantity;
      }
      setSelectedItemList(newSelectedItemList);
    }
    setIsOpenOption(false);
  };

  const handleDeleteOption = (
    index: number,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const selectedItemIndex = selectedItemList.findIndex(
      (item) => index === item.id,
    );
    console.log(selectedItemIndex);
    setSelectedItemList((prev) => {
      const temp = [...prev];
      temp.splice(selectedItemIndex, 1);
      return temp;
    });

    setQuantity((prev) => {
      const temp = [...prev];
      temp[index] = 0;
      return temp;
    });
  };

  const handleButtonClick = (
    index: number,
    buttonType: "add" | "substract",
  ) => {
    const newSelectedItemList = [...selectedItemList];
    const foundItem = newSelectedItemList.find(
      (newSelectedItem) => newSelectedItem.index === index,
    );

    if (foundItem) {
      if (buttonType === "add") {
        foundItem.quantity++;
        foundItem.totalPrice += calcPrice(price) + (foundItem.price || 0);
        setQuantity((prev) => {
          const temp = [...prev];
          temp[index]++;
          return temp;
        });
      } else if (buttonType === "substract") {
        if (quantity[index] === 1) return;
        foundItem.quantity--;
        foundItem.totalPrice -= calcPrice(price) + (foundItem.price || 0);
        setQuantity((prev) => {
          const temp = [...prev];
          temp[index]--;
          return temp;
        });
      }
    }
    setSelectedItemList(newSelectedItemList);
  };

  const handleChange = (index: number, e: any) => {
    const temp = [...quantity];
    temp[index] = e.target.value;
    setQuantity(temp);
  };

  const handleBlur = (index: number, e: any) => {
    let _quantity = 0;
    if (quantity[index] < 1) {
      setQuantity((prev) => {
        const temp = [...prev];
        temp[index] = 1;
        return temp;
      });
      _quantity = 1;
    } else {
      _quantity = e.target.value;
    }
    const newSelectedItemList = [...selectedItemList];
    const foundItem = newSelectedItemList.find(
      (newSelectedItem) => newSelectedItem.index === index,
    );
    if (foundItem) {
      foundItem.quantity = _quantity;
      foundItem.totalPrice =
        (calcPrice(price) + (foundItem.price || 0)) * foundItem.quantity;
    }
    setSelectedItemList(newSelectedItemList);
  };

  useEffect(() => {
    setTotalItemListPrice(
      selectedItemList
        .map((item) => item.totalPrice)
        .reduce((acc, cur) => acc + cur, 0),
    );

    const totalQuantity = selectedItemList
      .map((item) => item.quantity)
      .reduce((acc, cur) => acc + cur, 0);
    const regularPrice = totalQuantity * price;
    const OptionPrice = selectedItemList
      .map((item) => item.quantity * (item.price || 0))
      .reduce((acc, cur) => acc + cur, 0);
    setTotalOriginalPrice(regularPrice + OptionPrice);
  }, [selectedItemList, price]);

  useEffect(() => {
    parentFunc(selectedItemList);
  }, [selectedItemList, parentFunc]);

  return (
    <div className="option pt-10">
      <div>
        <label className="text-sm font-semibold sm:text-base">상품옵션</label>
        <div
          className={cls(
            "dropbox-option mt-2 border text-xs font-semibold text-slate-500 sm:text-sm",
            isOpenOption ? "border-orange-300" : "border-slate-300",
          )}
        >
          <button
            className={cls(
              "flex w-full justify-between border p-2 hover:cursor-pointer hover:bg-orange-50",
              isOpenOption ? "bg-slate-100" : "",
            )}
            onClick={handleOpenOption}
          >
            <span>상품명</span>
            <span>🔽</span>
          </button>

          <ul
            className={cls(
              "flex w-full flex-col divide-y-2 border bg-white",
              isOpenOption ? "" : "hidden",
            )}
          >
            {options?.map((option) => (
              <li
                key={option.index}
                className="p-2 hover:cursor-pointer hover:bg-orange-50"
                onClick={(e) => handleSelectOption(option.index, e)}
              >
                {` ${option.id} : ${option.name}`}{" "}
                {option.price && `(+${option.price})`} {` | `}
                {`${option.stock}개 남음`}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* select result */}
      <div className="pt-10">
        <div className="flex  flex-col gap-y-5">
          {selectedItemList?.map((item) => (
            <div
              key={item.id}
              className="flex flex-col  gap-y-5 border-b-2 bg-slate-50 p-3"
            >
              <div className="flex justify-between">
                <span>{item.name}</span>
                <button onClick={(e) => handleDeleteOption(item.index, e)}>
                  ❌
                </button>
              </div>

              <div className="flex justify-between">
                <div className="count-btn flex text-black">
                  <button
                    className="flex h-6 w-6 items-center justify-center border p-2 hover:bg-orange-50"
                    onClick={(e) => handleButtonClick(item.index, "substract")}
                  >
                    -
                  </button>

                  <input
                    className="flex h-6 w-10 items-center justify-center border text-center"
                    type="number"
                    value={quantity[item.index]}
                    onChange={(e) => handleChange(item.index, e)}
                    onBlur={(e) => {
                      handleBlur(item.index, e);
                    }}
                  />
                  <button
                    className="flex h-6 w-6 items-center justify-center border p-2 hover:bg-orange-50"
                    onClick={(e) => handleButtonClick(item.index, "add")}
                  >
                    +
                  </button>
                </div>

                <div className="item-price">
                  <span>{formatOfPrice(item.totalPrice)}원</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-3 pt-5">
          {totalOriginalPrice - totalItemListPrice > 0 && (
            <div className="flex items-end justify-end gap-x-10">
              <span className="text-sm font-semibold text-red-500 ">
                추가 할인
              </span>
              <span className="w-36 text-right font-bold text-red-500">
                {formatOfPrice(totalOriginalPrice - totalItemListPrice)}원
              </span>
            </div>
          )}
          <div className="flex items-end justify-end gap-x-10 ">
            <span className="font-semibold text-slate-700">총 금액</span>
            <span className="w-36 text-right text-xl font-bold">
              {formatOfPrice(totalItemListPrice)}원
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Options;
