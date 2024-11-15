"use client";

import { logOut } from "@/actions/logout";
import { useUserStore } from "@/store/useUserStore";
import { cls } from "@/utils/cls";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const whitePaths = ["/products", "/gallery", "/manage", "/cart", "/chats"];

type UserType = {
  id: number;
  username: string;
  cartItemCount: number;
};

const TopNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  // const [user, setUser] = useState<UserType | null>(null);
  const { user, setUser } = useUserStore();
  const [cartItemCount, setCartItemCount] = useState(
    user ? user.cartItemCount : 0,
  );
  const pathname = usePathname();
  const isBgWhitePaths = whitePaths.some((whitePath) =>
    pathname.startsWith(whitePath),
  );
  const handleLogout = async () => {
    localStorage.removeItem("user-storage");
    sessionStorage.removeItem("cart");
    sessionStorage.removeItem("chat");
    await logOut();
    window.location.href = "/";
  };

  useEffect(() => {
    useUserStore.persist.rehydrate();

    const storedUserData = localStorage.getItem("user-storage");
    if (storedUserData) {
      const _user = JSON.parse(storedUserData).state.user;
      if (_user) {
        setUser(_user);
        setCartItemCount(_user.cartItemCount);
      }
    }

    const unsubscribe = useUserStore.subscribe((state) => {
      const cartItemCount = state.user?.cartItemCount;
      setCartItemCount(cartItemCount || 0);
    });

    return () => unsubscribe();
  }, [setUser]);

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
        "fixed z-navigation w-full items-center justify-between py-4 text-white duration-500 sm:flex sm:py-6",
      )}
    >
      <div className="mx-auto flex w-full max-w-screen-xl flex-col px-2 sm:px-4 sm:flex-row xl:px-0">
        <div className="flex w-full justify-between">
          <div className="flex shrink-0 items-center bg-gradient-to-tr from-yellow-500 to-yellow-200 bg-clip-text text-xl font-bold text-transparent md:text-2xl">
            <Link href="/">YM Light</Link>
          </div>
          <div className="flex items-center gap-x-1 text-gray-300 sm:pr-2">
            {user ? (
              <>
                <span>{user.username}님</span>
                <span>
                  <button onClick={handleLogout} className="text-sm underline">
                    로그아웃
                  </button>
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

        <ul className="flex w-full items-center justify-between pt-2 text-sm sm:flex sm:w-auto sm:shrink-0 sm:pt-0 md:divide-x-2 md:text-base [&>li]:flex [&>li]:h-8 [&>li]:items-center [&>li]:justify-center sm:[&>li]:border-none sm:[&>li]:px-2">
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
            {user && (
              <span className="text-bold absolute -right-2 -top-2 flex min-w-[1.25rem] max-w-[3rem] items-center justify-center overflow-hidden text-ellipsis rounded-full border border-red-400 bg-red-500 px-1.5 text-xs text-white">
                {cartItemCount}
              </span>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TopNavigation;
