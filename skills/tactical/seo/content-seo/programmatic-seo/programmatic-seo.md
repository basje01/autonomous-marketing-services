---
id: programmatic-seo
title: Programmatic SEO System Design
category: seo
goal: Design a programmatic SEO system for data-driven page generation at scale, with quality gates that prevent thin content penalties.
best_for: Sites with structured data sources (product catalogs, directories, location data) that can generate thousands of useful pages.
inputs:
  - Data source schema (database, API, or spreadsheet structure)
  - Target keyword patterns (e.g., "[service] in [city]")
  - Competitor programmatic pages for benchmarking
  - Quality baseline from existing hand-crafted pages
constraints:
  - Every generated page must provide unique, useful value beyond template fill
  - Quality gates must prevent thin or duplicate pages from being indexed
  - URL patterns must be crawl-friendly and follow a logical hierarchy
outputs:
  - Page template specification with required content blocks
  - Data source schema with field requirements
  - Quality gate criteria (minimum content thresholds)
  - URL pattern design and internal link architecture
quality_checks:
  - Template includes unique content blocks that vary meaningfully per page
  - Quality gates define minimum thresholds for indexing
  - URL structure supports both crawling and user navigation
tags:
  - seo
  - content
  - ecommerce
version: 1.0.0
impact: 4
---

## Context

Use this when a site has structured data that can power thousands of useful pages (service areas, product variations, location directories). Programmatic SEO scales content production but requires strict quality gates to avoid Google's thin content and doorway page penalties. This skill designs the system, not individual pages.

## Procedure

1. Identify the data source and map available fields: which data points exist per entity (name, location, attributes, descriptions, images, reviews).
2. Define target keyword patterns: "[entity] in [location]", "[entity] for [use case]", "[entity] vs [entity]".
3. Design the page template: required sections, dynamic content blocks, static supplementary content, and unique value additions per page.
4. Define quality gates: minimum word count, minimum unique content percentage, required data fields present, image requirements.
5. Design URL pattern: logical hierarchy that reflects the data taxonomy.
6. Plan internal linking: hub pages linking to entity pages, entity pages cross-linking to related entities.
7. Create indexation strategy: which pages to index immediately, which to hold behind quality gates, how to handle thin pages.

## Output Format

```md
# Programmatic SEO System: [Project Name]

## Data Source
| Field | Type | Required | Used In Template | Example |
|-------|------|----------|-----------------|---------|
| | string/number/array | Yes/No | [Section] | |

## Keyword Patterns
| Pattern | Example | Estimated Volume per Page | Total Pages |
|---------|---------|--------------------------|-------------|
| [service] in [city] | | | |
| [entity] vs [entity] | | | |

## Page Template
### Required Sections
1. [Section name] - [Dynamic/Static] - [Data fields used]
2. [Section name] - [Dynamic/Static] - [Quality: must have X]
3. FAQ - Dynamic - Generated from data + common questions
4. Related [entities] - Dynamic - Internal links to 5 related pages

### Unique Value Additions
- [What makes each page useful beyond template fill]
- [Data enrichment, calculated fields, comparisons]

## Quality Gates
| Gate | Threshold | Action if Fails |
|------|-----------|----------------|
| Unique content | > 60% unique vs template | noindex until enriched |
| Word count | > [X] words | noindex until enriched |
| Required fields | All required fields present | Do not generate page |
| Image | At least 1 relevant image | Flag for manual review |

## URL Pattern
```
/[category]/[entity-slug]/
/[category]/[location]/
/[category]/[entity-slug]-in-[location]/
```

```md
## Internal Link Architecture
- Hub pages: /[category]/ links to all entity pages
- Entity pages: link to 5 related entities + parent hub
- Cross-links: entities in same location link to each other

## Indexation Strategy
- Phase 1: Index [X] highest-quality pages
- Phase 2: Expand as quality gates are met
- Noindex criteria: [specific conditions]
```

## QA Rubric (scored)

- Template uniqueness (0-5): each generated page provides value beyond template fill.
- Quality gate rigor (0-5): thresholds prevent thin or duplicate pages from being indexed.
- URL architecture (0-5): patterns are logical, crawl-friendly, and scalable.
- Data completeness (0-5): schema accounts for all required fields with handling for missing data.

## Examples (good/bad)

- Good: "Template for '[plumber] in [city]' includes: dynamic service description from provider data, city-specific demand stats, 5 verified customer reviews, FAQ from local search patterns, and related providers in nearby cities. Quality gate: minimum 400 unique words + 1 review."
- Bad: "Generate 500 pages with '[keyword] in [city]' as the title and a generic description." (doorway page, no unique value, thin content)

## Variants

- Directory variant: entity-based pages (businesses, products, professionals) with comparison and filtering.
- Service area variant: location-based pages for businesses serving multiple areas (with strict anti-doorway controls).
