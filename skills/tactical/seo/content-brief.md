---
id: content-brief
title: SEO Content Brief
category: seo
goal: Create execution-ready content briefs that align search intent, structure, and conversion opportunities.
best_for: Content teams working with multiple writers and requiring consistent output quality.
inputs:
  - Target keyword cluster
  - SERP observations
  - Product CTA options
constraints:
  - Brief must define intent and outline before drafting
  - Avoid keyword stuffing and weak E-E-A-T signals
outputs:
  - Writer-ready content brief
  - On-page optimization checklist
quality_checks:
  - Intent and structure are clear
  - Brief includes conversion integration points
  - Required evidence sources are listed
tags:
  - seo
  - content
  - conversion
version: 1.0.0
impact: 4
---

## Context

Use this before drafting to reduce rewrite cycles and improve ranking/engagement consistency. A content brief is not a creative constraint - it's a targeting system. Without one, writers guess at intent, structure, and keywords, producing content that's well-written but doesn't rank or convert. The brief bridges the gap between SEO strategy (what to target) and content execution (what to write). It feeds into writer handoffs, editorial workflows, and content quality gates.

## Procedure

1. Define target query and intent.
2. Analyze top SERP structures and content gaps.
3. Draft outline with required sections and evidence blocks.
4. Define metadata, schema opportunities, and internal links.
5. Add conversion hooks aligned to article intent.

## Output Format

```md
# SEO Content Brief

## Target

- Primary keyword:
- Search intent:
- Audience:

## Outline

- H1:
- H2:
- H2:
- FAQ:

## Optimization

- Title tag:
- Meta description:
- Internal links:
- External sources:
- Schema recommendation:

## Conversion Plan

- Primary CTA:
- Mid-article CTA:
- Exit CTA:
```

## QA Rubric (scored)

- Intent fidelity (0-5): matches actual query expectation.
- Outline quality (0-5): comprehensive and non-redundant.
- SEO completeness (0-5): includes metadata, linking, schema.
- Conversion integration (0-5): CTA placement feels natural.

## Examples (good/bad)

- Good: “Commercial query brief includes comparison framework and decision checklist.”
- Bad: “Informational query brief forced into hard-sell layout.”

## Anti-Patterns

| Anti-Pattern | Why It Fails | Correct Approach |
|---|---|---|
| Brief that specifies word count but not search intent | "Write 2,000 words about CRM software" - the writer produces a generic overview when the SERP shows comparison pages. Word count doesn't determine ranking; intent match does | Start every brief with: "The searcher wants to [intent]. After reading, they should be able to [outcome]." Then specify the content type that matches the SERP pattern |
| Stuffing the brief with 30 secondary keywords | Writers try to mention all 30 keywords, producing unnatural content that reads like an SEO checklist - Google's helpful content update penalizes this | Limit to 1 primary keyword + 3-5 semantically related terms. Focus on covering the topic comprehensively - related keywords appear naturally when the topic is well-covered |
| No SERP analysis in the brief | The brief is written from internal knowledge without checking what currently ranks - the resulting content misses structural patterns Google rewards | Analyze top 5 SERP results: what headings do they use? What questions do they answer? What's missing? Specify required sections based on competitive gap, not just internal knowledge |
| CTA that fights the intent | Informational content with aggressive "Buy now" CTAs - the user came to learn, not buy. Hard CTAs on educational content increase bounce rate and reduce trust | Match CTA to intent stage: informational → "Learn more" / newsletter. Commercial → "Compare plans" / free trial. Transactional → "Start now" / pricing |

## Variants

- Thought leadership variant: Brief specifies a unique angle or contrarian take the writer must defend. Proof must come from first-party experience or original research, not just citing others. Tone is opinion-led with clear attribution. E-E-A-T signals: author byline, credentials, links to author's other work.
- Product-led variant: Brief includes product screenshots, feature names, and use-case scenarios to weave in naturally. Comparison sections use factual differentiators (not marketing claims). CTA leads to relevant product surface (not generic homepage). Include FAQ schema targeting long-tail product queries.
