---
id: search-intent
title: Search Intent Analysis
category: seo
goal: Decode the true intent behind a target keyword by analyzing SERP signals, and produce a content alignment specification that prevents intent mismatch failures.
best_for: Content writers, SEO leads, and brief creators who need to confirm what type of content Google rewards for a query before drafting.
inputs:
  - Target keyword or keyword cluster
  - SERP screenshot or top 10 URL list for the keyword
  - Existing page URL (if auditing an existing piece)
constraints:
  - Intent classification must be derived from SERP evidence, not assumption
  - Identify both primary and secondary intent layers
  - Flag if SERP is mixed-intent (hard to win with one content type)
outputs:
  - Intent classification with SERP evidence
  - Content type and format recommendation
  - Structural requirements (H-tag structure, page sections, content length signal)
  - Existing page gap analysis (if URL provided)
quality_checks:
  - Classification references at least 3 SERP signals as evidence
  - Format recommendation matches dominant SERP content type
  - Gap analysis identifies specific structural differences
tags:
  - seo
  - content
  - research
version: 1.0.0
impact: 4
---

## Context

Use this after keyword research and before writing a content brief. Intent analysis prevents the most common SEO content failure: publishing content that doesn't match what Google is rewarding for that query. The output feeds directly into content-brief creation.

## Procedure

1. Classify primary intent: informational, commercial investigation, transactional, or navigational.
2. Identify secondary intent signals (e.g., a commercial query with heavy informational SERP results).
3. Analyze top 5-10 SERP results: content type (article, tool, list, comparison, product page), format (H2 count, FAQ presence, word count range), and freshness signals.
4. Identify dominant SERP features: featured snippet, People Also Ask, video carousel, shopping results, local pack, knowledge panel.
5. Derive content requirements: recommended format, estimated length range, required sections, E-E-A-T signals needed.
6. If existing page provided: gap-analyze against SERP requirements and score alignment.

## Output Format

```md
# Search Intent Analysis: "[keyword]"

## Intent Classification
- Primary intent: [informational/commercial/transactional/navigational]
- Secondary intent: [if present, or "none"]
- Mixed-intent risk: [yes/no + explanation]

## SERP Evidence
1. [Signal: e.g., "8 of 10 results are comparison listicles"]
2. [Signal: e.g., "Featured snippet present in definition format"]
3. [Signal: e.g., "Average top-5 word count: 1,800-2,400"]
4. [Signal: e.g., "People Also Ask dominated by 'how to' questions"]

## Content Requirements
- Recommended format: [listicle/guide/comparison/tool/landing page/FAQ]
- Target length: [range based on SERP evidence]
- Required H2 sections: [list]
- Must-include elements: [FAQ, data table, comparison table, visual, etc.]
- E-E-A-T requirements: [author bio, citations, original data, credentials]

## SERP Feature Opportunities
- Featured snippet: [yes/no, format needed to win it]
- People Also Ask: [questions to answer in content]
- Video carousel: [yes/no]
- Other: [local, shopping, knowledge panel]

## Existing Page Gap Analysis (if applicable)
- Current URL: [URL]
- Intent alignment score: /5
- Key gaps:
  1. [Specific structural difference]
  2. [Missing section or element]
  3. [Format mismatch]
- Recommended changes: [specific actions]
```

## QA Rubric (scored)

- Evidence quality (0-5): intent derived from SERP data with at least 3 cited signals.
- Format accuracy (0-5): recommendation matches the dominant winning content type in SERPs.
- Gap specificity (0-5): actionable structural differences identified, not vague advice.
- Feature opportunity identification (0-5): SERP features are identified and actionable guidance provided.

## Examples (good/bad)

- Good: "Query 'best GEO tools 2026' - commercial investigation intent. Evidence: 9/10 results are comparison listicles, average 2,200 words, all include pricing tables. Featured snippet shows top-3 list format. Recommendation: comparison listicle with pricing table and verdict section."
- Bad: "This is an informational keyword. Write a blog post about it." (no SERP evidence, no structural guidance)

## Variants

- Quick check variant: primary intent + format recommendation only (useful for batch processing keyword lists).
- Deep analysis variant: full SERP deconstruction with existing page audit and competitor gap mapping.
