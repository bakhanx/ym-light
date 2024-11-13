// components/Card.tsx
import React from "react";
import Image from "next/image";

export type CardProps = {
  headers: string[];
  data: (React.ReactNode | string | number | number[])[][][];
};

const Card = ({ headers, data }: CardProps) => {
  return (
    <div className="block lg:hidden space-y-4">
      {data.map((row, rowIndex) => (
        <div key={rowIndex} className="border border-gray-500 p-4 rounded-lg shadow-md">
          {headers.map((header, headerIndex) => (
            <div key={headerIndex} className="mb-2">
              <span className="font-semibold">{header}:</span> {" "}
              {Array.isArray(row[headerIndex][0]) 
                ? row[headerIndex][0].map((item, itemIndex) => (
                    typeof item === 'object' && React.isValidElement(item) ? (
                      <div key={itemIndex} className="mt-2">{item}</div>
                    ) : (
                      <span key={itemIndex} className="block">{item}</span>
                    )
                  ))
                : row[headerIndex][0]
              }
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Card;
