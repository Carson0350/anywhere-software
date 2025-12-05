---
epic: Epic 4 - Contact Form & Lead Capture
story: Story 4.1
title: Build Contact Form Component
status: ready
points: 3
prerequisites: Epic 3 complete
---

# Story 4.1: Build Contact Form Component

## User Story

**As a** visitor
**I want** to submit a consultation request
**So that** I can get help with my website needs

## Acceptance Criteria

**Given** I am on the homepage
**When** I scroll to the contact section
**Then** I see a contact form with fields:
- **Name:** Text input (required)
- **Email:** Email input (required)
- **Business Type:** Select dropdown (Campground, Winery, Restaurant, Other) (required)
- **Location:** Text input (City, State - required)
- **Message:** Textarea (Tell us about your needs - required)
- **Submit button:** "Request Consultation" (primary variant, size lg)

**And** form has proper validation:
- Required fields show error if empty on submit
- Email validation (RFC 5322 format)
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

**And** progressive disclosure for optional fields:
- Budget range (optional)
- Timeline (optional)
- Current website URL (optional)
- Collapsed by default, expand with "+ Add more details"

## Technical Implementation

```astro
---
// src/components/ContactForm.astro
---
<section id="contact" class="py-24 bg-neutral-50">
  <div class="max-w-3xl mx-auto px-4">
    <h2 class="text-4xl md:text-5xl font-bold font-heading text-neutral-900 text-center mb-4">
      Start Your Transformation
    </h2>
    <p class="text-xl text-neutral-700 text-center mb-4 max-w-2xl mx-auto">
      Tell us about your business. We'll reach out within 24 hours.
    </p>

    <!-- Trust signals -->
    <p class="text-sm text-neutral-600 text-center mb-2">
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
            class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
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
            class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
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
            class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          >
            <option value="">Select one...</option>
            <option value="campground">Campground</option>
            <option value="winery">Winery</option>
            <option value="restaurant">Restaurant</option>
            <option value="other">Other</option>
          </select>
          <p class="text-sm text-error mt-1 hidden" role="alert" aria-live="polite">
            Please select your business type
          </p>
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
            class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            placeholder="Portland, OR"
          />
          <p class="text-sm text-error mt-1 hidden" role="alert" aria-live="polite">
            Please enter your location
          </p>
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
          class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          placeholder="I need a new website for my campground..."
        ></textarea>
        <p class="text-sm text-error mt-1 hidden" role="alert" aria-live="polite">
          Please tell us about your needs
        </p>
      </div>

      <!-- Honeypot spam protection (hidden from users) -->
      <div style="position: absolute; left: -5000px;" aria-hidden="true">
        <input type="text" name="_gotcha" tabindex="-1" autocomplete="off" />
      </div>

      <!-- Progressive disclosure for optional fields -->
      <details class="border-t border-neutral-200 pt-6">
        <summary class="cursor-pointer text-primary-600 font-semibold hover:text-primary-700 transition-colors">
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
                class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
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
                class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
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
              class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
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

## Validation Steps

1. Create ContactForm component - renders correctly
2. Test required fields - show errors on submit
3. Test responsive layout - 2 columns desktop, 1 mobile
4. Test accessibility - keyboard navigation works
5. Test touch targets - at least 48px height
6. Test progressive disclosure - optional fields expand/collapse
7. Test honeypot field - hidden from users

## References

- **PRD:** FR3 (inquiry forms), User Journey 1
- **Technical Architecture:** Lines 1748-1753 (Formspree integration)
- **UX Design Spec:** Lines 2255-2276 (Contact Form component)

## Prerequisites

Epic 3 complete

## Story Points

3 points

## Notes

- Form submission will be implemented in Story 4.2
- Validation will be enhanced in Story 4.3
- Trust signals and social proof improve conversion
- Progressive disclosure reduces form intimidation
- Honeypot field catches bots without affecting UX
