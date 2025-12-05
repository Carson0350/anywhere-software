---
epic: Epic 5 - About Page & Brand Story
story: Story 5.2
title: Build "Why Mobile Consulting?" Section
status: ready
points: 2
prerequisites: Story 5.1 complete
---

# Story 5.2: Build "Why Mobile Consulting?" Section

## User Story

**As a** visitor
**I want** to understand the benefits of on-site consulting
**So that** I see the value in Carson's approach

## Acceptance Criteria

**Given** I am on the About page
**When** I scroll past the hero
**Then** I see a "Why Mobile Consulting?" section with:
- **Section headline:** "Why I Come to You"
- **3 benefit cards:**
  1. **Face-to-Face Trust:** "Rural business owners prefer in-person relationships. I meet you where you're comfortable—your property, your pace."
  2. **On-Site Understanding:** "I see your operation firsthand. Your challenges, your guests, your unique story. Better context = better solutions."
  3. **No Tech Barriers:** "No Zoom fatigue, no screen sharing confusion. Just clear conversation and hands-on training when it's time to launch."

**And** benefit cards have:
- Icon (relevant to benefit)
- Headline (bold, text-neutral-900)
- Description (text-neutral-700)
- Card styling: bg-white, rounded-lg, shadow-md, p-8

**And** section is responsive:
- Desktop: 3 columns
- Tablet: 2 columns (third card full width)
- Mobile: Single column, stacked

**And** section has:
- Section ID: "benefits" (for anchor links)
- Background: bg-white
- Padding: py-24

## Technical Implementation

```astro
---
// Add to src/pages/about.astro
---

<section id="benefits" class="py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4">
    <h2 class="text-4xl md:text-5xl font-bold font-heading text-neutral-900 text-center mb-16">
      Why I Come to You
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Benefit 1: Face-to-Face Trust -->
      <div class="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
        <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
          <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3 class="text-2xl font-bold font-heading text-neutral-900 mb-4">
          Face-to-Face Trust
        </h3>
        <p class="text-neutral-700 leading-relaxed">
          Rural business owners prefer in-person relationships. I meet you where
          you're comfortable—your property, your pace.
        </p>
      </div>

      <!-- Benefit 2: On-Site Understanding -->
      <div class="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
        <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
          <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>
        <h3 class="text-2xl font-bold font-heading text-neutral-900 mb-4">
          On-Site Understanding
        </h3>
        <p class="text-neutral-700 leading-relaxed">
          I see your operation firsthand. Your challenges, your guests, your unique
          story. Better context = better solutions.
        </p>
      </div>

      <!-- Benefit 3: No Tech Barriers -->
      <div class="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
        <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
          <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-2xl font-bold font-heading text-neutral-900 mb-4">
          No Tech Barriers
        </h3>
        <p class="text-neutral-700 leading-relaxed">
          No Zoom fatigue, no screen sharing confusion. Just clear conversation
          and hands-on training when it's time to launch.
        </p>
      </div>
    </div>
  </div>
</section>
```

## Validation Steps

1. Add benefits section to About page - section renders
2. Test responsive grid - 3 columns desktop, 2 tablet, 1 mobile
3. Check icons - display correctly
4. Test hover effect - shadow increases on hover
5. Check spacing - 96px top/bottom padding
6. Verify content - matches PRD value propositions
7. Test accessibility - semantic HTML, proper heading hierarchy

## References

- **PRD:** Lines 184-189 (Non-technical user accommodations), Lines 36-51 (Value propositions)
- **Technical Architecture:** Lines 178-237 (Design tokens)
- **UX Design Spec:** Lines 1634-1650 (About page design)

## Prerequisites

Story 5.1 complete

## Story Points

2 points

## Notes

- Icons use Heroicons (built into Tailwind)
- Hover effect enhances interactivity
- Benefits address common rural business pain points
- Can be developed in parallel with Story 5.1
