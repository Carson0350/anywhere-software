---
epic: Epic 1 - Foundation & Design System Setup
story: Story 1.5
title: Deploy Test to Vercel
status: ready
points: 2
prerequisites: Story 1.4 complete
---

# Story 1.5: Deploy Test to Vercel

## User Story

**As a** developer
**I want** to deploy a test page to Vercel
**So that** I validate the deployment pipeline works

## Acceptance Criteria

**Given** Button component exists
**When** I create a simple test page and deploy
**Then** Vercel CLI is installed globally
**And** project is linked to Vercel account
**And** test page deploys successfully to preview URL
**And** page loads in < 3 seconds
**And** Lighthouse Accessibility score is 100
**And** HTTPS is automatic

## Technical Implementation

### Install Vercel CLI

```bash
npm install -g vercel
vercel login
```

### Create Test Page

```astro
---
// src/pages/index.astro
import Layout from '../layouts/Layout.astro';
import Button from '../components/Button.astro';
---
<Layout title="Test | AnywhereSoftware" description="Test deployment">
  <main class="min-h-screen flex items-center justify-center bg-neutral-50">
    <div class="text-center">
      <h1 class="text-5xl font-bold text-neutral-900 mb-6 font-heading">
        AnywhereSoftware
      </h1>
      <p class="text-xl text-neutral-600 mb-8">
        Beautiful websites, delivered anywhere
      </p>
      <Button size="xl">Get Started</Button>
    </div>
  </main>
</Layout>
```

### Deploy to Vercel

```bash
# Build the project
npm run build

# Deploy to Vercel
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? anywheresoftware-portfolio
# - Directory? ./
# - Override settings? No
```

## Validation Steps

1. Run `vercel` command - deployment succeeds
2. Visit preview URL - page loads correctly
3. Check page load time - < 3 seconds
4. Run Lighthouse audit - Accessibility score 100
5. Check HTTPS - SSL certificate active
6. Test on mobile - responsive layout works
7. Test button - hover and focus states work

## Expected Output

```
Vercel CLI 33.0.0
🔍  Inspect: https://vercel.com/your-account/anywheresoftware-portfolio/xxxxx
✅  Preview: https://anywheresoftware-portfolio-xxxxx.vercel.app
```

## Lighthouse Targets

- **Performance:** 90+ (will improve in Epic 6)
- **Accessibility:** 100
- **Best Practices:** 90+
- **SEO:** 90+ (will improve in Epic 6)

## References

- **PRD:** Infrastructure for FR1-FR6
- **Technical Architecture:** Lines 1600-1650 (Deployment strategy)
- **UX Design Spec:** N/A (infrastructure story)

## Prerequisites

Story 1.4 complete

## Story Points

2 points

## Notes

- This validates the deployment pipeline before building full features
- Preview URL will be used for testing throughout development
- Production deployment happens in Epic 7
- Vercel automatically configures build settings for Astro
