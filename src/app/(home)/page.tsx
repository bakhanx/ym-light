import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

const Card = () => {
  return (
    <div className="w-64 h-80 rounded-xl shadow-md bg-blue-300">
      <div className="p-2 space-y-1">
        <div className="h-48 bg-slate-200 rounded-xl">Image</div>
        <div className="flex justify-center items-center h-28 bg-blue-400 rounded-xl">
          text
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div>
      <div className="h-[540px] bg-slate-300">
        <div>Image</div>
      </div>

      <div className="pt-10 w-[1024px] mx-auto">
        <div className="font-bold text-2xl">New Release</div>
        <div className="flex justify-center pt-5">
          <div className="grid grid-cols-4 gap-10 ">
            {Array(8)
              .fill(0)
              .map((e, i) => (
                <div key={i}>
                  <Card />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
