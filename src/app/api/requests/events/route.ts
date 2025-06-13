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
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
    "X-Accel-Buffering": "no", // Disable proxy buffering
  });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
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
        const data = `data: ${JSON.stringify({ data: requests })}\n\n`;
        controller.enqueue(encoder.encode(data));

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

            const updateData = `data: ${JSON.stringify({
              data: updatedRequests,
            })}\n\n`;
            controller.enqueue(encoder.encode(updateData));
          } catch (error) {
            console.error("Error polling requests:", error);
            const errorData = `data: ${JSON.stringify({
              error: "Failed to fetch updates",
            })}\n\n`;
            controller.enqueue(encoder.encode(errorData));
          }
        }, 5000); // Poll every 5 seconds

        // Clean up on connection close
        req.signal.addEventListener("abort", () => {
          clearInterval(pollInterval);
          controller.close();
        });
      } catch (error) {
        console.error("Error in SSE stream:", error);
        const errorData = `data: ${JSON.stringify({
          error: "Internal server error",
        })}\n\n`;
        controller.enqueue(encoder.encode(errorData));
        controller.close();
      }
    },
  });

  return new Response(stream, { headers });
}
