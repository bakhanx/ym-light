import React, { useEffect, useState } from "react";
import UserVisitChart from "./_components/chart/userVisitChart";
import OrdersChart from "./_components/chart/ordersChart";
import StockChart from "./_components/chart/stockChart";

import db from "@/utils/db";

const Manage = async () => {
  return (
    <div className="min-h-screen">
      <div className="sm:pt-20 pt-24 ">관리자 페이지</div>
      <div className="flex flex-col gap-8 items-center ">
        <div className="h-auto w-full">
          <UserVisitChart />
        </div>
        <div className="h-auto w-full">
          <OrdersChart />
        </div>
        <div className="auto w-full">
          <StockChart />
        </div>
      </div>
    </div>
  );
};

export default Manage;
