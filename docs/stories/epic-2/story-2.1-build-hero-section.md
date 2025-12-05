---
epic: Epic 2 - Portfolio Site Homepage
story: Story 2.1
title: Build Hero Section with Image Optimization
status: ready
points: 3
prerequisites: Story 1.5 complete
---

# Story 2.1: Build Hero Section with Image Optimization

## User Story

**As a** visitor on desktop
**I want** to see a hero section with RV/mountain imagery
**So that** I can quickly understand the unique value proposition

## Acceptance Criteria

**Given** I am on desktop (> 1024px)
**When** I load the homepage
**Then** hero section is displayed with:
- Background: bg-neutral-50
- RV/mountain image: src/assets/rv-mountains.jpg
- Image optimization:
  - WebP format with JPEG fallback
  - Optimized for < 500KB file size
  - Alt text: "RV in mountain landscape"
  - Width/height attributes for layout stability (1920x1080)
- Headline: "AnywhereSoftware"
- Tagline: "Beautiful websites, delivered anywhere"
- CTA button: "Get Started"

**And** hero image loads with progressive enhancement:
- Blur-up technique (tiny blurred placeholder → sharp image)
- Duration: 300ms
- Easing: ease-out

**And** accessibility requirements met:
- Heading hierarchy starts with h1
- Sufficient color contrast (4.5:1 minimum)
- Keyboard navigable (Tab to CTA button)
- Focus ring visible on CTA

## Technical Implementation

```astro
---
// src/components/Hero.astro
import { Image } from 'astro:assets';
import Button from './Button.astro';
import heroImage from '../assets/rv-mountains.jpg';
---
<section class="relative h-screen">
  <Image
    src={heroImage}
    alt="RV in mountain landscape"
    class="absolute inset-0 w-full h-full object-cover"
    loading="eager"
    format="webp"
    quality={85}
    widths={[640, 1024, 1920]}
    sizes="100vw"
    placeholder="blur"
  />
  <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
    <div class="text-center text-white">
      <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold font-heading mb-6">
        AnywhereSoftware
      </h1>
      <p class="text-2xl md:text-3xl font-semibold mb-12">
        Beautiful websites, delivered anywhere
      </p>
      <Button size="xl" href="#contact">Get Started</Button>
    </div>
  </div>
</section>
```

## Validation Steps

1. Create `src/assets/rv-mountains.jpg` - placeholder image (1920x1080)
2. Run `npm run dev` - hero section renders
3. Check image format - WebP with JPEG fallback
4. Check image size - < 500KB
5. Check accessibility - h1 present, contrast 4.5:1+
6. Test keyboard navigation - Tab to CTA button works
7. Test responsive - works on mobile, tablet, desktop

## References

- **PRD:** FR1 (service offerings), FR6 (mobile optimized)
- **Technical Architecture:** Lines 400-450 (Image optimization)
- **UX Design Spec:** Lines 2050-2100 (Hero section), User Journey 1

## Prerequisites

Story 1.5 complete

## Story Points

3 points

## Notes

- Use Astro's built-in Image component for optimization
- Placeholder image can be replaced with real RV/mountain photo later
- Hero section is the first impression - make it count!
- Ensure text is readable over image (use overlay if needed)
