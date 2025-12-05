---
epic: Epic 5 - About Page & Brand Story
story: Story 5.3
title: Build "How It Works" Process Section
status: ready
points: 3
prerequisites: Story 5.2 complete
---

# Story 5.3: Build "How It Works" Process Section

## User Story

**As a** visitor
**I want** to understand Carson's consulting process
**So that** I know what to expect if I hire him

## Acceptance Criteria

**Given** I am on the About page
**When** I scroll to the "How It Works" section
**Then** I see a 4-step process:
1. **Discovery:** "We meet at your property. I learn about your business, your guests, and your goals." (Week 1)
2. **Planning:** "I create a custom proposal with timeline and pricing. You approve, and we get started." (Week 2)
3. **Building:** "I design and build your site. You review progress and provide feedback along the way." (Weeks 3-8)
4. **Launch:** "I train you in person, hand off materials, and stay available for ongoing support." (Week 9)

**And** each step has:
- Step number (large, primary-500 color)
- Timeline (e.g., "Week 1", text-sm, text-primary-600)
- Step title (bold, text-neutral-900)
- Step description (text-neutral-700)
- Scroll-triggered fade-in animation

**And** steps are connected visually:
- Desktop: Horizontal timeline with connecting line
- Mobile: Vertical timeline (connecting line hidden)

**And** section has:
- Section ID: "process" (for anchor links)
- Background: bg-neutral-50
- Padding: py-24
- CTA button: "Start Your Project" → /#contact

## Technical Implementation

```astro
---
// Add to src/pages/about.astro
---

<section id="process" class="py-24 bg-neutral-50">
  <div class="max-w-5xl mx-auto px-4">
    <h2 class="text-4xl md:text-5xl font-bold font-heading text-neutral-900 text-center mb-16">
      How It Works
    </h2>

    <div class="relative">
      <!-- Connecting line (hidden on mobile) -->
      <div class="hidden lg:block absolute top-12 left-0 right-0 h-1 bg-primary-200" aria-hidden="true"></div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
        <!-- Step 1: Discovery -->
        <div class="text-center process-step">
          <div class="w-24 h-24 bg-primary-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 relative z-10">
            1
          </div>
          <p class="text-sm text-primary-600 font-semibold mb-2">
            Week 1
          </p>
          <h3 class="text-xl font-bold font-heading text-neutral-900 mb-3">
            Discovery
          </h3>
          <p class="text-neutral-700 leading-relaxed">
            We meet at your property. I learn about your business, your guests,
            and your goals.
          </p>
        </div>

        <!-- Step 2: Planning -->
        <div class="text-center process-step">
          <div class="w-24 h-24 bg-primary-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 relative z-10">
            2
          </div>
          <p class="text-sm text-primary-600 font-semibold mb-2">
            Week 2
          </p>
          <h3 class="text-xl font-bold font-heading text-neutral-900 mb-3">
            Planning
          </h3>
          <p class="text-neutral-700 leading-relaxed">
            I create a custom proposal with timeline and pricing. You approve,
            and we get started.
          </p>
        </div>

        <!-- Step 3: Building -->
        <div class="text-center process-step">
          <div class="w-24 h-24 bg-primary-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 relative z-10">
            3
          </div>
          <p class="text-sm text-primary-600 font-semibold mb-2">
            Weeks 3-8
          </p>
          <h3 class="text-xl font-bold font-heading text-neutral-900 mb-3">
            Building
          </h3>
          <p class="text-neutral-700 leading-relaxed">
            I design and build your site. You review progress and provide feedback
            along the way.
          </p>
        </div>

        <!-- Step 4: Launch -->
        <div class="text-center process-step">
          <div class="w-24 h-24 bg-primary-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 relative z-10">
            4
          </div>
          <p class="text-sm text-primary-600 font-semibold mb-2">
            Week 9
          </p>
          <h3 class="text-xl font-bold font-heading text-neutral-900 mb-3">
            Launch
          </h3>
          <p class="text-neutral-700 leading-relaxed">
            I train you in person, hand off materials, and stay available for
            ongoing support.
          </p>
        </div>
      </div>
    </div>

    <div class="text-center mt-12">
      <a
        href="/#contact"
        class="inline-block px-8 py-4 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors"
      >
        Start Your Project
      </a>
    </div>
  </div>
</section>

<script>
  // Scroll-triggered animation for process steps
  const steps = document.querySelectorAll('.process-step');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
      }
    });
  }, { threshold: 0.2 });

  steps.forEach(step => observer.observe(step));
</script>

<style>
  .process-step {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .animate-fade-in-up {
    opacity: 1;
    transform: translateY(0);
  }
</style>
```

## Validation Steps

1. Add process section to About page - section renders
2. Test 4-step timeline - all steps display
3. Test connecting line - visible on desktop, hidden mobile
4. Test scroll animation - steps fade in on scroll
5. Test CTA button - links to /#contact
6. Check responsive - 4 columns desktop, 1 mobile
7. Verify timelines - Week 1, Week 2, Weeks 3-8, Week 9

## References

- **PRD:** Lines 157-180 (Client Journey Stages)
- **Technical Architecture:** Lines 178-237 (Design tokens)
- **UX Design Spec:** Lines 1634-1650 (About page design)

## Prerequisites

Story 5.2 complete (can be done in parallel with 5.1, 5.2)

## Story Points

3 points

## Notes

- IntersectionObserver triggers animation when 20% visible
- Connecting line provides visual continuity on desktop
- Timeline expectations set clear project duration
- Can be developed in parallel with Stories 5.1 and 5.2
