"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  scales,
} from "chart.js";
import getVisitCount from "./action/getVisitCount";
import SelectDate from "./selectDate";
import useChartData from "./action/useChartData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      // display:false,
      labels: {
        usePointStyle: true,
      },
      position: "top" as const,
    },
    title: {
      display: true,
      text: "유저 통계",
    },
  },
  scales: {
    y: {
      ticks: {
        stepSize: 2,
      },
      min: 0,
    },
  },
};

const UserVisitChart = () => {
  const initialYear = new Date().getFullYear();
  const initialMonth = new Date().getMonth() + 1;
  const {
    data: visitCountData,
    error,
    handleDateChange,
    month,
    year,
  } = useChartData(getVisitCount, initialYear, initialMonth);

  const data = {
    labels: visitCountData.map((data) => data.date), // 날짜 데이터
    datasets: [
      {
        label: "한 달 방문자 수",
        data: visitCountData.map((data) => data.count), // 로그인 수 데이터
        fill: false,
        pointStyle: "line",
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <SelectDate year={year} month={month} onDateChange={handleDateChange} />
      {!error ? <Line data={data} options={options} /> : <p>{error}</p>}
    </div>
  );
};

export default UserVisitChart;
