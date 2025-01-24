"use server";

import db from "@/utils/db";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import { z } from "zod";

const productSchema = z.object({
  name: z.string({ required_error: "상품명을 입력해주세요." }),
  price: z.coerce.number({ required_error: "가격을 입력해주세요." }),
  stock: z.coerce.number({ required_error: "재고를 입력해주세요." }),
  discount: z.coerce.number().optional(),
  color: z.string().optional(),
  material: z.string().optional(),
  size: z.string().optional(),
  bulb: z.string({ required_error: "전구타입을 입력해주세요." }),
  manufacturer: z.string({ required_error: "제조사를 입력해주세요." }),
  description: z.string().optional(),
  photos: z.array(z.string({ required_error: "사진을 등록해주세요." })),
  detailPhotos: z.array(
    z.string({ required_error: "상세사진을 등록해주세요." }),
  ),

  options: z
    .array(
      z.object({
        index: z.coerce.string(),
        name: z.string({ required_error: "옵션명을 입력해주세요." }),
        price: z.coerce.string({ required_error: "가격을 입력해주세요." }),
        stock: z.coerce.string({ required_error: "재고량을 입력해주세요" }),
      }),
    )
    .optional(),
});

type OptionListType = {
  index: FormDataEntryValue | null;
  name: FormDataEntryValue | null;
  price: FormDataEntryValue | null;
  stock: FormDataEntryValue | null;
}[];

export const uploadProduct = async (
  formData: FormData,
  productId?: number,
  optionLength?: number,
) => {
  const photoList: String[] = [];
  const detailPhotoList: String[] = [];
  const optionList: OptionListType = [];

  optionLength !== undefined &&
    [...Array(optionLength)].map((_, index) => {
      optionList.push({
        index: formData.get(`indexOfOption${index}`),
        name: formData.get(`nameOfOption${index}`),
        price: formData.get(`priceOfOption${index}`),
        stock: formData.get(`stockOfOption${index}`),
      });
    });

  let photoIndex = 0;
  while (formData.has(`photo${photoIndex}`)) {
    const photo = formData.get(`photo${photoIndex}`);
    if (typeof photo === "string") {
      photoList.push(photo);
    }
    photoIndex++;
  }

  let detailPhotoIndex = 0;
  while (formData.has(`detailPhoto${detailPhotoIndex}`)) {
    const photo = formData.get(`detailPhoto${detailPhotoIndex}`);
    if (typeof photo === "string") {
      detailPhotoList.push(photo);
    }
    detailPhotoIndex++;
  }

  const data = {
    name: formData.get("name"),
    price: formData.get("price"),
    photos: photoList,
    detailPhotos: detailPhotoList,
    stock: formData.get("stock"),
    discount: formData.get("discount"),
    color: formData.get("color"),
    material: formData.get("material"),
    size: formData.get("size"),
    bulb: formData.get("bulb"),
    manufacturer: formData.get("manufacturer"),
    description: formData.get("description"),
    options: optionList.length > 0 ? optionList : undefined,
  };
  const result = productSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const product = productId
      ? await db.product.update({
          where: {
            id: Number(productId),
          },
          data: {
            title: result.data.name,
            price: result.data.price,
            photos: result.data.photos,
            detailPhotos: result.data.detailPhotos,
            discount: result.data.discount || 0,
            color: result.data.color || "",
            material: result.data.material || "",
            size: result.data.size || "",
            bulb: result.data.bulb,
            manufacturer: result.data.manufacturer,
            description: result.data.description || "",
            stock: result.data.stock,
          },
          select: {
            id: true,
          },
        })
      : await db.product.create({
          data: {
            title: result.data.name,
            price: result.data.price,
            photos: result.data.photos,
            detailPhotos: result.data.detailPhotos,
            stock: result.data.stock,
            discount: result.data.discount || 0,
            color: result.data.color || "",
            material: result.data.material || "",
            size: result.data.size || "",
            bulb: result.data.bulb,
            manufacturer: result.data.manufacturer,
            description: result.data.description || "",
          },
          select: {
            id: true,
          },
        });
    // Options
    const options = result.data.options;

    // 옵션 모두 삭제
    if (!options && product) {
      const selectOptions = await db.option.findMany({
        where: {
          productId: product?.id,
        },
        select: {
          id: true,
        },
      });

      if (selectOptions) {
        await db.option.deleteMany({
          where: {
            productId: product?.id,
          },
        });
        console.log("All options deleted");
      }
    }

    if (options) {
      for (const option of options) {
        const optionData = {
          index: +option.index,
          name: option.name,
          price: +option.price,
          stock: +option.stock,
        };

        const selectOption = await db.option.findFirst({
          where: {
            productId: product.id,
            index: +option.index,
          },
          select: {
            id: true,
          },
        });
        console.log("selectOption : ", selectOption);
        if (selectOption) {
          await db.option.update({
            data: optionData,
            where: {
              id: +selectOption.id,
            },
          });
          console.log("option update");
        } else {
          await db.option.create({
            data: {
              ...optionData,
              product: {
                connect: {
                  id: product.id,
                },
              },
            },
          });
          console.log("option create");
        }
      }
    }
    console.log("Create success");
    revalidateTag("products");
    redirect(`/products/${product.id}`,);
  }
};
