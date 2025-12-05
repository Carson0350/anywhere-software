---
epic: Epic 4 - Contact Form & Lead Capture
story: Story 4.2
title: Integrate Formspree for Form Submission
status: ready
points: 3
prerequisites: Story 4.1 complete
---

# Story 4.2: Integrate Formspree for Form Submission

## User Story

**As a** visitor
**I want** my form submission to reach Carson
**So that** I can get a response to my consultation request

## Acceptance Criteria

**Given** I have filled out the contact form
**When** I click "Request Consultation"
**Then** form data is submitted to Formspree API
**And** I see a success message: "Thanks! We'll reach out within 24 hours."
**And** form fields are cleared
**And** Carson receives an email notification with all form data

**And** form handles errors gracefully:
- Network error: "Oops! Something went wrong. Please try again."
- Validation error: Show specific field errors
- Rate limit error: "Too many requests. Please try again in a few minutes."

**And** form shows loading state:
- Submit button shows "Sending..." with spinner
- Form fields are disabled during submission
- Button is disabled to prevent double-submit

**And** successful submissions are tracked:
- Log to Vercel Analytics with business type, location, budget, timeline
- Track conversion funnel completion

## Technical Implementation

```astro
---
// Add to src/components/ContactForm.astro
---

<script>
  const form = document.getElementById('contact-form');
  const submitButton = form?.querySelector('button[type="submit"]');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Show loading state
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Success
        form.reset();
        showSuccessMessage();

        // Track successful submission
        if (typeof window.va !== 'undefined') {
          window.va('event', 'contact_form_submit', {
            businessType: formData.get('businessType'),
            location: formData.get('location'),
            budget: formData.get('budget') || 'not-provided',
            timeline: formData.get('timeline') || 'not-provided'
          });
        }
      } else {
        // Handle Formspree-specific errors
        const data = await response.json();

        if (data.errors) {
          // Show field-specific errors from Formspree
          data.errors.forEach(error => {
            const field = form.querySelector(`[name="${error.field}"]`);
            if (field) {
              const errorElement = field.nextElementSibling;
              field.classList.add('border-error');
              errorElement?.classList.remove('hidden');
              errorElement.textContent = error.message;
            }
          });
        } else {
          showErrorMessage('Oops! Something went wrong. Please try again.');
        }
      }
    } catch (error) {
      showErrorMessage('Network error. Please check your connection.');
    } finally {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
  });

  function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'bg-success/10 border-2 border-success text-success px-6 py-4 rounded-lg mb-6';
    successDiv.textContent = "Thanks! We'll reach out within 24 hours.";
    form.insertBefore(successDiv, form.firstChild);

    setTimeout(() => successDiv.remove(), 5000);
  }

  function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'bg-error/10 border-2 border-error text-error px-6 py-4 rounded-lg mb-6';
    errorDiv.textContent = message;
    form.insertBefore(errorDiv, form.firstChild);

    setTimeout(() => errorDiv.remove(), 5000);
  }
</script>
```

## Setup Instructions

```bash
# 1. Sign up for Formspree (free tier: 50 submissions/month)
#    Visit: https://formspree.io

# 2. Create new form at formspree.io/forms

# 3. Copy form ID (looks like: xyzabc123)

# 4. Replace YOUR_FORM_ID in code above

# 5. Configure email notifications in Formspree dashboard:
#    - Set email subject: "New Lead: {{businessType}} in {{location}} - {{budget}}"
#    - Enable spam filtering (honeypot + reCAPTCHA if needed)
#    - Set auto-reply: "Thanks for reaching out! We'll respond within 24 hours."
#    - Add webhook for CRM integration (future)
```

## Formspree Dashboard Configuration

```
Email Subject Template:
New Lead: {{businessType}} in {{location}} - {{budget}}

Auto-Reply Message:
Thanks for reaching out to AnywhereSoftware! We'll respond within 24 hours.

Spam Protection:
☑ Enable honeypot field (_gotcha)
☑ Enable reCAPTCHA (optional, if spam becomes issue)

Notifications:
☑ Send to: your-email@example.com
☑ Include all form fields
```

## Validation Steps

1. Sign up for Formspree - account created
2. Create form and get ID - form ID obtained
3. Replace YOUR_FORM_ID in code - ID updated
4. Test form submission - email received
5. Test success message - displays correctly
6. Test error handling - shows appropriate messages
7. Test loading state - button shows "Sending..."
8. Check analytics - submission tracked

## References

- **PRD:** FR3 (inquiry forms)
- **Technical Architecture:** Lines 1748-1753 (Formspree integration)
- **UX Design Spec:** Lines 2255-2276 (Contact Form)

## Prerequisites

Story 4.1 complete

## Story Points

3 points

## Notes

- Formspree free tier: 50 submissions/month
- Upgrade to paid plan if exceeding limit
- Email subject template helps prioritize leads
- Auto-reply sets expectations for response time
- Honeypot field catches most spam
