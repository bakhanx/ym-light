"use server";

import db from "@/utils/db";

const getVisitCount = async (year: number, month: number) => {
  const startDate = new Date(year, month - 1, 1); // 선택한 년월의 첫날
  const endDate = new Date(year, month, 0); // 선택한 년월의 마지막 날

  const logs = await db.log.findMany({
    where: {
      created_at: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      created_at: true,
    },
  });

  const daysInMonth = endDate.getDate();
  type VisitCountData = {
    date: string;
    count: number;
  };

  const visitCountData: VisitCountData[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(Date.UTC(year, month - 1, day))
      .toISOString()
      .split("T")[0];
    visitCountData.push({ date, count: 0 });
  }

  // 로그 데이터를 해당 날짜에 반영
  logs.forEach((log) => {
    const date = log.created_at.toISOString().split("T")[0];
    const index = visitCountData.findIndex((item) => item.date === date);
    if (index !== -1) {
      visitCountData[index].count += 1;
    }
  });

  return visitCountData;
};

export default getVisitCount;
