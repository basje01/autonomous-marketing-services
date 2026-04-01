---
id: governance
title: SEO Governance Framework
category: seo
goal: Design an SEO governance framework for large sites that prevents technical debt accumulation and ensures content quality standards are enforced at scale.
best_for: Enterprise SEO teams managing sites with multiple content contributors, developers, and stakeholders.
inputs:
  - Site size and team structure
  - Current publishing workflow
  - Known SEO debt (technical issues, content quality problems)
  - Stakeholder roles and responsibilities
constraints:
  - Governance must integrate with existing publishing workflows, not replace them
  - Rules must be enforceable through tooling or process, not just documentation
  - Framework must balance speed of publishing with quality control
outputs:
  - SEO governance policy document
  - Pre-publish checklist by content type
  - Technical SEO health SLA definitions
  - Escalation and exception handling procedures
quality_checks:
  - Every governance rule has an enforcement mechanism defined
  - Pre-publish checklists are specific to content type
  - SLAs have measurable thresholds and clear owners
tags:
  - seo
version: 1.0.0
impact: 4
---

## Context

Use this when a site has grown beyond a single SEO owner's control. Common symptoms: developers shipping URL changes without redirects, content published without metadata, and no one tracking technical SEO health. This skill creates the governance layer that prevents SEO debt from accumulating faster than it can be resolved.

## Procedure

1. Audit current publishing workflow: who publishes, what approval exists, where SEO requirements are checked (or not).
2. Identify SEO debt sources: which actions commonly cause SEO issues (URL changes, content duplication, missing metadata, schema removal).
3. Define pre-publish SEO checklists per content type: blog post, landing page, product page, category page.
4. Define technical SEO health SLAs: acceptable thresholds for indexation rate, crawl errors, broken links, CWV scores.
5. Assign ownership: who monitors each SLA, who reviews pre-publish checklists, who handles escalations.
6. Design enforcement mechanisms: CMS validation rules, CI/CD checks, automated alerts, manual review gates.
7. Create exception handling: how to fast-track urgent publishes while maintaining accountability.

## Output Format

```md
# SEO Governance Framework: [Site/Organization]

## Publishing Workflow with SEO Gates
1. [Content creation] → [SEO checklist review] → [Approval] → [Publish] → [Post-publish verification]

## Pre-Publish Checklists

### Blog Post
- [ ] Title tag optimized (50-60 chars, keyword in first half)
- [ ] Meta description written (120-160 chars)
- [ ] H1 present and unique
- [ ] Internal links added (min 3)
- [ ] Images have alt text
- [ ] Schema markup applied (Article)
- [ ] URL slug is clean and keyword-relevant
- [ ] Canonical tag set correctly

### Landing Page
- [ ] [Landing page specific items]

### Product Page
- [ ] [Product page specific items]

## Technical SEO Health SLAs
| Metric | Target | Warning | Critical | Owner | Review Cadence |
|--------|--------|---------|----------|-------|---------------|
| Indexation rate | > 95% | < 95% | < 90% | [Role] | Weekly |
| Crawl errors | < 1% | > 1% | > 3% | [Role] | Weekly |
| Broken internal links | 0 | > 5 | > 20 | [Role] | Monthly |
| CWV passing rate | > 90% | < 90% | < 75% | [Role] | Monthly |

## Enforcement Mechanisms
| Rule | Mechanism | Automated? |
|------|----------|-----------|
| Title tag required | CMS validation | Yes |
| Meta description required | CMS validation | Yes |
| Redirect for URL changes | CI/CD check | Yes |
| Content quality | Manual review gate | No |

## Exception Handling
- Fast-track process: [Who can approve, what gets skipped, what must be backfilled within 48 hours]
- Escalation path: [Contributor → SEO Lead → Head of Content]

## SEO Debt Register
| Issue Type | Current Count | SLA Target | Owner | Review Date |
|-----------|-------------|-----------|-------|------------|
| Missing redirects | | < 5 | | |
| Pages without schema | | < 10% | | |
```

## QA Rubric (scored)

- Enforcement feasibility (0-5): every rule has a realistic mechanism (tooling or process).
- Checklist specificity (0-5): items are concrete and measurable, not vague guidelines.
- SLA clarity (0-5): thresholds are numeric, owners are named, review cadence is defined.
- Exception handling (0-5): fast-track process exists without undermining governance.

## Examples (good/bad)

- Good: "Rule: every URL change must have a 301 redirect. Enforcement: CI/CD pipeline checks for URL changes without corresponding redirect entries. Alert sent to SEO lead if redirect missing. Exception: SEO lead can approve removal of redirect for deliberately deleted pages."
- Bad: "Everyone should follow SEO best practices." (no specific rules, no enforcement, no accountability)

## Variants

- Lightweight variant: pre-publish checklists + 3 critical SLAs only (for teams adopting governance incrementally).
- Enterprise variant: full framework with CMS integration, CI/CD checks, debt register, and quarterly governance reviews.
