import Image from "next/image";
import React, { useRef, useState } from "react";
import product2 from "@/../../public/images/entro-chandelier-001.jpg";

type CardProps = {
  name: string;
};

const Card = ({ name }: CardProps) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [bgPosition, setBgPosition] = useState<number | string>(0);
  const [bgOpacity, setBgOpacity] = useState(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    let x = event.nativeEvent.offsetX;
    let y = event.nativeEvent.offsetY;
    setRotateY((-1 / 5) * x + 20);
    setRotateX((4 / 30) * y - 20);
    setBgPosition(`${x / 5 + y / 5}%`);
    setBgOpacity(x / 200);
  };

  const handleMouseOut = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setRotateY(0);
    setRotateX(0);
    setBgOpacity(0);
    setBgPosition(`100%`);
  };

  const cardStyle = {
    transform: `perspective(350px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
  };

  const overlayStyle = {
    background:
      "linear-gradient(105deg, transparent 40%, rgba(255,219,112,0.8) 45%, rgba(132,50,255,0.6) 50%, transparent 54%)",
    backgroundSize: "150% 150%",
    backgroundPosition: bgPosition,
    filter: `brightness(1.2) opacity(${bgOpacity})`,
    mixBlendMode: "color-dodge" as const,
  };

  return (
    <div
      className=""
      onMouseMove={handleMouseMove}
      onMouseOut={handleMouseOut}
      style={cardStyle}
    >
      <div className="h-64 w-40 rounded-xl bg-gray-800 shadow-md max-[480px]:w-36 sm:h-80 sm:w-64 ">
        <div className="relative h-full rounded-xl bg-slate-200">
          <Image
            src={product2}
            fill
            style={{ objectFit: "cover", objectPosition: "top" }}
            quality={100}
            alt="product2"
            sizes="1"
            className="rounded-md"
          />

          {/* Light overlay */}
          <div className="absolute z-30 h-full w-full" style={overlayStyle} />

          <div className="absolute bottom-0 z-20 flex w-full items-center  justify-center rounded-b-md bg-black bg-opacity-50 p-5 text-white ">
            {name}
          </div>

          {/* black opacity overlay */}
          <div className="absolute z-10 hidden h-full w-full bg-black opacity-40" />
        </div>
      </div>
    </div>
  );
};

export default Card;
