import db from "@/utils/db";
import { formatPrice } from "@/utils/formatPrice";
import getSession from "@/utils/session";
import {
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  ShoppingCartIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

const getUserCount = async () => {
  const { id } = await getSession();
  const [orderCount, cartCount, chatCount, contactCount, cartItems] =
    await Promise.all([
      db.order.count({
        where: {
          userId: id,
        },
      }),
      db.cartItem.count({
        where: {
          cart: {
            userId: id,
          },
        },
      }),
      db.chatRoom.count({
        where: {
          users: {
            some: {
              id,
            },
          },
        },
      }),
      db.order.count({
        where: {
          userId: id,
        },
      }),
      db.cartItem.findMany({
        where: {
          cart: {
            userId: id,
          },
        },
        select: {
          quantity: true,
          product: {
            select: {
              price: true,
            },
          },
        },
      }),
    ]);
  const totalOrderPrice = cartItems.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);
  return { orderCount, cartCount, chatCount, contactCount, totalOrderPrice };
};

const Home = async () => {
  const { orderCount, cartCount, chatCount, contactCount, totalOrderPrice } =
    await getUserCount();
  console.log(orderCount, cartCount, chatCount, contactCount);
  return (
    <div className="wrapper flex flex-col gap-y-4">
      {/* Profile */}
      <div className="rounded-md bg-white p-4">관리자 님</div>

      {/* History */}
      <div className="flex justify-between rounded-md bg-white px-4 py-8">
        <Link href="/my/order">
          <div className="flex gap-x-2 hover:cursor-pointer">
            <div className="flex size-12 items-center justify-center rounded-full bg-gray-200">
              <TruckIcon className="size-6" />
            </div>
            <div className="flex flex-col">
              <div>주문배송</div>
              <div className="font-bold text-orange-500">{orderCount}</div>
            </div>
          </div>
        </Link>
        <Link href="/my/cart">
          <div className="flex gap-x-2 hover:cursor-pointer">
            <div className="flex size-12 items-center justify-center rounded-full bg-gray-200">
              <ShoppingCartIcon className="size-6" />
            </div>
            <div className="flex flex-col">
              <div>장바구니</div>
              <div className="font-bold text-orange-500">{cartCount}</div>
            </div>
          </div>
        </Link>
        <Link href="/my/chat">
          <div className="flex gap-x-2 hover:cursor-pointer">
            <div className="flex size-12 items-center justify-center rounded-full bg-gray-200">
              <ChatBubbleLeftRightIcon className="size-6" />
            </div>
            <div className="flex flex-col">
              <div>대화내역</div>
              <div className="font-bold text-orange-500">{chatCount}</div>
            </div>
          </div>
        </Link>
        <Link href="/my/contact">
          <div className="flex gap-x-2 hover:cursor-pointer">
            <div className="flex size-12 items-center justify-center rounded-full bg-gray-200">
              <EnvelopeIcon className="size-6" />
            </div>
            <div className="flex flex-col">
              <div>문의내역</div>
              <div className="font-bold text-orange-500">{contactCount}</div>
            </div>
          </div>
        </Link>
      </div>

      {/* Statistics */}
      <div className="flex gap-x-4">
        <div className="flex w-1/3 min-w-64 shrink-0 flex-col gap-y-4 rounded-md bg-white p-4">
          <div>
            총 구매 금액 :{" "}
            <span className="font-bold">{formatPrice(totalOrderPrice)}원</span>{" "}
          </div>
          <div>
            총 구매 개수 : <span className="font-bold">10</span>
          </div>
          <div>
            사이트 방문 횟수 : <span className="font-bold">4</span>
          </div>
        </div>
        <div className="w-full rounded-md bg-white p-4">
          <div>구매 카테고리 분포</div>
          {/* Pie Graph */}
          <div className="m-auto aspect-square w-full max-w-lg p-4">
            <div className="h-full w-full rounded-full bg-gray-200" />
          </div>
        </div>
      </div>

      {/* 관심 많은 상품 */}
      <div className="rounded-md bg-white p-4">
        <span className="text-lg">BEST 상품 추천</span>
        <div className="grid grid-cols-2 gap-y-4 pt-8 md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="m-auto">
              <div className="size-32 rounded-md bg-gray-200" />
              <div className="pt-2">
                <div>샹들리에24구</div>
                <div>{formatPrice(12000000)}원</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
