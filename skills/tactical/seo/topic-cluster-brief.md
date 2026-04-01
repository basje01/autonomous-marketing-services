---
id: topic-cluster-brief
title: Topic Cluster Brief
category: seo
goal: Build a topical authority plan with pillar and supporting clusters tied to demand and business intent.
best_for: Content programs moving from ad hoc keyword posts to structured discoverability strategy.
inputs:
  - ICP search intents
  - Product value map
  - Existing content inventory
constraints:
  - Prioritize intent relevance over raw volume
  - Clusters must support internal linking architecture
outputs:
  - Topic cluster map
  - Content sequencing roadmap
quality_checks:
  - Pillar-topic fit is high
  - Cluster avoids cannibalization
  - Internal links are intentional
tags:
  - seo
  - content
  - growth
version: 1.0.0
impact: 4
---

## Context

Use this when content output is high but organic growth and topical authority are weak. Publishing 50 blog posts without a cluster strategy is like building rooms without hallways - each piece exists in isolation with no internal link equity flow. The result: Google sees breadth but not depth, and no single topic earns authority. This skill produces a pillar-cluster architecture that feeds into content briefs, internal linking plans, and editorial calendars.

## Procedure

1. Define 3-5 business-critical themes.
2. Map search intents per theme (informational, commercial, transactional).
3. Create one pillar plus 5-8 cluster topics per pillar.
4. Assign internal link routes and canonical intent.
5. Sequence production by impact and speed-to-rank potential.

## Output Format

```md
# Topic Cluster Brief

## Pillar Theme

- Pillar Topic:
- Business Goal:
- Primary Intent:

## Cluster Plan

| Cluster Topic | Intent | Primary Keyword | Supporting Keywords | Internal Link Target | Priority |
| ------------- | ------ | --------------- | ------------------- | -------------------- | -------- |
|               |        |                 |                     |                      |          |

## Production Sequence

1. Week 1:
2. Week 2:
3. Week 3:
```

## QA Rubric (scored)

- Strategic relevance (0-5): tied to product and ICP demand.
- Intent mapping (0-5): accurate search-intent alignment.
- Architecture quality (0-5): clean internal linking and hierarchy.
- Execution readiness (0-5): clear sequencing and ownership.

## Examples (good/bad)

- Good: “Pillar: B2B onboarding analytics, clusters cover setup, benchmarks, tooling, and ROI model.”
- Bad: “Random high-volume keywords unrelated to product value.”

## Anti-Patterns

| Anti-Pattern | Why It Fails | Correct Approach |
|---|---|---|
| Pillar page that's just a longer blog post | A 3,000-word article isn't a pillar - it's a long article. Pillar pages must link to and summarize cluster content, not compete with it | Pillar = comprehensive overview linking to deep-dives. Cluster pages = focused subtopics linking back to the pillar. The pillar earns authority from the cluster, not from its own word count |
| Cluster topics that cannibalize each other | "Best CRM for startups" and "Top CRM tools for small businesses" target the same intent - Google picks one and suppresses the other | Map each cluster page to a distinct search intent. If two pages target overlapping queries, merge them or differentiate the intent (comparison vs review vs tutorial) |
| No internal linking plan | Creating cluster content without planned anchor text and link placement - links get added randomly or forgotten | Define link routes before writing: each cluster page links to the pillar with specific anchor text. The pillar links to each cluster page. Cross-links between related clusters where contextually relevant |

## Variants

- Authority-first variant: Prioritize informational clusters with high search volume and low competition. Goal is topical authority and backlink attraction before commercial pages. Sequence: pillar → informational clusters → commercial clusters. 3-6 month timeline.
- Revenue-first variant: Start with commercial-intent clusters (comparison, alternative, pricing, use-case pages). Link to a conversion-focused pillar. Informational content added later to support authority. Faster revenue impact but slower domain authority build.
