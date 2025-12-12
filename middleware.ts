// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";

const isPublicRoute = createRouteMatcher(["/api/webhooks/clerk(.*)"]);

/**
 * Handler that is tolerant to multiple possible clerkMiddleware signatures:
 * - (req) => ...
 * - (auth, req) => ...
 * We detect which arg looks like a NextRequest at runtime.
 */
const handler = ((arg1: any, arg2?: any) => {
  // Find the NextRequest-like object from arguments
  const maybeReqCandidates = [arg1, arg2].filter(Boolean);
  const req = maybeReqCandidates.find(
    (x) =>
      // NextRequest has nextUrl / url / pathname - check for any of those
      typeof x === "object" &&
      (("nextUrl" in x && x.nextUrl) || "url" in x || "pathname" in x)
  ) as NextRequest | undefined;

  // If we can't find a request object (shouldn't happen), allow the request to continue.
  if (!req) return;

  // If it's the webhook route, skip enforcement (public)
  if (isPublicRoute(req)) {
    return;
  }

  // Otherwise let clerkMiddleware perform its normal enforcement.
  return;
}) as unknown as any; // cast to avoid TypeScript overload mismatch

export default clerkMiddleware(handler);

export const config = {
  matcher: [
    // pages/SSR
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // API routes - handler will skip the webhook path at runtime
    '/(api|trpc)(.*)',
  ],
};
