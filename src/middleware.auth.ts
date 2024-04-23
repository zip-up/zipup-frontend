import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.has('token');

  if (!isAuthenticated && request.nextUrl.pathname !== '/login')
    return NextResponse.redirect(new URL('/login', request.url));

  if (isAuthenticated && request.nextUrl.pathname === '/login')
    return NextResponse.redirect(new URL('/mypage', request.url));

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/funding/create/:step+',
    '/funding/:id/participate',
    '/funding/:id/payment/:path*',
    '/invite/:id+',
    '/mypage/:path*',
  ],
};
