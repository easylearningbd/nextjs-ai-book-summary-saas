
import { NextRequest , NextResponse} from "next/server";
import { prisma } from "@/lib/db/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

// Validation schema 
const registerSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 charachters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 charachters"),
});

export async function POST(request:NextRequest){
    try {
        const body = await request.json();
        // Validate input
        const validatedData = registerSchema.parse(body);

        // Check if user already exists 
        const existingUser = await prisma.user.findUnique({
            where: {
                email: validatedData.email,
            },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User with this email already exists"},
                { status: 400 }
            );
        }

        // Hash Password 


        
    } catch (error) {
        
    }
}