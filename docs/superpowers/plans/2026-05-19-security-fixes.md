# Security Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix three confirmed security vulnerabilities: dead middleware (wrong filename), unguarded Convex admin queries, and a matcher bypass gap.

**Architecture:** Three independent fixes — (1) rename the middleware file so Next.js actually loads it and tighten the route matcher, (2) add `enforceAdmin()` to Convex queries/mutations that currently allow any authenticated user to read all client data, (3) fix the duplicate matcher entry. No new abstractions, no new files — only the minimum changes to close the confirmed vulnerabilities.

**Tech Stack:** Next.js 14 App Router, Clerk (`@clerk/nextjs`), Convex backend, TypeScript.

---

## File Map

| File | Change |
|---|---|
| `src/proxy.ts` | **Delete** (rename to middleware.ts) |
| `src/middleware.ts` | **Create** (rename of proxy.ts + matcher fix) |
| `convex/documents.ts` | **Modify** — add `enforceAdmin` to `getAll` |
| `convex/contacts.ts` | **Modify** — add `enforceAdmin` to `getAll` |
| `convex/appointments.ts` | **Modify** — add `enforceAdmin` to `getAll` and `updateStatus` |

---

### Task 1: Rename `proxy.ts` → `middleware.ts` and Fix Matcher

**Context:** Next.js only auto-discovers middleware from a file named `middleware.ts` at the project root or `src/` root. The current file is named `proxy.ts` and is never imported, so **no authentication runs on any route**. This task fixes that and also: removes a duplicate `/(api|trpc)(.*)` matcher entry, and adds an explicit `/(admin|dashboard)(.*)` matcher so those routes are always covered regardless of file-extension tricks.

**Files:**
- Delete: `src/proxy.ts`
- Create: `src/middleware.ts`

- [ ] **Step 1: Create `src/middleware.ts` with the corrected content**

```typescript
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
```

- [ ] **Step 2: Delete the old `src/proxy.ts`**

```bash
rm src/proxy.ts
```

- [ ] **Step 3: Verify the build recognises the middleware**

```bash
npx next build 2>&1 | grep -E "middleware|Middleware"
```

Expected output includes something like `✓ Compiled middleware` or `middleware`. If you see no middleware line at all, the file is still not being picked up — double-check the filename and location.

- [ ] **Step 4: Manual smoke test — unauthenticated access to a protected route**

Start the dev server (`npm run dev`) and open your browser. Navigate to `/dashboard` (or any protected route). You should be redirected to `/sign-in`. If you land on the page without being redirected, the middleware is not running.

- [ ] **Step 5: Commit**

```bash
git add src/middleware.ts
git rm src/proxy.ts
git commit -m "fix: rename proxy.ts to middleware.ts so Next.js loads the Clerk middleware

The middleware was named proxy.ts which Next.js ignores. All routes were
unprotected. Also adds /(admin|dashboard)(.*) matcher and removes the
duplicate /(api|trpc)(.*) entry."
```

---

### Task 2: Guard `documents.getAll` and `contacts.getAll` with `enforceAdmin`

**Context:** `convex/documents.ts` and `convex/contacts.ts` both expose a `getAll` query that returns all records from the database with zero authorization check. Any authenticated Clerk user (not just admins) can call these directly via the Convex client. The `enforceAdmin` helper already exists in `convex/auth.ts` — it throws if the caller is not an admin.

**Files:**
- Modify: `convex/documents.ts`
- Modify: `convex/contacts.ts`

- [ ] **Step 1: Add `enforceAdmin` import and guard to `convex/documents.ts`**

Replace the current `getAll` export. The import line at the top already imports `getUserId` from `./auth` — add `enforceAdmin` to it.

Full updated file `convex/documents.ts`:

```typescript
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUserId, enforceAdmin } from "./auth";

export const upload = mutation({
  args: {
    fileName: v.string(),
    fileUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    await ctx.db.insert("documents", {
      userId,
      fileName: args.fileName,
      fileUrl: args.fileUrl,
      uploadDate: new Date().toISOString(),
    });
  },
});

export const getMyDocuments = query({
  handler: async (ctx) => {
    const userId = await getUserId(ctx);
    if (!userId) return [];

    return await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
  },
});

export const getAll = query({
  handler: async (ctx) => {
    await enforceAdmin(ctx);
    return await ctx.db.query("documents").collect();
  },
});
```

