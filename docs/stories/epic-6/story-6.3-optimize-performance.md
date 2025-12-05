---
epic: Epic 6 - SEO & Performance Optimization
story: Story 6.3
title: Optimize Performance (Lighthouse Score 90+)
status: ready
points: 3
prerequisites: Story 6.2 complete
---

# Story 6.3: Optimize Performance (Lighthouse Score 90+)

## User Story

**As a** visitor on a slow connection
**I want** pages to load quickly
**So that** I don't abandon the site

## Acceptance Criteria

**Given** I run Lighthouse on any page
**When** the audit completes
**Then** I see scores of 90+ in all categories:
- **Performance:** 90+ (desktop), 85+ (mobile)
- **Accessibility:** 100
- **Best Practices:** 95+
- **SEO:** 90+

**And** Core Web Vitals are optimized:
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

**And** performance optimizations are applied:
- Images lazy-loaded (except above-the-fold)
- Images optimized (WebP with fallbacks)
- CSS minified and inlined for critical path
- JavaScript deferred or async
- Fonts preloaded and subset
- Resource hints (preload, preconnect, prefetch)

**And** performance budget is enforced:
- Total page weight: < 500 KB
- JavaScript: < 150 KB
- Images: < 200 KB
- CSS: < 50 KB
- Fonts: < 100 KB
- Max requests: 30

## Technical Implementation

### Resource Hints in Layout

```astro
---
// src/layouts/Layout.astro (add to <head>)
---
<head>
  <!-- Preload critical fonts -->
  <link
    rel="preload"
    href="/fonts/inter-var.woff2"
    as="font"
    type="font/woff2"
    crossorigin
  />

  <!-- Preconnect to external domains -->
  <link rel="preconnect" href="https://formspree.io" />
  <link rel="dns-prefetch" href="https://formspree.io" />

  <!-- Prefetch next likely page -->
  <link rel="prefetch" href="/about" />

  <!-- Critical CSS inlined -->
  <style is:inline>
    /* Critical above-the-fold styles */
    body { margin: 0; font-family: system-ui, sans-serif; }
    .hero { min-height: 100vh; }
  </style>
</head>
```

### Lazy Loading Strategy

```astro
---
// Image component with lazy loading
import { Image } from 'astro:assets';

interface Props {
  src: any;
  alt: string;
  isAboveFold?: boolean;
}

const { src, alt, isAboveFold = false } = Astro.props;
---

<Image
  src={src}
  alt={alt}
  loading={isAboveFold ? "eager" : "lazy"}
  decoding={isAboveFold ? "sync" : "async"}
  fetchpriority={isAboveFold ? "high" : "auto"}
  format="webp"
  quality={85}
/>
```

### Astro Config Optimizations

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://anywheresoftware.com',
  integrations: [tailwind(), sitemap()],
  build: {
    inlineStylesheets: 'auto',
    assets: '_astro',
  },
  image: {
    domains: [],
  },
  vite: {
    build: {
      cssCodeSplit: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info']
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['astro/components']
          }
        }
      }
    },
    ssr: {
      noExternal: ['@astrojs/image']
    }
  },
  compressHTML: true,
  scopedStyleStrategy: 'class'
});
```

### Performance Budget

```json
// performance-budget.json
{
  "timings": {
    "firstContentfulPaint": 1800,
    "largestContentfulPaint": 2500,
    "timeToInteractive": 3800,
    "totalBlockingTime": 300
  },
  "resourceSizes": {
    "total": 500,
    "script": 150,
    "image": 200,
    "stylesheet": 50,
    "font": 100
  },
  "resourceCounts": {
    "total": 30,
    "script": 10,
    "image": 15
  }
}
```

## Validation Steps

```bash
# Build and serve
npm run build
npx serve dist

# Run Lighthouse audit
npx lighthouse http://localhost:3000 --view

# Target scores:
# Performance: 90+ (desktop), 85+ (mobile)
# Accessibility: 100
# Best Practices: 95+
# SEO: 90+

# Check Core Web Vitals:
# LCP < 2.5s
# FID < 100ms
# CLS < 0.1
```

## References

- **PRD:** FR6 (mobile performance)
- **Technical Architecture:** Lines 1200-1250 (Performance optimization)
- **UX Design Spec:** Lines 2400-2450 (Performance targets)

## Prerequisites

Story 6.2 complete

## Story Points

3 points

## Notes

- Lazy loading improves initial page load
- Resource hints reduce latency
- Performance budget prevents regressions
- Terser minification reduces bundle size
- Critical CSS inlining improves FCP
