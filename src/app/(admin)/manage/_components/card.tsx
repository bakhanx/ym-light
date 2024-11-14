import React from "react";

type CellData = React.ReactNode | string | number | number[];
export type RowData = [CellData, string]; // [:data, :style]
export type TableData = RowData[][];

type CardProps = {
  headers: string[];
  data: TableData;
};


const Card = ({ headers, data }: CardProps) => {
  return (
    <div className="block space-y-4 lg:hidden">
      {data.length === 0 ? (
        <div className="rounded-lg border border-gray-500 p-4 shadow-md">
          주문 내역이 없습니다.
        </div>
      ) : (
        data.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="rounded-lg border border-gray-500 p-4 shadow-md"
          >
            {headers.map((header, headerIndex) => (
              <div key={headerIndex} className="mb-2">
                <span className="font-semibold">{header}:</span>{" "}
                {Array.isArray(row[headerIndex][0])
                  ? (row[headerIndex][0] as (|React.ReactNode|string|number)[]
                    )?.map((item, itemIndex) =>
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
        ))
      )}
    </div>
  );
};

export default Card;
