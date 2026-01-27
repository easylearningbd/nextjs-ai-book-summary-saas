import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }>}
) {

    try {
        const { id } = await context.params;
        const session = await auth();

        const book = await prisma.book.findFirst({
            where: {
                id: parseInt(id),
                isPublished: true,
            },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                        icon: true,
                    },
                },
                summary: {
                    select: {
                        id: true,
                        mainSummary: true,
                        keyTakeaways: true,
                        fullSummary: true,
                        tableOfContents: true,
                    },
                },
                chapters: {
                    orderBy: {
                        displayOrder: "asc",
                    },
                    select: {
                        id: true,
                        chapterNumber: true,
                        chapterTitle: true,
                        chapterSummary: true,
                        audioUrl: true,
                        audioDuration: true,
                    },
                },
                reviews: {
                    where: {
                        isApproved: true,
                    },
                    include: {
                        user: {
                            select: {
                                id: true,
                                fullName: true,
                                email: true,
                            },
                        },
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                    take: 10,
                },
                _count: {
                    select: {
                        reviews: true,
                        favorites: true,
                    },
                },
            },
        });


    } catch (error) {
        
    }



}