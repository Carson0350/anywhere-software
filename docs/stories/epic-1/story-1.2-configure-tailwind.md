---
epic: Epic 1 - Foundation & Design System Setup
story: Story 1.2
title: Configure Tailwind with Mountains & Pine Trees Palette
status: ready
points: 2
prerequisites: Story 1.1 complete
---

# Story 1.2: Configure Tailwind with Mountains & Pine Trees Palette

## User Story

**As a** developer
**I want** Tailwind configured with the design tokens from UX spec
**So that** all components use consistent colors, typography, and spacing

## Acceptance Criteria

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

## Technical Implementation

```javascript
// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#047857', // Main brand green
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        neutral: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
        accent: {
          sky: '#0ea5e9',
          sunset: '#f97316',
          alpine: '#8b5cf6',
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
    },
  },
  plugins: [],
}
```

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
});
```

## Validation Steps

1. Run `npm run dev` - Tailwind compiles without errors
2. Create test component using `bg-primary-500` - green background appears
3. Create test component using `font-heading` - Outfit font loads
4. Create test component using `text-2xl` - correct font size applied
5. Check browser DevTools - custom colors and fonts are applied

## References

- **PRD:** Infrastructure for FR1-FR6
- **Technical Architecture:** Lines 178-237 (Design tokens)
- **UX Design Spec:** Lines 1653-1787 (Color palette, typography)

## Prerequisites

Story 1.1 complete

## Story Points

2 points

## Notes

- Copy design tokens exactly from Technical Architecture document
- Ensure font imports work correctly with Astro
- Test color contrast meets WCAG AA standards (4.5:1 minimum)
