/**
 * Next.js Middleware
 * 
 * Authentication is now handled client-side with @auth0/auth0-react.
 * Protected routes are handled by the AuthGuard component.
 * This middleware is minimal and just handles basic routing.
 */
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Let all requests through - auth is handled client-side
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
