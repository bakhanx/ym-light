"use client";

import { logOut } from "@/actions/logout";
import getCartItems from "@/app/(content)/cart/actions/getCartItems";


import { useCartStore } from "@/store/useCartStore";
import { cls } from "@/utils/cls";
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

const whitePaths = ["/products", "/gallery", "/manage", "/cart", "/chats"];

const TopNavigation = ({ user }: TopNavProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isBgWhitePaths = whitePaths.some((whitePath) =>
    pathname.startsWith(whitePath),
  );
  const { cart, isDataLoaded, setInitData } = useCartStore();

  useEffect(() => {
    const getCart = async () => {
      if (!isDataLoaded && user) {
        const cartItems = await getCartItems(user.id);
        if (cartItems) {
          setInitData(cartItems);
          console.log("cart store init")
        }
      }
    };
    getCart();
    
  }, []);

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
        "transion-color fixed z-50  w-full items-center justify-between py-4 text-white duration-500 sm:flex sm:py-6 ",
      )}
    >
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col px-4  sm:flex-row  md:px-20">
        <div className="flex w-full justify-between">
          <div className="flex  shrink-0 items-center bg-gradient-to-tr from-yellow-500 to-yellow-200 bg-clip-text text-xl font-bold text-transparent md:text-2xl">
            <Link href="/">YM Light</Link>
          </div>

          <div className="flex items-center gap-x-1 text-gray-300 sm:pr-2">
            {user ? (
              <>
                <span>{user?.username}님</span>
                <span>
                  <form action={logOut}>
                    <button className="text-sm  underline">로그아웃</button>
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

        <ul className="flex w-full items-center justify-between  pt-2 text-sm  sm:flex sm:w-auto  sm:shrink-0 sm:pt-0 md:divide-x-2 md:text-base [&>li]:flex [&>li]:h-8 [&>li]:items-center [&>li]:justify-center sm:[&>li]:border-none sm:[&>li]:px-2 ">
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
          {user?.id === 1 && (
            <li>
              <Link href="/manage">관리자</Link>
            </li>
          )}

          <li className="relative">
            <Link href="/cart">장바구니</Link>
            <span className="text-bold absolute -right-2 -top-4 flex min-w-5 items-center justify-center rounded-full border-[1px] border-red-400 bg-red-400 px-[7px] pb-[1px] text-sm text-white">
              {cart.length}
            </span>
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

export default TopNavigation;
