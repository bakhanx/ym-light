import { useState } from "react";

const MAX_COUNT = 3;
const initial_previews = [...Array(MAX_COUNT).fill(null)];

const useImagePreviews = (initialImages = initial_previews) => {
  const [previews, setPreviews] = useState(() => {
    const filledImages = [
      ...initialImages.slice(0, MAX_COUNT),
      ...Array(Math.max(0, MAX_COUNT - initialImages.length)).fill(null),
    ];
    return filledImages.map((url) => (url ? `${url}/w=200` : null));
  }); // cf image url 전처리

  const handleChangeImage = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const {
      target: { files, id },
    } = event;
    event.preventDefault();

    if (files && files[0]) {
      const index = previews.findIndex((preview) => preview === null);
      if (index !== -1) {
        const file = files[0];
        const url = URL.createObjectURL(file);

        setPreviews((prev) => {
          const temp = [...prev];
          temp[index] = url;
          return temp;
        });
      }
    }
  };

  const handleDeleteImage = (index: number) => {
    setPreviews((prev) => {
      const temp = [...prev];
      for (let i = index; i < temp.length - 1; i++) {
        temp[i] = temp[i + 1];
      }
      temp[temp.length - 1] = null;
      return temp;
    });
  };

  return { previews, handleChangeImage, handleDeleteImage };
};

export default useImagePreviews;
