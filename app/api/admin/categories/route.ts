import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextRequest,NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: NextRequest){
    try {
        const session = await auth();

        if (!session?.user || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized"}, { status: 401});
        }
    const categories = await prisma.category.findMany({
        orderBy: {
            displayOrder: 'asc',
        },
        include: {
            _count: {
                select: {
                    books: true,
                },
            },
        },
    });
    return NextResponse.json(categories);
    } catch (error) {
        console.error("Error fetching categories", error);
        return NextResponse.json(
            {error: "Failed to fetch categories"},
            {status: 500}
        );
    }
}