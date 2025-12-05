---
epic: Epic 3 - Portfolio Showcase & Case Studies
story: Story 3.1a
title: Build Basic Flip Card Component (No JavaScript)
status: ready
points: 3
prerequisites: Epic 2 complete
---

# Story 3.1a: Build Basic Flip Card Component (No JavaScript)

## User Story

**As a** visitor on desktop
**I want** to see before/after transformations on hover
**So that** I can visualize the quality of work AnywhereSoftware delivers

## Acceptance Criteria

**Given** I am viewing the portfolio section
**When** I interact with a flip card
**Then** I see a flip card with:
- **Front (Before):** Outdated website screenshot
- **Back (After):** Beautiful new website screenshot
- **Flip trigger:** Hover (desktop only in this story)
- **Animation:** 600ms 3D flip (rotateY 180deg)
- **Aspect ratio:** 1:1 square (aspect-square)

**And** each card displays:
- **Front overlay:** "Before" label (bg-neutral-900/80, text-white)
- **Back overlay:** Client name + result metric (bg-primary-600/90, text-white)
  - Example: "Mary Jane's Campground - 60% increase in bookings"

**And** flip card works on desktop:
- Desktop (1024px+): Hover to flip (CSS only, no JavaScript)
- Maintains 1:1 aspect ratio
- Smooth 600ms transition

**And** CSS is properly configured:
- Custom utilities added to tailwind.config.js (perspective, transform-style, backface-visibility)
- Or use Tailwind arbitrary values: [perspective:1000px]
- No scoped `<style>` tags that won't work across components

## Technical Implementation

### FlipCard Component

```astro
---
// src/components/FlipCard.astro
interface Props {
  frontImage: string;
  frontAlt: string;
  backImage: string;
  backAlt: string;
  clientName: string;
  result: string;
}
const { frontImage, frontAlt, backImage, backAlt, clientName, result } = Astro.props;
---
<div
  class="flip-card group [perspective:1000px] w-full aspect-square cursor-pointer"
  tabindex="0"
  role="button"
  aria-label="Flip card to see after"
>
  <div class="flip-card-inner relative w-full h-full transition-transform duration-[600ms] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
    <!-- Front (Before) -->
    <div class="flip-card-front absolute inset-0 [backface-visibility:hidden]">
      <img
        src={frontImage}
        alt={frontAlt}
        class="w-full h-full object-cover rounded-lg"
      />
      <div class="absolute bottom-0 left-0 right-0 bg-neutral-900/80 p-4 rounded-b-lg">
        <span class="text-white font-semibold text-lg">Before</span>
      </div>
    </div>

    <!-- Back (After) -->
    <div class="flip-card-back absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
      <img
        src={backImage}
        alt={backAlt}
        class="w-full h-full object-cover rounded-lg"
      />
      <div class="absolute bottom-0 left-0 right-0 bg-primary-600/90 p-4 rounded-b-lg">
        <span class="text-white font-semibold text-lg">{clientName}</span>
        <p class="text-white/90 text-sm mt-1">{result}</p>
      </div>
    </div>
  </div>
</div>
```

### Alternative: Add Custom Utilities to Tailwind Config

```javascript
// tailwind.config.mjs
export default {
  // ... existing config
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.perspective-1000': { perspective: '1000px' },
        '.transform-style-3d': { 'transform-style': 'preserve-3d' },
        '.backface-hidden': { 'backface-visibility': 'hidden' },
        '.rotate-y-180': { transform: 'rotateY(180deg)' },
      })
    }
  ]
}
```

Then use in component:
```astro
<div class="flip-card group perspective-1000 w-full aspect-square cursor-pointer">
  <div class="flip-card-inner relative w-full h-full transition-transform duration-[600ms] transform-style-3d group-hover:rotate-y-180">
    <!-- ... -->
  </div>
</div>
```

## Validation Steps

1. Create FlipCard component - component renders
2. Add test images - front and back display
3. Test hover on desktop - card flips smoothly
4. Check animation duration - 600ms
5. Check aspect ratio - 1:1 square
6. Test overlay text - "Before" and client info visible
7. Check accessibility - tabindex, role, aria-label present

## References

- **PRD:** FR2 (portfolio case studies)
- **Technical Architecture:** Lines 582-632 (Flip Card component)
- **UX Design Spec:** Lines 2209-2230 (Portfolio Flip Card), Lines 2369-2383 (Flip card animation)

## Prerequisites

Epic 2 complete

## Story Points

3 points

## Notes

- This story implements CSS-only hover for desktop
- Story 3.1b will add JavaScript for mobile tap and keyboard
- Use arbitrary values `[perspective:1000px]` or custom Tailwind utilities
- Avoid scoped `<style>` tags - they don't work across Astro components
- Test in multiple browsers (Chrome, Firefox, Safari)
