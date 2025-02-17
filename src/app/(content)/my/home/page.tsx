import db from "@/utils/db";
import getSession from "@/utils/session";
import React from "react";
import HistorySection from "./_components/history-section";
import RecommendProducts from "./_components/recommend-products";
import Statistics from "./_components/statistics";

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
  return (
    <div className="wrapper flex flex-col gap-y-4">
      
      {/* Profile */}
      <div className="rounded-md bg-white p-4">관리자 님</div>

      {/* History */}
      <HistorySection
        orderCount={orderCount}
        cartCount={cartCount}
        chatCount={chatCount}
        contactCount={contactCount}
      />

      {/* Statistics */}
      <Statistics
        totalOrderCount={orderCount}
        visitCount={4}
        totalOrderPrice={totalOrderPrice}
      />

      {/* 관심 많은 상품 */}
      <RecommendProducts />
    </div>
  );
};

export default Home;
