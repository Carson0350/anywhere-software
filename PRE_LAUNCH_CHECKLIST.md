# Pre-Launch Checklist - AnywhereSoftware

Complete this checklist before launching to production.

## Content Checklist

- [ ] All placeholder text replaced with real content
- [ ] All images optimized and uploaded
- [ ] Carson's bio and photos added
- [ ] Portfolio items added (at least 3)
- [ ] Meta descriptions written for all pages
- [ ] Social share images created (1200x630px)
- [ ] Favicon files created and uploaded (SVG, PNG 32x32, PNG 16x16, Apple Touch Icon 180x180)

## Functionality Checklist

- [ ] Homepage loads without errors
- [ ] About page loads without errors
- [ ] Portfolio page loads without errors
- [ ] Contact form submits successfully
- [ ] Formspree email received
- [ ] Navigation works (desktop and mobile)
- [ ] Mobile menu toggles correctly
- [ ] All CTAs link to correct destinations
- [ ] Smooth scroll works for anchor links
- [ ] Flip cards work (hover on desktop, tap on mobile, keyboard navigation)
- [ ] Portfolio filters work correctly

## Performance Checklist

Run Lighthouse audit: `npm run test:lighthouse`

- [ ] Lighthouse Performance score: 90+ (desktop), 85+ (mobile)
- [ ] Lighthouse Accessibility score: 100
- [ ] Lighthouse Best Practices score: 95+
- [ ] Lighthouse SEO score: 90+
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] FID (First Input Delay) < 100ms
- [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] Total page weight < 500 KB

## SEO Checklist

- [ ] Meta tags present on all pages (title, description, canonical)
- [ ] Open Graph tags present on all pages
- [ ] Twitter Card tags present on all pages
- [ ] Sitemap.xml accessible at /sitemap.xml
- [ ] Robots.txt accessible at /robots.txt
- [ ] Structured data validates (use Google Rich Results Test)
- [ ] Google Search Console verified
- [ ] Vercel Analytics working

## Browser Testing

Test in the following browsers:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

## Accessibility Testing

- [ ] Keyboard navigation works (Tab, Enter, Space, Escape)
- [ ] Screen reader compatible (test with VoiceOver on Mac or NVDA on Windows)
- [ ] Color contrast passes WCAG AA (use WebAIM Contrast Checker)
- [ ] Focus indicators visible on all interactive elements
- [ ] ARIA labels present where needed
- [ ] Form validation messages announced to screen readers
- [ ] Images have alt text

## Automated Testing

Run all automated tests: `npm run test:all`

- [ ] Lighthouse CI: All scores 90+
- [ ] Link checker: No broken links (`npm run test:links`)
- [ ] Accessibility audit: No violations (`npm run test:a11y`)
- [ ] HTML validation: No errors (`npm run test:html`)

## Security Checklist

- [ ] Security headers configured (CSP, X-Frame-Options, etc.)
- [ ] HTTPS enforced (Vercel handles this automatically)
- [ ] Form has honeypot spam protection
- [ ] No sensitive data in client-side code
- [ ] Environment variables properly configured in Vercel
- [ ] .env files not committed to Git

## Monitoring Setup

- [ ] Vercel Analytics enabled and tracking events
- [ ] Error monitoring configured (Vercel error tracking or Sentry)
- [ ] Uptime monitoring configured (UptimeRobot or similar)
- [ ] Alert notifications configured (email/Slack)
- [ ] Analytics conversion goals set up

## Environment Variables

Verify in Vercel Dashboard (Settings → Environment Variables):

- [ ] FORMSPREE_FORM_ID set
- [ ] PUBLIC_SITE_URL set to https://anywheresoftware.com
- [ ] NODE_ENV set to production

## User Acceptance Testing (UAT)

Test with 3-5 real users:

- [ ] Users understand value proposition
- [ ] Users can navigate easily
- [ ] Users can find and submit contact form
- [ ] Users trust the site (professional, credible)
- [ ] Gather feedback on messaging, design, CTAs
- [ ] Document feedback and address critical issues

## Final Checks

- [ ] Formspree form ID updated in ContactForm.astro
- [ ] Test form submission end-to-end
- [ ] Verify email notifications working
- [ ] Check all links (internal and external)
- [ ] Verify social share previews (Facebook, Twitter, LinkedIn)
- [ ] Test on slow 3G connection (Chrome DevTools)
- [ ] Review console for errors (no JavaScript errors)
- [ ] Verify favicon displays in all browsers
- [ ] Check mobile viewport on various screen sizes

## Post-Launch Tasks

After launching to production:

- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Set up Google Analytics (if using in addition to Vercel Analytics)
- [ ] Monitor error logs for first 24 hours
- [ ] Check analytics to ensure tracking works
- [ ] Send launch announcement (Story 7.5)
- [ ] Monitor uptime and performance

## Testing Commands

```bash
# Build and serve locally
npm run build
npx serve dist

# Run Lighthouse audit
npm run test:lighthouse

# Check for broken links
npm run test:links

# Run accessibility audit
npm run test:a11y

# Validate HTML
npm run test:html

# Run all tests
npm run test:all
```

## Notes

- **Launch Buffer:** Allow 2-3 days for testing and fixes
- **Staging Environment:** Test on staging.anywheresoftware.com first
- **Rollback Plan:** Keep previous deployment available in Vercel
- **Communication:** Notify stakeholders of launch timeline
- **Support:** Have support plan ready for user questions

---

**Last Updated:** December 5, 2025
**Status:** Ready for review
