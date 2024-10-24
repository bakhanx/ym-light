import dayjs from "dayjs";

export function formatDate(
  date?: Date,
  options?: { time?: boolean; timeAgo?: boolean },
): string {
  const dateTime = dayjs(date);
  const nowTime = dayjs();

  if (options?.timeAgo) {
    const diffTime = (Number(nowTime) - Number(dateTime)) / 1000;
    const times = [
      { name: "년", ms: 60 * 60 * 24 * 365 },
      { name: "개월", ms: 60 * 60 * 24 * 30 },
      { name: "일", ms: 60 * 60 * 24 },
      { name: "시간", ms: 60 * 60 },
      { name: "분", ms: 60 },
    ];

    for (const val of times) {
      const betweenTime = Math.floor(diffTime / val.ms);
      if (betweenTime > 0) {
        return `${betweenTime}${val.name} 전`;
      }
    }
    return "방금 전";
  }

  if (options?.time) {
    return dateTime.format("HH:mm");
  }

  return dateTime.format("YYYY년 MM월 DD일 HH:mm:ss");
}
