---
id: geo-targeting
title: International Geo-Targeting Strategy
category: seo
goal: Configure international SEO targeting via URL structure, hreflang, and search engine settings to serve the right regional content to the right audience.
best_for: Businesses expanding internationally that need to decide on URL structure and configure regional targeting across search engines.
inputs:
  - Target markets (countries and languages)
  - Current URL structure and domain setup
  - Content localization status per market
  - Business priority per market (revenue, growth, or testing)
constraints:
  - URL structure decision must account for long-term scalability
  - Each approach (ccTLD, subdirectory, subdomain) has trade-offs that must be documented
  - Recommendations must cover both Google and Bing targeting settings
outputs:
  - URL structure recommendation with trade-off analysis
  - Per-market targeting configuration spec
  - Hreflang integration plan
  - Search engine geo-targeting settings (GSC and Bing Webmaster)
quality_checks:
  - Trade-offs for each URL approach are explicitly documented
  - Every target market has a clear URL pattern and targeting config
  - Hreflang and geo-targeting settings are aligned
tags:
  - seo
version: 1.0.0
impact: 3
---

## Context

Use this when a business is entering new international markets or restructuring an existing multi-market site. The URL structure decision (ccTLD vs. subdirectory vs. subdomain) is one of the most consequential technical SEO choices for international sites, affecting domain authority distribution, hosting complexity, and search engine targeting signals.

## Procedure

1. Assess current state: existing domains, URL structure, content localization per market.
2. Evaluate URL structure options with trade-off analysis: ccTLD (.de, .fr), subdirectory (/de/, /fr/), or subdomain (de.example.com).
3. Recommend URL structure based on business size, budget, and market priority.
4. Define per-market configuration: URL pattern, language, region, content localization approach.
5. Plan hreflang integration: link to hreflang skill output for implementation details.
6. Configure search engine targeting: GSC international targeting for subdirectories/subdomains, Bing Webmaster geo-targeting settings.
7. Plan content localization approach per market: full translation, transcreation, or localized original content.

## Output Format

```md
# International Geo-Targeting: [Brand]

## URL Structure Analysis
| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| ccTLD (.de, .fr) | Strong geo signal, local trust | Separate domain authority, higher cost | Established brands with market-specific SEO |
| Subdirectory (/de/) | Consolidated authority, simpler management | Weaker geo signal | Most businesses, recommended default |
| Subdomain (de.example.com) | Separate hosting possible | Authority dilution, complex management | Technical requirements mandate separation |

## Recommendation
- Approach: [subdirectory/ccTLD/subdomain]
- Rationale: [specific reasons for this business]

## Per-Market Configuration
| Market | Language | URL Pattern | Localization Status | Priority |
|--------|---------|-----------|-------------------|----------|
| Germany | de | /de/ | Full translation | High |
| France | fr | /fr/ | Partial | Medium |
| US (default) | en-US | / | Original | High |

## Search Engine Configuration
### Google Search Console
| Property | International Targeting | Hreflang | Status |
|----------|----------------------|---------|--------|
| /de/ | Germany | de | [Configure] |
| /fr/ | France | fr | [Configure] |

### Bing Webmaster Tools
| Property | Country | Language | Status |
|----------|---------|---------|--------|
| /de/ | DE | German | [Configure] |

## Content Localization Plan
| Market | Approach | Pages to Localize | Priority Pages |
|--------|----------|-------------------|---------------|
| | Translation/Transcreation/Original | | |

## Next Steps
- Implement URL structure changes (see site-structure skill)
- Configure hreflang tags (see hreflang skill)
- Submit updated properties in GSC and Bing Webmaster
```

## QA Rubric (scored)

- Trade-off transparency (0-5): pros and cons documented for each URL approach.
- Market coverage (0-5): every target market has a clear configuration spec.
- Search engine alignment (0-5): GSC and Bing settings configured consistently.
- Localization realism (0-5): content approach is realistic given business resources.

## Examples (good/bad)

- Good: "Recommending subdirectory approach (/de/, /fr/) for this 50-page B2B SaaS site. Rationale: consolidated domain authority matters more than geo signal strength at this scale. ccTLD would fragment their existing DR 45 authority across 3 domains."
- Bad: "Buy a .de domain for Germany." (no trade-off analysis, no alternative consideration, no configuration plan)

## Variants

- Strategy variant: URL structure decision and market prioritization only (pre-implementation planning).
- Implementation variant: full configuration spec with GSC/Bing setup, hreflang integration, and content localization plan.
