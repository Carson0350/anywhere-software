# Epic and Story Breakdown
## AnywhereSoftware

**Author:** John (Product Manager)
**Date:** December 4, 2025
**Version:** 1.0
**Status:** Ready for Sprint Planning

---

## Document Context

This epic and story breakdown incorporates complete context from:

✅ **PRD** - Functional requirements and business objectives
✅ **Technical Architecture** - Astro, Tailwind, Vercel, simplified single-repo structure
✅ **UX Design Specification** - "Mountain Vista" design direction, mountains & pine trees palette, 3 critical user journeys

---

## Functional Requirements Inventory

### Portfolio & Marketing (Phase 1 - MVP)
- **FR1:** Visitors can view service offerings and pricing tiers
- **FR2:** Visitors can browse portfolio case studies
- **FR3:** Visitors can submit inquiry forms
- **FR5:** Visitors can discover through search engines
- **FR6:** Visitors can access from mobile devices

### Client Site Management (Phase 3 - Deferred)
- **FR7-FR14, FR79:** Admin panel capabilities (deferred)

### Booking & Reservations (Phase 3 - Deferred)
- **FR15-FR20:** Booking system (deferred)

### AI-Powered Assistance (Phase 3 - Deferred)
- **FR21-FR25:** AI chatbot (deferred)

### Template Library (Phase 3 - Deferred)
- **FR46-FR52, FR76, FR82-FR83:** Template management (deferred)

---

## Epic Structure

Based on simplified architecture (single Astro repo, no CMS, Vercel deployment), the MVP focuses on **Portfolio Site Only**.

### Epic 1: Foundation & Design System Setup
**User Value:** Development environment ready to build portfolio site
**PRD Coverage:** Infrastructure for FR1-FR6
**Technical Context:** Astro project, Tailwind with mountains & pine trees palette, Vercel deployment
**UX Integration:** Design tokens from "Mountain Vista" direction
**Dependencies:** None (first epic)

### Epic 2: Portfolio Site Homepage
**User Value:** Visitors can discover AnywhereSoftware and understand services
**PRD Coverage:** FR1 (service offerings), FR6 (mobile optimized)
**Technical Context:** Astro components, responsive design, hero section
**UX Integration:** User Journey 1 (Visitor → Contact Submission), hero with RV/mountain imagery
**Dependencies:** Epic 1 complete

### Epic 3: Portfolio Showcase & Case Studies
**User Value:** Visitors can see proof of work through before/after examples
**PRD Coverage:** FR2 (portfolio case studies)
**Technical Context:** Flip card components, static content in Astro
**UX Integration:** Portfolio flip cards (before/after transformations)
**Dependencies:** Epic 2 complete

### Epic 4: Contact Form & Lead Capture
**User Value:** Visitors can request consultations and become leads
**PRD Coverage:** FR3 (inquiry forms)
**Technical Context:** Formspree integration, form validation
**UX Integration:** User Journey 1 completion (contact submission flow)
**Dependencies:** Epic 2 complete

### Epic 5: About Page & RV Story
**User Value:** Visitors understand the unique RV-based delivery model
**PRD Coverage:** FR1 (service differentiation)
**Technical Context:** Static Astro page, responsive layout
**UX Integration:** RV model story section, authenticity messaging
**Dependencies:** Epic 2 complete

### Epic 6: SEO & Performance Optimization
**User Value:** Visitors can discover site through search engines, fast page loads
**PRD Coverage:** FR5 (search discoverability), FR6 (mobile performance)
**Technical Context:** Meta tags, sitemap, image optimization, Lighthouse 90+
**UX Integration:** Performance targets from UX spec (< 3s page loads)
**Dependencies:** Epics 2-5 complete

### Epic 7: Launch & Deployment
**User Value:** Portfolio site live at anywheresoftware.com
**PRD Coverage:** All Phase 1 FRs (FR1-FR6)
**Technical Context:** Vercel production deployment, custom domain, SSL
**UX Integration:** Final accessibility audit, mobile testing
**Dependencies:** Epics 1-6 complete

---

## Epic 1: Foundation & Design System Setup

**Epic Goal:** Create development environment with design system ready for building portfolio site

**Stories:**

### Story 1.1: Initialize Astro Project

**As a** developer
**I want** an Astro project initialized with proper configuration
**So that** I can start building the portfolio site

**Acceptance Criteria:**

**Given** I need to start development
**When** I run project initialization
**Then** Astro project is created with TypeScript support
**And** project structure follows Architecture document (src/components, src/pages, src/layouts, public/)
**And** package.json includes Astro 4.x and required dependencies
**And** tsconfig.json is configured for strict type checking
**And** .gitignore excludes node_modules, dist, .env files

**Technical Implementation:**
```bash
npm create astro@latest anywheresoftware-portfolio
cd anywheresoftware-portfolio
npm install -D tailwindcss @astrojs/tailwind
npm install @fontsource/inter @fontsource/outfit
npm install @formspree/react
```

**Prerequisites:** None

---

### Story 1.2: Configure Tailwind with Mountains & Pine Trees Palette

**As a** developer
**I want** Tailwind configured with the design tokens from UX spec
**So that** all components use consistent colors, typography, and spacing

**Acceptance Criteria:**

**Given** Astro project is initialized
**When** I configure Tailwind
**Then** tailwind.config.js includes complete color palette:
- Primary greens (50-900) from UX spec lines 1653-1664
- Neutral tans/browns (50-900) from UX spec lines 1670-1681
- Accent colors (sky, sunset, alpine) from UX spec lines 1687-1691
- Semantic colors (success, warning, error, info)

**And** Typography is configured:
- Font families: Outfit (headings), Inter (body)
- Font sizes with line heights from UX spec lines 1772-1787
- Font weights: 400, 500, 600, 700

**And** Spacing uses 4px base (Tailwind default)
**And** Content paths include src/**/*.{astro,html,js,jsx,ts,tsx}

**Technical Implementation:**
- Copy design tokens from Technical Architecture lines 178-237
- Import fonts: @fontsource/inter and @fontsource/outfit
- Configure astro.config.mjs to use @astrojs/tailwind

**Prerequisites:** Story 1.1 complete

---

### Story 1.3: Create Base Layout Component

**As a** developer
**I want** a reusable layout component
**So that** all pages have consistent structure (header, footer, meta tags)

**Acceptance Criteria:**

**Given** Tailwind is configured
**When** I create Layout.astro
**Then** layout includes:
- HTML boilerplate with proper DOCTYPE and lang="en"
- Meta tags for SEO (title, description, viewport)
- Font imports (Inter, Outfit from Google Fonts)
- Global CSS import
- Slot for page content
- Responsive meta viewport tag

**And** layout uses semantic HTML:
- `<header>` for navigation
- `<main>` for content
- `<footer>` for footer

**Technical Implementation:**
```astro
---
// src/layouts/Layout.astro
interface Props {
  title: string;
  description: string;
}
const { title, description } = Astro.props;
---
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Outfit:wght@600;700&display=swap" rel="stylesheet">
  </head>
  <body class="font-sans text-neutral-900 bg-neutral-50">
    <slot />
  </body>
</html>
```

**Prerequisites:** Story 1.2 complete

---

### Story 1.4: Build Button Component

**As a** developer
**I want** a reusable Button component with variants
**So that** CTAs are consistent and accessible throughout the site

**Acceptance Criteria:**

**Given** base layout exists
**When** I create Button.astro component
**Then** button supports variants:
- default: bg-primary-500 text-white hover:bg-primary-600
- secondary: bg-neutral-100 text-neutral-900 hover:bg-neutral-200
- outline: border-2 border-primary-500 text-primary-700 hover:bg-primary-50

**And** button supports sizes:
- default: h-12 px-6 py-3 (48px height, touch-friendly)
- lg: h-14 px-8 py-4 text-lg (56px height)
- xl: h-16 px-10 py-5 text-xl (64px height, hero CTAs)

**And** button is accessible:
- Keyboard navigable (Tab key)
- Focus ring visible (ring-2 ring-primary-500 ring-offset-2)
- Disabled state (opacity-50, pointer-events-none)

**And** button uses Tailwind classes from UX spec

**Technical Implementation:**
```astro
---
// src/components/Button.astro
interface Props {
  variant?: 'default' | 'secondary' | 'outline';
  size?: 'default' | 'lg' | 'xl';
  href?: string;
  class?: string;
}
const { variant = 'default', size = 'default', href, class: className } = Astro.props;

const baseClasses = "inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2";

const variantClasses = {
  default: "bg-primary-500 text-white hover:bg-primary-600",
  secondary: "bg-neutral-100 text-neutral-900 hover:bg-neutral-200",
  outline: "border-2 border-primary-500 text-primary-700 hover:bg-primary-50"
};

const sizeClasses = {
  default: "h-12 px-6 py-3",
  lg: "h-14 px-8 py-4 text-lg",
  xl: "h-16 px-10 py-5 text-xl"
};

const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className || ''}`;
---

{href ? (
  <a href={href} class={classes}>
    <slot />
  </a>
) : (
  <button class={classes}>
    <slot />
  </button>
)}
```

**Prerequisites:** Story 1.3 complete

---

### Story 1.5: Deploy Test to Vercel

**As a** developer
**I want** to deploy a test page to Vercel
**So that** I validate the deployment pipeline works

**Acceptance Criteria:**

**Given** Button component exists
**When** I create a simple test page and deploy
**Then** Vercel CLI is installed globally
**And** project is linked to Vercel account
**And** test page deploys successfully to preview URL
**And** page loads in < 3 seconds
**And** Lighthouse Accessibility score is 100
**And** HTTPS is automatic

**Technical Implementation:**
```bash
npm install -g vercel
vercel login
vercel
```

Create test page:
```astro
---
// src/pages/index.astro
import Layout from '../layouts/Layout.astro';
import Button from '../components/Button.astro';
---
<Layout title="Test" description="Test deployment">
  <main class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-5xl font-bold text-neutral-900 mb-6">AnywhereSoftware</h1>
      <Button size="xl">Get Started</Button>
    </div>
  </main>
</Layout>
```

**Prerequisites:** Story 1.4 complete

---

## Epic 1 Complete

**Stories Created:** 5
**FR Coverage:** Infrastructure for FR1-FR6
**Technical Context:** Astro project initialized, Tailwind configured with mountains & pine trees palette, Button component built, Vercel deployment validated
**UX Integration:** Design tokens from "Mountain Vista" direction implemented

---

## Epic 2: Portfolio Site Homepage

**User Value:** Visitors can discover AnywhereSoftware and understand services
**PRD Coverage:** FR1 (service offerings), FR6 (mobile optimized)
**Technical Context:** Astro components, responsive design, hero section
**UX Integration:** User Journey 1 (Visitor → Contact Submission), hero with RV/mountain imagery
**Dependencies:** Epic 1 complete

### Story 2.1: Build Hero Section with Image Optimization

**As a** visitor on desktop
**I want** to see a hero section with RV/mountain imagery
**So that** I can quickly understand the unique value proposition

**Acceptance Criteria:**

**Given** I am on desktop (> 1024px)
**When** I load the homepage
**Then** hero section is displayed with:
- Background: bg-neutral-50
- RV/mountain image: src/assets/rv-mountains.jpg
- Image optimization:
  - WebP format with JPEG fallback
  - Optimized for < 500KB file size
  - Alt text: "RV in mountain landscape"
  - Width/height attributes for layout stability (1920x1080)
- Headline: "AnywhereSoftware"
- Tagline: "Beautiful websites, delivered anywhere"
- CTA button: "Get Started"

**And** hero image loads with progressive enhancement:
- Blur-up technique (tiny blurred placeholder → sharp image)
- Duration: 300ms
- Easing: ease-out

**And** accessibility requirements met:
- Heading hierarchy starts with h1
- Sufficient color contrast (4.5:1 minimum)
- Keyboard navigable (Tab to CTA button)
- Focus ring visible on CTA

**Technical Implementation:**
```astro
---
// src/components/Hero.astro
import { Image } from 'astro:assets';
import Button from './Button.astro';
import heroImage from '../assets/rv-mountains.jpg';
---
<section class="relative h-screen">
  <Image
    src={heroImage}
    alt="RV in mountain landscape"
    class="absolute inset-0 w-full h-full object-cover"
    loading="eager"
    format="webp"
    quality={85}
    widths={[640, 1024, 1920]}
    sizes="100vw"
  />
  <div class="absolute inset-0 flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-5xl font-bold text-neutral-900 mb-6">AnywhereSoftware</h1>
      <p class="text-2xl font-semibold text-neutral-900 mb-12">Beautiful websites, delivered anywhere</p>
      <Button size="xl">Get Started</Button>
    </div>
  </div>
</section>
```

**Prerequisites:** Story 1.5 complete

---

### Story 2.2: Build Services Section with Business Rule Validation

**As a** visitor on desktop
**I want** to see a services section with clear descriptions
**So that** I can understand the value proposition

**Acceptance Criteria:**

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
- Service cards are sorted alphabetically

**Technical Implementation:**
```astro
---
// src/components/Services.astro
import ServiceCard from './ServiceCard.astro';
---
<section class="bg-neutral-50 pt-24 pb-24 max-w-7xl mx-auto px-4">
  <h2 class="text-4xl font-bold text-neutral-900 mb-12">Our Services</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {services.map((service) => (
      <ServiceCard key={service.id} service={service} />
    ))}
  </div>
