import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { LinearClient } from "@linear/sdk";

const linearClient = new LinearClient({
  apiKey: process.env.LINEAR_API_KEY,
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
        createdAt: "desc",
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
    const teams = await linearClient.teams();
    const issue = await linearClient.createIssue({
      title: title,
      description: description,
      teamId: teams.nodes[0].id,
    });

    // @ts-expect-error - Linear SDK type issue
    const issueId = issue._issue.id;
    const request = await prisma.request.create({
      data: {
        title,
        category,
        description,
        companyId: orgId,
        userId,
        linearIssueId: issueId,
      },
      include: {
        company: true,
        user: true,
      },
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
