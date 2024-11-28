"use client";

import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import getOrder from "./action/getOrder";
import SelectDate from "./selectDate";
import useChartData from "./action/useChartData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "주문 통계",
    },
  },

  scales: {
    y: {
      ticks: {
        stepSize: 1,
      },
      min: 0,
    },
  },
};

const OrdersChart = () => {
  const initialYear = new Date().getFullYear();
  const initialMonth = new Date().getMonth() + 1;
  const {
    data: orderCountData,
    year,
    month,
    handleDateChange,
    error,
  } = useChartData(getOrder, initialYear, initialMonth);

  const data = {
    labels: orderCountData.map((data) => data.date), // 날짜 데이터
    datasets: [
      {
        label: "한달 주문 수",
        data: orderCountData.map((data) => data.count), // 주문 수 데이터
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <SelectDate year={year} month={month} onDateChange={handleDateChange} />
      {!error ? <Bar data={data} options={options} /> : <p>{error}</p>}
    </div>
  );
};

export default OrdersChart;