</section>
```

**Prerequisites:** Story 2.1 complete

---

### Story 2.3: Build Pricing Section with Business Rule Validation

**As a** visitor on desktop
**I want** to see a pricing section with clear tiers
**So that** I can understand the pricing structure

**Acceptance Criteria:**

**Given** I am on desktop (> 1024px)
**When** I scroll to the pricing section
**Then** pricing section is displayed with:
- Background: bg-neutral-50
- Section title: "Our Pricing"
- Pricing tiers:
  - "Basic"
  - "Premium"
  - "Enterprise"
- Each tier has:
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

**And** pricing tiers align with PRD pricing structure:
- "Basic" → $X/month (PRD line 62)
- "Premium" → $Y/month (PRD line 65)
- "Enterprise" → Custom pricing (PRD line 68)

**And** business rule validation:
- Each pricing tier has a unique ID
- Pricing tiers are sorted alphabetically

**Technical Implementation:**
```astro
---
// src/components/Pricing.astro
import PricingTier from './PricingTier.astro';
---
<section class="bg-neutral-50 pt-24 pb-24 max-w-7xl mx-auto px-4">
  <h2 class="text-4xl font-bold text-neutral-900 mb-12">Our Pricing</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {pricingTiers.map((tier) => (
      <PricingTier key={tier.id} tier={tier} />
    ))}
  </div>
</section>
```

**Prerequisites:** Story 2.2 complete

---

### Story 2.4a: Build Desktop Navigation Header Component

**As a** visitor on desktop
**I want** to navigate between sections using the header
**So that** I can quickly jump to relevant information

**Acceptance Criteria:**

**Given** I am on desktop (> 1024px)
**When** I interact with the header
**Then** header is displayed with:
- Background: bg-neutral-50
- Navigation links:
  - "Home"
  - "Services"
  - "Pricing"
  - "Portfolio"
  - "Contact"
- Each link has:
  - Background: bg-neutral-100
  - Border: border-2 border-neutral-200
  - Padding: p-4
  - Rounded corners: rounded-lg
  - Hover effect: hover:border-primary-500 hover:shadow-lg transition-all
- Section spacing:
  - Top padding: pt-4 (16px)
  - Bottom padding: pb-4 (16px)
  - Max width: max-w-7xl mx-auto
  - Side padding: px-4

**And** navigation links align with PRD navigation structure:
- "Home" → Homepage (PRD line 42)
- "Services" → Services section (PRD line 45)
- "Pricing" → Pricing section (PRD line 48)
- "Portfolio" → Portfolio section (PRD line 51)
- "Contact" → Contact section (PRD line 54)

**Technical Implementation:**
```astro
---
// src/components/Header.astro
import NavigationLink from './NavigationLink.astro';
---
<header class="bg-neutral-50 pt-4 pb-4 max-w-7xl mx-auto px-4">
  <nav class="flex justify-between">
    <ul class="flex items-center">
      {navigationLinks.map((link) => (
        <NavigationLink key={link.id} link={link} />
      ))}
    </ul>
  </nav>
</header>
```

**Prerequisites:** Story 2.3 complete

---

### Story 2.4b: Build Mobile Menu Overlay

**As a** visitor on mobile
**I want** to open a menu to navigate between sections
**So that** I can access all navigation links on small screens

**Acceptance Criteria:**

**Given** I am on mobile (< 1024px)
**When** I click the "Menu" button in header
**Then** a full-screen overlay opens with:
- Background: bg-white z-50 fixed inset-0
- Close button: Top-right corner with X icon
- Navigation links stacked vertically
- Large touch targets (56px height)
- Generous spacing between links (mb-6)

**And** menu opens with smooth transition:
- Slide in from right (transform: translateX(100%) → translateX(0))
- Duration: 300ms
- Easing: ease-out

**And** menu closes when:
- User clicks close button
- User clicks a navigation link (scrolls to section)
- User presses Escape key

**And** accessibility requirements:
- Focus trap (Tab cycles within menu)
- Escape key closes menu
- ARIA labels: aria-label="Close menu" on close button
- Focus moves to close button when menu opens

**Technical Implementation:**
```astro
---
// Add to src/components/Header.astro
---
<!-- Mobile Menu Overlay -->
<div id="mobile-menu" class="fixed inset-0 bg-white z-50 transform translate-x-full transition-transform duration-300 ease-out lg:hidden">
  <div class="flex justify-end p-4">
    <button id="close-menu" aria-label="Close menu" class="text-neutral-900">
      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  </div>
  <nav class="px-8 py-12">
    <ul class="space-y-6">
      <li><a href="#services" class="block text-2xl font-semibold text-neutral-900 hover:text-primary-600">Services</a></li>
      <li><a href="#pricing" class="block text-2xl font-semibold text-neutral-900 hover:text-primary-600">Pricing</a></li>
      <li><a href="#portfolio" class="block text-2xl font-semibold text-neutral-900 hover:text-primary-600">Portfolio</a></li>
      <li><a href="#contact" class="block text-2xl font-semibold text-neutral-900 hover:text-primary-600">Contact</a></li>
    </ul>
  </nav>
</div>

<script>
  const menuButton = document.querySelector('[aria-label="Open menu"]');
  const closeButton = document.querySelector('#close-menu');
  const mobileMenu = document.querySelector('#mobile-menu');
  const menuLinks = mobileMenu?.querySelectorAll('a');

  function openMenu() {
    mobileMenu?.classList.remove('translate-x-full');
    closeButton?.focus();
  }

  function closeMenu() {
    mobileMenu?.classList.add('translate-x-full');
  }

  menuButton?.addEventListener('click', openMenu);
  closeButton?.addEventListener('click', closeMenu);
  menuLinks?.forEach(link => link.addEventListener('click', closeMenu));

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu?.classList.contains('translate-x-full')) {
      closeMenu();
    }
  });
</script>
```

**Prerequisites:** Story 2.4a complete

---

### Story 2.5: Build Footer Base Layout Component

**As a** developer
**I want** a reusable layout component
**So that** all pages have consistent structure (header, footer, meta tags)

**Acceptance Criteria:**

**Given** Tailwind is configured
**When** I create Layout.astro
**Then** layout includes:
- HTML boilerplate with proper DOCTYPE and lang="en"
- Meta tags for SEO (title, description, viewport)
- Font imports (Inter, Outfit from Google Fonts)
- Global CSS import
- Slot for page content
- Responsive meta viewport tag

**And** layout uses semantic HTML:
- `<header>` for navigation
- `<main>` for content
- `<footer>` for footer

**Technical Implementation:**
```astro
---
// src/layouts/Layout.astro
interface Props {
  title: string;
  description: string;
}
const { title, description } = Astro.props;
---
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Outfit:wght@600;700&display=swap" rel="stylesheet">
  </head>
  <body class="font-sans text-neutral-900 bg-neutral-50">
    <slot />
  </body>
</html>
```

**Prerequisites:** Story 1.2 complete

---

### Story 2.6: Validate Performance Metrics

**As a** developer
**I want** to validate performance metrics
**So that** I can ensure the site meets performance requirements

**Acceptance Criteria:**

**Given** homepage is built
**When** I run performance audits
**Then** performance metrics meet requirements:
- Lighthouse Performance: 90+ (desktop), 85+ (mobile)
- Lighthouse Accessibility: 100
- Lighthouse Best Practices: 95+
- Lighthouse SEO: 100
- Page loads in < 3 seconds on 3G connection
- All images optimized (< 500KB each)
- Total page weight < 2MB

**Technical Implementation:**
```bash
# Run Lighthouse audit
npm install -g lighthouse
lighthouse https://localhost:4321 --view

# Verify scores meet requirements:
# Performance: 90+ (desktop), 85+ (mobile)
# Accessibility: 100
# Best Practices: 95+
# SEO: 100
```

**Prerequisites:** Story 2.5 complete

---

## Epic 2 Complete

**Stories Created:** 7
**FR Coverage:** FR1 (service offerings and pricing), FR6 (mobile optimized)
**Technical Context:** Astro components with image optimization, responsive design, hero section with RV/mountain imagery, mobile menu with JavaScript
**UX Integration:** User Journey 1 (Visitor → Contact Submission) partially implemented, "Mountain Vista" design direction
**Team Refinements Applied:**
- Image optimization with Astro Image component (Winston)
- Story 2.4 split into desktop/mobile (Sarah)
- Business rule validation for services and pricing (John)
- Performance metrics added to Story 2.6 (John)
- Mobile menu JavaScript implementation (Winston)

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Epic 3: Portfolio Showcase & Case Studies

**Epic Goal:** Visitors can see proof of work through before/after portfolio examples

**Stories:**

### Story 3.1a: Build Basic Flip Card Component (No JavaScript)

**As a** visitor on desktop
**I want** to see before/after transformations on hover
**So that** I can visualize the quality of work AnywhereSoftware delivers

**Acceptance Criteria:**

**Given** I am viewing the portfolio section
**When** I interact with a flip card
**Then** I see a flip card with:
- **Front (Before):** Outdated website screenshot
- **Back (After):** Beautiful new website screenshot
- **Flip trigger:** Hover (desktop) or Click/Tap (mobile)
- **Animation:** 600ms 3D flip (rotateY 180deg)
- **Aspect ratio:** 1:1 square (aspect-square)

**And** each card displays:
- **Front overlay:** "Before" label (bg-neutral-900/80, text-white)
- **Back overlay:** Client name + result metric (bg-primary-600/90, text-white)
  - Example: "Mary Jane's Campground - 60% increase in bookings"

**And** flip card works on desktop:
- Desktop (1024px+): Hover to flip (CSS only, no JavaScript)
- Maintains 1:1 aspect ratio
- Smooth 600ms transition

**And** CSS is properly configured:
- Custom utilities added to tailwind.config.js (perspective, transform-style, backface-visibility)
- Or use Tailwind arbitrary values: [perspective:1000px]
- No scoped <style> tags that won't work across components

**Technical Implementation:**
```astro
---
// src/components/FlipCard.astro
interface Props {
  frontImage: string;
  frontAlt: string;
  backImage: string;
  backAlt: string;
  clientName: string;
  result: string;
}
const { frontImage, frontAlt, backImage, backAlt, clientName, result } = Astro.props;
---
<div
  class="flip-card group perspective-1000 w-full aspect-square cursor-pointer"
  tabindex="0"
  role="button"
  aria-label="Flip card to see after"
>
  <div class="flip-card-inner relative w-full h-full transition-transform duration-600 transform-style-3d group-hover:rotate-y-180">
    <!-- Front (Before) -->
    <div class="flip-card-front absolute inset-0 backface-hidden">
      <img
        src={frontImage}
        alt={frontAlt}
        class="w-full h-full object-cover rounded-lg"
      />
      <div class="absolute bottom-0 left-0 right-0 bg-neutral-900/80 p-4">
        <span class="text-white font-semibold">Before</span>
      </div>
    </div>

    <!-- Back (After) -->
    <div class="flip-card-back absolute inset-0 backface-hidden rotate-y-180">
      <img
        src={backImage}
        alt={backAlt}
        class="w-full h-full object-cover rounded-lg"
      />
      <div class="absolute bottom-0 left-0 right-0 bg-primary-600/90 p-4">
        <span class="text-white font-semibold">{clientName}</span>
        <p class="text-white/90 text-sm mt-1">{result}</p>
      </div>
    </div>
  </div>
</div>

<!-- No JavaScript in this story - desktop hover only -->

<!-- Add to tailwind.config.js: -->
<!--
plugins: [
  function({ addUtilities }) {
    addUtilities({
      '.perspective-1000': { perspective: '1000px' },
      '.transform-style-3d': { 'transform-style': 'preserve-3d' },
      '.backface-hidden': { 'backface-visibility': 'hidden' },
      '.rotate-y-180': { transform: 'rotateY(180deg)' },
    })
  }
]
-->
```

**UX Reference:** UX Design Spec lines 2209-2230 (Portfolio Flip Card), Technical Architecture lines 582-632 (Flip Card component)
**Prerequisites:** Epic 2 complete

---

### Story 3.1b: Add Mobile Tap & Keyboard Support to Flip Card

**As a** visitor on mobile or using keyboard
**I want** to flip cards by tapping or pressing Enter/Space
**So that** I can see transformations on all devices and input methods

**Acceptance Criteria:**

**Given** I am on mobile (< 1024px) or using keyboard
**When** I interact with a flip card
**Then** card flips on:
- Mobile: Click/tap anywhere on card
- Keyboard: Tab to card, press Enter or Space

**And** flip card is accessible:
- Keyboard navigable (Tab to card)
- ARIA labels: aria-label="Flip card to see after"
- Screen reader announces state change
- Focus ring visible (ring-2 ring-primary-500)
- Role="button" for semantic HTML

**And** JavaScript handles interaction:
- Toggle .rotate-y-180 class on click/tap
- Toggle on Enter/Space keypress
- Prevent default behavior for Space (no page scroll)
- Works with multiple flip cards on same page

**Technical Implementation:**
```astro
<!-- Add to FlipCard.astro -->
<script>
  document.querySelectorAll('.flip-card').forEach(card => {
    const inner = card.querySelector('.flip-card-inner');

    // Mobile tap to flip
    card.addEventListener('click', () => {
      inner?.classList.toggle('rotate-y-180');
    });

    // Keyboard support
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        inner?.classList.toggle('rotate-y-180');

        // Announce state to screen readers
        const isFlipped = inner?.classList.contains('rotate-y-180');
        card.setAttribute('aria-label', isFlipped ? 'Showing after. Press Enter to see before.' : 'Showing before. Press Enter to see after.');
      }
    });
  });
