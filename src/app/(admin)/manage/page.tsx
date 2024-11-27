import React, { useEffect, useState } from "react";
import UserVisitChart from "./_components/chart/userVisitChart";
import OrdersChart from "./_components/chart/ordersChart";
import StockChart from "./_components/chart/stockChart";
import GalleryViewsChart from "./_components/chart/galleryViewsChart";
import db from "@/utils/db";
import getVisitCount from "./_components/chart/action/getVisitCount";

const Manage = () => {

  return (
    <div className="h-screen">
      <div className="pt-20 ">관리자 페이지</div>
      <div className="flex">
        <div className="h-[400px] w-[800px]">
         
          <UserVisitChart />
        </div>
        {/* <OrdersChart fetchData={} />
        <StockChart fetchData={} />
        <GalleryViewsChart fetchData={} /> */}
      </div>
    </div>
  );
};

export default Manage;
