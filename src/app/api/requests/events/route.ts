import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";


export async function GET(req: NextRequest) {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Set up SSE headers
  const headers = new Headers({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const stream = new ReadableStream({
    async start(controller) {
      // Initial fetch of requests
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

      // Send initial data
      controller.enqueue(`data: ${JSON.stringify({ data: requests })}\n\n`);

      // Set up polling for updates
      const pollInterval = setInterval(async () => {
        try {
          const updatedRequests = await prisma.request.findMany({
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

          controller.enqueue(
            `data: ${JSON.stringify({ data: updatedRequests })}\n\n`
          );
        } catch (error) {
          console.error("Error polling requests:", error);
        }
      }, 5000); // Poll every 5 seconds

      // Clean up on connection close
      req.signal.addEventListener("abort", () => {
        clearInterval(pollInterval);
        controller.close();
      });
    },
  });

  return new Response(stream, { headers });
}
