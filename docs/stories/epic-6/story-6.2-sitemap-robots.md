---
epic: Epic 6 - SEO & Performance Optimization
story: Story 6.2
title: Add Sitemap and Robots.txt
status: ready
points: 2
prerequisites: Story 6.1 complete
---

# Story 6.2: Add Sitemap and Robots.txt

## User Story

**As a** search engine crawler
**I want** to discover all pages efficiently
**So that** I can index the site properly

## Acceptance Criteria

**Given** I am a search engine crawler
**When** I visit /sitemap.xml
**Then** I see an XML sitemap with:
- All public pages (homepage, about, portfolio, portfolio items)
- Last modified dates
- Priority values (homepage: 1.0, main pages: 0.9, portfolio items: 0.6)
- Change frequency hints

**And** when I visit /robots.txt
**Then** I see crawl directives:
- Allow all pages (User-agent: *)
- Sitemap location
- Disallow staging/test paths (if any)

**And** sitemap is dynamic:
- Fetches portfolio items from content collections
- Uses actual last modified dates
- Strategic priority values

## Technical Implementation

### Dynamic Sitemap

```typescript
// src/pages/sitemap.xml.ts
import type { APIRoute } from 'astro';
import { portfolioItems } from '../data/portfolio';

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site || 'https://anywheresoftware.com';

  // Static pages with strategic priorities
  const staticPages = [
    { url: '', priority: 1.0, changefreq: 'weekly', lastmod: new Date() },
    { url: 'about', priority: 0.9, changefreq: 'monthly', lastmod: new Date() },
    { url: 'portfolio', priority: 0.9, changefreq: 'weekly', lastmod: new Date() },
  ];

  // Dynamic portfolio items
  const portfolioPages = portfolioItems.map(item => ({
    url: `portfolio/${item.id}`,
    priority: 0.6,
    changefreq: 'monthly',
    lastmod: item.launchDate
  }));

  const pages = [...staticPages, ...portfolioPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${siteUrl}/${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${page.lastmod.toISOString()}</lastmod>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
```

### Robots.txt

```txt
// public/robots.txt
User-agent: *
Allow: /

# Sitemap location
Sitemap: https://anywheresoftware.com/sitemap.xml

# Disallow staging/test paths (if any)
# Disallow: /staging/
# Disallow: /test/
```

### Astro Config (Add Sitemap Integration)

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://anywheresoftware.com',
  integrations: [
    tailwind(),
    sitemap()
  ]
});
```

## Validation Steps

1. Create sitemap.xml.ts - file created
2. Create robots.txt - file created
3. Run `npm run build` - sitemap generated
4. Visit /sitemap.xml - XML displays correctly
5. Visit /robots.txt - directives correct
6. Check portfolio items - dynamically included
7. Validate XML - no syntax errors
8. Submit to Google Search Console

## References

- **PRD:** FR5 (search discoverability)
- **Technical Architecture:** Lines 1400-1450 (SEO strategy)
- **UX Design Spec:** N/A (SEO story)

## Prerequisites

Story 6.1 complete

## Story Points

2 points

## Notes

- Dynamic sitemap updates automatically with new portfolio items
- Priority values guide search engines on page importance
- Cache-Control header improves performance
- Sitemap integration simplifies generation
