// components/Card.tsx
import React from "react";
import Image from "next/image";

export type CardProps = {
  headers: string[];
  data: (React.ReactNode | string | number | number[])[][][];
};

const Card = ({ headers, data }: CardProps) => {
  if (data.length === 0) {
    return <div>주문 내역이 없습니다.</div>;
  }
  return (
    <div className="block space-y-4 lg:hidden">
      {data.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="rounded-lg border border-gray-500 p-4 shadow-md"
        >
          {headers.map((header, headerIndex) => (
            <div key={headerIndex} className="mb-2">
              <span className="font-semibold">{header}:</span>
              {Array.isArray(row[headerIndex][0])
                ? row[headerIndex][0]?.map((item, itemIndex) =>
                    typeof item === "object" && React.isValidElement(item) ? (
                      <div key={itemIndex} className="mt-2">
                        {item}
                      </div>
                    ) : (
                      <span key={itemIndex} className="block">
                        {item}
                      </span>
                    ),
                  )
                : row[headerIndex][0]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Card;
