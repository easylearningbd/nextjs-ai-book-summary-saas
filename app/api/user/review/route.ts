import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const reviewSchema = z.object({
    bookId: z.number().positive(),
    rating: z.number().min(1).max(5),
    comment: z.string().min(10).max(1000),
});

export async function POST(request: NextRequest){
    try {
        

        const session = await auth();

         if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, {status: 401});
        }

    const body = await request.json(); 
   // console.log("Rewiew submission data", body);

   const validation = reviewSchema.safeParse(body);

   if (!validation.success) {
    const errorMessages = validation.error.issues.map(issue => `${issue.path.join('.') }: ${issue.message}`).join(', ');
    console.error("Validation errors:", validation.error.issues);
    return NextResponse.json(
        {error: `Invalida requeset: ${errorMessages}`, details: validation.error.issues }, 
        {status: 400}
    );
   }

   const { bookId, rating, comment } = validation.data;

   // CHeck if book exists 
   const book = await prisma.book.findFirst({
    where: {
        id: bookId,
        isPublished: true,
    },
   });

   if (!book) {
    return NextResponse.json({error: "Book not found"}, {status: 404});
   }

   /// Check if user alrady reviewd this book. 




    } catch (error) {
        
    }
}