</script>
```

**UX Reference:** UX Design Spec lines 2369-2383 (Flip card animation)
**Prerequisites:** Story 3.1a complete

---

### Story 3.2: Create Portfolio Data Structure with Business Context

**As a** developer
**I want** portfolio case studies stored in a structured format
**So that** I can easily add/update portfolio items without code changes

**Acceptance Criteria:**

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
   - Industry: Campground
   - Result: "60% increase in online bookings"
   - Testimonial: "Carson understood our business from day one. The new site captures the beauty of our property perfectly."
   - Challenge: "Outdated website didn't showcase property, lost bookings to competitors"
   - Timeline: "Delivered in 2 weeks"
   - Featured: true

2. **Placeholder Winery** (mock data for MVP)
   - Industry: Winery
   - Result: "Wine club signups doubled"
   - Testimonial: "Our wine club has never been easier to manage."
   - Challenge: "Manual wine club management, no online signup"
   - Timeline: "Delivered in 3 weeks"
   - Featured: false

3. **Placeholder Restaurant** (mock data for MVP)
   - Industry: Restaurant
   - Result: "Reservations up 40%"
   - Testimonial: "Guests love seeing our farm-to-table story online."
   - Challenge: "No online presence, relying on word-of-mouth only"
   - Timeline: "Delivered in 2 weeks"
   - Featured: false

**And** data structure is type-safe with runtime validation:
```typescript
import { z } from 'zod';

const PortfolioItemSchema = z.object({
  id: z.string().min(1),
  clientName: z.string().min(1),
  industry: z.enum(['campground', 'winery', 'restaurant']),
  beforeImage: z.string().startsWith('/images/'),
  afterImage: z.string().startsWith('/images/'),
  result: z.string().min(1),
  testimonial: z.string().min(1),
  challenge: z.string().min(1),
  timeline: z.string().min(1),
  launchDate: z.date(),
  featured: z.boolean(),
  liveSiteUrl: z.string().url().optional()
});

type PortfolioItem = z.infer<typeof PortfolioItemSchema>;

// Validate at build time
portfolioItems.forEach(item => {
  PortfolioItemSchema.parse(item); // Throws if invalid
});
```

**Technical Implementation:**
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
    id: 'placeholder-winery',
    clientName: 'Sunset Valley Winery',
    industry: 'winery',
    beforeImage: '/images/portfolio/winery-before.jpg',
    afterImage: '/images/portfolio/winery-after.jpg',
    result: 'Wine club signups doubled',
    testimonial: 'Our wine club has never been easier to manage.',
    challenge: 'Manual wine club management, no online signup',
    timeline: 'Delivered in 3 weeks',
    launchDate: new Date('2025-02-01'),
    featured: false
  },
  {
    id: 'placeholder-restaurant',
    clientName: 'Farm Table Restaurant',
    industry: 'restaurant',
    beforeImage: '/images/portfolio/restaurant-before.jpg',
    afterImage: '/images/portfolio/restaurant-after.jpg',
    result: 'Reservations up 40%',
    testimonial: 'Guests love seeing our farm-to-table story online.',
    challenge: 'No online presence, relying on word-of-mouth only',
    timeline: 'Delivered in 2 weeks',
    launchDate: new Date('2025-03-01'),
    featured: false
  }
];
```

**Prerequisites:** Story 3.1 complete

---

### Story 3.3: Build Portfolio Section on Homepage

**As a** visitor
**I want** to see portfolio examples on the homepage
**So that** I can quickly assess the quality of work

**Acceptance Criteria:**

