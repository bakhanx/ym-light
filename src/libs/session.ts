import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import React from "react";

type SessionType = {
  id: number;
};

const getSession = () => {
  return getIronSession<SessionType>(cookies(), {
    cookieName: "ymlight-cookie",
    password: process.env.COOKIE_PASSWORD!,
  });
};

export default getSession;
