"use client";

import { useEffect } from "react";

const PreventScroll = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return null;
};

export default PreventScroll;
