---
id: website-discovery-brief
title: Website Discovery Brief
category: positioning
goal: Extract brand context, audience intent, competitive positioning, and visual preferences into a structured brief that drives every downstream design and copy decision.
best_for: Kicking off a new website build or major redesign where requirements are scattered across stakeholders.
inputs:
  - Stakeholder interview notes or intake form responses
  - Existing brand assets and guidelines
  - Competitor URLs and reference sites the client admires
  - Business goals and primary conversion actions
constraints:
  - Brief must be completable from a single 30-minute intake conversation
  - All assumptions must be flagged for client confirmation
  - Avoid prescribing visual solutions - capture intent, not implementation
outputs:
  - Structured discovery brief document
  - Prioritized page list with purpose statements
  - Success criteria and measurable KPIs
quality_checks:
  - Every page has a stated user job-to-be-done
  - Brand voice is described with specific adjectives, not vague terms
  - Competitive gaps are identified, not just competitor lists
  - KPIs are numeric and time-bound
tags:
  - research
  - b2b
  - b2c
version: 1.0.0
impact: 5
---

## Context

Every failed website traces back to a weak brief. This skill captures the minimum viable context needed to make confident design and copy decisions without the back-and-forth that kills project timelines. Run this before any visual or copy work begins.

## Procedure

1. Collect raw inputs: stakeholder answers, existing assets, competitor URLs, and analytics snapshots (bounce rate, top pages, conversion rate).
2. Define the primary audience segment using the ICP-JTBD format: who they are, what triggers their visit, what outcome they need.
3. Audit 3-5 competitor sites for positioning gaps - what they claim vs. what they fail to prove.
4. Map the site goal hierarchy: primary conversion (e.g., demo request), secondary (email capture), tertiary (content engagement).
5. Extract brand voice descriptors by asking: "If the brand were a person at a dinner party, how would they speak?" Capture 3-5 adjectives with counter-examples.
6. List every required page with a one-sentence purpose statement and the user job it serves.
7. Define 3 measurable success criteria with baselines and 90-day targets.

## Output Format

```md
# Website Discovery Brief

## Brand Snapshot
- Company: [name]
- One-line positioning: [what you do + for whom + why it matters]
- Voice descriptors: [adjective 1], [adjective 2], [adjective 3]
- Voice anti-descriptors: [what the brand is NOT]
- Existing assets: [logo, colors, fonts, imagery - or "none"]

## Audience
- Primary segment: [who]
- Trigger event: [what brings them to the site]
- Desired outcome: [what success looks like for the visitor]
- Objections: [top 3 reasons they might leave without converting]

## Competitive Landscape
| Competitor | Positioning Claim | Proof Gap | Our Opportunity |
|------------|------------------|-----------|-----------------|
| [url]      | [claim]          | [gap]     | [opportunity]   |

## Site Map
| Page | Purpose | User Job | Priority |
|------|---------|----------|----------|
| /    | ...     | ...      | P0       |

## Goal Hierarchy
1. Primary conversion: [action] - target: [number] per [period]
2. Secondary: [action] - target: [number]
3. Tertiary: [action] - target: [number]

## Success Criteria
| Metric | Baseline | 90-Day Target |
|--------|----------|---------------|
| ...    | ...      | ...           |

## Open Questions
- [ ] [assumption that needs client confirmation]
```

## QA Rubric (scored)

- Audience specificity (0-5): segment is targetable, not "everyone."
- Competitive insight (0-5): gaps identified with evidence, not just URLs listed.
- Goal measurability (0-5): every KPI has a number and timeframe.
- Completeness (0-5): no section left blank or filled with placeholders.
- Actionability (0-5): a designer could start work immediately from this brief.

## Examples (good/bad)

- Good: "Series B dev-tools company targeting engineering managers who evaluate during quarterly planning cycles. Voice: precise, calm, peer-level. Anti-voice: salesy, hyperbolic. Primary conversion: book a technical demo - baseline 12/mo, target 40/mo."
- Bad: "Tech company that wants a modern website. Target: developers. Goal: more leads."

## Variants

- Rapid mode: 15-minute intake using a pre-filled template with checkbox options for voice, audience, and goals.
- Enterprise mode: multi-stakeholder synthesis with weighted scoring for conflicting priorities and a RACI chart for approvals.
