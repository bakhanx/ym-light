import Input from "@/app/(admin)/_components/Input";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/16/solid";
import React, { useState } from "react";
import { getUploadURL, uploadProduct } from "../../upload/actions";
import { useFormState, useFormStatus } from "react-dom";
import db from "@/libs/db";
import Upload from "../../upload/page";

const getProduct = async (id: string) => {
  const product = await db.product.findUnique({
    where: {
      id: Number(id),
    },
  });
  return product;
};

const EditProduct = async ({ params }: { params: { id: string } }) => {
  const product = await getProduct(params.id);
  console.log(product);

  return (
    <div className="">
      <div className="pt-24 text-2xl px-10">상품 편집</div>
      <div className="[&>div]:pt-0">
        <Upload product={product} isEdit={true}  />;
      </div>
    </div>
  );
};

export default EditProduct;