**Given** I scroll to the portfolio section on homepage
**When** I view the portfolio grid
**Then** I see:
- Section heading: "See What We've Built" (text-4xl, font-bold, text-neutral-900)
- Subheading: "From embarrassed to proud in 2 weeks" (text-xl, text-neutral-700)
- Social proof: "Join 50+ rural businesses with beautiful websites" (text-neutral-600)
- 3-column grid of flip cards (desktop)
- Featured portfolio items displayed first
- CTA button: "Start Your Transformation" (primary variant, links to #contact)
- Secondary link: "View Full Portfolio" (text link, links to /portfolio page)

**And** grid is responsive:
- Desktop (1024px+): 3 columns (grid-cols-3)
- Tablet (768-1024px): 2 columns (md:grid-cols-2)
- Mobile (< 768px): 1 column (grid-cols-1)

**And** section spacing:
- Top padding: pt-24 (96px)
- Bottom padding: pb-24 (96px)
- Max width: max-w-7xl mx-auto
- Side padding: px-4
- Gap between cards: gap-8

**Technical Implementation:**
```astro
---
// src/components/Portfolio.astro
import FlipCard from './FlipCard.astro';
import Button from './Button.astro';
import { portfolioItems } from '../data/portfolio';

// Show only featured items on homepage (max 3)
const featuredItems = portfolioItems
  .filter(item => item.featured)
  .slice(0, 3);
---
<section class="py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4">
    <h2 class="text-4xl font-bold text-neutral-900 text-center mb-4">
      See What We've Built
    </h2>
    <p class="text-xl text-neutral-700 text-center mb-2 max-w-2xl mx-auto">
      From embarrassed to proud in 2 weeks
    </p>
    <p class="text-neutral-600 text-center mb-12">
      Join 50+ rural businesses with beautiful websites
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      {featuredItems.map(item => (
        <FlipCard
          frontImage={item.beforeImage}
          frontAlt={`Before: ${item.clientName}`}
          backImage={item.afterImage}
          backAlt={`After: ${item.clientName}`}
          clientName={item.clientName}
          result={item.result}
        />
      ))}
    </div>

    <div class="text-center space-y-4">
      <Button href="#contact" size="lg">
        Start Your Transformation
      </Button>
      <div>
        <a href="/portfolio" class="text-primary-600 hover:text-primary-700 font-semibold">
          View Full Portfolio →
        </a>
      </div>
    </div>
  </div>
</section>
```

**UX Reference:** UX Design Spec lines 2084-2090 (Portfolio showcase 3-column grid)
**Prerequisites:** Story 3.2 complete

---

### Story 3.4: Create Portfolio Page

**As a** visitor
**I want** to view all portfolio case studies on a dedicated page
**So that** I can see the full range of work

**Acceptance Criteria:**

**Given** I click "View Full Portfolio" from homepage
**When** I navigate to /portfolio page
**Then** I see:
- Page title: "Portfolio" (h1, text-5xl, font-bold)
- Page description: "Real transformations for real rural businesses"
- Filter buttons: All | Campgrounds | Wineries | Restaurants
- Grid of all portfolio items (not just featured)
- Each item is a flip card

**And** filter functionality works:
- "All" shows all portfolio items (default)
- "Campgrounds" shows only campground projects
- "Wineries" shows only winery projects
- "Restaurants" shows only restaurant projects
- Active filter has primary-500 background
- Filter state persists during page session

**And** filter clicks are tracked for analytics:
- Log filter selection to Vercel Analytics or Plausible
- Track which portfolio items get most clicks
- Measure time spent on portfolio page
- Data informs which client templates to build first in Phase 3

**And** grid is responsive:
- Desktop (1024px+): 3 columns
- Tablet (768-1024px): 2 columns
- Mobile (< 768px): 1 column

**And** page has proper SEO:
- Title: "Portfolio - AnywhereSoftware"
- Description: "See our before and after website transformations for campgrounds, wineries, and rural businesses"
- Open Graph tags for social sharing

**Technical Implementation:**
```astro
---
// src/pages/portfolio.astro
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import FlipCard from '../components/FlipCard.astro';
import Footer from '../components/Footer.astro';
import { portfolioItems } from '../data/portfolio';
---
<Layout
  title="Portfolio - AnywhereSoftware"
  description="See our before and after website transformations for campgrounds, wineries, and rural businesses"
>
  <Header />
  <main class="py-24">
    <div class="max-w-7xl mx-auto px-4">
      <h1 class="text-5xl font-bold text-neutral-900 text-center mb-4">
        Portfolio
      </h1>
      <p class="text-xl text-neutral-700 text-center mb-12 max-w-2xl mx-auto">
        Real transformations for real rural businesses
      </p>

      <!-- Filter Buttons -->
      <div class="flex justify-center gap-4 mb-12">
        <button class="filter-btn active" data-filter="all">All</button>
        <button class="filter-btn" data-filter="campground">Campgrounds</button>
        <button class="filter-btn" data-filter="winery">Wineries</button>
        <button class="filter-btn" data-filter="restaurant">Restaurants</button>
      </div>

      <!-- Portfolio Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioItems.map(item => (
          <div class="portfolio-item" data-industry={item.industry}>
            <FlipCard
              frontImage={item.beforeImage}
              frontAlt={`Before: ${item.clientName}`}
              backImage={item.afterImage}
              backAlt={`After: ${item.clientName}`}
              clientName={item.clientName}
              result={item.result}
            />
          </div>
        ))}
      </div>
    </div>
  </main>
  <Footer />
</Layout>

<script>
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioElements = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');

      // Update active state
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Filter items
      portfolioElements.forEach(item => {

        // Track filter selection (Vercel Analytics)
        if (typeof window.va !== 'undefined') {
          window.va('event', 'portfolio_filter', { filter });
        }
        if (filter === 'all' || item.getAttribute('data-industry') === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
</script>

<style>
  .filter-btn {
    @apply px-6 py-3 rounded-lg font-semibold transition-colors;
    @apply bg-neutral-100 text-neutral-700 hover:bg-neutral-200;
  }

  .filter-btn.active {
    @apply bg-primary-500 text-white hover:bg-primary-600;
  }
</style>
```

**UX Reference:** UX Design Spec lines 2542-2545 (Portfolio page with filter)
**Prerequisites:** Story 3.3 complete

---

### Story 3.5: Add Placeholder Portfolio Images

**As a** developer
**I want** placeholder images for portfolio items
**So that** the portfolio section looks complete during MVP

**Acceptance Criteria:**

**Given** I need portfolio images for MVP
**When** I add placeholder images
**Then** I have before/after images for:
- Mary Jane's Campground (3 images: before, after, hero)
- Sunset Valley Winery (2 images: before, after)
- Farm Table Restaurant (2 images: before, after)

**And** images are optimized:
- Format: WebP with JPEG fallback
- Size: < 500KB each
- Dimensions: 1:1 aspect ratio (1000x1000px)
- Alt text descriptive and specific

**And** images are sourced ethically:
- Use Unsplash for placeholder images (development only)
- Credit photographers in image metadata
- **CRITICAL:** Watermark placeholder images with "Example Design"
- Add disclaimer: "Portfolio examples. Real client sites coming soon."
- Replace with actual client screenshots before public launch
- Legal compliance: Do not misrepresent placeholder images as real client work

**Technical Implementation:**
```bash
# Option 1: Download from Unsplash.com manually (recommended)
# Visit unsplash.com, search for relevant images, download, add watermark

# Option 2: Create mockup screenshots yourself
# Use Figma/Canva to create before/after mockups
# Export as 1000x1000px JPG/PNG

# Option 3: Use solid color placeholders for MVP
# Create simple colored squares with text overlay
# Replace with real screenshots when available

# Add watermark to all placeholder images:
# Use ImageMagick or Photoshop to add "Example Design" text overlay
convert input.jpg -pointsize 60 -fill 'rgba(255,255,255,0.5)' -gravity center -annotate +0+0 'Example Design' output.jpg

# Optimize all images
# Use Astro Image component for automatic optimization
```

**Add disclaimer to portfolio page:**
```astro
<p class="text-sm text-neutral-500 text-center mt-8">
  * Portfolio examples shown with placeholder images. Real client sites coming soon.
</p>
```

**Prerequisites:** Story 3.4 complete

---

## Epic 3 Complete

**Stories Created:** 6
**FR Coverage:** FR2 (portfolio case studies)
**Technical Context:** Flip card component with 3D CSS transform, TypeScript data structure, filterable portfolio page with analytics tracking
**UX Integration:** User Journey 2 (Client → First Site Preview) visual proof, flip cards from "Mountain Vista" design direction
**Team Refinements Applied:**
- CSS configuration fixed (Tailwind utilities, no scoped styles) (Winston)
- Story 3.1 split into 3.1a (CSS hover) and 3.1b (JavaScript interactions) (Sarah)
- Filter naming collision fixed (portfolioElements vs portfolioItems) (Winston)
- Business context added to portfolio data (testimonials, challenges, timeline) (John)
- Conversion optimization added to homepage section (headline, CTA, social proof) (John)
- Analytics tracking added to portfolio filters (Vercel Analytics) (John)
- Legal disclaimer added for placeholder images (watermark, disclaimer text) (John)
- Runtime validation added with Zod schema (Winston)

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Epic 4: Contact Form & Lead Capture

**Epic Goal:** Visitors can request consultations and become leads

**Stories:**

### Story 4.1: Build Contact Form Component

**As a** visitor
**I want** to submit a consultation request
**So that** I can get help with my website needs

**Acceptance Criteria:**

**Given** I am on the homepage
**When** I scroll to the contact section
**Then** I see a contact form with fields:
- **Name:** Text input (required)
- **Business Type:** Select dropdown (Campground, Winery, Restaurant, Other)
- **Location:** Text input (City, State - required)
- **Message:** Textarea (Tell us about your needs - required)
- **Submit button:** "Request Consultation" (primary variant, size lg)

**And** form has proper validation:
- Required fields show error if empty on submit
- Email validation (RFC 5322 format)
- Real-time validation (show errors as user types)
- Error messages are clear and actionable
- Success state shows after submission

**And** form is accessible:
- Labels associated with inputs (for/id attributes)
- Error messages announced to screen readers (aria-live)
- Focus moves to first error on submit
- Keyboard navigable (Tab through fields)
- Large touch targets (48px height minimum)

**And** form is responsive:
- Desktop: 2-column layout (Name/Email, Business/Location)
- Mobile: Single column, stacked fields
- Full width on mobile (< 768px)
- Max width 600px on desktop

**And** form includes conversion elements:
- Trust signals above form ("Free consultation • No obligation • 24-hour response")
- Social proof ("Join 50+ rural businesses")
- Privacy reassurance below submit button
- Clear value proposition in heading

**And** form includes spam protection:
- Honeypot field (_gotcha) hidden from users, catches bots
- Client-side rate limiting (prevent rapid submissions)

**Technical Implementation:**
```astro
---
// src/components/ContactForm.astro
---
<section id="contact" class="py-24 bg-neutral-50">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-4xl font-bold text-neutral-900 text-center mb-4">
      Start Your Transformation
    </h2>
    <p class="text-xl text-neutral-700 text-center mb-4 max-w-2xl mx-auto">
      Tell us about your business. We'll reach out within 24 hours.
    </p>

    <!-- Trust signals -->
    <p class="text-sm text-neutral-600 text-center mb-6">
      ✓ Free consultation • ✓ No obligation • ✓ 24-hour response
    </p>

    <!-- Social proof -->
    <p class="text-sm text-neutral-600 text-center mb-12">
      Join 50+ rural businesses who've transformed their online presence
    </p>

    <form id="contact-form" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="name" class="block text-sm font-medium text-neutral-700 mb-2">
            Your Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Mary Jane"
          />
          <p class="text-sm text-error mt-1 hidden" role="alert" aria-live="polite">
            Please enter your name
          </p>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-neutral-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="you@example.com"
          />
          <p class="text-sm text-error mt-1 hidden" role="alert" aria-live="polite">
            Please enter a valid email
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="business-type" class="block text-sm font-medium text-neutral-700 mb-2">
            Business Type *
          </label>
          <select
            id="business-type"
            name="businessType"
            required
            class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Select one...</option>
            <option value="campground">Campground</option>
            <option value="winery">Winery</option>
            <option value="restaurant">Restaurant</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label for="location" class="block text-sm font-medium text-neutral-700 mb-2">
            Location *
          </label>
          <input
            type="text"
            id="location"
            name="location"
            required
            class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Portland, OR"
          />
        </div>
      </div>

      <div>
        <label for="message" class="block text-sm font-medium text-neutral-700 mb-2">
          Tell us about your needs *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows="4"
          class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="I need a new website for my campground..."
        ></textarea>
      </div>

      <!-- Honeypot spam protection (hidden from users) -->
      <div style="position: absolute; left: -5000px;" aria-hidden="true">
        <input type="text" name="_gotcha" tabindex="-1" autocomplete="off" />
      </div>

      <!-- Progressive disclosure for optional fields -->
      <details class="border-t border-neutral-200 pt-6">
        <summary class="cursor-pointer text-primary-600 font-semibold hover:text-primary-700">
          + Add more details (optional - helps us prepare better)
        </summary>
        <div class="mt-6 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="budget" class="block text-sm font-medium text-neutral-700 mb-2">
                Budget Range
              </label>
              <select
                id="budget"
                name="budget"
                class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select one...</option>
                <option value="under-5k">Under $5,000</option>
                <option value="5k-15k">$5,000 - $15,000</option>
                <option value="15k-25k">$15,000 - $25,000</option>
                <option value="25k-plus">$25,000+</option>
                <option value="not-sure">Not sure yet</option>
              </select>
            </div>

            <div>
              <label for="timeline" class="block text-sm font-medium text-neutral-700 mb-2">
                Timeline
              </label>
              <select
                id="timeline"
                name="timeline"
                class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select one...</option>
                <option value="asap">ASAP</option>
                <option value="1-3-months">1-3 months</option>
                <option value="3-6-months">3-6 months</option>
                <option value="exploring">Just exploring</option>
              </select>
            </div>
          </div>

          <div>
            <label for="current-website" class="block text-sm font-medium text-neutral-700 mb-2">
              Current Website (if you have one)
            </label>
            <input
              type="url"
              id="current-website"
              name="currentWebsite"
              class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="https://example.com"
            />
          </div>
        </div>
      </details>

      <button
        type="submit"
        class="w-full md:w-auto px-10 py-4 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors text-lg"
      >
        Request Consultation
      </button>

      <!-- Privacy reassurance -->
      <p class="text-xs text-neutral-500 mt-4">
        We respect your privacy. Your information will never be shared.
      </p>
    </form>
  </div>
</section>
```

**UX Reference:** UX Design Spec lines 2255-2276 (Contact Form component), User Journey 1 (Visitor → Contact Submission)
**Prerequisites:** Epic 3 complete

---

### Story 4.2: Integrate Formspree for Form Submission

**As a** visitor
**I want** my form submission to reach Carson
**So that** I can get a response to my consultation request

**Acceptance Criteria:**

**Given** I have filled out the contact form
**When** I click "Request Consultation"
**Then** form data is submitted to Formspree API
**And** I see a success message: "Thanks! We'll reach out within 24 hours."
**And** form fields are cleared
**And** Carson receives an email notification with:
- Subject line: "New Lead: [Business Type] in [Location] - [Budget]"
- Visitor name
- Email address
- Business type
- Location
- Message content
- Lead qualification data (budget, timeline, current website)
- Timestamp
- Email formatted for quick scanning

**And** form handles errors gracefully:
- Network error: "Oops! Something went wrong. Please try again."
- Validation error: Show specific field errors
- Rate limit error: "Too many requests. Please try again in a few minutes."

**And** form shows loading state:
- Submit button shows "Sending..." with spinner
- Form fields are disabled during submission
- Button is disabled to prevent double-submit

**Technical Implementation:**
```astro
<script>
  const form = document.getElementById('contact-form');
  const submitButton = form?.querySelector('button[type="submit"]');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Show loading state
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Success
        form.reset();
        showSuccessMessage();

        // Track successful submission
        if (typeof window.va !== 'undefined') {
          window.va('event', 'contact_form_submit', {
            businessType: formData.get('businessType'),
            location: formData.get('location'),
            budget: formData.get('budget') || 'not-provided',
            timeline: formData.get('timeline') || 'not-provided'
          });
        }
      } else {
        // Handle Formspree-specific errors
        const data = await response.json();

        if (data.errors) {
          // Show field-specific errors from Formspree
          data.errors.forEach(error => {
            const field = form.querySelector(`[name="${error.field}"]`);
            if (field) {
              const errorElement = field.nextElementSibling;
              field.classList.add('border-error');
              errorElement?.classList.remove('hidden');
              errorElement.textContent = error.message;
            }
          });
        } else {
          showErrorMessage('Oops! Something went wrong. Please try again.');
        }
      }
    } catch (error) {
      showErrorMessage('Network error. Please check your connection.');
    } finally {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
  });

  function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'bg-success/10 border-2 border-success text-success px-6 py-4 rounded-lg mb-6';
    successDiv.textContent = "Thanks! We'll reach out within 24 hours.";
    form.insertBefore(successDiv, form.firstChild);

    setTimeout(() => successDiv.remove(), 5000);
  }

  function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'bg-error/10 border-2 border-error text-error px-6 py-4 rounded-lg mb-6';
    errorDiv.textContent = message;
    form.insertBefore(errorDiv, form.firstChild);

    setTimeout(() => errorDiv.remove(), 5000);
  }
</script>
```

**Setup Instructions:**
```bash
# 1. Sign up for Formspree (free tier: 50 submissions/month)
# 2. Create new form at formspree.io
# 3. Copy form ID
# 4. Replace YOUR_FORM_ID in code above
# 5. Configure email notifications in Formspree dashboard
```

**UX Reference:** Technical Architecture lines 1748-1753 (Formspree integration)
**Prerequisites:** Story 4.1 complete

**Formspree Configuration:**
```
# In Formspree dashboard:
1. Set email subject: "New Lead: {{businessType}} in {{location}} - {{budget}}"
2. Enable spam filtering (honeypot + reCAPTCHA if needed)
3. Set auto-reply: "Thanks for reaching out! We'll respond within 24 hours."
4. Add webhook for CRM integration (future)
```

---

### Story 4.3: Add Form Validation with Real-Time Feedback

**As a** visitor
**I want** to see validation errors as I type
**So that** I can fix mistakes before submitting

**Acceptance Criteria:**

**Given** I am filling out the contact form
**When** I interact with a field
**Then** validation runs in real-time:
- **Name:** Shows error if empty on blur
- **Email:** Shows error if invalid format on blur
- **Business Type:** Shows error if not selected on blur
- **Location:** Shows error if empty on blur
- **Message:** Shows error if empty on blur

**And** validation provides helpful feedback:
- Email: "Please enter a valid email address (e.g., you@example.com)"
- Name: "Please enter your name"
- Business Type: "Please select your business type"
- Location: "Please enter your city and state"
- Message: "Please tell us about your needs"

**And** validation styling is clear:
- Invalid field: border-error (red border)
- Valid field: border-success (green border)
- Error message: text-error, text-sm, mt-1
- Error icon: Red X next to field

**And** form prevents submission if invalid:
- Submit button disabled until all fields valid
- Or show all errors on submit attempt
- Focus moves to first invalid field

**Technical Implementation:**
```astro
<script>
  const form = document.getElementById('contact-form');
  const fields = {
    name: form?.querySelector('#name'),
    email: form?.querySelector('#email'),
    businessType: form?.querySelector('#business-type'),
    location: form?.querySelector('#location'),
    message: form?.querySelector('#message')
  };

  // Email validation regex (RFC 5322 simplified)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Debounced validation to prevent lag
  let validationTimeout;

  // Validate on blur
  Object.entries(fields).forEach(([name, field]) => {
    field?.addEventListener('blur', () => validateField(name, field));

    // Debounced validation on input (only if field has error)
    field?.addEventListener('input', () => {
      if (field.classList.contains('border-error')) {
        clearTimeout(validationTimeout);
        validationTimeout = setTimeout(() => {
          validateField(name, field);
        }, 300); // Wait 300ms after user stops typing
      }
    });
  });

  function validateField(name, field) {
    const value = field.value.trim();
    const errorElement = field.nextElementSibling;

    let isValid = true;
    let errorMessage = '';

    if (name === 'email') {
      isValid = emailRegex.test(value);
      errorMessage = 'Please enter a valid email address (e.g., you@example.com)';
    } else if (name === 'businessType') {
      isValid = value !== '';
      errorMessage = 'Please select your business type';
    } else {
      isValid = value.length > 0;
      errorMessage = `Please enter your ${name}`;
    }

    if (isValid) {
      field.classList.remove('border-error');
      field.classList.add('border-success');
      errorElement?.classList.add('hidden');
    } else {
      field.classList.add('border-error');
      field.classList.remove('border-success');
      errorElement?.classList.remove('hidden');
      errorElement.textContent = errorMessage;
    }

    return isValid;
  }

  // Validate all fields on submit
  form?.addEventListener('submit', (e) => {
    let isFormValid = true;

    Object.entries(fields).forEach(([name, field]) => {
      if (!validateField(name, field)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      e.preventDefault();
      // Focus first invalid field
      const firstInvalid = form.querySelector('.border-error');
      firstInvalid?.focus();
    }
  });
</script>
```

**UX Reference:** UX Design Spec lines 2261-2265 (Form validation patterns)
**Prerequisites:** Story 4.2 complete

**Performance Note:**
Debouncing reduces validation calls by ~90%, preventing lag on slow devices while still providing real-time feedback.

---

### Story 4.4: Add Contact Section to Homepage

**As a** visitor
**I want** to easily find the contact form
**So that** I can request a consultation

**Acceptance Criteria:**

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
- Scroll offset accounts for sticky header (if applicable)

**And** form analytics are tracked:
- Form view (when contact section enters viewport)
- Form start (first field interaction)
- Form submission (successful submit)
- Conversion rate baseline (views → submissions)
- Field abandonment tracking (which fields cause drop-off)

**Technical Implementation:**
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

**UX Reference:** User Journey 1 completion (Visitor → Contact Submission)
**Prerequisites:** Story 4.3 complete

**Analytics Baseline:**
Track these metrics for future A/B testing:
- Conversion rate: (submissions / views) - Target: 3-5%
- Form start rate: (starts / views) - Target: 20-30%
- Completion rate: (submissions / starts) - Target: 40-60%
- Average time to complete: Target: < 2 minutes

**Future A/B Test Ideas:**
- Headline: "Start Your Transformation" vs. "Get Your Free Consultation"
- Button: "Request Consultation" vs. "Get Started" vs. "Talk to Carson"
- Form length: 4 required fields vs. all fields required vs. progressive disclosure
- Trust signals: Above form vs. below form vs. none

---

## Epic 4 Complete ✅

**Stories Created:** 4
**FR Coverage:** FR3 (inquiry forms), User Journey 1 complete
**Technical Context:** Contact form with Formspree integration, debounced real-time validation, honeypot spam protection, form analytics, accessible and responsive
**UX Integration:** User Journey 1 (Portfolio Site Visitor → Contact Submission) fully implemented
**Team Refinements Applied:**
- Honeypot spam protection added (_gotcha field) (Winston)
- Formspree-specific error handling (field-level errors) (Winston)
- Debounced validation to prevent lag (300ms delay) (Winston)
- Form analytics tracking (view, start, submit, abandonment) (Winston)
- Trust signals and social proof above form (John)
- Lead qualification fields (budget, timeline, current website) (John)
- Progressive disclosure for optional fields (John)
- A/B test instrumentation and baseline metrics (John)
- Privacy reassurance below submit button (John)

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Epic 5: About Page & Brand Story

**Epic Goal:** Visitors understand Carson's unique mobile consulting model and feel confident in his expertise

**Stories:**

### Story 5.1: Build About Page Hero Section

**As a** visitor
**I want** to learn about Carson and his mobile consulting approach
**So that** I understand what makes AnywhereSoftware different

**Acceptance Criteria:**

**Given** I navigate to /about
**When** the page loads
**Then** I see a hero section with:
- **Headline:** "Technology That Comes to You"
- **Subheadline:** "I travel in an RV to meet rural businesses on-site. No video calls, no remote consultations—just face-to-face service where you are."
- **Hero image:** Carson with RV at a scenic rural location (campground, winery, etc.)
- **CTA button:** "See How It Works" (scrolls to process section)

**And** hero section is responsive:
- Desktop: Image on right, text on left (60/40 split)
- Tablet: Image on top, text below
- Mobile: Stacked layout, full-width image

**And** hero section uses Mountain Vista design:
- Background: bg-neutral-50
- Headline: text-neutral-900, font-bold, text-5xl
- Subheadline: text-neutral-700, text-xl
- Image: rounded-lg, shadow-lg

**And** hero includes trust signal:
- Badge/text: "Serving rural businesses across the Pacific Northwest"
- Or: "50+ sites built, 100% on-site"

**And** image is optimized:
- WebP format with JPEG fallback
- Quality: 85 (balance quality vs. file size)
- Blur placeholder while loading

**Technical Implementation:**
```astro
---
// src/pages/about.astro
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import { Image } from 'astro:assets';
import heroImage from '../assets/images/carson-rv-hero.jpg';
---
<Layout
  title="About AnywhereSoftware - Mobile Web Design Consultant"
  description="Carson travels in an RV to meet rural businesses on-site. Face-to-face web design and consulting for campgrounds, wineries, and rural hospitality."
>
  <Header />
  <main id="main">
    <section class="py-24 bg-neutral-50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <!-- Trust signal -->
            <p class="text-sm font-semibold text-primary-600 mb-4">
              Serving rural businesses across the Pacific Northwest
            </p>

            <h1 class="text-5xl font-bold text-neutral-900 mb-6">
              The Only Web Consultant Who Travels to You
            </h1>
            <p class="text-xl text-neutral-700 mb-8 leading-relaxed">
              I live in an RV and meet clients on-site. Face-to-face consulting for
              campgrounds, wineries, and rural businesses.
            </p>

            <!-- Alternative headlines to A/B test:
            Option A: "Your Website, Built On-Site"
            Option B: "Tired of Remote Agencies Who Don't Get It?"
            Option C: "The Only Web Consultant Who Travels to You" (current)
            -->
            <a
              href="#process"
              class="inline-block px-8 py-4 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors"
            >
              See How It Works
            </a>
          </div>

          <div>
            <Image
              src={heroImage}
              alt="Carson with RV at a rural campground"
              class="rounded-lg shadow-lg"
              width={600}
              height={400}
              loading="eager"
              format="webp"
              quality={85}
              placeholder="blur"
            />
          </div>
        </div>
      </div>
    </section>
  </main>
  <Footer />
</Layout>
```

**UX Reference:** UX Design Spec lines 1634-1650 (About page design), PRD lines 158-165 (Discovery stage)
**Prerequisites:** Epic 4 complete

**Content Needed:**
- [ ] Carson's photo with RV (high-resolution, 1200x800px minimum)
- [ ] RV hero image at scenic location

**A/B Test Plan:**
Test 3 headline variations to optimize conversion:
- Variant A: "Your Website, Built On-Site" (benefit-focused)
- Variant B: "Tired of Remote Agencies Who Don't Get It?" (problem-focused)
- Variant C: "The Only Web Consultant Who Travels to You" (unique mechanism)

---

### Story 5.2: Build "Why Mobile Consulting?" Section

**As a** visitor
**I want** to understand the benefits of on-site consulting
**So that** I see the value in Carson's approach

**Acceptance Criteria:**

**Given** I am on the About page
**When** I scroll past the hero
**Then** I see a "Why Mobile Consulting?" section with:
- **Section headline:** "Why I Come to You"
- **3 benefit cards:**
  1. **Face-to-Face Trust:** "Rural business owners prefer in-person relationships. I meet you where you're comfortable—your property, your pace."
  2. **On-Site Understanding:** "I see your operation firsthand. Your challenges, your guests, your unique story. Better context = better solutions."
  3. **No Tech Barriers:** "No Zoom fatigue, no screen sharing confusion. Just clear conversation and hands-on training when it's time to launch."

**And** benefit cards have:
- Icon (relevant to benefit) - use shared Icon component
- Headline (bold, text-neutral-900)
- Description (text-neutral-700)
- Proof point (testimonial quote, text-sm, text-primary-600)
- Card styling: bg-white, rounded-lg, shadow-md, p-8

**And** section is responsive:
- Desktop: 3 columns
- Tablet: 2 columns (third card full width)
- Mobile: Single column, stacked

**And** section has:
- Section ID: "benefits" (for anchor links)
- Background: bg-white
- Padding: py-24

**Technical Implementation:**
```astro
<section id="benefits" class="py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4">
    <h2 class="text-4xl font-bold text-neutral-900 text-center mb-16">
      Why I Come to You
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Benefit 1 -->
      <div class="bg-white rounded-lg shadow-md p-8">
        <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
          <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-neutral-900 mb-4">
          Face-to-Face Trust
        </h3>
        <p class="text-neutral-700 leading-relaxed">
          Rural business owners prefer in-person relationships. I meet you where
          you're comfortable—your property, your pace.
        </p>
      </div>

      <!-- Benefit 2 -->
      <div class="bg-white rounded-lg shadow-md p-8">
        <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
          <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-neutral-900 mb-4">
          On-Site Understanding
        </h3>
        <p class="text-neutral-700 leading-relaxed">
          I see your operation firsthand. Your challenges, your guests, your unique
          story. Better context = better solutions.
        </p>
      </div>

      <!-- Benefit 3 -->
      <div class="bg-white rounded-lg shadow-md p-8">
        <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
          <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-neutral-900 mb-4">
          No Tech Barriers
        </h3>
        <p class="text-neutral-700 leading-relaxed">
          No Zoom fatigue, no screen sharing confusion. Just clear conversation
          and hands-on training when it's time to launch.
        </p>
      </div>
    </div>
  </div>
</section>
```

**UX Reference:** PRD lines 184-189 (Non-technical user accommodations)
**Prerequisites:** Story 5.1 complete

---

### Story 5.3: Build "How It Works" Process Section

**As a** visitor
**I want** to understand Carson's consulting process
**So that** I know what to expect if I hire him

**Acceptance Criteria:**

**Given** I am on the About page
**When** I scroll to the "How It Works" section
**Then** I see a 4-step process:
1. **Discovery:** "We meet at your property. I learn about your business, your guests, and your goals."
2. **Planning:** "I create a custom proposal with timeline and pricing. You approve, and we get started."
3. **Building:** "I design and build your site. You review progress and provide feedback along the way."
4. **Launch:** "I train you in person, hand off materials, and stay available for ongoing support."

**And** each step has:
- Step number (large, primary-500 color)
- Timeline (e.g., "Week 1", text-sm, text-primary-600)
- Step title (bold, text-neutral-900)
- Step description (text-neutral-700)
- Scroll-triggered fade-in animation

**And** steps are connected visually:
- Desktop: Horizontal timeline with connecting line
- Mobile: Vertical timeline with connecting line

**And** section has:
- Section ID: "process" (for anchor links)
- Background: bg-neutral-50
- Padding: py-24

**And** timeline expectations are clear:
- Discovery: Week 1
- Planning: Week 2
- Building: Weeks 3-8 (varies by package)
- Launch: Week 9

**Technical Implementation:**
```astro
<section id="process" class="py-24 bg-neutral-50">
  <div class="max-w-5xl mx-auto px-4">
    <h2 class="text-4xl font-bold text-neutral-900 text-center mb-16">
      How It Works
    </h2>

    <div class="relative">
      <!-- Connecting line (hidden on mobile) -->
      <div class="hidden lg:block absolute top-12 left-0 right-0 h-1 bg-primary-200" aria-hidden="true"></div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
        <!-- Step 1 -->
        <div class="text-center process-step">
          <div class="w-24 h-24 bg-primary-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 relative z-10">
            1
          </div>
          <p class="text-sm text-primary-600 font-semibold mb-2">
            Week 1
          </p>
          <h3 class="text-xl font-bold text-neutral-900 mb-3">
            Discovery
          </h3>
          <p class="text-neutral-700">
            We meet at your property. I learn about your business, your guests,
            and your goals.
          </p>
        </div>

        <!-- Step 2 -->
        <div class="text-center process-step">
          <div class="w-24 h-24 bg-primary-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 relative z-10">
            2
          </div>
          <p class="text-sm text-primary-600 font-semibold mb-2">
            Week 2
          </p>
          <h3 class="text-xl font-bold text-neutral-900 mb-3">
            Planning
          </h3>
          <p class="text-neutral-700">
            I create a custom proposal with timeline and pricing. You approve,
            and we get started.
          </p>
        </div>

        <!-- Step 3 -->
        <div class="text-center process-step">
          <div class="w-24 h-24 bg-primary-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 relative z-10">
            3
          </div>
          <p class="text-sm text-primary-600 font-semibold mb-2">
            Weeks 3-8
          </p>
          <h3 class="text-xl font-bold text-neutral-900 mb-3">
            Building
          </h3>
          <p class="text-neutral-700">
            I design and build your site. You review progress and provide feedback
            along the way.
          </p>
        </div>

        <!-- Step 4 -->
        <div class="text-center process-step">
          <div class="w-24 h-24 bg-primary-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 relative z-10">
            4
          </div>
          <p class="text-sm text-primary-600 font-semibold mb-2">
            Week 9
          </p>
          <h3 class="text-xl font-bold text-neutral-900 mb-3">
            Launch
          </h3>
          <p class="text-neutral-700">
            I train you in person, hand off materials, and stay available for
            ongoing support.
          </p>
        </div>
      </div>
    </div>

    <div class="text-center mt-12">
      <a
        href="/#contact"
        class="inline-block px-8 py-4 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors"
      >
        Start Your Project
      </a>
    </div>
  </div>
</section>

<script>
  // Scroll-triggered animation for process steps
  const steps = document.querySelectorAll('.process-step');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
      }
    });
  }, { threshold: 0.2 });

  steps.forEach(step => observer.observe(step));
</script>

<style>
  .process-step {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .animate-fade-in-up {
    opacity: 1;
    transform: translateY(0);
  }
</style>
```

**UX Reference:** PRD lines 157-180 (Client Journey Stages)
**Prerequisites:** Story 5.2 complete (can be done in parallel with 5.1)

---

### Story 5.4: Build "About Carson" Bio Section

**As a** visitor
**I want** to learn about Carson's background and expertise
**So that** I trust him to build my website

**Acceptance Criteria:**

**Given** I am on the About page
**When** I scroll to the bio section
**Then** I see:
- **Section headline:** "Meet Carson"
- **Carson's photo:** Professional headshot or casual photo with RV
- **Bio text:** 2-3 paragraphs covering:
  - Background in web development and consulting
  - Why he chose mobile consulting for rural businesses
  - Personal connection to rural communities (camping, travel, etc.)
  - Technical expertise (Astro, React, modern web development)
- **Credentials/Skills:** List of technologies and services
- **Social proof stats:** 50+ sites, 15 retainers, 10K+ miles traveled
- **Client logos:** Trusted by section (if available)
- **CTA:** "Let's Work Together" → #contact
- **Schema.org markup:** Structured data for SEO

**And** bio section layout:
- Desktop: Photo on left (40%), bio on right (60%)
- Mobile: Photo on top, bio below

**And** section styling:
- Background: bg-white
- Padding: py-24
- Photo: rounded-lg, shadow-lg

**Technical Implementation:**
```astro
<section class="py-24 bg-white">
  <div class="max-w-6xl mx-auto px-4">
    <h2 class="text-4xl font-bold text-neutral-900 text-center mb-16">
      Meet Carson
    </h2>

    <div class="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
      <div class="lg:col-span-2">
        <Image
          src={carsonPhoto}
          alt="Carson, founder of AnywhereSoftware"
          class="rounded-lg shadow-lg"
          width={400}
          height={500}
        />
      </div>

      <div class="lg:col-span-3">
        <!-- Social proof stats -->
        <div class="grid grid-cols-3 gap-6 mb-8 text-center">
          <div>
            <p class="text-4xl font-bold text-primary-600">50+</p>
            <p class="text-sm text-neutral-600">Sites Built</p>
          </div>
          <div>
            <p class="text-4xl font-bold text-primary-600">15</p>
            <p class="text-sm text-neutral-600">Active Retainers</p>
          </div>
          <div>
            <p class="text-4xl font-bold text-primary-600">10K+</p>
            <p class="text-sm text-neutral-600">Miles Traveled</p>
          </div>
        </div>

        <p class="text-lg text-neutral-700 mb-6 leading-relaxed">
          I've been building websites for over a decade, but I got tired of the
          remote-only consulting world. Too many video calls, too much miscommunication,
          and too little connection with the people I was helping.
        </p>

        <p class="text-lg text-neutral-700 mb-6 leading-relaxed">
          When I started traveling full-time in my RV, I discovered a gap: rural
          businesses—campgrounds, wineries, restaurants—needed modern websites, but
          they didn't trust remote agencies. They wanted someone who understood their
          world, someone who'd show up in person.
        </p>

        <p class="text-lg text-neutral-700 mb-8 leading-relaxed">
          So I combined my two passions: web development and RV travel. Now I meet
          clients on-site, build beautiful websites with modern technology (Astro,
          React, Tailwind), and train them face-to-face. It's consulting the way
          it should be—personal, clear, and effective.
        </p>

        <div class="mb-8">
          <h3 class="text-xl font-bold text-neutral-900 mb-4">
            What I Bring to Your Project
          </h3>
          <ul class="grid grid-cols-2 gap-3">
            <li class="flex items-center text-neutral-700">
              <svg class="w-5 h-5 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              Modern Web Development
            </li>
            <li class="flex items-center text-neutral-700">
              <svg class="w-5 h-5 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              Mobile-First Design
            </li>
            <li class="flex items-center text-neutral-700">
              <svg class="w-5 h-5 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              SEO Optimization
            </li>
            <li class="flex items-center text-neutral-700">
              <svg class="w-5 h-5 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              Booking Integrations
            </li>
            <li class="flex items-center text-neutral-700">
              <svg class="w-5 h-5 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              Content Management
            </li>
            <li class="flex items-center text-neutral-700">
              <svg class="w-5 h-5 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              In-Person Training
            </li>
          </ul>
        </div>

        <a
          href="/#contact"
          class="inline-block px-8 py-4 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors"
        >
          Let's Work Together
        </a>
      </div>
    </div>
  </div>
</section>

<!-- Schema.org structured data for SEO -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Carson",
  "jobTitle": "Web Design Consultant",
  "description": "Mobile web design consultant specializing in rural businesses",
  "url": "https://anywheresoftware.com/about",
  "image": "https://anywheresoftware.com/images/carson.jpg",
  "knowsAbout": ["Web Development", "Astro", "React", "Tailwind CSS", "Mobile Consulting"],
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "45.5152",
      "longitude": "-122.6784"
    },
    "geoRadius": "500 miles"
  }
}
</script>
```

**UX Reference:** PRD lines 1-50 (Executive Summary, What Makes This Special)
**Prerequisites:** Story 5.3 complete (can be done in parallel with 5.1, 5.2, 5.3)

**Content Needed:**
- [ ] Carson's bio text (2-3 paragraphs)
- [ ] Professional photo (400x500px minimum)
- [ ] Client logos (if available, optional)

---

### Story 5.5: Add About Page to Navigation

**As a** visitor
**I want** to easily navigate to the About page
**So that** I can learn more about Carson

**Acceptance Criteria:**

**Given** I am on any page
**When** I look at the navigation header
**Then** I see an "About" link in the main navigation
**And** clicking "About" navigates to /about

**And** About link is:
- Positioned between "Portfolio" and "Contact"
- Active state when on /about page (text-primary-600, font-semibold)
- Hover state (text-primary-600)

**And** About page is added to sitemap:
- Homepage → About
- Portfolio → About
- About → Contact (CTA flow)

**And** mobile menu works:
- Mobile menu button toggles menu visibility
- ARIA attributes updated for accessibility
- Menu closes when clicking outside

**And** About page analytics are tracked:
- Page view event
- CTA click events (by section)
- Time on page

**Technical Implementation:**
```astro
---
// src/components/Header.astro (update navigation)
const currentPath = Astro.url.pathname;
---
<header class="sticky top-0 z-50 bg-white border-b border-neutral-200">
  <nav class="max-w-7xl mx-auto px-4 py-4">
    <div class="flex items-center justify-between">
      <a href="/" class="text-2xl font-bold text-neutral-900">
        AnywhereSoftware
      </a>

      <ul class="hidden md:flex items-center space-x-8">
        <li>
          <a
            href="/#services"
            class="text-neutral-700 hover:text-primary-600 transition-colors"
          >
            Services
          </a>
        </li>
        <li>
          <a
            href="/portfolio"
            class={`transition-colors ${currentPath === '/portfolio' ? 'text-primary-600 font-semibold' : 'text-neutral-700 hover:text-primary-600'}`}
          >
            Portfolio
          </a>
        </li>
        <li>
          <a
            href="/about"
            class={`transition-colors ${currentPath === '/about' ? 'text-primary-600 font-semibold' : 'text-neutral-700 hover:text-primary-600'}`}
          >
            About
          </a>
        </li>
        <li>
          <a
            href="/#contact"
            class="px-6 py-2 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors"
          >
            Contact
          </a>
        </li>
      </ul>

      <!-- Mobile menu button -->
      <button
        id="mobile-menu-button"
        class="md:hidden"
        aria-expanded="false"
        aria-controls="mobile-menu"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <div id="mobile-menu" class="hidden md:hidden mt-4 pb-4">
      <ul class="space-y-4">
        <li><a href="/#services" class="block text-neutral-700">Services</a></li>
        <li><a href="/portfolio" class="block text-neutral-700">Portfolio</a></li>
        <li><a href="/about" class="block text-neutral-700">About</a></li>
        <li><a href="/#contact" class="block text-neutral-700">Contact</a></li>
      </ul>
    </div>
  </nav>
</header>

<script>
  // Mobile menu toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  mobileMenuButton?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('hidden');

    // Update ARIA for accessibility
    const isExpanded = !mobileMenu?.classList.contains('hidden');
    mobileMenuButton?.setAttribute('aria-expanded', isExpanded.toString());
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileMenuButton?.contains(e.target) && !mobileMenu?.contains(e.target)) {
      mobileMenu?.classList.add('hidden');
      mobileMenuButton?.setAttribute('aria-expanded', 'false');
    }
  });

  // Track About page analytics
  if (window.location.pathname === '/about') {
    // Track page view
    if (typeof window.va !== 'undefined') {
      window.va('event', 'about_page_view');
    }

    // Track CTA clicks
    document.querySelectorAll('a[href*="contact"]').forEach(link => {
      link.addEventListener('click', () => {
        if (typeof window.va !== 'undefined') {
          window.va('event', 'about_cta_click', {
            section: link.closest('section')?.id || 'unknown'
          });
        }
      });
    });
  }
</script>
```

**UX Reference:** UX Design Spec lines 2200-2220 (Navigation component)
**Prerequisites:** Story 5.1 complete (needs /about route to exist)

---

## Epic 5 Complete

**Stories Created:** 5
**FR Coverage:** About page, brand story, mobile consulting value proposition
**Technical Context:** About page with hero, benefits, process, bio, navigation integration, Schema.org markup, scroll animations, mobile menu JS, analytics tracking
**UX Integration:** Builds trust and credibility, explains unique mobile consulting model
**Team Refinements Applied:**
- Image optimization added (WebP format, quality 85, blur placeholder) (Winston)
- Shared Icon component recommended to reduce HTML bloat (Winston)
- Scroll-triggered animations for process timeline (Winston)
- Schema.org structured data for SEO (Winston)
- Mobile menu toggle JavaScript with ARIA attributes (Winston)
- Stronger headline: "The Only Web Consultant Who Travels to You" (John)
- Trust signal added above headline (John)
- A/B test plan for 3 headline variations (John)
- Proof points added to benefit cards (testimonial quotes) (John)
- Timeline expectations added to process steps (Week 1, Week 2, etc.) (John)
- Social proof stats added (50+ sites, 15 retainers, 10K+ miles) (John)
- About page analytics tracking (page view, CTA clicks) (John)
- Content needed checklist for photos and bio text (Sarah)
- Parallelization noted: Stories 5.1-5.4 can be done simultaneously (Sarah)

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Epic 5 Generated and Saved**

**What would you like to do?**

[a] Advanced Elicitation - Refine Epic 5 stories
[c] Continue - Move to Epic 6 (SEO & Performance)
[p] Party Mode - Get team feedback on Epic 5
[y] YOLO - Generate remaining epics at once (Epics 6-7)

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Epic 6: SEO & Performance Optimization

**Epic Goal:** Site loads fast, ranks well in search engines, and provides excellent user experience

**Stories:**

### Story 6.1: Add SEO Meta Tags and Open Graph

**As a** visitor sharing the site on social media
**I want** to see rich previews with images and descriptions
**So that** I'm more likely to click through

**Acceptance Criteria:**

**Given** I am on any page
**When** I view the page source
**Then** I see complete SEO meta tags:
- **Title tag:** Page-specific, < 60 characters
- **Meta description:** Page-specific, < 160 characters
- **Canonical URL:** Prevents duplicate content issues
- **Robots meta:** Allows indexing (or blocks for staging)

**And** I see Open Graph tags for social sharing:
- **og:title:** Page title
- **og:description:** Page description
- **og:image:** Social share image (1200x630px)
- **og:url:** Canonical URL
- **og:type:** website
- **og:site_name:** AnywhereSoftware

**And** I see Twitter Card tags:
- **twitter:card:** summary_large_image
- **twitter:title:** Page title
- **twitter:description:** Page description
- **twitter:image:** Social share image

**And** I see mobile-specific optimizations:
- **viewport-fit:** cover (for iOS notch)
- **theme-color:** Browser chrome color (light/dark mode)
- **apple-mobile-web-app:** iOS-specific tags

**And** I see complete favicon set:
- SVG favicon (modern browsers)
- PNG favicons (32x32, 16x16)
- Apple Touch Icon (180x180)
- Web manifest

**And** meta descriptions follow keyword strategy:
- Homepage: Target "mobile web design consultant"
- About: Target "RV web designer", "on-site web development"
- Portfolio: Target "rural business websites"

**Technical Implementation:**
```astro
---
// src/layouts/Layout.astro
interface Props {
  title: string;
  description: string;
  image?: string;
  canonical?: string;
}

const {
  title,
  description,
  image = '/images/og-default.jpg',
  canonical = Astro.url.pathname
} = Astro.props;

const siteUrl = 'https://anywheresoftware.com';
const fullTitle = title.includes('AnywhereSoftware') ? title : `${title} | AnywhereSoftware`;
const canonicalUrl = new URL(canonical, siteUrl).href;
const ogImage = new URL(image, siteUrl).href;
---
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- SEO Meta Tags -->
    <title>{fullTitle}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonicalUrl} />
    <meta name="robots" content="index, follow" />

    <!-- Open Graph -->
    <meta property="og:title" content={fullTitle} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={ogImage} />
    <meta property="og:url" content={canonicalUrl} />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="AnywhereSoftware" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={fullTitle} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={ogImage} />

    <!-- Favicon (all variations) -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />

    <!-- Mobile optimizations -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="AnywhereSoftware" />
    <meta name="theme-color" content="#047857" media="(prefers-color-scheme: light)" />
    <meta name="theme-color" content="#065f46" media="(prefers-color-scheme: dark)" />

    <slot name="head" />
  </head>
  <body>
    <slot />
  </body>
</html>
```

**UX Reference:** Technical Architecture lines 1400-1450 (SEO strategy)
**Prerequisites:** Epic 5 complete

**Content Needed:**
- [ ] Social share images for each page (1200x630px)
- [ ] Favicon files (SVG, PNG 32x32, PNG 16x16, Apple Touch Icon 180x180)
- [ ] Web manifest file (site.webmanifest)

**Keyword-Optimized Meta Descriptions:**
```
Homepage: "Mobile web design consultant who travels to you. I build beautiful websites for rural businesses—campgrounds, wineries, restaurants. On-site service in the Pacific Northwest." (158 chars)

About: "Meet Carson, the web consultant who lives in an RV and travels to rural businesses. Face-to-face service, modern technology, no remote confusion." (152 chars)

Portfolio: "See websites I've built for campgrounds, wineries, and rural businesses across the Pacific Northwest. 50+ sites, 100% on-site service." (139 chars)
```

---

### Story 6.2: Add Sitemap and Robots.txt

**As a** search engine crawler
**I want** to discover all pages efficiently
**So that** I can index the site properly

**Acceptance Criteria:**

**Given** I am a search engine crawler
**When** I visit /sitemap.xml
**Then** I see an XML sitemap with:
- All public pages (homepage, about, portfolio, portfolio items)
- Last modified dates
- Priority values (homepage: 1.0, main pages: 0.8, portfolio items: 0.6)
- Change frequency hints

**And** when I visit /robots.txt
**Then** I see crawl directives:
- Allow all pages (User-agent: *)
- Sitemap location
- Disallow staging/test paths (if any)

**And** sitemap is dynamic:
- Fetches portfolio items from content collections
- Uses actual last modified dates
- Strategic priority values (homepage: 1.0, about/portfolio: 0.9, items: 0.6)

**Technical Implementation:**
```astro
---
// src/pages/sitemap.xml.ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ site }) => {
  // Static pages with strategic priorities
  const staticPages = [
    { url: '', priority: 1.0, changefreq: 'weekly', lastmod: new Date() },
    { url: 'about', priority: 0.9, changefreq: 'monthly', lastmod: new Date() },
    { url: 'portfolio', priority: 0.9, changefreq: 'weekly', lastmod: new Date() },
  ];

  // Dynamic portfolio items from content collections
  const portfolioItems = await getCollection('portfolio');
  const portfolioPages = portfolioItems.map(item => ({
    url: `portfolio/${item.slug}`,
    priority: 0.6,
    changefreq: 'monthly',
    lastmod: item.data.updatedAt || item.data.publishedAt
  }));

  const pages = [...staticPages, ...portfolioPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${site}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
```

```txt
// public/robots.txt
User-agent: *
Allow: /

Sitemap: https://anywheresoftware.com/sitemap.xml
```

**UX Reference:** Technical Architecture lines 1400-1450 (SEO strategy)
**Prerequisites:** Story 6.1 complete

---

### Story 6.3: Optimize Performance (Lighthouse Score 90+)

**As a** visitor on a slow connection
**I want** pages to load quickly
**So that** I don't abandon the site

**Acceptance Criteria:**

**Given** I run Lighthouse on any page
**When** the audit completes
**Then** I see scores of 90+ in all categories:
- **Performance:** 90+ (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- **Accessibility:** 90+
- **Best Practices:** 90+
- **SEO:** 90+

**And** performance optimizations are applied:
- Images lazy-loaded (except above-the-fold)
- Images optimized (WebP with fallbacks)
- CSS minified and inlined for critical path
- JavaScript deferred or async
- Fonts preloaded and subset
- No render-blocking resources
- Resource hints (preload, preconnect, prefetch)
- Lazy loading strategy with fetchpriority

**And** performance budget is enforced:
- Total page weight: < 500 KB
- JavaScript: < 150 KB
- Images: < 200 KB
- CSS: < 50 KB
- Fonts: < 100 KB
- Max requests: 30

**And** Core Web Vitals are optimized:
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

**Technical Implementation:**
```astro
---
// src/layouts/Layout.astro (add to <head>)
---
<head>
  <!-- Preload critical fonts -->
  <link
    rel="preload"
    href="/fonts/inter-var.woff2"
    as="font"
    type="font/woff2"
    crossorigin
  />

  <!-- Preconnect to external domains -->
  <link rel="preconnect" href="https://formspree.io" />
  <link rel="dns-prefetch" href="https://formspree.io" />

  <!-- Prefetch next likely page -->
  <link rel="prefetch" href="/about" />

  <!-- Critical CSS inlined -->
  <style is:inline>
    /* Critical above-the-fold styles */
    body { margin: 0; font-family: system-ui, sans-serif; }
    .hero { min-height: 100vh; }
  </style>
</head>
```

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { squooshImageService } from 'astro/assets/services/squoosh';

export default defineConfig({
  site: 'https://anywheresoftware.com',
  integrations: [
    tailwind(),
    sitemap()
  ],
  build: {
    inlineStylesheets: 'auto',
    assets: '_astro',
  },
  image: {
    service: squooshImageService(),
    domains: [],
  },
  vite: {
    build: {
      cssCodeSplit: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info']
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['astro/components']
          }
        }
      }
    },
    ssr: {
      noExternal: ['@astrojs/image']
    }
  },
  compressHTML: true,
  scopedStyleStrategy: 'class'
});
```

```astro
---
// Lazy Loading Strategy
<Image
  src={image}
  alt={alt}
  loading={isAboveFold ? "eager" : "lazy"}
  decoding={isAboveFold ? "sync" : "async"}
  fetchpriority={isAboveFold ? "high" : "auto"}
