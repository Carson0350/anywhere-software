# Formspree Setup Instructions

## Story 4.2: Integrate Formspree for Form Submission

### Setup Steps

1. **Sign up for Formspree**
   - Visit: https://formspree.io
   - Create free account (50 submissions/month)

2. **Create New Form**
   - Go to: https://formspree.io/forms
   - Click "New Form"
   - Name it: "AnywhereSoftware Contact Form"

3. **Get Form ID**
   - After creating form, copy the Form ID (looks like: `xyzabc123`)
   - Or copy the full endpoint URL: `https://formspree.io/f/YOUR_FORM_ID`

4. **Update Code**
   - Open: `src/components/ContactForm.astro`
   - Find line: `const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {`
   - Replace `YOUR_FORM_ID` with your actual form ID

5. **Configure Formspree Dashboard**

   **Email Subject Template:**
   ```
   New Lead: {{businessType}} in {{location}} - {{budget}}
   ```

   **Auto-Reply Message:**
   ```
   Thanks for reaching out to AnywhereSoftware!

   We've received your consultation request and will respond within 24 hours.

   In the meantime, feel free to check out our portfolio: https://anywheresoftware.com/portfolio

   Best regards,
   Carson
   AnywhereSoftware
   ```

   **Spam Protection:**
   - ☑ Enable honeypot field (`_gotcha`) - already in form
   - ☑ Enable reCAPTCHA (optional, if spam becomes an issue)

   **Notifications:**
   - ☑ Send to: your-email@example.com
   - ☑ Include all form fields
   - ☑ Enable email notifications

6. **Test Form**
   - Fill out form on localhost or deployed site
   - Submit form
   - Check email for notification
   - Verify auto-reply sent to submitter

### Form Fields Sent to Formspree

**Required:**
- `name` - Visitor's name
- `email` - Visitor's email
- `businessType` - Campground, Winery, Restaurant, Other
- `location` - City, State
- `message` - Consultation request details

**Optional (Progressive Disclosure):**
- `budget` - Budget range
- `timeline` - Project timeline
- `currentWebsite` - Current website URL

**Spam Protection:**
- `_gotcha` - Honeypot field (hidden from users)

### Analytics Tracking

Form submissions are tracked with Vercel Analytics:
```javascript
window.va('event', 'contact_form_submit', {
  businessType: formData.get('businessType'),
  location: formData.get('location'),
  budget: formData.get('budget') || 'not-provided',
  timeline: formData.get('timeline') || 'not-provided'
});
```

### Formspree Free Tier Limits

- **50 submissions/month**
- **1 form**
- **Email notifications**
- **Spam filtering**
- **Auto-reply**

Upgrade to paid plan if exceeding limits.

### Troubleshooting

**Form not submitting:**
- Check browser console for errors
- Verify Formspree form ID is correct
- Check network tab for API response

**Not receiving emails:**
- Check spam folder
- Verify email address in Formspree dashboard
- Check Formspree dashboard for submission logs

**Spam submissions:**
- Enable reCAPTCHA in Formspree dashboard
- Honeypot field should catch most bots
- Review Formspree spam filter settings
