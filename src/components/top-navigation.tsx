import NotFound from "@/app/not-found";
import db from "@/libs/db";
import getSession from "@/libs/session";
import { ShoppingCartIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { redirect } from "next/navigation";

const getUser = async () => {
  const session = await getSession();

  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session?.id,
      },
      select: {
        username: true,
      },
    });
    if (user) return user;
  }
  NotFound();
};

const TopNav = async () => {
  const user = await getUser();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };
  return (
    <div className="fixed z-50 h-32 w-full items-center justify-between border-b-2 border-yellow-500 bg-black sm:flex sm:h-14 sm:px-10 sm:py-10 sm:text-white md:px-20 lg:px-20">
      <div className="flex h-16 shrink-0 items-center bg-gradient-to-tr from-yellow-500 to-yellow-200 bg-clip-text px-4 text-xl font-bold text-transparent sm:px-0 lg:text-2xl">
        <Link href="/">YM Light</Link>
      </div>

      <ul className="grid grid-cols-4 bg-white text-center text-sm sm:flex sm:bg-black md:divide-x-2 md:text-base [&>li]:border [&>li]:px-2 [&>li]:py-2 sm:[&>li]:border-none h-16 items-center">
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
            <li>{user.username}님</li>
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
  );
};

export default TopNav;
