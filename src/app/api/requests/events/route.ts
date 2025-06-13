import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";

const clients = new Set<ReadableStreamDefaultController>();

// Define a type for the broadcast update data
export type BroadcastUpdateData = {
  type: string;
  data?: unknown;
};

export async function GET(req: NextRequest) {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { signal } = req;

  const stream = new ReadableStream({
    async start(controller) {
      let closed = false;
      clients.add(controller);
      console.log("SSE client connected. Total clients:", clients.size);
      const sendEvent = async () => {
        if (!closed) {
          controller.enqueue(new TextEncoder().encode(": connected\n\n"));
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

export function broadcastUpdate(data: BroadcastUpdateData) {
  console.log("Broadcasting update to", clients.size, "clients. Data:", data);
  const message = `data: ${JSON.stringify(data)}\n\n`;
  clients.forEach((client) => {
    client.enqueue(new TextEncoder().encode(message));
  });
}
