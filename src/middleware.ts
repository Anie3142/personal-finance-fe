/**
 * Next.js Middleware for Authentication
 * Using @auth0/nextjs-auth0 v3.x
 */
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0/edge';

// Routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/accounts',
  '/transactions',
  '/budgets',
  '/goals',
  '/categories',
  '/recurring',
  '/reports',
  '/insights',
  '/export',
  '/settings',
  '/categorize',
];

// Public routes - no auth needed
const publicRoutes = ['/', '/login', '/signup', '/pricing', '/about', '/contact', '/demo'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip auth check for API routes (handled by their own middleware)
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Skip static files
  if (
    pathname.startsWith('/_next/') ||
    pathname.includes('.') ||
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next();
  }

  // Public routes - no auth needed
  if (publicRoutes.some(route => pathname === route)) {
    return NextResponse.next();
  }

  // Check if user is authenticated for protected routes
  const isProtectedRoute = protectedRoutes.some(
    route => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isProtectedRoute) {
    try {
      const res = NextResponse.next();
      const session = await getSession(request, res);
      
      if (!session?.user) {
        // Redirect to login with returnTo
        const loginUrl = new URL('/api/auth/login', request.url);
        loginUrl.searchParams.set('returnTo', pathname);
        return NextResponse.redirect(loginUrl);
      }
    } catch (error) {
      // On error, redirect to login
      const loginUrl = new URL('/api/auth/login', request.url);
      loginUrl.searchParams.set('returnTo', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
