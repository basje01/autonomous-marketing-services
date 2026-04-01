---
id: crawlability
title: Crawlability Audit
category: seo
goal: Audit a site's crawl configuration including robots.txt, sitemap, crawl budget signals, and AI crawler permissions, then produce a fix plan.
best_for: Technical SEOs diagnosing indexation problems or optimizing a site for both search engine and AI crawler access.
inputs:
  - robots.txt file content
  - Sitemap XML URL
  - GSC coverage or indexing report
  - Server log data (if available)
  - AI visibility goals (which AI crawlers to allow)
constraints:
  - AI crawler access (GPTBot, ClaudeBot, PerplexityBot) treated as first-class requirement alongside Googlebot
  - Changes to robots.txt must not accidentally block critical resources
  - Sitemap recommendations must follow the Sitemaps protocol specification
outputs:
  - robots.txt audit with line-by-line assessment
  - Sitemap health report
  - AI crawler access configuration
  - Crawl budget optimization recommendations
quality_checks:
  - Every robots.txt rule assessed for correctness and intent
  - AI crawler permissions explicitly documented for each known bot
  - Sitemap validation includes URL count, freshness, and error rate
tags:
  - seo
version: 1.0.0
impact: 4
---

## Context

Use this skill as part of a technical SEO audit or when indexation issues appear in GSC. Crawlability is the foundation of all SEO: if crawlers cannot access and index content, no other optimization matters. With the rise of AI engines, crawler access now includes GPTBot, ClaudeBot, PerplexityBot, and Google-Extended alongside traditional Googlebot.

## Procedure

1. Audit robots.txt line by line: verify each Allow/Disallow rule is intentional and correct.
2. Check for common robots.txt mistakes: blocking CSS/JS, blocking entire directories accidentally, wildcard overreach.
3. Document AI crawler status: for each known AI crawler (GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended, Bingbot), confirm whether allowed, blocked, or not mentioned.
4. Validate sitemap: check URL count, last modified dates, HTTP status of listed URLs, presence of orphan URLs.
5. Cross-reference GSC indexing report: identify pages submitted but not indexed, and diagnose the crawl/index reason.
6. Assess crawl budget signals: page count vs. crawl rate, server response times, duplicate content that wastes crawl budget.
7. Produce fix plan with specific file changes and expected impact.

## Output Format

```md
# Crawlability Audit: [Domain]

## robots.txt Assessment
| Line | Rule | Assessment | Action |
|------|------|-----------|--------|
| 1 | User-agent: * | | |
| 2 | Disallow: /admin/ | Correct | None |
| 3 | Disallow: /blog/ | ERROR: blocks all blog content | Remove |

## AI Crawler Access
| Crawler | Status | Recommended | Action |
|---------|--------|-------------|--------|
| GPTBot | Blocked | Allow | Add Allow rule |
| ChatGPT-User | Not mentioned | Allow | Add User-agent + Allow |
| PerplexityBot | Allowed | Allow | None |
| ClaudeBot | Not mentioned | Allow | Add User-agent + Allow |
| Google-Extended | Blocked | Allow | Change to Allow |
| Bingbot | Allowed | Allow | None |

## Proposed robots.txt
```

```txt
User-agent: *
Disallow: /admin/
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

Sitemap: https://[domain]/sitemap.xml
```

```md
## Sitemap Health
| Metric | Value | Status |
|--------|-------|--------|
| Total URLs in sitemap | | |
| URLs returning 200 | | OK/Issue |
| URLs returning 404/301 | | Fix needed |
| Last modified freshness | | OK/Stale |
| Orphan URLs (in sitemap, no internal links) | | |

## Indexation Issues (from GSC)
| URL | GSC Status | Reason | Fix |
|-----|-----------|--------|-----|
| | Not indexed | [Crawled not indexed/Excluded by robots] | |

## Crawl Budget Recommendations
| Issue | Impact | Fix |
|-------|--------|-----|
| | High/Med/Low | |
```

## QA Rubric (scored)

- robots.txt accuracy (0-5): every rule assessed, mistakes identified, fix provided.
- AI crawler coverage (0-5): all major AI crawlers documented with clear allow/block status.
- Sitemap validation (0-5): URL count, freshness, and error rate checked.
- Fix plan specificity (0-5): exact file changes provided, not vague recommendations.

## Examples (good/bad)

- Good: "robots.txt line 7 'Disallow: /api/' blocks /api/products/ which is needed for structured data testing. Recommendation: change to 'Disallow: /api/internal/' to block only internal endpoints."
- Bad: "Fix your robots.txt." (no specific issue, no line reference, no proposed change)

## Variants

- Quick check variant: robots.txt + AI crawler access audit only (15-minute turnaround).
- Full audit variant: robots.txt + sitemap + GSC indexation + crawl budget + server log analysis.
