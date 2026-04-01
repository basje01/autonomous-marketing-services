---
id: icp-jtbd
title: ICP + JTBD Synthesis
category: positioning
goal: Identify the highest-value ideal customer profile and primary job-to-be-done for messaging and growth prioritization.
best_for: Early-stage teams aligning product, marketing, and sales around one defensible customer focus.
inputs:
  - Existing customer list and revenue breakdown
  - Interview notes or call transcripts
  - Product usage patterns
constraints:
  - Avoid assumptions not grounded in evidence
  - Prioritize segments with measurable commercial potential
outputs:
  - ICP profile with disqualifiers
  - JTBD statement and success criteria
quality_checks:
  - Segment is narrow enough to target
  - JTBD is framed as progress, not product features
  - Includes explicit anti-ICP disqualifiers
tags:
  - b2b
  - research
  - product-marketing
version: 1.0.0
impact: 5
---

## Context

Use this when teams have broad positioning and low conversion efficiency because messaging is trying to speak to everyone. The cost of a vague ICP isn't just wasted ad spend - it's diluted product roadmaps, unfocused sales conversations, and content that ranks but doesn't convert. Narrowing the ICP feels risky ("we'll lose customers") but consistently improves conversion rates, sales velocity, and retention. This skill produces an evidence-backed ICP profile and JTBD statement that feeds into messaging, positioning, content strategy, and product prioritization.

## Procedure

1. Cluster customers by revenue quality, retention, and activation speed.
2. Identify repeating intent patterns from interviews and support logs.
3. Draft 2-3 candidate ICPs and score each by TAM quality and win-rate likelihood.
4. Select one primary ICP and define anti-ICP exclusions.
5. Write the primary JTBD statement using the format: “When [situation], I want to [motivation], so I can [outcome].”
6. Validate with at least three customer artifacts.

## Output Format

```md
# ICP + JTBD Brief

## ICP Snapshot

- Segment Name:
- Company Traits:
- Buyer Role(s):
- Trigger Event:
- Budget Signal:
- Anti-ICP Disqualifiers:

## JTBD

- Situation:
- Motivation:
- Outcome:
- Functional Success Metrics:
- Emotional Success Metrics:

## Implications

- Messaging Priority:
- Offer Priority:
- Channel Priority:
```

## QA Rubric (scored)

- Evidence depth (0-5): claims traceable to real artifacts.
- Segment clarity (0-5): actionable and non-generic ICP definition.
- JTBD quality (0-5): outcome-oriented and testable.
- Strategic utility (0-5): clear implication for messaging and channels.

## Examples (good/bad)

- Good: “Series A SaaS founders with 3-10 GTM hires and stalled demo-to-close conversion.”
- Bad: “Any startup that wants growth.”

## Anti-Patterns

| Anti-Pattern | Why It Fails | Correct Approach |
|---|---|---|
| Defining ICP by demographics alone | "Series A SaaS companies with 50-200 employees" describes a firmographic segment, not a customer with a job to be done - two matching companies can have completely different needs | Layer behavioral and intent signals on top of demographics: what triggered them to look for a solution? What does their current workflow look like? What outcome are they hiring your product to achieve? |
| Skipping the anti-ICP | Without defining who you're NOT for, sales pursues every lead - bad-fit customers churn, drain support, and leave negative reviews | Define 2-3 anti-ICP profiles with explicit disqualification criteria. Share with sales as "do not pursue" guidance. This is as valuable as the ICP itself |
| JTBD statements that describe features | "I want a dashboard that shows real-time metrics" is a feature request, not a job - it doesn't explain the underlying motivation | Frame as situation → motivation → outcome: "When [situation], I want to [motivation], so I can [outcome]." The outcome is the job. The feature is just one possible solution |
| ICP based on assumptions, not evidence | "We think our best customers are..." without customer interview data, win/loss analysis, or cohort retention comparison | Ground every ICP attribute in evidence: customer interviews (minimum 5), cohort analysis, win/loss data. Assumptions must be tagged as hypotheses, not facts |

## Variants

- Fast mode (sprint planning): Single ICP hypothesis validated against 3 data points (best customer cohort retention, highest win-rate segment, fastest onboarding segment). Output: 1-page ICP card with JTBD statement. Time: 2-4 hours. Good enough for sprint-level prioritization, not for brand positioning.
- Deep mode (multi-segment): Score 3-5 candidate segments on TAM, win-rate, retention, CAC, expansion potential. Include competitive positioning per segment. Validate with 5-10 customer interviews. Output: full ICP playbook with anti-ICP, JTBD, messaging angles, and channel recommendations. Time: 1-2 weeks.