/>
```

```json
// Performance Budget
{
  "timings": {
    "firstContentfulPaint": 1800,
    "largestContentfulPaint": 2500,
    "timeToInteractive": 3800,
    "totalBlockingTime": 300
  },
  "resourceSizes": {
    "total": 500,
    "script": 150,
    "image": 200,
    "stylesheet": 50,
    "font": 100
  },
  "resourceCounts": {
    "total": 30,
    "script": 10,
    "image": 15
  }
}
```

**UX Reference:** Technical Architecture lines 1200-1250 (Performance optimization)
**Prerequisites:** Story 6.2 complete

**Validation:**
```bash
# Run Lighthouse audit
npm run build
npx serve dist
npx lighthouse http://localhost:3000 --view

# Target scores:
# Performance: 90+
# Accessibility: 90+
# Best Practices: 90+
# SEO: 90+
```

---

### Story 6.4: Add Structured Data (Schema.org)

**As a** search engine
**I want** to understand the site's content structure
**So that** I can display rich results

**Acceptance Criteria:**

**Given** I am on the homepage
**When** I parse structured data
**Then** I see Organization schema:
- Name: AnywhereSoftware
- Description: Mobile web design consultant
- URL: https://anywheresoftware.com
- Logo
- Contact information
- Service area (Pacific Northwest)

**And** on the About page I see Person schema:
- Name: Carson
- Job title: Web Design Consultant
- Skills and expertise
- Service area

**And** on portfolio items I see CreativeWork schema:
- Name: Project name
- Description: Project description
- Image: Project screenshot
- Author: Carson/AnywhereSoftware

**And** on homepage I see LocalBusiness schema:
- Business name, description, URL
- Contact information (phone, email)
- Service area (Pacific Northwest, 500 miles)
- Price range, opening hours

**And** on all pages I see BreadcrumbList schema:
- Navigation hierarchy
- Position-based ordering
- Proper URL structure

**Technical Implementation:**
```astro
---
// src/components/StructuredData.astro
interface Props {
  type: 'organization' | 'person' | 'creative-work';
  data: any;
}

