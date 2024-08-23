import Loader from "@/components/loader";
import React from "react";

const Loading = () => {
  return (
    <div className="fixed bottom-10 right-10 ">
      <Loader />
    </div>
  );
};

export default Loading;
