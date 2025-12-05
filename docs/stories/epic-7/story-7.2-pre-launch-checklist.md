---
epic: Epic 7 - Launch & Deployment
story: Story 7.2
title: Create Pre-Launch Checklist
status: ready
points: 3
prerequisites: Story 7.1 complete
---

# Story 7.2: Create Pre-Launch Checklist

## User Story

**As a** developer
**I want** to verify all features work correctly
**So that** visitors have a great experience

## Acceptance Criteria

**Given** the site is deployed to Vercel preview
**When** I run through the pre-launch checklist
**Then** all items pass in these categories:
- Content (all placeholder text replaced)
- Functionality (all features work)
- Performance (Lighthouse 90+)
- SEO (meta tags, sitemap, structured data)
- Browser testing (Chrome, Firefox, Safari, Edge)
- Accessibility (keyboard navigation, screen readers)
- Automated testing (Lighthouse CI, link checker, a11y)
- Monitoring (error tracking, uptime monitoring)
- User acceptance testing (3-5 real users)

## Pre-Launch Checklist

### Content Checklist
- [ ] All placeholder text replaced with real content
- [ ] All images optimized and uploaded
- [ ] Carson's bio and photos added
- [ ] Portfolio items added (at least 3)
- [ ] Meta descriptions written for all pages
- [ ] Social share images created (1200x630px)
- [ ] Favicon files created and uploaded

### Functionality Checklist
- [ ] Homepage loads without errors
- [ ] About page loads without errors
- [ ] Portfolio page loads without errors
- [ ] Contact form submits successfully
- [ ] Formspree email received
- [ ] Navigation works (desktop and mobile)
- [ ] Mobile menu toggles correctly
- [ ] All CTAs link to correct destinations
- [ ] Smooth scroll works for anchor links

### Performance Checklist
- [ ] Lighthouse Performance score: 90+
- [ ] Lighthouse Accessibility score: 100
- [ ] Lighthouse Best Practices score: 95+
- [ ] Lighthouse SEO score: 90+
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] Total page weight < 500 KB

### SEO Checklist
- [ ] Meta tags present on all pages
- [ ] Open Graph tags present on all pages
- [ ] Sitemap.xml accessible
- [ ] Robots.txt accessible
- [ ] Structured data validates (schema.org validator)
- [ ] Google Search Console verified
- [ ] Vercel Analytics working

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Screen reader compatible (VoiceOver/NVDA)
- [ ] Color contrast passes WCAG AA
- [ ] Focus indicators visible
- [ ] ARIA labels present where needed

### Automated Testing
- [ ] Lighthouse CI: All scores 90+
- [ ] Link checker: No broken links
- [ ] Accessibility audit: No violations
- [ ] HTML validation: No errors

### Monitoring Setup
- [ ] Error monitoring configured (Sentry)
- [ ] Uptime monitoring configured (UptimeRobot)
- [ ] Vercel Analytics enabled
- [ ] Alert notifications configured

### User Acceptance Testing (UAT)
- [ ] Test with 3-5 real users
- [ ] Users understand value proposition
- [ ] Users can navigate easily
- [ ] Users can find and submit contact form
- [ ] Users trust the site (professional, credible)
- [ ] Gather feedback on messaging, design, CTAs

## Automated Testing Scripts

```json
// package.json - add test scripts
{
  "scripts": {
    "test:lighthouse": "lighthouse https://anywheresoftware.com --output=json --output-path=./lighthouse-report.json",
    "test:links": "linkinator https://anywheresoftware.com --recurse",
    "test:a11y": "pa11y https://anywheresoftware.com",
    "test:html": "html-validate dist/**/*.html",
    "test:all": "npm run test:lighthouse && npm run test:links && npm run test:a11y && npm run test:html"
  },
  "devDependencies": {
    "lighthouse": "^11.0.0",
    "linkinator": "^6.0.0",
    "pa11y": "^8.0.0",
    "html-validate": "^8.0.0"
  }
}
```

## Error Monitoring Setup

```bash
# Optional: Add Sentry for error tracking
npm install @sentry/astro

# Configure in astro.config.mjs
import { sentryAstroIntegration } from "@sentry/astro";

export default defineConfig({
  integrations: [
    sentryAstroIntegration({
      dsn: "YOUR_SENTRY_DSN",
      environment: import.meta.env.MODE
    })
  ]
});
```

## Uptime Monitoring

```bash
# Use UptimeRobot (free tier: 50 monitors)
# 1. Sign up at uptimerobot.com
# 2. Add monitor: https://anywheresoftware.com
# 3. Check interval: 5 minutes
# 4. Alert via email if down
```

## Validation Steps

1. Run through content checklist - all items complete
2. Run through functionality checklist - all features work
3. Run Lighthouse audit - all scores 90+
4. Test in all browsers - no errors
5. Test accessibility - keyboard and screen reader work
6. Run automated tests - all pass
7. Set up monitoring - Sentry and UptimeRobot configured
8. Conduct UAT - 3-5 users provide feedback

## References

- **PRD:** All Phase 1 FRs (FR1-FR6)
- **Technical Architecture:** Lines 1650-1700 (Testing strategy)
- **UX Design Spec:** N/A (testing story)

## Prerequisites

Story 7.1 complete

## Story Points

3 points

## Notes

- Comprehensive checklist prevents launch issues
- Automated testing catches regressions
- UAT provides real user feedback
- Monitoring ensures uptime and catches errors
- Launch buffer of 2-3 days recommended
