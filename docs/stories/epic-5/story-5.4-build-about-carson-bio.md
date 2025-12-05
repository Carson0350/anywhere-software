---
epic: Epic 5 - About Page & Brand Story
story: Story 5.4
title: Build "About Carson" Bio Section
status: ready
points: 3
prerequisites: Story 5.3 complete
---

# Story 5.4: Build "About Carson" Bio Section

## User Story

**As a** visitor
**I want** to learn about Carson's background and expertise
**So that** I trust him to build my website

## Acceptance Criteria

**Given** I am on the About page
**When** I scroll to the bio section
**Then** I see:
- **Section headline:** "Meet Carson"
- **Carson's photo:** Professional headshot or casual photo with RV
- **Bio text:** 2-3 paragraphs covering background, why mobile consulting, personal connection to rural communities
- **Social proof stats:** 50+ sites, 15 retainers, 10K+ miles traveled
- **Skills list:** Modern Web Development, Mobile-First Design, SEO Optimization, Booking Integrations, Content Management, In-Person Training
- **CTA:** "Let's Work Together" → /#contact
- **Schema.org markup:** Person structured data for SEO

**And** bio section layout:
- Desktop: Photo on left (40%), bio on right (60%)
- Mobile: Photo on top, bio below

**And** section styling:
- Background: bg-white
- Padding: py-24
- Photo: rounded-lg, shadow-lg

## Technical Implementation

```astro
---
// Add to src/pages/about.astro
import { Image } from 'astro:assets';
import carsonPhoto from '../assets/images/carson-photo.jpg';
---

<section class="py-24 bg-white">
  <div class="max-w-6xl mx-auto px-4">
    <h2 class="text-4xl md:text-5xl font-bold font-heading text-neutral-900 text-center mb-16">
      Meet Carson
    </h2>

    <div class="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
      <div class="lg:col-span-2">
        <Image
          src={carsonPhoto}
          alt="Carson, founder of AnywhereSoftware"
          class="rounded-lg shadow-lg"
          width={400}
          height={500}
          format="webp"
          quality={85}
        />
      </div>

      <div class="lg:col-span-3">
        <!-- Social proof stats -->
        <div class="grid grid-cols-3 gap-6 mb-8 text-center">
          <div>
            <p class="text-4xl font-bold text-primary-600">50+</p>
            <p class="text-sm text-neutral-600">Sites Built</p>
          </div>
          <div>
            <p class="text-4xl font-bold text-primary-600">15</p>
            <p class="text-sm text-neutral-600">Active Retainers</p>
          </div>
          <div>
            <p class="text-4xl font-bold text-primary-600">10K+</p>
            <p class="text-sm text-neutral-600">Miles Traveled</p>
          </div>
        </div>

        <p class="text-lg text-neutral-700 mb-6 leading-relaxed">
          I've been building websites for over a decade, but I got tired of the
          remote-only consulting world. Too many video calls, too much miscommunication,
          and too little connection with the people I was helping.
        </p>

        <p class="text-lg text-neutral-700 mb-6 leading-relaxed">
          When I started traveling full-time in my RV, I discovered a gap: rural
          businesses—campgrounds, wineries, restaurants—needed modern websites, but
          they didn't trust remote agencies. They wanted someone who understood their
          world, someone who'd show up in person.
        </p>

        <p class="text-lg text-neutral-700 mb-8 leading-relaxed">
          So I combined my two passions: web development and RV travel. Now I meet
          clients on-site, build beautiful websites with modern technology (Astro,
          React, Tailwind), and train them face-to-face. It's consulting the way
          it should be—personal, clear, and effective.
        </p>

        <div class="mb-8">
          <h3 class="text-xl font-bold font-heading text-neutral-900 mb-4">
            What I Bring to Your Project
          </h3>
          <ul class="grid grid-cols-2 gap-3">
            <li class="flex items-center text-neutral-700">
              <svg class="w-5 h-5 text-primary-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              Modern Web Development
            </li>
            <li class="flex items-center text-neutral-700">
              <svg class="w-5 h-5 text-primary-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              Mobile-First Design
            </li>
            <li class="flex items-center text-neutral-700">
              <svg class="w-5 h-5 text-primary-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              SEO Optimization
            </li>
            <li class="flex items-center text-neutral-700">
              <svg class="w-5 h-5 text-primary-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              Booking Integrations
            </li>
            <li class="flex items-center text-neutral-700">
              <svg class="w-5 h-5 text-primary-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              Content Management
            </li>
            <li class="flex items-center text-neutral-700">
              <svg class="w-5 h-5 text-primary-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              In-Person Training
            </li>
          </ul>
        </div>

        <a
          href="/#contact"
          class="inline-block px-8 py-4 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors"
        >
          Let's Work Together
        </a>
      </div>
    </div>
  </div>
</section>

<!-- Schema.org structured data for SEO -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Carson",
  "jobTitle": "Web Design Consultant",
  "description": "Mobile web design consultant specializing in rural businesses",
  "url": "https://anywheresoftware.com/about",
  "image": "https://anywheresoftware.com/images/carson.jpg",
  "knowsAbout": ["Web Development", "Astro", "React", "Tailwind CSS", "Mobile Consulting"],
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "45.5152",
      "longitude": "-122.6784"
    },
    "geoRadius": "500 miles"
  }
}
</script>
```

## Validation Steps

1. Add bio section to About page - section renders
2. Test responsive layout - 2 columns desktop, stacked mobile
3. Check social proof stats - display correctly
4. Verify bio text - 2-3 paragraphs present
5. Test skills list - 6 items with checkmarks
6. Test CTA button - links to /#contact
7. Validate Schema.org - JSON-LD present in HTML

## References

- **PRD:** Lines 1-50 (Executive Summary, What Makes This Special)
- **Technical Architecture:** Lines 400-450 (Image optimization)
- **UX Design Spec:** Lines 1634-1650 (About page design)

## Prerequisites

Story 5.3 complete (can be done in parallel with 5.1, 5.2, 5.3)

## Story Points

3 points

## Notes

- Placeholder photo can be replaced with real Carson photo
- Bio text should be authentic and personal
- Social proof stats build credibility
- Schema.org Person markup improves SEO
- Skills list highlights technical expertise
