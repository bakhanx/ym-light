import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import React from "react";

type SessionType = {
  id: number;
};

console.log("PW", process.env.COOKIE_PASSWORD!);

const getSession = () => {
  return getIronSession<SessionType>(cookies(), {
    cookieName: "ymlight-cookie",
    password: process.env.COOKIE_PASSWORD!,
  });
};

export default getSession;
