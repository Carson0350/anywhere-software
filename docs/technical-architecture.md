# Technical Architecture Specification
## AnywhereSoftware

**Author:** Winston (Architect)
**Date:** December 4, 2025
**Version:** 1.0
**Status:** Ready for Implementation

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture Diagrams](#architecture-diagrams)
4. [Monorepo Structure](#monorepo-structure)
5. [Component Architecture](#component-architecture)
6. [Authentication & Authorization](#authentication--authorization)
7. [Content Management](#content-management)
8. [Database Schema](#database-schema)
9. [API Specifications](#api-specifications)
10. [Performance Optimization](#performance-optimization)
11. [Deployment Strategy](#deployment-strategy)
12. [Security Considerations](#security-considerations)
13. [Development Workflow](#development-workflow)

---

## System Overview

AnywhereSoftware is a dual-platform system consisting of:

1. **Portfolio Site** - Static marketing site showcasing services and portfolio (Astro)
2. **Client Sites** - Dynamic client websites with admin panels (Next.js)

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    USER LAYER                           │
├─────────────────────────────────────────────────────────┤
│  Portfolio Visitors   │  Client Admin Users             │
│  (Discovery)          │  (Content Management)           │
└────────────┬──────────┴─────────────┬───────────────────┘
             │                        │
             ▼                        ▼
┌─────────────────────────┐  ┌──────────────────────────┐
│   PORTFOLIO SITE        │  │   CLIENT SITES           │
│   (Astro + React)       │  │   (Next.js + React)      │
│   anywheresoftware.com  │  │   *.com (custom domains) │
│                         │  │                          │
│   - Static Generation   │  │   - SSR + ISR            │
│   - Edge Deployment     │  │   - Dynamic Content      │
│   - SEO Optimized       │  │   - Admin Panel          │
└────────────┬────────────┘  └──────────┬───────────────┘
             │                          │
             └──────────┬───────────────┘
                        ▼
             ┌─────────────────────┐
             │  SHARED LAYER       │
             │  @anywhere/*        │
             ├─────────────────────┤
             │  - UI Components    │
             │  - Config           │
             │  - Utils            │
             └──────────┬──────────┘
                        │
             ┌──────────┴──────────┐
             ▼                     ▼
    ┌────────────────┐    ┌────────────────┐
    │  CONTENT CMS   │    │  SERVICES      │
    │  (Sanity.io)   │    │                │
    │                │    │  - Auth        │
    │  - Structured  │    │  - Forms       │
    │    Content     │    │  - Analytics   │
    │  - Media CDN   │    │  - Email       │
    │  - Real-time   │    │                │
    └────────────────┘    └────────────────┘
```

---

## Technology Stack

### Frontend Frameworks

**Portfolio Site: Astro 4.x**
- **Why:** Static site generation, optimal for marketing content
- **Benefits:**
  - Blazing fast (pure HTML, minimal JS)
  - Built-in image optimization
  - SEO-friendly
  - Deploy to edge (Vercel/Netlify)
- **Use Cases:** Homepage, portfolio page, about page, blog

**Client Sites: Next.js 14.x (App Router)**
- **Why:** Server-side rendering, dynamic content, API routes
- **Benefits:**
  - React Server Components (performance)
  - Incremental Static Regeneration (ISR)
  - Built-in API routes (backend logic)
  - Middleware (auth, redirects)
- **Use Cases:** Client websites, admin panels, dynamic content

### UI Framework

**React 18.x**
- Component reusability across Astro and Next.js
- Server Components support (Next.js)
- Concurrent rendering (performance)

### Styling

**Tailwind CSS 3.x**
- Utility-first CSS framework
- Design tokens from UX spec (colors, typography, spacing)
- JIT compiler (fast builds)
- Responsive design utilities

**shadcn/ui**
- Accessible React components built on Radix UI
- Copy-paste components (not npm package)
- Full customization (Tailwind classes)
- TypeScript support

### Component Library

**Custom: @anywhere/ui**
- Shared component package in monorepo
- Built on shadcn/ui + custom components
- Reusable across all apps
- TypeScript + Tailwind

### Monorepo Management

**Turborepo**
- Fast builds (caching, parallelization)
- Simple configuration
- Task orchestration
- Shared dependencies

**pnpm**
- Fast, disk-efficient package manager
- Workspace support
- Strict dependency resolution

### Authentication

**Supabase Auth**
- Magic link authentication (no passwords)
- Row-level security (database-level auth)
- Free tier (50K MAU)
- Real-time subscriptions

**Alternative: Clerk** (if scaling beyond 10K users)
- Pre-built UI components
- Social login, MFA
- Better UX, higher cost

### Content Management

**Sanity.io**
- Headless CMS
- Structured content (not just markdown)
- Real-time collaboration
- Image CDN included
- Customizable Studio (white-label for clients)
- Free tier (generous limits)

### Database

**Supabase PostgreSQL** (Phase 3 - Admin Panels)
- Managed PostgreSQL
- Row-level security
- Real-time subscriptions
- RESTful API + GraphQL
- Free tier (500MB database)

### Forms

**Formspree** (Portfolio Site)
- Simple form backend
- Email notifications
- Spam protection
- Free tier (50 submissions/month)

**React Hook Form** (Client Sites)
- Form validation
- TypeScript support
- Performance optimized
- Minimal re-renders

### Analytics

**Vercel Analytics** (Built-in)
- Web Vitals tracking
- Zero configuration
- Privacy-friendly

**Plausible Analytics** (Optional)
- Privacy-focused
- GDPR compliant
- Simple dashboard

### Deployment

**Vercel**
- Automatic deployments (Git push)
- Edge network (300+ locations)
- Preview deployments
- Environment variables
- Custom domains
- Zero configuration

**Alternative: Netlify**
- Similar features
- Different pricing model

### Development Tools

**TypeScript 5.x**
- Type safety
- Better DX (autocomplete, refactoring)
- Catch errors at compile time

**ESLint + Prettier**
- Code quality
- Consistent formatting
- Pre-commit hooks (Husky)

**Vitest** (Testing)
- Fast unit tests
- Vite-powered
- Jest-compatible API

---

## Architecture Diagrams

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CLOUDFLARE DNS                          │
│  anywheresoftware.com → Vercel Edge                         │
│  maryjanes-campground.com → Vercel Edge                     │
└────────────────────────┬────────────────────────────────────┘
                         │
         ┌───────────────┴───────────────┐
         │                               │
         ▼                               ▼
┌─────────────────────┐         ┌─────────────────────┐
│  PORTFOLIO SITE     │         │  CLIENT SITE        │
│  (Astro)            │         │  (Next.js)          │
│                     │         │                     │
│  Static HTML/CSS/JS │         │  SSR + ISR          │
│  Edge Cached        │         │  API Routes         │
└──────────┬──────────┘         └──────────┬──────────┘
           │                               │
           │    ┌──────────────────────────┘
           │    │
           ▼    ▼
    ┌──────────────────┐
    │  SHARED PACKAGES │
    │  @anywhere/*     │
    │                  │
    │  - ui            │
    │  - config        │
    │  - utils         │
    └────────┬─────────┘
             │
    ┌────────┴────────┐
    │                 │
    ▼                 ▼
┌─────────┐      ┌─────────┐
│ Sanity  │      │Supabase │
│ CMS     │      │ Auth    │
│         │      │ DB      │
└─────────┘      └─────────┘
```

### Data Flow: Portfolio Site Visitor → Contact Submission

```
User visits anywheresoftware.com
         │
         ▼
Astro serves static HTML (Edge CDN)
         │
         ▼
User fills contact form
         │
         ▼
Form submits to Formspree API
         │
         ▼
Formspree sends email notification
         │
         ▼
User receives confirmation email
         │
         ▼
Carson receives lead notification
```

### Data Flow: Client Updates Content

```
Client logs into admin.maryjanes-campground.com
         │
         ▼
Supabase Auth (magic link)
         │
         ▼
Next.js renders admin panel
         │
         ▼
Client edits hours in Sanity Studio
         │
         ▼
Sanity saves content + triggers webhook
         │
         ▼
Next.js ISR revalidates page
         │
         ▼
Updated content visible on live site
```

---

## Monorepo Structure

```
anywheresoftware/
├── apps/
│   ├── portfolio/                    # Astro (portfolio site)
│   │   ├── src/
│   │   │   ├── components/           # Astro components
│   │   │   │   ├── Hero.astro
│   │   │   │   ├── Services.astro
│   │   │   │   ├── Portfolio.astro
│   │   │   │   └── ContactForm.astro
│   │   │   ├── layouts/
│   │   │   │   └── Layout.astro      # Base layout
│   │   │   ├── pages/
│   │   │   │   ├── index.astro       # Homepage
│   │   │   │   ├── portfolio.astro   # Portfolio page
│   │   │   │   └── about.astro       # About page
│   │   │   └── styles/
│   │   │       └── global.css        # Global styles
│   │   ├── public/
│   │   │   ├── images/               # Static images
│   │   │   ├── fonts/                # Web fonts
│   │   │   └── favicon.ico
│   │   ├── astro.config.mjs
│   │   ├── tailwind.config.js
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── templates/
│       ├── campground/               # Next.js (client template)
│       │   ├── app/                  # App router
│       │   │   ├── (public)/         # Public routes
│       │   │   │   ├── page.tsx      # Homepage
│       │   │   │   ├── about/
│       │   │   │   └── contact/
│       │   │   ├── admin/            # Admin routes (protected)
│       │   │   │   ├── layout.tsx
│       │   │   │   ├── page.tsx      # Dashboard
│       │   │   │   └── content/
│       │   │   ├── api/              # API routes
│       │   │   │   ├── preview/
│       │   │   │   └── revalidate/
│       │   │   ├── layout.tsx        # Root layout
│       │   │   └── globals.css
│       │   ├── components/           # Page-specific components
│       │   ├── lib/
│       │   │   ├── sanity.ts         # Sanity client
│       │   │   └── supabase.ts       # Supabase client
│       │   ├── public/
│       │   ├── next.config.js
│       │   ├── tailwind.config.js
│       │   ├── tsconfig.json
│       │   └── package.json
│       │
│       ├── winery/                   # Next.js (deferred Phase 3)
│       └── restaurant/               # Next.js (deferred Phase 3)
│
├── packages/
│   ├── ui/                           # Shared component library
│   │   ├── components/
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── flip-card.tsx
│   │   │   ├── hero.tsx
│   │   │   ├── pricing-card.tsx
│   │   │   ├── contact-form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── select.tsx
│   │   │   └── toast.tsx
│   │   ├── lib/
│   │   │   └── utils.ts              # cn() helper, etc.
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── config/                       # Shared configs
│   │   ├── tailwind.config.js        # Base Tailwind config
│   │   ├── tsconfig.json             # Base TypeScript config
│   │   ├── eslint.config.js          # ESLint config
│   │   └── package.json
│   │
│   └── utils/                        # Shared utilities
│       ├── analytics.ts              # Analytics helpers
│       ├── forms.ts                  # Form validation
│       ├── image-optimization.ts     # Image utils
│       ├── package.json
│       └── tsconfig.json
│
├── .github/
│   └── workflows/
│       ├── ci.yml                    # CI pipeline
│       └── deploy.yml                # Deployment
│
├── turbo.json                        # Turborepo config
├── pnpm-workspace.yaml               # pnpm workspaces
├── package.json                      # Root package.json
├── .gitignore
├── .env.example                      # Example env vars
└── README.md
```

---

## Component Architecture

### Design Tokens (Tailwind Config)

```javascript
// packages/config/tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    '../../packages/ui/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',   // Misty morning
          100: '#dcfce7',  // Fresh pine needles
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',  // Deep forest green (PRIMARY)
          600: '#16a34a',
          700: '#15803d',  // Shadowed forest
          800: '#166534',
          900: '#14532d',
        },
        neutral: {
          50: '#fafaf9',   // Snow cap
          100: '#f5f5f4',  // Limestone
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',  // Granite
          600: '#57534e',
          700: '#44403c',  // Rich soil
          800: '#292524',
          900: '#1c1917',  // Mountain night
        },
        accent: {
          sky: '#60a5fa',
          sunset: '#f59e0b',
          alpine: '#ea580c',
        },
        success: '#22c55e',
        warning: '#f59e0b',
        error: '#dc2626',
        info: '#60a5fa',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.5' }],      // 12px
        sm: ['0.875rem', { lineHeight: '1.6' }],     // 14px
        base: ['1rem', { lineHeight: '1.6' }],       // 16px
        lg: ['1.125rem', { lineHeight: '1.7' }],     // 18px
        xl: ['1.25rem', { lineHeight: '1.5' }],      // 20px
        '2xl': ['1.5rem', { lineHeight: '1.4' }],    // 24px
        '3xl': ['1.875rem', { lineHeight: '1.3' }],  // 30px
        '4xl': ['2.25rem', { lineHeight: '1.2' }],   // 36px
        '5xl': ['3rem', { lineHeight: '1.1' }],      // 48px
        '6xl': ['3.75rem', { lineHeight: '1.1' }],   // 60px
      },
      spacing: {
        // Tailwind default (4px base) is perfect
      },
    },
  },
  plugins: [],
}
```

### Core Components

**Button Component**

```typescript
// packages/ui/components/button.tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary-500 text-white hover:bg-primary-600",
        secondary: "bg-neutral-100 text-neutral-900 hover:bg-neutral-200",
        outline: "border-2 border-primary-500 text-primary-700 hover:bg-primary-50",
      },
      size: {
        default: "h-12 px-6 py-3",     // 48px height (touch-friendly)
        lg: "h-14 px-8 py-4 text-lg",  // 56px height
        xl: "h-16 px-10 py-5 text-xl", // 64px height (hero CTAs)
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

**Usage:**
```tsx
import { Button } from '@anywhere/ui/components/button'

<Button size="xl">Get Started</Button>
<Button variant="outline">Learn More</Button>
```

**Flip Card Component**

```typescript
// packages/ui/components/flip-card.tsx
import * as React from "react"
import { cn } from "../lib/utils"

export interface FlipCardProps {
  frontImage: string
  frontAlt: string
  backImage: string
  backAlt: string
  title: string
  description?: string
  className?: string
}

export function FlipCard({
  frontImage,
  frontAlt,
  backImage,
  backAlt,
  title,
  description,
  className,
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = React.useState(false)

  return (
    <div
      className={cn(
        "group perspective-1000 w-full aspect-square cursor-pointer",
        className
      )}
      onClick={() => setIsFlipped(!isFlipped)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setIsFlipped(!isFlipped)
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Flip card to see ${isFlipped ? 'before' : 'after'}`}
    >
      <div
        className={cn(
          "relative w-full h-full transition-transform duration-600 transform-style-3d",
          isFlipped && "rotate-y-180"
        )}
      >
        {/* Front (Before) */}
        <div className="absolute inset-0 backface-hidden">
          <img
            src={frontImage}
            alt={frontAlt}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-neutral-900/80 p-4">
            <span className="text-white font-semibold">Before</span>
          </div>
        </div>

        {/* Back (After) */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <img
            src={backImage}
            alt={backAlt}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-primary-600/90 p-4">
            <span className="text-white font-semibold">{title}</span>
            {description && (
              <p className="text-white/90 text-sm mt-1">{description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
```

**Usage:**
```tsx
import { FlipCard } from '@anywhere/ui/components/flip-card'

<FlipCard
  frontImage="/before-maryjane.jpg"
  frontAlt="Before: outdated website"
  backImage="/after-maryjane.jpg"
  backAlt="After: beautiful new website"
  title="Mary Jane's Campground"
  description="60% increase in online bookings"
/>
```

---

## Authentication & Authorization

### Magic Link Authentication (Supabase)

**Setup:**

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Send magic link
export async function sendMagicLink(email: string) {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/admin`,
    },
  })

  if (error) throw error
  return { success: true }
}

// Get current session
export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

// Sign out
export async function signOut() {
  await supabase.auth.signOut()
}
```

**Middleware (Route Protection):**

```typescript
// apps/templates/campground/middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protect /admin routes
  if (req.nextUrl.pathname.startsWith('/admin') && !session) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*'],
}
```

**Login Page:**

```tsx
// apps/templates/campground/app/login/page.tsx
'use client'

import { useState } from 'react'
import { sendMagicLink } from '@/lib/supabase'
import { Button } from '@anywhere/ui/components/button'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      await sendMagicLink(email)
      setSent(true)
    } catch (error) {
      console.error('Error sending magic link:', error)
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-neutral-50 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Check your email</h1>
        <p className="text-neutral-700">
          We sent a magic link to <strong>{email}</strong>.
          Click the link to log in.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-neutral-50 rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Log in to your admin panel</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="you@example.com"
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Sending...' : 'Send magic link'}
        </Button>
      </form>
    </div>
  )
}
```

---

## Content Management

### Sanity.io Configuration

**Schema Definition:**

```typescript
// apps/templates/campground/sanity/schemas/campground.ts
export default {
  name: 'campground',
  title: 'Campground',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Campground Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'hours',
      title: 'Operating Hours',
      type: 'object',
      fields: [
        { name: 'open', type: 'string', title: 'Opening Time' },
        { name: 'close', type: 'string', title: 'Closing Time' },
        { name: 'seasonal', type: 'boolean', title: 'Seasonal Hours?' },
      ],
    },
    {
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Amenity Name' },
            { name: 'icon', type: 'string', title: 'Icon Name' },
          ],
        },
      ],
    },
    {
      name: 'hero',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: 'gallery',
      title: 'Photo Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt text' },
            { name: 'caption', type: 'string', title: 'Caption' },
          ],
        },
      ],
    },
    {
      name: 'about',
      title: 'About',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
}
```

**Sanity Client:**

```typescript
// lib/sanity.ts
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true, // Enable CDN for faster reads
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Fetch campground data
export async function getCampground() {
  return client.fetch(`*[_type == "campground"][0]{
    name,
    slug,
    hours,
    amenities,
    hero,
    gallery,
    about
  }`)
}
```

**Usage in Next.js:**

```tsx
// apps/templates/campground/app/page.tsx
import { getCampground } from '@/lib/sanity'
import { urlFor } from '@/lib/sanity'

