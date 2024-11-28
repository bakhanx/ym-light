"use client";

import { useState, useEffect } from "react";

const useChartData = (
  fetchFunction: (
    year: number,
    month: number,
  ) => Promise<{ date: string; count: number }[]>,
  initialYear: number,
  initialMonth: number,
) => {

  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const [data, setData] = useState<{ date: number; count: number }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await fetchFunction(year, month);
        const processedData = fetchedData.map((item) => ({
          ...item,
          date: new Date(item.date).getDate(),
        }));
        setData(processedData);
        setError(null);
      } catch (err) {
        setError("데이터를 가져오는 중 오류가 발생했습니다.");
      }
    };
    fetchData();
  }, [year, month, fetchFunction]);

  const handleDateChange = (newYear: number, newMonth: number) => {
    setYear(newYear);
    setMonth(newMonth);
  };

  return { year, month, data, handleDateChange, error };
};

export default useChartData;
