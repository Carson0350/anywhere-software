---
epic: Epic 2 - Portfolio Site Homepage
story: Story 2.4a
title: Build Desktop Navigation Header Component
status: ready
points: 2
prerequisites: Story 2.3 complete
---

# Story 2.4a: Build Desktop Navigation Header Component

## User Story

**As a** visitor on desktop
**I want** to navigate between sections using the header
**So that** I can quickly jump to relevant information

## Acceptance Criteria

**Given** I am on desktop (> 1024px)
**When** I interact with the header
**Then** header is displayed with:
- Background: bg-white with border-b border-neutral-200
- Logo/brand name: "AnywhereSoftware"
- Navigation links (horizontal):
  - "Services"
  - "Pricing"
  - "Portfolio"
  - "About"
  - "Contact"
- Each link has:
  - Text color: text-neutral-700
  - Hover effect: hover:text-primary-600 transition-colors
  - Active state: text-primary-600 font-semibold
- Section spacing:
  - Padding: py-4 (16px top/bottom)
  - Max width: max-w-7xl mx-auto
  - Side padding: px-4
- Sticky positioning: sticky top-0 z-40

**And** navigation links use smooth scroll:
- Click link → smooth scroll to section
- Duration: 500ms
- Easing: ease-in-out

**And** accessibility requirements:
- Keyboard navigable (Tab key)
- Focus ring visible on links
- Semantic HTML: `<nav>` element
- ARIA labels where needed

## Technical Implementation

```astro
---
// src/components/Header.astro
import Button from './Button.astro';

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' }
];
---
<header class="sticky top-0 z-40 bg-white border-b border-neutral-200">
  <div class="max-w-7xl mx-auto px-4 py-4">
    <nav class="flex items-center justify-between">
      <!-- Logo -->
      <a href="/" class="text-2xl font-bold font-heading text-neutral-900 hover:text-primary-600 transition-colors">
        AnywhereSoftware
      </a>

      <!-- Desktop Navigation -->
      <ul class="hidden lg:flex items-center space-x-8">
        {navLinks.map((link) => (
          <li>
            <a
              href={link.href}
              class="text-neutral-700 hover:text-primary-600 transition-colors font-medium"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <!-- Mobile Menu Button (hidden on desktop) -->
      <button
        id="mobile-menu-button"
        aria-label="Open menu"
        class="lg:hidden text-neutral-900 hover:text-primary-600 transition-colors"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </nav>
  </div>
</header>

<script>
  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
</script>

<style>
  /* Ensure smooth scrolling works */
  html {
    scroll-behavior: smooth;
  }
</style>
```

## Validation Steps

1. Add Header component to Layout - header renders
2. Test sticky positioning - header stays at top on scroll
3. Test navigation links - smooth scroll to sections
4. Test hover states - color changes on hover
5. Test keyboard navigation - Tab key moves between links
6. Test responsive - desktop nav hidden on mobile
7. Check accessibility - semantic HTML, ARIA labels

## References

- **PRD:** FR1 (service offerings), FR6 (mobile optimized)
- **Technical Architecture:** Lines 178-237 (Design tokens)
- **UX Design Spec:** Lines 2000-2050 (Navigation)

## Prerequisites

Story 2.3 complete

## Story Points

2 points

## Notes

- Desktop navigation is horizontal, mobile is overlay (Story 2.4b)
- Sticky header improves navigation UX
- Smooth scroll enhances user experience
- Logo links to homepage (top of page)
