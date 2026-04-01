---
id: product-page-copy
title: Product Page Copy
category: copy
goal: Write conversion-optimized product or service page copy that transforms features into outcomes, handles objections inline, and drives a specific conversion action.
best_for: Product pages, service pages, and feature detail pages where visitors need to understand value before committing.
inputs:
  - Product feature list and technical capabilities
  - ICP profile with primary objections
  - Competitor product pages for differentiation
  - Customer testimonials and case study data
constraints:
  - Lead with outcomes, not features - features support outcomes
  - Every feature claim must have a proof mechanism (screenshot, demo, data)
  - Page must work for both technical and non-technical readers via progressive disclosure
outputs:
  - Complete product page copy with all sections
  - Feature-to-outcome mapping table
  - Objection handling embedded in copy flow
quality_checks:
  - No feature listed without a "so you can..." outcome statement
  - Competitive differentiation is implicit, not explicit attacks
  - Technical depth is available but not required to understand value
tags:
  - copywriting
  - conversion
  - b2b
version: 1.0.0
impact: 4
---

## Context

Product pages fail when they list features without connecting them to outcomes. Engineers write "supports webhooks" - buyers need "get notified instantly when events happen, so your team can respond in minutes, not hours." This skill bridges that gap with a structured approach to outcome-first product copy.

## Procedure

1. List every product feature. For each, write the outcome using the format: "[Feature] so you can [outcome] which means [business impact]."
2. Group features into 3-5 value themes. Each theme becomes a page section with a benefit-first headline.
3. Write the page hero: product-specific headline that names the category and primary outcome. Subhead with the key differentiator.
4. For each value theme section: benefit headline, 2-3 sentence explanation, 2-4 supporting features as bullet points, visual slot (screenshot, diagram, or demo).
5. Write the social proof section: testimonial from a user who experienced the specific outcomes claimed on this page.
6. Write the comparison section (optional): "How [product] compares" with an honest feature table - highlight genuine advantages, acknowledge gaps honestly.
7. Write the page-specific CTA: action relevant to this product (not just "Contact us"), with a risk-reducer (free trial, demo, no credit card).

## Output Format

```md
# Product Page Copy - [Product/Feature Name]

## Hero
- **Headline**: "[Outcome-first statement]"
- **Subhead**: "[Key differentiator or how it works]"
- **CTA**: "[action]" | **Secondary**: "[lower commitment]"

## Feature-to-Outcome Map
| Feature | Outcome | Business Impact |
|---------|---------|-----------------|
| [feature] | [so you can...] | [which means...] |

## Value Theme Sections

### Section 1: [Benefit headline]
[2-3 sentence explanation of the outcome]
- [Feature 1]: [short outcome statement]
- [Feature 2]: [short outcome statement]
- [Feature 3]: [short outcome statement]
- **Visual**: [screenshot/diagram description]

### Section 2: [Benefit headline]
[2-3 sentence explanation]
- [Features as bullet points]
- **Visual**: [description]

### Section 3: [Benefit headline]
[2-3 sentence explanation]
- [Features as bullet points]
- **Visual**: [description]

## Social Proof
> "[Testimonial specific to this product's outcomes]"
> - [Name], [Role] at [Company]

## Comparison (optional)
| Capability | [Product] | Alternative A | Alternative B |
|------------|-----------|---------------|---------------|
| [capability] | [status] | [status] | [status] |

## CTA Section
- **Headline**: "[outcome reminder + urgency]"
- **Button**: "[specific action]"
- **Risk reducer**: "[free trial / no CC / money-back]"
```

## QA Rubric (scored)

- Outcome clarity (0-5): every feature connects to a user outcome, not just a capability.
- Progressive disclosure (0-5): scannable headlines with detail available for those who want it.
- Proof density (0-5): every section has evidence (screenshot, data, testimonial, demo).
- Differentiation (0-5): reader understands why this over alternatives without explicit competitor attacks.

## Examples (good/bad)

- Good: "Feature: 'Real-time collaboration' → Outcome: 'Edit documents simultaneously with your team' → Impact: 'Ship docs 3x faster without version conflicts.' Visual: split-screen showing two cursors editing."
- Bad: "Features: real-time collaboration, version history, commenting, permissions, integrations." - a feature list with no outcomes, no proof, no visuals.

## Variants

- Technical deep-dive mode: includes code snippets, API examples, and architecture diagrams for developer-facing products.
- Service page mode: replaces features with deliverables and process steps - for agency and consulting service pages.
