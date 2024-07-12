export function cls(...classnames: string[]) {
  return classnames.join(" ");
}

type localeType = "ko-KR" | "en-US" | "ja-JP" | "zh-CN";

export const formatOfPrice = (price: number, locale: localeType ="ko-KR") => {
  return price.toLocaleString(locale, {maximumFractionDigits: 0});
};
