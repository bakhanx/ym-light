"use client";

import Input from "@/app/(admin)/_components/Input";
import {
  MinusCircleIcon,
  PhotoIcon,
  PlusCircleIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import React, { useState } from "react";
import { uploadProduct } from "./actions";
import { useFormState } from "react-dom";
import { getUploadURL } from "@/app/(admin)/_components/getUploadURL";
import FormButton from "@/components/form-button";

type ProductType = {
  id: number;
  title: string;
  price: number;
  discount: number | null;
  photo: string;
  color: string;
  material: string;
  size: string;
  bulb: string;
  manufacturer: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  options: string;
} | null;

export const Upload = ({
  product,
  isEdit = false,
}: {
  product: ProductType;
  isEdit?: boolean;
}) => {
  const [preview, setPreview] = useState<string[]>(
    product ? [`${product?.photo}/public`] : [],
  );

  const [uploadURL, setUploadURL] = useState("");
  const [photoId, setPhotoId] = useState("");
  const [optionCnt, setOptionCnt] = useState(0);

  const handleChangeImage = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const {
      target: { files },
    } = event;
    if (files) {
      const {
        target: { id },
      } = event;
      const index = +id.charAt(id.length - 1);
      const file = files[0];
      const url = URL.createObjectURL(file);

      if (preview[index]) {
        setPreview((prev) => {
          const temp = [...prev];
          temp.splice(index, 1, url);
          return temp;
        });
      } else {
        setPreview((prev) => {
          const temp = [...prev];
          temp.push(url);
          return temp;
        });
      }
      const { result, success } = await getUploadURL();
      if (success) {
        const { id: URLId, uploadURL } = result;
        setPhotoId(URLId);
        setUploadURL(uploadURL);
      }
    }
  };

  const handleDeleteImage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(event.currentTarget.id);
    const {
      currentTarget: { id },
    } = event;
    setPreview((prev) => {
      const temp = [...prev];
      temp.splice(+id, 1);
      return temp;
    });
  };

  const interceptAction = async (_: any, formData: FormData) => {
    const file = formData.get("photo0") as File;
    const isExistsFile = file.size > 0;

    if (preview[0] && !isExistsFile) {
      console.log("preview exists!");
      formData.set("photo0", product?.photo || "");
      return uploadProduct(formData, product?.id);
    }

    if (!isExistsFile && !preview[0]) {
      console.log("not found file");
      return;
    }

    const cloudflareForm = new FormData();
    cloudflareForm.append("file", file);

    const response = await fetch(uploadURL, {
      method: "post",
      body: cloudflareForm,
    });
    console.log(await response.text());
    if (response.status !== 200) {
      console.log("Error!!");
      return;
    }

    const photoURL = `https://imagedelivery.net/214BxOnlVKSU2amZRZmdaQ/${photoId}`;
    formData.set("photo0", photoURL);
    return uploadProduct(formData, product?.id);
  };
  const handleIncreaseOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOptionCnt((prev) => prev + 1);
  };
  const handleDecreaseOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOptionCnt((prev) => prev - 1);
  };

  const [state, action] = useFormState(interceptAction, null);
  return (
    <div className="">
      <div className="my-container py-10">
        <div className="my-content m-auto max-w-screen-xl px-4 md:px-10 ">
          <p className="pb-5 text-3xl font-bold">
            상품 {isEdit ? "수정하기" : "등록하기"}
          </p>

          <form action={action}>
            <div className="my-column_bind flex flex-col divide-slate-300 sm:flex-row sm:divide-x-2">
              {/* Photo */}
              <div className="my-column-left sm:w-[50%] sm:pr-10">
                <div className="my-column-box">
                  <div className="my-banner-image">
                    <label
                      htmlFor="photo0"
                      className="flex aspect-square w-full cursor-pointer flex-col items-center justify-center border-2 border-dashed border-gray-400 text-gray-500"
                      style={{
                        backgroundImage: `url(${preview[0]})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "50% 50%",
                      }}
                    >
                      {!preview[0] && (
                        <>
                          <PhotoIcon className="w-1/3 text-gray-400" />
                          <div>사진을 추가해주세요.</div>
                          <div className="text-red-500">
                            {state?.fieldErrors.photo0}
                          </div>
                        </>
                      )}
                    </label>
                    <input
                      onChange={handleChangeImage}
                      type="file"
                      className="hidden"
                      id="photo0"
                      name="photo0"
                      accept="image/*"
                    />
                  </div>

                  <div className="my-banner-func mt-4 border-2">
                    <div className="flex w-full items-center justify-between gap-x-8">
                      {[...Array(3)].map((_, index) => (
                        <label
                          key={index}
                          htmlFor={`photo${index + 1}`}
                          className="relative flex aspect-square w-1/3 cursor-pointer flex-col items-center justify-center border-2 border-dashed border-gray-400 text-gray-500"
                          style={{
                            backgroundImage: `url(${preview[index + 1]})`,
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "50% 50%",
                          }}
                        >
                          {preview[index + 1] ? (
                            <button
                              id={String(index + 1)}
                              onClick={handleDeleteImage}
                              className="absolute right-0 top-0 z-20 rounded-sm bg-red-500 p-[2px] hover:bg-red-600"
                            >
                              <XMarkIcon className="size-5 text-white " />
                            </button>
                          ) : (
                            <>
                              <PhotoIcon className="w-1/3" />
                              <div className="text-xs">추가사진{index + 1}</div>
                            </>
                          )}

                          <input
                            onChange={handleChangeImage}
                            type="file"
                            className="hidden"
                            id={`photo${index + 1}`}
                            name={`photo${index + 1}`}
                            accept="image/*"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="my-column-right sm:w-[50%] sm:pl-10">
                <div className="my-column-box">
                  {/* Info */}
                  <div className="my-product-info">
                    <div className="">
                      <div className="text-3xl font-bold"></div>

                      <div className="flex flex-col gap-y-2 pt-5">
                        <div className="">
                          <div className="flex flex-col gap-y-2">
                            <Input
                              label="상품명"
                              name="name"
                              required
                              error={state?.fieldErrors.name}
                              defaultValue={product?.title}
                            />
                            <Input
                              label="가격"
                              name="price"
                              required
                              error={state?.fieldErrors.price}
                              defaultValue={product?.price}
                            />
                            <Input
                              label="할인율"
                              name="discount"
                              defaultValue={product?.discount || ""}
                            />
                            <Input
                              label="색상"
                              name="color"
                              defaultValue={product?.color}
                            />
                            <Input
                              label="재질"
                              name="material"
                              defaultValue={product?.material}
                            />
                            <Input
                              label="사이즈"
                              name="size"
                              defaultValue={product?.size}
                            />
                            <Input
                              label="전구규격"
                              name="bulb"
                              required
                              error={state?.fieldErrors.bulb}
                              defaultValue={product?.bulb}
                            />
                            <Input
                              label="제조사"
                              name="manufacturer"
                              required
                              error={state?.fieldErrors.manufacturer}
                              defaultValue={product?.manufacturer || "YM Light"}
                            />
                            <Input
                              label="설명"
                              name="description"
                              textarea
                              defaultValue={product?.description}
                            />

                            <div className="border-t-2 pt-2">
                              <div className="flex gap-x-2">
                                <span>옵션 추가</span>
                                <button onClick={handleIncreaseOption}>
                                  <PlusCircleIcon className="h-6 w-6" />
                                </button>
                              </div>

                              {Array(optionCnt)
                                .fill(0)
                                .map((e, i) => (
                                  <div key={i} className="flex flex-col py-4">
                                    <div>
                                      <button onClick={handleDecreaseOption}>
                                        <MinusCircleIcon className="h-6 w-6" />
                                      </button>
                                      <Input
                                        label="옵션명"
                                        name="options"
                                        defaultValue={product?.options}
                                      />
                                      <Input
                                        label="옵션가격"
                                        name="options"
                                        defaultValue={product?.options}
                                      />
                                      <Input
                                        label="옵션재고"
                                        name="options"
                                        defaultValue={product?.options}
                                      />
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Button */}
                  <div className="pt-10">
                    <FormButton name="상품 등록하기" isEdit={isEdit} />
                  </div>
                </div>
              </div>
            </div>
          </form>

          <div className="my-product-detail-content mt-14 ">
            <div className="my-product-detail-tap-wrap">
              <div className="my-product-detail-tab flex justify-between border-b-2 border-t-2 border-b-orange-300 px-4 py-5 text-sm sm:px-8 md:px-16 md:text-base">
                <div>관련 상품</div>
                <div>상품평</div>
                <div>상품 문의</div>
                <div>교환 및 반품</div>
              </div>
            </div>

            <div className="my-product-detail-item-wrap divide-y-[1px] ">
              <div className="my-product-detail-item item-notice pt-6 ">
                <div className="my-item-title text-lg font-bold">
                  <p>판매자 공지사항</p>
                </div>
                <div className="my-item-content p-10 text-center text-slate-500">
                  <p>표시할 게시물이 없습니다.</p>
                </div>
              </div>
              <div className="my-product-detail-item item-detail pt-6">
                <div className="my-item-title text-lg font-bold">
                  <div>상품 상세정보</div>
                </div>
                <div className="my-item-content p-10 text-center text-slate-500">
                  <p>표시할 게시물이 없습니다.</p>
                </div>
              </div>

              <div className="my-product-detail-item item-recommend pt-6">
                <div className="my-item-title text-lg font-bold">
                  <div>상품평</div>
                </div>
                <div className="my-item-content p-10 text-center text-slate-500">
                  <p>표시할 게시물이 없습니다.</p>
                </div>
              </div>
              <div className="my-product-detail-item item-recommend pt-6">
                <div className="my-item-title text-lg font-bold">
                  <div>상품 문의</div>
                </div>
                <div className="my-item-content p-10 text-center text-slate-500">
                  <p>교환 및 반품</p>
                </div>
              </div>
              <div className="my-product-detail-item item-recommend pt-6">
                <div className="my-item-title text-lg font-bold">
                  <div>추천 상품</div>
                </div>
                <div className="my-item-content p-10 text-center text-slate-500">
                  <p>표시할 게시물이 없습니다.</p>
                </div>
              </div>

              <div className="my-product-detail-item item-relative pt-6">
                <div className="my-item-title text-lg font-bold">
                  <div>관련 상품</div>
                </div>
                <div className="my-item-content p-10 text-center text-slate-500">
                  <p>표시할 게시물이 없습니다.</p>
                </div>
              </div>
            </div>

            <div className="pt-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
