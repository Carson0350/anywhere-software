---
epic: Epic 6 - SEO & Performance Optimization
story: Story 6.4
title: Add Structured Data (Schema.org)
status: ready
points: 3
prerequisites: Story 6.3 complete
---

# Story 6.4: Add Structured Data (Schema.org)

## User Story

**As a** search engine
**I want** to understand the site's content structure
**So that** I can display rich results

## Acceptance Criteria

**Given** I am on the homepage
**When** I parse structured data
**Then** I see Organization schema:
- Name, description, URL, logo
- Contact information
- Service area (Pacific Northwest)

**And** I see LocalBusiness schema:
- Business name, description, URL
- Contact information (phone, email)
- Service area (500 miles radius)
- Price range

**And** on the About page I see Person schema:
- Name: Carson
- Job title: Web Design Consultant
- Skills and expertise
- Service area

**And** on all pages I see BreadcrumbList schema:
- Navigation hierarchy
- Position-based ordering
- Proper URL structure

## Technical Implementation

### Structured Data Component

```astro
---
// src/components/StructuredData.astro
interface Props {
  type: 'organization' | 'person' | 'localbusiness' | 'breadcrumb';
  data?: any;
}

const { type, data } = Astro.props;
const siteUrl = 'https://anywheresoftware.com';

const schemas = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AnywhereSoftware",
    "description": "Mobile web design consultant for rural businesses",
    "url": siteUrl,
    "logo": `${siteUrl}/images/logo.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "email": "hello@anywheresoftware.com"
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "45.5152",
        "longitude": "-122.6784"
      },
      "geoRadius": "500 miles"
    }
  },

  localbusiness: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "AnywhereSoftware",
    "description": "Mobile web design consultant for rural businesses",
    "url": siteUrl,
    "telephone": "+1-555-123-4567",
    "email": "hello@anywheresoftware.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "Pacific Northwest",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "45.5152",
      "longitude": "-122.6784"
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "45.5152",
        "longitude": "-122.6784"
      },
      "geoRadius": "500 miles"
    }
  },

  person: {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Carson",
    "jobTitle": "Web Design Consultant",
    "description": "Mobile web design consultant specializing in rural businesses",
    "url": `${siteUrl}/about`,
    "image": `${siteUrl}/images/carson.jpg`,
    "knowsAbout": ["Web Development", "Astro", "React", "Tailwind CSS", "Mobile Consulting"],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "45.5152",
        "longitude": "-122.6784"
      },
      "geoRadius": "500 miles"
    }
  },

  breadcrumb: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": data?.items || []
  }
};

const schema = schemas[type];
---

<script type="application/ld+json" set:html={JSON.stringify(schema)} />
```

### Usage in Pages

```astro
---
// src/pages/index.astro
import StructuredData from '../components/StructuredData.astro';
---

<Layout>
  <StructuredData type="organization" />
  <StructuredData type="localbusiness" />
  <StructuredData type="breadcrumb" data={{
    items: [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://anywheresoftware.com"
      }
    ]
  }} />

  <!-- Page content -->
</Layout>
```

```astro
---
// src/pages/about.astro
import StructuredData from '../components/StructuredData.astro';
---

<Layout>
  <StructuredData type="person" />
  <StructuredData type="breadcrumb" data={{
    items: [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://anywheresoftware.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About",
        "item": "https://anywheresoftware.com/about"
      }
    ]
  }} />

  <!-- Page content -->
</Layout>
```

## Validation Steps

1. Add StructuredData component - component created
2. Add to homepage - Organization and LocalBusiness schemas
3. Add to About page - Person schema
4. Add breadcrumbs to all pages - BreadcrumbList schema
5. Test with Google Rich Results Test - no errors
6. Test with Schema.org validator - valid JSON-LD
7. Check Google Search Console - structured data recognized

## References

- **PRD:** FR5 (search discoverability)
- **Technical Architecture:** Lines 1400-1450 (SEO strategy)
- **UX Design Spec:** N/A (SEO story)

## Prerequisites

Story 6.3 complete

## Story Points

3 points

## Notes

- Schema.org markup improves search result appearance
- LocalBusiness schema helps with local SEO
- Person schema builds authority for Carson
- BreadcrumbList improves navigation in search results
- Validate with Google Rich Results Test before launch
