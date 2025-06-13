import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST(_req: Request) {
  try {
    const { userId, orgId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user data from Clerk
    const clerkUser = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    }).then((res) => res.json());

    // Create or update user in our database
    const user = await prisma.user.upsert({
      where: { id: userId },
      update: {
        email: clerkUser.email_addresses[0].email_address,
        name: `${clerkUser.first_name || ""} ${
          clerkUser.last_name || ""
        }`.trim(),
      },
      create: {
        id: userId,
        email: clerkUser.email_addresses[0].email_address,
        name: `${clerkUser.first_name || ""} ${
          clerkUser.last_name || ""
        }`.trim(),
      },
    });

    // If user is part of an organization
    if (orgId) {
      // Get org data from Clerk
      const [clerkOrg, memberships] = await Promise.all([
        fetch(`https://api.clerk.com/v1/organizations/${orgId}`, {
          headers: {
            Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
          },
        }).then((res) => res.json()),
        fetch(`https://api.clerk.com/v1/organizations/${orgId}/memberships`, {
          headers: {
            Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
          },
        }).then((res) => res.json()),
      ]);

      // Find user's membership
      const membership = Array.isArray(memberships)
        ? memberships.find((m) => m.public_user_data?.user_id === userId)
        : null;

      // Check if org is HTV internal based on domain or other criteria
      const isHtvInternal =
        clerkOrg.domains?.some(
          (d: { name: string }) => d.name === "htv.com" // Replace with your actual domain
        ) || false;

      // Create or update company
      const company = await prisma.company.upsert({
        where: { id: orgId },
        update: {
          name: clerkOrg.name,
          isHtvInternal,
        },
        create: {
          id: orgId,
          name: clerkOrg.name,
          isHtvInternal,
        },
      });

      // Map Clerk role to our role system
      let role = "TEAM_MEMBER"; // default role

      // Get the role from membership
      const memberRole = membership?.role?.toLowerCase() || "";

      if (isHtvInternal) {
        // HTV Internal roles
        switch (memberRole) {
          case "admin":
            role = "SUPER_ADMIN";
            break;
          case "org_admin":
            role = "ADMIN";
            break;
          default:
            role = "SUPPORT_ANALYST";
        }
      } else {
        // PortCo roles
        switch (memberRole) {
          case "admin":
            role = "ADMIN";
            break;
          case "org_admin":
            role = "MANAGER";
            break;
          default:
            role = "TEAM_MEMBER";
        }
      }

      // Create or update company user relationship
      await prisma.companyUser.upsert({
        where: {
          userId_companyId: {
            userId: user.id,
            companyId: company.id,
          },
        },
        update: {
          role,
        },
        create: {
          userId: user.id,
          companyId: company.id,
          role,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Sign-in error:", error);
    return NextResponse.json(
      { error: "Failed to process sign-in" },
      { status: 500 }
    );
  }
}
