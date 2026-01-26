import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        const searchParams = request.nextUrl.searchParams;
        const search = searchParams.get("search") || "";
        const category = searchParams.get("category") || "";
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "12");
        const skip = (page - 1) * limit;

        const where: any = {
            isPublished: true,
        };

        if (search) {
            where.OR = [
                { title: { contains: search, mode: "insensitive" } },
                { author: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
            ];            
        }

        if (category) {
            where.categoryId = parseInt(category);
        }

    // Fetch books data with pagination 
    


    } catch (error) {
        
    }
}