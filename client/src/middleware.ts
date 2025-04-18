import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import store from './app/store/store';
import { setUser } from './app/store/slices/authSlices';
import { ReduxInitializer } from './app/providers';

export async function middleware(req: NextRequest) {

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET, });

    if (token) {
        const userData = {
            id: token.id,
            email: token.email,
            name: token.name,
            role: token.role,
        };

        const res = NextResponse.next();
        res.cookies.set('x-user-data', encodeURIComponent(JSON.stringify(userData)), {
            path: '/',
            httpOnly: false,   // Important: You want to read it in client-side JavaScript
            sameSite: 'lax',
        });
        return res;
    }

    return NextResponse.next();
}

// Important: Add this if you only want to run middleware for certain pages
export const config = {
    matcher: ['/', '/dashboard/:path*', '/profile/:path*'], // or remove to apply globally
};
