import Link from "next/link";

import { Suspense } from "react";
import CardSkeleton from "./card-skeleton";
import Card from "./card";

type ProductSectionProps = {
  title: string;
  products: {
    id: number;
    title: string;
    photos: string[];
    discount?: number;
  }[];
  count: number;
};

const ProductSection = ({ title, products, count }: ProductSectionProps) => (
  <div className="my-product-wrap py-2">
    <div className="text-lg font-semibold sm:text-2xl">{title}</div>
    <div className="grid grid-cols-2 gap-y-8 pt-4 min-[480px]:grid-cols-2 sm:grid-cols-2 sm:gap-y-16 md:grid-cols-4 xl:gap-16">
      <Suspense fallback={<CardSkeleton count={count} />}>
        {products?.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <Card
              name={product.title}
              photoURL={product.photos[0]}
              discount={product.discount || undefined}
            />
          </Link>
        ))}
      </Suspense>
    </div>
  </div>
);

export default ProductSection;
