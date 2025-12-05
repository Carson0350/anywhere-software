---
epic: Epic 1 - Foundation & Design System Setup
story: Story 1.1
title: Initialize Astro Project
status: ready
points: 2
prerequisites: none
---

# Story 1.1: Initialize Astro Project

## User Story

**As a** developer
**I want** an Astro project initialized with proper configuration
**So that** I can start building the portfolio site

## Acceptance Criteria

**Given** I need to start development
**When** I run project initialization
**Then** Astro project is created with TypeScript support
**And** project structure follows Architecture document (src/components, src/pages, src/layouts, public/)
**And** package.json includes Astro 4.x and required dependencies
**And** tsconfig.json is configured for strict type checking
**And** .gitignore excludes node_modules, dist, .env files

## Technical Implementation

```bash
npm create astro@latest anywheresoftware-portfolio
cd anywheresoftware-portfolio
npm install -D tailwindcss @astrojs/tailwind
npm install @fontsource/inter @fontsource/outfit
npm install @formspree/react
```

## Expected Project Structure

```
anywheresoftware-portfolio/
├── src/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   └── assets/
├── public/
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── .gitignore
```

## Validation Steps

1. Run `npm run dev` - dev server starts without errors
2. Visit http://localhost:4321 - Astro welcome page loads
3. Check `package.json` - Astro 4.x is listed
4. Check `tsconfig.json` - strict mode enabled
5. Check `.gitignore` - node_modules, dist, .env excluded

## References

- **PRD:** Infrastructure for FR1-FR6
- **Technical Architecture:** Lines 100-150 (Project structure)
- **UX Design Spec:** N/A (infrastructure story)

## Prerequisites

None (first story)

## Story Points

2 points

## Notes

- Use TypeScript for type safety
- Follow Astro best practices for project structure
- Ensure all dependencies are compatible with Astro 4.x
