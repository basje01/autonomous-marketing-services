---
id: title-tags
title: Title Tag Optimization
category: seo
goal: Write and optimize title tags for a batch of pages, balancing keyword inclusion, click-through appeal, and SERP character constraints.
best_for: SEO teams running CTR improvement campaigns or launching new pages that need optimized metadata.
inputs:
  - Page URLs with current title tags
  - Primary keyword per page
  - Search intent classification per page
  - GSC CTR data (if available)
constraints:
  - Title tags must stay within 50-60 characters (or 580px pixel width)
  - Primary keyword should appear in the first half of the title
  - Avoid clickbait or misleading titles that increase bounce rate
outputs:
  - Title tag matrix with current and proposed tags
  - Pixel length estimates for each proposed title
  - A/B test recommendations for high-traffic pages
quality_checks:
  - All proposed titles within character and pixel limits
  - Primary keyword appears naturally in each title
  - Titles match the search intent of the target query
tags:
  - seo
  - copywriting
  - conversion
version: 1.0.0
impact: 3
---

## Context

Use this skill when GSC data shows high impressions but low CTR, or when launching new pages. Title tags are the single most impactful on-page element for both rankings and click-through rate. This skill produces a batch of optimized titles ready for implementation.

## Procedure

1. Audit current title tags: check character length, keyword placement, and uniqueness across the site.
2. Review search intent for each page to ensure title matches what the searcher expects to find.
3. Analyze competitor title tag patterns for the same keywords (what format is winning?).
4. Write proposed title tags using proven patterns: [Primary Keyword]: [Benefit/Hook] | [Brand] or [Number] [Keyword] [Year] - [Qualifier].
5. Estimate pixel width for each title (approximate: average 5.5px per character at standard SERP font).
6. Flag high-traffic pages where A/B testing the title could provide CTR uplift data.
7. Produce implementation matrix with current, proposed, rationale, and pixel estimate.

## Output Format

```md
# Title Tag Optimization: [Domain]

## Title Tag Matrix
| URL | Current Title | Chars | Proposed Title | Chars | Pixels (est.) | Rationale |
|-----|-------------|-------|---------------|-------|--------------|-----------|
| | | | | | | [Why this change improves CTR/ranking] |

## Patterns Used
- Pattern A: [Primary Keyword]: [Benefit] | [Brand]
- Pattern B: [Number] [Keyword] [Qualifier] - [Brand]
- Pattern C: [Question format matching PAA queries]

## A/B Test Candidates
| URL | Current CTR | Impressions | Test Variant A | Test Variant B |
|-----|-----------|-------------|---------------|---------------|
| | | | | |

## Implementation Checklist
- [ ] All titles under 60 characters
- [ ] No duplicate titles across the site
- [ ] Primary keyword in first half of each title
- [ ] Brand name consistent (included or excluded per strategy)
- [ ] Meta descriptions updated to complement new titles
```

## QA Rubric (scored)

- Character compliance (0-5): all proposed titles within 50-60 character limit.
- Keyword placement (0-5): primary keyword appears naturally in the first half.
- CTR appeal (0-5): titles use compelling patterns without being clickbait.
- Intent alignment (0-5): title sets accurate expectations matching page content.

## Examples (good/bad)

- Good: "Current: 'Our Services | LEMURIAOS' (24 chars, generic). Proposed: 'GEO Agency: AI Visibility & Citation Optimization | LEMURIAOS' (57 chars, keyword-first with benefit)."
- Bad: "GEO GEO Agency Best GEO Services GEO Optimization" (keyword stuffing, unreadable, no benefit).

## Variants

- Batch optimization variant: optimize 20-50 title tags at once for a site-wide refresh.
- Single-page variant: deep analysis of one high-priority page with 3 title options and A/B test setup.
