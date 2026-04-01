---
id: google-analytics
title: GA4 SEO Configuration Audit
category: seo
goal: Audit a GA4 implementation to ensure organic traffic attribution, conversion tracking, and AI referral traffic measurement are accurate and actionable.
best_for: SEO teams setting up or auditing GA4 to ensure organic and AI-referral traffic is properly tracked and reported.
inputs:
  - GA4 property access or configuration export
  - Site's conversion goals and events
  - Current channel grouping configuration
  - Known traffic sources to validate (organic, AI referrals, direct)
constraints:
  - Configuration changes must not break existing tracking or reporting
  - AI referral sources must be tracked separately from organic search
  - Privacy and consent requirements must be respected
outputs:
  - GA4 configuration audit checklist
  - Custom channel group spec for AI referral traffic
  - Conversion event mapping for SEO-relevant actions
  - Dashboard template for organic and AI traffic reporting
quality_checks:
  - Organic traffic attribution is verified against GSC data
  - AI referral sources are identified and grouped correctly
  - Conversion events match actual business goals
tags:
  - seo
  - analytics
version: 1.0.0
impact: 3
---

## Context

Use this when onboarding a new SEO client or when analytics data doesn't match GSC observations. GA4 is the primary tool for understanding what organic and AI-referred visitors do after landing. Proper configuration ensures SEO work is measurable and attributable, and that AI referral traffic from ChatGPT, Perplexity, and Gemini is tracked separately.

## Procedure

1. Verify GA4 tag installation: correct property, all pages tagged, no duplicate tags.
2. Audit channel groupings: confirm "Organic Search" captures all search engine traffic correctly.
3. Configure AI referral tracking: add ChatGPT (chat.openai.com), Perplexity (perplexity.ai), Gemini (gemini.google.com), and Claude (claude.ai) as recognized referral sources in a custom channel group.
4. Map conversion events: identify which GA4 events correspond to SEO-relevant business goals (form submissions, calls, purchases, sign-ups).
5. Verify landing page reporting: ensure URL parameters are handled correctly and not creating false page variations.
6. Check consent mode and data collection settings for privacy compliance.
7. Build or recommend a reporting dashboard for organic + AI traffic with conversion attribution.

## Output Format

```md
# GA4 SEO Audit: [Property Name]

## Installation Check
| Check | Status | Issue | Fix |
|-------|--------|-------|-----|
| Tag on all pages | OK/Issue | | |
| No duplicate tags | OK/Issue | | |
| Correct property ID | OK/Issue | | |
| Consent mode configured | OK/Issue | | |

## Channel Grouping
| Channel | Current Config | Issue | Recommended |
|---------|---------------|-------|-------------|
| Organic Search | | | |
| AI Referral (custom) | Not configured | Missing | Add custom group |
| Paid Search | | | |

## AI Referral Source Configuration
| Source Domain | Platform | Recommended Channel | Status |
|-------------|----------|-------------------|--------|
| chat.openai.com | ChatGPT | AI Referral | [Add/OK] |
| perplexity.ai | Perplexity | AI Referral | [Add/OK] |
| gemini.google.com | Gemini | AI Referral | [Add/OK] |
| claude.ai | Claude | AI Referral | [Add/OK] |

## Conversion Events
| Business Goal | GA4 Event | Configured? | Fix |
|-------------|----------|------------|-----|
| Form submission | | Yes/No | |
| Phone call click | | Yes/No | |
| Purchase | | Yes/No | |

## Dashboard Template
- Organic sessions (MoM trend)
- AI referral sessions by source (MoM trend)
- Top landing pages by organic traffic
- Conversion rate by channel (Organic vs AI Referral vs Direct)
- Top queries driving conversions (requires GSC linking)
```

## QA Rubric (scored)

- Installation accuracy (0-5): tag verified on all pages, no duplicates, correct property.
- AI tracking coverage (0-5): all major AI referral sources configured and grouped.
- Conversion mapping (0-5): events match real business goals and are firing correctly.
- Reporting utility (0-5): dashboard template provides actionable organic and AI traffic insights.

## Examples (good/bad)

- Good: "AI referral traffic from chat.openai.com currently grouped under 'Referral' along with 200 other sources. Fix: create custom 'AI Referral' channel group capturing ChatGPT, Perplexity, Gemini, and Claude domains. This separates AI-driven visits for GEO reporting."
- Bad: "Set up Google Analytics on your site." (no audit, no specific configuration, no AI tracking)

## Variants

- Setup variant: fresh GA4 configuration for a new site with SEO and GEO tracking from day one.
- Audit variant: review existing GA4 implementation, fix issues, and add AI referral tracking.
