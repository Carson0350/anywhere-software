---
epic: Epic 5 - About Page & Brand Story
story: Story 5.1
title: Build About Page Hero Section
status: ready
points: 3
prerequisites: Epic 4 complete
---

# Story 5.1: Build About Page Hero Section

## User Story

**As a** visitor
**I want** to learn about Carson and his mobile consulting approach
**So that** I understand what makes AnywhereSoftware different

## Acceptance Criteria

**Given** I navigate to /about
**When** the page loads
**Then** I see a hero section with:
- **Headline:** "The Only Web Consultant Who Travels to You"
- **Subheadline:** "I live in an RV and meet clients on-site. Face-to-face consulting for campgrounds, wineries, and rural businesses."
- **Hero image:** Carson with RV at scenic rural location
- **CTA button:** "See How It Works" (scrolls to #process)

**And** hero section is responsive:
- Desktop: Image on right, text on left (60/40 split)
- Tablet: Image on top, text below
- Mobile: Stacked layout, full-width image

**And** hero includes trust signal:
- Badge/text: "Serving rural businesses across the Pacific Northwest"

**And** image is optimized:
- WebP format with JPEG fallback
- Quality: 85
- Blur placeholder while loading

## Technical Implementation

```astro
---
// src/pages/about.astro
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import { Image } from 'astro:assets';
import heroImage from '../assets/images/carson-rv-hero.jpg';
---
<Layout
  title="About AnywhereSoftware - Mobile Web Design Consultant"
  description="Carson travels in an RV to meet rural businesses on-site. Face-to-face web design and consulting for campgrounds, wineries, and rural hospitality."
>
  <Header />
  <main id="main">
    <section class="py-24 bg-neutral-50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <!-- Trust signal -->
            <p class="text-sm font-semibold text-primary-600 mb-4">
              Serving rural businesses across the Pacific Northwest
            </p>

            <h1 class="text-5xl font-bold font-heading text-neutral-900 mb-6">
              The Only Web Consultant Who Travels to You
            </h1>
            <p class="text-xl text-neutral-700 mb-8 leading-relaxed">
              I live in an RV and meet clients on-site. Face-to-face consulting for
              campgrounds, wineries, and rural businesses.
            </p>

            <a
              href="#process"
              class="inline-block px-8 py-4 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors"
            >
              See How It Works
            </a>
          </div>

          <div>
            <Image
              src={heroImage}
              alt="Carson with RV at a rural campground"
              class="rounded-lg shadow-lg"
              width={600}
              height={400}
              loading="eager"
              format="webp"
              quality={85}
              placeholder="blur"
            />
          </div>
        </div>
      </div>
    </section>
  </main>
  <Footer />
</Layout>
```

## Validation Steps

1. Create /about page - page renders
2. Test responsive layout - 2 columns desktop, stacked mobile
3. Test CTA button - scrolls to #process
4. Check image optimization - WebP format
5. Test trust signal - displays correctly
6. Check accessibility - h1 present, semantic HTML
7. Test on mobile - full-width image, readable text

## References

- **PRD:** Lines 158-165 (Discovery stage), Lines 1-50 (Executive Summary)
- **Technical Architecture:** Lines 400-450 (Image optimization)
- **UX Design Spec:** Lines 1634-1650 (About page design)

## Prerequisites

Epic 4 complete

## Story Points

3 points

## Notes

- Placeholder image can be replaced with real Carson + RV photo
- Consider A/B testing headline variations
- Trust signal builds credibility immediately
- Smooth scroll to #process enhances UX
