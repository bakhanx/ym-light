import Loader from "@/components/loader";
import React from "react";

const Loading = () => {
  return (
    <div className="fixed bottom-10 right-10 z-50 flex h-96 w-96 flex-col items-center justify-center rounded-lg border-4 border-amber-300 bg-white p-5">
      <Loader />
      채팅방 입장중...
    </div>
  );
};

export default Loading;
