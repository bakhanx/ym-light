'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";


// 클라이언트 측에서 스크롤 위치를 최상단으로 이동
// 서버 컴포넌트에서 useEffect를 사용할 수 없을 때, <ScrollTop/>을 import

const ScrollTop = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };

    const handlePopState = ()=>{
        handleRouteChange();
    }

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [router]);

  return null;
};

export default ScrollTop;