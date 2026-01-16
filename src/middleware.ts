import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Public routes that don't require authentication
        const publicRoutes = [
          '/',
          '/login',
          '/register',
          '/forgot-password',
          '/reset-password',
          '/api/auth',
        ];

        // Check if the path starts with any public route
        const isPublicRoute = publicRoutes.some(
          (route) =>
            pathname === route ||
            pathname.startsWith(route + '/') ||
            pathname.startsWith('/api/auth')
        );

        // Allow public routes without token
        if (isPublicRoute) {
          return true;
        }

        // Require token for all other routes
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.svg$).*)',
  ],
};
