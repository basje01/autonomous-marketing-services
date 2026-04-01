---
id: site-structure
title: Site Structure Audit
category: seo
goal: Audit and redesign a site's URL architecture, navigation hierarchy, and crawl path to maximize indexation efficiency and topical signal clarity.
best_for: Technical SEOs working on sites with scaling content libraries, messy URL structures, or poor crawl efficiency.
inputs:
  - Current sitemap or URL list
  - Navigation structure (header, footer, sidebar menus)
  - Content categories and topic clusters
  - Crawl data or log file analysis (if available)
constraints:
  - URL changes must include redirect mapping for existing indexed URLs
  - Navigation depth should not exceed 3 clicks from homepage for priority content
  - Structure must support both human navigation and crawler discovery
outputs:
  - Current structure audit with depth analysis
  - Proposed URL hierarchy with folder structure
  - Navigation redesign recommendations
  - Redirect map for any URL changes
quality_checks:
  - All priority pages reachable within 3 clicks from homepage
  - URL structure reflects topic hierarchy clearly
  - Redirect map covers every URL change with correct status codes
tags:
  - seo
version: 1.0.0
impact: 4
---

## Context

Use this when a site has grown organically without URL planning, resulting in deep pages, orphaned content, or unclear topic signals. Good site structure improves crawl efficiency, internal link equity distribution, and user navigation. It is a prerequisite for effective content cluster execution.

## Procedure

1. Map current URL structure: list all URLs with their folder depth, parent path, and content category.
2. Identify depth problems: pages more than 3 clicks from homepage that should be discoverable.
3. Analyze navigation: which pages are linked from global nav, footer, and sidebar menus.
4. Map current structure against topic clusters: does the URL hierarchy reflect topical relationships?
5. Design proposed URL hierarchy: group by topic, flatten where needed, ensure logical nesting.
6. Plan navigation changes: which pages should be added to or removed from global nav.
7. Create redirect map for any URL changes: old URL, new URL, redirect type (301).

## Output Format

```md
# Site Structure Audit: [Domain]

## Current Structure Analysis
| Metric | Value |
|--------|-------|
| Total URLs | |
| Max depth (clicks from homepage) | |
| Pages at depth > 3 | |
| Orphan pages (no nav link) | |
| URL folders | [list] |

## Depth Issues
| URL | Current Depth | Category | Recommended Depth | Fix |
|-----|-------------|----------|------------------|-----|
| | | | | Move to /[folder]/ |

## Proposed URL Hierarchy
```
/
├── /[topic-1]/
│   ├── /[topic-1]/[subtopic-a]/
│   └── /[topic-1]/[subtopic-b]/
├── /[topic-2]/
│   ├── /[topic-2]/[subtopic-c]/
│   └── /[topic-2]/[subtopic-d]/
└── /blog/
    └── /blog/[post-slug]/
```

## Navigation Recommendations
| Location | Current | Proposed | Rationale |
|----------|---------|----------|-----------|
| Header nav | | | |
| Footer nav | | | |
| Sidebar | | | |

## Redirect Map
| Old URL | New URL | Status Code | Notes |
|---------|---------|------------|-------|
| | | 301 | |

## Implementation Checklist
- [ ] New URL structure deployed
- [ ] 301 redirects in place for all changed URLs
- [ ] Internal links updated to point to new URLs
- [ ] Sitemap regenerated with new URLs
- [ ] Google Search Console URL inspection on key pages
```

## QA Rubric (scored)

- Depth optimization (0-5): all priority pages within 3 clicks of homepage.
- Topical clarity (0-5): URL hierarchy clearly reflects topic relationships.
- Redirect completeness (0-5): every URL change has a 301 redirect mapped.
- Navigation logic (0-5): nav changes improve discoverability without clutter.

## Examples (good/bad)

- Good: "Move /blog/2024/03/15/geo-guide from depth 5 to /geo/complete-guide at depth 2. 301 redirect mapped. Add to header nav under 'Resources'."
- Bad: "Restructure the site." (no specific changes, no redirect plan, no depth analysis)

## Variants

- Quick audit variant: depth analysis + top 10 structural fixes only.
- Full redesign variant: complete URL hierarchy redesign with redirect map, nav changes, and sitemap update.
