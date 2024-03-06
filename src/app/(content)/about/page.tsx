import Image01 from "@/../public/images/worker-02-lg.jpg";
import Image02 from "@/../public/images/worker-01-lg.jpg";
import Image03 from "@/../public/images/worker-07.jpg";
import Image04 from "@/../public/images/tools-lg.jpg";
import Image05 from "@/../public/images/worker-lg.jpg";
import Image from "next/image";

const About = () => {
  return (
    <>
      <div className="">
        <div className="Image-wrap relative h-screen w-full">
          <div className="absolute z-10 h-full w-full bg-black opacity-50" />
          <Image src={Image01} alt="worker01" fill objectFit="cover" />

          <div className="Paragraph-wrap absolute z-20 flex h-full w-full items-center justify-center">
            <p className="text-2xl pt-20 font-bold text-white animate-pulse">
              장인의 가치가 빛으로 실현되는 곳
            </p>
          </div>
        </div>

        <div className="Image-list z-20  flex w-full justify-center pt-28">
          <div className="flex gap-x-20">
            <div className="relative aspect-square w-[320px]">
              <Image src={Image03} alt="worker07" fill objectFit="cover" />
            </div>
            <div className="relative aspect-square w-[320px]">
              <Image src={Image04} alt="tools" fill objectFit="cover" />
            </div>
            <div className="relative aspect-square w-[320px]">
              <Image src={Image05} alt="worker" fill objectFit="cover" />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-28"></div>

      <div>
        <Image src={Image02} alt="worker02" />
      </div>

    </>
  );
};

export default About;
