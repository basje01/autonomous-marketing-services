---
id: site-scanner
title: Site Scanner
category: seo
goal: Crawl a URL and produce a weighted health score across six dimensions with a prioritized fix list and downstream skill routing.
best_for: Entry-point website audit that triages findings into specialized skills for deep analysis.
inputs:
  - Target URL (domain root, section prefix, or single page)
  - Scan scope and depth (single-page depth 1, or multi-page depth 2-5)
  - Company or industry context
  - Optional competitor URLs for comparative baseline
constraints:
  - Check robots.txt before any crawling and respect disallow rules per page
  - Label CWV data source as lab or field
  - Every finding must cite the specific URL affected
  - Flag and route to downstream skills rather than deep-diving per dimension
  - Multi-page crawl rate-limited to 500ms between requests
outputs:
  - Weighted health score (0-100) with per-dimension breakdown
  - Priority fix list (P0/P1/P2) ordered by impact vs effort
  - Cross-page analysis (orphan pages, thin content, duplicate titles, schema coverage, broken pages)
  - Downstream handoff blocks for specialized skills
quality_checks:
  - Health score methodology is transparent and reproducible
  - Every finding includes a confidence level (HIGH/MEDIUM/LOW)
  - Crawl limitations are disclosed (JS content, auth-gated pages, skipped URLs)
  - Cross-page checks only appear when depth > 1
  - Handoff blocks include raw data so downstream skills can verify
tags:
  - seo
  - analytics
  - growth
version: 2.0.0
impact: 5
---

## Context

Use this as the first step in any website engagement. The site scanner produces a broad triage across technical health, structured data, content quality, GEO readiness, Core Web Vitals, and security. At depth 1, it scans a single page (homepage). At depth 2-5, it crawls the site following internal links, adding cross-page analysis: orphan pages, thin content detection, duplicate title detection, schema coverage percentage, image alt text audit, and broken page detection. It routes findings to specialized skills (crawlability, structured-data, core-web-vitals, site-structure, generative-engine-optimization) for detailed remediation.

## Procedure

1. Fetch robots.txt and sitemap.xml; record crawl permissions and URL inventory.
2. Crawl pages within the requested scope and depth (depth 1 = homepage only, 2-5 = multi-page BFS following internal links, max 50-200 pages).
3. Per page: collect HTTP status, meta tags, canonical, headings, JSON-LD blocks (with @type extraction), internal/external links, word count, OG tags, image alt text, viewport, and lang attribute.
4. If multi-page (depth > 1), run cross-page analysis:
   - Build internal link graph and detect orphan pages (zero inbound links).
   - Flag thin pages (fewer than 300 words).
   - Detect duplicate title tags across pages.
   - Calculate schema coverage (% of pages with JSON-LD).
   - Count images missing alt attributes across all pages.
   - Report broken pages (4xx/5xx or unreachable).
5. Score using weighted rubric across 15 single-page checks + 6 cross-page checks (when applicable).
6. Compute weighted health score (0-100) and assign score band (A/B/C/D/F).
7. Generate priority fix list: P0 (blocking), P1 (high impact), P2 (improvement).
8. Assemble a handoff block for each downstream skill that has relevant findings.

## Output Format

```md
# Site Scan: [Domain]

## Executive Summary
Scanned: [date] | Scope: [single-page/multi-page] | Depth: [N] | Pages: [crawled/discovered]
Health Score: [X/100] (Grade [A-F])

Top 3 findings:
1. [Finding] (P0/P1/P2) - Confidence: [HIGH/MEDIUM/LOW]
2. [Finding] (P0/P1/P2) - Confidence: [HIGH/MEDIUM/LOW]
3. [Finding] (P0/P1/P2) - Confidence: [HIGH/MEDIUM/LOW]

## Single-Page Checks (15 checks)
| Check | Status | Detail |
|-------|--------|--------|
| Homepage reachable | pass/warn/fail | HTTP [status] |
| HTTPS | pass/warn/fail | |
| Response time | pass/warn/fail | [N] ms |
| ... | | |

## Cross-Page Analysis (multi-page only)
| Check | Status | Detail |
|-------|--------|--------|
| Orphan pages | pass/warn/fail | [N] pages with zero inbound links |
| Thin content | pass/warn/fail | [N]/[total] pages below 300 words |
| Duplicate titles | pass/warn/fail | [N] pages share titles |
| Schema coverage | pass/warn/fail | [X]% of pages have JSON-LD |
| Image alt text | pass/warn/fail | [N] images missing alt text |
| Broken pages | pass/warn/fail | [N] pages returned errors |

## Priority Fix List
| # | Finding | Priority | Confidence | Routes To |
|---|---------|----------|------------|-----------|
| 1 | | P0/P1/P2 | HIGH/MED/LOW | [skill-slug] |

## Crawl Metadata
Pages discovered: [N] | Crawled: [N] | Skipped (robots.txt): [N] | Errors: [N]

## Downstream Handoffs
### Handoff to [skill-slug]
- Key findings: [1-3 bullet points with data]
- Recommended action: [what the downstream skill should produce]
- Data confidence: [HIGH/MEDIUM/LOW]
```

## QA Rubric (scored)

- Score transparency (0-5): health score weights and per-dimension math are reproducible.
- Finding specificity (0-5): every finding cites a URL and confidence level.
- Routing accuracy (0-5): handoff blocks contain enough data for downstream skills to begin without re-crawling.
- Limitation disclosure (0-5): crawl constraints are stated upfront, not buried or omitted.

## Examples (good/bad)

- Good: "Schema coverage 24% - 38 of 50 pages missing JSON-LD. Orphan pages: 12 product pages with zero inbound internal links. P0. Confidence: HIGH. Routes to: structured-data (URL list + page types), seo-expert (internal linking plan)."
- Bad: "Site has some SEO issues. Score: 60." (no page counts, no cross-page data, no URLs, no routing, no confidence level)

## Variants

- Single-page triage (depth 1): homepage only, 15 checks, no cross-page analysis. Fast lead-gen scan.
- Multi-page audit (depth 2-5): BFS crawl following internal links, 15 + 6 checks, full cross-page analysis.
- Re-scan delta: compare against a previous scan and report before/after per check with regression flags.
