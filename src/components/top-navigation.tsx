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
  NotFound()
};


const TopNav = async () => {
  const user = await getUser();
  const logOut = async ()=>{
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/")
  }
  return (
    <div className="fixed z-50 sm:flex sm:h-14 w-full items-center justify-between border-b-2 border-yellow-500 bg-black lg:px-20 md:px-10 sm:py-10 sm:text-white h-32">

      <div className="bg-gradient-to-tr from-yellow-500 to-yellow-200 bg-clip-text lg:text-2xl font-bold text-transparent text-xl shrink-0 h-16 px-4 items-center flex">
        <Link href="/">YM Light</Link>
      </div>

      <ul className="md:flex md:divide-x-2 text-sm md:text-base [&>li]:px-2 [&>li]:py-1 sm:columns-5 bg-white [&>li]:border sm:[&>li]:border-none text-center grid grid-cols-4 sm:bg-black">

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
            <span className="flex h-6 w-6 items-center justify-center">
              <ShoppingCartIcon className="h-6 w-6" />
            </span>
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
