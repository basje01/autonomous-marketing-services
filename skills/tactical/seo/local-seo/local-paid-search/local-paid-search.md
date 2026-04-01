---
id: local-paid-search
title: Local Paid Search
category: seo
goal: Design and optimize geo-targeted paid search campaigns (Google Ads, Local Services Ads) to complement organic local SEO and drive qualified local traffic.
best_for: Local businesses that want to accelerate local visibility through paid search while organic rankings are building.
inputs:
  - Business name, type, and service area
  - Monthly advertising budget
  - Target keywords and local queries
  - Landing page URLs for local campaigns
  - Competitor ad activity (if known)
  - Seasonal demand patterns
constraints:
  - Budget allocation must be justified by search volume and competition data
  - Landing pages must match ad intent (no generic homepage as landing)
  - Geo-targeting must reflect actual service area, not aspirational reach
  - Ad copy must comply with Google Ads policies
  - LSA eligibility requires Google verification (not all businesses qualify)
outputs:
  - Geo-targeted campaign structure with ad groups and keywords
  - Budget allocation plan by geography and season
  - Ad copy templates (RSAs) with local intent signals
  - Landing page recommendations for local ad traffic
  - LSA setup checklist (if eligible)
  - Organic vs. paid keyword strategy alignment
quality_checks:
  - Campaign structure separates branded, non-branded, and competitor keywords
  - Geo-targeting is precise (radius or location list, not entire country)
  - Budget allocation reflects seasonal demand patterns
  - Ad copy includes local signals (city name, service area, local USPs)
tags:
  - seo
  - b2c
  - conversion
  - growth
version: 1.0.0
impact: 3
---

## Context

Use this when a local business wants to accelerate local traffic through paid search while organic local SEO is still building. Local paid search bridges the gap: it provides immediate visibility in the local pack and search results while GBP optimization, citation building, and content development take effect. This skill designs geo-targeted campaigns that complement (not duplicate) organic efforts, with budget allocated to seasonal demand patterns and geographic priority zones.

## Procedure

1. Audit current paid search activity: existing campaigns, spend, keywords, geographic targeting, performance metrics.
2. Define geo-targeting zones: primary (core service area), secondary (growth area), and exclusions (outside service area). Align with service area mapping skill output.
3. Research local keyword opportunities: separate into branded, non-branded local intent, and competitor keywords. Estimate search volume and CPC per keyword cluster.
4. Design campaign structure: separate campaigns by geography and intent type, with ad groups for keyword themes.
5. Write ad copy (RSA format): include city/area names, local differentiators, seasonal hooks, and strong CTAs. Create 15 headlines and 4 descriptions per ad group minimum.
6. Recommend landing pages: each ad group should land on a page matching the ad's intent and geography. Flag missing landing pages for creation.
7. Allocate budget by geography and season: higher spend in high-season months, weighted toward primary service area.
8. Assess LSA eligibility: determine if Google Local Services Ads are available for this business type and region.
9. Plan organic-paid coordination: identify keywords where paid fills organic gaps, and keywords where organic is strong enough to reduce paid spend.

## Output Format

```md
# Local Paid Search Plan: [Business Name]

## Current State
| Metric | Value |
|--------|-------|
| Active campaigns | [N] or None |
| Monthly spend | [amount] |
| Top performing keywords | [list] |
| Geo-targeting | [current setup] |

## Geo-Targeting Configuration
| Zone | Type | Radius/Locations | Budget Weight |
|------|------|-----------------|--------------|
| Primary | Target | [cities/radius] | 60% |
| Secondary | Target | [cities/radius] | 30% |
| Tertiary | Observation | [broader area] | 10% |
| Excluded | Negative | [outside service area] | - |

## Keyword Strategy
### Non-Branded Local (primary spend)
| Keyword Cluster | Example Keywords | Volume (est.) | CPC (est.) | Competition | Ad Group |
|----------------|-----------------|--------------|-----------|-------------|---------|
| [Theme] | [keyword 1], [keyword 2] | [N/month] | [€X.XX] | High/Med/Low | [group name] |

### Branded (protect brand)
| Keyword | Volume | CPC | Notes |
|---------|--------|-----|-------|
| [brand name] | [N] | [€X] | Defensive - competitors may bid |

### Competitor (selective)
| Keyword | Volume | CPC | Risk/Reward |
|---------|--------|-----|-------------|
| [competitor name] | [N] | [€X] | [assessment] |

## Campaign Structure
| Campaign | Geo-Target | Ad Groups | Daily Budget | Strategy |
|----------|-----------|----------|-------------|---------|
| [Name] - Local Non-Brand | Primary zone | [N] groups | €[X]/day | Maximize conversions |
| [Name] - Brand Defense | All zones | 1 group | €[X]/day | Target impression share |

## Ad Copy Templates (RSA)
### Ad Group: [theme]
**Headlines (15):**
1. [Headline with city name]
2. [Headline with service]
3. [Headline with seasonal hook]
...

**Descriptions (4):**
1. [Description with local USP]
2. [Description with CTA]
...

## Landing Page Mapping
| Ad Group | Target Landing Page | Page Status | Action |
|----------|-------------------|-------------|--------|
| [group] | /[local-page] | Live/Missing | [action] |

## Budget Allocation by Season
| Month | Season | Monthly Budget | Notes |
|-------|--------|---------------|-------|
| Jan | Low | €[X] | Reduced spend, early-bird messaging |
| Jun | Peak | €[X] | Maximum spend, availability messaging |

## LSA Assessment
- **Eligible:** Yes/No (based on business type and region)
- **Requirements:** [Google verification, insurance, background check as applicable]
- **Setup steps:** [if eligible]
- **Expected cost model:** Pay-per-lead (not CPC)

## Organic-Paid Coordination
| Keyword | Organic Position | Paid Action |
|---------|-----------------|-------------|
| [keyword] | Position 1-3 | Reduce bid or pause - organic covers |
| [keyword] | Not ranking | Active paid - fill organic gap |
| [keyword] | Position 4-10 | Maintain paid while organic improves |
```

## QA Rubric (scored)

- Geo-precision (0-5): targeting zones match actual service area with appropriate radius and exclusions.
- Budget justification (0-5): spend allocation backed by volume, CPC, and seasonal data.
- Ad relevance (0-5): ad copy includes local signals and matches landing page intent.
- Organic alignment (0-5): paid strategy complements organic rather than duplicating it.

## Examples (good/bad)

- Good: "Primary zone: 30km radius from Asten (60% of €800/month budget). Top keyword cluster: 'camping Brabant' (480 searches/month, est. CPC €0.85, medium competition). RSA headline 1: 'Camping in het Hart van Brabant'. Landing page: /camping-brabant (new, needs creation - content brief in service-area-mapping output). Seasonal allocation: €400/month Dec-Mar (low), €1200/month Jun-Aug (peak). LSA: not available for campgrounds in NL as of Feb 2026."
- Bad: "Run Google Ads for your business. Target the Netherlands. Budget: whatever you can afford." (no geo-targeting, no keyword research, no seasonal planning, no ad copy, no landing pages)

## Variants

- Launch variant: first-time local paid search setup for a business with no existing campaigns.
- Optimization variant: improve existing campaigns - restructure, tighten geo-targeting, improve ad copy, reallocate budget.
- Seasonal sprint variant: short-term campaign for peak season or event-based traffic boost.
- LSA setup variant: focused on Local Services Ads eligibility assessment and setup for eligible businesses.
