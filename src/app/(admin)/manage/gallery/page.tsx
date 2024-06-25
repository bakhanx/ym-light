import { revalidateTag } from "next/cache";
import Link from "next/link";
import React from "react";

const revalidateGallery = async () => {
  "use server";
  revalidateTag("gallery");
};

const Gallery = () => {
  return (
    <div className="pt-10 mx-auto h-[60vh] max-w-screen-2xl">
      <div>갤러리 관리</div>
      <div className="flex sm:gap-x-8 gap-y-8 p-10 flex-col  md:flex-row items-center [&>button]:w-40 ">
        <button className="boerder-sm border border-blue-500 p-4">
          <Link href={`gallery/upload`}>업로드</Link>
        </button>
        <button className="boerder-sm border border-blue-500 p-4">
          <Link href={`gallery/edit`}>수정</Link>
        </button>
        <form action={revalidateGallery}>
          <button className="boerder-sm border border-blue-500 p-4 w-40">
            갤러리 정보 갱신
          </button>
        </form>
      </div>
    </div>
  );
};

export default Gallery;
