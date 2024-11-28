import React, { useEffect, useState } from "react";
import UserVisitChart from "./_components/chart/userVisitChart";
import OrdersChart from "./_components/chart/ordersChart";
import StockChart from "./_components/chart/stockChart";

import db from "@/utils/db";

const Manage = async () => {
  return (
    <div className="min-h-screen">
      <div className="pt-20 ">관리자 페이지</div>
      <div className="flex flex-col gap-8">
        <div className="h-[400px] w-[800px]">
          <UserVisitChart />
        </div>
        <div className="h-[400px] w-[800px]">
          <OrdersChart />
        </div>
        <div className="h-[400px] w-[800px]">
          <StockChart />
        </div>
      </div>
    </div>
  );
};

export default Manage;
