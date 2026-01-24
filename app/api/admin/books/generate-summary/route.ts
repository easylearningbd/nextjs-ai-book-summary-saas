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
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
        async start(conroller) {
            const sendMessage = (message: string) => {
                conroller.enqueue(encoder.encode(`data: ${JSON.stringify({ message })}\n\n`));
            };

    try {

        sendMessage("Starting summary generation...");
        // extract text from pdf
        let pdfText = "";
        if (book.originalPdfPath) {
            sendMessage("Extracting text from PDF...");
            try {
                const pdfParse = require("pdf-parse");
                const pdfPath = join(process.cwd(), "public", book.originalPdfUrl);
                const dataBuffer = await readFile(pdfPath);
                const pdfData = await pdfParse(dataBuffer);
                pdfText = pdfData.text;

        // Limit to first 15000 characters to avoid token limits 
        if (pdfText.length > 15000) {
            pdfText = pdfText.substring(0,15000);            
        }
        sendMessage(`Extracted ${pdfText.length} characters from PDF`);
            } catch (error) {
                console.error("PDF extraction error:", error);
                sendMessage("Warning: Could not extract pdf text using description instead");
                pdfText = book.description || ""; 
            } 
        } else {
            pdfText = book.description || "";
        }
        sendMessage("Sending to CHAT GPT API...");

        // GENERATE MAIN SUMMARY FOR THE BOOK 
        
        
    } catch (error) {
        
    }





        }
    })
    



        
    } catch (error) {
        
    }
}