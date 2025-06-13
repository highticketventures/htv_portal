import { NextRequest, NextResponse } from "next/server";
import {
  LinearWebhooks,
  LINEAR_WEBHOOK_SIGNATURE_HEADER,
  LINEAR_WEBHOOK_TS_FIELD,
} from "@linear/sdk";
import prisma from "@/lib/prisma";

const webhook = new LinearWebhooks(process.env.LINEAR_WEBHOOK_SECRET as string);

function mapLinearStateToRequestStatus(stateType: string): string {
  switch (stateType.toLowerCase()) {
    case "backlog":
    case "unstarted":
      return "Submitted";
    case "started":
      return "In Progress";
    case "completed":
      return "Completed";
    case "canceled":
      return "Submitted";
    default:
      return "Submitted";
  }
}

interface LinearWebhookData {
  id: string;
  title: string;
  description: string;
  state?: {
    type: string;
  };
}

async function handleLinearAction(action: string, data: LinearWebhookData) {
  const { id, title, description, state } = data;

  switch (action) {
    case "create":
      console.log(
        "Create action received, skipping as it's handled in request creation"
      );
      break;

    case "update":
      if (!id) {
        throw new Error("Missing issue ID for update action");
      }
      await prisma.request.update({
        where: { linearIssueId: id },
        data: {
          title,
          description,
          status: state ? mapLinearStateToRequestStatus(state.type) : undefined,
        },
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });

      console.log("Broadcast complete");
      break;

    case "remove":
      if (!id) {
        throw new Error("Missing issue ID for remove action");
      }
      await prisma.request.delete({
        where: { linearIssueId: id },
      });

      break;

    case "sync":
      console.log("Sync action received, no action taken");
      break;

    default:
      console.log(`Unhandled action type: ${action}`);
      break;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();

    const signature = req.headers.get(LINEAR_WEBHOOK_SIGNATURE_HEADER);
    const timestamp = JSON.parse(body)[LINEAR_WEBHOOK_TS_FIELD];

    if (!signature || !timestamp) {
      return NextResponse.json(
        { error: "Missing required webhook headers" },
        { status: 400 }
      );
    }

    try {
      webhook.verify(Buffer.from(body), signature, timestamp);
    } catch (error) {
      console.error("Webhook verification failed:", error);
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 401 }
      );
    }

    const payload = JSON.parse(body);
    console.log("Received Linear webhook:", {
      action: payload.action,
      type: payload.type,
      issueId: payload.data?.id,
    });

    try {
      await handleLinearAction(payload.action, payload.data);
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error("Error handling Linear action:", error);
      return NextResponse.json(
        { error: "Failed to process Linear action" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 }
    );
  }
}
