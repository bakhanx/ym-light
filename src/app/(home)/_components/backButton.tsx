"use client";

import { XMarkIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import React from "react";

const BackButton = () => {
  const router = useRouter();
  const onCloseClick = () => {
    router.back();
  };
  return (
    <button
      onClick={onCloseClick}
      className="absolute right-5 top-5 text-neutral-200"
    >
      <XMarkIcon className="size-10" />
    </button>
  );
};

export default BackButton;
