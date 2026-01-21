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
        
    } catch (error) {
        
    }

}