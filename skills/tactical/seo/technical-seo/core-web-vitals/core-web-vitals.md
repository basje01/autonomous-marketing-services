---
id: core-web-vitals
title: Core Web Vitals Optimization
category: seo
goal: Diagnose Core Web Vitals failures using field and lab data, then produce a developer-ready optimization spec with prioritized fixes.
best_for: Technical SEOs and developers fixing CWV issues that impact rankings and user experience.
inputs:
  - GSC Core Web Vitals report
  - PageSpeed Insights or Lighthouse results for priority pages
  - Site technology stack (framework, hosting, CDN)
  - Priority page list (highest traffic pages first)
constraints:
  - Fixes must target the specific metric failing (LCP, CLS, or INP)
  - Prioritize field data over lab data when they conflict
  - Solutions must be compatible with the site's technology stack
outputs:
  - CWV diagnostic report by metric (LCP, CLS, INP)
  - Root cause analysis per failing page group
  - Developer-ready fix specifications with code-level guidance
  - Expected impact estimates per fix
quality_checks:
  - Each fix targets a specific CWV metric with a measurable improvement goal
  - Root causes are identified at the code or resource level, not just symptom-level
  - Fix specifications include implementation details a developer can execute
tags:
  - seo
  - analytics
version: 1.0.0
impact: 4
---

## Context

Use this when GSC flags CWV issues or when page speed is impacting organic performance. Core Web Vitals (LCP, CLS, INP) are a confirmed Google ranking signal. This skill produces fix specifications that developers can implement directly, bridging the gap between SEO diagnosis and engineering execution.

## Procedure

1. Pull CWV field data from GSC: identify page groups with Poor or Needs Improvement status.
2. Run Lighthouse or PageSpeed Insights on representative pages from each failing group.
3. Diagnose LCP issues: identify the largest contentful paint element, check server response time (TTFB), resource load chain, and render-blocking resources.
4. Diagnose CLS issues: identify layout shift sources (images without dimensions, dynamic content injection, font loading).
5. Diagnose INP issues: identify slow event handlers, long tasks, and main thread blocking.
6. Write fix specifications with code-level guidance for each issue.
7. Prioritize fixes by: traffic impact x severity x implementation effort.

## Output Format

```md
# Core Web Vitals Report: [Domain]

## Summary
| Metric | Status | Threshold | Current (p75) | Pages Affected |
|--------|--------|-----------|---------------|---------------|
| LCP | Poor/NI/Good | 2.5s | | |
| CLS | Poor/NI/Good | 0.1 | | |
| INP | Poor/NI/Good | 200ms | | |

## LCP Issues
| Page Group | LCP Element | Current | Root Cause | Fix |
|-----------|------------|---------|-----------|-----|
| | [element] | [Xs] | [TTFB/resource blocking/image size] | [Specific fix] |

## CLS Issues
| Page Group | Shift Source | CLS Value | Root Cause | Fix |
|-----------|------------|-----------|-----------|-----|
| | [element] | | [Missing dimensions/dynamic inject/font] | |

## INP Issues
| Page Group | Slow Handler | INP Value | Root Cause | Fix |
|-----------|-------------|-----------|-----------|-----|
| | [event] | [Xms] | [Long task/main thread blocking] | |

## Priority Fix List
| # | Fix | Metric | Pages | Expected Improvement | Effort |
|---|-----|--------|-------|---------------------|--------|
| 1 | | | | | L/M/H |

## Implementation Notes
[Code-level guidance for top fixes]
```

## QA Rubric (scored)

- Diagnostic accuracy (0-5): root causes identified at resource or code level, not just metric-level symptoms.
- Fix specificity (0-5): developer can implement from the spec without additional research.
- Prioritization logic (0-5): fixes ordered by traffic impact and severity.
- Measurement plan (0-5): expected improvements are quantified and verifiable post-fix.

## Examples (good/bad)

- Good: "LCP on /blog/* pages is 4.2s (p75). Root cause: hero image is 2.4MB uncompressed PNG served without srcset. Fix: convert to WebP, add width/height attributes, implement responsive srcset. Expected LCP improvement: 4.2s → ~2.0s."
- Bad: "Pages are slow. Optimize images and reduce JavaScript." (no specific metric, no root cause, no measurable target)

## Variants

- Quick diagnostic variant: CWV summary + top 3 fixes for the worst-performing metric only.
- Full optimization variant: all three metrics analyzed with code-level fix specs and implementation timeline.
