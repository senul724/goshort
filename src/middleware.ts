import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { redis } from "./server/redis";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log(path);
  const session = request.cookies.get("next-auth.session-token");
  if (path === "/" && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (path === "/dashboard" && !session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const reqRoute = path.split("/")[1];
  if (reqRoute && reqRoute !== "dashboard") {
    console.log(reqRoute);
    const realPath = await redis.get(reqRoute);
    if (realPath) {
      return NextResponse.redirect(realPath as string);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/"],
};