export default async function HomePage() {
  const campground = await getCampground()

  return (
    <main>
      <section className="relative h-screen">
        <img
          src={urlFor(campground.hero).width(1920).height(1080).url()}
          alt={campground.hero.alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-6xl font-bold text-white mb-6">
            {campground.name}
          </h1>
        </div>
      </section>
    </main>
  )
}
```

---

## Database Schema

### Supabase PostgreSQL (Phase 3 - Admin Panels)

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Client sites table
CREATE TABLE client_sites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  domain TEXT UNIQUE NOT NULL,
  template_type TEXT NOT NULL CHECK (template_type IN ('campground', 'winery', 'restaurant')),
  sanity_project_id TEXT,
  sanity_dataset TEXT DEFAULT 'production',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Content versions table (for undo functionality)
CREATE TABLE content_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID REFERENCES client_sites(id) ON DELETE CASCADE,
  content_type TEXT NOT NULL,
  data JSONB NOT NULL,
  version INT NOT NULL,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Media table
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID REFERENCES client_sites(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt_text TEXT,
  width INT,
  height INT,
  file_size INT,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Analytics table (simple metrics)
CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID REFERENCES client_sites(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row-level security
ALTER TABLE client_sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Policies: Clients can only access their own data
CREATE POLICY "Clients can view own site"
  ON client_sites FOR SELECT
  USING (client_id = auth.uid());

CREATE POLICY "Clients can update own site"
  ON client_sites FOR UPDATE
  USING (client_id = auth.uid());

CREATE POLICY "Clients can view own content versions"
  ON content_versions FOR SELECT
  USING (site_id IN (
    SELECT id FROM client_sites WHERE client_id = auth.uid()
  ));

CREATE POLICY "Clients can create content versions"
  ON content_versions FOR INSERT
  WITH CHECK (site_id IN (
    SELECT id FROM client_sites WHERE client_id = auth.uid()
  ));

CREATE POLICY "Clients can view own media"
  ON media FOR SELECT
  USING (site_id IN (
    SELECT id FROM client_sites WHERE client_id = auth.uid()
  ));

CREATE POLICY "Clients can upload media"
  ON media FOR INSERT
  WITH CHECK (site_id IN (
    SELECT id FROM client_sites WHERE client_id = auth.uid()
  ));

CREATE POLICY "Clients can view own analytics"
  ON analytics FOR SELECT
  USING (site_id IN (
    SELECT id FROM client_sites WHERE client_id = auth.uid()
  ));

-- Indexes for performance
CREATE INDEX idx_client_sites_client_id ON client_sites(client_id);
CREATE INDEX idx_content_versions_site_id ON content_versions(site_id);
CREATE INDEX idx_media_site_id ON media(site_id);
CREATE INDEX idx_analytics_site_id ON analytics(site_id);
CREATE INDEX idx_analytics_created_at ON analytics(created_at);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_client_sites_updated_at
  BEFORE UPDATE ON client_sites
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

---

## API Specifications

### Preview URL API

```typescript
// apps/templates/campground/app/api/preview/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'
import { draftMode } from 'next/headers'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const token = searchParams.get('token')
  const clientId = searchParams.get('client')

  if (!token || !clientId) {
    return new NextResponse('Missing parameters', { status: 400 })
  }

  // Verify signed token
  const expectedToken = createHmac('sha256', process.env.PREVIEW_SECRET!)
    .update(clientId)
    .digest('hex')

  if (token !== expectedToken) {
    return new NextResponse('Invalid token', { status: 401 })
  }

  // Enable draft mode (Next.js 13+)
  draftMode().enable()

  // Redirect to homepage
  return NextResponse.redirect(new URL('/', request.url))
}

