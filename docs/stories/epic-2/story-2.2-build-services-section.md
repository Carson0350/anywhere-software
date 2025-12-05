---
epic: Epic 2 - Portfolio Site Homepage
story: Story 2.2
title: Build Services Section with Business Rule Validation
status: ready
points: 3
prerequisites: Story 2.1 complete
---

# Story 2.2: Build Services Section with Business Rule Validation

## User Story

**As a** visitor on desktop
**I want** to see a services section with clear descriptions
**So that** I can understand the value proposition

## Acceptance Criteria

**Given** I am on desktop (> 1024px)
**When** I scroll to the services section
**Then** services section is displayed with:
- Background: bg-neutral-50
- Section title: "Our Services"
- Service cards:
  - "Beautiful Websites"
  - "We Come to You"
  - "Always Available"
- Each card has:
  - Background: bg-neutral-100
  - Border: border-2 border-neutral-200
  - Padding: p-8
  - Rounded corners: rounded-lg
  - Hover effect: hover:border-primary-500 hover:shadow-lg transition-all
- Section spacing:
  - Top padding: pt-24 (96px)
  - Bottom padding: pb-24 (96px)
  - Max width: max-w-7xl mx-auto
  - Side padding: px-4

**And** service descriptions align with PRD value propositions:
- "Beautiful Websites" → Visual storytelling focus (PRD line 48)
- "We Come to You" → Mobile on-site delivery (PRD line 36)
- "Always Available" → Full-service partnership (PRD line 51)

**And** business rule validation:
- Each service card has a unique ID
- Service cards are displayed in order

## Technical Implementation

```astro
---
// src/components/Services.astro
import ServiceCard from './ServiceCard.astro';

const services = [
  {
    id: 'beautiful-websites',
    title: 'Beautiful Websites',
    description: 'Custom-designed websites that tell your story and convert visitors into customers.',
    icon: '🎨'
  },
  {
    id: 'we-come-to-you',
    title: 'We Come to You',
    description: 'I travel in my RV to meet you on-site. No video calls, just face-to-face service.',
    icon: '🚐'
  },
  {
    id: 'always-available',
    title: 'Always Available',
    description: 'Full-service partnership with ongoing support and maintenance.',
    icon: '🤝'
  }
];
---
<section id="services" class="bg-neutral-50 py-24">
  <div class="max-w-7xl mx-auto px-4">
    <h2 class="text-4xl md:text-5xl font-bold font-heading text-neutral-900 mb-12 text-center">
      Our Services
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  </div>
</section>
```

```astro
---
// src/components/ServiceCard.astro
interface Props {
  service: {
    id: string;
    title: string;
    description: string;
    icon: string;
  };
}
const { service } = Astro.props;
---
<div class="bg-white border-2 border-neutral-200 rounded-lg p-8 hover:border-primary-500 hover:shadow-lg transition-all">
  <div class="text-5xl mb-4">{service.icon}</div>
  <h3 class="text-2xl font-bold font-heading text-neutral-900 mb-4">
    {service.title}
  </h3>
  <p class="text-neutral-600 leading-relaxed">
    {service.description}
  </p>
</div>
```

## Validation Steps

1. Add Services component to homepage - section renders
2. Check responsive layout - 1 column mobile, 2 tablet, 3 desktop
3. Test hover states - border and shadow change on hover
4. Check spacing - 96px top/bottom padding
5. Verify content - matches PRD value propositions
6. Test accessibility - semantic HTML, proper heading hierarchy

## References

- **PRD:** Lines 36-51 (Value propositions), FR1 (service offerings)
- **Technical Architecture:** Lines 178-237 (Design tokens)
- **UX Design Spec:** Lines 2100-2150 (Services section)

## Prerequisites

Story 2.1 complete

## Story Points

3 points

## Notes

- Service icons can be replaced with custom SVGs later
- Keep descriptions concise and benefit-focused
- Ensure cards are equal height for visual consistency
