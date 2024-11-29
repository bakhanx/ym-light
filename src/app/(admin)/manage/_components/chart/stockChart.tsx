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
import getStockOfProducts from "./action/getStock";
import { maxScale } from "./utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

type StockOfProductsType = {
  title: string;
  stock: number;
};

const StockChart = () => {
  const [products, setProducts] = useState<StockOfProductsType[]>([]);
  useEffect(() => {
    const getStocks = async () => {
      const _stocks = await getStockOfProducts();
      console.log("fetch");
      if (_stocks) {
        setProducts(_stocks);
      }
    };
    getStocks();
  }, []);

  const options = {
    responsive: true,
    indexAxis: "y" as const,
    plugins: {
      legend: {
        position: "top" as const,

        labels: {
          boxWidth: 20,
          generateLabels: () => [
            {
              text: "부족",
              fillStyle: "rgba(255, 99, 132, 0.2)",
              strokeStyle: "rgba(255, 99, 132, 1)",
            },
            {
              text: "여유",
              fillStyle: "rgba(54, 162, 235, 0.2)",
              strokeStyle: "rgba(54, 162, 235, 1)",
            },
          ],
        },
        onClick: () => {},
      },
      title: {
        display: true,
        text: "재고 부족 제품",
      },
    },
    scales: {
      x: {
        min: 0,
        max: maxScale({
          data: products.map((product) => product.stock),
          multiple: 2,
        }),
      },
    },
  };

  const data = {
    labels: products.map((product) => product.title), // 제품 이름
    datasets: [
      {
        label: "재고 수량",
        data: products.map((product) => product.stock), // 재고 수량 데이터
        backgroundColor: products.map((product) =>
          product.stock <= 5
            ? "rgba(255, 99, 132, 0.2)"
            : "rgba(54, 162, 235, 0.2)",
        ),
        borderColor: products.map((product) =>
          product.stock <= 5
            ? "rgba(255, 99, 132, 1)"
            : "rgba(54, 162, 235, 1)",
        ),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default StockChart;
