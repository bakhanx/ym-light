"use client"

import { cls } from "@/utils/cls";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const links = [
  { path: "/my/home", label: "나의쇼핑 홈" },
  { path: "/my/order", label: "주문내역" },
  { path: "/my/cart", label: "장바구니" },
  { path: "/contact", label: "문의하기" },
];

const Sidebar = () => {
  const pathName = usePathname();

  return (
    <div className="left flex w-[200px] flex-col divide-y-[1px] rounded-md bg-white text-lg [&>a:hover]:bg-gray-100 [&>a]:p-6 ">
      {links.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          className={cls(
            pathName === link.path ? "font-bold text-orange-500" : "",
          )}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
