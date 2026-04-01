---
id: reputation-monitoring
title: Reputation Monitoring
category: seo
goal: Establish ongoing multi-platform reputation monitoring with alert thresholds, sentiment tracking, and escalation procedures to protect brand health.
best_for: Local businesses that need structured, ongoing monitoring of reviews and brand mentions across multiple platforms.
inputs:
  - Business name and all review platform profiles
  - Baseline reputation data (current ratings, review counts, sentiment)
  - Monitoring frequency requirements (daily, weekly, monthly)
  - Escalation contacts and procedures
constraints:
  - Monitoring must cover all platforms relevant to the business type
  - Alert thresholds must be data-driven and proportional to business context
  - Sentiment classification methodology must be disclosed and consistent
  - Customer privacy must be protected in all reports and alerts
outputs:
  - Multi-platform monitoring dashboard specification
  - Alert threshold configuration with escalation rules
  - Sentiment tracking template with trend analysis
  - Monthly reputation report template
  - Escalation flowchart with severity levels and response SLAs
quality_checks:
  - All relevant platforms are included in the monitoring setup
  - Alert thresholds are specific and calibrated to business volume
  - Escalation procedures have clear owners, timelines, and actions
  - Reporting template captures enough data for trend analysis
tags:
  - seo
  - b2c
  - analytics
version: 1.0.0
impact: 4
---

## Context

Use this when a local business needs a systematic, ongoing approach to tracking its online reputation. One-time audits miss emerging trends and slow-developing crises. This skill establishes the monitoring infrastructure: which platforms to watch, how often, what triggers an alert, who responds, and how to track changes over time. It produces the framework that makes ongoing reputation management sustainable.

## Procedure

1. Inventory all review and mention platforms relevant to the business type and industry.
2. Establish baseline metrics per platform: current rating, total reviews, review velocity, sentiment distribution, response rate.
3. Define monitoring cadence per platform based on volume and impact (daily for high-volume, weekly for lower-volume).
4. Configure alert thresholds: rating drop triggers, negative review cluster detection, fake review pattern flags.
5. Design escalation flowchart with severity levels (1-4), response SLAs, assigned owners, and escalation paths.
6. Create monthly reputation report template with all tracking fields and trend visualizations.
7. Set up sentiment tracking methodology: classification approach, theme extraction categories, trend tracking format.
8. Document the full monitoring SOP so it can be handed off to a team member or automated.

## Output Format

```md
# Reputation Monitoring Setup: [Business Name]

## Platform Inventory
| Platform | Profile URL | Claimed? | Current Rating | Reviews | Velocity | Priority |
|----------|-----------|----------|---------------|---------|----------|----------|
| Google | [url] | Yes/No | [X] | [N] | [N/month] | High |
| Booking.com | [url] | Yes/No | [X] | [N] | [N/month] | High |
| TripAdvisor | [url] | Yes/No | [X] | [N] | [N/month] | Medium |

## Monitoring Cadence
| Platform | Check Frequency | Response SLA | Owner |
|----------|----------------|-------------|-------|
| Google | Daily | 24h (negative), 48h (positive) | [name] |
| Booking.com | Daily | 24h (all) | [name] |
| TripAdvisor | Weekly | 72h | [name] |

## Alert Thresholds
| Alert | Condition | Severity | Action | Owner |
|-------|-----------|----------|--------|-------|
| Rating drop | >0.2 point drop in 30 days | Level 2 | Investigate, report to manager | [name] |
| Negative cluster | 3+ negative reviews in 7 days | Level 2 | Root cause analysis, management alert | [name] |
| Crisis review | Safety/health complaint | Level 3 | Immediate response, ops notification | [name] |
| Fake review pattern | 3+ suspect reviews in 48h | Level 2 | Document, report to platform | [name] |

## Escalation Flowchart
### Level 1 - Monitor (single complaint, isolated)
- **Response SLA:** 48 hours
- **Action:** Respond using standard template, log for tracking
- **Owner:** Review responder

### Level 2 - Respond (pattern emerging, 3+ related complaints)
- **Response SLA:** 24 hours
- **Action:** Respond to all, investigate root cause, notify manager
- **Owner:** Manager + review responder

### Level 3 - Intervene (rating drop >0.3, or media attention)
- **Response SLA:** 4 hours
- **Action:** Activate response team, prepare public statement draft
- **Owner:** Director + communications

### Level 4 - Crisis (safety incident, viral coverage, legal risk)
- **Response SLA:** 1 hour
- **Action:** All hands, legal review, official public statement
- **Owner:** Executive team + legal + PR

## Sentiment Tracking Template
| Month | Platform | New Reviews | Positive % | Neutral % | Negative % | Top Theme (+) | Top Theme (-) | Rating Change |
|-------|----------|------------|-----------|----------|-----------|--------------|--------------|--------------|
| [month] | Google | [N] | [%] | [%] | [%] | [theme] | [theme] | [+/-X.X] |

## Monthly Report Template
1. **Reputation Health Score** (composite 0-100)
2. **Platform-by-Platform Summary** (rating, count, velocity, response rate)
3. **Sentiment Trend** (positive/neutral/negative % vs. previous month)
4. **Theme Analysis** (top themes from negative + neutral reviews)
5. **Alerts Triggered** (any Level 2+ events this month)
6. **Competitive Snapshot** (top 3 competitors ratings + review counts)
7. **Actions Taken** (responses sent, issues resolved, escalations handled)
8. **Next Month Focus** (priorities and improvement targets)

## Monitoring SOP
- **Tools:** [list of tools/platforms for monitoring]
- **Daily check process:** [step-by-step for daily reviewer]
- **Weekly roll-up process:** [how to compile weekly summary]
- **Monthly report process:** [how to generate monthly report]
- **Handoff documentation:** [how to train a new team member]
```

## QA Rubric (scored)

- Platform coverage (0-5): all relevant platforms for the business type are included with appropriate cadence.
- Alert precision (0-5): thresholds are specific, data-driven, and proportional to business context.
- Escalation clarity (0-5): severity levels have clear criteria, SLAs, owners, and actions.
- Sustainability (0-5): monitoring process is documented well enough to be handed off or automated.

## Examples (good/bad)

- Good: "Google Reviews: checked daily, response SLA 24h for negative, 48h for positive. Alert: if 3+ negative reviews mention 'cleanliness' within 7 days → Level 2 escalation → operations manager investigates, review responder acknowledges publicly. Monthly report tracks sentiment trend by theme. Owner: front-desk manager. Backup: marketing coordinator."
- Bad: "Monitor reviews. Respond quickly. Alert if bad reviews." (no platform specifics, no SLAs, no thresholds, no escalation levels, no owners, no tracking)

## Variants

- Setup variant: first-time monitoring infrastructure establishment for a business with no existing system.
- Audit variant: evaluate and improve an existing monitoring process (fill gaps, tighten SLAs, add platforms).
- Seasonal variant: adjust monitoring cadence and alert thresholds for peak vs. off-peak seasons.
- Crisis variant: rapid deployment of enhanced monitoring during an active reputation crisis.
