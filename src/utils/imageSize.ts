import imageSize from "image-size";

export const getImageSize = async (url: string) => {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);
  const dimensions = imageSize(uint8Array);
  return { width: dimensions.width, height: dimensions.height };
};
export const getImageData = async (url: string) => {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return `data:${response.headers.get("content-type")};base64,${buffer.toString("base64")}`;
};
