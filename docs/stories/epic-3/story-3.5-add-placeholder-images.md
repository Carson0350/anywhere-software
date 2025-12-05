---
epic: Epic 3 - Portfolio Showcase & Case Studies
story: Story 3.5
title: Add Placeholder Portfolio Images
status: ready
points: 3
prerequisites: Story 3.4 complete
---

# Story 3.5: Add Placeholder Portfolio Images

## User Story

**As a** developer
**I want** placeholder images for portfolio items
**So that** the portfolio section looks complete during MVP

## Acceptance Criteria

**Given** I need portfolio images for MVP
**When** I add placeholder images
**Then** I have before/after images for:
- Mary Jane's Campground (2 images: before, after)
- Sunset Valley Winery (2 images: before, after)
- Farm Table Restaurant (2 images: before, after)

**And** images are optimized:
- Format: WebP with JPEG fallback (via Astro Image component)
- Size: < 500KB each
- Dimensions: 1:1 aspect ratio (1000x1000px recommended)
- Alt text descriptive and specific

**And** images are sourced ethically:
- Use Unsplash for placeholder images (development only)
- Credit photographers in image metadata
- **CRITICAL:** Watermark placeholder images with "Example Design"
- Add disclaimer: "Portfolio examples shown with placeholder images. Real client sites coming soon."
- Replace with actual client screenshots before public launch
- Legal compliance: Do not misrepresent placeholder images as real client work

**And** disclaimer is visible on portfolio pages:
- Homepage portfolio section
- Dedicated portfolio page
- Small text, not intrusive
- Clear that these are examples

## Technical Implementation

### Option 1: Download from Unsplash (Recommended)

```bash
# 1. Visit unsplash.com
# 2. Search for relevant images:
#    - "campground website" or "rv park"
#    - "winery website" or "vineyard"
#    - "restaurant website" or "farm to table"
# 3. Download high-quality images (1000x1000px or larger)
# 4. Add watermark using ImageMagick or Photoshop

# Add watermark with ImageMagick:
convert input.jpg \
  -pointsize 60 \
  -fill 'rgba(255,255,255,0.5)' \
  -gravity center \
  -annotate +0+0 'Example Design' \
  output.jpg

# Or use online tool: watermarkly.com
```

### Option 2: Create Mockup Screenshots

```bash
# 1. Use Figma/Canva to create before/after mockups
# 2. Export as 1000x1000px JPG/PNG
# 3. Add "Example Design" watermark
# 4. Optimize with Astro Image component
```

### Option 3: Use Solid Color Placeholders

```bash
# Create simple colored squares with text overlay
# Replace with real screenshots when available

# Use placeholder.com or create in Figma
# Example: https://via.placeholder.com/1000x1000/047857/ffffff?text=Before
```

### Add Images to Project

```bash
# Create directory structure
mkdir -p public/images/portfolio

# Add images:
# - maryjane-before.jpg
# - maryjane-after.jpg
# - winery-before.jpg
# - winery-after.jpg
# - restaurant-before.jpg
# - restaurant-after.jpg
```

### Add Disclaimer to Components

```astro
---
// Add to src/components/Portfolio.astro (homepage section)
---
<section id="portfolio" class="py-24 bg-white">
  <!-- ... existing content ... -->

  <p class="text-sm text-neutral-500 text-center mt-8">
    * Portfolio examples shown with placeholder images. Real client sites coming soon.
  </p>
</section>
```

```astro
---
// Add to src/pages/portfolio.astro
---
<main class="py-24">
  <div class="max-w-7xl mx-auto px-4">
    <!-- ... existing content ... -->

    <p class="text-sm text-neutral-500 text-center mt-12">
      * Portfolio examples shown with placeholder images. Real client sites coming soon.
    </p>
  </div>
</main>
```

## Image Specifications

### Mary Jane's Campground
- **Before:** Outdated website screenshot (or mockup)
  - File: `public/images/portfolio/maryjane-before.jpg`
  - Alt: "Before: Mary Jane's Campground outdated website"
  - Watermark: "Example Design"
- **After:** Modern website screenshot (or mockup)
  - File: `public/images/portfolio/maryjane-after.jpg`
  - Alt: "After: Mary Jane's Campground modern website"
  - Watermark: "Example Design"

### Sunset Valley Winery
- **Before:** Outdated website screenshot (or mockup)
  - File: `public/images/portfolio/winery-before.jpg`
  - Alt: "Before: Sunset Valley Winery outdated website"
  - Watermark: "Example Design"
- **After:** Modern website screenshot (or mockup)
  - File: `public/images/portfolio/winery-after.jpg`
  - Alt: "After: Sunset Valley Winery modern website"
  - Watermark: "Example Design"

### Farm Table Restaurant
- **Before:** Outdated website screenshot (or mockup)
  - File: `public/images/portfolio/restaurant-before.jpg`
  - Alt: "Before: Farm Table Restaurant outdated website"
  - Watermark: "Example Design"
- **After:** Modern website screenshot (or mockup)
  - File: `public/images/portfolio/restaurant-after.jpg`
  - Alt: "After: Farm Table Restaurant modern website"
  - Watermark: "Example Design"

## Validation Steps

1. Add all 6 images to `public/images/portfolio/` - images present
2. Check file sizes - all < 500KB
3. Check dimensions - 1:1 aspect ratio
4. Check watermarks - "Example Design" visible on all
5. Test in browser - images load correctly
6. Check alt text - descriptive and specific
7. Verify disclaimers - visible on both pages
8. Test Astro Image optimization - WebP format generated

## References

- **PRD:** FR2 (portfolio case studies)
- **Technical Architecture:** Lines 400-450 (Image optimization)
- **UX Design Spec:** Lines 2209-2230 (Portfolio images)

## Prerequisites

Story 3.4 complete

## Story Points

3 points

## Notes

- **CRITICAL:** Watermark all placeholder images
- Replace with real client screenshots before public launch
- Credit Unsplash photographers if using their images
- Consider creating custom mockups for more control
- Astro Image component handles WebP conversion automatically
- Keep file sizes small for performance
