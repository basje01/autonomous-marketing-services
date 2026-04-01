---
id: hreflang
title: Hreflang Implementation Audit
category: seo
goal: Audit and correct hreflang implementation for multilingual or multi-regional sites to ensure correct language and region targeting without duplicate content penalties.
best_for: Technical SEOs working on sites with multiple language versions or regional targeting requirements.
inputs:
  - Site URL structure (ccTLD, subdirectory, or subdomain approach)
  - Language and region versions available
  - Current hreflang implementation (if any)
  - GSC international targeting report
constraints:
  - Hreflang annotations must be bidirectional (page A references B, B references A)
  - Every page must include a self-referencing hreflang tag
  - x-default must point to the most appropriate fallback page
outputs:
  - Hreflang audit report with error identification
  - Corrected hreflang tag specifications per page set
  - Implementation method recommendation (HTML head, HTTP header, or sitemap)
  - Validation checklist
quality_checks:
  - All hreflang annotations are bidirectional
  - Self-referencing tags present on every page
  - x-default correctly assigned
tags:
  - seo
version: 1.0.0
impact: 3
---

## Context

Use this when a site serves content in multiple languages or targets multiple regions with localized content. Hreflang errors are among the most common technical SEO issues on international sites, causing wrong-language pages to rank in the wrong markets. This skill produces a complete audit and implementation spec.

## Procedure

1. Inventory all language/region versions: list every locale (en-US, en-GB, de, fr, etc.) and its URL pattern.
2. Audit current hreflang tags: check for presence, bidirectional consistency, self-references, and x-default.
3. Identify common errors: missing return tags, incorrect language codes, broken URLs in hreflang, orphaned versions.
4. Check GSC international targeting report for flagged issues.
5. Recommend implementation method: HTML link tags in head (for smaller sites), HTTP headers (for PDFs/non-HTML), or sitemap hreflang (for large sites).
6. Write corrected hreflang specifications for each page group.
7. Create validation checklist and testing procedure.

## Output Format

```md
# Hreflang Audit: [Domain]

## Language/Region Inventory
| Locale | URL Pattern | Page Count | Status |
|--------|-----------|-----------|--------|
| en-US | /en-us/ or .com | | Active |
| de | /de/ or .de | | Active |
| x-default | | | [target URL] |

## Audit Findings
| Error Type | Count | Example | Fix |
|-----------|-------|---------|-----|
| Missing return tag | | Page A→B exists but B→A missing | Add return tag |
| Missing self-reference | | /en-us/page has no self-ref | Add self-reference |
| Invalid language code | | "en_US" should be "en-US" | Fix format |
| Broken hreflang URL | | 404 target | Fix URL or remove |

## Corrected Hreflang Spec

### Page Group: [Template/Type]
```html
<link rel="alternate" hreflang="en-US" href="https://example.com/en-us/page/" />
<link rel="alternate" hreflang="de" href="https://example.com/de/page/" />
<link rel="alternate" hreflang="x-default" href="https://example.com/en-us/page/" />
```

```md
## Implementation Method
- Recommended: [HTML head / HTTP header / Sitemap]
- Rationale: [why this method for this site]

## Validation Checklist
- [ ] Every page has a self-referencing hreflang tag
- [ ] All annotations are bidirectional
- [ ] x-default points to the correct fallback
- [ ] Language codes follow ISO 639-1 (language) and ISO 3166-1 Alpha 2 (region)
- [ ] All hreflang URLs return 200 status
- [ ] GSC international targeting report shows no new errors after implementation
```

## QA Rubric (scored)

- Bidirectional consistency (0-5): every hreflang annotation has a confirmed return tag.
- Language code accuracy (0-5): all codes follow ISO standards.
- Implementation completeness (0-5): every page group has a full hreflang spec.
- Validation procedure (0-5): checklist covers all common error types with testing steps.

## Examples (good/bad)

- Good: "Page /en-us/pricing/ has hreflang to /de/preise/ but /de/preise/ does not have a return tag to /en-us/pricing/. Fix: add `<link rel='alternate' hreflang='en-US' href='https://example.com/en-us/pricing/' />` to /de/preise/."
- Bad: "Add hreflang tags to your site." (no audit, no specific errors, no implementation spec)

## Variants

- Audit-only variant: identify errors and provide corrected specs without implementing.
- Full implementation variant: audit + corrected specs + sitemap-based hreflang generation + GSC verification.
