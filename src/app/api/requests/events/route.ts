import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

const clients = new Set<ReadableStreamDefaultController>();

export async function GET(req: NextRequest) {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { signal } = req;

  // const requests = await prisma.request.all

  const stream = new ReadableStream({
    async start(controller) {
      let closed = false;
      clients.add(controller);
      console.log("SSE client connected. Total clients:", clients.size);
      const sendEvent = async () => {
        if (!closed) {
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
          controller.enqueue(
            `data: ${JSON.stringify({
              type: "request_updated",
              data: requests,
            })}\n\n`
          );
        }
      };
      await sendEvent();
      const intervalId = setInterval(sendEvent, 3000);
      signal.addEventListener("abort", () => {
        closed = true;
        clearInterval(intervalId);
        controller.close();
        clients.delete(controller);
        console.log(
          "Client disconnected, stream closed. Total clients:",
          clients.size
        );
      });
    },
    cancel(controller) {
      clients.delete(controller);
      console.log(
        "Client cancelled, removed from set. Total clients:",
        clients.size
      );
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
