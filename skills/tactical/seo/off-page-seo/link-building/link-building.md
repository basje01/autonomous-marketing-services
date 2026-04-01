---
id: link-building
title: Link Building Pipeline
category: seo
goal: Build a link acquisition pipeline targeting topically relevant, high-authority domains to strengthen E-E-A-T signals and referral authority.
best_for: SEO teams executing an off-page strategy that prioritizes quality and topical relevance over volume.
inputs:
  - Target pages needing link equity
  - Competitor backlink profiles (top linking domains)
  - Content assets available for outreach (guides, data, tools)
  - Link building budget and resources
constraints:
  - No paid links or link schemes that violate Google guidelines
  - Prioritize topical relevance over raw domain authority
  - Every prospect must be manually vetted for quality
outputs:
  - Link prospect list with relevance and authority scores
  - Outreach sequence templates per prospect tier
  - Link velocity targets and timeline
  - Tracking spreadsheet for pipeline management
quality_checks:
  - All prospects are topically relevant to the target content
  - Outreach templates are personalized per prospect type
  - Pipeline includes realistic velocity targets
tags:
  - seo
  - growth
version: 1.0.0
impact: 4
---

## Context

Use this skill when domain authority or page authority is a bottleneck for ranking improvement, or when competitor analysis reveals a link gap. This skill produces a systematic pipeline for acquiring editorial links through legitimate outreach, not paid placements or link schemes.

## Procedure

1. Identify target pages: which pages need link equity to improve rankings (typically pages ranking position 5-20 for competitive keywords).
2. Analyze competitor backlinks: find domains linking to competitor content in the same topic but not linking to the brand.
3. Build prospect list: filter by topical relevance, domain quality, and editorial standards.
4. Categorize prospects: resource pages, guest post opportunities, broken link targets, expert roundups, and partnership opportunities.
5. Write outreach sequences: initial pitch, follow-up, and value-add message for each prospect category.
6. Set link velocity targets: realistic monthly acquisition goals based on resources and prospect pool size.
7. Create tracking spreadsheet with pipeline stages: prospected, contacted, responded, negotiating, acquired, live.

## Output Format

```md
# Link Building Pipeline: [Domain]

## Target Pages
| URL | Primary Keyword | Current Position | Current Referring Domains | Link Gap vs. Competitor |
|-----|----------------|-----------------|-------------------------|------------------------|
| | | | | [competitor has X more] |

## Prospect List
| # | Prospect Domain | Type | Relevance | Authority | Contact | Status |
|---|---------------|------|-----------|-----------|---------|--------|
| 1 | | Resource page/Guest post/Broken link | H/M | H/M | | Prospected |

## Outreach Templates

### Resource Page Outreach
Subject: [Personalized]

Hi [Name],

[Reference their resource page and specific section]

[Pitch: why the target content adds value to their page]

[Simple CTA]

### Follow-Up (Day 5)
[Shorter, add new value angle]

## Pipeline Targets
| Month | Prospects Contacted | Expected Responses | Links Acquired Target |
|-------|--------------------|--------------------|---------------------|
| 1 | | | |
| 2 | | | |

## Tracking
| Prospect | Date Contacted | Response | Status | Link Live? | URL |
|----------|---------------|----------|--------|-----------|-----|
| | | | | | |
```

## QA Rubric (scored)

- Prospect relevance (0-5): all prospects are topically related to target content.
- Outreach quality (0-5): templates are personalized and offer genuine value.
- Pipeline realism (0-5): velocity targets are achievable with available resources.
- Tracking completeness (0-5): every stage of the pipeline is tracked with dates and status.

## Examples (good/bad)

- Good: "Prospect: searchengineland.com resource page on 'AI in SEO'. Our GEO guide fills a gap in their resource list (they link to 5 tools but no GEO audit frameworks). Personalized outreach referencing their recent article on AI search."
- Bad: "Email 1000 sites and ask for links." (no relevance filter, no personalization, spam approach)

## Variants

- Competitor gap variant: focus exclusively on acquiring links from domains that link to competitors but not to the brand.
- Content-led variant: create a linkable asset first (data study, tool, guide), then build outreach around that asset.
