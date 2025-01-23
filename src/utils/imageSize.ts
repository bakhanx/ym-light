import imageSize from "image-size";

const DIMENSION_WIDTH = 1204;
const DIMENSION_HEIGHT = 768;

export const getImageSize = async (url: string) => {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);
  const dimensions = imageSize(uint8Array);
  return {
    width: dimensions.width || DIMENSION_WIDTH,
    height: dimensions.height || DIMENSION_HEIGHT,
  };
};
export const getImageData = async (url: string) => {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return `data:${response.headers.get("content-type")};base64,${buffer.toString("base64")}`;
};
