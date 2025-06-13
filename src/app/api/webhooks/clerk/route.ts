import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

type WebhookEvent = {
  type: string;
  data: {
    id: string;
    email_addresses?: Array<{ email_address: string }>;
    first_name?: string;
    last_name?: string;
    name?: string;
    organization?: {
      id: string;
      name: string;
      slug?: string;
    };
    public_user_data?: {
      user_id: string;
    };
    role?: string;
  };
};

const getUserData = (data: WebhookEvent["data"]) => {
  const email = data.email_addresses?.[0]?.email_address;
  if (!email) {
    throw new Error("User email is required");
  }

  return {
    email,
    name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
    firstName: data.first_name,
    lastName: data.last_name,
  };
};

const isHtvInternal = (orgName?: string, orgSlug?: string) =>
  orgName === "HTV" || orgSlug === "htv";

const handleError = (error: unknown, message: string) => {
  console.error(`${message}:`, error);
  return NextResponse.json({ error: message }, { status: 500 });
};

export async function POST(req: NextRequest) {
  try {
    const evt = (await verifyWebhook(req)) as WebhookEvent;

    switch (evt.type) {
      case "user.created": {
        const userData = getUserData(evt.data);
        await prisma.user.create({
          data: {
            id: evt.data.id,
            ...userData,
          },
        });
        break;
      }

      case "user.updated": {
        const userData = getUserData(evt.data);
        await prisma.user.update({
          where: { id: evt.data.id },
          data: userData,
        });
        break;
      }

      case "user.deleted": {
        await prisma.user.delete({
          where: { id: evt.data.id },
        });
        break;
      }

      case "organization.created": {
        if (!evt.data.name) {
          throw new Error("Organization name is required");
        }

        await prisma.company.create({
          data: {
            id: evt.data.id,
            name: evt.data.name,
            isHtvInternal: isHtvInternal(
              evt.data.name,
              evt.data.organization?.slug
            ),
          },
        });
        break;
      }

      case "organization.updated": {
        if (!evt.data.name) {
          throw new Error("Organization name is required");
        }

        await prisma.company.update({
          where: { id: evt.data.id },
          data: {
            name: evt.data.name,
            isHtvInternal: isHtvInternal(
              evt.data.name,
              evt.data.organization?.slug
            ),
          },
        });
        break;
      }

      case "organization.deleted": {
        await prisma.company.delete({
          where: { id: evt.data.id },
        });
        break;
      }

      case "organizationMembership.created": {
        if (
          !evt.data.organization?.id ||
          !evt.data.public_user_data?.user_id ||
          !evt.data.role
        ) {
          throw new Error("Missing required membership data");
        }

        await prisma.companyUser.create({
          data: {
            companyId: evt.data.organization.id,
            userId: evt.data.public_user_data.user_id,
            role: evt.data.role.toLowerCase(),
          },
        });
        break;
      }

      case "organizationMembership.updated": {
        if (
          !evt.data.organization?.id ||
          !evt.data.public_user_data?.user_id ||
          !evt.data.role
        ) {
          throw new Error("Missing required membership data");
        }

        await prisma.companyUser.update({
          where: {
            userId_companyId: {
              userId: evt.data.public_user_data.user_id,
              companyId: evt.data.organization.id,
            },
          },
          data: {
            role: evt.data.role.toLowerCase(),
          },
        });
        break;
      }

      case "organizationMembership.deleted": {
        if (!evt.data.organization?.id || !evt.data.public_user_data?.user_id) {
          throw new Error("Missing required membership data");
        }

        await prisma.companyUser.delete({
          where: {
            userId_companyId: {
              userId: evt.data.public_user_data.user_id,
              companyId: evt.data.organization.id,
            },
          },
        });
        break;
      }

      default:
        console.warn(`Unhandled webhook event type: ${evt.type}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleError(error, "Failed to process webhook");
  }
}
