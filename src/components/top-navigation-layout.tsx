"use client";

import { logOut } from "@/app/action";
import { cls } from "@/libs/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

type TopNavProps = {
  user:
    | {
        username: string;
        id: number;
        loginId: string;
      }
    | undefined;
};

const whitePaths = ["/products", "/gallery", "/manage", "/cart"];

const TopNavigationLayout = ({ user }: TopNavProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isBgWhitePaths = whitePaths.some((whitePath) =>
    pathname.startsWith(whitePath),
  );
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cls(
        isScrolled || isBgWhitePaths
          ? "bg-[#010315] bg-opacity-90"
          : "bg-transparent",
        "transion-color fixed z-50  w-full items-center justify-between text-white duration-500 sm:flex sm:py-6 py-4 ",
      )}
    >
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col sm:flex-row  px-4  md:px-20">
        <div className="flex justify-between w-full">
          <div className="flex  shrink-0 items-center bg-gradient-to-tr from-yellow-500 to-yellow-200 bg-clip-text text-xl font-bold text-transparent md:text-2xl">
            <Link href="/">YM Light</Link>
          </div>

          <div className="flex items-center gap-x-1 sm:pr-2 text-gray-300">
            {user ? (
              <>
                <span>{user?.username}님</span>
                <span>
                  <form action={logOut}>
                    <button className="text-sm  underline">
                      로그아웃
                    </button>
                  </form>
                </span>
              </>
            ) : (
              <span>
                <Link href="/login" className="text-sm underline">
                  로그인
                </Link>
              </span>
            )}
          </div>
        </div>

        <ul className="pt-2 sm:pt-0 flex justify-between  w-full items-center  text-sm sm:flex  sm:w-auto md:divide-x-2 md:text-base [&>li]:flex [&>li]:h-8 [&>li]:items-center sm:shrink-0 [&>li]:justify-center sm:[&>li]:px-2 sm:[&>li]:border-none ">
          <li>
            <Link href="/products">조명</Link>
          </li>
          <li>
            <Link href="/gallery">갤러리</Link>
          </li>
          <li>
            <Link href="/about">소개</Link>
          </li>
          <li>
            <Link href="/contact">문의</Link>
          </li>
          <li>
            <Link href="/manage">관리자</Link>
          </li>

          <li>
            <Link href="/cart">
              장바구니
              {/* icon */}
              {/* <span className="flex h-6 w-6 items-center justify-center">
            <ShoppingCartIcon className="h-6 w-6" />
          </span> */}
            </Link>
          </li>

          {/* <li className="text-black">
        <select>
          <option>한국어</option>
          <option>English</option>
          <option>中國語</option>
        </select>
      </li> */}
        </ul>
      </div>
      {/* <div className="h-1 w-full bg-gradient-to-r from-amber-100 via-amber-500 to-yellow-200 sm:hidden" /> */}
    </div>
  );
};

export default TopNavigationLayout;
