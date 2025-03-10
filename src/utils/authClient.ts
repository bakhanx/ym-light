"use client";

import { getUserIdFromToken } from "./jwt";

export const getUserIdFromTokenClient = async () => {
  const token = sessionStorage.getItem("jwt_token");

  if (!token) return null;

  try {
    // 서버 액션을 호출하여 userId를 받음
    const userId = await getUserIdFromToken(token);
    return userId;
  } catch (error) {
    console.log("토큰 검증 오류", error);
    return null;
  }
};
