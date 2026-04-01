---
id: website-seo-setup
title: Website SEO Setup
category: seo
goal: Configure the complete technical SEO foundation for a new website - metadata, structured data, robots directives, sitemap, canonical URLs, and Open Graph tags - so the site is crawlable and indexable from day one.
best_for: New website launches or major redesigns where SEO infrastructure must be set up correctly before content goes live.
inputs:
  - Site information architecture (page list and hierarchy)
  - Brand positioning (for meta descriptions and OG copy)
  - Target keywords per page (if available)
  - Domain and hosting configuration
constraints:
  - Every page must have a unique title tag (50-60 characters)
  - Every page must have a unique meta description (120-160 characters)
  - Canonical URLs must be absolute, not relative
  - Structured data must validate in Google's Rich Results Test
outputs:
  - SEO metadata specification per page
  - robots.txt configuration
  - XML sitemap specification
  - Structured data templates (JSON-LD)
  - Open Graph and Twitter Card configuration
quality_checks:
  - No duplicate title tags across pages
  - All canonical URLs resolve to 200 status
  - robots.txt allows search engine crawling of all public pages
  - Structured data passes Google Rich Results Test validation
tags:
  - seo
  - launch
version: 1.0.0
impact: 4
---

## Context

SEO infrastructure is invisible to users but determines whether search engines can find, understand, and rank the site. Getting it wrong at launch means weeks of lost indexing time. This skill ensures every technical SEO element is configured correctly before the site goes live.

## Procedure

1. Write title tags for every page using the pattern: [Primary keyword] - [Brand]. Keep under 60 characters. Homepage: [Brand] - [Value proposition]. Inner pages: [Page topic] - [Brand].
2. Write meta descriptions for every page: summarize the page content with a call-to-action in 120-160 characters. Include the primary keyword naturally.
3. Set canonical URLs: every page points to its own canonical (self-referencing). Use absolute URLs with the production domain. Handle trailing slashes consistently.
4. Configure robots.txt: allow all public pages, block admin/API routes, reference the sitemap URL.
5. Generate the XML sitemap: include all public pages with lastmod dates, priority hints, and change frequency. Exclude non-indexable pages (404, redirects, paginated).
6. Implement structured data (JSON-LD): Organization schema on homepage, WebPage on all pages, BreadcrumbList on inner pages. Add product-specific schemas where applicable (FAQ, HowTo, SoftwareApplication).
7. Configure Open Graph and Twitter Card tags: og:title, og:description, og:image (1200×630px), og:url, twitter:card (summary_large_image).

## Output Format

```md
# Website SEO Setup

## Page Metadata
| Page | Title Tag | Meta Description | Canonical |
|------|-----------|-----------------|-----------|
| / | "[Brand] - [value prop]" | "[description + CTA]" | https://domain.com/ |
| /product | "[Product] - [Brand]" | "[description]" | https://domain.com/product |
| /pricing | "Pricing - [Brand]" | "[description]" | https://domain.com/pricing |

## robots.txt
```text
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_next/

Sitemap: https://domain.com/sitemap.xml
```

## XML Sitemap
| URL | Priority | Change Freq | Include |
|-----|----------|-------------|---------|
| / | 1.0 | weekly | Yes |
| /product | 0.8 | monthly | Yes |
| /blog/* | 0.6 | weekly | Yes |
| /api/* | - | - | No |

## Structured Data - Homepage
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "[Brand]",
  "url": "https://domain.com",
  "logo": "https://domain.com/logo.png",
  "description": "[description]",
  "sameAs": ["[social URLs]"]
}
```

## Structured Data - Inner Pages
```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "[page title]",
  "description": "[page description]",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [...]
  }
}
```

## Open Graph Tags
| Tag | Value |
|-----|-------|
| og:title | [page title] |
| og:description | [page description] |
| og:image | https://domain.com/og/[page].png |
| og:url | [canonical URL] |
| og:type | website |
| twitter:card | summary_large_image |

## Pre-Launch Checklist
- [ ] All title tags unique and under 60 chars
- [ ] All meta descriptions unique and under 160 chars
- [ ] robots.txt accessible at /robots.txt
- [ ] Sitemap accessible at /sitemap.xml
- [ ] Structured data validates in Rich Results Test
- [ ] OG images are 1200×630px and load correctly
- [ ] Canonical URLs resolve to 200 status
- [ ] No noindex on pages that should be indexed
```

## QA Rubric (scored)

- Metadata uniqueness (0-5): every page has distinct title and description.
- Technical accuracy (0-5): robots.txt, sitemap, and canonicals are correctly configured.
- Structured data validity (0-5): JSON-LD passes Google Rich Results Test.
- Launch readiness (0-5): all checklist items verified before going live.

## Examples (good/bad)

- Good: "Title: 'AI Marketing Platform - LemuriaOS' (35 chars). Description: 'Orchestrate 75 AI marketing specialists across SEO, paid, and social. Start with a free scan.' (97 chars). Canonical: https://lemuriaos.ai/. JSON-LD Organization with logo, sameAs, and description."
- Bad: "Title: 'Home'. Description: empty. No canonical. No structured data. robots.txt blocks everything. No sitemap."

## Variants

- Blog-heavy mode: includes Article schema, author markup, and paginated sitemap for content-heavy sites.
- E-commerce mode: includes Product, Offer, and AggregateRating schemas, plus product-specific OG tags.
