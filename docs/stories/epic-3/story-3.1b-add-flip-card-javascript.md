---
epic: Epic 3 - Portfolio Showcase & Case Studies
story: Story 3.1b
title: Add Mobile Tap & Keyboard Support to Flip Card
status: ready
points: 2
prerequisites: Story 3.1a complete
---

# Story 3.1b: Add Mobile Tap & Keyboard Support to Flip Card

## User Story

**As a** visitor on mobile or using keyboard
**I want** to flip cards by tapping or pressing Enter/Space
**So that** I can see transformations on all devices and input methods

## Acceptance Criteria

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
- Toggle `.rotate-y-180` class (or `[transform:rotateY(180deg)]`) on click/tap
- Toggle on Enter/Space keypress
- Prevent default behavior for Space (no page scroll)
- Works with multiple flip cards on same page

## Technical Implementation

```astro
---
// Add to src/components/FlipCard.astro (after existing code)
---

<!-- Add this script at the end of the component -->
<script>
  document.querySelectorAll('.flip-card').forEach(card => {
    const inner = card.querySelector('.flip-card-inner');
    let isFlipped = false;

    // Mobile tap to flip
    card.addEventListener('click', () => {
      isFlipped = !isFlipped;
      if (isFlipped) {
        inner?.style.transform = 'rotateY(180deg)';
      } else {
        inner?.style.transform = 'rotateY(0deg)';
      }
      updateAriaLabel();
    });

    // Keyboard support
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        isFlipped = !isFlipped;
        if (isFlipped) {
          inner?.style.transform = 'rotateY(180deg)';
        } else {
          inner?.style.transform = 'rotateY(0deg)';
        }
        updateAriaLabel();
      }
    });

    // Update ARIA label for screen readers
    function updateAriaLabel() {
      if (isFlipped) {
        card.setAttribute('aria-label', 'Showing after. Press Enter to see before.');
      } else {
        card.setAttribute('aria-label', 'Showing before. Press Enter to see after.');
      }
    }
  });
</script>

<style>
  /* Add focus ring for keyboard navigation */
  .flip-card:focus {
    outline: 2px solid theme('colors.primary.500');
    outline-offset: 4px;
  }
</style>
```

## Validation Steps

1. Test on mobile - tap card to flip
2. Test keyboard navigation - Tab to card, press Enter/Space to flip
3. Test multiple cards - all work independently
4. Test screen reader - announces state change
5. Test focus ring - visible on keyboard focus
6. Test Space key - doesn't scroll page
7. Check accessibility - ARIA labels update correctly

## References

- **PRD:** FR6 (mobile optimized)
- **Technical Architecture:** Lines 582-632 (Flip Card component)
- **UX Design Spec:** Lines 2369-2383 (Flip card animation)

## Prerequisites

Story 3.1a complete

## Story Points

2 points

## Notes

- This story adds JavaScript for mobile and keyboard support
- Desktop hover still works from Story 3.1a
- Each card maintains independent state
- Screen reader support improves accessibility
- Focus ring meets WCAG 2.1 requirements
