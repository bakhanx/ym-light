"use client";

import { useRouter } from "next/navigation";
import React from "react";

const EnterButton = () => {
  const router = useRouter();
  const handleEnter = () => {
    router.refresh();
  };
  return (
    <div>
      <button
        className="rounded-md border-2 border-amber-400 p-2  text-center "
        onClick={handleEnter}
      >
        자세히보기
      </button>
    </div>
  );
};

export default EnterButton;
