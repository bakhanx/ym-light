import { useState } from "react";

const MAX_COUNT = 3;
const initail_previews = [...Array(MAX_COUNT).fill("")];

const useImagePreviews = () => {
  const [previews, setPreviews] = useState(initail_previews);

  const handleChangeImage = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const {
      target: { files, id },
    } = event;

    if (files) {
      const index = +id.charAt(id.length - 1);
      const file = files[0];
      const url = URL.createObjectURL(file);

      setPreviews((prev) => {
        const temp = [...prev];
        temp[index] = url;
        return temp;
      });
    }
  };

  const handleDeleteImage = (index: number) => {
    setPreviews((prev) => {
      const temp = [...prev];
      temp[index] = "";
      return temp;
    });
  };

  return { previews, handleChangeImage, handleDeleteImage };
};

export default useImagePreviews;
