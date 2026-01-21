import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextRequest,NextResponse } from "next/server";
import { z } from "zod";
 

export async function GET(
    request: NextRequest,
    { params } : { params: Promise<{ id: string} > }
) {
    try {
        
        const session = await auth();

        if (!session?.user || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized"}, { status: 401});
        }

        const { id } = await params;
        const category = await prisma.category.findUnique({
            where: {id: parseInt(id)},
            include: {
                _count: {
                    select: {
                        books: true,
                    },
                },
            },
        });

        return NextResponse.json(category);

    } catch (error) {
        console.error("Error fetching category",error);
    }
}

 