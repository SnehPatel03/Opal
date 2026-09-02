  import { clerkMiddleware } from "@clerk/nextjs/server";

  // Keep middleware non-redirecting. Protected pages and API routes perform
  // their own resource-level checks, which avoids redirect exceptions during
  // preview navigation while preserving authentication enforcement.
  export default clerkMiddleware();

  export const config = {
    matcher: [
      "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
      "/(api|trpc)(.*)",
      "/__clerk/(.*)",
    ],
};
