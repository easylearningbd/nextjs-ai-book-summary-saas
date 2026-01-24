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
    const summaryCompletion = await openai.chat.completions.create({
        model: "gpt-4", 
        messages: [
            {
                role: "system",
                content: "You are a professional book summarizer. Create concise, engaging summaries that capture the key insights and main ideas of books.",
              },
              {
                role: "user",
                content: `Create a comprehensive summary for the following book:

Title: ${book.title}
Author: ${book.author}

Book Content:
${pdfText}

Please provide:
1. A main summary (150-200 words) that captures the essence of the book
2. 5-7 key takeaways (bullet points)
3. Target audience
4. Main themes`,
              },
            
            ],
            temperature: 0.7,
            max_tokens: 1000,
    });

    const summaryText = summaryCompletion.choices[0].message.content || "";
    sendMessage("Generating table of contents...");

    // Generate table of contents 

    const tocCompletion = await openai.chat.completions.create({
        model: "gpt-4",
        messages:[
            {
                role: "system",
                content: "You are creating a table of contents for a book summary. Return ONLY a JSON array.",
              },
              {
                role: "user",
                content: `Create a table of contents (chapter list) for "${book.title}" by ${book.author}.
                Return ONLY a JSON array of objects with this structure: [{"chapterNumber": 1, "title": "Chapter Title", "description": "Brief description"}]
                Create 8-12 logical chapters.`,
              },  
        ],
        temperature: 0.7,
        max_tokens: 800,
    });

    let tableOfContents = [];
    try {
        const tocText = tocCompletion.choices[0].message.content || "[]";
        tableOfContents = JSON.parse(tocText);
    } catch (e) {
        console.error("Failed to parse toc", e);
        tableOfContents = [
            { chapterNumber: 1, title: "Introduction", description: "Overview of the book" },
            { chapterNumber: 2, title: "Main Content", description: "Key concepts and ideas" },
            { chapterNumber: 3, title: "Conclusion", description: "Final thoughts and takeaways" },
        ];
    }

    sendMessage("Generating details chapter summaries...");

    // Generate details in 150 word summary for each chapter 

        
    } catch (error) {
        
    }





        }
    })
    



        
    } catch (error) {
        
    }
}