import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware"; // Ensures next-auth middleware is used

export const config = {
    matcher: ['/dashboard/:path*', '/sign-in', '/sign-up', '/', '/verify/:path*'],
};

export async function middleware(request) {
    const token = await getToken({ req: request });
    const url = request.nextUrl;  

    // If token exists, redirect from auth pages to dashboard
    if (
        token &&
        (url.pathname.startsWith('/sign-in') ||
            url.pathname.startsWith('/sign-up') ||
            url.pathname.startsWith('/verify') ||
            url.pathname === '/')
    ) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // If no token, prevent access to dashboard and redirect to sign-in
    if (!token && url.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    // Proceed to the next middleware or endpoint if conditions are not met
    return NextResponse.next();
}