const { type, data } = Astro.props;

const schemas = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AnywhereSoftware",
    "description": "Mobile web design consultant for rural businesses",
    "url": "https://anywheresoftware.com",
    "logo": "https://anywheresoftware.com/images/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "email": "hello@anywheresoftware.com"
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "45.5152",
        "longitude": "-122.6784"
      },
      "geoRadius": "500 miles"
    }
  },
  localBusiness: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "AnywhereSoftware",
    "description": "Mobile web design consultant for rural businesses",
    "url": "https://anywheresoftware.com",
    "telephone": "+1-555-123-4567",
    "email": "hello@anywheresoftware.com",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "Pacific Northwest",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "45.5152",
      "longitude": "-122.6784"
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "45.5152",
        "longitude": "-122.6784"
      },
      "geoRadius": "500 miles"
    },
    "priceRange": "$$$",
    "openingHours": "Mo-Fr 09:00-17:00"
  },
  breadcrumb: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://anywheresoftware.com"
      }
      // Additional breadcrumb items added dynamically
    ]
  },
  // Person and CreativeWork schemas defined in Story 5.4
};

const schema = schemas[type] || schemas.organization;
---
<script type="application/ld+json" set:html={JSON.stringify(schema)} />
```

**UX Reference:** Technical Architecture lines 1400-1450 (SEO strategy)
**Prerequisites:** Story 6.3 complete

**Validation:**
```bash
# Test structured data
# Visit: https://search.google.com/test/rich-results
# Or: https://validator.schema.org/
```

---

### Story 6.5: Add Analytics and Performance Monitoring

**As a** site owner
**I want** to track visitor behavior and performance
**So that** I can optimize the site over time

**Acceptance Criteria:**

**Given** I have deployed the site
**When** visitors interact with the site
**Then** analytics are tracked:
- Page views
- Custom events (form submissions, CTA clicks, filter interactions)
- Traffic sources
- Device types
- Geographic location

**And** performance is monitored:
- Core Web Vitals (LCP, FID, CLS)
- Page load times
- Error rates
- API response times (Formspree)

**And** analytics are privacy-friendly:
- No cookies required
- GDPR compliant
- No personal data collected
- Vercel Analytics or Plausible (not Google Analytics)

**And** conversion goals are tracked:
- Lead submission: $100 value
- Portfolio view: $10 value
- Pricing view: $25 value
- About page view: $5 value

**And** errors are tracked:
- Global error handler for JavaScript errors
- Unhandled promise rejections
- Error details sent to analytics

**Technical Implementation:**
```astro
---
// src/layouts/Layout.astro (add to <head>)
import { VERCEL_ANALYTICS_ID } from 'astro:env';
---
<head>
  <!-- Vercel Analytics (privacy-friendly) -->
  {import.meta.env.PROD && (
    <>
      <script
        defer
        src="https://cdn.vercel-insights.com/v1/script.js"
        data-endpoint={`/_vercel/insights?id=${VERCEL_ANALYTICS_ID}`}
      ></script>

      <!-- Vercel Speed Insights -->
      <script
        defer
        src="https://cdn.vercel-insights.com/v1/speed-insights.js"
      ></script>
    </>
  )}
