import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export function middleware(req: NextRequest) {
  const token = getToken({ req });

  if (!token) {
    if (req.nextUrl.pathname.startsWith("/api")) {
      return new NextResponse("Authentication Error", { status: 401 });
    }

    const { origin, pathname, basePath, search } = req.nextUrl;

    const signInUrl = new URL(`${basePath}/auth/signin`, origin);
    signInUrl.searchParams.append(
      "callbackUrl",
      `${basePath}${pathname}${search}`
    );

    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
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
