---
id: generative-engine-optimization
title: Generative Engine Optimization Audit
category: seo
goal: Audit a brand's content and technical setup for AI citation readiness, then produce a prioritized GEO action plan with measurable citation improvement targets.
best_for: Agencies and brands seeking to appear in ChatGPT, Perplexity, and Gemini responses as a cited source.
inputs:
  - Target domain URL
  - List of 5-10 priority topics or queries to rank in AI responses
  - Current robots.txt and crawl configuration
  - Existing content inventory (URL list or sitemap)
constraints:
  - All recommendations must be based on confirmed AI crawler behavior, not speculation
  - Distinguish between GEO-specific actions and general SEO improvements
  - Avoid promising specific citation outcomes; cite probabilities and precedents
outputs:
  - GEO readiness score (0-100) with dimension breakdown
  - Prioritized action plan with effort and impact matrix
  - AI crawler configuration checklist
  - Content restructuring recommendations for citation probability
quality_checks:
  - Crawl configuration is verified, not assumed
  - Each recommendation maps to a specific AI citation mechanism
  - Action plan includes measurement method for each item
tags:
  - seo
  - content
  - analytics
  - growth
version: 1.0.0
impact: 5
---

## Context

Use this skill when onboarding a new GEO client or running a quarterly audit. It produces the baseline score and action plan that drives all downstream GEO work (structured data, crawlability, brand mentions, LLM visibility tracking).

## Procedure

1. Audit robots.txt for AI crawler permissions (GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended, Bingbot).
2. Evaluate content structure for AI extractability: presence of TL;DR sections, answer capsules, clear H-tag hierarchy, definition blocks, and FAQ sections.
3. Assess E-E-A-T signals: author bios with credentials, citations to primary sources, original data or research, and expertise claims backed by evidence.
4. Check structured data implementation: FAQPage, HowTo, Article, Organization, and LocalBusiness schema where applicable.
5. Check Bing indexation status (ChatGPT uses Bing for web search retrieval).
6. Review presence on third-party citation sources: Reddit, Quora, G2, LinkedIn, Wikipedia, and industry publications known to appear in LLM training data.
7. Score each dimension using weighted rubric and produce the GEO Readiness Score (0-100).
8. Output prioritized action plan sorted by citation-lift potential vs. implementation effort.

## Output Format

```md
# GEO Audit Report: [Domain]

## GEO Readiness Score: [X/100]

### Dimension Scores
| Dimension | Score | Weight | Weighted |
|-----------|-------|--------|----------|
| Crawler access | /20 | 20% | |
| Content structure | /20 | 20% | |
| E-E-A-T signals | /20 | 20% | |
| Structured data | /15 | 15% | |
| Bing presence | /15 | 15% | |
| Third-party mentions | /10 | 10% | |

## Crawler Configuration Status
- GPTBot: [allowed/blocked/missing]
- ChatGPT-User: [allowed/blocked/missing]
- PerplexityBot: [allowed/blocked/missing]
- ClaudeBot: [allowed/blocked/missing]
- Google-Extended: [allowed/blocked/missing]
- Bingbot: [allowed/blocked/missing]

## Priority Actions
| # | Action | Effort | Citation Lift | Measurement Method |
|---|--------|--------|---------------|-------------------|
| 1 | | L/M/H | L/M/H | |

## Content Restructuring Recommendations
[Per-URL or per-topic recommendations with specific structural changes]

## Next Steps
- Handoff to: structured-data (if schema gaps found)
- Handoff to: crawlability (if crawler access issues)
- Handoff to: brand-mentions (if third-party presence is weak)
- Handoff to: llm-visibility (to begin citation tracking)
```

## QA Rubric (scored)

- Crawler audit accuracy (0-5): verified against actual robots.txt, not inferred.
- Recommendation specificity (0-5): each action has owner, effort estimate, and measurement method.
- Citation mechanism mapping (0-5): every recommendation tied to a documented AI behavior.
- Prioritization logic (0-5): effort/impact ordering is defensible and non-arbitrary.

## Examples (good/bad)

- Good: "GPTBot is blocked in robots.txt. Recommendation: add Allow rule for GPTBot. Measurement: re-check robots.txt + monitor ChatGPT citation within 30 days."
- Bad: "Improve your content to be more AI-friendly." (vague, no specific mechanism or measurement)

## Variants

- Quick audit variant: crawler access + structured data only (2-hour turnaround for prospect qualification).
- Deep audit variant: full 8-step procedure with competitor benchmarking and quarterly tracking setup.
