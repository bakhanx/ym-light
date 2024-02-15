import Link from "next/link";

const TopNav = () => {
  return (
    <div className="fixed z-50 flex h-14 w-full items-center justify-between border-b-2 border-yellow-500 bg-black p-4 text-white">
      <div className="text-xl font-bold">
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
          <Link href="/product">Product</Link>
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
      </ul>
    </div>
  );
};

export default TopNav;
