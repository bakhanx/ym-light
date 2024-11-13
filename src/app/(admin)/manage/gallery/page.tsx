import { revalidateTag } from "next/cache";
import Link from "next/link";
import React from "react";

const revalidateGallery = async () => {
  "use server";
  revalidateTag("gallery");
};

const navLinks = [
  { key: "upload", name: "업로드", href: "gallery/upload" },
  { key: "edit", name: "갤러리 수정", href: "gallery/edit" },
];

const Gallery = () => {
  return (
    <div className="mx-auto min-h-screen max-w-screen-xl pt-28 px-2 xl:px-0">
      <div>갤러리 관리</div>
      <div className="pt-10 flex flex-col items-center gap-y-8 sm:gap-x-8 md:flex-row [&>button]:w-40 ">
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
