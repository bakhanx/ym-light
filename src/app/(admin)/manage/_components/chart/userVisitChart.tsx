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
} from "chart.js";
import getVisitCount from "./action/getVisitCount";

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
    // title: {
    //   display: true,
    //   text: "유저 통계",
    // },
  },
};
type UserVisitChartProps = {
  fetchData: {
    date: string;
    count: number;
  }[];
};
const UserVisitChart = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [visitCountData, setVisitCountData] = useState<
    { date: number; count: number }[]
  >([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getVisitCount(year, month);
      console.log("fetch");
      const processedData = data.map((item) => {
        return {
          ...item,
          date: new Date(item.date).getDate(),
        };
      });
      setVisitCountData(processedData);
    };
    fetchData();
  }, [year, month]);
  const handleDateChange = (newYear: number, newMonth: number) => {
    setYear(newYear);
    setMonth(newMonth);
  };

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
      <div>
        <label>Year: </label>
        <select
          value={year}
          onChange={(e) => handleDateChange(parseInt(e.target.value), month)}
        >
          {[2023, 2024].map((_year) => (
            <option key={_year} value={_year}>
              {_year}
            </option>
          ))}
        </select>
        <label>Month: </label>
        <select
          value={month}
          onChange={(e) => handleDateChange(year, parseInt(e.target.value))}
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((_month) => (
            <option key={_month} value={_month}>
              {_month}
            </option>
          ))}
        </select>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default UserVisitChart;
