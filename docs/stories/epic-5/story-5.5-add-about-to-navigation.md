---
epic: Epic 5 - About Page & Brand Story
story: Story 5.5
title: Add About Page to Navigation
status: ready
points: 1
prerequisites: Story 5.4 complete
---

# Story 5.5: Add About Page to Navigation

## User Story

**As a** visitor
**I want** to easily navigate to the About page
**So that** I can learn more about Carson

## Acceptance Criteria

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

**And** mobile menu includes About:
- About link in mobile menu
- Same position (between Portfolio and Contact)
- Mobile menu closes when clicking About

**And** About page analytics are tracked:
- Page view event
- CTA click events (by section: hero, process, bio)
- Time on page
- Scroll depth

## Technical Implementation

### Update Header Component

```astro
---
// src/components/Header.astro (update navLinks array)
const navLinks = [
  { href: '/#services', label: 'Services' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },  // NEW
  { href: '/#contact', label: 'Contact' }
];

// Get current path for active state
const currentPath = Astro.url.pathname;
---

<!-- Desktop Navigation -->
<ul class="hidden lg:flex items-center space-x-8">
  {navLinks.map((link) => (
    <li>
      <a
        href={link.href}
        class={`font-medium transition-colors ${
          currentPath === link.href || (link.href !== '/' && currentPath.startsWith(link.href))
            ? 'text-primary-600 font-semibold'
            : 'text-neutral-700 hover:text-primary-600'
        }`}
      >
        {link.label}
      </a>
    </li>
  ))}
</ul>

<!-- Mobile Menu -->
<div id="mobile-menu" class="...">
  <nav class="px-8 py-12">
    <ul class="space-y-6">
      {navLinks.map((link) => (
        <li>
          <a
            href={link.href}
            class="block text-2xl font-semibold text-neutral-900 hover:text-primary-600 transition-colors"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
</div>
```

### Add Analytics Tracking

```astro
---
// Add to src/pages/about.astro
---

<script>
  // Track page view
  if (typeof window.va !== 'undefined') {
    window.va('event', 'about_page_view');
  }

  // Track CTA clicks by section
  const heroCTA = document.querySelector('a[href="#process"]');
  const processCTA = document.querySelector('a[href="/#contact"]');
  const bioCTA = document.querySelector('a[href="/#contact"]');

  heroCTA?.addEventListener('click', () => {
    if (typeof window.va !== 'undefined') {
      window.va('event', 'about_cta_click', { section: 'hero' });
    }
  });

  processCTA?.addEventListener('click', () => {
    if (typeof window.va !== 'undefined') {
      window.va('event', 'about_cta_click', { section: 'process' });
    }
  });

  bioCTA?.addEventListener('click', () => {
    if (typeof window.va !== 'undefined') {
      window.va('event', 'about_cta_click', { section: 'bio' });
    }
  });

  // Track scroll depth
  let maxScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      if (maxScroll >= 25 && maxScroll < 50) {
        if (typeof window.va !== 'undefined') {
          window.va('event', 'about_scroll_depth', { depth: '25%' });
        }
      } else if (maxScroll >= 50 && maxScroll < 75) {
        if (typeof window.va !== 'undefined') {
          window.va('event', 'about_scroll_depth', { depth: '50%' });
        }
      } else if (maxScroll >= 75) {
        if (typeof window.va !== 'undefined') {
          window.va('event', 'about_scroll_depth', { depth: '75%' });
        }
      }
    }
  });
</script>
```

## Validation Steps

1. Update Header component - About link added
2. Test desktop navigation - About link visible
3. Test mobile menu - About link present
4. Test active state - highlights when on /about
5. Test navigation - clicking About goes to /about
6. Test mobile menu close - closes when clicking About
7. Check analytics - page view and CTA clicks tracked
8. Test scroll depth tracking - events fire at 25%, 50%, 75%

## References

- **PRD:** FR1 (service differentiation)
- **Technical Architecture:** Lines 178-237 (Navigation)
- **UX Design Spec:** Lines 2000-2050 (Navigation)

## Prerequisites

Story 5.4 complete

## Story Points

1 point

## Notes

- Active state uses pathname matching
- Mobile menu automatically includes new link
- Analytics help measure About page effectiveness
- Scroll depth tracking shows engagement level
