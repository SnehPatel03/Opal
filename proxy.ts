  import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
  import { NextResponse } from "next/server";

  const isProtectedRoute = createRouteMatcher([
    "/dashboard(.*)",
    "/api/payment(.*)",
    // "/payment(.*)",
  ]);

  export default clerkMiddleware(async (auth, req) => {
    const isApiRoute = req.nextUrl.pathname.startsWith("/api/");
    const isDesktopRequest = isApiRoute && req.headers.get("origin") === "null";

    if (isDesktopRequest && req.method === "OPTIONS") {
      return new NextResponse(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "null",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Authorization, Content-Type",
          "Access-Control-Max-Age": "600",
          Vary: "Origin",
        },
      });
    }

    if (isProtectedRoute(req)) {
      await auth.protect();
    }

    if (isDesktopRequest) {
      const response = NextResponse.next();
      response.headers.set("Access-Control-Allow-Origin", "null");
      response.headers.set(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS",
      );
      response.headers.set(
        "Access-Control-Allow-Headers",
        "Authorization, Content-Type",
      );
      response.headers.set("Vary", "Origin");
      return response;
    }
  });

  export const config = {
    matcher: [
      "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
      "/(api|trpc)(.*)",
      "/__clerk/(.*)",
    ],
};