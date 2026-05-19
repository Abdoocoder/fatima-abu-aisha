# Fatima Abu Aisha Legal Website — Agent Instructions

## Project Type

Next.js 15 (App Router) SPA + Convex backend + Clerk auth. RTL Arabic. Deployed on Vercel.

## Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run lint         # Run ESLint
npx convex dev       # Start Convex dev server
npx convex deploy    # Deploy Convex functions to production
```

## Convex Backend

### Schema Tables

| Table | Key Fields | Purpose |
|---|---|---|
| `users` | clerkUserId, name, email, role | Synced from Clerk on login |
| `contacts` | name, email, phone, message | Contact form submissions |
| `documents` | userId, fileName, fileUrl | Client documents |
| `appointments` | userId, dateTime, status | Consultation bookings |
| `articles` | title, slug, content, tags, published | Legal blog |

### Important Convex Conventions

- Mutations in `convex/` folder auto-generate client bindings
- Use `v.id("users")` for foreign key references
- Index queries by frequently filtered fields (`.index("by_xxx", ["field"])`)
- HTTP actions in `convex/http.ts` for Clerk webhook (user sync)

### Clerk Auth + Convex

- `convex/auth.config.ts` configures the Clerk provider
- `convex/auth.ts` exports helpers: `getAuthUserId`, `enforceAdmin`
- Clerk webhook (`convex/http.ts`) syncs user on `user.created` / `user.updated`
- User role stored in Clerk public metadata: `metadata.role`
- Protect mutations with `enforceAdmin()` or `getAuthUserId(ctx)`

### Route Protection

```typescript
// src/middleware.ts
// Protected routes: /dashboard/*, /admin/*
// Public routes: /, /about, /services, /articles, /contact
// Admin-only: /admin/*
```

## Route Structure

```
/                     → Homepage (hero + services + articles preview)
/about                → Lawyer bio, experience, education
/services             → Practice areas list
/articles             → Legal blog (list with search/filter)
/articles/[slug]      → Single article (SSG)
/contact              → Contact form
/dashboard            → Client portal (protected)
/dashboard/documents  → Client document management
/dashboard/appointments → Client appointments
/admin                → Admin dashboard (admin role required)
/admin/articles       → Article CRUD
/admin/contacts       → Contact submissions
/admin/documents      → Client document management
/admin/appointments   → Appointment management
```

## Design System

See `DESIGN.md` for full design tokens. Key rules:
- Navy primary (`#0F172A`), gold accent (`#C8A96A`)
- Tajawal for Arabic, Inter for Latin
- RTL layout (`dir="rtl"`)
- Minimal, editorial style with large whitespace
- 1200px max container, 80px section padding

## Data Flow Patterns

### Form Submission (Contact)
```
ContactForm → convex mutation (contacts:submit) → Convex DB
```

### Document Upload
```
Client uploads file → Convex storage → documents table mutation
```

### Article Publishing
```
Admin creates article → Convex mutation → Static page regeneration
```

## SEO Conventions

- Every page exports `generateMetadata` with title + description + OG tags
- Arabic meta tags: `og:locale: "ar_AR"`
- JSON-LD structured data on homepage for legal services
- Article pages use `generateStaticParams` for SSG

## Common Patterns

### Loading State
- Use React Suspense with fallback skeletons
- Convex `useQuery` handles loading/error states

### Error Handling
- Wrap forms with error state display
- Convex mutations return typed errors
- Global error boundary for unexpected failures

### RTL Reminders
- `dir="rtl"` on `<html>` tag
- Use Tailwind RTL utilities: `rtl:`, `ltr:` prefixes
- `flex-row-reverse` for icon + text pairs in Arabic
- Right-align text by default
