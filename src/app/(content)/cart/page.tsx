"use client";
import React, { useEffect, useState } from "react";

const receivedData = [
  { id: 0, name: "a", price: 100 },
  { id: 1, name: "b", price: 200 },
  { id: 2, name: "c", price: 300 },
];

type selectedItemType = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
};

const Cart = () => {
  const [data, setData] = useState(receivedData);

  const [selectedItemList, setSelectedItemList] = useState<selectedItemType[]>(
    [],
  );
  const [totalItemListPrice, setTotalItemListPrice] = useState(0);

  const handleClick = (id: number, e: any) => {
    const temp = [...quantity];
    temp[id]++;
    setQuantity(temp);

    const clickedItem = data.find((v) => v.id === id) as any;
    const isExistList = selectedItemList.find((v) => v.id === clickedItem.id);

    if (!isExistList) {
      const newClickedItem = {
        ...clickedItem,
        quantity: clickedItem.quantity ? clickedItem?.quantity + 1 : 1,
        totalPrice: clickedItem.quantity
          ? clickedItem.price * (clickedItem.quantity + 1)
          : clickedItem.price,
      };
      setSelectedItemList((prev) => [...prev, newClickedItem]);
    } else {
      const newClickItem = [...selectedItemList];
      const foundItem = newClickItem.find((v) => v.id === id);
      if (foundItem) {
        foundItem.quantity++;
        foundItem.totalPrice = foundItem.price * foundItem.quantity;
      }
      setSelectedItemList(newClickItem);
    }
  };

  const handleButtonClick = (id: number, buttonType: "add" | "substract") => {
    const newClickItem = [...selectedItemList];
    const foundItem = newClickItem.find((v) => v.id === id);

    if (foundItem) {
      if (buttonType === "add") {
        foundItem.quantity++;
        foundItem.totalPrice += foundItem.price;
        setQuantity((prev) => {
          const temp = [...prev];
          temp[id]++;
          return temp;
        });
      } else if (buttonType === "substract") {
        if (quantity[id] === 1) return;
        foundItem.quantity--;
        foundItem.totalPrice -= foundItem.price;
        setQuantity((prev) => {
          const temp = [...prev];
          temp[id]--;
          return temp;
        });
      }
    }
    setSelectedItemList(newClickItem);
  };

  const [quantity, setQuantity] = useState(Array(data.length).fill(0));

  const handleChange = (id: number, e: any) => {
    if (e.target.value < 1) {
      return;
    }
    
    const temp = [...quantity];
    temp[id] = e.target.value;
    setQuantity(temp);
  };

  const handleBlur = (id: number, e: any) => {
    const newClickItem = [...selectedItemList];
    const foundItem = newClickItem.find((v) => v.id === id);
    if (foundItem) {
      foundItem.quantity = e.target.value;
      foundItem.totalPrice = foundItem.price * foundItem.quantity;
    }
    setSelectedItemList(newClickItem);
  };

  useEffect(() => {
    setTotalItemListPrice(
      selectedItemList
        .map((item) => item.totalPrice)
        .reduce((acc, cur) => acc + cur, 0),
    );
  }, [selectedItemList]);

  return (
    <div className="flex flex-col gap-x-2 p-10 pt-28">
      <div className="w-20 border">옵션 선택</div>
      <div className="w-20 border">
        {data.map((item) => (
          <div key={item.id} onClick={(e) => handleClick(item.id, e)}>
            {item.name}
          </div>
        ))}
      </div>

      <div>
        {selectedItemList.map((item) => (
          <div key={item.id}>
            {item.id} : {item.name}, {item.price}, quantity : {item.quantity},
            totalPrice :{item.totalPrice}
            <button
              className="border p-2"
              onClick={() => handleButtonClick(item.id, "substract")}
            >
              -
            </button>
            <input
              type="number"
              className="border"
              min={1}
              value={quantity[item.id]}
              onChange={(e) => handleChange(item.id, e)}
              onBlur={(e) => handleBlur(item.id, e)}
            />
            <button
              className="border p-2"
              onClick={() => handleButtonClick(item.id, "add")}
            >
              +
            </button>
          </div>
        ))}
      </div>

      <div>총 가격 :{totalItemListPrice}</div>
    </div>
  );
};

export default Cart;