</head>
```

```js
// Track conversions with dollar values
const conversions = {
  'contact_form_submit': { value: 100 },
  'portfolio_view': { value: 10 },
  'pricing_view': { value: 25 },
  'about_page_view': { value: 5 }
};

if (typeof window.va !== 'undefined') {
  window.va('event', 'contact_form_submit', {
    businessType: 'campground',
    location: 'Portland, OR',
    value: conversions['contact_form_submit'].value,
    currency: 'USD'
  });
}

// Global error tracking
window.addEventListener('error', (event) => {
  if (typeof window.va !== 'undefined') {
    window.va('event', 'error', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    });
  }
});

// Unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  if (typeof window.va !== 'undefined') {
    window.va('event', 'unhandled_rejection', {
      reason: event.reason?.toString()
    });
  }
});
```

**UX Reference:** Technical Architecture lines 1500-1550 (Analytics and monitoring)
**Prerequisites:** Story 6.4 complete

**Validation:**
```bash
# Verify analytics in Vercel dashboard
# Check Core Web Vitals in Vercel Speed Insights
# Confirm events are tracked in Vercel Analytics
```

---

## Epic 6 Complete

**Stories Created:** 5
**FR Coverage:** SEO optimization, performance optimization, analytics tracking
**Technical Context:** Meta tags, dynamic sitemap, Lighthouse 90+ scores, structured data, Vercel Analytics, performance budget, conversion tracking
**UX Integration:** Fast load times, discoverable in search engines, rich social previews
**Team Refinements Applied:**
- Mobile-specific meta tags added (viewport-fit, theme-color, iOS tags) (Winston)
- Complete favicon set (SVG, PNG, Apple Touch Icon, manifest) (Winston)
- Dynamic sitemap with content collections (Winston)
- Resource hints added (preload, preconnect, prefetch) (Winston)
- Lazy loading strategy with fetchpriority (Winston)
- Complete Astro config with all optimizations (Winston)
- BreadcrumbList structured data added (Winston)
- Error tracking with global handlers (Winston)
- Keyword strategy and optimized meta descriptions (John)
- Strategic sitemap priorities (homepage: 1.0, main: 0.9, items: 0.6) (John)
- Performance budget with hard limits (500 KB total, 150 KB JS) (John)
- LocalBusiness schema for local SEO (John)
- Conversion tracking with dollar values ($100 lead, $10 portfolio view) (John)
- Parallelization: Stories 6.1, 6.2, 6.4, 6.5 can be done simultaneously (Sarah)
- Extra time budgeted for Story 6.3 performance testing (Sarah)

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**What would you like to do?**

[a] Advanced Elicitation - Refine Epic 6 stories
[c] Continue - Move to Epic 7 (Launch & Deployment)
[p] Party Mode - Get team feedback on Epic 6
[y] YOLO - Generate Epic 7 (final epic)

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Epic 7: Launch & Deployment

**Epic Goal:** Site is deployed to production, tested, and ready for visitors

**Stories:**

### Story 7.1: Configure Vercel Deployment

**As a** developer
**I want** to deploy the site to Vercel
**So that** it's live and accessible to visitors

**Acceptance Criteria:**

**Given** I have completed all previous epics
**When** I push code to the main branch
**Then** Vercel automatically builds and deploys the site
**And** deployment succeeds without errors
**And** site is accessible at https://anywheresoftware.com

**And** Vercel is configured with:
- **Project name:** anywheresoftware
- **Framework:** Astro
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Node version:** 18.x or higher
- **Environment variables:** FORMSPREE_FORM_ID, VERCEL_ANALYTICS_ID

**And** custom domain is configured:
- Primary domain: anywheresoftware.com
- WWW redirect: www.anywheresoftware.com → anywheresoftware.com
- SSL certificate: Auto-provisioned by Vercel
- HTTPS: Enforced (redirect HTTP → HTTPS)

**And** deployment settings are optimized:
- **Auto-deploy:** Enabled for main branch
- **Preview deployments:** Enabled for pull requests
- **Production branch:** main
- **Staging branch:** staging (deploys to staging.anywheresoftware.com)
- **Ignored build step:** None (always build)

**And** security headers are configured:
- Content Security Policy (CSP)
- Permissions-Policy
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection
- Referrer-Policy

**Technical Implementation:**
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
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

**Environment Variables:**
```bash
# Add to Vercel dashboard (Settings → Environment Variables)
FORMSPREE_FORM_ID=your_form_id_here
VERCEL_ANALYTICS_ID=auto_generated_by_vercel
PUBLIC_SITE_URL=https://anywheresoftware.com
NODE_ENV=production
```

**Staging Environment Setup:**
```bash
# 1. Create staging branch in Git
git checkout -b staging
git push origin staging

# 2. In Vercel dashboard:
#    - Go to Settings → Domains
#    - Add domain: staging.anywheresoftware.com
#    - Assign to "staging" branch

# 3. Configure staging environment variables (same as production)

