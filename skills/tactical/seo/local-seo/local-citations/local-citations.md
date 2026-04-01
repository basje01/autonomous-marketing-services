---
id: local-citations
title: Local Citation Audit and Plan
category: seo
goal: Build and maintain consistent NAP citation coverage across top local directories to support local pack rankings and brand discoverability.
best_for: Local businesses and agencies establishing or cleaning up a citation footprint for local search visibility.
inputs:
  - Business NAP (Name, Address, Phone)
  - Website URL
  - Current known citations and directory listings
  - Service area and business categories
constraints:
  - NAP must be identical across all citations (exact format matching)
  - Only submit to legitimate directories (no spam or PBN-style sites)
  - Duplicate listings must be identified and removed or merged
outputs:
  - Citation audit with consistency check
  - Priority directory submission list
  - NAP standard document (canonical format)
  - Duplicate listing cleanup plan
quality_checks:
  - NAP format is standardized and documented
  - All major directories for the business category are included
  - Duplicates are identified with specific resolution steps
tags:
  - seo
  - b2c
version: 1.0.0
impact: 3
---

## Context

Use this when a local business has inconsistent NAP data across the web, or when building initial local authority for a new business location. Citation consistency is a local ranking factor: Google cross-references NAP data across directories to validate business legitimacy. Inconsistencies erode trust signals.

## Procedure

1. Define the canonical NAP standard: exact business name, address format (suite vs. Ste. vs. #), phone format, website URL.
2. Audit existing citations: search for the business name across major directories and identify all current listings.
3. Check NAP consistency: compare each listing against the canonical standard.
4. Identify duplicate listings (same directory, different NAP variations).
5. Build priority submission list: major directories the business is missing from, ranked by authority and relevance.
6. Create submission spec: exact data to enter in each directory field.
7. Plan duplicate cleanup: which listings to claim, merge, or request removal.

## Output Format

```md
# Local Citation Plan: [Business Name]

## Canonical NAP Standard
- Business Name: [exact format]
- Address: [exact format including suite/unit]
- Phone: [exact format with area code]
- Website: [exact URL including https]

## Citation Audit
| Directory | Listed? | Name Match | Address Match | Phone Match | Action |
|-----------|---------|-----------|--------------|------------|--------|
| Google Business Profile | Yes | OK | OK | OK | None |
| Yelp | Yes | Mismatch | OK | Mismatch | Update |
| Apple Maps | No | - | - | - | Submit |
| Bing Places | No | - | - | - | Submit |

## Priority Submission List
| # | Directory | Category | Authority | Status | Submission URL |
|---|-----------|----------|-----------|--------|---------------|
| 1 | | | High/Med | Missing | [URL] |

## Duplicate Listings
| Directory | Listing 1 | Listing 2 | Resolution |
|-----------|----------|----------|-----------|
| | [NAP variant] | [NAP variant] | Merge / Remove duplicate |

## Submission Spec
| Field | Value |
|-------|-------|
| Business Name | [canonical] |
| Address Line 1 | |
| City | |
| State/Province | |
| Postal Code | |
| Phone | |
| Website | |
| Categories | |
| Description | [100-word standard description] |
```

## QA Rubric (scored)

- NAP standardization (0-5): canonical format is documented and unambiguous.
- Audit completeness (0-5): all major directories checked for existing listings.
- Consistency tracking (0-5): every mismatch identified with specific correction.
- Submission plan quality (0-5): priority directories are relevant and legitimate.

## Examples (good/bad)

- Good: "Canonical: 'LEMURIAOS, Keizersgracht 123, 1015 CJ Amsterdam, +31 20 123 4567'. Yelp listing has 'LemuriaOS AI' (name mismatch) and missing phone. Action: claim listing, update name and phone to canonical format."
- Bad: "Submit to 200 directories." (no consistency check, no quality filter, potential spam)

## Variants

- Cleanup variant: audit existing citations and fix inconsistencies (no new submissions).
- Build variant: initial citation building for a new business from scratch.
