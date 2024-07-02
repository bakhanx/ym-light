import { revalidateTag } from "next/cache";
import Link from "next/link";
import React from "react";

const revalidateGallery = async () => {
  "use server";
  revalidateTag("gallery");
};

const navLinks = [
  { key: "upload", name: "업로드", href: "gallery/upload" },
  { key: "edit", name: "상품수정", href: "gallery/edit" },
];

const Gallery = () => {
  return (
    <div className="mx-auto h-[60vh] max-w-screen-2xl pt-10">
      <div>갤러리 관리</div>
      <div className="flex flex-col items-center gap-y-8 p-10  sm:gap-x-8 md:flex-row [&>button]:w-40 ">
        {navLinks.map((navLink) => (
          <Link
            href={navLink.href}
            key={navLink.key}
            className="border-sm w-40 border border-blue-500 p-4 text-center hover:bg-blue-200"
          >
            {navLink.name}
          </Link>
        ))}

        <form action={revalidateGallery}>
          <button className="boerder-sm w-40 border border-blue-500 bg-amber-200 p-4 hover:bg-amber-300">
            갤러리 정보 갱신
          </button>
        </form>
      </div>
    </div>
  );
};

export default Gallery;
