import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
export { default } from "next-auth/middleware"

export async function proxy(request) {
    const pathname = request.nextUrl.pathname.replace(/\/$/, '');
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    const authPages = ['/login', '/register'];
    const protectedRoutes = ['/products', '/cart', '/allorders', '/payment', '/brands', '/categories'];

    console.log('Request URL:', request.url);

    // 1️⃣ Redirect logged-in users away from login/register
    if (token && authPages.includes(pathname)) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // 2️⃣ Redirect unauthenticated users trying to access protected routes
    if (!token) {
        const isProtected = protectedRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`));
        if (isProtected) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/products/:path*',
        '/cart',
        '/allorders',
        '/payment',
        '/brands',
        '/categories',
        '/login',
        '/register',
    ],
};
