import db from "@/utils/db";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import DeleteForm from "@/app/(admin)/_components/deleteForm";
import { deleteGallery } from "../actions/deleteGallery";
import { formatDate } from "@/utils/formatDate";

const getGalleryList = async () => {
  const gallery = await db.gallery.findMany({
    select: {
      id: true,
      content: true,
      photo: true,
      created_at: true,
      updated_at: true,
    },
  });

  return gallery;
};

const Edit = async () => {
  const galleryList = await getGalleryList();

  return (
    <div className="min-h-screen max-w-screen-xl px-2 xl:px-0 pt-20 mx-auto">
      <h1 className="text-xl font-bold">갤러리 편집</h1>
      <div className="pt-10">
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-500">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="border border-gray-500 p-2">ID</th>
                <th className="border border-gray-500 p-2">사진</th>
                <th className="border border-gray-500 p-2">내용</th>
                <th className="border border-gray-500 p-2">최근 업데이트</th>
                <th className="border border-gray-500 p-2">게시일</th>
                <th className="border border-gray-500 p-2"></th>
              </tr>
            </thead>
            <tbody>
              {galleryList.map((gallery) => (
                <tr key={gallery.id} className="hover:bg-gray-200">
                  <td className="border border-gray-500 p-2 text-center">{gallery.id}</td>
                  <td className="border border-gray-500 p-2 text-center">
                    <Image src={`${gallery.photo}/thumbnail`} alt={String(gallery.id)} width={50} height={50} />
                  </td>
                  <td className="border border-gray-500 p-2 text-ellipsis overflow-hidden whitespace-nowrap">{gallery.content}</td>
                  <td className="border border-gray-500 p-2 text-center">{formatDate(gallery.updated_at)}</td>
                  <td className="border border-gray-500 p-2 text-center">{formatDate(gallery.created_at)}</td>
                  <td className="border border-gray-500 p-2 text-center flex gap-x-2 justify-center">
                    <Link href={`edit/${gallery.id}`}>
                      <button className="bg-slate-200 p-2">편집</button>
                    </Link>
                    <DeleteForm id={gallery.id} action={deleteGallery} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="block lg:hidden">
          {galleryList.map((gallery) => (
            <div key={gallery.id} className="mb-4 border border-gray-500 p-4 rounded-lg shadow-md">
              <div className="flex justify-between mb-2">
                <h2 className="text-lg font-semibold">ID: {gallery.id}</h2>
                <div className="flex gap-x-2">
                  <Link href={`edit/${gallery.id}`}>
                    <button className="bg-slate-200 p-2">편집</button>
                  </Link>
                  <DeleteForm id={gallery.id} action={deleteGallery} />
                </div>
              </div>
              <Image src={`${gallery.photo}/thumbnail`} alt={String(gallery.id)} width={300} height={300} className="w-full h-32 object-cover mb-2" />
              <p className="mb-1"><span className="font-semibold">내용:</span> {gallery.content}</p>
              <p className="mb-1"><span className="font-semibold">최근 업데이트:</span> {formatDate(gallery.updated_at)}</p>
              <p className="mb-1"><span className="font-semibold">게시일:</span> {formatDate(gallery.created_at)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Edit;
