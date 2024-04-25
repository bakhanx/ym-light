"use server";

import db from "@/libs/db";
import { redirect } from "next/navigation";
import { z } from "zod";

const productSchema = z.object({
  name: z.string({ required_error: "상품명을 입력해주세요." }),
  price: z.coerce.number({ required_error: "가격을 입력해주세요." }),
  discount: z.coerce.number().optional(),
  color: z.string().optional(),
  material: z.string().optional(),
  size: z.string().optional(),
  bulb: z.string({ required_error: "전구타입을 입력해주세요." }),
  manufacturer: z.string({ required_error: "제조사를 입력해주세요." }),
  description: z.string().optional(),
  options: z.string().optional(),
  photo0: z.string({ required_error: "사진을 등록해주세요." }),
  // photo1: z.string().optional(),
  // photo2: z.string().optional(),
  // photo3: z.string().optional(),
});

export const uploadProduct = async (formData: FormData) => {
  const data = {
    name: formData.get("name"),
    price: formData.get("price"),
    discount: formData.get("discount"),
    color: formData.get("color"),
    material: formData.get("material"),
    size: formData.get("size"),
    bulb: formData.get("bulb"),
    manufacturer: formData.get("manufacturer"),
    description: formData.get("description"),
    options: formData.get("options"),
    photo0: formData.get("photo0"),
    // photo1: formData.get("photo1"),
    // photo2: formData.get("photo2"),
    // photo3: formData.get("photo3"),
  };

  const result = productSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const product = await db.product.create({
      data: {
        title: result.data.name,
        price: result.data.price,
        discount: result.data.discount || 0,
        color: result.data.color || "",
        material: result.data.material || "",
        size: result.data.size || "",
        bulb: result.data.bulb,
        manufacturer: result.data.manufacturer,
        description: result.data.description || "",
        options: result.data.options || "",
        photo: result.data.photo0,
      },
      select: {
        id: true,
      },
    });
    console.log("Create success");
    // redirect(`/prducts/${product.id}`);
  }
};

export const getUploadURL = async () => {
  console.log(process.env.CF_ACCOUNT_ID);
  console.log(process.env.CF_API_KEY);
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/images/v2/direct_upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CF_API_KEY}`,
      },
    },
  );
  const data = response.json();
  console.log(data);
  return data;
};
