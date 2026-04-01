---
id: structured-data
title: Structured Data Implementation Plan
category: seo
goal: Audit a site's schema markup and produce a prioritized structured data roadmap that maximizes rich result eligibility and AI citation extractability.
best_for: Technical SEOs and developers implementing or auditing JSON-LD schema for rich results and GEO signal strength.
inputs:
  - Target domain URL list (priority pages)
  - Page types present on site (homepage, article, product, FAQ, local, event)
  - Current schema implementation status (none, partial, or full)
  - Business goals (rich results, AI citations, local pack, e-commerce)
constraints:
  - All schema recommendations must conform to schema.org specifications
  - Validate recommendations against Google Rich Results Test criteria
  - Distinguish between schema for rich results (Google) and schema for AI citation (GEO)
outputs:
  - Schema audit report by page type
  - Implementation spec with JSON-LD examples per page type
  - Priority implementation order with rich result eligibility scores
  - Validation checklist for QA
quality_checks:
  - Every schema recommendation includes a complete JSON-LD example block
  - Rich result eligibility is noted for each schema type
  - GEO citation value is assessed separately from rich result value
tags:
  - seo
  - content
version: 1.0.0
impact: 4
---

## Context

Use this skill after a GEO audit identifies structured data gaps, or during technical SEO onboarding. Structured data serves two purposes: rich result eligibility in Google SERPs, and improved AI extractability for LLM citation. This skill produces implementation-ready specs that developers can execute directly.

## Procedure

1. Audit current schema markup by reviewing page source or validator tool output for each priority page.
2. Map page types to applicable schema types: Article, FAQPage, HowTo, Product, Organization, LocalBusiness, BreadcrumbList, WebSite, Service, Review.
3. Score current implementation per page type: missing, present but incomplete, or fully implemented.
4. Prioritize by rich result eligibility (does Google show this schema in SERPs?) and GEO value (does this help AI extract structured answers?).
5. Write complete JSON-LD implementation examples for each priority schema type, using the site's actual data patterns.
6. Produce validation checklist covering schema.org validity, Google Rich Results Test, and AI extractability signals.

## Output Format

```md
# Structured Data Plan: [Domain]

## Audit Summary
| Page Type | Current Schema | Missing Schema | Rich Result? | GEO Value |
|-----------|--------------|----------------|-------------|----------|
| Homepage | Organization | WebSite | No | Medium |
| Article | None | Article, BreadcrumbList | Yes | High |
| FAQ | None | FAQPage | Yes | High |
| Product | Partial | Review, Offer | Yes | Medium |

## Implementation Specs

### [Page Type]: [Schema Type]
Priority: [1-N]
Rich result eligible: [Yes/No]
GEO citation value: [High/Medium/Low]

JSON-LD:
```

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{{page_title}}",
  "author": {
    "@type": "Person",
    "name": "{{author_name}}"
  },
  "datePublished": "{{publish_date}}",
  "dateModified": "{{modified_date}}"
}
```

```md
## Priority Order
| # | Schema Type | Page Type | Rich Result | GEO Value | Effort |
|---|------------|-----------|-------------|----------|--------|
| 1 | FAQPage | FAQ pages | Yes | High | Low |

## Validation Checklist
- [ ] schema.org property names correct
- [ ] Required properties present per type
- [ ] Google Rich Results Test passes for each page
- [ ] No duplicate schema blocks on same page
- [ ] dateModified is dynamically updated
- [ ] Author entity is consistent across pages
```

## QA Rubric (scored)

- Implementation completeness (0-5): JSON-LD examples are complete, valid, and use real data patterns from the site.
- Prioritization logic (0-5): order reflects business impact and rich result eligibility.
- GEO distinction (0-5): report clearly separates rich result value from AI citation value.
- Validation coverage (0-5): checklist covers all common implementation errors.

## Examples (good/bad)

- Good: "FAQPage schema on /pricing FAQ section - rich result eligible, high GEO value (LLMs extract FAQ answers). JSON-LD includes 5 Q&A pairs from actual page content."
- Bad: "Add schema to your pages." (no specific type, no JSON-LD example, no priority reasoning)

## Variants

- Quick-win variant: FAQPage + BreadcrumbList only (highest ROI for minimal effort).
- Full coverage variant: all applicable schema types across all page types with GEO-specific optimizations.
