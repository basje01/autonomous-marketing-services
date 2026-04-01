---
id: multi-location-seo
title: Multi-Location SEO
category: seo
goal: Manage SEO for businesses with multiple physical locations, ensuring NAP consistency, per-location content, and unified brand authority across all locations.
best_for: Businesses with two or more physical locations, franchises, or chains that need per-location local visibility with brand-level coordination.
inputs:
  - List of all business locations with NAP data
  - Website URL and URL structure for location pages
  - GBP listings per location (if they exist)
  - Brand guidelines for consistent naming and messaging
  - Per-location unique offerings or differentiators
constraints:
  - NAP must be consistent per location across all platforms
  - Location pages must have unique, substantive content (not templates with city-name swaps)
  - Each location must have its own GBP listing (not one shared listing)
  - Centralized brand guidelines must be balanced with location-specific authenticity
outputs:
  - Multi-location NAP consistency audit
  - Per-location landing page strategy with unique content briefs
  - GBP management plan per location
  - Citation strategy (aggregated vs. individual)
  - Store locator and location finder optimization recommendations
quality_checks:
  - NAP data standardized and consistent per location
  - Each location page has genuinely unique content angles
  - GBP recommendations are specific per location, not blanket advice
  - Citation strategy accounts for both brand-level and location-level directories
tags:
  - seo
  - b2c
  - b2b
version: 1.0.0
impact: 3
---

## Context

Use this when a business operates from multiple physical locations and needs coordinated local SEO across all of them. Multi-location SEO introduces challenges not present in single-location work: cross-location NAP consistency, avoiding keyword cannibalization between location pages, managing separate GBP listings, and deciding between aggregated vs. per-location citation strategies. This skill produces a unified management framework that maintains brand consistency while allowing each location to rank for its own local queries.

## Procedure

1. Inventory all locations: collect canonical NAP, operating hours, unique services, and differentiators per location.
2. Audit NAP consistency per location across GBP, website, and top citation sources.
3. Review website URL structure: verify each location has its own landing page at a logical URL (e.g., /locations/city-name/).
4. Audit each location's GBP listing for completeness and accuracy.
5. Design per-location landing page strategy with unique content angles for each (staff profiles, local context, location-specific offerings).
6. Determine citation strategy: aggregated (brand-level directories) vs. individual (per-location directory submissions).
7. Plan store locator or location finder optimization: ensure it's crawlable, has structured data, and supports search intent.
8. Create management cadence: who updates what, how often, and how changes propagate across locations.

## Output Format

```md
# Multi-Location SEO Plan: [Brand Name]

## Location Inventory
| # | Location | Address | Phone | GBP Status | Page URL | Primary Keywords |
|---|---------|---------|-------|------------|---------|-----------------|
| 1 | [City A] | [addr] | [phone] | Active/Missing | /locations/city-a | [keywords] |
| 2 | [City B] | [addr] | [phone] | Active/Missing | /locations/city-b | [keywords] |

## NAP Consistency Audit
| Location | GBP Match | Website Match | Yelp Match | [Dir] Match | Issues |
|---------|-----------|--------------|-----------|------------|--------|
| City A | ✅ | ✅ | ⚠️ Old phone | - | Update Yelp phone |
| City B | ✅ | ❌ Wrong suite | ✅ | - | Fix website address |

## Per-Location Landing Pages

### [Location A] - /locations/[city-a]/
- H1: [Service] in [City A] - [differentiator]
- Unique content: [staff profiles, local partnerships, community involvement]
- Local context: [neighborhood description, parking, transit access]
- Schema: LocalBusiness with location-specific address and geo
- Photos: [location-specific photo requirements]

### [Location B] - /locations/[city-b]/
- H1: [Service] in [City B] - [differentiator]
- Unique content: [different angle from Location A]
...

## GBP Management Plan
| Location | Owner | Post Frequency | Review Response | Photo Updates |
|---------|-------|---------------|----------------|--------------|
| City A | [name] | Weekly | Within 48h | Monthly |
| City B | [name] | Weekly | Within 48h | Monthly |

## Citation Strategy
| Approach | When to Use | Directories | Per-Location Action |
|----------|------------|-------------|-------------------|
| Aggregated | Brand-level authority | [list] | One submission, list all locations |
| Individual | Location-specific authority | [list] | Separate submission per location |

## Store Locator Optimization
- Crawlable HTML (not JavaScript-only)
- Individual location pages linked from locator
- LocalBusiness schema on each location page
- Search/filter by service area or distance

## Management Cadence
| Task | Frequency | Owner | Applies To |
|------|-----------|-------|-----------|
| NAP consistency check | Monthly | [role] | All locations |
| GBP post publishing | Weekly | Per-location manager | Each location |
| Review response | Within 48 hours | Per-location manager | Each location |
| Location page content refresh | Quarterly | Content team | All pages |
| Citation audit | Quarterly | SEO team | All locations |
```

## QA Rubric (scored)

- NAP consistency (0-5): every location's NAP verified across all platforms with specific mismatches documented.
- Content uniqueness (0-5): each location page has genuinely different content, not template-swapped.
- GBP specificity (0-5): per-location GBP recommendations are specific and actionable.
- Management scalability (0-5): cadence and ownership are clear and sustainable as locations grow.

## Examples (good/bad)

- Good: "Location A (Amsterdam): NAP consistent across GBP, website, and 8 directories. Landing page at /locations/amsterdam has unique staff bios, neighborhood guide (Jordaan area), and 3 location-specific FAQ entries. GBP: 78 reviews, 4.5 avg, weekly posts active. Location B (Rotterdam): NAP mismatch on Yelp (old address from 2023 move). Landing page shares 80% content with Amsterdam page - needs unique Rotterdam angles. GBP: 12 reviews, no posts since October."
- Bad: "Create a page for each location with the business description. Make sure the address is right." (no audit, no unique content plan, no GBP management, no citation strategy)

## Variants

- Audit-only variant: NAP consistency check and GBP review across all locations without content or strategy planning.
- New location launch variant: checklist for adding a new location to the existing multi-location framework.
- Franchise variant: template-based approach for franchise systems where brand guidelines are strict and location customization is limited.
