---
epic: Epic 6 - SEO & Performance Optimization
story: Story 6.1
title: Add SEO Meta Tags and Open Graph
status: ready
points: 3
prerequisites: Epic 5 complete
---

# Story 6.1: Add SEO Meta Tags and Open Graph

## User Story

**As a** visitor sharing the site on social media
**I want** to see rich previews with images and descriptions
**So that** I'm more likely to click through

## Acceptance Criteria

**Given** I am on any page
**When** I view the page source
**Then** I see complete SEO meta tags:
- **Title tag:** Page-specific, < 60 characters
- **Meta description:** Page-specific, < 160 characters
- **Canonical URL:** Prevents duplicate content issues
- **Robots meta:** Allows indexing (or blocks for staging)

**And** I see Open Graph tags for social sharing:
- **og:title, og:description, og:image** (1200x630px)
- **og:url, og:type, og:site_name**

**And** I see Twitter Card tags:
- **twitter:card:** summary_large_image
- **twitter:title, twitter:description, twitter:image**

**And** I see mobile-specific optimizations:
- **viewport-fit:** cover (for iOS notch)
- **theme-color:** Browser chrome color
- **apple-mobile-web-app** tags

**And** I see complete favicon set:
- SVG favicon, PNG favicons (32x32, 16x16)
- Apple Touch Icon (180x180), Web manifest

## Technical Implementation

```astro
---
// src/layouts/Layout.astro
interface Props {
  title: string;
  description: string;
  image?: string;
  canonical?: string;
}

const {
  title,
  description,
  image = '/images/og-default.jpg',
  canonical = Astro.url.pathname
} = Astro.props;

const siteUrl = 'https://anywheresoftware.com';
const fullTitle = title.includes('AnywhereSoftware') ? title : `${title} | AnywhereSoftware`;
const canonicalUrl = new URL(canonical, siteUrl).href;
const ogImage = new URL(image, siteUrl).href;
---
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />

    <!-- SEO Meta Tags -->
    <title>{fullTitle}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonicalUrl} />
    <meta name="robots" content="index, follow" />

    <!-- Open Graph -->
    <meta property="og:title" content={fullTitle} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={ogImage} />
    <meta property="og:url" content={canonicalUrl} />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="AnywhereSoftware" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={fullTitle} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={ogImage} />

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />

    <!-- Mobile optimizations -->
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="AnywhereSoftware" />
    <meta name="theme-color" content="#047857" media="(prefers-color-scheme: light)" />
    <meta name="theme-color" content="#065f46" media="(prefers-color-scheme: dark)" />

    <slot name="head" />
  </head>
  <body>
    <slot />
  </body>
</html>
```

## Keyword-Optimized Meta Descriptions

```
Homepage: "Mobile web design consultant who travels to you. I build beautiful websites for rural businesses—campgrounds, wineries, restaurants. On-site service in the Pacific Northwest." (158 chars)

About: "Meet Carson, the web consultant who lives in an RV and travels to rural businesses. Face-to-face service, modern technology, no remote confusion." (152 chars)

Portfolio: "See websites I've built for campgrounds, wineries, and rural businesses across the Pacific Northwest. 50+ sites, 100% on-site service." (139 chars)
```

## Content Needed

- [ ] Social share images for each page (1200x630px)
- [ ] Favicon files (SVG, PNG 32x32, PNG 16x16, Apple Touch Icon 180x180)
- [ ] Web manifest file (site.webmanifest)

## Validation Steps

1. Update Layout component - meta tags added
2. Test title tags - < 60 characters
3. Test meta descriptions - < 160 characters
4. Test Open Graph - preview on Facebook/LinkedIn
5. Test Twitter Cards - preview on Twitter
6. Test favicons - display correctly in browsers
7. Test mobile - theme-color works

## References

- **PRD:** FR5 (search discoverability)
- **Technical Architecture:** Lines 1400-1450 (SEO strategy)
- **UX Design Spec:** N/A (SEO story)

## Prerequisites

Epic 5 complete

## Story Points

3 points

## Notes

- Social share images improve click-through rates
- Complete favicon set ensures brand consistency
- Mobile optimizations improve iOS experience
- Keyword-optimized descriptions improve SEO
