"use client";
import { cls } from "@/utils/cls";
import { topNavLinks } from "@/utils/constants/topNavLinks";
import { Bars3Icon } from "@heroicons/react/16/solid";
import Link from "next/link";
import React, { useState } from "react";

const SideNavigation = () => {
  const [isVisible, setIsVisible] = useState(true);
  const handleToggle = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="fixed right-0 pt-28 z-50">
      <div className="flex w-full justify-end">
        <button onClick={handleToggle}>
          <Bars3Icon className="size-8 bg-black text-white" />
        </button>
      </div>

      <div
        className={`${cls(isVisible ? "" : " translate-x-48 ", "absolute right-0 grid items-center gap-y-4 border duration-300 bg-blue-900 bg-opacity-90 p-1 text-sm text-white transition-transform sm:gap-x-8 md:text-base [&>button]:w-40")}`}
      >
        {topNavLinks.map((navLink) => (
          <Link
            key={navLink.key}
            href={navLink.href}
            className="border-sm w-20 p-1 text-center hover:bg-blue-200 sm:w-24"
          >
            {navLink.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideNavigation;
