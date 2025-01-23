import NotFound from "@/app/not-found";
import db from "@/utils/db";
import { unstable_cache as nextCache } from "next/cache";
import ProductContents from "../_components/product-contents";
import getSession from "@/utils/session";
import Image from "next/image";
import { getImageData, getImageSize } from "@/utils/imageSize";
import { ReactNode } from "react";

type Props = {
  params: {
    id: number;
  };
};

const getProduct = async (id: number) => {
  const product = await db.product.findUnique({
    where: {
      id: +id,
    },
    select: {
      id: true,
      title: true,
      price: true,
      discount: true,
      photos: true,
      detailPhotos: true,
      color: true,
      material: true,
      category: true,
      size: true,
      stock: true,
      bulb: true,
      manufacturer: true,
      description: true,
      created_at: true,
      updated_at: true,
      options: true,
    },
  });
  return product;
};

const getCachedProduct = nextCache(getProduct, ["product"], {
  tags: ["light", "product"],
});

const getDetailPhotosWithSize = async (
  detailPhotos: string[],
): Promise<{ src: string; width: number; height: number }[]> => {
  return await Promise.all(
    detailPhotos.map(async (photo) => {
      const imageUrl = `${photo}/w=1024`;
      const { width, height } = await getImageSize(imageUrl);
      const imageData = await getImageData(imageUrl);
      return { src: imageData, width, height };
    }),
  );
};

export const dynamic = "force-dynamic";

const ProductDetail = async ({ params }: Props) => {
  const product = await getCachedProduct(params.id);
  const session = await getSession();

  if (!product) return <NotFound />;

  const detailPhotosWithSize = await getDetailPhotosWithSize(
    product.detailPhotos,
  );

  return (
    <div className="my-container">
      <div className="my-content m-auto max-w-screen-xl px-2 pb-28 pt-32 sm:px-4 xl:px-0 ">
        {/* 상품 내용 */}
        <ProductContents product={product} userId={session.id} />

        {/* 상품 정보 디테일 */}
        <div className="my-product-detail-content mt-14 ">
          <ProductDetailTabs />

          <ProductDetailNotice />
          <ProductDetailInfo detailPhotosWithSize={detailPhotosWithSize} />

          <ProductDetailQnA />
          <ProductDetailRecommendations />
          <ProductDetailExchangeReturn />

          <div className="pt-10"></div>
        </div>
      </div>
    </div>
  );
};

const tabs = ["상품 상세정보", "상품평", "상품 문의", "교환 및 반품"];

const ProductDetailTabs = () => (
  <div className="my-product-detail-tap-wrap">
    <div className="my-product-detail-tab flex justify-between gap-x-4 border-b-2 border-t-2 border-b-[#010315] px-8 py-5 text-sm sm:gap-x-16 sm:px-16 sm:text-base md:gap-x-28 xl:gap-x-36">
      {tabs.map((tab, index) => (
        <div key={index}>{tab}</div>
      ))}
    </div>
  </div>
);

// 공지사항
const ProductDetailNotice = () => (
  <ProductDetailItem
    title="판매자 공지사항"
    content={<p>표시할 게시물이 없습니다.</p>}
  />
);

// 상품 문의
const ProductDetailQnA = () => (
  <ProductDetailItem
    title="상품 문의"
    content={
      <div>
        <p>문의글이 없습니다.</p>
      </div>
    }
  />
);

// 교환 및 반품 컴포넌트
const ProductDetailExchangeReturn = () => (
  <ProductDetailItem title="교환 및 반품" content={<p>교환 및 반품 안내</p>} />
);

// 추천 상품 컴포넌트
const ProductDetailRecommendations = () => (
  <ProductDetailItem
    title="추천 상품"
    content={
      <div>
        <p>관련 상품 4개</p>
      </div>
    }
  />
);

const ProductDetailItem = ({
  title,
  content,
}: {
  title: string;
  content: ReactNode;
}) => (
  <div className="my-product-detail-item pt-6">
    <div className="my-item-title text-base font-bold sm:text-lg">{title}</div>
    <div className="my-item-content p-10 text-center text-sm text-slate-500 sm:text-base">
      {content}
    </div>
  </div>
);

const ProductDetailInfo = ({
  detailPhotosWithSize,
}: {
  detailPhotosWithSize: { src: string; width: number; height: number }[];
}) => (
  <ProductDetailItem
    title="상품 상세정보"
    content={
      detailPhotosWithSize.length > 0 ? (
        <DetailPhotos photosWithSize={detailPhotosWithSize} />
      ) : (
        <p>표시할 게시물이 없습니다.</p>
      )
    }
  />
);

const DetailPhotos = ({
  photosWithSize,
}: {
  photosWithSize: { src: string; width: number; height: number }[];
}) => (
  <div className="flex flex-col">
    {photosWithSize.map((photo) => (
      <div
        key={photo.src}
        className="relative flex h-auto w-full justify-center object-contain"
      >
        <Image
          src={photo.src}
          alt={`Product Detail Image`}
          width={photo.width}
          height={photo.height}
        />
      </div>
    ))}
  </div>
);

export default ProductDetail;

export async function generateStaticParams() {
  const products = await db.product.findMany({
    select: {
      id: true,
    },
  });

  return products.map((product) => ({
    id: product.id + "",
  }));
}
