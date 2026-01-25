import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest){

    try {
        
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized"}, { status: 401});
        }

    const { bookId } = await request.json();

    if (!bookId) {
        return NextResponse.json({error: "Book Id is required"}, {status:401});
    }

    // Get book and summary 
    const book = await prisma.book.findUnique({
        where: {id: bookId},
        include: {
            summary: true,
            chapters: {
                orderBy: {chapterNumber: "asc"},
            },
        },
    });

     if (!book) {
        return NextResponse.json({error: "Book not found"}, {status:404});
    }

    if (!book.summary) {
        return NextResponse.json({error: "Please generate summary first"}, {status:400});
    }

    // Create upload direactor if its does not exist 
    const uploadDir = join(process.cwd(), "public", "uploads", "audio");
    if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true});
    }

    // Create a readable stream 
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
        async start(controller) {
            const sendMessage = (message: string) => {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ message })}\n\n`));
            };

    try {
        sendMessage("Staring audio generation...");
        let totalDuration = 0;

        // generate audio for each chapter 

        


    } catch (error) {
        
    }







        }
    })





    } catch (error) {
        
    }




}