---
epic: Epic 4 - Contact Form & Lead Capture
story: Story 4.4
title: Add Contact Section to Homepage
status: ready
points: 2
prerequisites: Story 4.3 complete
---

# Story 4.4: Add Contact Section to Homepage

## User Story

**As a** visitor
**I want** to easily find the contact form
**So that** I can request a consultation

## Acceptance Criteria

**Given** I am on the homepage
**When** I scroll to the bottom (or click "Get Started" CTA)
**Then** I see the contact section with:
- Section ID: "contact" (for anchor links)
- Contact form component
- Section background: bg-neutral-50
- Section padding: py-24

**And** contact section is linked from:
- Hero CTA: "Get Started" → #contact
- Navigation: "Contact" → #contact
- Portfolio CTA: "Start Your Transformation" → #contact

**And** smooth scroll works:
- Clicking anchor links scrolls smoothly to contact section
- Scroll offset accounts for sticky header

**And** form analytics are tracked:
- Form view (when contact section enters viewport)
- Form start (first field interaction)
- Form submission (successful submit)
- Field abandonment tracking (which fields cause drop-off)

## Technical Implementation

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
  description="We travel in an RV to meet you on-site. Beautiful websites for campgrounds, wineries, and rural businesses."
>
  <Header />
  <main id="main">
    <Hero />
    <Services />
    <Portfolio />
    <Pricing />
    <ContactForm />
  </main>
  <Footer />
</Layout>

<style is:global>
  html {
    scroll-behavior: smooth;
  }
</style>

<script>
  // Track form view (when contact section enters viewport)
  const contactSection = document.getElementById('contact');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && typeof window.va !== 'undefined') {
        window.va('event', 'contact_form_view');
        observer.disconnect(); // Only track once
      }
    });
  }, { threshold: 0.5 }); // Trigger when 50% visible

  if (contactSection) {
    observer.observe(contactSection);
  }

  // Track form start (first field interaction)
  const form = document.getElementById('contact-form');
  let formStarted = false;

  form?.addEventListener('focusin', () => {
    if (!formStarted && typeof window.va !== 'undefined') {
      window.va('event', 'contact_form_start');
      formStarted = true;
    }
  }, { once: true });

  // Track field abandonment
  const fields = form?.querySelectorAll('input, select, textarea');
  fields?.forEach(field => {
    field.addEventListener('blur', () => {
      if (field.value.trim() === '' && typeof window.va !== 'undefined') {
        window.va('event', 'contact_field_abandon', {
          field: field.name
        });
      }
    });
  });
</script>
```

## Analytics Baseline Metrics

Track these metrics for future A/B testing:
- **Conversion rate:** (submissions / views) - Target: 3-5%
- **Form start rate:** (starts / views) - Target: 20-30%
- **Completion rate:** (submissions / starts) - Target: 40-60%
- **Average time to complete:** Target: < 2 minutes

## Future A/B Test Ideas

- **Headline:** "Start Your Transformation" vs. "Get Your Free Consultation"
- **Button:** "Request Consultation" vs. "Get Started" vs. "Talk to Carson"
- **Form length:** 4 required fields vs. all fields required vs. progressive disclosure
- **Trust signals:** Above form vs. below form vs. none

## Validation Steps

1. Add ContactForm to homepage - section renders
2. Test anchor links - smooth scroll to #contact
3. Test form view tracking - event fires when 50% visible
4. Test form start tracking - event fires on first field focus
5. Test field abandonment - event fires when field left empty
6. Test submission tracking - event fires on successful submit
7. Check smooth scroll - works correctly
8. Verify section order - contact after pricing

## References

- **PRD:** FR3 (inquiry forms), User Journey 1 completion
- **Technical Architecture:** Lines 1748-1753 (Form analytics)
- **UX Design Spec:** User Journey 1 (Visitor → Contact Submission)

## Prerequisites

Story 4.3 complete

## Story Points

2 points

## Notes

- IntersectionObserver tracks when form enters viewport
- Analytics help measure conversion funnel
- Baseline metrics inform future A/B tests
- Smooth scroll enhances UX
- Field abandonment tracking identifies friction points
