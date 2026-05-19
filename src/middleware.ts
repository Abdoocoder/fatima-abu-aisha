import { clerkMiddleware, createRouteMatcher, clerkClient } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/about",
  "/services",
  "/articles(.*)",
  "/contact",
  "/privacy",
  "/terms",
  "/sitemap",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/favicon.ico",
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    const { userId } = await auth();
    if (!userId) {
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", req.nextUrl.pathname);
      return Response.redirect(signInUrl);
    }

    if (isAdminRoute(req)) {
      const client = await clerkClient();
      const user = await client.users.getUser(userId);
      if (user.publicMetadata.role !== "admin") {
        return Response.redirect(new URL("/", req.url));
      }
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/(admin|dashboard)(.*)",
    "/__clerk(.*)",
  ],
};
