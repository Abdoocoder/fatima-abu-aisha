# Project Architecture

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router) |
| Styling | Tailwind CSS v4 |
| Backend | Convex (serverless) |
| Auth | Clerk |
| Deployment | Vercel |
| Language | Arabic (RTL) |

## Folder Structure

```
fatima-abu-aisha/
├── .env.local                  # Environment variables (gitignored)
├── convex/                     # Convex backend
│   ├── schema.ts               # Database schema
│   ├── auth.config.ts          # Clerk auth integration
│   ├── auth.ts                 # Auth helpers
│   ├── seed.ts                 # Seed data
│   ├── http.ts                 # HTTP actions
│   ├── contacts.ts             # Contact form mutations
│   ├── appointments.ts         # Appointment mutations
│   ├── documents.ts            # Document upload/retrieval
│   ├── articles.ts             # Article CRUD
│   └── users.ts                # User management
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout (RTL, fonts, Clerk provider)
│   │   ├── page.tsx            # Homepage
│   │   ├── about/
│   │   │   └── page.tsx        # About page
│   │   ├── services/
│   │   │   └── page.tsx        # Services page
│   │   ├── articles/
│   │   │   ├── page.tsx        # Articles list
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Single article
│   │   ├── contact/
│   │   │   └── page.tsx        # Contact page
│   │   ├── dashboard/          # Client portal (protected)
│   │   │   ├── page.tsx        # Dashboard home
│   │   │   ├── documents/
│   │   │   │   └── page.tsx    # Document management
│   │   │   ├── appointments/
│   │   │   │   └── page.tsx    # Appointments view
│   │   │   └── messages/
│   │   │       └── page.tsx    # Client messages
│   │   └── admin/              # Admin dashboard (protected, admin role)
│   │       ├── page.tsx        # Admin overview
│   │       ├── articles/
│   │       │   └── page.tsx    # Article management
│   │       ├── contacts/
│   │       │   └── page.tsx    # Contact inquiries
│   │       ├── documents/
│   │       │   └── page.tsx    # Document management
│   │       └── appointments/
│   │           └── page.tsx    # Appointment management
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx      # Navigation header
│   │   │   ├── Footer.tsx      # Site footer
│   │   │   └── Layout.tsx      # Shell layout
│   │   ├── ui/                 # Reusable UI components
│   │   ├── forms/
│   │   │   ├── ContactForm.tsx
│   │   │   └── AppointmentForm.tsx
│   │   ├── dashboard/          # Dashboard-specific components
│   │   └── admin/              # Admin-specific components
│   ├── lib/
│   │   ├── convex.ts           # Convex client
│   │   └── utils.ts            # Utility functions
│   ├── middleware.ts           # Clerk middleware (route protection)
│   └── styles/
│       └── globals.css         # Tailwind imports + theme
├── public/
│   ├── images/                 # Static images
│   └── fonts/                  # Local fonts (optional)
├── DESIGN.md                   # Design system
├── PRODUCT.md                  # Product requirements
├── PROJECT_ARCHITECTURE.md     # This file
├── AGENTS.md                   # AI agent instructions
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── convex.json                 # Convex deployment config
```

## Convex Schema

```typescript
// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkUserId: v.string(),
    name: v.string(),
    email: v.string(),
    role: v.union(v.literal("admin"), v.literal("client")),
  }).index("by_clerk_id", ["clerkUserId"]),

  contacts: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    message: v.string(),
  }),

  documents: defineTable({
    userId: v.id("users"),
    fileName: v.string(),
    fileUrl: v.string(),
    uploadDate: v.string(),
  }).index("by_user", ["userId"]),

  appointments: defineTable({
    userId: v.id("users"),
    dateTime: v.string(),
    status: v.union(v.literal("pending"), v.literal("confirmed"), v.literal("cancelled")),
    notes: v.optional(v.string()),
  }).index("by_user", ["userId"]),

  articles: defineTable({
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    excerpt: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    author: v.string(),
    publishedDate: v.string(),
    tags: v.array(v.string()),
    published: v.boolean(),
  }).index("by_slug", ["slug"]),
});
```

## Clerk Auth Integration

### Middleware (`src/middleware.ts`)
- Protect `/dashboard/*` and `/admin/*` routes
- Public routes: `/`, `/about`, `/services`, `/articles`, `/contact`
- Admin routes require `role: "admin"` metadata

### Convex Auth (`convex/auth.config.ts`)
- Use `@convex-dev/auth` with Clerk provider
- Sync Clerk users to Convex `users` table on login
- Role stored in user metadata (Clerk public metadata)

### Route Protection Flow
1. Clerk middleware checks auth for protected routes
2. On login, Convex mutation syncs user to `users` table
3. Admin routes check `role === "admin"` before rendering
4. Client dashboard scopes data to `userId`

## Admin Dashboard

### Features
- Article CRUD (create, edit, publish, unpublish)
- View and manage contact form submissions
- Upload documents for clients
- Manage appointments (confirm/cancel)
- View all registered clients

### Access Control
- `role: "admin"` in Clerk user metadata
- Admin checks in layout and API routes
- Separate navigation and sidebar for admin

## Article System

- Server-side rendering for SEO
- Static generation for article pages
- Search and filter by category/tags
- Featured article on homepage
- Pagination for article list
- Slug-based URLs (`/articles/[slug]`)

## SEO System

- Dynamic metadata per page via `generateMetadata`
- Open Graph tags for social sharing
- Structured data (JSON-LD) for legal services
- Sitemap generation
- Arabic locale support in meta tags

## Environment Variables

```
# Convex
NEXT_PUBLIC_CONVEX_URL=https://upbeat-bison-612.convex.cloud
CONVEX_DEPLOYMENT=upbeat-bison-612

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YWNlLWphY2thbC05Ny5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_LBUXziD677agcIlCbQkGmXKaljagSU3xGOuyT7PqjV

# App
APP_URL=https://fatima-abu-aisha.vercel.app
```
