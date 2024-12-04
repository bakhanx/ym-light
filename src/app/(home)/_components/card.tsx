"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import neoncard from "@/styles/NeonCard.module.css";
import { BLUR_DATA_URL_GRAY } from "../../../../public/images/base64/blur-gray-skeleton";

type CardProps = {
  name: string;
  photoURL: string;
  discount: number | undefined;
};

const Card = ({ name, discount, photoURL }: CardProps) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [bgPosition, setBgPosition] = useState<number | string>(0);
  const [bgOpacity, setBgOpacity] = useState(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (window.innerWidth >= 1024) {
      let x = event.nativeEvent.offsetX;
      let y = event.nativeEvent.offsetY;
      setRotateY((-1 / 5) * x + 20);
      setRotateX((4 / 30) * y - 20);
      setBgPosition(`${x / 5 + y / 5}%`);
      setBgOpacity(x / 200);
    }
  };

  const handleMouseOut = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (window.innerWidth >= 1024) {
      setRotateY(0);
      setRotateX(0);
      setBgOpacity(0);
      setBgPosition(`100%`);
    }
  };

  const cardStyle = {
    transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
  };

  const overlayStyle = {
    background:
      "linear-gradient(105deg, transparent 30%, rgba(255,219,112,0.4) 45%, rgba(230, 158, 51, 0.3)50%, transparent 80%)",
    backgroundSize: "150% 150%",
    backgroundPosition: bgPosition,
    filter: `brightness(1.2) opacity(${bgOpacity})`,
    mixBlendMode: "color-dodge" as const,
  };

  return (
    <div
      className="flex justify-center"
      onMouseMove={handleMouseMove}
      onMouseOut={handleMouseOut}
      style={cardStyle}
    >
      {/* 카드 황금비율 1:1.58 */}
      <div
        className={`h-[237px] w-[150px] rounded-xl  border-gray-300 bg-gray-800 min-[480px]:h-[316px] min-[480px]:w-[200px]  xl:h-[474px] xl:w-[300px] ${neoncard.container}`}
      >
        <div
          className={`relative h-full rounded-xl border-orange-50 bg-slate-200 ${neoncard.card} `}
        >
          <Image
            src={`${photoURL}/fit=scale-down,w=480,sharpen=1`}
            fill
            quality={100}
            alt="product2"
            sizes="1"
            className="rounded-md object-cover"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL_GRAY}
          />

          {/* Light overlay */}
          <div className="absolute z-30 h-full w-full " style={overlayStyle} />

          <div className="absolute bottom-0 z-20 flex w-full items-center justify-center rounded-b-md border-t bg-black bg-opacity-50 p-5 text-xs text-white sm:p-5 sm:text-base">
            <p className="truncate">{name}</p>
          </div>
          {discount && (
            <div className="absolute left-0 top-0 rounded-br-md rounded-tl-md bg-red-500 p-2 text-sm font-bold text-white md:text-base lg:text-xl">
              {discount}%
            </div>
          )}

          {/* black opacity overlay */}
          <div className="absolute z-10 hidden h-full w-full bg-black opacity-40" />
        </div>
      </div>
    </div>
  );
};

export default Card;
