"use client";

import Input from "@/app/(admin)/_components/Input";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/16/solid";
import React, { useState } from "react";
import { uploadProduct } from "../actions/uploadProduct";
import { useFormState } from "react-dom";
import getUploadUrl from "@/app/(admin)/actions/getUploadUrl";
import FormButton from "@/components/form-button";
import useImagePreviews from "@/hooks/useImagePreviews";
import { UploadProductType } from "@/app/(content)/products/actions/getProduct";

const Upload = ({
  product,
  isEdit = false,
}: {
  product: UploadProductType;
  isEdit?: boolean;
}) => {
  const [productState, setProductState] = useState(product);
  const [optionCnt, setOptionCnt] = useState(productState?.options.length || 0);

  const imageUploader = useImagePreviews({
    initialImages: isEdit ? productState?.photos : undefined,
    maxCount: 3,
  });
  const detailImageUploader = useImagePreviews({
    initialImages: isEdit ? productState?.detailPhotos : undefined,
    maxCount: 2,
  });

  const handleIncreaseOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOptionCnt((prev) => prev + 1);
  };
  const handleDecreaseOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (optionCnt === 0) return;
    setOptionCnt((prev) => prev - 1);
  };

  const handleDeleteImageClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number,
    type: "main" | "detail",
  ) => {
    event.preventDefault();
    switch (type) {
      case "main":
        imageUploader.handleDeleteImage(index);
        break;
      case "detail":
        detailImageUploader.handleDeleteImage(index);
        break;
      default:
        break;
    }
  };

  const processPreviews = async (
    previews: (string | null)[],
    formData: FormData,
    keyPrefix: string,
  ) => {
    for (let index = 0; index < previews.length; index++) {
      let existingPhotoUrl = "";
      if (previews[index]) {
        if ((previews[index] as string).includes("blob")) {
          existingPhotoUrl = "";
        } else {
          existingPhotoUrl = (previews[index] as string).replace("/w=512", "");
        }
      }
      if (formData.has(`${keyPrefix}${index}`) || existingPhotoUrl) {
        await uploadImage(`${keyPrefix}${index}`, existingPhotoUrl, formData);
      }
    }
  };

  const uploadImage = async (
    imageKey: string,
    existingUrl: string,
    formData: FormData,
  ) => {
    const file = formData.get(imageKey) as File;
    const isExistsFile = file && file.size > 0;

    if (!isExistsFile && existingUrl) {
      console.log("not change file");
      formData.set(imageKey, existingUrl); // 변경되지 않은 Img URL
      return;
    }

    if (!isExistsFile) {
      console.log("not found file");
      formData.delete(imageKey); // 빈 파일 키 삭제
      return;
    }

    const { result, success } = await getUploadUrl();
    if (!success) {
      console.log("Failed to get upload URL");
      return;
    }
    const { id: cfUrlId, uploadURL: cfUrl } = result;

    const cloudflareForm = new FormData();
    cloudflareForm.append("file", file);
    const response = await fetch(cfUrl, {
      method: "post",
      body: cloudflareForm,
    });
    if (response.status !== 200) {
      console.log("Error!!");
      return;
    }
    const photoURL = `https://imagedelivery.net/214BxOnlVKSU2amZRZmdaQ/${cfUrlId}`;
    formData.set(imageKey, photoURL);
  };

  const interceptAction = async (_: any, formData: FormData) => {
    await processPreviews(imageUploader.previews, formData, "photo");
    await processPreviews(
      detailImageUploader.previews,
      formData,
      "detailPhoto",
    );
    return uploadProduct(formData, productState?.id, optionCnt);
  };

  const [state, action] = useFormState(interceptAction, null);
  return (
    <div className="pt-16">
      <div className="my-container py-10">
        <div className="my-content m-auto max-w-screen-xl px-2 xl:px-0 ">
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
                      className="relative flex aspect-square w-full cursor-pointer flex-col items-center justify-center border-2 border-dashed border-gray-400 text-gray-500"
                      style={{
                        backgroundImage: `url(${imageUploader.previews[0]})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "50% 50%",
                      }}
                    >
                      {imageUploader.previews[0] ? (
                        <button
                          id="0"
                          onClick={(e) => handleDeleteImageClick(e, 0, "main")}
                          className="absolute right-0 top-0 z-20 rounded-sm bg-red-500 p-[2px] hover:bg-red-600"
                        >
                          <XMarkIcon className="size-7 text-white md:size-10 " />
                        </button>
                      ) : (
                        <>
                          <PhotoIcon className="w-1/3 text-gray-400" />
                          <div>사진을 추가해주세요.</div>
                          <div className="text-red-500">
                            {state?.fieldErrors.photos}
                          </div>
                        </>
                      )}
                    </label>
                    <input
                      onChange={imageUploader.handleChangeImage}
                      type="file"
                      className="hidden"
                      id="photo0"
                      name="photo0"
                      accept="image/*"
                    />
                  </div>

                  <div className="my-banner-func mt-4 border-2">
                    <div className="flex w-full items-center justify-between gap-x-8">
                      <label
                        key={0}
                        htmlFor={`photo0`}
                        className="relative flex aspect-square w-1/3 cursor-pointer flex-col items-center justify-center  border-2 border-gray-400 text-gray-500"
                        style={{
                          backgroundImage: `url(${imageUploader.previews[0]})`,
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "50% 50%",
                        }}
                      >
                        {imageUploader.previews[0] ? (
                          <button
                            id="0"
                            onClick={(e) =>
                              handleDeleteImageClick(e, 0, "main")
                            }
                            className="absolute right-0 top-0 z-20 rounded-sm bg-red-500 p-[2px] hover:bg-red-600"
                          >
                            <XMarkIcon className="size-4 text-white md:size-5 " />
                          </button>
                        ) : (
                          <>
                            <PhotoIcon className="w-1/3" />
                            <div className="text-xs">대표사진</div>
                          </>
                        )}
                      </label>

                      {[...Array(2)].map((_, index) => (
                        <label
                          key={index}
                          htmlFor={`photo${index + 1}`}
                          className="relative flex aspect-square w-1/3 cursor-pointer flex-col items-center justify-center border-2 border-dashed border-gray-400 text-gray-500"
                          style={{
                            backgroundImage: `url(${imageUploader.previews[index + 1]})`,
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "50% 50%",
                          }}
                        >
                          {imageUploader.previews[index + 1] ? (
                            <button
                              id={String(index + 1)}
                              onClick={(e) =>
                                handleDeleteImageClick(e, index + 1, "main")
                              }
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
                            onChange={imageUploader.handleChangeImage}
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
                              defaultValue={productState?.title}
                            />
                            <Input
                              label="가격"
                              name="price"
                              required
                              error={state?.fieldErrors.price}
                              defaultValue={productState?.price}
                            />
                            <Input
                              label="재고"
                              name="stock"
                              required
                              error={state?.fieldErrors.stock}
                              defaultValue={productState?.stock}
                            />
                            <Input
                              label="할인율"
                              name="discount"
                              defaultValue={productState?.discount || ""}
                            />
                            <Input
                              label="색상"
                              name="color"
                              defaultValue={productState?.color}
                            />
                            <Input
                              label="재질"
                              name="material"
                              defaultValue={productState?.material}
                            />
                            <Input
                              label="사이즈"
                              name="size"
                              defaultValue={productState?.size}
                            />
                            <Input
                              label="전구규격"
                              name="bulb"
                              required
                              error={state?.fieldErrors.bulb}
                              defaultValue={productState?.bulb}
                            />
                            <Input
                              label="제조사"
                              name="manufacturer"
                              required
                              error={state?.fieldErrors.manufacturer}
                              defaultValue={
                                productState?.manufacturer || "YM Light"
                              }
                            />
                            <Input
                              label="설명"
                              name="description"
                              textarea
                              defaultValue={productState?.description}
                            />

                            {/* Options */}
                            <div className="border-t-2 pt-4">
                              <div className="flex  justify-between gap-x-2 border-b-2 border-dashed pb-4">
                                <span className="pl-2">옵션 관리</span>
                                <div className="flex gap-x-2">
                                  <button
                                    className="flex h-6 w-6 items-center justify-center border-2 border-gray-500 font-bold hover:bg-gray-200"
                                    onClick={handleIncreaseOption}
                                  >
                                    ＋
                                  </button>
                                  <button
                                    className="flex h-6 w-6 items-center justify-center border-2 border-red-500 font-bold text-red-500 hover:bg-red-200"
                                    onClick={handleDecreaseOption}
                                  >
                                    －
                                  </button>
                                </div>
                              </div>

                              <div className="divide-y-2">
                                {[...Array(optionCnt)].map((_, index) => (
                                  <div
                                    key={index}
                                    className="flex flex-col py-4"
                                  >
                                    <div className="flex flex-col gap-y-2">
                                      <span className="w-full pl-2  text-right text-sm text-gray-500">
                                        [옵션{" "}
                                        <input
                                          type="text"
                                          name={`indexOfOption${index}`}
                                          value={index}
                                          className="w-2 outline-none"
                                          readOnly
                                        />
                                        ]
                                      </span>

                                      <Input
                                        label="옵션명"
                                        name={`nameOfOption${index}`}
                                        defaultValue={
                                          productState?.options[index]?.name ||
                                          ""
                                        }
                                      />
                                      <Input
                                        label="옵션가격"
                                        name={`priceOfOption${index}`}
                                        defaultValue={
                                          productState?.options[index]?.price ||
                                          ""
                                        }
                                      />
                                      <Input
                                        label="옵션재고"
                                        name={`stockOfOption${index}`}
                                        placeholder="99"
                                        defaultValue={
                                          productState?.options[index]?.stock ||
                                          ""
                                        }
                                        error={state?.fieldErrors.options}
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
                  </div>

                  {/* Button */}
                  <div className="pt-10">
                    <FormButton
                      name={`상품 ${isEdit ? "수정하기" : "등록하기"}`}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="my-product-detail-content mt-14 ">
              <div className="my-product-detail-tap-wrap">
                <div className="my-product-detail-tab flex justify-between border-b-2 border-t-2 border-b-[#010315] px-4 py-5 text-sm sm:px-8 md:px-16 md:text-base">
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
                  <div className="my-item-title">
                    <div className="text-lg font-bold">상품 상세정보</div>
                    <span className="text-gray-500">
                      이미지들은 세로로 이어 등록됩니다.
                    </span>
                    <div className="flex pt-4">
                      {[...Array(2)].map((_, index) => (
                        <label
                          key={index}
                          htmlFor={`detailPhoto${index}`}
                          className="relative flex aspect-square w-1/2 cursor-pointer flex-col items-center justify-center border-2 border-dashed border-gray-400 text-gray-500"
                          style={{
                            backgroundImage: `url(${detailImageUploader.previews[index]})`,
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "50% 50%",
                          }}
                        >
                          {detailImageUploader.previews[index] ? (
                            <button
                              id={String(index)}
                              onClick={(e) =>
                                handleDeleteImageClick(e, index, "detail")
                              }
                              className="absolute right-0 top-0 z-20 rounded-sm bg-red-500 p-[2px] hover:bg-red-600"
                            >
                              <XMarkIcon className="size-5 text-white " />
                            </button>
                          ) : (
                            <>
                              <PhotoIcon className="w-1/3" />
                              <div>상세사진{index + 1}</div>
                            </>
                          )}

                          <input
                            onChange={detailImageUploader.handleChangeImage}
                            type="file"
                            className="hidden"
                            id={`detailPhoto${index}`}
                            name={`detailPhoto${index}`}
                            accept="image/*"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="my-item-content p-10 text-center text-slate-500">
                    <div className="my-detail-image flex w-full items-start justify-center"></div>
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Upload;
