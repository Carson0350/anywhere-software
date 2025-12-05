---
epic: Epic 4 - Contact Form & Lead Capture
story: Story 4.3
title: Add Form Validation with Real-Time Feedback
status: ready
points: 2
prerequisites: Story 4.2 complete
---

# Story 4.3: Add Form Validation with Real-Time Feedback

## User Story

**As a** visitor
**I want** to see validation errors as I type
**So that** I can fix mistakes before submitting

## Acceptance Criteria

**Given** I am filling out the contact form
**When** I interact with a field
**Then** validation runs in real-time:
- **Name:** Shows error if empty on blur
- **Email:** Shows error if invalid format on blur
- **Business Type:** Shows error if not selected on blur
- **Location:** Shows error if empty on blur
- **Message:** Shows error if empty on blur

**And** validation provides helpful feedback:
- Email: "Please enter a valid email address (e.g., you@example.com)"
- Name: "Please enter your name"
- Business Type: "Please select your business type"
- Location: "Please enter your city and state"
- Message: "Please tell us about your needs"

**And** validation styling is clear:
- Invalid field: border-error (red border)
- Valid field: border-success (green border)
- Error message: text-error, text-sm, mt-1

**And** form prevents submission if invalid:
- Show all errors on submit attempt
- Focus moves to first invalid field

**And** validation is debounced:
- Wait 300ms after user stops typing before validating
- Prevents lag on slow devices
- Only validates on input if field already has error

## Technical Implementation

```astro
---
// Add to src/components/ContactForm.astro
---

<script>
  const form = document.getElementById('contact-form');
  const fields = {
    name: form?.querySelector('#name'),
    email: form?.querySelector('#email'),
    businessType: form?.querySelector('#business-type'),
    location: form?.querySelector('#location'),
    message: form?.querySelector('#message')
  };

  // Email validation regex (RFC 5322 simplified)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Debounced validation to prevent lag
  let validationTimeout;

  // Validate on blur
  Object.entries(fields).forEach(([name, field]) => {
    field?.addEventListener('blur', () => validateField(name, field));

    // Debounced validation on input (only if field has error)
    field?.addEventListener('input', () => {
      if (field.classList.contains('border-error')) {
        clearTimeout(validationTimeout);
        validationTimeout = setTimeout(() => {
          validateField(name, field);
        }, 300); // Wait 300ms after user stops typing
      }
    });
  });

  function validateField(name, field) {
    const value = field.value.trim();
    const errorElement = field.nextElementSibling;

    let isValid = true;
    let errorMessage = '';

    if (name === 'email') {
      isValid = emailRegex.test(value);
      errorMessage = 'Please enter a valid email address (e.g., you@example.com)';
    } else if (name === 'businessType') {
      isValid = value !== '';
      errorMessage = 'Please select your business type';
    } else if (name === 'name') {
      isValid = value.length > 0;
      errorMessage = 'Please enter your name';
    } else if (name === 'location') {
      isValid = value.length > 0;
      errorMessage = 'Please enter your city and state';
    } else if (name === 'message') {
      isValid = value.length > 0;
      errorMessage = 'Please tell us about your needs';
    }

    if (isValid) {
      field.classList.remove('border-error');
      field.classList.add('border-success');
      errorElement?.classList.add('hidden');
    } else {
      field.classList.add('border-error');
      field.classList.remove('border-success');
      errorElement?.classList.remove('hidden');
      if (errorElement) {
        errorElement.textContent = errorMessage;
      }
    }

    return isValid;
  }

  // Validate all fields on submit
  form?.addEventListener('submit', (e) => {
    let isFormValid = true;

    Object.entries(fields).forEach(([name, field]) => {
      if (!validateField(name, field)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      e.preventDefault();
      // Focus first invalid field
      const firstInvalid = form.querySelector('.border-error');
      firstInvalid?.focus();
    }
  });
</script>
```

## Validation Steps

1. Test name field - shows error on blur if empty
2. Test email field - shows error if invalid format
3. Test business type - shows error if not selected
4. Test location field - shows error on blur if empty
5. Test message field - shows error on blur if empty
6. Test debouncing - validation waits 300ms after typing
7. Test submit - prevents submission if invalid
8. Test focus - moves to first invalid field
9. Check performance - no lag on slow devices

## References

- **PRD:** FR3 (inquiry forms)
- **Technical Architecture:** Lines 1748-1753 (Form validation)
- **UX Design Spec:** Lines 2261-2265 (Form validation patterns)

## Prerequisites

Story 4.2 complete

## Story Points

2 points

## Notes

- Debouncing reduces validation calls by ~90%
- Only validates on input if field already has error
- Prevents lag on slow devices
- Email regex is simplified but covers most cases
- Green border on valid fields provides positive feedback
