import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const companyId = searchParams.get("companyId");
  try {
    const requests = await prisma.request.findMany({
      where: companyId ? { companyId } : {},
      include: {
        user: { select: { name: true, email: true } },
        company: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(requests);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch requests: ${error}` },
      { status: 500 }
    );
  }
}
