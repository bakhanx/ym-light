"use client";

import React, { useCallback, useState } from "react";
import Options, { selectedItemType } from "./options";

import { useCartStore } from "@/store/useCartStore";
import { Option, Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import updateCart from "../actions/updateCart";
import Loader from "@/components/loader";
import createDirectOrder from "../actions/createDirectOrder";
import { useUserStore } from "@/store/useUserStore";

import getCartItems from "../../my/cart/actions/getCartItems";

import ProductImages from "./product-contents-images";
import ProductDetails from "./product-contents-details";

import QuantitySelector from "./product-contents-quantitySelector";
import ProductButtons from "./product-contents-buttons";

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
  const [selectedOptionList, setSelectedOptionList] = useState<
    selectedItemType[]
  >([]);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product.photos[0]);
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);

  const { cart, addToCart, isDataLoaded, setDataLoaded, setInitData } =
    useCartStore();
  const { addToCartItemCount } = useUserStore();

  const router = useRouter();
  const tempId = Date.now();

  const createCartItem = () => ({
    id: tempId,
    product: product,
    productId: product.id,
    cartId: tempId,
    quantity,
    orderId: tempId,
    options: selectedOptionList.map((selectedOption, index) => ({
      optionId: selectedOption.option.id,
      quantity: selectedOption.quantity,
      cartItemId: tempId,
      id: tempId,
      option: {
        ...selectedOption.option,
        index,
        productId: product.id,
      },
    })),
  });

  const handleAddtoCart = async () => {
    if (product.options.length > 0 && selectedOptionList.length === 0) {
      alert("상품옵션을 선택해주세요.");
      return;
    }

    setIsLoading(true);
    const cartItem = createCartItem();

    // 장바구니 데이터 초기화 server -> zustand
    if (userId && !isDataLoaded) {
      setDataLoaded();
      const cartItems = await getCartItems(userId);
      if (cartItems) {
        setInitData(cartItems);
      }
    }

    addToCart({ ...cartItem, checked: true }); // client

    if (userId) {
      updateCart(cartItem); // server
    }

    const isProductInCart = cart.some(item => item.productId === product.id);

    if (!isProductInCart) {
      addToCartItemCount();
    }

    setIsLoading(false);
    if (
      window.confirm(
        "상품을 장바구니에 담았습니다. 장바구니로 이동하시겠습니까?",
      )
    ) {
      router.push("/my/cart");
    }
  };

  const handleOrderClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    if (!userId) {
      if (
        confirm("로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.")
      ) {
        router.push("/login");
      }
    } else {
      const cartItem = createCartItem();

      if (confirm("바로 주문하시겠습니까?")) {
        try {
          const response = await createDirectOrder(cartItem);
          if (response.ok) {
            alert("주문이 완료되었습니다.");
            router.push("/");
          }
        } catch (error) {
          console.log("Error: 주문 생성 실패", error);
          alert("Error: 주문실패. 관리자에게 문의해주세요.");
          router.push("/contact");
        }
      }
    }
  };

  const handleImageSelect = (photo: string, index: number) => {
    setMainImage(photo);
    setSelectedThumbnail(index);
  };

  // Option Props
  const parentFunc = useCallback((item: selectedItemType[]) => {
    setSelectedOptionList(item);
  }, []);

  return (
    <div className="my-column_bind flex flex-col divide-y-2 divide-slate-300 sm:flex-row sm:divide-x-2 sm:divide-y-0">
      {/* 상품 이미지 */}
      <ProductImages
        photos={product.photos}
        mainImage={mainImage}
        selectedThumbnail={selectedThumbnail}
        onSelectImage={handleImageSelect}
      />

      {/* 상품 정보 */}
      <div className="my-column-right pt-4 sm:w-[50%] sm:pl-10">
        <div className="my-column-box">
          <ProductDetails product={product} />

          {product.options.length > 0 ? (
            <Options
              options={product.options}
              price={product.price}
              discount={product.discount}
              parentFunc={parentFunc}
            />
          ) : (
            <QuantitySelector
              quantity={quantity}
              onChange={setQuantity}
              price={product.price}
              discount={product.discount}
            />
          )}

          {/* 구매, 장바구니 버튼 */}
          <ProductButtons
            onOrderClick={handleOrderClick}
            onAddToCart={handleAddtoCart}
          />
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
