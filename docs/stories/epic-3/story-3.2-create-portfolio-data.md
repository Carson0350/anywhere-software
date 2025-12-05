---
epic: Epic 3 - Portfolio Showcase & Case Studies
story: Story 3.2
title: Create Portfolio Data Structure with Business Context
status: ready
points: 3
prerequisites: Story 3.1b complete
---

# Story 3.2: Create Portfolio Data Structure with Business Context

## User Story

**As a** developer
**I want** portfolio case studies stored in a structured format
**So that** I can easily add/update portfolio items without code changes

## Acceptance Criteria

**Given** I need to manage portfolio content
**When** I create the portfolio data structure
**Then** portfolio items are stored in a TypeScript file with:
- Client name
- Industry type (campground, winery, restaurant)
- Before image path
- After image path
- Result metric (e.g., "60% increase in bookings")
- Launch date
- Featured flag (boolean)
- Business context:
  - Client testimonial quote (1-2 sentences)
  - Industry-specific challenge solved
  - Project timeline (e.g., "Delivered in 2 weeks")
  - Optional: Link to live site (if client approves)

**And** portfolio data includes at least 3 case studies:
1. **Mary Jane's Campground** (from PRD user journey)
2. **Sunset Valley Winery** (placeholder for MVP)
3. **Farm Table Restaurant** (placeholder for MVP)

**And** data structure is type-safe:
- TypeScript interface defines all fields
- Required vs optional fields clearly marked
- Enums for industry types

## Technical Implementation

```typescript
// src/data/portfolio.ts
export interface PortfolioItem {
  id: string;
  clientName: string;
  industry: 'campground' | 'winery' | 'restaurant';
  beforeImage: string;
  afterImage: string;
  result: string;
  testimonial: string;
  challenge: string;
  timeline: string;
  launchDate: Date;
  featured: boolean;
  liveSiteUrl?: string; // Optional
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'maryjane-campground',
    clientName: "Mary Jane's Campground",
    industry: 'campground',
    beforeImage: '/images/portfolio/maryjane-before.jpg',
    afterImage: '/images/portfolio/maryjane-after.jpg',
    result: '60% increase in online bookings',
    testimonial: 'Carson understood our business from day one. The new site captures the beauty of our property perfectly.',
    challenge: 'Outdated website didn\'t showcase property, lost bookings to competitors',
    timeline: 'Delivered in 2 weeks',
    launchDate: new Date('2025-01-15'),
    featured: true
  },
  {
    id: 'sunset-valley-winery',
    clientName: 'Sunset Valley Winery',
    industry: 'winery',
    beforeImage: '/images/portfolio/winery-before.jpg',
    afterImage: '/images/portfolio/winery-after.jpg',
    result: 'Wine club signups doubled',
    testimonial: 'Our wine club has never been easier to manage. Members love the new online experience.',
    challenge: 'Manual wine club management, no online signup or member portal',
    timeline: 'Delivered in 3 weeks',
    launchDate: new Date('2025-02-01'),
    featured: false
  },
  {
    id: 'farm-table-restaurant',
    clientName: 'Farm Table Restaurant',
    industry: 'restaurant',
    beforeImage: '/images/portfolio/restaurant-before.jpg',
    afterImage: '/images/portfolio/restaurant-after.jpg',
    result: 'Reservations up 40%',
    testimonial: 'Guests love seeing our farm-to-table story online. The site perfectly captures our mission.',
    challenge: 'No online presence, relying on word-of-mouth only, losing customers to competitors',
    timeline: 'Delivered in 2 weeks',
    launchDate: new Date('2025-03-01'),
    featured: false
  }
];

// Helper function to get featured items
export function getFeaturedPortfolioItems(): PortfolioItem[] {
  return portfolioItems.filter(item => item.featured);
}

// Helper function to filter by industry
export function getPortfolioItemsByIndustry(industry: PortfolioItem['industry']): PortfolioItem[] {
  return portfolioItems.filter(item => item.industry === industry);
}
```

## Usage Example

```astro
---
// src/components/Portfolio.astro
import { portfolioItems, getFeaturedPortfolioItems } from '../data/portfolio';

const featured = getFeaturedPortfolioItems();
---
<section>
  {featured.map(item => (
    <div>
      <h3>{item.clientName}</h3>
      <p>{item.result}</p>
    </div>
  ))}
</section>
```

## Validation Steps

1. Create `src/data/portfolio.ts` - file created
2. Add TypeScript interface - type checking works
3. Add 3 portfolio items - data structure complete
4. Test helper functions - return correct items
5. Import in component - no TypeScript errors
6. Check data completeness - all required fields present

## References

- **PRD:** FR2 (portfolio case studies), User Journey 2 (Mary Jane's Campground)
- **Technical Architecture:** Lines 582-632 (Portfolio data structure)
- **UX Design Spec:** Lines 2209-2230 (Portfolio content)

## Prerequisites

Story 3.1b complete

## Story Points

3 points

## Notes

- Portfolio data is static for MVP (no CMS)
- Add more case studies as real client work is completed
- Placeholder images will be added in Story 3.5
- Consider adding Zod schema for runtime validation in future
- Keep testimonials short and benefit-focused