// Helper function to generate preview link (server-side only)
export function generatePreviewLink(clientId: string) {
  const token = createHmac('sha256', process.env.PREVIEW_SECRET!)
    .update(clientId)
    .digest('hex')

  return `${process.env.NEXT_PUBLIC_APP_URL}/api/preview?client=${clientId}&token=${token}`
}
```

### Revalidation API (ISR)

```typescript
// apps/templates/campground/app/api/revalidate/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidate-secret')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return new NextResponse('Invalid secret', { status: 401 })
  }

  const body = await request.json()
  const { path } = body

  if (!path) {
    return new NextResponse('Missing path', { status: 400 })
  }

  try {
    revalidatePath(path)
    return NextResponse.json({ revalidated: true, path })
  } catch (error) {
    return new NextResponse('Error revalidating', { status: 500 })
  }
}
```

**Sanity Webhook Configuration:**

```
Webhook URL: https://maryjanes-campground.com/api/revalidate
HTTP Method: POST
Headers: x-revalidate-secret: [your-secret]
Trigger: On document publish/unpublish
```

---

## Performance Optimization

### Image Optimization

**Astro:**

```astro
---
// apps/portfolio/src/components/Hero.astro
import { Image } from '@astrojs/image/components';
---

<section class="relative h-screen">
  <Image
    src="/images/rv-mountains.jpg"
    alt="RV in mountain landscape"
    width={1920}
    height={1080}
    format="webp"
    quality={85}
    loading="eager"
    class="absolute inset-0 w-full h-full object-cover"
  />
