---
id: review-management
title: Local Review Management
category: seo
goal: Monitor, respond to, and grow reviews across all relevant platforms to build local authority, improve ratings, and drive AI citation signals.
best_for: Local businesses managing their reputation across Google, Yelp, TripAdvisor, Booking.com, and industry-specific review platforms.
inputs:
  - Business name and all review platform profiles
  - Current review data (ratings, counts, recent reviews per platform)
  - Business type and industry for platform prioritization
  - Response tone and brand voice guidelines
constraints:
  - Review solicitation must comply with each platform's review policies
  - Never gate reviews (only asking satisfied customers)
  - Never offer incentives for reviews (discounts, free items, etc.)
  - Review responses must be unique and personalized per review
  - Negative review responses must not disclose private customer information
outputs:
  - Multi-platform review audit with ratings, counts, velocity, and sentiment
  - Review response templates by sentiment and platform
  - Review generation strategy with touchpoint workflow
  - Sentiment trend analysis with escalation triggers
  - Review schema optimization recommendations
quality_checks:
  - All platforms relevant to the business type are included in the audit
  - Response templates comply with platform policies and brand guidelines
  - Generation strategy includes specific touchpoints and timing
  - Escalation criteria are defined with clear thresholds
tags:
  - seo
  - b2c
  - conversion
version: 1.0.0
impact: 4
---

## Context

Use this when a local business needs a structured approach to review management across multiple platforms. Reviews drive local pack rankings (Google confirms review quantity and quality as a local ranking factor), influence purchase decisions, and feed AI recommendation engines. This skill produces a complete review management system: audit, response playbook, generation strategy, and monitoring cadence.

## Procedure

1. Inventory all review platforms relevant to the business type and industry.
2. Audit current review data per platform: total reviews, average rating, review velocity (reviews per month), most recent review date.
3. Analyze sentiment distribution: categorize recent reviews (last 6 months) as positive (4-5 stars), neutral (3 stars), or negative (1-2 stars).
4. Identify unanswered reviews across all platforms and calculate response rate.
5. Create personalized response templates by sentiment tier (positive, neutral, negative) and platform, maintaining brand voice.
6. Design review generation strategy: identify post-service touchpoints, create request workflow (email, SMS, in-person, QR code), and draft request copy.
7. Define escalation criteria: when does a negative review require management action vs. standard response?
8. Recommend review schema (AggregateRating JSON-LD) for the website to display review data in search results.
9. Set monitoring cadence and alert triggers.

## Output Format

```md
# Review Management Plan: [Business Name]

## Review Audit
| Platform | Rating | Count | Velocity (per month) | Last Review | Response Rate | Status |
|----------|--------|-------|---------------------|-------------|--------------|--------|
| Google | 4.2 | 87 | 5.2 | [date] | 40% | ⚠️ Low response rate |
| Booking.com | 8.1/10 | 134 | 8.0 | [date] | 90% | ✅ Healthy |
| TripAdvisor | 4.0 | 23 | 1.5 | [date] | 10% | ❌ Neglected |
| Zoover | 7.8/10 | 45 | 2.0 | [date] | 0% | ❌ No responses |

## Sentiment Analysis (last 6 months)
| Platform | Positive (4-5★) | Neutral (3★) | Negative (1-2★) | Trend |
|----------|-----------------|--------------|----------------|-------|
| Google | 72% | 18% | 10% | Stable |

## Common Themes
| Theme | Frequency | Sentiment | Example Quote |
|-------|-----------|-----------|---------------|
| [Theme] | [N mentions] | Positive/Negative | "[quote]" |

## Response Templates

### Positive Review Response (Google)
"[Name], dank je wel voor je mooie review! Fijn dat jullie genoten hebben van [specific reference]. We kijken uit naar jullie volgende bezoek aan Wetland. Tot dan!"

### Negative Review Response (Google)
"[Name], bedankt dat je de tijd neemt om je ervaring te delen. Het spijt ons dat [acknowledge specific issue]. [Specific action taken]. Neem gerust contact op via [email/phone] zodat we dit persoonlijk kunnen bespreken."

### Neutral Review Response (Booking.com)
"Dear [Name], thank you for staying with us. We're glad you enjoyed [positive point]. Regarding [concern], we have [action]. We hope to welcome you back."

## Review Generation Strategy
| Touchpoint | Timing | Channel | Copy | Platform Target |
|------------|--------|---------|------|----------------|
| Post-checkout | Same day | Email | [draft] | Google |
| Post-stay follow-up | Day 3 | Email | [draft] | TripAdvisor |
| On-site signage | During stay | QR code | [draft] | Google |

## Escalation Criteria
| Trigger | Action | Owner | Timeline |
|---------|--------|-------|----------|
| 1-star review mentioning safety | Immediate management review + response | Manager | 4 hours |
| 3+ negative reviews in 7 days | Investigate root cause, pause review requests | Owner | 24 hours |
| Rating drops below 4.0 | Activate recovery plan | Team | 48 hours |

## Schema Recommendation
Add AggregateRating JSON-LD to homepage with review data from primary platform.

## Monitoring Cadence
| Task | Frequency | Owner |
|------|-----------|-------|
| Check all platforms for new reviews | Daily | [assigned] |
| Respond to new reviews | Within 24-48 hours | [assigned] |
| Update sentiment analysis | Monthly | [assigned] |
| Full review audit refresh | Quarterly | [assigned] |
```

## QA Rubric (scored)

- Platform coverage (0-5): all relevant platforms for the business type are audited.
- Response quality (0-5): templates are personalized, policy-compliant, and maintain brand voice.
- Generation strategy (0-5): specific touchpoints with timing, channel, and copy provided.
- Escalation clarity (0-5): triggers are specific, actions are defined, owners are assigned.

## Examples (good/bad)

- Good: "Google: 87 reviews, 4.2 avg, 5.2/month velocity. Response rate: 40% (below target 80%). 3 negative reviews in the last month mention 'noisy neighbors' - escalation triggered. Recommended: respond to all 52 unanswered reviews within 2 weeks, implement post-checkout email with direct review link (template provided), add AggregateRating schema showing 4.2★ from 87 reviews."
- Bad: "Get more reviews. Respond to reviews. Your rating is 4.2." (no platform breakdown, no response templates, no generation strategy, no escalation criteria)

## Variants

- Audit-only variant: review data collection and sentiment analysis without response templates or generation strategy.
- Recovery variant: focused on addressing a rating decline - root cause analysis, accelerated response plan, and targeted review generation.
- Multi-language variant: response templates and generation materials in multiple languages for international businesses.
