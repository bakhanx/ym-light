import db from "@/utils/db";
import React from "react";

import Link from "next/link";
import Table, { RowData } from "../../_components/table";
import Card from "../../_components/card";
import { formatDate } from "@/utils/formatDate";
import DeleteForm from "@/app/(admin)/_components/deleteForm";
import { deleteGallery } from "../actions/deleteGallery";

const getGalleryList = async () => {
  const gallery = await db.gallery.findMany({
    select: {
      id: true,
      content: true,
      photo: true,
      views: true,
      tags: {
        select: {
          name: true,
        },
      },
      created_at: true,
      updated_at: true,
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });

  return gallery;
};

const Edit = async () => {
  const galleryList = await getGalleryList();

  const headers = [
    "ID",
    "사진",
    "내용",
    "좋아요수",
    "조회수",
    "태그",
    "최근 업데이트",
    "게시일",
    "",
  ];

  const data: RowData[][] =
    galleryList.length > 0
      ? galleryList.map((gallery) => {
          const galleryData: RowData[] = [
            [gallery.id, "text-center"],
            [gallery.photo, "text-center"],
            [gallery.content, ""],
            [gallery._count.likes, "text-center"],
            [gallery.views, "text-center"],
            [gallery.tags.map((tag) => tag.name), "text-left"],
            [formatDate(gallery.updated_at), ""],
            [formatDate(gallery.created_at), ""],
            [
              <div
                key={gallery.id}
                className="flex gap-x-2 whitespace-nowrap lg:flex-col lg:justify-center"
              >
                <Link href={`edit/${gallery.id}`}>
                  <button className="bg-slate-200 p-2">편집</button>
                </Link>
                <DeleteForm id={gallery.id} action={deleteGallery} />
              </div>,
              "text-center",
            ],
          ];
          return galleryData;
        })
      : [];

  return (
    <div className="mx-auto min-h-screen max-w-screen-xl px-2 pt-28 xl:px-0">
      <h1 className="text-xl font-bold">갤러리 편집</h1>
      <div className="pt-10">
        <div className="hidden lg:block">
          <Table headers={headers} data={data} />
        </div>
        <div className="block lg:hidden">
          <Card headers={headers} data={data} />
        </div>
      </div>
    </div>
  );
};

export default Edit;
