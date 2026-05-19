import { clerkMiddleware, createRouteMatcher, clerkClient } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/admin(.*)"]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    const { userId } = await auth.protect();

    if (isAdminRoute(req)) {
      const client = await clerkClient();
      const user = await client.users.getUser(userId);
      if (user.publicMetadata.role !== "admin") {
        const url = new URL("/", req.url);
        return Response.redirect(url);
      }
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