</section>
```

**Next.js:**

```tsx
// apps/templates/campground/app/page.tsx
import Image from 'next/image'

export default function HomePage() {
  return (
    <section className="relative h-screen">
      <Image
        src="/images/hero.jpg"
        alt="Campground hero"
        fill
        priority
        quality={85}
        className="object-cover"
      />
    </section>
  )
}
```

### Code Splitting

**Astro:**

```javascript
// apps/portfolio/astro.config.mjs
export default defineConfig({
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
    splitting: true,
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
          },
        },
      },
    },
  },
})
```

**Next.js:**

```tsx
// Dynamic imports for heavy components
import dynamic from 'next/dynamic'

const FlipCard = dynamic(() => import('@anywhere/ui/components/flip-card'), {
  loading: () => <div className="animate-pulse bg-neutral-200 aspect-square rounded-lg" />,
})
```

### Font Optimization

```typescript
// apps/portfolio/src/layouts/Layout.astro
---
import '@fontsource/inter/400.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/outfit/600.css'
import '@fontsource/outfit/700.css'
---
```

Or use Google Fonts with `font-display: swap`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Outfit:wght@600;700&display=swap" rel="stylesheet">
```

---

## Deployment Strategy

### Vercel Deployment

**Portfolio Site (Astro):**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd apps/portfolio
vercel --prod
```

**vercel.json:**

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "framework": "astro"
}
```

