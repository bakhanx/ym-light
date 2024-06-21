import Image from "next/image";
import Spinner from "../../public/loaders/Spin-1s-200px.svg";

export default function Loader() {
  return (
    <>
      <div className="flex h-full w-full items-center justify-center">
        <Image src={Spinner} priority={true} alt="" width={80} height={80}/>
      </div>
    </>
  );
}
