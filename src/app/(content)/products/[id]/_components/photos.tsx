import Image from "next/image";

const Photos = ({
  photosWithSize,
}: {
  photosWithSize: { src: string; width: number; height: number }[];
}) => (
  <div className="flex flex-col">
    {photosWithSize.map((photo) => (
      <div
        key={photo.src}
        className="relative flex h-auto w-full justify-center object-contain"
      >
        <Image
          src={photo.src}
          alt={`Product Detail Image`}
          width={photo.width}
          height={photo.height}
          loading="lazy"
        />
      </div>
    ))}
  </div>
);

export default Photos;
