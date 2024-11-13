import NotFound from "@/app/not-found";
import db from "@/utils/db";
import { unstable_cache as nextCache } from "next/cache";
import ProductContents from "../_components/product-contents";
import getSession from "@/utils/session";
import Image from "next/image";

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

const getCahcedProduct = nextCache(getProduct, ["product"], {
  tags: ["light", "product"],
});

export const dynamic = "force-dynamic";

const ProductDetail = async ({ params }: Props) => {
  const product = await getCahcedProduct(params.id);
  const session = await getSession();
  return (
    <>
      {/* <ScrollTop/> */}
      {product ? (
        <div className="my-container">
          <div className="my-content m-auto max-w-screen-xl pb-28 pt-32 xl:px-0 px-2 ">
            {/* 상품 내용 */}
            <ProductContents product={product} userId={session.id} />

            {/* 상품 정보 디테일 */}
            <div className="my-product-detail-content mt-14 ">
              <div className="my-product-detail-tap-wrap">
                <div className="my-product-detail-tab flex justify-between gap-x-4 border-b-2 border-t-2 border-b-[#010315] px-8 py-5 text-sm sm:gap-x-36 sm:px-16 sm:text-base">
                  <div>관련 상품</div>
                  <div>상품평</div>
                  <div>상품 문의</div>
                  <div>교환 및 반품</div>
                </div>
              </div>

              <div className="my-product-detail-item-wrap divide-y-[1px] ">
                <div className="my-product-detail-item item-notice pt-6 ">
                  <div className="my-item-title text-base font-bold sm:text-lg">
                    <p>판매자 공지사항</p>
                  </div>
                  <div className="my-item-content p-10 text-center text-sm text-slate-500 sm:text-base">
                    <p>표시할 게시물이 없습니다.</p>
                  </div>
                </div>
                <div className="my-product-detail-item item-detail pt-6">
                  <div className="my-item-title text-base font-bold sm:text-lg">
                    <div>상품 상세정보</div>
                  </div>
                  <div className="my-item-content p-10 text-center text-sm text-slate-500 sm:text-base">
                    <p>표시할 게시물이 없습니다.</p>
                  </div>
                </div>

                <div className="my-product-detail-item item-recommend pt-6">
                  <div className="my-item-title text-base font-bold sm:text-lg">
                    <div>상품평</div>
                  </div>
                  <div className="my-item-content p-10 text-center text-sm text-slate-500 sm:text-base">
                    <p>표시할 게시물이 없습니다.</p>
                  </div>
                </div>
                <div className="my-product-detail-item item-recommend pt-6">
                  <div className="my-item-title text-base font-bold sm:text-lg">
                    <div>상품 문의</div>
                  </div>
                  <div className="my-item-content p-10 text-center text-sm text-slate-500 sm:text-base">
                    <p>교환 및 반품</p>
                  </div>
                </div>
                <div className="my-product-detail-item item-recommend pt-6">
                  <div className="my-item-title text-base font-bold sm:text-lg">
                    <div>추천 상품</div>
                  </div>
                  <div className="my-item-content p-10 text-center text-sm text-slate-500 sm:text-base">
                    <p>표시할 게시물이 없습니다.</p>
                  </div>
                </div>

                <div className="my-product-detail-item item-relative pt-6">
                  <div className="my-item-title text-base font-bold sm:text-lg">
                    <div>관련 상품</div>
                  </div>
                  <div className="my-item-content p-10 text-center text-sm text-slate-500 sm:text-base">
                    <p>표시할 게시물이 없습니다.</p>
                  </div>
                </div>
              </div>

              <div className="pt-10"></div>
            </div>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
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
