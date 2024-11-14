import React from "react";
import Image from "next/image";

type CellData = React.ReactNode | string | number | number[];
type RowData = [CellData, string];
type CardProps = {
  headers: string[];
  data: RowData[][];
};

const Card = ({ headers, data }: CardProps) => {
  const renderCellContent = (
    cell: React.ReactNode | string | number | number[],
  ) => {
    if (Array.isArray(cell)) {
      return (cell as (React.ReactNode | string | number)[]).map(
        (item, itemIndex) =>
          typeof item === "object" && React.isValidElement(item) ? (
            <div key={itemIndex} className="mt-2">
              {item}
            </div>
          ) : (
            <span key={itemIndex} className="">
              {item}
            </span>
          ),
      );
    }
    return cell;
  };

  return (
    <div className="block space-y-4 lg:hidden">
      {data.length === 0 ? (
        <div className="rounded-lg border border-gray-500 p-4 shadow-md">
          불러올 데이터가 없습니다.
        </div>
      ) : (
        data.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="rounded-lg border border-gray-500 p-4 shadow-md"
          >
            {row[1][0] &&
              typeof row[1][0] === "string" &&
              row[1][0].startsWith("http") && (
                <div className="mb-4">
                  <Image
                    src={`${row[1][0]}/w=200`}
                    alt="Product Image"
                    className="h-16 w-16 object-cover"
                    width={64}
                    height={64}
                  />
                </div>
              )}
            {headers.map(
              (header, headerIndex) =>
                header !== "사진" && (
                  <div key={headerIndex} className="mb-2">
                    <span className="font-semibold">
                      {header}
                      {header !== "" && ": "}
                    </span>
                    {renderCellContent(row[headerIndex][0])}
                  </div>
                ),
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Card;
