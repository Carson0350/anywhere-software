---
epic: Epic 6 - SEO & Performance Optimization
story: Story 6.5
title: Analytics and Performance Monitoring
status: ready
points: 3
prerequisites: Story 6.4 complete
---

# Story 6.5: Analytics and Performance Monitoring

## User Story

**As a** site owner
**I want** to track visitor behavior and site performance
**So that** I can optimize for conversions and user experience

## Acceptance Criteria

**Given** I have deployed the site
**When** visitors interact with the site
**Then** I see analytics data in Vercel Analytics:
- Page views by page
- Unique visitors
- Traffic sources
- Device types (mobile, desktop, tablet)
- Geographic location

**And** I see conversion goals tracked:
- Contact form submissions ($500 value)
- Portfolio page views ($50 value)
- About page views ($25 value)
- Time on site > 2 minutes

**And** I see error tracking:
- JavaScript errors (global error handler)
- Unhandled promise rejections
- Network errors
- Error stack traces

**And** monitoring is privacy-friendly:
- No cookies required
- GDPR compliant
- No personal data collected
- Lightweight tracking script

## Technical Implementation

### Vercel Analytics Integration

```astro
---
// src/layouts/Layout.astro (add to <head>)
---
<head>
  <!-- Vercel Analytics -->
  <script>
    window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  </script>
  <script defer src="/_vercel/insights/script.js"></script>
</head>
```

### Conversion Goals

```astro
---
// Add to relevant pages
---

<script>
  // Track conversion goals with dollar values
  const conversions = {
    'contact_form_submit': 500,  // High value - qualified lead
    'portfolio_view': 50,         // Medium value - interest shown
    'about_view': 25,             // Low value - learning about service
    'time_on_site_2min': 10       // Engagement metric
  };

  // Track contact form submission
  const form = document.getElementById('contact-form');
  form?.addEventListener('submit', () => {
    if (typeof window.va !== 'undefined') {
      window.va('event', 'contact_form_submit', {
        value: conversions['contact_form_submit']
      });
    }
  });

  // Track portfolio page view
  if (window.location.pathname === '/portfolio') {
    if (typeof window.va !== 'undefined') {
      window.va('event', 'portfolio_view', {
        value: conversions['portfolio_view']
      });
    }
  }

  // Track time on site
  let startTime = Date.now();
  window.addEventListener('beforeunload', () => {
    const timeOnSite = (Date.now() - startTime) / 1000;
    if (timeOnSite > 120 && typeof window.va !== 'undefined') {
      window.va('event', 'time_on_site_2min', {
        value: conversions['time_on_site_2min'],
        duration: Math.round(timeOnSite)
      });
    }
  });
</script>
```

### Error Tracking

```astro
---
// Add to src/layouts/Layout.astro
---

<script is:inline>
  // Global error handler
  window.addEventListener('error', (event) => {
    if (typeof window.va !== 'undefined') {
      window.va('event', 'javascript_error', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
    }
  });

  // Unhandled promise rejection handler
  window.addEventListener('unhandledrejection', (event) => {
    if (typeof window.va !== 'undefined') {
      window.va('event', 'promise_rejection', {
        reason: event.reason?.toString() || 'Unknown'
      });
    }
  });
</script>
```

### Package Installation

```bash
# Install Vercel Analytics (optional, for TypeScript support)
npm install @vercel/analytics
```

```typescript
// src/pages/_app.ts (if using TypeScript)
import { inject } from '@vercel/analytics';

inject();
```

## Validation Steps

1. Add Vercel Analytics script - script added
2. Deploy to Vercel - analytics active
3. Test page views - tracked in Vercel dashboard
4. Test conversion goals - events fire correctly
5. Test error tracking - errors logged
6. Check privacy compliance - no cookies, GDPR compliant
7. Verify performance - < 1KB script size

## Analytics Dashboard

Access analytics at:
- **Vercel Dashboard:** https://vercel.com/[your-account]/anywheresoftware/analytics
- **Real-time data:** Page views, unique visitors, top pages
- **Conversion tracking:** Goals with dollar values
- **Error monitoring:** JavaScript errors and stack traces

## References

- **PRD:** FR5 (search discoverability), FR6 (mobile performance)
- **Technical Architecture:** Lines 1500-1550 (Analytics strategy)
- **UX Design Spec:** N/A (analytics story)

## Prerequisites

Story 6.4 complete

## Story Points

3 points

## Notes

- Vercel Analytics is privacy-friendly (no cookies)
- Conversion goals help measure ROI
- Error tracking helps identify issues quickly
- Lightweight script doesn't impact performance
- Dollar values on conversions show business impact
