---
id: internal-linking
title: Internal Linking Audit and Plan
category: seo
goal: Audit an existing content set for internal linking gaps and produce a link insertion plan that distributes authority to priority pages and supports topical depth signals.
best_for: SEO teams optimizing an existing content library where pages exist but are poorly interconnected.
inputs:
  - Content inventory with URLs and primary keywords
  - Priority pages (pages you want to rank higher)
  - Site architecture or navigation structure
  - Topic cluster map (if available)
constraints:
  - Anchor text must be contextually natural and varied
  - Avoid over-linking (cap at 3-5 internal links per 1000 words)
  - Links must serve user navigation, not just crawler signals
outputs:
  - Internal linking gap analysis
  - Link insertion plan with source, target, anchor, and placement
  - Orphan page identification
  - Authority flow diagram for priority pages
quality_checks:
  - Every priority page receives at least 3 internal links from relevant content
  - Orphan pages are identified and connected
  - Anchor text is varied and intent-appropriate
tags:
  - seo
  - content
version: 1.0.0
impact: 3
---

## Context

Use this skill when content exists but organic performance is stagnating. Internal linking is one of the highest-leverage, lowest-effort SEO actions: it requires no new content, just strategic connections between existing pages. Run this after a content cluster plan or when GSC data shows pages with impressions but low rankings.

## Procedure

1. Inventory all content URLs with their primary keyword and topic assignment.
2. Identify orphan pages: pages with zero or very few internal links pointing to them.
3. Map priority pages that need authority: high-value pages ranking position 5-20.
4. For each priority page, find 3-5 existing pages that are topically relevant and could link to it.
5. Define anchor text for each link: keyword-relevant but varied (avoid repeating exact-match anchors).
6. Specify placement: which paragraph or section in the source page should contain the link.
7. Validate that no page has excessive outbound internal links diluting its authority.

## Output Format

```md
# Internal Linking Plan: [Domain]

## Orphan Pages (No/Few Inbound Links)
| URL | Primary Keyword | Inbound Links | Recommended Action |
|-----|----------------|--------------|-------------------|
| | | 0-1 | Connect from [source pages] |

## Priority Page Link Plan
### [Priority Page URL]
- Primary keyword: [keyword]
- Current position: [X]
- Current inbound internal links: [X]
- Target inbound links: [X]

| Source Page | Anchor Text | Placement (Section/Paragraph) | Context |
|-----------|------------|------------------------------|---------|
| [URL] | [text] | [H2 section or paragraph #] | [why this link makes sense] |

## Link Density Check
| URL | Word Count | Current Internal Links | Recommended Max | Action |
|-----|-----------|----------------------|----------------|--------|
| | | | | Add/Remove/OK |

## Authority Flow Summary
- Pages receiving most link equity: [list]
- Pages distributing most link equity: [list]
- Recommended adjustments: [specific changes]
```

## QA Rubric (scored)

- Orphan coverage (0-5): all orphan pages identified and connected.
- Anchor text variety (0-5): no repeated exact-match anchors, contextually natural.
- Placement specificity (0-5): exact section or paragraph specified for each link insertion.
- Authority flow logic (0-5): link plan supports priority page rankings without over-optimization.

## Examples (good/bad)

- Good: "Add link from '/blog/geo-vs-seo' paragraph 3 to '/services/geo-audit' with anchor 'GEO audit process'. This connects the educational piece to the service page with commercial intent."
- Bad: "Add more links to the homepage." (no specific source, anchor, or placement)

## Variants

- Quick audit variant: orphan page identification + top 5 priority page link plan only.
- Full restructure variant: complete site-wide link audit with authority flow analysis and link density optimization.
