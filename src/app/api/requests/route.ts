import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { LinearClient } from "@linear/sdk";

const linearClient = new LinearClient({
  apiKey: process.env.LINEAR_API_KEY
});

export async function GET(_req: Request) {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const requests = await prisma.request.findMany({
      where: {
        companyId: orgId,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    return NextResponse.json(
      { error: "Failed to fetch requests" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const body = await req.json();
  const { title, category, description } = body;
  if (!title || !category || !description) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    // Create request in database
    const request = await prisma.request.create({
      data: {
        title,
        category,
        description,
        companyId: orgId,
        userId,
      },
      include: {
        company: true,
        user: true
      }
    });

    // Create Linear issue
    const teams = await linearClient.teams()
    await linearClient.createIssue({
      title: `[${request.company.name}] ${title}`,
      description: `**Category:** ${category}\n\n**Description:**\n${description}\n\n**Requested by:** ${request.user.name || request.user.email}\n**Company:** ${request.company.name}\n**Request ID:** ${request.id}`,
      teamId: teams.nodes[0].id,
    });

    return NextResponse.json(request, { status: 201 });
  } catch (error) {
    console.error("Error creating request:", error);
    return NextResponse.json(
      { error: "Failed to create request" },
      { status: 500 }
    );
  }
}
