import React from "react";

export type TableProps = {
  headers: string[];
  data: (React.ReactNode | string | number | number[])[][][];
};

const Table = ({ headers, data }: TableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-500">
        <thead className="bg-gray-700 text-white">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="border border-gray-500 p-2">
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, rowIndex) => (
            <>
              <tr key={rowIndex} className="hover:bg-gray-200">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`border border-gray-500 p-2 ${cell[1]}`}
                  >
                    {cell[0]}
                  </td>
                ))}
              </tr>
             
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
