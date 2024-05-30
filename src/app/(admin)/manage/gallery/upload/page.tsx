"use client";

import FormButton from "@/components/form-button";
import FormInput from "@/components/form-input";
import { BoltIcon, PhotoIcon } from "@heroicons/react/16/solid";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import { uploadGallery } from "./actions";
import { getUploadURL } from "@/app/(admin)/_components/getUploadURL";

const DEFAULT_CONTENT =
  "(예시) Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus sint architecto ut commodi. Optio nostrum aliquid tenetur labore voluptate consequuntur dolorem eius!";

const DEFAULT_TAG = "(예시) #서울전시회 #날씨좋음";

type galleryType = {
  id: number;
  content: string;
  photo: string;
  tags?: {
    id: number;
    name: string;
  }[];
} | null;

export const Upload = ({
  gallery,
  isEdit = false,
}: {
  gallery: galleryType;
  isEdit: boolean;
}) => {
  const [formValue, setFormValue] = useState([DEFAULT_CONTENT, DEFAULT_TAG]);

  const [preview, setPreview] = useState(
    gallery ? `${gallery?.photo}/public` : "",
  );
  const [uploadURL, setUploadURL] = useState("");
  const [photoId, setPhotoId] = useState("");

  const handleChangeImage = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const {
      target: { files },
    } = event;
    if (files) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setPreview(url);
    }

    const { result, success } = await getUploadURL();
    if (success) {
      const { id: URLId, uploadURL } = result;
      setPhotoId(URLId);
      setUploadURL(uploadURL);
    }
  };

  const handleBlur = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    console.log(index);
    const temp = [...formValue];
    temp[index] = event.currentTarget.value;
    setFormValue(temp);
  };

  const interceptAction = async (_: any, formData: FormData) => {
    const file = formData.get("photo") as File;
    const isExistsFile = file.size > 0;

    if (preview && !isExistsFile) {
      console.log("preview exists!");
      formData.set("photo", gallery?.photo || "");
      return uploadGallery(formData, gallery?.id);
    }

    if (!isExistsFile && !preview) {
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
    formData.set("photo", photoURL);
    return uploadGallery(formData, gallery?.id);
  };
  const [state, action] = useFormState(interceptAction, null);

  // useForm으로 수정

  return (
    <div className="h-screen pt-20">
      <div className="m-auto flex h-full max-w-screen-xl items-center">
        <form action={action} className="w-full">
          <div className="flex w-full px-10">
            {/* 미리보기 */}
            <div className="left flex w-[50%] border-2 border-gray-300">
              <div className="w-full border p-10">
                {/* Image */}
                {/* <div className="relative">
                <PhotoIcon className="w-full" />
                </div> */}

                <div className="my-banner-image">
                  <label
                    htmlFor="photo"
                    className="flex aspect-square w-full cursor-pointer flex-col items-center justify-center border-2 border-dashed border-gray-400 text-gray-500"
                    style={{
                      backgroundImage: `url(${preview})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "50% 50%",
                    }}
                  >
                    {!preview[0] && (
                      <>
                        <PhotoIcon className="w-56 text-gray-400" />
                        <div>사진을 추가해주세요.</div>
                        <div className="text-red-500">
                          {state?.fieldErrors.photo}
                        </div>
                      </>
                    )}
                  </label>
                  <input
                    onChange={handleChangeImage}
                    type="file"
                    className="hidden"
                    id="photo"
                    name="photo"
                    accept="image/*"
                  />
                </div>

                {/* Text */}
                <div className="flex flex-col p-3 ">
                  <ul>
                    <li className="flex w-full items-center gap-x-1">
                      <div className="font-semibold">YM Light</div>
                      <div className="flex h-4 w-4 items-center justify-center rounded-full bg-black">
                        <BoltIcon className="h-3 w-3 rounded-full text-amber-300" />
                      </div>
                      <div className="text-gray-500">ymlight@gmail.com</div>
                      <div>·</div>
                      <div className="text-gray-500">2024-00-00</div>
                    </li>

                    <li className="h-24 pt-2">
                      {gallery?.content || formValue[0]}
                    </li>

                    <li className="flex h-10 w-full gap-x-2 pt-5 font-semibold text-blue-500">
                      {gallery?.tags?.map((tag) => (
                        <span key={tag.id}>{tag.name}</span>
                      ))}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 입력 */}
            <div className="right w-[50%]  flex-col border-2 border-gray-300 ">
              <div className="flex flex-col p-10 ">
                <p className="text-3xl font-bold ">
                  갤러리 {isEdit ? "편집" : "수정"}
                </p>
                <p>
                  <span className="text-red-500">* </span>
                  <span className="opacity-70">는 필수 양식입니다.</span>
                </p>

                <div className="w-full pt-5">
                  <div className="flex flex-col gap-y-5">
                    <FormInput
                      label="내용"
                      name="content"
                      type="text"
                      placeholder="산뜻한 하루의 시작"
                      defaultValue={gallery?.content}
                      error={state?.fieldErrors.content}
                      required
                      textarea
                      minLength={1}
                      maxLength={1000}
                      onBlur={(e) => handleBlur(e, 0)}
                      className="resize-none border-2 p-2"
                    />
                    <FormInput
                      label="태그"
                      name="tag"
                      type="text"
                      placeholder="#명품"
                      defaultValue={gallery?.tags?.map((tag) => tag.name)}
                      error={state?.fieldErrors.tag}
                      maxLength={30}
                      onBlur={(e) => handleBlur(e, 1)}
                      className="h-10 border-2 p-2"
                    />
                  </div>

                  <div className="pt-20">
                    <FormButton name="갤러리" isEdit={true} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;
