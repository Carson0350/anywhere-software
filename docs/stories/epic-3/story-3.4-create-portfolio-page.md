---
epic: Epic 3 - Portfolio Showcase & Case Studies
story: Story 3.4
title: Create Portfolio Page
status: ready
points: 3
prerequisites: Story 3.3 complete
---

# Story 3.4: Create Portfolio Page

## User Story

**As a** visitor
**I want** to view all portfolio case studies on a dedicated page
**So that** I can see the full range of work

## Acceptance Criteria

**Given** I click "View Full Portfolio" from homepage
**When** I navigate to /portfolio page
**Then** I see:
- Page title: "Portfolio" (h1, text-5xl, font-bold)
- Page description: "Real transformations for real rural businesses"
- Filter buttons: All | Campgrounds | Wineries | Restaurants
- Grid of all portfolio items (not just featured)
- Each item is a flip card

**And** filter functionality works:
- "All" shows all portfolio items (default)
- "Campgrounds" shows only campground projects
- "Wineries" shows only winery projects
- "Restaurants" shows only restaurant projects
- Active filter has primary-500 background
- Filter state persists during page session

**And** filter clicks are tracked for analytics:
- Log filter selection to Vercel Analytics
- Track which portfolio items get most views
- Measure time spent on portfolio page
- Data informs which client templates to build first in Phase 3

**And** grid is responsive:
- Desktop (1024px+): 3 columns
- Tablet (768-1024px): 2 columns
- Mobile (< 768px): 1 column

**And** page has proper SEO:
- Title: "Portfolio - AnywhereSoftware"
- Description: "See our before and after website transformations for campgrounds, wineries, and rural businesses"
- Open Graph tags for social sharing

## Technical Implementation

```astro
---
// src/pages/portfolio.astro
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import FlipCard from '../components/FlipCard.astro';
import Footer from '../components/Footer.astro';
import { portfolioItems } from '../data/portfolio';
---
<Layout
  title="Portfolio - AnywhereSoftware"
  description="See our before and after website transformations for campgrounds, wineries, and rural businesses"
>
  <Header />
  <main class="py-24">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Page Header -->
      <h1 class="text-5xl font-bold font-heading text-neutral-900 text-center mb-4">
        Portfolio
      </h1>
      <p class="text-xl text-neutral-700 text-center mb-12 max-w-2xl mx-auto">
        Real transformations for real rural businesses
      </p>

      <!-- Filter Buttons -->
      <div class="flex flex-wrap justify-center gap-4 mb-12">
        <button
          class="filter-btn active"
          data-filter="all"
          aria-pressed="true"
        >
          All
        </button>
        <button
          class="filter-btn"
          data-filter="campground"
          aria-pressed="false"
        >
          Campgrounds
        </button>
        <button
          class="filter-btn"
          data-filter="winery"
          aria-pressed="false"
        >
          Wineries
        </button>
        <button
          class="filter-btn"
          data-filter="restaurant"
          aria-pressed="false"
        >
          Restaurants
        </button>
      </div>

      <!-- Portfolio Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioItems.map(item => (
          <div class="portfolio-item" data-industry={item.industry}>
            <FlipCard
              frontImage={item.beforeImage}
              frontAlt={`Before: ${item.clientName}`}
              backImage={item.afterImage}
              backAlt={`After: ${item.clientName}`}
              clientName={item.clientName}
              result={item.result}
            />
          </div>
        ))}
      </div>
    </div>
  </main>
  <Footer />
</Layout>

<script>
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioElements = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');

      // Update active state
      filterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');

      // Track filter selection (Vercel Analytics)
      if (typeof window.va !== 'undefined') {
        window.va('event', 'portfolio_filter', { filter });
      }

      // Filter items
      portfolioElements.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-industry') === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
</script>

<style>
  .filter-btn {
    @apply px-6 py-3 rounded-lg font-semibold transition-colors;
    @apply bg-neutral-100 text-neutral-700 hover:bg-neutral-200;
  }

  .filter-btn.active {
    @apply bg-primary-500 text-white hover:bg-primary-600;
  }
</style>
```

## Validation Steps

1. Navigate to /portfolio - page loads
2. Check all items display - all portfolio items visible
3. Test "All" filter - shows all items (default)
4. Test "Campgrounds" filter - shows only campgrounds
5. Test "Wineries" filter - shows only wineries
6. Test "Restaurants" filter - shows only restaurants
7. Test active state - button background changes
8. Check analytics - filter events tracked
9. Test responsive grid - 1/2/3 columns
10. Check SEO - title and description correct

## References

- **PRD:** FR2 (portfolio case studies)
- **Technical Architecture:** Lines 582-632 (Portfolio page)
- **UX Design Spec:** Lines 2542-2545 (Portfolio page with filter)

## Prerequisites

Story 3.3 complete

## Story Points

3 points

## Notes

- Filter state doesn't persist across page reloads (session only)
- Analytics tracking helps prioritize Phase 3 templates
- Consider adding URL params for filter state in future
- Ensure filter buttons are keyboard accessible
- ARIA pressed state improves screen reader experience
