import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export function middleware(req: NextRequest) {
  const token = getToken({ req });

  if (!token) {
    if (req.nextUrl.pathname.startsWith("/api")) {
      return new NextResponse("Authentication Error", {
        status: 401,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    }

    const { origin, pathname, basePath, search } = req.nextUrl;

    const signInUrl = new URL(`${basePath}/auth/signin`, origin);
    signInUrl.searchParams.append(
      "callbackUrl",
      `${basePath}${pathname}${search}`
    );

    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next({
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export const config = {
  matcher: [
    "/new",
    "/",
    "/api/comments",
    "/api/follow",
    "/api/likes",
    "/api/me",
    "/api/posts/:path*",
  ],
};
