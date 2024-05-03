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
    <div className="fixed z-50 flex h-14 w-full items-center justify-between border-b-2 border-yellow-500 bg-black lg:px-20 md:px-10 px-5 py-10 text-white">
      <div className="bg-gradient-to-tr from-yellow-500 to-yellow-200 bg-clip-text text-2xl font-bold text-transparent">
        <Link href="/">YM Light</Link>
      </div>
      <ul className="flex divide-x-2 [&>li]:px-2">
        <li className="text-black">
          <select>
            <option>한국어</option>
            <option>English</option>
            <option>中國語</option>
          </select>
        </li>
        <li>
          <Link href="/products">Product</Link>
        </li>
        <li>
          <Link href="/gallery">Gallery</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
        <li>
          <Link href="/faq">FAQ</Link>
        </li>
        <li>
          <Link href="/manage">Admin</Link>
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
            <Link href="/login">Login</Link>
          </li>
        )}

        <li>
          <Link href="/cart">
            <span className="flex h-6 w-6 items-center justify-center">
              <ShoppingCartIcon className="h-6 w-6" />
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default TopNav;
