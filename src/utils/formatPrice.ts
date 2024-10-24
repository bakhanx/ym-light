type localeType = "ko-KR" | "en-US" | "ja-JP" | "zh-CN";

export const formatPrice = (price: number, locale: localeType ="ko-KR") => {
  return price.toLocaleString(locale, {maximumFractionDigits: 0});
};
