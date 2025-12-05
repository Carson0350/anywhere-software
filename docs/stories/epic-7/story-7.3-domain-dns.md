---
epic: Epic 7 - Launch & Deployment
story: Story 7.3
title: Set Up Domain and DNS
status: ready
points: 2
prerequisites: Story 7.2 complete
---

# Story 7.3: Set Up Domain and DNS

## User Story

**As a** site owner
**I want** to use a custom domain
**So that** visitors can find the site easily

## Acceptance Criteria

**Given** I have purchased anywheresoftware.com
**When** I configure DNS settings
**Then** domain points to Vercel:
- **A record:** @ → 76.76.21.21
- **CNAME record:** www → cname.vercel-dns.com

**And** domain is verified in Vercel:
- Domain added to project
- SSL certificate provisioned
- HTTPS enforced

**And** redirects are configured:
- www.anywheresoftware.com → anywheresoftware.com
- http://anywheresoftware.com → https://anywheresoftware.com

**And** DNS propagation is complete:
- Domain resolves to Vercel
- SSL certificate active
- Site loads at https://anywheresoftware.com

**And** email is configured:
- hello@anywheresoftware.com (forwarding or Google Workspace)
- contact@anywheresoftware.com (forwarding or Google Workspace)

## Technical Implementation

### DNS Configuration

```bash
# At domain registrar (e.g., Namecheap, GoDaddy, Cloudflare)

# A Record
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600

# CNAME Record
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600

# Verify DNS propagation
dig anywheresoftware.com
dig www.anywheresoftware.com

# Check SSL certificate
curl -I https://anywheresoftware.com
```

### Vercel Domain Configuration

```bash
# 1. Go to Vercel dashboard
# 2. Select project: anywheresoftware-portfolio
# 3. Go to Settings → Domains
# 4. Add domain: anywheresoftware.com
# 5. Add domain: www.anywheresoftware.com
# 6. Set anywheresoftware.com as primary
# 7. Configure redirect: www → non-www
# 8. Wait for SSL certificate (automatic)
```

### Email Configuration

```bash
# Option 1: Email forwarding (via domain registrar or Cloudflare)
# Forward hello@anywheresoftware.com → carson@gmail.com
# Forward contact@anywheresoftware.com → carson@gmail.com

# Option 2: Google Workspace ($6/month)
# Professional email with Gmail interface
# hello@anywheresoftware.com as primary

# MX Records for Google Workspace (if using)
Type: MX
Priority: 1
Value: ASPMX.L.GOOGLE.COM

Type: MX
Priority: 5
Value: ALT1.ASPMX.L.GOOGLE.COM

Type: MX
Priority: 5
Value: ALT2.ASPMX.L.GOOGLE.COM
```

## Validation Steps

1. Purchase domain - anywheresoftware.com acquired
2. Configure DNS - A and CNAME records added
3. Add domain to Vercel - domain added to project
4. Wait for DNS propagation - 24-48 hours
5. Verify SSL certificate - HTTPS works
6. Test redirects - www → non-www works
7. Configure email - forwarding or Google Workspace set up
8. Test email - send test email to hello@anywheresoftware.com

## References

- **PRD:** All Phase 1 FRs (FR1-FR6)
- **Technical Architecture:** Lines 1600-1650 (Deployment strategy)
- **UX Design Spec:** N/A (deployment story)

## Prerequisites

Story 7.2 complete

## Story Points

2 points

## Notes

- DNS propagation can take 24-48 hours
- SSL certificate is automatic with Vercel
- Email forwarding is simplest option
- Google Workspace provides professional email
- Test domain before announcing launch
