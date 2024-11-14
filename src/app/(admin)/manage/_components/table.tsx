import React from "react";
import Image from "next/image";

export type CellData = React.ReactNode | string | number | number[];
export type RowData = [CellData, string];
export type TableProps = {
  headers: string[];
  data: RowData[][];
};

const Table = ({ headers, data }: TableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-500">
        <thead className="bg-gray-700 text-white">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="whitespace-nowrap border border-gray-500 p-2"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              <tr className="hover:bg-gray-200">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`border border-gray-500 p-2 ${cell[1]}`}
                  >
                    {typeof cell[0] === "string" &&
                    cell[0].startsWith("http") ? (
                      <div className=" flex justify-center">
                        <Image
                          src={`${cell[0]}/w=200`}
                          alt={`${cellIndex}`}
                          className="min-h-16 min-w-16 object-cover"
                          width={64}
                          height={64}
                        />
                      </div>
                    ) : (
                      cell[0]
                    )}
                  </td>
                ))}
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
