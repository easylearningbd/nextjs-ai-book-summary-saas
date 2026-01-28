import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const favoriteSchema = z.object({
    bookId: z.number().positive(),
});


/// Post or add data in favorites table 
export async function POST(request: NextRequest){
    try {
        const session = await auth();

         if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, {status: 401});
        }

    const body = await request.json();
    const validation = favoriteSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(
            {error: "Invaild request", details: validation.error.issues},
            {status: 400}
        );
    }

    const {bookId} = validation.data;

    // check book is exists and is published
    const book = await prisma.book.findFirst({
        where: {
            id: bookId,
            isPublished: true
        },
    });
    
    if (!book) {
        return NextResponse.json(
            {error: "Book not found or not published"}, 
            {status: 404}
        );
    }

    // Check if this book already in favorited 
    const existingFavorite = await prisma.userFavorite.findFirst({
        where: {
            userId: session.user.id,
            bookId,
        },
    });

    if (existingFavorite) {
        return NextResponse.json(
            {error: "Book already in favorites"}, 
            {status: 400}
        );
    }

    /// Add this book to favorites 
    const favorite = await prisma.userFavorite.create({
        data: {
            userId: session.user.id,
            bookId,
        },
        include: {
            book: {
                include: {
                    category: true,
                },
            },
        },
    });
    return NextResponse.json(favorite, {status: 201});
    } catch (error) {
        console.error("Error adding favorite", error);
    }

}