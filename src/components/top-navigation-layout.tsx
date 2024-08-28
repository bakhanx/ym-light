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

const bgWhitePath = ["/products", "/gallery", "/manage", "/cart"];

const TopNavigationLayout = ({ user }: TopNavProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

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
        isScrolled || bgWhitePath.includes(pathname)
          ? "bg-black"
          : "bg-transparent",
        "transion-color fixed z-50 h-36 w-full items-center justify-between text-white duration-500 sm:flex sm:h-14 sm:py-10",
      )}
    >
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col justify-between px-4 sm:flex-row md:px-20">
        <div className="flex h-16 shrink-0 items-center bg-gradient-to-tr from-yellow-500 to-yellow-200 bg-clip-text text-xl font-bold text-transparent md:text-2xl">
          <Link href="/">YM Light</Link>
        </div>

        <ul className="grid h-16 w-full grid-cols-4 items-center  text-sm sm:flex  sm:w-auto md:divide-x-2 md:text-base [&>li]:flex [&>li]:h-8 [&>li]:items-center  [&>li]:justify-center [&>li]:border [&>li]:px-2 sm:[&>li]:border-none ">
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
            <Link href="/faq">FAQ</Link>
          </li>
          <li>
            <Link href="/manage">관리자</Link>
          </li>

          {user ? (
            <>
              <li>{user?.username}님</li>
              <li>
                <form action={logOut}>
                  <button>로그아웃</button>
                </form>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login">로그인</Link>
            </li>
          )}

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
