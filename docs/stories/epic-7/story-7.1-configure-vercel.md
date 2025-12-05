---
epic: Epic 7 - Launch & Deployment
story: Story 7.1
title: Configure Vercel Deployment
status: ready
points: 3
prerequisites: Epic 6 complete
---

# Story 7.1: Configure Vercel Deployment

## User Story

**As a** developer
**I want** to configure Vercel for production deployment
**So that** the site is secure, fast, and reliable

## Acceptance Criteria

**Given** the site is ready for production
**When** I configure Vercel deployment
**Then** vercel.json is configured with:
- Security headers (CSP, X-Frame-Options, etc.)
- Cache headers for static assets
- Redirects (www → non-www, http → https)

**And** environment variables are set:
- FORMSPREE_FORM_ID
- PUBLIC_SITE_URL
- NODE_ENV=production

**And** staging environment is configured:
- Staging branch → staging.anywheresoftware.com
- Production branch → anywheresoftware.com
- Environment-specific variables

## Technical Implementation

### vercel.json

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.vercel-insights.com https://formspree.io; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://formspree.io https://cdn.vercel-insights.com; frame-ancestors 'none';"
        },
        {
          "key": "Permissions-Policy",
          "value": "geolocation=(), microphone=(), camera=(), payment=()"
        }
      ]
    },
    {
      "source": "/fonts/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/_astro/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/home",
      "destination": "/",
      "permanent": true
    }
  ]
}
```

### Environment Variables

```bash
# Add to Vercel dashboard (Settings → Environment Variables)
FORMSPREE_FORM_ID=your_form_id_here
PUBLIC_SITE_URL=https://anywheresoftware.com
NODE_ENV=production
```

### Staging Environment Setup

```bash
# 1. Create staging branch
git checkout -b staging
git push origin staging

# 2. In Vercel dashboard:
#    - Go to Settings → Domains
#    - Add domain: staging.anywheresoftware.com
#    - Assign to "staging" branch

# 3. Configure staging environment variables
#    - Same as production
#    - Or use different Formspree form for testing
```

## Validation Steps

1. Create vercel.json - file created
2. Add security headers - CSP, X-Frame-Options configured
3. Add cache headers - fonts and assets cached
4. Set environment variables - all variables configured
5. Create staging branch - branch created
6. Deploy to staging - staging.anywheresoftware.com works
7. Test security headers - verify with securityheaders.com
8. Test cache headers - verify with browser DevTools

## References

- **PRD:** All Phase 1 FRs (FR1-FR6)
- **Technical Architecture:** Lines 1600-1650 (Deployment strategy)
- **UX Design Spec:** N/A (deployment story)

## Prerequisites

Epic 6 complete

## Story Points

3 points

## Notes

- Security headers protect against common attacks
- Cache headers improve performance
- Staging environment allows testing before production
- Environment variables keep secrets secure
