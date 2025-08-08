import { NextRequest, NextResponse } from 'next/server';
import { config as configs } from '@/configs';
import { APP_ROUTES, AUTH_SESS_ID_NAME, authRoutes, pathRoutes } from '@/utils/constants';
import { cookies } from 'next/headers';

const allowedOrigins: string[] = configs.accessDomain;

const corsOptions = {
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-csrf-token, Accept'
};

export default async function middleware(request: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = request.nextUrl.pathname;
  const isProtectedRoute = pathRoutes.protectedRoutes.includes(path);
  // 3. Decrypt the session from the cookie
  const sessionId = (await cookies()).get(AUTH_SESS_ID_NAME)?.value;
  // 4. Redirect to /signin if the user is not authenticated
  if (isProtectedRoute && !sessionId) {
    return NextResponse.redirect(new URL(APP_ROUTES.SIGN_IN, request.nextUrl));
  }
  // 5. Redirect to / if the user is authenticated and access the sign in/sign up route
  if (sessionId && authRoutes.includes(path)) {
    return NextResponse.redirect(new URL(APP_ROUTES.HOME, request.nextUrl));
  }

  // Check the origin from the request
  const origin = request.headers.get('origin') ?? '';
  const isAllowedOrigin = allowedOrigins.includes(origin);

  // Handle preflighted requests
  const isPreflight = request.method === 'OPTIONS';

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
      ...corsOptions
    };
    return NextResponse.json({}, { headers: preflightHeaders });
  }

  // Handle simple requests
  const response = NextResponse.next();

  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
  ]
};