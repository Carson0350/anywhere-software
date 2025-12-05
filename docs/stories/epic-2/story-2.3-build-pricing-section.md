---
epic: Epic 2 - Portfolio Site Homepage
story: Story 2.3
title: Build Pricing Section with Business Rule Validation
status: ready
points: 3
prerequisites: Story 2.2 complete
---

# Story 2.3: Build Pricing Section with Business Rule Validation

## User Story

**As a** visitor on desktop
**I want** to see a pricing section with clear tiers
**So that** I can understand the pricing structure

## Acceptance Criteria

**Given** I am on desktop (> 1024px)
**When** I scroll to the pricing section
**Then** pricing section is displayed with:
- Background: bg-white
- Section title: "Simple, Transparent Pricing"
- Pricing tiers:
  - "Starter Site"
  - "Professional Site"
  - "Enterprise Solution"
- Each tier has:
  - Background: bg-neutral-50
  - Border: border-2 border-neutral-200
  - Padding: p-8
  - Rounded corners: rounded-lg
  - Hover effect: hover:border-primary-500 hover:shadow-lg transition-all
  - Price display
  - Feature list
  - CTA button
- Section spacing:
  - Top padding: pt-24 (96px)
  - Bottom padding: pb-24 (96px)
  - Max width: max-w-7xl mx-auto
  - Side padding: px-4

**And** pricing tiers align with PRD pricing structure:
- "Starter Site" → One-time project pricing
- "Professional Site" → Enhanced features and support
- "Enterprise Solution" → Custom pricing with consultation

**And** business rule validation:
- Each pricing tier has a unique ID
- Pricing tiers are displayed in order (low to high)

## Technical Implementation

```astro
---
// src/components/Pricing.astro
import PricingCard from './PricingCard.astro';
import Button from './Button.astro';

const pricingTiers = [
  {
    id: 'starter',
    name: 'Starter Site',
    price: '$2,500',
    description: 'Perfect for small businesses getting started online',
    features: [
      '5-page custom website',
      'Mobile responsive design',
      'Contact form integration',
      'Basic SEO setup',
      '30 days of support'
    ],
    cta: 'Get Started',
    featured: false
  },
  {
    id: 'professional',
    name: 'Professional Site',
    price: '$5,000',
    description: 'Ideal for established businesses ready to grow',
    features: [
      '10-page custom website',
      'Advanced animations',
      'Portfolio/gallery integration',
      'Advanced SEO & analytics',
      '90 days of support',
      'Content management training'
    ],
    cta: 'Get Started',
    featured: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise Solution',
    price: 'Custom',
    description: 'Tailored solutions for complex requirements',
    features: [
      'Unlimited pages',
      'Custom functionality',
      'API integrations',
      'Ongoing maintenance',
      'Priority support',
      'Dedicated project manager'
    ],
    cta: 'Contact Us',
    featured: false
  }
];
---
<section id="pricing" class="bg-white py-24">
  <div class="max-w-7xl mx-auto px-4">
    <h2 class="text-4xl md:text-5xl font-bold font-heading text-neutral-900 mb-4 text-center">
      Simple, Transparent Pricing
    </h2>
    <p class="text-xl text-neutral-600 mb-12 text-center max-w-2xl mx-auto">
      Choose the package that fits your needs. All projects include on-site consultation.
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {pricingTiers.map((tier) => (
        <PricingCard key={tier.id} tier={tier} />
      ))}
    </div>
  </div>
</section>
```

```astro
---
// src/components/PricingCard.astro
import Button from './Button.astro';

interface Props {
  tier: {
    id: string;
    name: string;
    price: string;
    description: string;
    features: string[];
    cta: string;
    featured: boolean;
  };
}
const { tier } = Astro.props;
---
<div class={`bg-neutral-50 border-2 rounded-lg p-8 hover:shadow-lg transition-all ${tier.featured ? 'border-primary-500 shadow-md' : 'border-neutral-200 hover:border-primary-500'}`}>
  {tier.featured && (
    <div class="bg-primary-500 text-white text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
      Most Popular
    </div>
  )}
  <h3 class="text-2xl font-bold font-heading text-neutral-900 mb-2">
    {tier.name}
  </h3>
  <div class="text-4xl font-bold text-primary-600 mb-4">
    {tier.price}
  </div>
  <p class="text-neutral-600 mb-6">
    {tier.description}
  </p>
  <ul class="space-y-3 mb-8">
    {tier.features.map((feature) => (
      <li class="flex items-start">
        <svg class="w-5 h-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
        </svg>
        <span class="text-neutral-700">{feature}</span>
      </li>
    ))}
  </ul>
  <Button variant={tier.featured ? 'default' : 'outline'} class="w-full" href="#contact">
    {tier.cta}
  </Button>
</div>
```

## Validation Steps

1. Add Pricing component to homepage - section renders
2. Check responsive layout - 1 column mobile, 2 tablet, 3 desktop
3. Test hover states - border and shadow change on hover
4. Check "Most Popular" badge - displays on featured tier
5. Verify pricing - matches business model
6. Test CTA buttons - link to contact section
7. Test accessibility - semantic HTML, proper heading hierarchy

## References

- **PRD:** Lines 60-75 (Pricing structure), FR1 (service offerings)
- **Technical Architecture:** Lines 178-237 (Design tokens)
- **UX Design Spec:** Lines 2150-2200 (Pricing section)

## Prerequisites

Story 2.2 complete

## Story Points

3 points

## Notes

- Pricing is placeholder - adjust based on actual business model
- Featured tier gets visual emphasis (border, badge)
- All CTAs link to contact form (built in Epic 4)
- Consider adding testimonials or trust signals near pricing
