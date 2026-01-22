import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs"; 

export async function POST(request: NextRequest){
    try {
        const session = await auth();

        const formData = await request.formData();
        const file = formData.get("file") as File;
        const type = formData.get("type") as string;
    
        if (type === "payment_proof") {
            if (!session?.user) {
                return NextResponse.json({ error: "Unauthorized" }, {status:401});
            } 
        } else {
            // for cover and pdf must be admin
            if (!session?.user || session.user.role !== "ADMIN") {
                return NextResponse.json({ error: "Unauthorized" }, {status:401});
            }
        }

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, {status:400});
        }


    } catch (error) {
        
    }


}

