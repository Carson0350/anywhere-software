---
epic: Epic 1 - Foundation & Design System Setup
story: Story 1.4
title: Build Button Component
status: ready
points: 2
prerequisites: Story 1.3 complete
---

# Story 1.4: Build Button Component

## User Story

**As a** developer
**I want** a reusable Button component with variants
**So that** CTAs are consistent and accessible throughout the site

## Acceptance Criteria

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

## Technical Implementation

```astro
---
// src/components/Button.astro
interface Props {
  variant?: 'default' | 'secondary' | 'outline';
  size?: 'default' | 'lg' | 'xl';
  href?: string;
  class?: string;
  disabled?: boolean;
}
const {
  variant = 'default',
  size = 'default',
  href,
  class: className,
  disabled = false
} = Astro.props;

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

const disabledClasses = disabled ? "opacity-50 pointer-events-none" : "";

const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className || ''}`;
---

{href ? (
  <a href={href} class={classes}>
    <slot />
  </a>
) : (
  <button class={classes} disabled={disabled}>
    <slot />
  </button>
)}
```

## Usage Examples

```astro
<!-- Default button -->
<Button>Get Started</Button>

<!-- Secondary button -->
<Button variant="secondary">Learn More</Button>

<!-- Outline button -->
<Button variant="outline">Contact Us</Button>

<!-- Large button -->
<Button size="lg">Sign Up</Button>

<!-- XL button (hero CTA) -->
<Button size="xl">Start Your Journey</Button>

<!-- Link button -->
<Button href="/about">About Us</Button>

<!-- Disabled button -->
<Button disabled>Coming Soon</Button>
```

## Validation Steps

1. Create test page with all button variants - all render correctly
2. Test keyboard navigation - Tab key moves between buttons
3. Test focus ring - visible outline appears on focus
4. Test hover states - colors change on hover
5. Test disabled state - button is not clickable
6. Test link button - navigates to correct URL
7. Check accessibility - ARIA attributes correct

## References

- **PRD:** Infrastructure for FR1-FR6
- **Technical Architecture:** Lines 178-237 (Design tokens)
- **UX Design Spec:** Lines 1772-1787 (Typography), Lines 2200-2250 (Button patterns)

## Prerequisites

Story 1.3 complete

## Story Points

2 points

## Notes

- Button component is used throughout the site for CTAs
- Ensure touch targets are at least 44x44px (WCAG 2.1)
- Support both `<button>` and `<a>` elements based on `href` prop
- Use TypeScript for type safety
