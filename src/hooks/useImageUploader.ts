import getUploadUrl from "@/app/(admin)/actions/getUploadUrl";
import { useState } from "react";

const useImageUploader = () => {
  const [previews, setPreviews] = useState(["", "", "", ""]);
  const [uploadUrl, setUploadUrl] = useState("");
  const [photoId, setPhotoId] = useState("");

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

      const { result, success } = await getUploadUrl();
      if (success) {
        const { id: cfUrlId, uploadURL:cfUrl } = result;
        setPhotoId(cfUrlId);
        console.log(cfUrl);
        setUploadUrl(cfUrl);
      }
    }
  };

  const handleDeleteImage = (index: number) => {
    setPreviews((prev) => {
      const temp = [...prev];
      temp[index] = "";
      return temp;
    });
  };

  return { previews, handleChangeImage, handleDeleteImage, uploadUrl, photoId };
};

export default useImageUploader;