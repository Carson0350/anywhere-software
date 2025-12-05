# Google Search Console & Bing Webmaster Tools Setup

This guide walks through setting up search engine monitoring and optimization tools.

## Prerequisites

- [ ] Domain is live at anywheresoftware.com
- [ ] DNS is fully propagated
- [ ] Site is accessible via HTTPS
- [ ] Sitemap is accessible at /sitemap.xml

## Part 1: Google Search Console

### Step 1: Add Property

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **Add Property**
3. Select **Domain** property type
4. Enter: `anywheresoftware.com`
5. Click **Continue**

**Why Domain property?** Covers all subdomains and protocols (http, https, www, non-www)

### Step 2: Verify Ownership via DNS

Google will provide a TXT record to add to your DNS:

```
Type: TXT
Name: @ (or leave blank for root)
Value: google-site-verification=xxxxxxxxxxxxx
TTL: 3600 (or Auto)
```

**Steps:**
1. Copy the verification code from Google Search Console
2. Log into your domain registrar
3. Add the TXT record to DNS
4. Wait 5-10 minutes for propagation
5. Return to Google Search Console
6. Click **Verify**

**Troubleshooting:**
- If verification fails, wait longer (up to 48 hours for DNS propagation)
- Use [DNS Checker](https://dnschecker.org/) to verify TXT record is live
- Ensure there are no duplicate TXT records

### Step 3: Submit Sitemap

1. In Google Search Console, go to **Sitemaps** (left sidebar)
2. Enter sitemap URL: `sitemap.xml`
3. Click **Submit**

Google will discover and index all pages in the sitemap.

**Expected Result:**
- Status: Success
- Discovered URLs: 6+ (homepage, about, portfolio, portfolio items)
- Indexed: May take 1-7 days

### Step 4: Request Indexing for Main Pages

Speed up indexing by manually requesting it for important pages:

1. Go to **URL Inspection** (top search bar)
2. Enter URL: `https://anywheresoftware.com`
3. Click **Test Live URL**
4. Click **Request Indexing**
5. Repeat for:
   - `https://anywheresoftware.com/about`
   - `https://anywheresoftware.com/portfolio`

**Note:** You can request indexing for ~10 URLs per day.

### Step 5: Enable Email Notifications

1. Go to **Settings** (gear icon)
2. Click **Users and permissions**
3. Ensure your email is added
4. Enable notifications for:
   - Coverage issues
   - Manual actions
   - Security issues
   - Mobile usability issues

### Step 6: Monitor Performance

After 2-3 days, check these reports:

**Coverage Report:**
- Go to **Coverage** (left sidebar)
- Check for errors or warnings
- Ensure all pages are indexed

**Performance Report:**
- Go to **Performance** (left sidebar)
- Monitor clicks, impressions, CTR, position
- Filter by page, query, country, device

**Core Web Vitals:**
- Go to **Core Web Vitals** (left sidebar)
- Monitor LCP, FID, CLS
- Fix any "Poor" or "Needs Improvement" URLs

**Mobile Usability:**
- Go to **Mobile Usability** (left sidebar)
- Check for mobile-specific issues
- Fix any errors

## Part 2: Bing Webmaster Tools

Bing powers ~30% of US search (including DuckDuckGo, Yahoo, Ecosia).

### Step 1: Add Site

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Sign in with Microsoft account
3. Click **Add a site**
4. Enter: `https://anywheresoftware.com`
5. Click **Add**

### Step 2: Verify Ownership

**Option 1: Import from Google Search Console (Easiest)**
1. Click **Import from Google Search Console**
2. Authorize Bing to access Google Search Console
3. Select `anywheresoftware.com`
4. Click **Import**

**Option 2: DNS TXT Record**
1. Copy the TXT record from Bing
2. Add to DNS (same as Google verification)
3. Wait for propagation
4. Click **Verify**

### Step 3: Submit Sitemap

1. Go to **Sitemaps** (left sidebar)
2. Enter sitemap URL: `https://anywheresoftware.com/sitemap.xml`
3. Click **Submit**

### Step 4: Configure Settings

**URL Submission:**
- Go to **URL Submission** (left sidebar)
- Submit main pages manually (similar to Google)

**Email Notifications:**
- Go to **Settings** → **Notifications**
- Enable alerts for:
  - Crawl errors
  - Malware detection
  - Manual actions

## Part 3: Monitoring & Optimization

### Weekly Tasks (First Month)

- [ ] Check Google Search Console Coverage report
- [ ] Check Bing Webmaster Tools crawl errors
- [ ] Monitor indexing progress
- [ ] Review performance metrics (clicks, impressions)
- [ ] Fix any errors or warnings

### Monthly Tasks (Ongoing)

- [ ] Review search queries and optimize content
- [ ] Check Core Web Vitals and fix issues
- [ ] Monitor mobile usability
- [ ] Review backlinks and disavow spam
- [ ] Update sitemap if new pages added

### Key Metrics to Track

**Google Search Console:**
- **Impressions:** How often site appears in search
- **Clicks:** How often users click through
- **CTR (Click-Through Rate):** Clicks / Impressions
- **Position:** Average ranking position
- **Coverage:** Number of indexed pages

**Bing Webmaster Tools:**
- **Crawl stats:** Pages crawled per day
- **Index explorer:** Pages indexed
- **SEO reports:** On-page SEO issues

## Part 4: Optimization Tips

### Improve Search Rankings

1. **Target long-tail keywords:**
   - "mobile web design for campgrounds"
   - "RV web consultant Pacific Northwest"
   - "on-site web design rural businesses"

2. **Optimize meta descriptions:**
   - Include target keywords
   - Keep under 160 characters
   - Include call-to-action

3. **Build backlinks:**
   - Guest posts on industry blogs
   - Local business directories
   - Industry associations

4. **Create content:**
   - Blog posts about web design for rural businesses
   - Case studies from portfolio
   - How-to guides for campground owners

### Fix Common Issues

**Pages not indexed:**
- Check robots.txt (ensure not blocking)
- Check for noindex meta tags
- Request indexing manually
- Ensure pages are linked from sitemap

**Poor Core Web Vitals:**
- Optimize images (WebP, lazy loading)
- Minimize JavaScript
- Use CDN for static assets
- Enable compression

**Mobile usability issues:**
- Test on real devices
- Fix touch target sizes (min 48x48px)
- Ensure text is readable without zooming
- Fix horizontal scrolling

## Verification Checklist

- [ ] Google Search Console property verified
- [ ] Sitemap submitted to Google
- [ ] Main pages requested for indexing in Google
- [ ] Email notifications enabled in Google Search Console
- [ ] Bing Webmaster Tools site verified
- [ ] Sitemap submitted to Bing
- [ ] Email notifications enabled in Bing
- [ ] Coverage report shows no errors
- [ ] Performance data is tracking
- [ ] Core Web Vitals are "Good"
- [ ] Mobile usability has no issues

## Timeline

- **Verification:** 5-10 minutes (+ DNS propagation time)
- **Sitemap Submission:** 5 minutes
- **Initial Indexing:** 1-7 days
- **Performance Data:** 2-3 days after indexing
- **Full Coverage:** 1-2 weeks

## Support Resources

- **Google Search Console Help:** https://support.google.com/webmasters
- **Bing Webmaster Guidelines:** https://www.bing.com/webmasters/help/webmasters-guidelines-30fba23a
- **Schema.org Validator:** https://validator.schema.org/
- **Google Rich Results Test:** https://search.google.com/test/rich-results

## Troubleshooting

### "Site not verified"
- Wait longer for DNS propagation (up to 48 hours)
- Check TXT record with `dig anywheresoftware.com TXT`
- Ensure no duplicate TXT records

### "Sitemap could not be read"
- Verify sitemap is accessible: https://anywheresoftware.com/sitemap.xml
- Check for XML syntax errors
- Ensure sitemap is not blocked by robots.txt

### "Pages not indexed"
- Check Coverage report for errors
- Ensure pages are in sitemap
- Request indexing manually
- Check for noindex meta tags or robots.txt blocks

---

**Last Updated:** December 5, 2025
**Status:** Ready for implementation
