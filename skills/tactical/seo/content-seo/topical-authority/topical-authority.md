---
id: topical-authority
title: Topical Authority Blueprint
category: seo
goal: Map a brand's content coverage against a topic domain to identify authority gaps, then design a content strategy that builds machine-recognizable expertise.
best_for: Brands and agencies pursuing AI citation and organic ranking improvements through depth of coverage rather than volume of output.
inputs:
  - Core topic domain (e.g., "GEO for B2B SaaS")
  - Existing content inventory (URL list)
  - Top 3 competitors known to rank well in the topic
  - Business goal (leads, citations, rankings, brand awareness)
constraints:
  - Authority gaps must be validated by SERP evidence, not assumed
  - Avoid recommending content that duplicates existing coverage without clear differentiation
  - Prioritize depth on fewer topics over shallow coverage of many
outputs:
  - Topic coverage map (brand owns vs. gaps vs. competitor-owned)
  - Authority gap list with priority scores
  - Content production roadmap to close top gaps
  - Internal linking architecture to signal topic depth
quality_checks:
  - Coverage map is derived from actual content audit, not guesswork
  - Each gap has a clearly articulated ranking or citation rationale
  - Roadmap has sequencing logic tied to authority-building
tags:
  - seo
  - content
  - growth
  - research
version: 1.0.0
impact: 5
---

## Context

Use this when a brand has content output but lacks organic growth or AI citations in their domain. This skill produces the strategic blueprint that content-clusters and content-brief skills execute against. It sits between keyword-research (demand mapping) and content production (execution).

## Procedure

1. Define topic domain boundaries: list 20-30 subtopics that a comprehensive expert resource would cover.
2. Audit existing content inventory: map each URL to subtopics it covers (full, partial, missing).
3. Audit top 3 competitor domains: identify subtopics they own with strong-ranking content.
4. Score each subtopic gap: (business relevance x search demand x competitor authority vacuum) / implementation effort.
5. Design content architecture: pillar + spoke model with clear topical relationships.
6. Map internal linking routes to signal topical depth to crawlers and LLMs.
7. Sequence production roadmap: start with foundational subtopics that anchor the pillar, then cluster outward.

## Output Format

```md
# Topical Authority Blueprint: [Topic Domain]

## Coverage Map
| Subtopic | Brand Status | Competitor A | Competitor B | Competitor C | Gap Priority |
|----------|-------------|-------------|-------------|-------------|-------------|
| | Owned/Partial/Missing | Strong/Weak/None | | | High/Med/Low |

## Top Authority Gaps (Ranked)
| # | Subtopic | Gap Score | Why It Matters | What to Produce |
|---|----------|-----------|----------------|-----------------|
| 1 | | | | |

## Content Architecture
### Pillar: [Title]
- Intent: [primary search intent]
- URL target: [existing or new]
- Clusters anchored: [list of subtopics this pillar supports]

### Cluster: [Subtopic]
- Feeds into pillar via: [internal link with anchor text]
- Gap filled: [which authority gap this closes]
- Content type: [article/guide/comparison/FAQ]

## Production Roadmap
| Week | Content Piece | Gap Closed | Authority Signal | Dependencies |
|------|-------------|-----------|-----------------|-------------|
| 1 | | | Anchors pillar | None |
| 2 | | | Expands cluster | Pillar live |

## Internal Linking Plan
| Source URL | Target URL | Anchor Text | Purpose |
|-----------|-----------|------------|---------|
| | | | Authority flow / topical signal |
```

## QA Rubric (scored)

- Coverage map completeness (0-5): subtopic list is comprehensive for the domain.
- Gap prioritization logic (0-5): scoring rationale is defensible and evidence-based.
- Architecture clarity (0-5): pillar/cluster structure is unambiguous and non-overlapping.
- Roadmap sequencing (0-5): production order follows authority-building logic, not arbitrary.

## Examples (good/bad)

- Good: "Topic: Generative Engine Optimization. Subtopics: GEO definition, GEO vs SEO, AI crawler access, structured data for GEO, citation tracking, GEO case studies. Brand owns 2/6, competitors own 4/6. Pillar: 'Complete Guide to GEO'. Clusters build outward from definition → tactics → measurement."
- Bad: "Write 20 blog posts about GEO." (no coverage analysis, no gap prioritization, no architecture)

## Variants

- Authority-first variant: prioritize subtopics that build foundational expertise and E-E-A-T signals before commercial content.
- Revenue-first variant: prioritize subtopics with commercial intent that drive leads, using authority content as supporting structure.
