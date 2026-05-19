# Phase 1: Project Scaffold — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans.

**Goal:** Create `nextjs-site/` with Next.js 15 App Router, Tailwind, RTL layout, Tajawal/Inter fonts, and design tokens matching DESIGN.md.

**Architecture:** Standalone Next.js project in a `nextjs-site/` subfolder. Root layout provides `dir="rtl"`, `lang="ar"`, font loading, and global CSS with theme tokens. All CSS tokens and design constants are copied from the existing Vite project.

**Tech Stack:** Next.js 15, Tailwind CSS v4, TypeScript

---

### Task 1: Scaffold Next.js Project

**Files:**
- Create: `nextjs-site/` (via `create-next-app`)

- [ ] **Step 1: Create the project**

```bash
cd /home/abdullah/Projects/fatima-abu-aisha
npx create-next-app@latest nextjs-site --typescript --tailwind --eslint --app --src-dir --no-import-alias --use-npm
```

Expected: Next.js project created in `nextjs-site/` with `src/app/` directory structure.

- [ ] **Step 2: Install Convex and Clerk dependencies**

```bash
cd /home/abdullah/Projects/fatima-abu-aisha/nextjs-site
npm install convex @convex-dev/auth @clerk/nextjs @clerk/backend
```

Expected: Packages added to `package.json`.

- [ ] **Step 3: Install motion (animation) and lucide-react (icons)**

```bash
cd /home/abdullah/Projects/fatima-abu-aisha/nextjs-site
npm install motion lucide-react
```

Expected: Packages added.

- [ ] **Step 4: Verify dev server starts**

```bash
cd /home/abdullah/Projects/fatima-abu-aisha/nextjs-site
npm run dev
```

Expected: Server starts on localhost:3000. Press Ctrl+C to stop.

### Task 2: Configure Tailwind Theme Tokens

**Files:**
- Modify: `nextjs-site/src/app/globals.css`

- [ ] **Step 1: Replace globals.css with theme tokens**

Write `nextjs-site/src/app/globals.css`:

```css
@import "tailwindcss";
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Tajawal:wght@400;500;700&display=swap');

@theme {
  --font-sans: "Inter", "Tajawal", ui-sans-serif, system-ui, sans-serif;
  --font-tajawal: "Tajawal", sans-serif;

  --color-brand-navy: #0F172A;
  --color-brand-gold: #C8A96A;
  --color-brand-gray: #F5F5F5;

  --color-surface: #F8F9FF;
  --color-on-surface: #0D1C2F;
  --color-on-surface-variant: #45464D;

  --spacing-container-max: 1200px;
  --spacing-section-padding: 4rem;
  --spacing-margin-desktop: 2.5rem;
  --spacing-margin-mobile: 1rem;
}

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-surface text-on-surface antialiased;
    font-feature-settings: "ss01", "ss02", "cv01", "cv02";
  }
}

@layer components {
  .btn-primary {
    @apply bg-brand-navy text-white font-tajawal font-bold py-3 px-6 rounded-sm hover:opacity-90 transition-all flex items-center justify-center gap-2;
  }

  .btn-secondary {
    @apply bg-transparent border border-brand-gold text-brand-navy font-tajawal font-bold py-3 px-6 rounded-sm hover:bg-brand-gray transition-all flex items-center justify-center gap-2;
  }

  .btn-gold {
    @apply bg-brand-gold text-brand-navy font-tajawal font-bold py-3 px-6 rounded-sm hover:opacity-90 transition-all flex items-center justify-center gap-2;
  }

  .card-flat {
    @apply bg-white border border-brand-gray transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)];
  }
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
```

### Task 3: Configure Root Layout (RTL, Fonts, Metadata)

**Files:**
- Modify: `nextjs-site/src/app/layout.tsx`

- [ ] **Step 1: Write the root layout**

Write `nextjs-site/src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "فاطمة أبو عيشة للمحاماة — استشارات قانونية مهنية",
  description: "نقدم خدمات قانونية متكاملة بمهنية عالية لضمان أفضل النتائج لعملائنا في مختلف القضايا القانونية.",
  openGraph: {
    locale: "ar_AR",
    siteName: "فاطمة أبو عيشة للمحاماة",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}
      </body>
    </html>
  );
}
```

### Task 4: Configure next.config.ts for Image Domains

**Files:**
- Modify: `nextjs-site/next.config.ts`

- [ ] **Step 1: Add image remote patterns**

Write `nextjs-site/next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
```

### Task 5: Create .env.local

**Files:**
- Create: `nextjs-site/.env.local`

- [ ] **Step 1: Copy env vars from root .env.local**

```bash
cp /home/abdullah/Projects/fatima-abu-aisha/.env.local /home/abdullah/Projects/fatima-abu-aisha/nextjs-site/.env.local
```

Expected: `.env.local` copied with Convex and Clerk keys.

### Task 6: Create a Simple Homepage to Verify Everything Works

**Files:**
- Modify: `nextjs-site/src/app/page.tsx`

- [ ] **Step 1: Write a minimal verification page**

Write `nextjs-site/src/app/page.tsx`:

```tsx
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-surface">
      <h1 className="font-tajawal text-4xl font-bold text-brand-navy">
        فاطمة أبو عيشة للمحاماة
      </h1>
      <p className="font-tajawal text-lg text-on-surface-variant mt-4">
        محاماة واستشارات قانونية
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Build to verify no errors**

```bash
cd /home/abdullah/Projects/fatima-abu-aisha/nextjs-site
npm run build
```

Expected: Build succeeds with no errors. Output shows pages compiled.

- [ ] **Step 3: Start dev server and verify visually**

```bash
cd /home/abdullah/Projects/fatima-abu-aisha/nextjs-site
npm run dev
```

Expected: Site loads at localhost:3000 with Arabic RTL text in Tajawal font, navy headings, gold accents applied. Press Ctrl+C to stop.
