import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(
  async (auth, req) => {
    if (!isPublicRoute(req)) {
      await auth.protect();
    }
  },
  {
    organizationSyncOptions: {
      organizationPatterns: [
        "/orgs/:slug", // Matches any organization home page, e.g. /orgs/acmecorp
        "/orgs/:slug/(.*)", // Matches any organization sub-page, e.g. /orgs/acmecorp/settings
      ],
      personalAccountPatterns: [
        "/", // Matches the personal account home page
        "/settings(.*)", // Matches any personal account sub-page, e.g. /me/settings
      ],
    },
  }
);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
