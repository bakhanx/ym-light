"use client";

import { Suspense } from "react";
import Item from "./item";
import Photos from "./photos";

const ProductInfo = ({
  InfoPhotosWithSize,
}: {
  InfoPhotosWithSize: { src: string; width: number; height: number }[];
}) => (
  <Suspense fallback="loading...">
    <Item
      title="상품 상세정보"
      content={
        InfoPhotosWithSize.length > 0 ? (
          <Photos photosWithSize={InfoPhotosWithSize} />
        ) : (
          <p>표시할 게시물이 없습니다.</p>
        )
      }
    />
  </Suspense>
);

export default ProductInfo;
