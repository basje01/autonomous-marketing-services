---
id: service-area-mapping
title: Service Area Mapping
category: seo
goal: Define geographic service areas, create location-targeted landing pages, and implement ServiceArea schema to maximize visibility for local and near-me queries.
best_for: Local businesses expanding geographic reach or optimizing for location-specific search queries including cross-border markets.
inputs:
  - Business address and type
  - Current service area (radius or list of areas served)
  - Target expansion areas (if applicable)
  - Competitor locations and service areas
  - Customer origin data (if available)
constraints:
  - Service area must reflect actual operational reach (not aspirational)
  - Location landing pages must have unique, substantive content (no doorway pages)
  - Schema markup must accurately represent the actual service area
  - Cross-border targeting must account for language and cultural differences
outputs:
  - Service area map with primary, secondary, and expansion zones
  - Location-targeted landing page strategy with content briefs
  - ServiceArea schema markup specifications
  - Near-me query optimization plan
  - Competitor service area gap analysis
quality_checks:
  - Service area boundaries are realistic and data-informed
  - Each landing page brief has unique content angles (not city-name swaps)
  - Schema markup validated against schema.org GeoShape/AdministrativeArea
  - Near-me query list is specific to business type and geography
tags:
  - seo
  - b2c
  - content
version: 1.0.0
impact: 3
---

## Context

Use this when a local business needs to define, document, and optimize its geographic service area for search visibility. Service area mapping connects physical reach to digital presence: it defines where the business serves customers, creates targeted content for each zone, and implements schema markup so search engines and AI assistants understand the geographic scope. Especially valuable for businesses near regional or national borders (like Wetland.nl near the Dutch-German-Belgian border).

## Procedure

1. Define the service area: gather business address, actual delivery/service radius, and any geographic boundaries (rivers, borders, travel time limits).
2. Segment into zones: primary (core area, most customers), secondary (reachable, moderate customer density), expansion (aspirational, few current customers).
3. Analyze customer origin data (if available) to validate zone definitions.
4. Map competitor locations and their service areas to identify underserved zones.
5. Research near-me and location-specific queries for the business type in each zone.
6. Design location landing page strategy: one hub page per zone with unique content angles (not just city-name substitution).
7. Write content briefs for each landing page: local landmarks, driving directions, nearby attractions, area-specific offerings.
8. Specify ServiceArea schema markup using schema.org GeoShape or AdministrativeArea.
9. Plan cross-border or multi-language variants if the service area spans language regions.

## Output Format

```md
# Service Area Plan: [Business Name]

## Service Area Map

### Primary Zone (core - most customers)
- Radius: [X] km from [business address]
- Areas: [list of cities/towns]
- Drive time: [X] minutes
- Population: [estimated]
- Key queries: [list]

### Secondary Zone (reachable - growth opportunity)
- Radius: [X-Y] km from business
- Areas: [list of cities/towns]
- Drive time: [X-Y] minutes
- Population: [estimated]
- Key queries: [list]

### Expansion Zone (aspirational - cross-border or new market)
- Radius: [Y+] km from business
- Areas: [list of cities/towns, including cross-border]
- Drive time: [X+] minutes
- Key queries: [list]
- Language considerations: [if cross-border]

## Competitor Service Area Analysis
| Competitor | Location | Estimated Radius | Overlap with Our Zones | Gap Opportunity |
|-----------|----------|-----------------|----------------------|----------------|
| [Name] | [City] | [X] km | Primary: [%] | [Underserved area] |

## Near-Me Query Plan
| Query Pattern | Zone | Monthly Volume (est.) | Current Ranking | Target Page |
|--------------|------|----------------------|----------------|-------------|
| "[service] near [city]" | Primary | [N] | Not ranking | /[city-slug] |
| "[service] in [region]" | Secondary | [N] | Page 2 | /[region-slug] |

## Landing Page Strategy
| Page | URL Slug | Zone | Unique Content Angle | Word Count Target |
|------|----------|------|---------------------|------------------|
| [City] Landing | /[city-slug] | Primary | [Unique angle: landmarks, directions, local context] | 800+ |

### Content Brief: [City/Region] Landing Page
- H1: [service] in [city/region] - [differentiator]
- Intro: What makes [business] the best choice for [city] visitors/residents
- Local context: Driving directions from [city], nearby landmarks, area description
- Services: [business-specific offerings relevant to this zone]
- FAQ: 3-5 questions specific to this location (parking, travel time, accessibility)
- Schema: LocalBusiness with ServiceArea for this zone

## ServiceArea Schema Specification
```json
{
  "@context": "https://schema.org",
  "@type": "[BusinessType]",
  "name": "[Business Name]",
  "address": { ... },
  "areaServed": [
    {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "[lat]",
        "longitude": "[lng]"
      },
      "geoRadius": "[radius in meters]"
    },
    {
      "@type": "AdministrativeArea",
      "name": "[Province/Region]"
    }
  ]
}
```

## Cross-Border Considerations (if applicable)
| Market | Language | Key Queries | Landing Page | Hreflang |
|--------|----------|------------|-------------|---------|
| [Country] | [lang] | [queries in that language] | /[lang]/[slug] | [lang-region] |
```

## QA Rubric (scored)

- Zone accuracy (0-5): service area boundaries reflect actual business reach, supported by data.
- Content uniqueness (0-5): each landing page brief has genuinely unique content, not city-name substitution.
- Schema correctness (0-5): ServiceArea markup uses valid schema.org types and accurately represents zones.
- Query coverage (0-5): near-me query list is comprehensive for the business type across all zones.

## Examples (good/bad)

- Good: "Primary zone: 30km radius from Asten. Includes Eindhoven (25 min drive, pop. 235K), Helmond (15 min, pop. 93K), Deurne (10 min, pop. 32K). Key queries: 'camping bij Eindhoven', 'vakantiepark Helmond', 'camping Peelgebied'. Landing page /camping-bij-eindhoven with unique content: directions from Eindhoven Centraal, nearby Peel nature attractions, day-trip suggestions. Schema: Campground with GeoCircle (51.4°N, 5.75°E, radius 30000m) + AdministrativeArea 'Noord-Brabant'."
- Bad: "Service area: Netherlands. Create landing pages for every city." (no zone segmentation, doorway page strategy, no unique content, no schema spec, not realistic)

## Variants

- Single-location variant: one business, define service area and create location landing pages for primary + secondary zones.
- Multi-location variant: multiple business locations, each with its own service area - identify overlaps and gaps.
- Cross-border variant: business near national border with multi-language service area (e.g., NL/DE/BE).
