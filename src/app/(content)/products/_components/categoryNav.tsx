"use client";

import { useRouter } from "next/navigation";
import React from "react";

const categories = [
  { value: "all", label: "전체상품" },
  { value: "chandelier", label: "샹들리에" },
  { value: "neonsign", label: "네온사인" },
  { value: "walllamp", label: "벽등" },
  { value: "moodlamp", label: "무드등" },
];

export const CategoryNav = () => {
  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    router.push(`/products?category=${category}`);
  };

  return (
    <div className="w-full border-y-2">
      <div className="flex sm:text-base sm:gap-x-8 px-2 py-4 gap-x-4 text-sm overflow-x-auto whitespace-nowrap">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => handleCategoryClick(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryNav;
