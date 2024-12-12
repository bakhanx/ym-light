"use client";
import { cls } from "@/utils/cls";
import { sideNavLinks } from "@/utils/constants/sideNavLinks";
import { Bars3Icon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const SideNavigation = () => {
  const [isVisible, setIsVisible] = useState(true);
  const handleToggle = () => {
    setIsVisible((prev) => !prev);
  };

  const pathname = usePathname();
  console.log(pathname);

  return (
    <>
      {/* Desktop */}
      <div className="mt-20 hidden min-h-screen min-w-48 bg-slate-800 text-white sm:block md:w-[calc((100%-1280px)/2)]">
        <div className="border-b-2 p-3 text-center font-bold italic">
          관리자 페이지
        </div>
        <nav className="mt-4">
          {sideNavLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link href={link.href} key={link.key} className=" ">
                <div
                  className={cls(
                    isActive ? "bg-gray-700" : "bg-none",
                    `flex items-center gap-x-4 rounded px-4 py-2.5 text-white transition duration-200 `,
                  )}
                >
                  <Icon className="size-4 text-white" />
                  {link.name}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile */}
      <div className="fixed right-0 z-navigation pt-28 sm:hidden">
        <div className="flex w-full justify-end">
          <button onClick={handleToggle}>
            <Bars3Icon className="size-8 bg-black text-white" />
          </button>
        </div>

        <div
          className={`${cls(isVisible ? "" : " translate-x-48 ", "absolute right-0 grid items-center gap-y-4 border bg-blue-900 bg-opacity-90 p-1 text-sm text-white transition-transform duration-300 sm:gap-x-8 md:text-base [&>button]:w-40")}`}
        >
          {sideNavLinks.map((navLink) => (
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
    </>
  );
};

export default SideNavigation;
