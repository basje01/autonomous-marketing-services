---
id: keyword-research
title: Keyword Research Brief
category: seo
goal: Identify, cluster, and prioritize target keywords for a topic area, producing an execution-ready keyword map that drives content and on-page optimization decisions.
best_for: Content strategists and SEO leads building or auditing a keyword strategy for a product or service.
inputs:
  - Seed topic or product category
  - Target audience (ICP) description
  - Known competitors (2-4 domains)
  - Business goals (traffic, leads, revenue)
constraints:
  - Prioritize intent relevance over raw search volume
  - Cluster by intent before assigning to content types
  - Flag cannibalization risks when two keywords map to same intent
outputs:
  - Keyword cluster map with intent labels
  - Priority keyword list (top 20) with volume, difficulty, and intent
  - Content type recommendation per cluster
  - Cannibalization risk flags
quality_checks:
  - Every keyword has an assigned intent (informational, commercial, transactional, navigational)
  - Clusters are non-overlapping and non-redundant
  - At least one quick-win keyword identified per cluster
tags:
  - seo
  - content
  - research
version: 1.0.0
impact: 4
---

## Context

Use this at the start of any SEO engagement or when expanding into a new topic area. The output feeds directly into search-intent analysis, content-brief creation, and topic-cluster planning.

## Procedure

1. Generate seed keyword list from topic, ICP language, competitor URL structures, and related search suggestions.
2. Expand with modifier sets: question-based (how, what, why), comparison-based (vs, best, top), job-to-be-done-based (for, to, with).
3. Group into intent clusters: informational (TOFU), commercial investigation (MOFU), transactional (BOFU), navigational.
4. Score each keyword: volume tier (H/M/L), difficulty tier (H/M/L), business relevance (1-5), intent clarity (1-5).
5. Assign content type to each cluster: pillar page, supporting article, landing page, FAQ, comparison page, or tool page.
6. Identify cannibalization risks where 2+ keywords share near-identical intent and would compete for the same SERP position.
7. Flag quick-wins: low difficulty + medium or higher volume + high business relevance.

## Output Format

```md
# Keyword Research Brief: [Topic]

## Priority Keywords (Top 20)
| # | Keyword | Intent | Vol Tier | Diff Tier | Biz Relevance | Content Type | Quick-Win? |
|---|---------|--------|----------|-----------|----------------|-------------|------------|
| 1 | | | H/M/L | H/M/L | 1-5 | | Y/N |

## Keyword Clusters

### Cluster: [Name]
- Intent: [informational/commercial/transactional]
- Pillar keyword: [primary]
- Supporting keywords: [list]
- Recommended content type: [type]
- Internal link target: [URL or page]
- Quick-win candidate: [keyword, if any]

## Quick Wins
| Keyword | Why | Recommended Action |
|---------|-----|-------------------|
| | Low diff + high relevance | |

## Cannibalization Risks
| Keyword A | Keyword B | Overlap Reason | Resolution |
|-----------|-----------|----------------|------------|
| | | Same SERP intent | Merge into single page / differentiate angle |
```

## QA Rubric (scored)

- Intent accuracy (0-5): every keyword assigned to correct intent type based on SERP evidence.
- Cluster coherence (0-5): no overlap between clusters, logical grouping by theme.
- Prioritization logic (0-5): business relevance drives ranking, not just volume.
- Actionability (0-5): each cluster has a clear next step (content type + owner).

## Examples (good/bad)

- Good: "Cluster 'GEO pricing' groups 'GEO agency cost', 'generative engine optimization pricing', and 'how much does GEO cost' under commercial intent with landing page recommendation."
- Bad: "Keywords: SEO, marketing, digital marketing, online marketing" (too broad, no clustering, no intent, no prioritization).

## Variants

- Discovery variant: broad exploration for a new market entry (wide seed, many clusters).
- Expansion variant: deepening coverage in an existing topic where some content already ranks.
