import { cls } from "@/utils/cls";
import React from "react";

type Pagination = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ currentPage, totalPages, onPageChange }: Pagination) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav>
      <ul className="flex justify-center gap-2 ">
        {pages.map((page) => (
          <li
            key={page}
            className={cls(
              page === currentPage ? "bg-[#181a2a] font-bold text-white border-transparent" : "",
              "rounded-md border-2 ",
            )}
          >
            <button onClick={() => onPageChange(page)} className="p-3 aspect-square flex justify-center items-center">
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
