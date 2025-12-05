---
epic: Epic 2 - Portfolio Site Homepage
story: Story 2.6
title: Validate Performance Metrics
status: ready
points: 2
prerequisites: Story 2.5 complete
---

# Story 2.6: Validate Performance Metrics

## User Story

**As a** developer
**I want** to validate performance metrics
**So that** I can ensure the site meets performance requirements

## Acceptance Criteria

**Given** homepage is built
**When** I run performance audits
**Then** performance metrics meet requirements:
- **Lighthouse Performance:** 90+ (desktop), 85+ (mobile)
- **Lighthouse Accessibility:** 100
- **Lighthouse Best Practices:** 95+
- **Lighthouse SEO:** 90+ (will improve to 100 in Epic 6)
- **Page Load Time:** < 3 seconds on 3G connection
- **Image Optimization:** All images < 500KB each
- **Total Page Weight:** < 2MB

**And** Core Web Vitals meet targets:
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

**And** accessibility requirements met:
- All images have alt text
- Proper heading hierarchy (h1 → h2 → h3)
- Sufficient color contrast (4.5:1 minimum)
- Keyboard navigable
- Focus rings visible

## Technical Implementation

### Run Lighthouse Audit

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit on local dev server
npm run dev
lighthouse http://localhost:4321 --view

# Or run audit on deployed preview URL
lighthouse https://your-preview-url.vercel.app --view
```

### Run Lighthouse CI (Automated)

```bash
# Install Lighthouse CI
npm install -g @lhci/cli

# Create lighthouserc.json
cat > lighthouserc.json << EOF
{
  "ci": {
    "collect": {
      "url": ["http://localhost:4321"],
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 1.0}],
        "categories:best-practices": ["error", {"minScore": 0.95}],
        "categories:seo": ["error", {"minScore": 0.9}]
      }
    }
  }
}
EOF

# Run Lighthouse CI
lhci autorun
```

### Check Image Optimization

```bash
# Check image sizes
find src/assets -type f -exec ls -lh {} \; | awk '{print $5, $9}'

# Ensure all images are < 500KB
# Use Astro Image component for automatic optimization
```

### Measure Page Weight

```bash
# Build the site
npm run build

# Check dist folder size
du -sh dist/

# Should be < 2MB total
```

## Validation Steps

1. Run `npm run dev` - start dev server
2. Run `lighthouse http://localhost:4321 --view` - audit homepage
3. Check Performance score - 90+ desktop, 85+ mobile
4. Check Accessibility score - 100
5. Check Best Practices score - 95+
6. Check SEO score - 90+
7. Check Core Web Vitals - LCP < 2.5s, FID < 100ms, CLS < 0.1
8. Check image sizes - all < 500KB
9. Check total page weight - < 2MB
10. Fix any issues and re-run audit

## Expected Lighthouse Report

```
Performance: 92/100 ✅
Accessibility: 100/100 ✅
Best Practices: 96/100 ✅
SEO: 92/100 ✅

Core Web Vitals:
- LCP: 1.8s ✅
- FID: 50ms ✅
- CLS: 0.05 ✅
```

## Common Issues and Fixes

### Low Performance Score
- Optimize images (use WebP, lazy loading)
- Minify CSS/JS
- Enable compression
- Use CDN for assets

### Low Accessibility Score
- Add alt text to images
- Fix heading hierarchy
- Improve color contrast
- Add ARIA labels

### Low Best Practices Score
- Use HTTPS
- Fix console errors
- Update dependencies
- Remove unused code

### Low SEO Score
- Add meta description
- Add title tags
- Add structured data (Epic 6)
- Improve mobile usability

## References

- **PRD:** FR5 (search discoverability), FR6 (mobile performance)
- **Technical Architecture:** Lines 400-450 (Performance optimization)
- **UX Design Spec:** Lines 2400-2450 (Performance targets)

## Prerequisites

Story 2.5 complete

## Story Points

2 points

## Notes

- Run audits regularly during development
- Performance will improve further in Epic 6 (SEO & Performance Optimization)
- Use Lighthouse CI in GitHub Actions for automated testing
- Document any performance issues and fixes
