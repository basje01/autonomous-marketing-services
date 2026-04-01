---
id: site-information-architecture
title: Site Information Architecture
category: positioning
goal: Design the page hierarchy, navigation structure, and content flow that maps every user intent to the shortest path to conversion.
best_for: New website builds, major redesigns, or sites where analytics show high bounce rates from poor navigation.
inputs:
  - Website discovery brief
  - User research or analytics showing top entry pages and drop-off points
  - Content inventory of existing pages and assets
constraints:
  - Maximum 7 primary navigation items (Miller's law)
  - Every page must be reachable in 3 clicks or fewer from the homepage
  - Navigation labels must use visitor language, not internal jargon
outputs:
  - Visual sitemap with page hierarchy
  - Navigation specification with labels and destinations
  - Content flow diagram per key page
quality_checks:
  - No orphan pages without a navigation path
  - Primary conversion page is reachable from every page
  - Labels pass the 5-second clarity test
tags:
  - research
  - content
version: 1.0.0
impact: 5
---

## Context

Information architecture is the invisible structure that determines whether visitors find what they need or bounce. Poor IA creates friction that no amount of visual polish can fix. This skill produces the structural blueprint that precedes all design and development work.

## Procedure

1. List every required page from the discovery brief. Add pages implied by the goal hierarchy (e.g., pricing, case studies, contact).
2. Group pages by user intent: awareness (learn), evaluation (compare), decision (buy/sign up).
3. Design the primary navigation: max 7 items, ordered by user priority (not business org chart). Use card sorting logic - group by what users seek, not what departments produce.
4. Design secondary navigation: footer links, utility nav (login, docs, support).
5. Map the content flow for each key page: what the user sees first → what builds confidence → what triggers the next action.
6. Define the CTA hierarchy per page: one primary CTA, one secondary, and a passive option (e.g., bookmark, share).
7. Validate against the discovery brief's goal hierarchy - the highest-priority conversion must have the shortest path from any entry page.

## Output Format

```md
# Site Information Architecture

## Sitemap

### Level 0 (root)
- / (Homepage)

### Level 1 (primary nav)
- /product - [purpose]
- /pricing - [purpose]
- /customers - [purpose]
- /resources - [purpose]
- /company - [purpose]

### Level 2 (sub-pages)
- /product/features - [purpose]
- /product/integrations - [purpose]
- /customers/case-studies - [purpose]

## Navigation Spec

### Primary Nav (header)
| Label | Destination | Dropdown Items |
|-------|-------------|----------------|
| ...   | ...         | ...            |

### CTA Button
- Label: [text]
- Destination: [url]

### Footer Nav
| Column | Links |
|--------|-------|
| Product | features, pricing, integrations |
| Company | about, careers, contact |
| Resources | blog, docs, changelog |

## Content Flow - Homepage
1. Hero: [headline] → [subhead] → [primary CTA]
2. Social proof: [logos / metrics / quote]
3. Value props: [3 cards with benefit headlines]
4. How it works: [3 steps]
5. Testimonial: [customer quote with attribution]
6. Final CTA: [repeat primary CTA with urgency]

## Page-Level CTA Map
| Page | Primary CTA | Secondary CTA | Passive |
|------|-------------|---------------|---------|
| /    | Start free  | See demo      | Read blog |
| ...  | ...         | ...           | ...     |

## Intent Mapping
| User Intent | Entry Path | Pages Visited | Exit Action |
|-------------|------------|---------------|-------------|
| Evaluate    | / → /product → /pricing | 3 pages | Start free |
| Research    | /blog/[post] → /product | 2 pages | Sign up |
```

## QA Rubric (scored)

- Navigation clarity (0-5): labels are self-explanatory without context.
- Path efficiency (0-5): primary conversion reachable in 2 clicks from any page.
- Intent coverage (0-5): all three intent stages (learn, evaluate, decide) have dedicated paths.
- Structural simplicity (0-5): no more than 3 hierarchy levels, no ambiguous groupings.

## Examples (good/bad)

- Good: "Primary nav: Product, Pricing, Customers, Docs, Blog - 5 items, user-intent-ordered. Homepage flow: hero → logo bar → 3 value props → how it works → testimonial → CTA."
- Bad: "Nav: Solutions, Platform, Resources, Partners, About, Newsroom, Careers, Contact - 8 items mixing user and business concerns."

## Variants

- Landing page mode: single-page architecture with anchor sections instead of multi-page hierarchy.
- Multi-product mode: product switcher in nav with shared resources and distinct product sub-sites.
