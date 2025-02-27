"use server";
import db from "@/utils/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const formSchema = z.object({
  content: z
    .string({ required_error: "내용을 입력해주세요." })
    .min(1, "내용을 입력해주세요.")
    .max(1000, "글자 수 한도를 초과하였습니다."),
  photo: z.string({ required_error: "사진을 등록해주세요." }),
  tag: z.string().optional(),
});

export const uploadGallery = async (formData: FormData, galleryId?: number) => {
  const datas = Object.fromEntries(formData.entries());
  const data = {
    content: formData.get("content"),
    photo: formData.get("photo"),
    tag: formData.get("tag"),
  };
  const result = formSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const isExistsTag = Boolean(
      await db.tag.findUnique({
        where: {
          name: result.data.tag,
        },
      }),
    );

    if (!isExistsTag) {
      await db.tag.create({
        data: {
          name: result.data.tag || "",
        },
      });
    }
    const galleryData = {
      content: result.data.content,
      tags: { connect: { name: result.data.tag } },
      photo: result.data.photo,
    };

    const gallery = galleryId
      ? await db.gallery.update({
          where: { id: Number(galleryId) },
          data: galleryData,
          select: { id: true },
        })
      : await db.gallery.create({
          data: galleryData,
          select: { id: true },
        });

    revalidateTag("gallery");
    revalidatePath(`gallery/${gallery.id}`);
    redirect(`/gallery`);
  }
};
