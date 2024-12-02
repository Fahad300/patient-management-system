import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Skip middleware in development mode
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth_token')?.value;

  // Auth pages are accessible only when not logged in
  const isAuthPage = pathname.startsWith('/(auth)') || pathname === '/';

  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // Protected routes require authentication
  if (!token) {
    const redirectUrl = new URL('/', request.url);
    redirectUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/(auth)/:path*',
    '/(dashboard)/:path*',
    '/profile',
    '/profile/:path*',
    '/settings',
    '/settings/:path*',
  ],
}; 