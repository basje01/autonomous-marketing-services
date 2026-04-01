---
id: llms-txt-implementation
title: llms.txt Implementation
category: seo
goal: Implement and optimize a /llms.txt file that accurately describes a site's content to AI systems, improving AI discoverability and citation accuracy for LLM-powered tools.
best_for: Brands and developers wanting to give AI assistants and LLM-powered tools structured guidance about their site's content, purpose, and key resources.
inputs:
  - Target domain URL
  - Site content inventory (key pages, sections, and their purposes)
  - Primary audience and use cases the AI should understand
  - Key resources AI tools should reference (API docs, guides, case studies)
constraints:
  - llms.txt content must be accurate - do not include pages that do not exist or overstate capabilities
  - File must be valid markdown served at /llms.txt with Content-Type text/plain or text/markdown
  - Keep each file description concise (one line) - AI tools use llms.txt for context, not full content
  - llms.txt is a disclosure/guidance document, not a ranking signal - do not optimize for keywords
outputs:
  - Complete /llms.txt file ready to deploy
  - /llms-full.txt variant (with full content per section for tools that support it)
  - Validation checklist for correct serving and syntax
  - Guidance on which AI tools currently use llms.txt
quality_checks:
  - All linked resources in llms.txt return 200 status
  - File is served at /llms.txt with correct content-type
  - Descriptions accurately reflect page content
  - File is updated whenever major site sections change
tags:
  - seo
  - content
  - geo
version: 1.2.0
impact: 4
geo_layer_required: true
---

## Context

`llms.txt` is an open standard (proposed 2024, answer.ai / Jeremy Howard) that gives AI systems a structured overview of a website's content in a format optimized for LLM consumption. Unlike robots.txt (access permissions) or sitemap.xml (URL index), llms.txt is an opt-in disclosure: "here is what my site is about, here is what's most useful for AI to reference."

**GEO/AI crawler access layer:** `llms.txt` is a direct extractability signal for AI tools that read it at query time (Cursor, Claude Projects, Perplexity with URL context). Its primary GEO value is as an entity seed delivery mechanism: the `description` field gives AI systems a pre-parsed, canonical brand description without requiring full page crawl and extraction. This description should contain the GEO press boilerplate verbatim - brand name + category + specific value + audience + one proof point. Pages listed in `llms.txt` are discovery-prioritised over pages reachable only via crawl; audit all listed pages for out-of-context test compliance before adding them - a page that fails extraction at full-page level fails even faster from an abbreviated listing entry.

