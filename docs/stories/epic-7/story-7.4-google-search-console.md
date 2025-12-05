---
epic: Epic 7 - Launch & Deployment
story: Story 7.4
title: Configure Google Search Console
status: ready
points: 2
prerequisites: Story 7.3 complete
---

# Story 7.4: Configure Google Search Console

## User Story

**As a** site owner
**I want** to monitor search performance
**So that** I can optimize for better rankings

## Acceptance Criteria

**Given** the site is live at anywheresoftware.com
**When** I set up Google Search Console
**Then** property is verified:
- Domain property added
- Verification method: DNS TXT record
- Ownership confirmed

**And** sitemap is submitted:
- Sitemap URL: https://anywheresoftware.com/sitemap.xml
- Sitemap discovered and indexed
- All pages submitted for indexing

**And** monitoring is configured:
- Performance tracking enabled
- Coverage reports enabled
- Mobile usability tracking enabled
- Core Web Vitals tracking enabled

**And** initial indexing is requested:
- Homepage submitted for indexing
- About page submitted for indexing
- Portfolio page submitted for indexing

**And** Bing Webmaster Tools are configured:
- Site added and verified
- Sitemap submitted
- Performance monitoring enabled

## Technical Implementation

### Google Search Console Setup

```bash
# 1. Go to Google Search Console (search.google.com/search-console)
# 2. Add property: anywheresoftware.com
# 3. Verify ownership via DNS TXT record:
#    - Add TXT record to DNS: google-site-verification=xxxxx
#    - Wait for propagation (up to 48 hours)
#    - Click "Verify" in Search Console

# 4. Submit sitemap:
#    - Go to Sitemaps section
#    - Enter: sitemap.xml
#    - Click "Submit"

# 5. Request indexing for main pages:
#    - Go to URL Inspection
#    - Enter URL (e.g., https://anywheresoftware.com)
#    - Click "Request Indexing"
```

### Bing Webmaster Tools Setup

```bash
# 1. Go to Bing Webmaster Tools (bing.com/webmasters)
# 2. Add site: anywheresoftware.com
# 3. Verify via DNS TXT record or import from Google Search Console
# 4. Submit sitemap: https://anywheresoftware.com/sitemap.xml
# 5. Enable notifications for crawl errors

# Why: Bing powers ~30% of US search (including DuckDuckGo, Yahoo)
```

## Validation Steps

1. Add property to Google Search Console - property added
2. Verify ownership via DNS - verification successful
3. Submit sitemap - sitemap submitted
4. Request indexing for main pages - indexing requested
5. Check coverage report - pages indexed
6. Set up Bing Webmaster Tools - site verified
7. Submit sitemap to Bing - sitemap submitted
8. Monitor indexing progress - pages appearing in search

## References

- **PRD:** FR5 (search discoverability)
- **Technical Architecture:** Lines 1400-1450 (SEO strategy)
- **UX Design Spec:** N/A (SEO story)

## Prerequisites

Story 7.3 complete

## Story Points

2 points

## Notes

- DNS verification is most reliable method
- Sitemap submission speeds up indexing
- Request indexing for important pages
- Bing Webmaster Tools covers 30% of US search
- Monitor performance weekly after launch
