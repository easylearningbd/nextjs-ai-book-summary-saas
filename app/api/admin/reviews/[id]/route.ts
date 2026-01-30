import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma"; 
import { NextRequest,NextResponse } from "next/server";
import { z } from "zod";

const reviewUpdateSchema = z.object({
    isApproved: z.boolean(),
});

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        
        const session = await auth();

        if (!session?.user || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized"}, { status: 401});
        } 



    } catch (error) {
        
    }





}