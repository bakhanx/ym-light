import NotFound from "@/app/not-found";
import db from "@/utils/db";

import ProductContents from "../_components/product-contents";
import getSession from "@/utils/session";

import { getImageData, getImageSize } from "@/utils/imageSize";

import { getCachedProduct } from "./actions/getProduct";

import Notice from "./_components/notice";
import QnA from "./_components/qna";
import RelatedProducts from "./_components/relatedProducts";
import ExchangeReturn from "./_components/exchangeReturn";
import ProductInfo from "./_components/productInfo";
import Tabs from "./_components/Tabs";

type Props = {
  params: {
    id: number;
  };
};

const getInfoPhotosWithSize = async (
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

  const InfoPhotosWithSize = await getInfoPhotosWithSize(product.detailPhotos);

  return (
    <div className="my-container">
      <div className="my-content m-auto max-w-screen-xl px-2 pb-28 pt-32 sm:px-4 xl:px-0 ">
        {/* 상품 내용 */}
        <ProductContents product={product} userId={session.id} />

        {/* 상품 정보 디테일 */}
        <div className="my-product-detail-content mt-14 ">
          <Tabs />

          <Notice />
          <ProductInfo InfoPhotosWithSize={InfoPhotosWithSize} />

          <QnA />
          <RelatedProducts />
          <ExchangeReturn />

          <div className="pt-10"></div>
        </div>
      </div>
    </div>
  );
};

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
