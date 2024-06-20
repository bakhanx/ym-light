"use client"

import { cls, formatOfPrice } from "@/libs/utils";
import React, { useEffect, useState } from "react";

type selectedItemType = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
};

type ItemOptionType = {
  id: number;
  name: string;
  price: number;
};

type OptionsType = {
  price: number;
  discount?: number;
};

const data: ItemOptionType[] = [
  { id: 0, name: "화이트", price: 0 },
  { id: 1, name: "블랙", price: 200000 },
  { id: 2, name: "골드", price: 250000 },
];

const Options = ({ price, discount }: OptionsType) => {
  const calcPrice = (price: number) => {
    if (discount) {
      return price - (price * discount) / 100;
    }

    return price;

    // 복수 할인
    // if (product?.discount) {
    //   const totalRate = discount
    //     .map((item) => item)
    //     .reduce((acc, cur) => acc + cur, 0);
    //   return (price - (price * totalRate) / 100).toLocaleString("ko-KR");
    // }
  };

  const [selectedItemList, setSelectedItemList] = useState<selectedItemType[]>(
    [],
  );

  const [itemOptions, setItemOptions] = useState(data);
  const [totalItemListPrice, setTotalItemListPrice] = useState(0);
  const [totalOriginalPrice, setTotalOriginalPrice] = useState(0);
  const [quantity, setQuantity] = useState(Array(data.length).fill(0));

  const [isOpenOption, setIsOpenOption] = useState(false);

  const handleOpenOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpenOption((prev) => !prev);
  };

  const handleSelectOption = (id: number, e: any) => {
    const temp = [...quantity];
    temp[id]++;
    setQuantity(temp);

    const clickedItem = data.find((v) => v.id === id) as any;
    const isExistList = selectedItemList.find((v) => v.id === clickedItem.id);

    if (!isExistList) {
      const newClickedItem = {
        ...clickedItem,
        quantity: clickedItem.quantity ? clickedItem?.quantity + 1 : 1,
        totalPrice:
          calcPrice(price as number) +
          (clickedItem.quantity
            ? clickedItem.price * (clickedItem.quantity + 1)
            : clickedItem.price),
      };
      setSelectedItemList((prev) => [...prev, newClickedItem]);
    } else {
      const newClickItem = [...selectedItemList];
      const foundItem = newClickItem.find((v) => v.id === id);
      if (foundItem) {
        foundItem.quantity++;
        foundItem.totalPrice += calcPrice(price) + foundItem.price;
      }
      setSelectedItemList(newClickItem);
    }
    setIsOpenOption(false);
  };

  const handleDeleteOption = (
    id: number,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const index = selectedItemList.findIndex((item) => id === item.id);
    console.log(index);
    setSelectedItemList((prev) => {
      const temp = [...prev];
      temp.splice(index, 1);
      return temp;
    });

    setQuantity((prev) => {
      const temp = [...prev];
      temp[id] = 0;
      return temp;
    });
  };

  const handleButtonClick = (id: number, buttonType: "add" | "substract") => {
    const newClickItem = [...selectedItemList];
    const foundItem = newClickItem.find((v) => v.id === id);

    if (foundItem) {
      if (buttonType === "add") {
        foundItem.quantity++;
        foundItem.totalPrice += calcPrice(price) + foundItem.price;
        setQuantity((prev) => {
          const temp = [...prev];
          temp[id]++;
          return temp;
        });
      } else if (buttonType === "substract") {
        if (quantity[id] === 1) return;
        foundItem.quantity--;
        foundItem.totalPrice -= calcPrice(price) + foundItem.price;
        setQuantity((prev) => {
          const temp = [...prev];
          temp[id]--;
          return temp;
        });
      }
    }
    setSelectedItemList(newClickItem);
  };

  const handleChange = (id: number, e: any) => {
    const temp = [...quantity];
    temp[id] = e.target.value;
    setQuantity(temp);
  };

  const handleBlur = (id: number, e: any) => {
    let _quantity = 0;
    if (quantity[id] < 1) {
      setQuantity((prev) => {
        const temp = [...prev];
        temp[id] = 1;
        return temp;
      });
      _quantity = 1;
    } else {
      _quantity = e.target.value;
    }
    const newClickItem = [...selectedItemList];
    const foundItem = newClickItem.find((v) => v.id === id);
    if (foundItem) {
      foundItem.quantity = _quantity;
      foundItem.totalPrice =
        (calcPrice(price) + foundItem.price) * foundItem.quantity;
    }
    setSelectedItemList(newClickItem);
  };


  useEffect(() => {
    console.log(selectedItemList);

    setTotalItemListPrice(
      selectedItemList
        .map((item) => item.totalPrice)
        .reduce((acc, cur) => acc + cur, 0),
    );

    const totalQuantity = selectedItemList
      .map((item) => item.quantity)
      .reduce((acc, cur) => acc + cur, 0);
    const regularPrice = totalQuantity * (price);
    const OptionPrice = selectedItemList
      .map((item) => item.quantity * item.price)
      .reduce((acc, cur) => acc + cur, 0);
    setTotalOriginalPrice(regularPrice + OptionPrice);
  }, [selectedItemList, price]);

  return (
    <div className="option pt-10">
      <div>
        <label className="font-semibold sm:text-base text-sm">상품옵션</label>
        <div
          className={cls(
            "dropbox-option mt-2 border sm:text-sm text-xs font-semibold text-slate-500",
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
            {itemOptions.map((item) => (
              <li
                key={item.id}
                className="p-2 hover:cursor-pointer hover:bg-orange-50"
                onClick={(e) => handleSelectOption(item.id, e)}
              >
                {` ${item.id} : ${item.name}`}{" "}
                {item.price > 0 && `(+${item.price})`}
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
                <button onClick={(e) => handleDeleteOption(item.id, e)}>
                  ❌
                </button>
              </div>

              <div className="flex justify-between">
                <div className="count-btn flex text-black">
                  <button
                    className="flex h-6 w-6 items-center justify-center border p-2 hover:bg-orange-50"
                    onClick={(e) => handleButtonClick(item.id, "substract")}
                  >
                    -
                  </button>

                  <input
                    className="flex h-6 w-10 items-center justify-center border text-center"
                    type="number"
                    value={quantity[item.id]}
                    onChange={(e) => handleChange(item.id, e)}
                    onBlur={(e) => {
                      handleBlur(item.id, e);
                    }}
                  />
                  <button
                    className="flex h-6 w-6 items-center justify-center border p-2 hover:bg-orange-50"
                    onClick={(e) => handleButtonClick(item.id, "add")}
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
            <span className="font-semibold text-slate-700">총 가격</span>
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
