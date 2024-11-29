type maxScale = {
  data: number[];
  multiple: number;
};

export const maxScale = ({ data, multiple = 1 }: maxScale) => {
  return Math.ceil(Math.max(...data) / 10) * 10 * multiple;
};
