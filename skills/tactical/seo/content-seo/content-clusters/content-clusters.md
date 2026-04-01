---
id: content-clusters
title: Content Cluster Execution Plan
category: seo
goal: Convert a topical authority blueprint into a production-ready content cluster with pillar page spec, supporting article briefs, and internal link architecture.
best_for: Content teams executing a topical authority strategy and needing a structured production tracker.
inputs:
  - Topical authority blueprint or topic cluster brief
  - Existing content inventory for the topic
  - Target keyword clusters with intent labels
  - Publishing cadence and resource constraints
constraints:
  - Every cluster piece must link back to the pillar with intent-appropriate anchor text
  - No two cluster pieces should target the same search intent
  - Production sequence must respect dependency order (pillar before dependent clusters)
outputs:
  - Pillar page content spec
  - Supporting article briefs with keyword and intent assignments
  - Internal link map connecting all cluster pieces
  - Production tracker with status and publish dates
quality_checks:
  - Pillar-to-cluster links are bidirectional and use specific anchors
  - No intent overlap between cluster pieces
  - Production tracker includes realistic timelines
tags:
  - seo
  - content
  - growth
version: 1.0.0
impact: 4
---

## Context

Use this after a topical authority blueprint identifies the gaps to close. This skill turns strategy into an execution checklist: what to write, in what order, with what links, and by when. It bridges the gap between planning (topical-authority skill) and writing (content-brief skill).

## Procedure

1. Confirm pillar topic and validate that no existing content already serves as the pillar.
2. Define pillar page structure: comprehensive overview that touches all cluster subtopics at a summary level.
3. List supporting articles: one per cluster subtopic, each with a unique intent and keyword target.
4. Map internal links: pillar links down to each cluster piece, each cluster links up to pillar, and horizontal links between related clusters.
5. Assign anchor text: keyword-relevant but natural, avoiding exact-match spam.
6. Sequence production: pillar first (or simultaneous), then highest-priority clusters, then long-tail.
7. Create production tracker with assigned writers, due dates, and status columns.

## Output Format

```md
# Content Cluster Plan: [Pillar Topic]

## Pillar Page
- Title: [Pillar title]
- URL: [target URL]
- Primary keyword: [keyword]
- Intent: [informational/commercial]
- Scope: [what subtopics it summarizes]
- Word count target: [range]

## Cluster Pieces
| # | Title | Keyword | Intent | Word Count | Links to Pillar | Links from Pillar | Status |
|---|-------|---------|--------|-----------|----------------|-------------------|--------|
| 1 | | | | | Anchor: [text] | Section: [H2] | Draft/Review/Live |

## Internal Link Map
| Source | Target | Anchor Text | Link Type |
|--------|--------|------------|-----------|
| Pillar | Cluster 1 | [text] | Downward |
| Cluster 1 | Pillar | [text] | Upward |
| Cluster 1 | Cluster 3 | [text] | Horizontal |

## Production Tracker
| # | Piece | Writer | Draft Due | Review Due | Publish Date | Status |
|---|-------|--------|-----------|-----------|-------------|--------|
| 0 | Pillar | | | | | |
| 1 | Cluster 1 | | | | | |
```

## QA Rubric (scored)

- Link architecture completeness (0-5): every cluster links to pillar and vice versa, with intentional anchors.
- Intent differentiation (0-5): no two cluster pieces compete for the same SERP.
- Sequencing logic (0-5): production order respects dependencies and authority-building.
- Tracker usability (0-5): clear ownership, dates, and status for every piece.

## Examples (good/bad)

- Good: "Pillar: 'Complete Guide to GEO'. Cluster 1: 'GEO vs SEO: Key Differences' (commercial intent). Cluster 2: 'How AI Crawlers Index Content' (informational). Each links to pillar with unique anchor."
- Bad: "Write 8 articles about GEO and link them together." (no structure, no intent mapping, no sequencing)

## Variants

- Sprint variant: 1 pillar + 4 clusters published in 2 weeks (fast authority signal).
- Evergreen variant: 1 pillar + 8-12 clusters published over 6 weeks with ongoing refresh schedule.
