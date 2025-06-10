import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { userId, orgId } = await auth();
  console.log(userId, orgId);
  if (!userId || !orgId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, category, description } = body;
  if (!title || !category || !description) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const request = await prisma.request.create({
      data: {
        title,
        category,
        description,
        companyId: orgId,
        userId,
      },
    });
    return NextResponse.json(request, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create request" },
      { status: 500 }
    );
  }
}
