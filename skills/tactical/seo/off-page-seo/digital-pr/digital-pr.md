---
id: digital-pr
title: Digital PR Campaign Brief
category: seo
goal: Design a digital PR campaign that earns editorial mentions and links on publications known to be cited by LLMs, building E-E-A-T signals and GEO citation probability.
best_for: SEO teams and PR professionals building off-page authority through earned media rather than paid placements.
inputs:
  - Brand positioning and unique angles
  - Target publications and journalists (industry-specific)
  - Data assets or original research available for the campaign
  - Competitor PR coverage analysis
constraints:
  - Story angles must be genuinely newsworthy or data-driven, not self-promotional
  - Target publications must be editorially independent (no pay-for-play)
  - Outreach must be personalized and relevant to each journalist's beat
outputs:
  - Campaign story angle with data hook
  - Target publication list with journalist contacts
  - Outreach email templates (personalized per tier)
  - Success metrics and tracking plan
quality_checks:
  - Story angle passes the "would a journalist care?" test
  - Publication list includes sources cited by LLMs
  - Outreach templates are personalized beyond mail-merge fields
tags:
  - seo
  - content
  - growth
version: 1.0.0
impact: 4
---

## Context

Use this skill when brand-mentions audit reveals weak editorial coverage compared to competitors, or when building authority for a new topic. Digital PR earns links and mentions from publications that LLMs are known to cite, making it a high-value GEO tactic beyond its traditional SEO link-building value.

## Procedure

1. Identify the brand's unique data, expertise, or perspective that creates a newsworthy angle.
2. Develop 2-3 story angles: data-driven study, expert commentary on industry trend, or original research with surprising findings.
3. Build target publication list: tier 1 (major industry publications), tier 2 (niche blogs and newsletters), tier 3 (podcast and community platforms).
4. Prioritize publications known to appear in LLM training data and citations (major editorial outlets, Wikipedia-cited sources).
5. Research specific journalists covering the relevant beat at each publication.
6. Write outreach templates: subject line, opening hook, story angle pitch, data highlights, and call to action.
7. Define success metrics: placements earned, links acquired, brand mentions, referral traffic, and downstream AI citation changes.

## Output Format

```md
# Digital PR Campaign: [Campaign Name]

## Story Angles
### Angle 1: [Title]
- Hook: [Why a journalist would care]
- Data point: [Specific number or finding]
- Expert quote: [Available spokesperson]
- Relevance: [Why now?]

### Angle 2: [Title]
- Hook: [Why a journalist would care]
- Data point: [Specific number or finding]

## Target Publications
| Tier | Publication | Beat | Journalist | Email | GEO Value | Notes |
|------|-----------|------|-----------|-------|----------|-------|
| 1 | | | | | High/Med | |
| 2 | | | | | | |

## Outreach Templates

### Tier 1 Template
Subject: [Personalized subject line]

Hi [Name],

[Opening hook referencing their recent coverage of X]

[Story angle in 2-3 sentences with key data point]

[What we can provide: data, expert interview, exclusive angle]

[Simple CTA]

### Tier 2 Template
[Adapted version for niche publications]

## Campaign Timeline
| Week | Activity | Target |
|------|----------|--------|
| 1 | Finalize data asset + story angles | |
| 2 | Tier 1 outreach | [X] pitches |
| 3 | Tier 2 outreach + follow-ups | [X] pitches |
| 4 | Results tracking + follow-up | |

## Success Metrics
| Metric | Target | Tracking Method |
|--------|--------|----------------|
| Placements earned | | Media monitoring |
| Links acquired | | Backlink tracker |
| Brand mentions | | brand-mentions skill |
| AI citation change | | llm-visibility skill |
```

## QA Rubric (scored)

- Story angle quality (0-5): genuinely newsworthy with a specific data hook.
- Publication targeting (0-5): list includes GEO-relevant publications, not just high-DA sites.
- Outreach personalization (0-5): templates show awareness of each journalist's beat and recent work.
- Measurement plan (0-5): success metrics are specific, trackable, and include GEO impact.

## Examples (good/bad)

- Good: "Angle: 'AI citation study reveals 73% of GEO agencies lack robots.txt configuration for GPTBot.' Targets Search Engine Journal (Tier 1, reporter covers AI search), Search Engine Roundtable (Tier 1, covers Google changes). Outreach references reporter's recent article on AI crawlers."
- Bad: "Send press releases to 500 publications about our new service." (no angle, no personalization, spray-and-pray)

## Variants

- Data-led variant: campaign built around original research or survey data (highest placement probability).
- Expert commentary variant: reactive PR leveraging brand expertise on trending industry topics (faster turnaround, lower barrier).
