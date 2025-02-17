import { formatPrice } from "@/utils/formatPrice";

interface Product {
  id: number;
  name: string;
  price: number;
}

const dummyProducts: Product[] = [
  { id: 1, name: "샹들리에 24등", price: 12000000 },
  { id: 2, name: "무드등", price: 5000000 },
  { id: 3, name: "네온사인 후르츠", price: 2500000 },
  { id: 4, name: "샹들리에 18등", price: 1200000 },
];

const RecommendProducts = () => (
  <div className="rounded-md bg-white p-4">
    <span className="text-lg">추천 상품</span>
    <div className="grid grid-cols-2 gap-y-4 pt-8 md:grid-cols-4">
      {dummyProducts.map((product) => (
        <div key={product.id} className="m-auto">
          <div className="size-32 rounded-md bg-gray-200" />
          <div className="pt-2">
            <div>{product.name}</div>
            <div>{formatPrice(product.price)}원</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default RecommendProducts;