---
id: brand-mentions
title: Brand Mention Tracker
category: seo
goal: Audit and grow a brand's mention footprint across the web, forums, and AI training sources to strengthen E-E-A-T signals and GEO citation probability.
best_for: GEO agencies and SEO teams building off-page authority through strategic mention acquisition.
inputs:
  - Brand name and domain
  - Priority mention sources (Reddit, Quora, G2, LinkedIn, industry publications)
  - Competitor brand names for benchmarking
  - Current known mentions (if any)
constraints:
  - Track linked and unlinked mentions separately (both have GEO value)
  - Prioritize sources known to be indexed and cited by LLMs
  - Do not create artificial or incentivized mentions
outputs:
  - Brand mention audit report with source quality scores
  - Unlinked mention conversion opportunities with outreach specs
  - Mention growth action plan for high-GEO-value sources
  - Month-over-month mention volume trend
quality_checks:
  - Each mention source is assessed for LLM citation likelihood, not just domain authority
  - Unlinked mention opportunities include specific outreach angle
  - Growth actions specify platform, content type, and distribution method
tags:
  - seo
  - content
  - growth
version: 1.0.0
impact: 4
---

## Context

Use this skill as part of the GEO audit cycle or as a standalone off-page authority builder. LLMs disproportionately cite sources from Reddit, Quora, G2, Wikipedia, and editorial press. Building a mention footprint on these platforms directly increases AI citation probability, separate from traditional link building.

## Procedure

1. Audit existing brand mentions using search operators ("brand name" -site:owndomain.com) and platform-specific searches on Reddit, Quora, G2, LinkedIn, and industry publications.
2. Categorize by source type: linked editorial, unlinked mention, forum post, review platform, social media, press coverage.
3. Score each source by GEO citation value: LLMs are known to cite Reddit, Quora, G2, Wikipedia, and editorial press above most other sources.
4. Identify unlinked mentions convertible to links via outreach (author contact, content update request).
5. Benchmark competitor mention volume and source distribution on the same platforms.
6. Design mention acquisition plan: which sources to target, what content or participation strategy earns mentions organically.
7. Set up tracking methodology for ongoing month-over-month measurement.

## Output Format

```md
# Brand Mention Audit: [Brand] - [Month YYYY]

## Summary
- Total mentions found: [X]
- Linked mentions: [X]
- Unlinked mentions: [X]
- Forum mentions (Reddit/Quora): [X]
- Review platform mentions (G2/Capterra): [X]
- Editorial press: [X]

## Mention Inventory
| # | Source URL | Source Type | GEO Value | Linked? | Date | Sentiment |
|---|-----------|-----------|----------|---------|------|-----------|
| 1 | | Editorial/Forum/Review/Social | High/Med/Low | Yes/No | | Pos/Neu/Neg |

## Competitor Comparison
| Source Type | [Brand] | [Competitor A] | [Competitor B] |
|-----------|---------|---------------|---------------|
| Reddit threads | | | |
| G2 reviews | | | |
| Editorial press | | | |
| Quora answers | | | |
| LinkedIn mentions | | | |

## Unlinked Mention Conversion Targets
| URL | Content Context | Outreach Angle | Contact Method |
|-----|----------------|----------------|---------------|
| | | | |

## Mention Acquisition Plan
| Platform | Strategy | Content Type | Target Volume/Month | Owner |
|----------|----------|-------------|---------------------|-------|
| Reddit | Contribute expert answers in relevant subreddits | Comment/Post | | |
| G2 | Encourage verified customer reviews | Review | | |

## Tracking Setup
- Search operators to run monthly: [list]
- Alerts to configure: [Google Alerts, mention monitoring]
- Review cadence: [monthly/bi-weekly]
```

## QA Rubric (scored)

- Source quality scoring (0-5): GEO citation likelihood assessed per source, not just domain authority.
- Competitive benchmarking (0-5): like-for-like comparison on same source types.
- Conversion specificity (0-5): outreach angles are credible and non-generic.
- Acquisition plan actionability (0-5): platform-specific strategies with clear execution steps.

## Examples (good/bad)

- Good: "Brand has 3 Reddit mentions in r/marketing but Competitor A has 12. Strategy: contribute 2 expert answers per week in r/marketing and r/SEO threads about GEO, referencing brand case studies where relevant."
- Bad: "Get more mentions online." (no platform, no strategy, no measurement)

## Variants

- Audit-only variant: inventory existing mentions and competitor benchmark without acquisition plan.
- Full-cycle variant: audit + acquisition plan + monthly tracking setup + outreach templates.
