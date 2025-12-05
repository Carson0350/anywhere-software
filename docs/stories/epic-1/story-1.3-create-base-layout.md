---
epic: Epic 1 - Foundation & Design System Setup
story: Story 1.3
title: Create Base Layout Component
status: ready
points: 2
prerequisites: Story 1.2 complete
---

# Story 1.3: Create Base Layout Component

## User Story

**As a** developer
**I want** a reusable layout component
**So that** all pages have consistent structure (header, footer, meta tags)

## Acceptance Criteria

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

## Technical Implementation

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

## Usage Example

```astro
---
// src/pages/index.astro
import Layout from '../layouts/Layout.astro';
---
<Layout title="Home | AnywhereSoftware" description="Mobile web design consultant">
  <main>
    <h1>Welcome to AnywhereSoftware</h1>
  </main>
</Layout>
```

## Validation Steps

1. Create test page using Layout component - page renders correctly
2. Check HTML source - proper DOCTYPE, meta tags present
3. Check browser DevTools - fonts load correctly
4. Check accessibility - semantic HTML elements used
5. Test on mobile - viewport meta tag works correctly

## References

- **PRD:** Infrastructure for FR1-FR6
- **Technical Architecture:** Lines 100-150 (Component structure)
- **UX Design Spec:** Lines 1772-1787 (Typography)

## Prerequisites

Story 1.2 complete

## Story Points

2 points

## Notes

- Use TypeScript interface for Props
- Ensure fonts are preconnected for performance
- Keep layout minimal - header/footer will be added in Epic 2
- Slot allows flexible content insertion
