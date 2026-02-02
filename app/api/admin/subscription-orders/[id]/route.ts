import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma"; 
import { NextRequest,NextResponse } from "next/server";
import { z } from "zod";

const approveSchema = z.object({
    action: z.enum(["APPROVED","REJECT"]),
    rejectedReason: z.string().optional(),
    notes: z.string().optional(),
});

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string}>}
) {

    try {

    const session = await auth();
    
    if (!session?.user || session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized"}, { status: 401});
    } 
    
        const { id } = await params;
        const body = await request.json();
    
        // Validation request from body 
        const validation = approveSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                {error: "Invalid request data"},
                { status: 400 }
            );
        }
    
        const data = validation.data;

    // Get the order data from subscription order table 
    const order = await prisma.subscriptionOrder.findUnique({
        where: { id: parseInt(id) },
        include: {
            user: true,
        },
    });

    if (!order) {
        return NextResponse.json({ error: "Oder not found"}, {status: 404});
    }

    if (order.orderStatus !== "PENDING") {
        return NextResponse.json(
            { error: "This order has already been processed"},
            {status: 400}
        );
    }

    if (data.action === "APPROVED") {
        const now = new Date();
        let endDate = null;

        if (order.planType === "MONTHLY") {
            endDate = new Date(now);
            endDate.setMonth(endDate.getMonth() + 1);
        } else if (order.planType === "YEARLY"){
            endDate = new Date(now);
            endDate.setFullYear(endDate.getFullYear() + 1);
        }

        /// Update order status 




    }




        
    } catch (error) {
        
    }


}