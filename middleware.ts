/**
 * Authentication Middleware
 * 
 * This middleware protects routes and handles authentication redirects.
 * 
 * Protected routes:
 * - /dashboard - Requires authentication
 * - /admin - Requires ADMIN role
 * - /favorites - Requires authentication
 */


import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    const {nextUrl} = req;
    const isLoggedIn = !!req.auth;
    const isAdmin = req.auth?.user?.role === "ADMIN";

    // Define protected routes 
    const isProtectedRoute = 
    nextUrl.pathname.startsWith("/dashboard") ||
    nextUrl.pathname.startsWith("/favorites");

    const isAdminRoute = nextUrl.pathname.startsWith("/admin");
    const isAdminLoginPage = nextUrl.pathname === "/admin/login";

    const isAuthPage =
    nextUrl.pathname.startsWith("/login") || 
    nextUrl.pathname.startsWith("/register");

    // Redirect to login if trying to access that our protected route if this user is not logged in.
    if (isProtectedRoute && !isLoggedIn) {
        const loginUrl = new URL("/login", nextUrl.origin);
        loginUrl.searchParams.set("callbackUrl",nextUrl.pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Allow access to admin login page.



});