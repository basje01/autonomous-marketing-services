---
id: google-business-profile
title: Google Business Profile Optimization
category: seo
goal: Optimize and maintain a Google Business Profile to maximize local pack visibility, AI local recommendations, and review-driven authority.
best_for: Local businesses and agencies managing GBP listings for lead generation and local search visibility.
inputs:
  - Business name, address, phone (NAP)
  - Services offered with descriptions
  - Business hours and service areas
  - Existing reviews and photos
constraints:
  - All information must be accurate and consistent with website NAP
  - Posts and descriptions must comply with Google Business Profile policies
  - Review responses must be authentic and not incentivized
outputs:
  - GBP optimization checklist with current vs. recommended state
  - Business description and services list
  - FAQ set (20 questions and answers)
  - Weekly post calendar (12 weeks)
  - Review response templates
quality_checks:
  - NAP consistency verified across GBP, website, and citations
  - All GBP fields populated with specific, useful content
  - Post calendar includes variety (offers, tips, before/after, updates)
tags:
  - seo
  - b2c
  - b2b
  - content
version: 1.0.0
impact: 3
---

## Context

Use this for any local business client or when expanding a brand's local presence. Google Business Profile is the primary driver of local pack rankings and increasingly influences AI local recommendations (ChatGPT and Gemini reference GBP data). This skill produces a complete GBP optimization package from description through ongoing post calendar.

## Procedure

1. Audit current GBP listing: completeness of all fields, NAP accuracy, category selection, photos, reviews, Q&A.
2. Verify NAP consistency: compare GBP data with website header/footer, schema markup, and top citation sources.
3. Write optimized business description (750 characters): include primary services, service area, and differentiators.
4. Create services list with 1-2 sentence descriptions per service.
5. Write 20 FAQ questions and answers covering common customer queries, pricing, process, and service area.
6. Design 12-week post calendar: mix of offers, tips, before/after showcases, seasonal content, and service highlights.
7. Create review response templates for positive, neutral, and negative reviews with personalization placeholders.

## Output Format

```md
# GBP Optimization: [Business Name]

## Audit Checklist
| Field | Current | Status | Recommended |
|-------|---------|--------|-------------|
| Business name | | OK/Issue | |
| Primary category | | | |
| Secondary categories | | | |
| Address | | | |
| Phone | | | |
| Website URL | | | |
| Hours | | | |
| Description | | Empty/Partial/Full | |
| Services | | Listed/Missing | |
| Photos | | Count: X | Min 10 recommended |
| Reviews | | Count: X, Avg: X.X | |
| Q&A | | Count: X | |

## NAP Consistency
| Source | Name | Address | Phone | Match? |
|--------|------|---------|-------|--------|
| GBP | | | | |
| Website | | | | |
| Schema | | | | |

## Business Description (750 chars max)
[Optimized description]

## Services List
| Service | Description (1-2 sentences) |
|---------|----------------------------|
| | |

## FAQ (20 Q&As)
| # | Question | Answer |
|---|----------|--------|
| 1 | | |

## Post Calendar (12 Weeks)
| Week | Post Type | Headline | Body Summary | CTA | Photo Idea |
|------|----------|----------|-------------|-----|-----------|
| 1 | Offer | | | | |
| 2 | Tip | | | | |
| 3 | Before/After | | | | |

## Review Response Templates
### Positive Review
"Thank you [Name]! [Specific reference to their experience]. [Mention of service/product]. We appreciate your business and [forward-looking statement]."

### Neutral Review
"Thank you [Name] for your feedback. [Acknowledge specific point]. [What we're doing about it]. [Invitation to reach out]."

### Negative Review
"[Name], thank you for letting us know. [Acknowledge issue without being defensive]. [Specific action taken or offered]. [Direct contact for resolution]."
```

## QA Rubric (scored)

- Completeness (0-5): all GBP fields populated with specific, useful content.
- NAP consistency (0-5): verified across GBP, website, and schema markup.
- Post calendar variety (0-5): mix of content types with specific headlines and photo ideas.
- Review template quality (0-5): templates are professional, personalized, and policy-compliant.

## Examples (good/bad)

- Good: "Description: 'LEMURIAOS is an AI visibility agency specializing in Generative Engine Optimization (GEO). We help B2B SaaS companies get cited in ChatGPT, Perplexity, and Gemini through technical SEO, structured data, and AI-first content strategy. Serving clients worldwide from Amsterdam.'"
- Bad: "Best SEO company. We do SEO, marketing, and digital stuff. Call us today!" (generic, keyword-stuffed, no differentiator)

## Variants

- Setup variant: complete GBP optimization for a new or unclaimed listing.
- Maintenance variant: monthly post calendar refresh, review response queue, and quarterly audit.
