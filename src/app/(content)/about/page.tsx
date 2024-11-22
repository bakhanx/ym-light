import workerImg02 from "/public/images/worker-02.jpg";
import workerImg01 from "/public/images/worker-01.jpg";
import Image03 from "/public/images/worker-07.jpg";
import Image04 from "/public/images/tools.jpg";
import Image05 from "/public/images/worker-00.jpg";
import Image from "next/image";
import { BLUR_DATA_WORKER_01 } from "../../../../public/images/base64/blur-worker-01";
import { BLUR_DATA_WORKER_02 } from "../../../../public/images/base64/blur-worker-02";

const About = () => {
  return (
    <>
      <div className="bg-black">
        <div className="Image-wrap relative h-screen w-full">
          <div className="absolute z-10 h-full w-full bg-black opacity-50" />
          <Image
            src={workerImg02}
            alt="worker02"
            fill
            placeholder="blur"
            sizes="1"
            className="object-cover"
            blurDataURL={BLUR_DATA_WORKER_02}
          />

          <div className="Paragraph-wrap absolute z-20 flex h-full w-full items-center justify-center">
            <p className="animate-pulse pt-20 text-2xl font-bold text-white">
              장인의 가치가 빛으로 실현되는 곳
            </p>
          </div>
        </div>

        <div className="Image-list z-20  mx-auto flex max-w-screen-xl justify-center py-10 sm:py-28">
          <div className="flex w-full gap-x-4 px-2 sm:gap-x-20 sm:px-4 [&>div]:w-1/3">
            <div className="relative aspect-square sm:w-[320px]">
              <Image
                src={Image03}
                alt="worker07"
                fill
                sizes="1"
                className="object-cover"
              />
            </div>

            <div className="relative aspect-square  sm:w-[320px]">
              <Image
                src={Image04}
                alt="tools"
                fill
                sizes="1"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square  sm:w-[320px]">
              <Image
                src={Image05}
                alt="worker"
                fill
                sizes="1"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <Image
          src={workerImg01}
          alt="worker01"
          placeholder="blur"
          sizes="1"
          className="object-cover"
          blurDataURL={BLUR_DATA_WORKER_01}
        />
      </div>
    </>
  );
};

export default About;
