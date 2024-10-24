"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// 클라이언트 측에서 스크롤 위치를 최상단으로 이동
// 서버 컴포넌트에서 useEffect를 사용할 수 없을 때, <ScrollTop/>을 import

const ScrollTop = () => {
  const router = useRouter();

  // 페이지새로고침, 페이지떠날때
  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };

    const handlePopState = () => {
      handleRouteChange();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);

  // 브라우저 뒤로가기 할때
  useEffect(() => {
    window.onbeforeunload = () => {
      window.scrollTo(0, 0);
    };
  }, []);

  return null;
};

export default ScrollTop;
