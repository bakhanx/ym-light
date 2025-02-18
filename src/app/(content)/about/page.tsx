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

        <div className="Image-list z-20 mx-auto max-w-screen-xl py-10 sm:py-28">
          <div className="grid grid-cols-1 gap-4 px-2 sm:grid-cols-3 sm:gap-20 sm:px-4">
            {["worker-07", "tools", "worker-00"].map((img, idx) => (
              <div key={idx} className="relative aspect-square">
                <Image
                  src={`/images/${img}.jpg`}
                  alt={img}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
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
