"use client";

import { useChatStore } from "@/store/useChatStore";
import { XMarkIcon } from "@heroicons/react/16/solid";
import React from "react";

const CloseButton = () => {
  const setIsChatVisible = useChatStore((state) => state.setIsChatVisible);
  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsChatVisible(false);
  };
  return (
    <button onClick={handleClose}>
      <XMarkIcon className="size-6" />
    </button>
  );
};

export default CloseButton;