**Current adoption (2025-2026):**
- Supported by: Cursor, Perplexity (some integrations), Claude Projects, GitHub Copilot (partial), and growing AI tool ecosystem
- Not yet used by: ChatGPT browse mode (uses Bing index), Google AI Overviews (uses Google index)
- Value: primarily helps AI tools that read the file at query time (e.g., Cursor reading a library's llms.txt to understand API structure), not for training data

**What llms.txt does NOT do:**
- It does not replace robots.txt (access permissions are still controlled by robots.txt)
- It does not guarantee AI citation (LLMs that use Bing/Google index won't use llms.txt for retrieval)
- It is not a ranking signal for any search engine
- It does not substitute for good structured data or content extractability

**Where it adds real value:**
- Developer tools (Cursor, GitHub Copilot) reading documentation sites - they actively fetch llms.txt
- AI assistants with URL-aware context (Claude Projects, Perplexity when given a URL)
- Site owners wanting to declare their AI use policy clearly alongside robots.txt

## Procedure

1. Determine the site type and primary AI tool audience:
   - Documentation / developer site: prioritize API reference, quickstart guides, and code examples
   - Marketing / agency site: prioritize service descriptions, case studies, pricing, and contact
   - E-commerce: prioritize product catalog structure, brand description, and key category pages
   - SaaS: prioritize feature pages, use cases, integration docs, and pricing
2. Map the site's primary sections to their purpose and most important sub-pages (3-5 per section).
3. Write the llms.txt file following the standard format:
   - H1: site name
   - Blockquote: 2-3 sentence description of what the site is and who it serves
   - H2 sections: one per major content area, each with a markdown link list of key resources with one-line descriptions
   - Optional `## Optional` section: secondary resources AI can use if needed but should deprioritize
4. Write the /llms-full.txt variant: same structure but with the full markdown content of each linked page inlined (for tools that support the `-full` convention).
5. Verify the file is served correctly: `curl -I https://domain.com/llms.txt` should return `200 OK`, content-type should be `text/plain` or `text/markdown`.
6. Add a `<link rel="llms-txt" href="/llms.txt">` tag in `<head>` on the homepage (emerging convention, not yet widely supported but forward-compatible).
7. Create a maintenance process: llms.txt must be updated whenever major pages are added or removed.

## Output Format

```md
# llms.txt Implementation: [Domain]

## Current Status
- File present: [yes/no]
- URL: https://[domain]/llms.txt
- HTTP status: [200 / 404 / other]
- Content-type: [value]
- Last updated: [date or unknown]

## Proposed /llms.txt
```

```md
# [Brand Name]

> [2-3 sentence description of what the site is, who it serves, and its primary purpose for AI tools]

## [Primary Section - e.g., Services]

- [/services/geo](/services/geo): Generative Engine Optimization consulting - full-service AI citation strategy
- [/services/seo](/services/seo): Technical and content SEO for organic growth
- [/pricing](/pricing): Service pricing and engagement models

## [Secondary Section - e.g., Resources]

- [/case-studies](/case-studies): Client results with before/after metrics
- [/blog/geo-guide](/blog/geo-guide): Complete guide to GEO for brands

## Optional

- [/about](/about): Company background, team, and methodology
- [/contact](/contact): Inquiry and consultation booking
```

```md
## Validation Checklist
- [ ] /llms.txt returns HTTP 200
- [ ] Content-type is text/plain or text/markdown
- [ ] All linked URLs in the file return 200 (no broken links)
- [ ] Descriptions accurately reflect page content
- [ ] File is UTF-8 encoded
- [ ] <link rel="llms-txt"> tag added to homepage <head>
- [ ] llms-full.txt generated (optional but recommended for developer tool audiences)
- [ ] Maintenance process defined (who updates this when site changes?)

## AI Tool Compatibility
| Tool | Uses llms.txt | Notes |
|------|--------------|-------|
| Cursor | Yes | Reads at query time for context about codebases and docs |
| Claude Projects | Yes (when URL given) | Uses llms.txt when analyzing a site |
| Perplexity | Partial | Some integrations fetch llms.txt |
| ChatGPT browse | No | Uses Bing index instead |
| Google AI Overviews | No | Uses Google index + E-E-A-T signals |
| GitHub Copilot | Partial | Documentation-focused use cases |
```

## QA Rubric (scored)

Minimum passing score: 16/20. A file that scores below 3 on Accuracy must not be deployed - inaccurate descriptions actively mislead AI tools and may cause them to deprioritize the domain.

- Accuracy (0-5): every page linked in llms.txt exists and its description matches actual content.
- Format compliance (0-5): file follows the llms.txt standard (H1 + blockquote + H2 sections + link lists).
- Serving correctness (0-5): file returns 200 with correct content-type and no encoding issues.
- Maintenance plan (0-5): update process is defined and responsibility is assigned.

## Anti-Patterns

| Anti-Pattern | Why It Fails | Correct Approach |
|---|---|---|
| Including login-gated, paywalled, or noindex pages in llms.txt | AI tools that fetch llms.txt and attempt to read the linked pages will encounter access errors or empty content. Including these pages signals poor maintenance and provides no useful context - the tool cannot extract the content being advertised. | Only include publicly accessible pages returning HTTP 200 with readable content. Run `curl -I [url]` on every linked URL before including it. If a key resource is gated, describe it in the llms.txt description text without linking, or create a public summary page that can be linked. |
| Treating llms.txt as a training-data ranking signal | llms.txt is read at query time by tools that actively fetch it (Cursor, Claude Projects, some Perplexity integrations). It is not processed during pre-training by ChatGPT, Gemini, or Claude base models. Optimizing llms.txt for keyword density in the expectation it will improve training-based AI citations is a category error. | Use llms.txt to provide accurate, concise context for tools that read it at query time. For training-based LLM citation, focus on content extractability, structured data, and off-site authority building - not llms.txt. |
| Listing 50+ pages without individual descriptions | When descriptions are missing or all read identically ("page about X"), AI tools cannot determine which resources to prioritize. They may process every page or ignore the file as unhelpful. Neither outcome improves AI discoverability. | Limit llms.txt to 15-25 most important pages. Each resource gets one specific, accurate description that tells the tool what it will find and whether it is relevant to the user's query. Quality of description beats quantity of links. |
| Failing to update llms.txt when pages are removed or URLs change | AI tools that encounter broken links in llms.txt receive 404 errors. Multiple broken links signal poor site maintenance and may cause tools to deprioritize the file. This is invisible in standard analytics and typically discovered only during manual audits months later. | Assign llms.txt to a named maintenance owner (typically whoever manages sitemap.xml). Add a quarterly review item to the SEO workflow: check all URLs return 200, confirm descriptions still match page content, add newly created priority pages. |

## Examples (good/bad)

- Good: llms.txt for an SEO agency: `# LemuriaOS\n\n> LemuriaOS is an AI-native growth agency specializing in Generative Engine Optimization (GEO), technical SEO, and agentic marketing for B2B SaaS and e-commerce brands.\n\n## Services\n\n- [/geo-consulting](/geo-consulting): Full GEO audit and implementation - AI citation strategy for ChatGPT, Perplexity, and Google AI Mode\n- [/seo](/seo): Technical SEO and content strategy`
- Bad: llms.txt that lists 50+ pages without descriptions, or has descriptions that say "click here to learn more" - AI tools get no useful context from this

## Variants

### 48h Sprint Variant (Minimal)

**Trigger:** New client, first AI discoverability deliverable, or site has no llms.txt and needs one immediately.

**Deliverable time:** 15 minutes of execution.

**Steps:**
1. Identify the top 5 pages the site wants AI tools to reference: homepage, primary service/product page, pricing page, one case study or proof page, and contact/booking page. (5 min)
2. Write one accurate, specific description for each (1 sentence, ≤15 words). (5 min)
3. Create the file using the standard format: H1 + blockquote site description + one H2 section + 5 link items. (3 min)
4. Deploy to `/llms.txt` and verify: `curl -I https://[domain]/llms.txt` must return 200 with `Content-Type: text/plain` or `text/markdown`. (2 min)

**Output:** A minimal `/llms.txt` with 5 pages that immediately gives query-time AI tools (Cursor, Claude Projects, Perplexity integrations) the most important context about the site. Label the deliverable "Sprint output - full variant pending." Expand to full variant in the next sprint cycle.

---

- Minimal variant: homepage + top 3 service/product pages only - 15-minute implementation for prospect qualification deliverable.
- Full variant: all site sections with descriptions + llms-full.txt with inlined content - appropriate for documentation sites and developer tools.
- Maintenance variant: audit an existing llms.txt for accuracy and completeness, update broken links and stale descriptions.

### Multi-Domain / Token Project Variant

**Trigger:** Project spans multiple subdomains or products (e.g., main site + tool + community + smart contract). Single-purpose llms.txt template doesn't capture the entity's full scope. Common for crypto projects, multi-product startups, and open-source ecosystems.

**Steps:**
1. Identify the primary domain (the canonical brand URL - where the entity seed lives). Create the main llms.txt here. (5 min)
2. Write the description blockquote as the entity seed covering the project's full scope - not just the primary domain's content. The description should tell an AI tool what this project IS across all its surfaces. (10 min)
3. Use separate H2 sections for each product/subdomain rather than content categories. This helps AI tools understand the project's architecture - which domain to reference for which capability. (10 min)
4. For token/crypto projects: include a `## On-Chain` section with contract address, chain name, and block explorer link. AI tools cannot discover this metadata from page crawl alone - llms.txt is the most direct way to surface it. (5 min)
5. For subdomains with distinct functionality (e.g., pfp.aped.wtf): create a minimal subdomain llms.txt that references back to the primary domain's entity description and provides tool-specific context. (10 min)
6. Validate: all linked URLs return 200; entity description in blockquote matches entity seed in meta description, OG, and Organization schema. (5 min)

**Example structure (token project):**

```md
# APED

> APED is a community-driven Solana memecoin built around the blue-shirt ape meme identity with a PFP generator and creator culture brand on aped.wtf.

## Main Site

- [Homepage](https://aped.wtf/): Token data, gallery, FAQ, and community links
- [FAQ](https://aped.wtf/#faq): Common questions about APED, buying, team, and legitimacy

## Tools

- [PFP Generator](https://pfp.aped.wtf/): AI-powered profile picture generator for APED holders

## On-Chain

- Contract: DgBRtVE2bQURfQt3rcpEqiBcEWDG1kwHHxK26BG9pump (Solana)
- [DEXScreener](https://dexscreener.com/solana/...): Live price chart and liquidity data

## Community

- [X / Twitter](https://x.com/OfficialApedDev): Official account
- [X Community](https://x.com/i/communities/...): Community hub
```

**Output:** Primary domain llms.txt + optional subdomain llms.txt files. Label each with scope (primary/subdomain) and update cadence.
