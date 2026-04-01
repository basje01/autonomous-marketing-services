---
id: search-console
title: Search Console Performance Analysis
category: seo
goal: Extract actionable SEO opportunities from Google Search Console data, including quick-win keyword optimizations, indexation fixes, and performance trend analysis.
best_for: SEO practitioners running monthly performance reviews and identifying high-leverage optimization opportunities from existing traffic data.
inputs:
  - GSC performance report export (last 90 days)
  - GSC coverage or indexing report
  - Core Web Vitals report (if available)
  - Site's primary conversion goals
constraints:
  - All recommendations must tie to specific GSC data points, not generalizations
  - Distinguish between traffic preservation (fixing drops) and growth actions (new opportunities)
  - Prioritize pages with existing impressions over zero-data pages
outputs:
  - Quick-win opportunity list (keywords ranking 4-20 with high impressions)
  - Indexation issue log with fix specifications
  - CTR improvement targets for high-impression, low-CTR queries
  - Month-over-month performance summary
quality_checks:
  - Every recommendation cites a specific GSC data point (query, URL, metric)
  - Quick-wins have clear implementation actions, not just identification
  - Indexation issues are categorized by cause
tags:
  - seo
  - analytics
version: 1.0.0
impact: 4
---

## Context

Use this skill monthly as the core measurement loop for any SEO engagement. GSC data reveals what Google actually sees, making it the ground truth for organic performance. The output drives title-tag rewrites, content refreshes, indexation fixes, and keyword-research expansion.

## Procedure

1. Identify position 4-20 keywords with high impression volume (quick-win candidates for rank improvement via content updates or on-page fixes).
2. Filter for queries with high impressions but low CTR (title tag and meta description optimization targets).
3. Review coverage/indexing report: categorize excluded URLs by reason (crawl anomaly, noindex, redirect, duplicate, canonical conflict).
4. Flag any "Valid with warnings" pages and diagnose the specific warning.
5. Check Core Web Vitals report for pages with "Poor" or "Needs Improvement" status.
6. Compute month-over-month performance: impressions, clicks, average position, CTR trend.
7. Prioritize actions by: estimated traffic impact x implementation effort x confidence in fix.

## Output Format

```md
# Search Console Analysis: [Domain] - [Month YYYY]

## Performance Summary (Last 90 Days)
| Metric | Current | Previous Period | Change |
|--------|---------|----------------|--------|
| Impressions | | | +/-% |
| Clicks | | | +/-% |
| Average Position | | | +/- |
| Average CTR | | | +/-% |

## Quick-Win Opportunities (Position 4-20, High Impressions)
| Query | URL | Position | Impressions | Clicks | CTR | Action |
|-------|-----|----------|-------------|--------|-----|--------|
| | | | | | | [Specific fix] |

## CTR Improvement Targets
| Query | URL | Impressions | Current CTR | Expected CTR | Title Tag Recommendation |
|-------|-----|-------------|-------------|-------------|--------------------------|
| | | | | | |

## Indexation Issues
| URL | Status | Reason | Fix Required | Priority |
|-----|--------|--------|-------------|----------|
| | Excluded | [Crawl anomaly/noindex/redirect/duplicate] | | H/M/L |

## Core Web Vitals Flags
| URL Group | Status | Failing Metric | Value | Fix |
|-----------|--------|---------------|-------|-----|
| | Poor/Needs Improvement | LCP/CLS/INP | | |

## Priority Action List
| # | Action | Impact Estimate | Effort | Owner |
|---|--------|----------------|--------|-------|
| 1 | | | L/M/H | |
```

## QA Rubric (scored)

- Data grounding (0-5): every recommendation links to a specific GSC metric and data point.
- Quick-win quality (0-5): recommendations are implementable within a single sprint.
- Issue classification (0-5): indexation issues categorized with accurate root cause.
- Trend analysis (0-5): month-over-month comparison is accurate and contextualized.

## Examples (good/bad)

- Good: "Query 'GEO agency pricing' ranks position 8 with 2,400 impressions/month and 1.2% CTR. Title tag is generic. Recommended: rewrite to 'GEO Agency Pricing: Plans from $X/mo | LEMURIAOS'. Expected CTR improvement to 3-4%."
- Bad: "Impressions are up. Keep doing what you're doing." (no specific action, no data-driven recommendation)

## Variants

- Monthly pulse variant: performance summary + top 5 quick-wins only (30-minute analysis).
- Quarterly deep-dive variant: full analysis with indexation audit, CWV review, and 90-day trend report.
