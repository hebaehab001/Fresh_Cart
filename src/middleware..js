import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(request) {
    const token = await getToken({ req: request });
    const pathname = request.nextUrl.pathname;
    const authpage = ['/login', '/register'];
    const routes = ['/', '/products', '/cart' , '/allorders', '/payment', '/brands', '/categories', '/products/:path*'];

    if (token) {
        if (authpage.includes(pathname)) {
            return NextResponse.redirect(new URL('/', request.url));
        }
        return NextResponse.next();
    } else{ 
        if (routes.includes(pathname)) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        return NextResponse.next();
    }
}

export const config = {
    matcher: ['/', '/products','/allorders', '/cart','/payment', '/brands', '/categories', '/products/:path*', '/login', '/register'],
}