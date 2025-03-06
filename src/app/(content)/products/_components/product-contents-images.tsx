import Image from "next/image";
import { cls } from "@/utils/cls";

interface ProductImagesProps {
  photos: string[];
  mainImage: string;
  selectedThumbnail: number;
  onSelectImage: (photo: string, index: number) => void;
}

const ProductImages = ({ photos, mainImage, selectedThumbnail, onSelectImage }: ProductImagesProps) => {
  return (
    <div className="my-column-left pb-4 sm:w-[50%] sm:pr-10">
      <div className="my-column-box">
        <div className="my-banner-image">
          <div className="relative aspect-square bg-slate-500">
            <Image src={`${mainImage}/sharpen=1,fit=scale-down,w=640`} fill alt="main" sizes="1" priority className="object-cover" />
          </div>
        </div>
        <div className="my-banner-func flex justify-center pt-5">
          <div className="flex w-full justify-center gap-2">
            {photos.map((photo, index) => (
              <div
                key={index}
                className={cls(selectedThumbnail === index ? "border-blue-500" : "border-gray-300", "relative aspect-square w-[33%] cursor-pointer border-2")}
                onClick={() => onSelectImage(photo, index)}
              >
                <Image src={`${photo}/sharpen=1,fit=scale-down,w=200`} fill sizes="1" alt={`추가사진${index}`} className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImages;
