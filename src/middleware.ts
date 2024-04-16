import { NextRequest, NextResponse } from "next/server";
import React from "react";
import getSession from "./libs/session";

const middleware = async (req: NextRequest) => {
  const session = await getSession();

  if (req.nextUrl.pathname === "/profile") {
    if (!session.id) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
};

export default middleware;
