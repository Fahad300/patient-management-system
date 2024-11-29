import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth_token')?.value;

  // Auth pages are accessible only when not logged in
  const authPages = ['/login', '/signup', '/forgot-password'];
  const isAuthPage = authPages.some(page => pathname.startsWith(page));

  if (isAuthPage) {
    if (token) {
      // If user is logged in, redirect to dashboard
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // Protected routes require authentication
  if (!token) {
    // Save the attempted URL to redirect after login
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Auth pages
    '/login',
    '/signup',
    '/forgot-password',
    // Protected routes
    '/dashboard/:path*',
    '/patients/:path*',
    '/appointments/:path*',
    '/settings/:path*',
  ],
}; 