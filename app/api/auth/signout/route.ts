import { signOut } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
    try {
        // Clear the session cookie 
        const cookieStore = await cookies();

        // Delete all auth- related cookies 
        cookieStore.getAll().forEach((cookie) => {
            if (cookie.name.startsWith('authjs') || cookie.name.startsWith('next-auth')) {
                cookieStore.delete(cookie.name);
            }
        });


    } catch (error) {
        
    }
}