- [ ] **Step 2: Add `enforceAdmin` import and guard to `convex/contacts.ts`**

Full updated file `convex/contacts.ts`:

```typescript
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { enforceAdmin } from "./auth";

export const getAll = query({
  handler: async (ctx) => {
    await enforceAdmin(ctx);
    return await ctx.db.query("contacts").collect();
  },
});

export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("contacts", {
      name: args.name,
      email: args.email,
      phone: args.phone,
      message: args.message,
    });
  },
});
```

- [ ] **Step 3: Verify TypeScript compiles cleanly**

```bash
npx tsc --noEmit
```

Expected: no errors. If you see `enforceAdmin` not found, check the import path — it should be `"./auth"` (relative, no extension).

- [ ] **Step 4: Manual smoke test — call getAll as a non-admin**

In the browser, sign in as a regular (non-admin) client user and open the browser console. Run:

```js
// If you have the Convex client exposed globally in dev, try:
// This will vary by how the app exposes the client — look for convex in window or React DevTools
// The expected result is an error: "Not authorized"
```

Alternatively: confirm the admin panel at `/admin` loads documents only when signed in as an admin, and shows an error (or blank) when signed in as a regular user.

- [ ] **Step 5: Commit**

```bash
git add convex/documents.ts convex/contacts.ts
git commit -m "fix: enforce admin role on documents.getAll and contacts.getAll

Any authenticated user could previously read all documents and contact
submissions directly via the Convex API. enforceAdmin() now throws for
non-admins before the query runs."
```

---

### Task 3: Guard `appointments.getAll` and `appointments.updateStatus` with `enforceAdmin`

**Context:** Same issue as Task 2, but in `convex/appointments.ts`. Both `getAll` (reads all appointments for all users) and `updateStatus` (mutates appointment status with no ownership or role check) are unguarded.

**Files:**
- Modify: `convex/appointments.ts`

- [ ] **Step 1: Update `convex/appointments.ts`**

Add `enforceAdmin` to the import and add a guard at the top of both `getAll` and `updateStatus`.

Full updated file `convex/appointments.ts`:

```typescript
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUserId, enforceAdmin } from "./auth";

export const create = mutation({
  args: {
    dateTime: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    await ctx.db.insert("appointments", {
      userId,
      dateTime: args.dateTime,
      status: "pending",
      notes: args.notes,
    });
  },
});

export const getMyAppointments = query({
  handler: async (ctx) => {
    const userId = await getUserId(ctx);
    if (!userId) return [];

    return await ctx.db
      .query("appointments")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
  },
});

export const getAll = query({
  handler: async (ctx) => {
    await enforceAdmin(ctx);
    return await ctx.db.query("appointments").collect();
  },
});

export const updateStatus = mutation({
  args: {
    appointmentId: v.id("appointments"),
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("cancelled"),
    ),
  },
  handler: async (ctx, args) => {
    await enforceAdmin(ctx);
    await ctx.db.patch(args.appointmentId, { status: args.status });
  },
});
```

- [ ] **Step 2: Verify TypeScript compiles cleanly**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Manual smoke test — verify admin panel still works**

Sign in as an admin user and navigate to `/admin`. Confirm that appointments still load and that status updates still work. This verifies the `enforceAdmin` check passes for real admins.

- [ ] **Step 4: Commit**

```bash
git add convex/appointments.ts
git commit -m "fix: enforce admin role on appointments.getAll and appointments.updateStatus

Any authenticated user could read all appointment records and change any
appointment's status. enforceAdmin() now blocks non-admin callers."
```

---

## Self-Review

**Spec coverage:**
- [x] Vuln 1 (dead middleware / wrong filename) → Task 1
- [x] Vuln 2 (unguarded Convex queries) → Tasks 2 & 3
- [x] Vuln 3 (matcher extension bypass + duplicate entry) → Task 1

**Placeholder scan:** None found. All steps contain complete file contents and exact commands.

**Type consistency:** `enforceAdmin` is imported from `"./auth"` in all three tasks. Its signature is `async function enforceAdmin(ctx: QueryCtx | MutationCtx)` — compatible with both `query` and `mutation` handler contexts throughout.
