---
id: llm-visibility
title: LLM Visibility Tracker
category: seo
goal: Measure and track how often a brand is cited, mentioned, or recommended across major LLM platforms, and identify gaps versus competitors.
best_for: Brands and agencies using citation share as a primary GEO KPI for client reporting.
inputs:
  - Brand name and domain
  - List of 10-20 target queries (informational, commercial, comparative)
  - Competitor brand names (2-4)
  - LLM platforms to test (ChatGPT, Perplexity, Gemini, Claude)
constraints:
  - Test prompts must be neutral and representative of real user queries
  - Record exact prompt, platform, date, and response verbatim
  - Do not optimize prompts to artificially inflate citation rate
outputs:
  - Citation share report (brand vs. competitors per platform)
  - Query-level citation log with verbatim response excerpts
  - Visibility gap analysis with root cause hypotheses
  - Month-over-month trend tracking template
quality_checks:
  - Each query tested on at least 2 platforms
  - Competitor benchmarks use identical prompts
  - Root cause hypotheses reference specific content or authority gaps
tags:
  - seo
  - analytics
  - research
version: 1.0.0
impact: 5
---

## Context

Use this skill monthly (or bi-weekly for active GEO campaigns) to measure whether optimization efforts are translating into AI citation improvements. The output feeds back into the GEO audit cycle and informs content strategy priorities.

## Procedure

1. Define query set: 5 informational ("what is X"), 5 commercial ("best X for Y"), 5 comparative ("X vs. Y"), 5 brand-adjacent queries relevant to the client's domain.
2. Run each query on each target LLM platform and record the verbatim response.
3. Score each response: 2 points for direct citation with link, 1 point for brand mention without link, 0 for no mention.
4. Aggregate by platform and query type to compute citation share percentage.
5. Run identical queries for each competitor using the same methodology.
6. Identify queries where competitor is cited but brand is not; hypothesize the content or authority gap causing the difference.
7. Produce monthly tracking template for trend analysis and flag significant changes.

## Output Format

```md
# LLM Visibility Report: [Brand] - [Month YYYY]

## Summary
- Overall citation share: X%
- vs. [Competitor A]: X%
- vs. [Competitor B]: X%
- Best platform: [platform]
- Weakest platform: [platform]
- Queries with brand cited: X/20
- MoM change: [+/-X citations]

## Query-Level Results
| # | Query | Platform | Brand Cited? | Citation Type | Competitor Cited | Notes |
|---|-------|----------|-------------|---------------|-----------------|-------|
| 1 | | | Yes/No | Link/Mention/None | | |

## Platform Breakdown
| Platform | Citation Rate | vs. Last Month | Top Query | Weakest Query |
|----------|-------------|----------------|-----------|---------------|
| ChatGPT | | | | |
| Perplexity | | | | |
| Gemini | | | | |
| Claude | | | | |

## Gap Analysis
| Query | Competitor Cited | Brand Not Cited Because | Recommended Fix |
|-------|-----------------|------------------------|-----------------|
| | | | |

## Actions This Month
1. [Action tied to specific gap]
2. [Action tied to specific gap]
3. [Action tied to specific gap]
```

## QA Rubric (scored)

- Methodology consistency (0-5): same prompts, same conditions, same date range across all platforms.
- Data completeness (0-5): all queries tested on all target platforms with no gaps.
- Gap analysis quality (0-5): root causes are specific, referencing content or authority differences.
- Trend infrastructure (0-5): report structure supports month-over-month comparison without reformatting.

## Examples (good/bad)

- Good: "Query 'best GEO agency' on Perplexity cites Competitor A due to their published case study with metrics. Recommended fix: publish a GEO case study with before/after citation data."
- Bad: "Brand is not showing up in AI. Need to improve content." (no specific query, platform, or root cause)

## Variants

- Lite variant: 10 queries across 2 platforms (ChatGPT + Perplexity) for monthly pulse check.
- Deep variant: 20 queries across 4 platforms with competitor benchmarking and quarterly trend report.
