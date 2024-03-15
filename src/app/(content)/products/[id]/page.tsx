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

type ItemOptionType = {
  id: number;
  name: string;
  price: number;
};

type selectedItemType = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
};

const data: ItemOptionType[] = [
  { id: 0, name: "화이트", price: 0 },
  { id: 1, name: "블랙", price: 200000 },
  { id: 2, name: "골드", price: 250000 },
];

// 쿠폰시스템
// const coupon = [{ id: 1, name: "신규할인쿠폰", rate: 10 }];

const ProductDetail = ({ params }: Props) => {
  const product = productData.products.find(
    (product) => String(product.id) === params.id,
  );

  const parsePrice = (price: number) => {
    return price.toLocaleString("ko-KR");
  };

  const calcPrice = (price: number) => {
    if (product?.discount) {
      return price - (price * product.discount) / 100;
    }

    return price;

    // 복수 할인
    // if (product?.discount) {
    //   const totalRate = discount
    //     .map((item) => item)
    //     .reduce((acc, cur) => acc + cur, 0);
    //   return (price - (price * totalRate) / 100).toLocaleString("ko-KR");
    // }
  };

  const [selectedItemList, setSelectedItemList] = useState<selectedItemType[]>(
    [],
  );

  const [itemOptions, setItemOptions] = useState(data);
  const [totalItemListPrice, setTotalItemListPrice] = useState(0);

  const [quantity, setQuantity] = useState(Array(data.length).fill(0));

  const [isOpenOption, setIsOpenOption] = useState(false);

  const handleOpenOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpenOption((prev) => !prev);
  };

  const handleSelectOption = (id: number, e: any) => {
    const temp = [...quantity];
    temp[id]++;
    setQuantity(temp);

    const clickedItem = data.find((v) => v.id === id) as any;
    const isExistList = selectedItemList.find((v) => v.id === clickedItem.id);

    if (!isExistList) {
      const newClickedItem = {
        ...clickedItem,
        quantity: clickedItem.quantity ? clickedItem?.quantity + 1 : 1,
        totalPrice:
          calcPrice(product?.price as number) +
          (clickedItem.quantity
            ? clickedItem.price * (clickedItem.quantity + 1)
            : clickedItem.price),
      };
      setSelectedItemList((prev) => [...prev, newClickedItem]);
    } else {
      const newClickItem = [...selectedItemList];
      const foundItem = newClickItem.find((v) => v.id === id);
      if (foundItem) {
        foundItem.quantity++;
        foundItem.totalPrice +=
          calcPrice(product?.price as number) + foundItem.price;
      }
      setSelectedItemList(newClickItem);
    }
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

  const handleButtonClick = (id: number, buttonType: "add" | "substract") => {
    const newClickItem = [...selectedItemList];
    const foundItem = newClickItem.find((v) => v.id === id);

    if (foundItem) {
      if (buttonType === "add") {
        foundItem.quantity++;
        foundItem.totalPrice +=
          calcPrice(product?.price as number) + foundItem.price;
        setQuantity((prev) => {
          const temp = [...prev];
          temp[id]++;
          return temp;
        });
      } else if (buttonType === "substract") {
        if (quantity[id] === 1) return;
        foundItem.quantity--;
        foundItem.totalPrice -=
          calcPrice(product?.price as number) + foundItem.price;
        setQuantity((prev) => {
          const temp = [...prev];
          temp[id]--;
          return temp;
        });
      }
    }
    setSelectedItemList(newClickItem);
  };

  const handleChange = (id: number, e: any) => {
    const temp = [...quantity];
    temp[id] = e.target.value;
    setQuantity(temp);
  };

  const handleBlur = (id: number, e: any) => {
    let _quantity = 0;
    if (quantity[id] < 1) {
      setQuantity((prev) => {
        const temp = [...prev];
        temp[id] = 1;
        return temp;
      });
      _quantity = 1;
    } else {
      _quantity = e.target.value;
    }
    const newClickItem = [...selectedItemList];
    const foundItem = newClickItem.find((v) => v.id === id);
    if (foundItem) {
      foundItem.quantity = _quantity;
      foundItem.totalPrice =
        (calcPrice(product?.price as number) + foundItem.price) *
        foundItem.quantity;
    }
    setSelectedItemList(newClickItem);
  };

  useEffect(() => {
    setTotalItemListPrice(
      selectedItemList
        .map((item) => item.totalPrice)
        .reduce((acc, cur) => acc + cur, 0),
    );
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
                          {itemOptions.map((item) => (
                            <li
                              key={item.id}
                              className="p-2 hover:cursor-pointer hover:bg-orange-50"
                              onClick={(e) => handleSelectOption(item.id, e)}
                            >
                              {` ${item.id} : ${item.name}`}{" "}
                              {item.price > 0 && `(+${item.price})`}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* select result */}
                    <div className="pt-10">
                      <div className="flex  flex-col gap-y-5">
                        {selectedItemList?.map((item) => (
                          <div
                            key={item.id}
                            className="flex flex-col  gap-y-5 border-b-2 bg-slate-50 p-3"
                          >
                            <div className="flex justify-between">
                              <span>{item.name}</span>
                              <button
                                onClick={(e) => handleDeleteOption(item.id, e)}
                              >
                                ❌
                              </button>
                            </div>

                            <div className="flex justify-between">
                              <div className="count-btn flex text-black">
                                <button
                                  className="flex h-6 w-6 items-center justify-center border p-2 hover:bg-orange-50"
                                  onClick={(e) =>
                                    handleButtonClick(item.id, "substract")
                                  }
                                >
                                  -
                                </button>

                                <input
                                  className="flex h-6 w-10 items-center justify-center border text-center"
                                  type="number"
                                  value={quantity[item.id]}
                                  onChange={(e) => handleChange(item.id, e)}
                                  onBlur={(e) => {
                                    handleBlur(item.id, e);
                                  }}
                                />
                                <button
                                  className="flex h-6 w-6 items-center justify-center border p-2 hover:bg-orange-50"
                                  onClick={(e) =>
                                    handleButtonClick(item.id, "add")
                                  }
                                >
                                  +
                                </button>
                              </div>

                              <div className="item-price">
                                <span>{parsePrice(item.totalPrice)}원</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="pt-5">
                        <div className="flex items-end justify-end gap-x-2 px-3 ">
                          <span className="font-semibold text-slate-500">
                            추가 할인
                          </span>
                          <span className="font-bold text-red-500">
                            {parsePrice(totalItemListPrice)}원
                          </span>
                        </div>
                        <div className="flex items-end justify-end gap-x-10 px-3">
                          <span className="font-semibold text-slate-700">
                            총 가격
                          </span>
                          <span className="text-xl font-bold">
                            {parsePrice(totalItemListPrice)}원
                          </span>
                        </div>
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
