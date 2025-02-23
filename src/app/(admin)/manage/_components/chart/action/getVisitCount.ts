"use server";

import db from "@/utils/db";

const getVisitCount = async (year: number, month: number) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  const logs = await db.log.groupBy({
    by: ["created_at"],
    where: {
      created_at: {
        gte: startDate,
        lte: endDate,
      },
    },
    _count: { created_at: true },
  });

  const daysInMonth = endDate.getDate();
  const visitCountMap = new Map<string, number>(
    Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(year, month - 1, i + 1).toISOString().split("T")[0];
      return [date, 0];
    }),
  );

  logs.forEach(({ created_at, _count }) => {
    const date = created_at.toISOString().split("T")[0];
    visitCountMap.set(date, _count.created_at);
  });

  return Array.from(visitCountMap, ([date, count]) => ({ date, count }));
};

export default getVisitCount;
