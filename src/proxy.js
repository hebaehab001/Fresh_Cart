import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
export default async function proxy(request) {
    const cookieName=process.env.NODE_ENV=='production'?"__Secure-next-auth.session-token":"next-auth.session-token";
    const pathname = request.nextUrl.pathname.replace(/\/$/, '');
    const token = await getToken({ req: request,cookieName, secret: process.env.NEXTAUTH_SECRET});
    const authPages = ['/login', '/register'];
    const protectedRoutes = ['/products', '/cart', '/allorders', '/payment', '/brands', '/categories'];
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
        '/brands/:path*',
        '/categories/:path*',
        '/login',
        '/register',
    ],
};
