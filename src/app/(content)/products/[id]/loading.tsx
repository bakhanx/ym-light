import React from "react";

const Loading = () => {
  return (
    <div className="">
      {/* 상품 내용 */}
      <div className="my-container">
        <div className="my-content m-auto max-w-screen-xl px-4 pb-28 pt-32 sm:px-10 ">
          <div className="my-column_bind flex flex-col divide-y-2 divide-slate-300 sm:flex-row sm:divide-x-2 sm:divide-y-0">
            {/* left */}
            <div className="my-column-left pb-4 sm:w-[50%] sm:pr-10">
              <div className="my-column-box">
                <div className="my-banner-image">
                  <div className="relative aspect-square w-full  bg-slate-500" />
                </div>
                <div className="my-banner-func pt-5">
                  <div className="h-16 w-full  border-2 bg-slate-300">
                    이미지 슬라이드
                  </div>
                </div>
              </div>
            </div>
            {/* right */}
            <div className="my-column-right pt-4 sm:w-[50%] sm:pl-10">
              <div className="my-column-box">
                {/* Info */}
                <div className="my-product-info">
                  <div className="">
                    <div className="h-8  bg-slate-300 sm:h-12" />
                    <div className="gap-x-2 pt-5 font-semibold">
                      <div className="flex gap-x-2">
                        <span className="h-6 w-12  bg-slate-300 sm:h-8 sm:w-16" />
                        <span className="h-4 w-20  bg-slate-300 sm:h-5 sm:w-24" />
                      </div>
                      <span className="h-6  bg-slate-300 sm:h-8" />
                    </div>
                    <div className="flex flex-col gap-y-2 pt-8 sm:pt-10">
                      <div className="h-4  bg-slate-300 sm:h-5" />
                      <div className="h-4  bg-slate-300 sm:h-5" />
                      <div className="h-4  bg-slate-300 sm:h-5" />
                      <div className="h-4  bg-slate-300 sm:h-5" />
                      <div className="h-4  bg-slate-300 sm:h-5" />
                      <div className="h-4  bg-slate-300 sm:h-5" />
                    </div>
                  </div>
                </div>
                {/* Option */}
                <div className="flex items-end justify-between pb-4 pt-16">
                  <div className="count-btn flex text-black">
                    <button className="h-6 w-6  bg-slate-300" />
                    <input className="h-6 w-10  bg-slate-300" />
                    <button className="h-6 w-6  bg-slate-300" />
                  </div>
                  <div className="flex items-end gap-x-5">
                    <div className="h-4  bg-slate-300" />
                    <span className="h-6 w-36  bg-slate-300" />
                  </div>
                </div>
                {/* 구매 장바구니 찜 버튼 */}
                <div className="my-btn-wrap flex flex-col gap-y-5 pt-5">
                  <button className="h-10 w-full  bg-slate-300 sm:h-12" />
                  <div className="flex gap-x-4">
                    <button className="h-10 w-full  bg-slate-300 sm:h-12" />
                    <button className="h-10 w-full  bg-slate-300 sm:h-12" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default Loading;
