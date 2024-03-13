"use client";
import React, { useState } from "react";



const Cart = () => {
  const [num, setNum] = useState([
    { id: 1, cnt: 1 },
    { id: 2, cnt: 10 },
  ]);

  const [test, setTest] = useState([{ id: 0 }, { id: 10 }]);

  const plusNum = (id: number) => {
    setTest((prev) => {
      let temp = [...prev];
      temp[0].id = temp[0].id + 1;
      console.log("a");
      return temp;
    });
  };

  const handleClick = (
    id: number,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    console.log("버튼 클릭");
    console.log(id);

    plusNum(id);
  };

  return (
    <div className="p-10 pt-28">
      <div key={0}>
        <button
          className="bg-blue-500 text-white"
          onClick={(e) => handleClick(0, e)}
        >
          버튼1
        </button>
        <div>{num[0].cnt}</div>
      </div>

      <div key={1}>
        <button
          className="bg-blue-500 text-white"
          onClick={(e) => handleClick(1, e)}
        >
          버튼2
        </button>
        <div>{num[1].cnt}</div>
      </div>

      <div>
        Test : {test[0].id} {test[1].id}
      </div>
    </div>
  );
};

export default Cart;
