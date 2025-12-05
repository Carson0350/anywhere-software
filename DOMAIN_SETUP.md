# Domain and DNS Setup Guide

This guide walks through setting up the custom domain `anywheresoftware.com` with Vercel.

## Prerequisites

- [ ] Domain purchased (anywheresoftware.com)
- [ ] Access to domain registrar DNS settings
- [ ] Vercel project deployed

## Step 1: Configure DNS Records

Log into your domain registrar (Namecheap, GoDaddy, Cloudflare, etc.) and add these DNS records:

### A Record (Root Domain)

```
Type: A
Name: @ (or leave blank for root)
Value: 76.76.21.21
TTL: 3600 (or Auto)
```

### CNAME Record (www Subdomain)

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (or Auto)
```

**Note:** Remove any existing A or CNAME records for @ and www to avoid conflicts.

## Step 2: Add Domain to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: `anywheresoftware-portfolio`
3. Go to **Settings** → **Domains**
4. Click **Add Domain**
5. Enter: `anywheresoftware.com`
6. Click **Add**
7. Repeat for: `www.anywheresoftware.com`

## Step 3: Configure Domain Settings

In Vercel Domains settings:

1. Set `anywheresoftware.com` as **Primary Domain**
2. Configure redirect: `www.anywheresoftware.com` → `anywheresoftware.com`
3. Vercel will automatically provision SSL certificate (Let's Encrypt)
4. HTTPS will be enforced automatically

## Step 4: Verify DNS Propagation

DNS changes can take 24-48 hours to propagate globally. Check status:

### Using dig (Terminal)

```bash
# Check A record
dig anywheresoftware.com

# Check CNAME record
dig www.anywheresoftware.com

# Should return Vercel IP: 76.76.21.21
```

### Using Online Tools

- [DNS Checker](https://dnschecker.org/)
- [What's My DNS](https://www.whatsmydns.net/)

Enter `anywheresoftware.com` and check propagation across different locations.

## Step 5: Verify SSL Certificate

Once DNS propagates, verify HTTPS works:

```bash
# Check SSL certificate
curl -I https://anywheresoftware.com

# Should return: HTTP/2 200
# Should show: strict-transport-security header
```

Or visit in browser: https://anywheresoftware.com

- Lock icon should appear in address bar
- Certificate should be valid (issued by Let's Encrypt)

## Step 6: Test Redirects

Verify these redirects work:

1. `http://anywheresoftware.com` → `https://anywheresoftware.com` ✓
2. `https://www.anywheresoftware.com` → `https://anywheresoftware.com` ✓
3. `http://www.anywheresoftware.com` → `https://anywheresoftware.com` ✓

## Step 7: Configure Email (Optional)

### Option 1: Email Forwarding (Free)

Most domain registrars offer free email forwarding:

1. Go to domain registrar email settings
2. Create forwarding rules:
   - `hello@anywheresoftware.com` → `your-email@gmail.com`
   - `contact@anywheresoftware.com` → `your-email@gmail.com`

**Pros:** Free, simple setup
**Cons:** Can't send from custom domain

### Option 2: Google Workspace ($6/month)

Professional email with Gmail interface:

1. Sign up at [Google Workspace](https://workspace.google.com/)
2. Verify domain ownership
3. Add MX records to DNS:

```
Type: MX, Priority: 1, Value: ASPMX.L.GOOGLE.COM
Type: MX, Priority: 5, Value: ALT1.ASPMX.L.GOOGLE.COM
Type: MX, Priority: 5, Value: ALT2.ASPMX.L.GOOGLE.COM
Type: MX, Priority: 10, Value: ALT3.ASPMX.L.GOOGLE.COM
Type: MX, Priority: 10, Value: ALT4.ASPMX.L.GOOGLE.COM
```

4. Create email accounts:
   - `hello@anywheresoftware.com`
   - `contact@anywheresoftware.com`

**Pros:** Professional, can send/receive, Gmail interface
**Cons:** $6/month per user

### Option 3: Cloudflare Email Routing (Free)

If using Cloudflare for DNS:

1. Go to Cloudflare Dashboard → Email Routing
2. Enable Email Routing
3. Add destination email
4. Create routing rules:
   - `hello@anywheresoftware.com` → destination
   - `contact@anywheresoftware.com` → destination

**Pros:** Free, reliable
**Cons:** Forwarding only (can't send from custom domain)

## Step 8: Update Formspree Email

Update the contact form to use custom domain email:

1. Go to [Formspree Dashboard](https://formspree.io)
2. Select your form
3. Update notification email to: `hello@anywheresoftware.com`
4. Update auto-reply "from" address to: `hello@anywheresoftware.com`

## Step 9: Update Environment Variables

Update Vercel environment variables:

1. Go to Vercel Dashboard → Settings → Environment Variables
2. Update `PUBLIC_SITE_URL`:
   - Old: `https://anywheresoftware-portfolio.vercel.app`
   - New: `https://anywheresoftware.com`
3. Redeploy to apply changes

## Troubleshooting

### Domain not resolving

- **Check DNS records:** Ensure A and CNAME records are correct
- **Wait for propagation:** Can take up to 48 hours
- **Clear DNS cache:** `sudo dscacheutil -flushcache` (Mac) or `ipconfig /flushdns` (Windows)

### SSL certificate not provisioning

- **Wait for DNS propagation:** SSL requires DNS to be fully propagated
- **Check Vercel dashboard:** Look for SSL status in Domains settings
- **Contact Vercel support:** If SSL doesn't provision after 48 hours

### www redirect not working

- **Check Vercel settings:** Ensure www domain is added and redirect is configured
- **Wait for deployment:** Changes may require redeployment

### Email not working

- **Check MX records:** Verify MX records are correct (if using Google Workspace)
- **Check forwarding rules:** Ensure forwarding is enabled (if using email forwarding)
- **Test with mail-tester.com:** Send email to check@mail-tester.com to verify setup

## Verification Checklist

- [ ] `anywheresoftware.com` resolves to Vercel
- [ ] `www.anywheresoftware.com` redirects to `anywheresoftware.com`
- [ ] HTTPS works (lock icon in browser)
- [ ] SSL certificate is valid
- [ ] HTTP redirects to HTTPS
- [ ] Email forwarding works (test by sending email)
- [ ] Formspree notifications go to custom domain email
- [ ] All pages load correctly on custom domain
- [ ] Analytics tracking works on custom domain

## Timeline

- **DNS Configuration:** 5-10 minutes
- **DNS Propagation:** 24-48 hours
- **SSL Provisioning:** Automatic after DNS propagates
- **Email Setup:** 10-30 minutes
- **Total Time:** 1-2 days (mostly waiting for DNS)

## Support Resources

- **Vercel Docs:** https://vercel.com/docs/concepts/projects/domains
- **DNS Checker:** https://dnschecker.org/
- **SSL Checker:** https://www.sslshopper.com/ssl-checker.html
- **Vercel Support:** https://vercel.com/support

---

**Last Updated:** December 5, 2025
**Status:** Ready for implementation
