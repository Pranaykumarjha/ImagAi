// middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

/**
 * Use clerkMiddleware with no handler argument (default behavior).
 * Then exclude the webhook path from the middleware matcher so the webhook stays public.
 */
export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and static files (same as you had)
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Run for API routes except the Clerk webhook path:
    // The negative lookahead here prevents matching "/api/webhooks/clerk" (and subpaths).
    '/(api|trpc)(?!/webhooks/clerk)(.*)',
  ],
};
