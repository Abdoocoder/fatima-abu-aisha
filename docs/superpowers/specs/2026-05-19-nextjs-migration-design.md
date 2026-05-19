# Next.js Migration — Design Doc

## Overview

Migrate the current Vite + React SPA (Fatima Abu Aisha law firm site) to a full-stack **Next.js 15 (App Router) + Convex + Clerk** application. The new project lives in `nextjs-site/` alongside the existing Vite project. The Vite project remains as reference until migration is complete.

## Build Order

Each step is standalone, testable, and produces a working artifact before moving to the next.

### Phase 1: Scaffold (Next.js + Tailwind + RTL)

**Goal**: Blank Next.js project with RTL layout, Tajawal/Inter fonts, Tailwind theme tokens matching DESIGN.md, and proper directory structure.

**Files created**:
- `nextjs-site/` — `create-next-app` with TypeScript + Tailwind
- `nextjs-site/src/app/layout.tsx` — Root layout: `dir="rtl"`, `lang="ar"`, font loading, metadata
- `nextjs-site/src/app/globals.css` — Tailwind imports + `@theme` tokens (navy, gold, gray, surface)
- `nextjs-site/.env.local` — Convex URL + Clerk keys (from existing `.env.local`)
- `nextjs-site/next.config.ts` — Image domains for Google CDN assets

**Verification**: `npm run dev` shows a blank RTL page with correct fonts.

### Phase 2: Convex Backend + Clerk Auth

**Goal**: Working Convex backend with schema, auth config, and Clerk user sync.

**Files created**:
- `nextjs-site/convex/schema.ts` — Users, Contacts, Documents, Appointments, Articles tables
- `nextjs-site/convex/auth.config.ts` — Clerk auth provider config
- `nextjs-site/convex/auth.ts` — `getAuthUserId`, `enforceAdmin` helpers
- `nextjs-site/convex/http.ts` — Clerk webhook handler (`user.created` / `user.updated`)
- `nextjs-site/convex/contacts.ts` — `submitContact` mutation
- `nextjs-site/convex/appointments.ts` — `createAppointment` mutation
- `nextjs-site/convex/documents.ts` — Document upload/retrieval mutations
- `nextjs-site/convex/articles.ts` — Article CRUD mutations + queries
- `nextjs-site/convex/users.ts` — User queries
- `nextjs-site/src/lib/convex.ts` — Convex client provider
- `nextjs-site/src/middleware.ts` — Clerk middleware (route protection)

**Verification**: `npx convex dev` starts, webhook syncs user on login.

### Phase 3: Public Pages (Migration)

**Goal**: All 5 public pages render with same design as Vite site.

**Pages**:
- `nextjs-site/src/app/page.tsx` — Homepage (hero + services grid)
- `nextjs-site/src/app/about/page.tsx` — Attorney bio + education + values
- `nextjs-site/src/app/services/page.tsx` — 6 practice areas
- `nextjs-site/src/app/articles/page.tsx` — Legal library with search + filter
- `nextjs-site/src/app/contact/page.tsx` — Contact form with Convex mutation

**Shared components**:
- `nextjs-site/src/components/Header.tsx` — Sticky nav + mobile drawer
- `nextjs-site/src/components/Footer.tsx` — Brand footer

**Data flow**: Hardcoded constants for public pages (same as Vite). Contact form submits to Convex.

**Verification**: All pages render correctly with RTL layout.

### Phase 4: Client Portal

**Goal**: Authenticated client dashboard with document management and appointments.

**Pages**:
- `nextjs-site/src/app/dashboard/page.tsx` — Dashboard home
- `nextjs-site/src/app/dashboard/documents/page.tsx` — Upload/view documents
- `nextjs-site/src/app/dashboard/appointments/page.tsx` — View appointments

**Auth**: Clerk `useAuth()` + `useUser()` guards. Redirects to `/` if unauthenticated.

**Verification**: Login → dashboard → upload document → see it in list.

### Phase 5: Admin Panel

**Goal**: Admin-only dashboard for managing site content.

**Pages**:
- `nextjs-site/src/app/admin/page.tsx` — Admin overview
- `nextjs-site/src/app/admin/contacts/page.tsx` — View contact submissions
- `nextjs-site/src/app/admin/documents/page.tsx` — View all client documents
- `nextjs-site/src/app/admin/appointments/page.tsx` — Manage appointments

**Auth**: Clerk middleware checks `metadata.role === "admin"`.

**Verification**: Admin can see all contacts, appointments, documents.

### Phase 6: Article CMS

**Goal**: Full CRUD for articles with SSR/SSG.

**Pages**:
- `nextjs-site/src/app/admin/articles/page.tsx` — Article list (admin)
- `nextjs-site/src/app/admin/articles/new/page.tsx` — Create article
- `nextjs-site/src/app/admin/articles/[id]/edit/page.tsx` — Edit article

**SSG**: `nextjs-site/src/app/articles/[slug]/page.tsx` with `generateStaticParams`

**Verification**: Create article → appears on public articles page → viewable at `/articles/[slug]`.

## Key Decisions

- **`nextjs-site/` subfolder**: Keeps Vite site as working reference. No risk of breaking the live site.
- **No dark mode**: Professional law site; light mode only is intentional per DESIGN.md.
- **Hardcoded content initially**: Public page content stays in constants (same as Vite). Convex is used only for dynamic data (contacts, documents, appointments, articles).
- **CSS duplicates**: `globals.css` will have its own `@theme` block matching the Vite `index.css` tokens. Design consistency is ensured by DESIGN.md.

## Non-Goals

- Rich text editor (TBD — use textarea initially)
- File upload (TBD — use URL input initially, Convex storage later)
- Payment integration
- Multi-language support
- Mobile app

## Files to Preserve from Vite Project

- `src/constants.tsx` — Practice areas, asset URLs (copy to Next.js project)
- `src/index.css` — Theme tokens reference (reimplement in globals.css)
- `src/pages/*.tsx` — Component JSX patterns to adapt
- `src/components/*.tsx` — Header, Footer, Layout patterns
- `DESIGN.md`, `PRODUCT.md`, `AGENTS.md`, `PROJECT_ARCHITECTURE.md` — Already in root, shared across projects