**Client Sites (Next.js):**

```bash
cd apps/templates/campground
vercel --prod --name maryjanes-campground
```

**Custom Domain:**

```bash
vercel domains add maryjanes-campground.com
```

### Environment Variables

**Portfolio Site:**

```bash
# .env.local
FORMSPREE_FORM_ID=your_form_id
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

**Client Sites:**

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
NEXT_PUBLIC_SANITY_PROJECT_ID=xxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=xxx
PREVIEW_SECRET=xxx
REVALIDATE_SECRET=xxx
NEXT_PUBLIC_APP_URL=https://maryjanes-campground.com
```

**Add to Vercel:**

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
# ... etc
```

### CI/CD Pipeline

**GitHub Actions:**

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'

      - run: pnpm install
      - run: pnpm build
      - run: pnpm test
```

---

## Security Considerations

### Environment Variables

- Never commit `.env` files to Git
- Use `.env.example` for documentation
- Store secrets in Vercel environment variables
- Rotate secrets regularly

### Content Security Policy

```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline';
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https:;
      font-src 'self' data:;
      connect-src 'self' https://*.supabase.co https://*.sanity.io;
    `.replace(/\s{2,}/g, ' ').trim()
  },
]

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}
```

### Rate Limiting

```typescript
// middleware.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
})

