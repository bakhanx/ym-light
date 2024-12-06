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
      <ul className="flex gap-2">
        {pages.map((page) => (
          <li key={page} className={page === currentPage ? "font-bold" : ""}>
            <button onClick={() => onPageChange(page)}>{page}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
