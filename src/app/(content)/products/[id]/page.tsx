"use client";

import productData from "@/db/productInfo-kor.json";
import { Fragment, useEffect, useState } from "react";
import TempImage from "@/../public/images/entro-chandelier-001.jpg";
import Image from "next/image";
import ProductInfo from "../_components/productInfo";
import { cls } from "@/libs/utils";

type Props = {
  params: {
    id: string;
  };
};

type ItemType = {
  id: number;
  name: string;
  price: number;
  count: number;
  totalPrice: number;
};
type ItemListType = ItemType[];

const ProductDetail = ({ params }: Props) => {
  const product = productData.products.find(
    (product) => String(product.id) === params.id,
  );

  type ItemOptionType = {
    id: number;
    value: string;
    name: string;
    price: number;
  };

  const itemOptions: ItemOptionType[] = [
    { id: 0, value: "white", name: "화이트", price: 0 },
    { id: 1, value: "black", name: "블랙", price: 200000 },
    { id: 2, value: "black", name: "골드", price: 250000 },
  ];


  const initItemCount = Array(itemOptions.length).fill(0);

  const [itemCount, setItemCount] = useState<number[]>(initItemCount);

  const [selectedItemList, setSelectedItemList] = useState<ItemListType>([]);


  const [isOpenOption, setIsOpenOption] = useState(false);

  const handleItemCount = (
    index: number,
    countType: "add" | "substract",
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setItemCount((prev) => {
      const temp = [...prev];
      temp[index] = countType === "add" ? temp[index] + 1 : temp[index] - 1;
      return temp;
    });
  };

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {};

  const handleBlur = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    console.log("수량 변경");
    setItemCount((prev) => {
      const temp = [...prev];
      if (Number(event.target.value) < 1) {
        temp[index] = 1;
        return temp;
      }

      // 최대 수량 제한
      // ...

      temp[index] = Number(event.target.value);
      return temp;
    });
  };

  const handleOpenOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpenOption((prev) => !prev);
  };

  const handleSelectOption = (
    index: number,
    event: React.MouseEvent<HTMLLIElement>,
  ) => {
    console.log("옵션 선택");
    if (!selectedItemList?.find((v) => v.id === index)) {
      setSelectedItemList([
        ...selectedItemList,
        {
          id: index,
          name: event.currentTarget.innerText,
          count: itemCount[index] + 1,
          price: product?.price || 0,
          totalPrice:
            (product &&
              (product.price + itemOptions[index].price) *
                (itemCount[index] + 1)) ||
            0,
        },
      ]);
    } else {
      const newItemList = [...selectedItemList];
      const item = newItemList.find((item) => item.id === index);
      if (item) {
        item.totalPrice =
          (product &&
            (product?.price + itemOptions[index].price) *
              (itemCount[index] + 1)) ||
          0;
      }
      console.log(item);
      console.log(item?.totalPrice);

      setSelectedItemList([...selectedItemList]);
    }
    setItemCount((prev) => {
      const temp = [...prev];
      temp[index] = temp[index] + 1;
      return temp;
    });
    setIsOpenOption(false);
  };

  const handleDeleteOption = (
    index: number,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setSelectedItemList((prev) => {
      const temp = [...prev];
      temp.splice(index, 1);
      return temp;
    });
  };

  useEffect(() => {
    console.log(selectedItemList);
  }, [selectedItemList]);

  return (
    <>
      {product && (
        <div className="my-container pt-20">
          <div className="my-content m-auto w-[1280px] max-w-screen-xl px-10 pb-28 pt-8 ">
            <div className="my-column_bind flex divide-x-2 divide-slate-300">
              {/* left */}
              <div className="my-column-left w-[50%] pr-10">
                <div className="my-column-box">
                  <div className="my-banner-image ">
                    <div className="aspect-square w-full bg-slate-500">
                      <Image src={TempImage} alt="temp" />
                    </div>
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
                      <div className="text-3xl font-bold">{product?.name}</div>

                      <div className="gap-x-2 pt-5 font-bold">
                        {product?.discount && (
                          <div className="flex gap-x-2">
                            <span className="text-xl text-red-600">
                              {product?.discount}%
                            </span>

                            <span className="text-lg text-yellow-500 line-through opacity-60 ">
                              {product?.price.toLocaleString("ko-KR")}원
                            </span>
                          </div>
                        )}

                        <span className="text-2xl">
                          {product?.discount
                            ? (
                                product?.price *
                                ((100 - product.discount) / 100)
                              ).toLocaleString("ko-KR")
                            : product?.price.toLocaleString("ko-KR")}
                          원
                        </span>
                      </div>

                      <div className="flex flex-col gap-y-2 pt-20">
                        <ProductInfo label="색상" data={product?.color} />
                        <ProductInfo
                          label="재질"
                          data={product?.ingradient.join(", ")}
                        />
                        <ProductInfo
                          label="사이즈"
                          data={`W: ${product?.size.width} H: ${product?.size.height}`}
                        />
                        <ProductInfo label="전구" data={product?.bulb} />
                        <ProductInfo
                          label="제조사"
                          data={product?.manufacture}
                        />
                        <ProductInfo label="설명" data={product?.description} />
                      </div>
                    </div>
                  </div>

                  {/* Option */}
                  <div className="option pt-10">
                    <div>
                      <label className="font-bold">상품옵션</label>
                      <div
                        className={cls(
                          "dropbox-option mt-2 border text-sm font-semibold text-slate-500",
                          isOpenOption
                            ? "border-orange-300"
                            : "border-slate-300",
                        )}
                      >
                        <button
                          className={cls(
                            "flex w-full justify-between border p-2 hover:cursor-pointer hover:bg-orange-50",
                            isOpenOption ? "bg-slate-100" : "",
                          )}
                          onClick={handleOpenOption}
                        >
                          <span>상품명</span>
                          <span>🔽</span>
                        </button>

                        <ul
                          className={cls(
                            "flex w-full flex-col divide-y-2 border bg-white",
                            isOpenOption ? "" : "hidden",
                          )}
                        >
                          {itemOptions.map((itemOption, index) => (
                            <li
                              key={itemOption.id}
                              value={itemOption.value}
                              className="p-2 hover:cursor-pointer hover:bg-orange-50"
                              onClick={(e) => handleSelectOption(index, e)}
                            >
                              {` ${itemOption.id} : ${itemOption.name}`}{" "}
                              {itemOption.price > 0 && `(+${itemOption.price})`}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* select result */}
                    <div className="pt-10">
                      <div className="flex  flex-col gap-y-5">
                        {selectedItemList?.map((item, index) => (
                          <div
                            key={item.id}
                            className="flex flex-col  gap-y-5 border-b-2 bg-slate-50 p-3"
                          >
                            <div className="flex justify-between">
                              <span>{item.name}</span>
                              <button
                                onClick={(e) => handleDeleteOption(index, e)}
                              >
                                ❌
                              </button>
                            </div>

                            <div className="flex justify-between">
                              <div className="count-btn flex text-black">
                                <button
                                  className="flex h-6 w-6 items-center justify-center border p-2 hover:bg-orange-50"
                                  onClick={(e) =>
                                    handleItemCount(index, "substract", e)
                                  }
                                  disabled={itemCount[index] === 1}
                                >
                                  -
                                </button>

                                <input
                                  className="flex h-6 w-10 items-center justify-center border text-center"
                                  type="text"
                                  value={itemCount[index]}
                                  onChange={(e) => handleChange(index, e)}
                                  onBlur={(e) => {
                                    handleBlur(index, e);
                                  }}
                                />
                                <button
                                  className="flex h-6 w-6 items-center justify-center border p-2 hover:bg-orange-50"
                                  onClick={(e) =>
                                    handleItemCount(index, "add", e)
                                  }
                                >
                                  +
                                </button>
                              </div>

                              <div className="item-price">
                                <span>
                                  {product?.discount
                                    ? (
                                        item.totalPrice *
                                        ((100 - product.discount) / 100)
                                      ).toLocaleString("ko-KR")
                                    : item.totalPrice.toLocaleString("ko-KR")}
                                  원
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="my-btn-wrap mt-20 flex flex-col gap-y-5 font-bold text-white">
                    <button className="w-full rounded-md bg-red-700 p-5 hover:bg-red-600">
                      구매하기
                    </button>
                    <div className="flex gap-x-4">
                      <button className="w-full rounded-md bg-blue-500 p-5 hover:bg-blue-400">
                        장바구니
                      </button>
                      <button className="w-full rounded-md bg-slate-700 p-5 hover:bg-slate-600">
                        찜하기
                      </button>
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
      )}
    </>
  );
};

export default ProductDetail;
