---
id: homepage-conversion-copy
title: Homepage Conversion Copy
category: copy
goal: Write the complete homepage copy - headline, subhead, value props, social proof, objection handling, and CTA - structured as a conversion architecture that moves visitors from awareness to action.
best_for: New website launches or homepage rewrites where conversion rate is below benchmark or messaging is unclear.
inputs:
  - Website discovery brief (audience, positioning, goals)
  - ICP and JTBD synthesis (if available)
  - Competitor homepage copy for differentiation
  - Product screenshots or demo flow
constraints:
  - Headline must be under 12 words
  - Every section must earn the next scroll - no filler
  - Claims must be provable - no superlatives without evidence
  - Copy must work without images (content-first design)
outputs:
  - Complete homepage copy document with all sections
  - Headline variants for A/B testing
  - Annotation layer explaining the persuasion logic per section
quality_checks:
  - Headline answers "what + for whom + why now" clearly
  - Social proof is specific (numbers, names, logos) not generic
  - Objections are addressed before they become exit reasons
  - Every CTA uses an action verb plus an outcome
tags:
  - copywriting
  - conversion
version: 1.0.0
impact: 5
---

## Context

The homepage is the highest-traffic page and the one most likely to be judged instantly. Great homepage copy follows a conversion architecture - each section has a job: hook, prove, explain, reassure, convert. This skill produces copy that follows that architecture with persuasion rationale annotated for the team.

## Procedure

1. Write 3 headline candidates using the formula: [Outcome verb] + [specific result] + [for whom]. Example: "Deploy production infrastructure in 30 seconds." Pick the clearest, not the cleverest.
2. Write the subhead: expand with specifics the headline can't contain - the "how" or the proof. 15-25 words.
3. Write the trust strip: 4-6 customer logos or a metric ("Trusted by 2,000+ engineering teams").
4. Write 3 value proposition blocks: each with a benefit-first headline (not feature-first), 2-sentence explanation, and a supporting data point or micro-proof.
5. Write the "how it works" section: 3 steps maximum, each with a verb-led title and one-sentence description. This reduces complexity anxiety.
6. Write social proof: one featured testimonial (40-80 words) with full attribution (name, role, company, photo). Add 1-2 supporting quotes as secondary proof.
7. Write the final CTA section: urgency or summary headline, primary button copy (action + outcome), secondary option (lower commitment).

## Output Format

```md
# Homepage Copy

## Hero
- **Headline**: "[text]"
  - Persuasion logic: [why this works for the target audience]
- **Subhead**: "[text]"
- **Primary CTA**: "[button text]" → [destination]
- **Secondary CTA**: "[link text]" → [destination]

### Headline Variants (for A/B testing)
1. "[control]"
2. "[variant - different angle]"
3. "[variant - different format]"

## Trust Strip
- Format: [logos | metric | statement]
- Content: "[text or logo list]"

## Value Propositions
### VP1: [Benefit headline]
"[2-sentence explanation]"
- Proof: [data point, case study reference, or demo link]

### VP2: [Benefit headline]
"[2-sentence explanation]"
- Proof: [data point]

### VP3: [Benefit headline]
"[2-sentence explanation]"
- Proof: [data point]

## How It Works
1. **[Verb-led title]** - [one-sentence description]
2. **[Verb-led title]** - [one-sentence description]
3. **[Verb-led title]** - [one-sentence description]

## Social Proof
### Featured Testimonial
> "[Quote - 40-80 words]"
> - [Name], [Role] at [Company]

### Supporting Quotes
> "[Short quote]" - [Name], [Company]
> "[Short quote]" - [Name], [Company]

## Final CTA
- **Headline**: "[summary or urgency statement]"
- **Primary CTA**: "[button text]"
- **Secondary**: "[text link]"

## Persuasion Architecture Notes
| Section | Job | Objection Addressed |
|---------|-----|---------------------|
| Hero | Hook + qualify | "Is this for me?" |
| Trust strip | Credibility | "Who else uses this?" |
| Value props | Desire | "What do I get?" |
| How it works | Simplicity | "Is this hard?" |
| Testimonial | Validation | "Does it actually work?" |
| Final CTA | Commitment | "What do I do next?" |
```

## QA Rubric (scored)

- Clarity (0-5): a stranger understands the product in 5 seconds from the headline.
- Specificity (0-5): no generic claims - every statement has a number, name, or proof point.
- Conversion architecture (0-5): each section logically earns the next scroll and addresses a specific objection.
- CTA strength (0-5): button copy uses action verbs and promises an outcome.
- Voice consistency (0-5): tone matches the brand voice descriptors throughout.

## Examples (good/bad)

- Good: "Ship production databases in 60 seconds. Headline is 7 words, outcome-specific, audience-implied (developers who need speed). Subhead: 'Managed Postgres with automated backups, branching, and zero-downtime migrations.' CTA: 'Start building free' - action + outcome + no risk."
- Bad: "The #1 Platform for Modern Teams. Welcome to a better way to work. We're excited to help you transform your workflow. Get Started Today."

## Variants

- Long-form mode: 7-9 sections including FAQ, comparison table, and ROI calculator for high-consideration products.
- Minimal mode: hero + trust strip + single CTA only - for products where the demo or free trial does the selling.
