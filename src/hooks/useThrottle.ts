import React, { useRef } from "react";

const useThrottle = (callback: VoidFunction, delay = 1000) => {
  const lastRun = useRef(Date.now());
  return () => {
    const timeElapsed = Date.now() - lastRun.current;
    if (timeElapsed > delay) {
      callback();
      lastRun.current = Date.now();
    }
  };
};

export default useThrottle;
