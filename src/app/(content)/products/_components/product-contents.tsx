"use client";

import { formatPrice } from "@/utils/formatPrice";
import {
  HeartIcon,
  ShoppingBagIcon,
  TruckIcon,
} from "@heroicons/react/16/solid";
import React, { useState } from "react";
import Options, { selectedItemType } from "./options";
import ProductInfo from "./product-Info";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import { Option, Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import updateCart from "../actions/updateCart";
import Loader from "@/components/loader";

type Options = {
  options: Option[];
};

type ProductWithOptions = {
  product: Product & Options;
};
type ProductContentsProps = ProductWithOptions & {
  userId: number;
};

const ProductContents = ({ product, userId }: ProductContentsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart } = useCartStore((state) => state);
  const [selectedOptionList, setSelectedOptionList] = useState<
    selectedItemType[]
  >([]);
  const [quantity, setQuantity] = useState(product.options.length > 0 ? 0 : 1);
  const router = useRouter();
  const handleAddtoCart = async () => {
    // local State
    if (product.options.length > 0 && selectedOptionList.length === 0) {
      alert("상품옵션을 선택해주세요.");
      return;
    }
    setIsLoading(true);

    const cartItem = {
      id: 1,
      product: product,
      productId: product.id,
      cartId: 1,
      quantity,
      orderId: 1,
      options: selectedOptionList.map((selectedOption, index) => ({
        optionId: selectedOption.option.id,
        quantity: selectedOption.quantity,
        cartItemId: 1,
        id: 1,
        option: {
          id: selectedOption.option.id,
          index,
          name: selectedOption.option.name,
          price: selectedOption.price,
          productId: product.id,
          stock: selectedOption.option.stock,
        },
      })),
    };

    // z-store
    const addToCartPromise = addToCart({ ...cartItem, checked: true });
    // prisma
    const updateCartPromise = updateCart(cartItem);

    await Promise.all([addToCartPromise, updateCartPromise]);
    setIsLoading(false);
    if (
      window.confirm(
        "상품을 장바구니에 담았습니다. 장바구니로 이동하시겠습니까?",
      )
    ) {
      router.push("/cart");
    }
  };

  // Option Props
  const parentFunc = (item: selectedItemType[]) => {
    setSelectedOptionList(item);
  };

  // Quantity Button
  const handleQuantityClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    buttonType: "add" | "substract",
  ) => {
    event.preventDefault();

    if (buttonType === "add") {
      setQuantity((prev) => prev + 1);
    } else if (buttonType === "substract") {
      if (quantity === 1) return;
      setQuantity((prev) => prev - 1);
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(+event.target.value);
  };
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (quantity < 1) {
      setQuantity(1);
    } else {
      setQuantity(+event.target.value);
    }
  };

  const handleOrderClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!userId) {
      if (
        confirm("로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.")
      ) {
        router.push("/login");
      }
    } else {
      
    }
  };

  return (
    <div className="my-column_bind flex flex-col divide-y-2 divide-slate-300 sm:flex-row sm:divide-x-2 sm:divide-y-0">
      {/* left */}
      <div className="my-column-left pb-4 sm:w-[50%] sm:pr-10 ">
        <div className="my-column-box">
          <div className="my-banner-image ">
            <div className="relative aspect-square w-full bg-slate-500">
              <Image
                src={`${product.photo}/sharpen=1,fit=scale-down,w=640`}
                fill
                alt="temp"
                objectFit="cover"
              />
            </div>
          </div>
          <div className="my-banner-func pt-5">
            <div className="h-16 w-full border-2">이미지 슬라이드</div>
          </div>
        </div>
      </div>

      {/* right */}
      <div className="my-column-right pt-4 sm:w-[50%] sm:pl-10">
        <div className="my-column-box">
          {/* Info */}
          <div className="my-product-info">
            <div className="">
              <div className="text-xl font-semibold sm:text-3xl">
                {product.title}
              </div>

              <div className="gap-x-2 pt-5 font-semibold">
                {product?.discount && (
                  <div className="flex gap-x-2">
                    <span className="text-lg text-red-600 sm:text-xl">
                      {product?.discount}%
                    </span>

                    <span className="text-sm text-yellow-500 line-through opacity-60 sm:text-base ">
                      {formatPrice(product?.price)}원
                    </span>
                  </div>
                )}

                <span className="text-lg sm:text-2xl">
                  {product?.discount
                    ? formatPrice(
                        product?.price * ((100 - product.discount) / 100),
                      )
                    : formatPrice(product?.price)}
                  원
                </span>
              </div>

              <div className="flex flex-col gap-y-2 pt-8 text-sm sm:pt-10 sm:text-base">
                <ProductInfo label="색상" data={product?.color} />
                <ProductInfo label="재질" data={product?.material} />
                <ProductInfo label="사이즈" data={product?.size} />
                <ProductInfo label="전구" data={product?.bulb} />
                <ProductInfo label="제조사" data={product?.manufacturer} />
                <ProductInfo label="설명" data={product?.description} />
              </div>
            </div>
          </div>

          {/* Option */}
          {product.options.length > 0 ? (
            <Options
              options={product.options}
              price={product.price}
              discount={product.discount}
              parentFunc={parentFunc}
            />
          ) : (
            <>
              <div className="flex items-end justify-between pb-4 pt-16">
                <div className="count-btn flex text-black">
                  <button
                    className="flex h-6 w-6 items-center justify-center border p-2 hover:bg-orange-50"
                    onClick={(e) => handleQuantityClick(e, "substract")}
                  >
                    -
                  </button>

                  <input
                    className="flex h-6 w-10 items-center justify-center border text-center"
                    type="number"
                    value={quantity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <button
                    className="flex h-6 w-6 items-center justify-center border p-2 hover:bg-orange-50"
                    onClick={(e) => handleQuantityClick(e, "add")}
                  >
                    +
                  </button>
                </div>

                <div className="flex items-end gap-x-5">
                  <div className="text-gray-500">총 금액</div>
                  <span className="w-36 text-right text-xl font-bold">
                    <span className="text-lg sm:text-2xl">
                      {product?.discount
                        ? formatPrice(
                            product?.price *
                              ((100 - product.discount) / 100) *
                              quantity,
                          )
                        : formatPrice(product?.price * quantity)}
                      원
                    </span>
                  </span>
                </div>
              </div>
            </>
          )}

          {/* 구매 장바구니 찜 버튼 */}
          <div className="my-btn-wrap flex flex-col gap-y-5 pt-5 text-sm font-bold text-white sm:text-base">
            <button
              onClick={handleOrderClick}
              className="flex w-full items-center justify-center gap-x-1 rounded-md bg-amber-500 p-4 hover:bg-amber-600 sm:p-5"
            >
              <TruckIcon className="h-5 w-5 sm:h-7 sm:w-7" />
              바로주문하기
            </button>
            <div className="flex gap-x-4">
              <button
                onClick={handleAddtoCart}
                className="flex w-full items-center justify-center gap-x-1 rounded-md bg-blue-500 p-4 hover:bg-blue-600 sm:p-5"
              >
                <ShoppingBagIcon className="h-4 w-4 stroke-2 sm:h-5 sm:w-5" />
                <span>장바구니</span>
              </button>
              <button className="flex w-full items-center justify-center gap-x-1 rounded-md bg-red-600 p-4 hover:bg-red-700 sm:p-5">
                <HeartIcon className="h-4 w-4 stroke-2 sm:h-5 sm:w-5" />
                찜하기
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="fixed left-0 top-0 h-full w-full">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default ProductContents;
