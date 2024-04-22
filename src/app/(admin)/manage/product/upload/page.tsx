import Input from "@/app/(admin)/_components/Input";
import { formatOfPrice } from "@/libs/utils";
import { PhotoIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import React from "react";

const Upload = () => {
  return (
    <div className="h-screen  pt-24">
      <div className="my-container pt-20">
        <div className="my-content m-auto w-[1280px] max-w-screen-xl px-10 pb-28 pt-8 ">
          <div className="my-column_bind flex divide-x-2 divide-slate-300">
            {/* left */}
            <div className="my-column-left w-[50%] pr-10">
              <div className="my-column-box">
                <div className="my-banner-image ">
                  <label htmlFor="photo">
                    <div className="flex aspect-square w-full cursor-pointer items-center justify-center border-2 border-dashed border-gray-400">
                      <PhotoIcon className="w-56 text-gray-400" />
                    </div>
                  </label>
                  <input type="file" className="hidden" id="photo" name="photo"/>
                </div> 
                <div className="my-banner-func pt-5">
                  <div className="h-16 w-full border-2">이미지 슬라이드</div>
                </div>
              </div>
            </div>

            {/* right */}
            <div className="my-column-right w-[50%] pl-10">
              <div className="my-column-box">
                {/* Info */}
                <div className="my-product-info">
                  <div className="">
                    <div className="text-3xl font-bold"></div>

                    <div className="flex flex-col gap-y-2 pt-5">
                      <div className="">
                        <form action="" className="flex flex-col gap-y-2">
                          <Input label="상품명" name="name" />
                          <Input label="가격" name="price" />
                          <Input label="할인율" name="discount" />
                          <Input label="색상" name="color" />
                          <Input label="재질" name="material" />
                          <Input label="사이즈" name="size" />
                          <Input label="전구규격" name="bulb" />
                          <Input
                            label="제조사"
                            name="manufacturer"
                            defaultValue="YM Light"
                          />
                          <Input label="설명" name="description" textarea />
                          <Input label="옵션" name="options" />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="my-product-detail-content mt-14 ">
            <div className="my-product-detail-tap-wrap">
              <div className="my-product-detail-tab flex justify-center gap-x-36 border-b-2 border-t-2 border-b-orange-300 py-5">
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
