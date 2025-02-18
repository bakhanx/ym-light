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
            src="/images/worker-02.jpg"
            alt="worker02"
            fill
            placeholder="blur"
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
                src="/images/worker-07.jpg"
                alt="worker07"
                fill
                className="object-cover"
              />
            </div>

            <div className="relative aspect-square  sm:w-[320px]">
              <Image
                src="/images/tools.jpg"
                alt="tools"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square  sm:w-[320px]">
              <Image
                src="/images/worker-00.jpg"
                alt="worker"
                fill
                sizes="1"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="relative h-screen w-full">
          <Image
            src="/images/worker-01.jpg"
            alt="worker01"
            placeholder="blur"
            fill
            className="object-cover"
            blurDataURL={BLUR_DATA_WORKER_01}
          />
        </div>
      </div>
    </>
  );
};

export default About;
