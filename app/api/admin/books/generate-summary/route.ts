import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { readFile } from "fs/promises";
import { join } from "path";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
    try {

        const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized"}, { status: 401});
        }

    const { bookId } = await request.json();

    if (!bookId) {
        return NextResponse.json({error: "Book Id is required"}, {status:401});
    }

    // Get book details 
    const book = await prisma.book.findUnique({
        where: {id: bookId},
    });

    if (!book) {
        return NextResponse.json({error: "Book not found"}, {status: 404});
    }

    /// Create reaable stream for Server-send events.
    



        
    } catch (error) {
        
    }
}