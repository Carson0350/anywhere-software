---
epic: Epic 2 - Portfolio Site Homepage
story: Story 2.5
title: Build Footer Base Layout Component
status: ready
points: 2
prerequisites: Story 2.4b complete
---

# Story 2.5: Build Footer Base Layout Component

## User Story

**As a** visitor
**I want** to see a footer with copyright and links
**So that** I can access legal information and social links

## Acceptance Criteria

**Given** I am on any page
**When** I scroll to the bottom
**Then** footer is displayed with:
- Background: bg-neutral-900
- Text color: text-neutral-300
- Copyright notice: "© 2025 AnywhereSoftware. All rights reserved."
- Quick links:
  - "Privacy Policy"
  - "Terms of Service"
  - "Contact"
- Social links (optional):
  - LinkedIn
  - Twitter/X
  - Email
- Section spacing:
  - Padding: py-12 (48px top/bottom)
  - Max width: max-w-7xl mx-auto
  - Side padding: px-4

**And** footer layout is responsive:
- Desktop: 3 columns (brand, links, social)
- Tablet: 2 columns (brand + links, social)
- Mobile: 1 column (stacked)

**And** accessibility requirements:
- Semantic HTML: `<footer>` element
- Keyboard navigable links
- Focus ring visible on links
- Sufficient color contrast (4.5:1 minimum)

## Technical Implementation

```astro
---
// src/components/Footer.astro
const currentYear = new Date().getFullYear();

const quickLinks = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '#contact', label: 'Contact' }
];

const socialLinks = [
  { href: 'https://linkedin.com/company/anywheresoftware', label: 'LinkedIn', icon: 'linkedin' },
  { href: 'https://twitter.com/anywheresoftware', label: 'Twitter', icon: 'twitter' },
  { href: 'mailto:hello@anywheresoftware.com', label: 'Email', icon: 'email' }
];
---
<footer class="bg-neutral-900 text-neutral-300 py-12">
  <div class="max-w-7xl mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      <!-- Brand Column -->
      <div>
        <h3 class="text-2xl font-bold font-heading text-white mb-4">
          AnywhereSoftware
        </h3>
        <p class="text-neutral-400 leading-relaxed">
          Beautiful websites, delivered anywhere. Mobile web design consultant traveling in an RV.
        </p>
      </div>

      <!-- Quick Links Column -->
      <div>
        <h4 class="text-lg font-semibold text-white mb-4">Quick Links</h4>
        <ul class="space-y-2">
          {quickLinks.map((link) => (
            <li>
              <a
                href={link.href}
                class="text-neutral-400 hover:text-primary-400 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <!-- Social Links Column -->
      <div>
        <h4 class="text-lg font-semibold text-white mb-4">Connect</h4>
        <div class="flex space-x-4">
          {socialLinks.map((link) => (
            <a
              href={link.href}
              aria-label={link.label}
              class="text-neutral-400 hover:text-primary-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.icon === 'linkedin' && (
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              )}
              {link.icon === 'twitter' && (
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              )}
              {link.icon === 'email' && (
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>

    <!-- Copyright -->
    <div class="border-t border-neutral-800 pt-8 text-center text-neutral-500">
      <p>&copy; {currentYear} AnywhereSoftware. All rights reserved.</p>
    </div>
  </div>
</footer>
```

## Validation Steps

1. Add Footer component to Layout - footer renders
2. Test responsive layout - 3 columns desktop, 1 mobile
3. Test links - navigate correctly
4. Test social links - open in new tab
5. Check color contrast - meets WCAG AA (4.5:1)
6. Test keyboard navigation - Tab key works
7. Check accessibility - semantic HTML, ARIA labels

## References

- **PRD:** Infrastructure for FR1-FR6
- **Technical Architecture:** Lines 178-237 (Design tokens)
- **UX Design Spec:** Lines 2300-2350 (Footer)

## Prerequisites

Story 2.4b complete

## Story Points

2 points

## Notes

- Privacy Policy and Terms pages will be created later
- Social links are optional - update with real URLs
- Footer is consistent across all pages
- Consider adding newsletter signup in future
