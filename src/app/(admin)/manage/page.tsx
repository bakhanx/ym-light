"use client";

import Link from "next/link";
import React from "react";

const navLinks = [
  { key: "product", name: "상품관리", href: "/manage/product" },
  { key: "gallery", name: "갤러리관리", href: "/manage/gallery" },
  { key: "about", name: "소개관리", href: "/manage/about" },
  { key: "contact", name: "연락관리", href: "/manage/contact" },
  // { key: "faq", name: "FAQ관리", href: "/manage/faq" },
  { key: "chats", name: "채팅관리", href: "/manage/chats" },
  { key: "test", name: "테스트", href: "/manage/test" },

];

const Manage = () => {
  return (
    <div className="mx-auto max-w-screen-2xl sm:h-[60vh]">
      <div className="flex flex-col items-center gap-y-8 p-10  sm:gap-x-8 md:flex-row [&>button]:w-40 ">
        {navLinks.map((navLink) => (
          <Link
            key={navLink.key}
            href={navLink.href}
            className="boerder-sm w-40 border border-blue-500 p-4 text-center hover:bg-blue-200"
          >
            {navLink.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Manage;
