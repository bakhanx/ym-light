import { NextRequest, NextResponse } from "next/server";
import getSession from "./utils/session";

const publicPaths = new Set(["/login", "/register"]);
const privatePaths = new Set(["/profile", "/manage"]);
const adminPaths = "/manage"

const middleware = async (req: NextRequest) => {
  const session = await getSession();
  const isPublicPath = publicPaths.has(req.nextUrl.pathname);
  const isPrivatePath = privatePaths.has(req.nextUrl.pathname);
  const isAdminPath = req.nextUrl.pathname.startsWith(adminPaths);

  // 비로그인 유저 접근 제한
  if (!session.id && isPrivatePath) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  // 로그인 유저 접근 제한
  else if (session.id && isPublicPath) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  // 관리자 페이지 접근 제한
  if(session.id !== 1 && isAdminPath) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 강제 리디렉션
  if(req.nextUrl.pathname === "/my"){
    return NextResponse.redirect(new URL("/my/home", req.url))
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export default middleware;
