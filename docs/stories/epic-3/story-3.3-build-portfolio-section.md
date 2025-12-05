---
epic: Epic 3 - Portfolio Showcase & Case Studies
story: Story 3.3
title: Build Portfolio Section on Homepage
status: ready
points: 3
prerequisites: Story 3.2 complete
---

# Story 3.3: Build Portfolio Section on Homepage

## User Story

**As a** visitor
**I want** to see portfolio examples on the homepage
**So that** I can quickly assess the quality of work

## Acceptance Criteria

**Given** I scroll to the portfolio section on homepage
**When** I view the portfolio grid
**Then** I see:
- Section heading: "See What We've Built" (text-4xl, font-bold, text-neutral-900)
- Subheading: "From embarrassed to proud in 2 weeks" (text-xl, text-neutral-700)
- Social proof: "Join 50+ rural businesses with beautiful websites" (text-neutral-600)
- 3-column grid of flip cards (desktop)
- Featured portfolio items displayed first
- CTA button: "Start Your Transformation" (primary variant, links to #contact)
- Secondary link: "View Full Portfolio" (text link, links to /portfolio page)

**And** grid is responsive:
- Desktop (1024px+): 3 columns (grid-cols-3)
- Tablet (768-1024px): 2 columns (md:grid-cols-2)
- Mobile (< 768px): 1 column (grid-cols-1)

**And** section spacing:
- Top padding: pt-24 (96px)
- Bottom padding: pb-24 (96px)
- Max width: max-w-7xl mx-auto
- Side padding: px-4
- Gap between cards: gap-8

**And** conversion optimization elements:
- Compelling headline focuses on transformation
- Social proof builds credibility
- Clear CTA drives action
- Secondary link for those wanting more info

## Technical Implementation

```astro
---
// src/components/Portfolio.astro
import FlipCard from './FlipCard.astro';
import Button from './Button.astro';
import { getFeaturedPortfolioItems } from '../data/portfolio';

// Show only featured items on homepage (max 3)
const featuredItems = getFeaturedPortfolioItems().slice(0, 3);
---
<section id="portfolio" class="py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4">
    <!-- Headline -->
    <h2 class="text-4xl md:text-5xl font-bold font-heading text-neutral-900 text-center mb-4">
      See What We've Built
    </h2>

    <!-- Subheading -->
    <p class="text-xl text-neutral-700 text-center mb-2 max-w-2xl mx-auto">
      From embarrassed to proud in 2 weeks
    </p>

    <!-- Social proof -->
    <p class="text-neutral-600 text-center mb-12">
      Join 50+ rural businesses with beautiful websites
    </p>

    <!-- Portfolio Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      {featuredItems.map(item => (
        <FlipCard
          frontImage={item.beforeImage}
          frontAlt={`Before: ${item.clientName}`}
          backImage={item.afterImage}
          backAlt={`After: ${item.clientName}`}
          clientName={item.clientName}
          result={item.result}
        />
      ))}
    </div>

    <!-- CTAs -->
    <div class="text-center space-y-4">
      <Button href="#contact" size="lg">
        Start Your Transformation
      </Button>
      <div>
        <a
          href="/portfolio"
          class="text-primary-600 hover:text-primary-700 font-semibold transition-colors inline-flex items-center"
        >
          View Full Portfolio
          <svg class="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </div>
  </div>
</section>
```

## Usage in Homepage

```astro
---
// src/pages/index.astro
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import Hero from '../components/Hero.astro';
import Services from '../components/Services.astro';
import Pricing from '../components/Pricing.astro';
import Portfolio from '../components/Portfolio.astro';
import ContactForm from '../components/ContactForm.astro';
import Footer from '../components/Footer.astro';
---
<Layout
  title="AnywhereSoftware - Mobile Web Design for Rural Businesses"
  description="Beautiful websites delivered anywhere. I travel in my RV to meet you on-site."
>
  <Header />
  <Hero />
  <Services />
  <Pricing />
  <Portfolio />
  <ContactForm />
  <Footer />
</Layout>
```

## Validation Steps

1. Add Portfolio component to homepage - section renders
2. Check featured items - only featured items display (max 3)
3. Test responsive grid - 1/2/3 columns based on screen size
4. Test flip cards - all work correctly
5. Test CTA button - links to #contact
6. Test "View Full Portfolio" link - links to /portfolio
7. Check spacing - 96px top/bottom padding
8. Verify social proof - builds credibility

## References

- **PRD:** FR2 (portfolio case studies)
- **Technical Architecture:** Lines 582-632 (Portfolio section)
- **UX Design Spec:** Lines 2084-2090 (Portfolio showcase 3-column grid)

## Prerequisites

Story 3.2 complete

## Story Points

3 points

## Notes

- Only featured items display on homepage
- Full portfolio page will show all items (Story 3.4)
- Social proof number (50+) is placeholder - update with real data
- Conversion-focused copy emphasizes transformation
- Secondary link provides path for those wanting more info