# 4. Test on staging before promoting to production
```

**UX Reference:** Technical Architecture lines 1600-1650 (Deployment strategy)
**Prerequisites:** Epic 6 complete

---

### Story 7.2: Create Pre-Launch Checklist

**As a** developer
**I want** to verify all features work correctly
**So that** visitors have a great experience

**Acceptance Criteria:**

**Given** the site is deployed to Vercel preview
**When** I run through the pre-launch checklist
**Then** all items pass:

**Content Checklist:**
- [ ] All placeholder text replaced with real content
- [ ] All images optimized and uploaded
- [ ] Carson's bio and photos added
- [ ] Portfolio items added (at least 3)
- [ ] Meta descriptions written for all pages
- [ ] Social share images created (1200x630px)
- [ ] Favicon files created and uploaded

**Functionality Checklist:**
- [ ] Homepage loads without errors
- [ ] About page loads without errors
- [ ] Portfolio page loads without errors
- [ ] Contact form submits successfully
- [ ] Formspree email received
- [ ] Navigation works (desktop and mobile)
- [ ] Mobile menu toggles correctly
- [ ] All CTAs link to correct destinations
- [ ] Smooth scroll works for anchor links

**Performance Checklist:**
- [ ] Lighthouse Performance score: 90+
- [ ] Lighthouse Accessibility score: 90+
- [ ] Lighthouse Best Practices score: 90+
- [ ] Lighthouse SEO score: 90+
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] Total page weight < 500 KB

**SEO Checklist:**
- [ ] Meta tags present on all pages
- [ ] Open Graph tags present on all pages
- [ ] Sitemap.xml accessible
- [ ] Robots.txt accessible
- [ ] Structured data validates (schema.org validator)
- [ ] Google Search Console verified
- [ ] Google Analytics / Vercel Analytics working

**Browser Testing:**
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

**Accessibility Testing:**
- [ ] Keyboard navigation works
- [ ] Screen reader compatible (VoiceOver/NVDA)
- [ ] Color contrast passes WCAG AA
- [ ] Focus indicators visible
- [ ] ARIA labels present where needed

**Automated Testing:**
- [ ] Lighthouse CI: All scores 90+
- [ ] Link checker: No broken links
- [ ] Accessibility audit: No violations
- [ ] HTML validation: No errors

**Monitoring Setup:**
- [ ] Error monitoring configured (Sentry or similar)
- [ ] Uptime monitoring configured (UptimeRobot)
- [ ] Vercel Analytics enabled
- [ ] Alert notifications configured

**User Acceptance Testing (UAT):**
- [ ] Test with 3-5 real users
- [ ] Users understand value proposition
- [ ] Users can navigate easily
- [ ] Users can find and submit contact form
- [ ] Users trust the site (professional, credible)
- [ ] Gather feedback on messaging, design, CTAs

**Launch Readiness:**
- [ ] All Epics 1-6 are 100% complete
- [ ] All content is final (no placeholders)
- [ ] All images optimized and uploaded
- [ ] Carson's bio and photos ready
- [ ] At least 3 portfolio items ready
- [ ] Formspree account set up and tested
- [ ] Domain purchased (anywheresoftware.com)
- [ ] Email configured (hello@anywheresoftware.com)

**Automated Testing Scripts:**
```json
// package.json - add test scripts
{
  "scripts": {
    "test:lighthouse": "lighthouse https://anywheresoftware.com --output=json --output-path=./lighthouse-report.json",
    "test:links": "linkinator https://anywheresoftware.com --recurse",
    "test:a11y": "pa11y https://anywheresoftware.com",
    "test:html": "html-validate dist/**/*.html",
    "test:all": "npm run test:lighthouse && npm run test:links && npm run test:a11y && npm run test:html"
  }
}
```

**Error Monitoring Setup:**
```javascript
// Optional: Add Sentry for error tracking
import * as Sentry from "@sentry/astro";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.MODE,
  tracesSampleRate: 0.1,
  beforeSend(event) {
    if (import.meta.env.DEV) return null;
    return event;
  }
});
```

**Uptime Monitoring:**
```bash
# Use UptimeRobot (free tier: 50 monitors)
# 1. Sign up at uptimerobot.com
# 2. Add monitor: https://anywheresoftware.com
# 3. Check interval: 5 minutes
# 4. Alert via email if down
```

**UX Reference:** Technical Architecture lines 1650-1700 (Testing strategy)
**Prerequisites:** Story 7.1 complete
**Story Points:** 8 (increased from 5 due to comprehensive testing)

---

### Story 7.3: Set Up Domain and DNS

**As a** site owner
**I want** to use a custom domain
**So that** visitors can find the site easily

**Acceptance Criteria:**

**Given** I have purchased anywheresoftware.com
**When** I configure DNS settings
**Then** domain points to Vercel:
- **A record:** @ → 76.76.21.21
- **CNAME record:** www → cname.vercel-dns.com

**And** domain is verified in Vercel:
- Domain added to project
- SSL certificate provisioned
- HTTPS enforced

**And** redirects are configured:
- www.anywheresoftware.com → anywheresoftware.com
- http://anywheresoftware.com → https://anywheresoftware.com

**And** DNS propagation is complete:
- Domain resolves to Vercel
- SSL certificate active
- Site loads at https://anywheresoftware.com

**And** email is configured:
- hello@anywheresoftware.com (forwarding or Google Workspace)
- contact@anywheresoftware.com (forwarding or Google Workspace)
- Professional email signature

**Technical Implementation:**
```bash
# Email Configuration
# Option 1: Email forwarding (via domain registrar or Cloudflare)
# Forward hello@anywheresoftware.com → carson@gmail.com
# Forward contact@anywheresoftware.com → carson@gmail.com

# Option 2: Google Workspace ($6/month)
# Professional email with Gmail interface
# hello@anywheresoftware.com as primary

# DNS Configuration (at domain registrar)
# A Record
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600

# CNAME Record
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600

# Verify DNS propagation
dig anywheresoftware.com
dig www.anywheresoftware.com

# Check SSL certificate
curl -I https://anywheresoftware.com
```

**UX Reference:** Technical Architecture lines 1600-1650 (Deployment strategy)
**Prerequisites:** Story 7.2 complete

---

### Story 7.4: Configure Google Search Console

**As a** site owner
**I want** to monitor search performance
**So that** I can optimize for better rankings

**Acceptance Criteria:**

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
- Request indexing for all main pages

**Technical Implementation:**
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

# Bing Webmaster Tools Setup:
# 1. Go to Bing Webmaster Tools (bing.com/webmasters)
# 2. Add site: anywheresoftware.com
# 3. Verify via DNS TXT record or import from Google Search Console
# 4. Submit sitemap: https://anywheresoftware.com/sitemap.xml
# 5. Enable notifications for crawl errors

# Why: Bing powers ~30% of US search (including DuckDuckGo, Yahoo)
```

**UX Reference:** Technical Architecture lines 1400-1450 (SEO strategy)
**Prerequisites:** Story 7.3 complete

---

### Story 7.5: Create Launch Announcement Plan

**As a** site owner
**I want** to announce the site launch
**So that** I can start getting visitors and leads

**Acceptance Criteria:**

**Given** the site is live and tested
**When** I execute the launch plan
**Then** I announce on these channels:

**Social Media:**
- [ ] LinkedIn post (personal profile)
- [ ] Twitter/X post
- [ ] Facebook post (if applicable)
- [ ] Instagram post (if applicable)

**Direct Outreach:**
- [ ] Email to existing contacts (past clients, network)
- [ ] Email to industry associations (campground associations, winery associations)
- [ ] Reach out to local business groups

**Content Marketing:**
- [ ] Write blog post: "Introducing AnywhereSoftware"
- [ ] Share on relevant forums/communities
- [ ] Submit to startup directories (Product Hunt, BetaList, etc.)

**Local SEO:**
- [ ] Create Google Business Profile
- [ ] Submit to local directories
- [ ] Reach out to local press/blogs

**Launch Success Metrics (Week 1):**
- **Traffic Goals:** 100+ unique visitors, 50+ page views, 2+ min avg time, < 60% bounce rate
- **Engagement Goals:** 5+ contact form submissions, 10+ portfolio views, 3+ about page views
- **Conversion Goals:** 2+ qualified leads (with budget/timeline), 1+ consultation booked
- **Social Goals:** 50+ LinkedIn impressions, 10+ engagements, 5+ shares/comments

**Launch Checklist:**
```markdown
# Launch Day Checklist

## Pre-Launch (Day -1)
- [ ] Final Lighthouse audit (all 90+)
- [ ] Final browser testing
- [ ] Backup current deployment
- [ ] Verify Formspree working
- [ ] Verify analytics tracking
- [ ] Test contact form end-to-end

## Launch Day (Day 0)
- [ ] Deploy to production
- [ ] Verify site loads at anywheresoftware.com
- [ ] Submit sitemap to Google Search Console
- [ ] Post on social media
- [ ] Send launch email to contacts
- [ ] Monitor analytics for traffic
- [ ] Monitor Formspree for form submissions
- [ ] Monitor error logs

## Post-Launch (Day +1 to +7)
- [ ] Check Google Search Console for indexing
- [ ] Monitor Core Web Vitals
- [ ] Respond to any form submissions within 24 hours
- [ ] Track conversion rate (form submissions / visitors)
- [ ] Gather feedback from early visitors
- [ ] Make minor adjustments based on feedback
```

**Launch Day Sequence:**
```markdown
## Launch Day Timeline

### 8:00 AM - Pre-Launch
- [ ] Final deployment check
- [ ] Final Lighthouse audit
- [ ] Final form test

### 9:00 AM - Soft Launch
- [ ] Post on LinkedIn (personal profile)
- [ ] Email to 5 close contacts for feedback
- [ ] Monitor analytics for first visitors

### 12:00 PM - Public Launch
- [ ] Post on Twitter/X
- [ ] Post on Facebook
- [ ] Email to full contact list (50+ people)
- [ ] Submit to startup directories

### 3:00 PM - Outreach
- [ ] Email to industry associations
- [ ] Reach out to local business groups
- [ ] Contact local press/blogs

### 6:00 PM - Monitor & Respond
- [ ] Check analytics (traffic, conversions)
- [ ] Respond to any form submissions
- [ ] Reply to social media comments
- [ ] Thank people for sharing
```

**Launch Messaging Templates:**
```markdown
## LinkedIn Post Template

🚀 Exciting news! I'm launching AnywhereSoftware - a mobile web design consultancy for rural businesses.

Here's what makes it different:
✅ I travel in an RV to meet you on-site
✅ Face-to-face service, no video calls
✅ Built for campgrounds, wineries, and rural hospitality

Why? Because rural businesses deserve modern websites, but they don't trust remote agencies. They want someone who shows up in person.

If you know a rural business owner who needs a website, send them my way: https://anywheresoftware.com

#WebDesign #RuralBusiness #MobileConsulting #RVLife

---

## Launch Email Template

Subject: Introducing AnywhereSoftware - Web Design That Comes to You

Hi [Name],

I'm excited to share that I've launched AnywhereSoftware - a mobile web design consultancy for rural businesses.

Here's the concept: I travel in an RV to meet clients on-site. No video calls, no remote confusion - just face-to-face service where you are.

I'm focused on campgrounds, wineries, restaurants, and other rural hospitality businesses that need modern websites but prefer in-person relationships.

Check it out: https://anywheresoftware.com

If you know anyone who might benefit, I'd appreciate an introduction!

Thanks,
Carson
```

**Rollback Plan:**
```markdown
## Disaster Recovery

### If Critical Bug Found:
1. Revert to previous deployment in Vercel (Deployments → Previous → Promote)
2. Notify users via social media: "We're experiencing technical issues. Site will be back shortly."
3. Fix bug in development
4. Test fix thoroughly on staging
5. Re-deploy to production

### If Performance Issues:
1. Check Vercel Analytics for bottlenecks
2. Check Lighthouse report for regressions
3. Disable non-critical features (e.g., analytics) temporarily
4. Optimize and re-deploy

### If Form Not Working:
1. Check Formspree dashboard for errors
2. Verify environment variables in Vercel
3. Test form manually
4. Add temporary "Email us at hello@anywheresoftware.com" message
5. Fix and re-deploy

### Communication Plan:
- Post update on social media within 30 minutes
- Email affected users (if any form submissions lost)
- Post resolution update once fixed
```

**UX Reference:** PRD lines 1-50 (Executive Summary, Go-to-Market)
**Prerequisites:** Story 7.4 complete

---

## Epic 7 Complete

**Stories Created:** 5
**FR Coverage:** Deployment, testing, domain configuration, SEO setup, launch announcement
**Technical Context:** Vercel deployment, DNS configuration, Google Search Console, launch checklist, rollback plan
**UX Integration:** Site is live, tested, and ready for visitors
**Team Refinements Applied:**
- Content Security Policy (CSP) and Permissions-Policy headers added (Winston)
- Environment-specific configuration added (Winston)
- Automated testing scripts (Lighthouse CI, link checker, a11y, HTML validation) (Winston)
- Error monitoring setup (Sentry) and uptime monitoring (UptimeRobot) (Winston)
- Email configuration (forwarding or Google Workspace) (Winston)
- Bing Webmaster Tools setup added (Winston)
- Rollback plan for disaster recovery (Winston)
- Story 7.2 estimate increased to 8 points (Sarah)
- Launch readiness checklist added (Sarah)
- Launch buffer of 2-3 days recommended (Sarah)
- Staging environment setup added (John)
- User acceptance testing (UAT) with 3-5 users (John)
- Launch success metrics (traffic, engagement, conversion goals) (John)
- Launch day sequence with timing (8am-6pm) (John)
- Launch messaging templates (LinkedIn, email) (John)

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## ALL EPICS COMPLETE!

**Total Epics:** 7
**Total Stories:** 34
**Total Story Points:** ~83 points (adjusted after team feedback)
**Estimated Timeline:** 8-10 weeks (2-3 sprints)

**Epic Summary:**
1. ✅ **Epic 1:** Foundation & Design System Setup (5 stories, ~10 points)
2. ✅ **Epic 2:** Portfolio Site Homepage (6 stories, ~18 points)
3. ✅ **Epic 3:** Portfolio Showcase & Case Studies (6 stories, ~17 points)
4. ✅ **Epic 4:** Contact Form & Lead Capture (4 stories, ~10 points)
5. ✅ **Epic 5:** About Page & Brand Story (5 stories, ~12 points)
6. ✅ **Epic 6:** SEO & Performance Optimization (5 stories, ~14 points)
7. ✅ **Epic 7:** Launch & Deployment (5 stories, ~11 points, includes 2-3 day buffer)

**Next Steps:**
1. Review epics.md with your team
2. Prioritize epics for sprint planning
3. Start implementation with Epic 1
4. Use Party Mode for feedback on each epic before implementation
5. Track progress in your project management tool

**Key Deliverables:**
- Complete epics and stories documentation
- Technical implementation guidance
- UX integration references
- Acceptance criteria with BDD format
- Code examples and snippets
- Performance and accessibility requirements
- SEO and analytics tracking
- Launch checklist

**Ready to build AnywhereSoftware!**