export async function middleware(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1'
  const { success } = await ratelimit.limit(ip)

  if (!success) {
    return new NextResponse('Too many requests', { status: 429 })
  }

  return NextResponse.next()
}
```

---

## Development Workflow

### Local Development

```bash
# Install dependencies
pnpm install

# Run portfolio site
cd apps/portfolio
pnpm dev

# Run client template
cd apps/templates/campground
pnpm dev

# Run all apps (Turborepo)
pnpm dev
```

### Turborepo Configuration

```json
// turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "outputs": []
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": []
    }
  }
}
```

### Git Workflow

```bash
# Feature branch
git checkout -b feature/flip-card-component

# Commit with conventional commits
git commit -m "feat(ui): add flip card component"

# Push and create PR
git push origin feature/flip-card-component
```

### Testing Strategy

**Unit Tests (Vitest):**

```typescript
// packages/ui/components/__tests__/button.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from '../button'

describe('Button', () => {
  it('renders with default variant', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('applies size variant', () => {
    render(<Button size="xl">Large button</Button>)
    const button = screen.getByText('Large button')
    expect(button).toHaveClass('h-16')
  })
})
```

**E2E Tests (Playwright):**

```typescript
// apps/portfolio/tests/contact-form.spec.ts
import { test, expect } from '@playwright/test'

test('contact form submission', async ({ page }) => {
  await page.goto('/')

  await page.fill('input[name="name"]', 'Mary Jane')
  await page.selectOption('select[name="business"]', 'Campground')
  await page.fill('input[name="location"]', 'Oregon')
  await page.fill('textarea[name="message"]', 'I need a website!')

  await page.click('button[type="submit"]')

  await expect(page.locator('text=Thanks! We\'ll reach out')).toBeVisible()
})
```

---

## Next Steps for Development

### Phase 1: Foundation (Week 1)

1. **Initialize monorepo**
   ```bash
   pnpm create turbo@latest
   ```

2. **Set up Astro project**
   ```bash
   cd apps/portfolio
   pnpm create astro@latest
   ```

3. **Install dependencies**
   ```bash
   pnpm add -D tailwindcss @astrojs/tailwind
   pnpm add @fontsource/inter @fontsource/outfit
   ```

4. **Configure Tailwind**
   - Copy design tokens from this document
   - Set up `tailwind.config.js`

5. **Build first component (Button)**
   - Create `packages/ui/components/button.tsx`
   - Test in Astro

### Phase 2: Portfolio Site (Weeks 2-4)

1. **Hero section**
2. **Services overview**
3. **Portfolio showcase**
4. **Pricing tiers**
5. **Contact form**
6. **About page**

### Phase 3: Client Template (Weeks 5-8)

1. **Next.js setup**
2. **Sanity integration**
3. **Supabase auth**
4. **Admin panel**

---

## Architecture Decisions (Confirmed)

**Decision Date:** December 4, 2025

1. **Monorepo:** ❌ **Keep it simple** - Single repo, no Turborepo
   - Rationale: Solo developer, MVP scope, avoid complexity
   - Structure: Separate repos for portfolio and client templates
   - Can migrate to monorepo later if needed

2. **CMS:** ⏸️ **Defer to Phase 3** - No Sanity.io for MVP
   - Rationale: Portfolio site is static, client templates come later
   - MVP: Hardcode content in Astro components
   - Phase 3: Add Sanity when building client templates

3. **Auth:** ✅ **Supabase** - Magic link authentication
   - Rationale: Free tier, simple setup, no password management
   - Implementation: Magic links only (no social login)
   - Deferred to Phase 3 (admin panels)

4. **Deployment:** ✅ **Vercel** - Edge deployment
   - Rationale: Zero config, automatic HTTPS, global CDN
   - Portfolio site: Astro on Vercel Edge
   - Client sites: Next.js on Vercel (Phase 3)

---

## Simplified Architecture for MVP

Based on decisions above, here's the **simplified architecture** for Phase 1-2 (Portfolio Site):

```
anywheresoftware-portfolio/          # Single repo (not monorepo)
├── src/
│   ├── components/
│   │   ├── Button.astro             # Custom components
│   │   ├── Hero.astro
│   │   ├── Services.astro
│   │   ├── Portfolio.astro
│   │   ├── FlipCard.astro
│   │   ├── PricingCard.astro
│   │   └── ContactForm.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro              # Homepage
│   │   ├── portfolio.astro          # Portfolio page
│   │   └── about.astro              # About page
│   └── styles/
│       └── global.css
├── public/
│   ├── images/
│   └── fonts/
├── astro.config.mjs
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── .env.example
```

**No monorepo packages, no shared components (yet).** Build everything in one Astro project.

**Phase 3 (Client Templates):** Create separate Next.js repos when needed.

---

## Updated Development Roadmap

### Phase 1: Portfolio Site Setup (Week 1)

**Day 1-2: Project Initialization**
```bash
# Create Astro project
npm create astro@latest anywheresoftware-portfolio
cd anywheresoftware-portfolio

# Install dependencies
npm install -D tailwindcss @astrojs/tailwind
npx tailwindcss init

# Install fonts
npm install @fontsource/inter @fontsource/outfit

# Install form library
npm install @formspree/react
```

**Day 3-4: Design System Setup**
- Configure Tailwind with mountains & pine trees palette
- Import fonts (Inter, Outfit)
- Create base Layout.astro
- Build Button component (test design tokens)

**Day 5: Deploy Test**
```bash
# Deploy to Vercel
npm install -g vercel
vercel
```

### Phase 2: Portfolio Site Build (Weeks 2-4)

**Week 2: Homepage Core**
- Hero section (full-width RV/mountain image)
- Services overview (3-column grid)
- Contact form (Formspree integration)

**Week 3: Portfolio & Pricing**
- Portfolio showcase (flip cards)
- Pricing tiers (3 cards)
- RV model story section

**Week 4: Polish & Launch**
- About page
- Micro-interactions (parallax, fade-ins)
- Accessibility audit
- Performance optimization (Lighthouse 90+)
- **Launch:** anywheresoftware.com

### Phase 3: Client Templates (Deferred)

**When you have 5 paying clients:**
- Create separate Next.js repo for first client template
- Add Sanity.io CMS
- Add Supabase auth for admin panel
- Deploy to custom domain

---

## Immediate Next Steps

**Ready to start building?** Here's what to do:

1. **Create Astro project**
   ```bash
   npm create astro@latest anywheresoftware-portfolio
   cd anywheresoftware-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install -D tailwindcss @astrojs/tailwind
   npm install @fontsource/inter @fontsource/outfit
   npm install @formspree/react
   ```

3. **Configure Tailwind**
   - Copy design tokens from UX spec
   - Set up `tailwind.config.js`

4. **Build first component**
   - Create `src/components/Button.astro`
   - Test with mountains & pine trees colors

5. **Deploy to Vercel**
   ```bash
   vercel
   ```

---

**Document Status:** ✅ Complete and ready for development

**Architecture Decisions:** ✅ Confirmed (Simple, Deferred CMS, Supabase, Vercel)

**Next Action:** Initialize Astro project and start building 🚀
