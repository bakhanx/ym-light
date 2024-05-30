import { revalidateTag } from "next/cache";
import Link from "next/link";
import React from "react";

const revalidateGallery = async () => {
  "use server";
  revalidateTag("gallery");
};

const Gallery = () => {
  return (
    <div className="pt-20">
      <div>갤러리 관리</div>
      <div className="flex gap-x-2 p-10">
        <button className="boerder-sm border border-blue-500 p-2">
          <Link href={`gallery/upload`}>업로드</Link>
        </button>
        <button className="boerder-sm border border-blue-500 p-2">
          <Link href={`gallery/edit`}>수정</Link>
        </button>
        <form action={revalidateGallery}>
          <button className="boerder-sm border border-blue-500 p-2">
            갤러리 정보 갱신
          </button>
        </form>
      </div>
    </div>
  );
};

export default Gallery;
