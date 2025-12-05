---
epic: Epic 2 - Portfolio Site Homepage
story: Story 2.4b
title: Build Mobile Menu Overlay
status: ready
points: 3
prerequisites: Story 2.4a complete
---

# Story 2.4b: Build Mobile Menu Overlay

## User Story

**As a** visitor on mobile
**I want** to open a menu to navigate between sections
**So that** I can access all navigation links on small screens

## Acceptance Criteria

**Given** I am on mobile (< 1024px)
**When** I click the "Menu" button in header
**Then** a full-screen overlay opens with:
- Background: bg-white z-50 fixed inset-0
- Close button: Top-right corner with X icon
- Navigation links stacked vertically
- Large touch targets (56px height minimum)
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
- Body scroll locked when menu open

## Technical Implementation

```astro
---
// Add to src/components/Header.astro (after desktop nav)
---

<!-- Mobile Menu Overlay -->
<div
  id="mobile-menu"
  class="fixed inset-0 bg-white z-50 transform translate-x-full transition-transform duration-300 ease-out lg:hidden"
  aria-hidden="true"
>
  <div class="flex justify-end p-4">
    <button
      id="close-menu"
      aria-label="Close menu"
      class="text-neutral-900 hover:text-primary-600 transition-colors"
    >
      <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  </div>
  <nav class="px-8 py-12">
    <ul class="space-y-6">
      {navLinks.map((link) => (
        <li>
          <a
            href={link.href}
            class="block text-2xl font-semibold text-neutral-900 hover:text-primary-600 transition-colors py-3"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
</div>

<script>
  const menuButton = document.querySelector('#mobile-menu-button');
  const closeButton = document.querySelector('#close-menu');
  const mobileMenu = document.querySelector('#mobile-menu');
  const menuLinks = mobileMenu?.querySelectorAll('a');

  function openMenu() {
    mobileMenu?.classList.remove('translate-x-full');
    mobileMenu?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Lock body scroll
    closeButton?.focus();
  }

  function closeMenu() {
    mobileMenu?.classList.add('translate-x-full');
    mobileMenu?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Restore body scroll
    menuButton?.focus();
  }

  menuButton?.addEventListener('click', openMenu);
  closeButton?.addEventListener('click', closeMenu);

  // Close menu when clicking a link
  menuLinks?.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu?.classList.contains('translate-x-full')) {
      closeMenu();
    }
  });

  // Focus trap
  const focusableElements = mobileMenu?.querySelectorAll(
    'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements?.[0];
  const lastFocusable = focusableElements?.[focusableElements.length - 1];

  mobileMenu?.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    }
  });
</script>
```

## Validation Steps

1. Test on mobile - menu button visible
2. Click menu button - overlay slides in from right
3. Test close button - menu closes
4. Test navigation links - menu closes and scrolls to section
5. Test Escape key - menu closes
6. Test focus trap - Tab cycles within menu
7. Test body scroll lock - page doesn't scroll when menu open
8. Check accessibility - ARIA labels, keyboard navigation

## References

- **PRD:** FR6 (mobile optimized)
- **Technical Architecture:** Lines 178-237 (Design tokens)
- **UX Design Spec:** Lines 2000-2050 (Navigation), Lines 2250-2300 (Mobile patterns)

## Prerequisites

Story 2.4a complete

## Story Points

3 points

## Notes

- Mobile menu is full-screen overlay for better UX
- Focus trap prevents tabbing outside menu
- Body scroll lock prevents background scrolling
- Smooth transitions enhance user experience
- Ensure touch targets are at least 44x44px (WCAG 2.1)
