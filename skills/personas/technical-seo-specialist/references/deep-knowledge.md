## DEEP EXPERT KNOWLEDGE

### The Entity-Structured Data-Knowledge Graph Stack

Three layers build on each other. Each is a prerequisite for the next.

**Layer 1: Schema.org Markup (Page-Level)**
Individual pages carry JSON-LD that declares what the page is about, what entities it contains, and how they relate. This is the atomic unit. Without it, AI systems must infer - and inference introduces error.

**Layer 2: Entity Graph (Site-Level)**
Connected `@id` references across pages form a coherent entity graph - your site's own knowledge graph. The Organization entity on the homepage references the same `@id` as the author's `worksFor` on a blog post. The Product on a product page references the same Brand `@id` used site-wide. Consistency is everything.

**Layer 3: Knowledge Graph (Web-Level)**
`sameAs` links connect your site's entity graph to the broader web of knowledge - Wikidata Q-IDs, Wikipedia, LinkedIn, Crunchbase, Google Knowledge Graph. This is where entity disambiguation happens. An Organization with `sameAs` pointing to its Wikidata entry is unambiguous to any machine. Without it, "LemuriaOS" could be a vitamin supplement or a geometry term.

### JSON-LD Architecture Patterns

#### The @id System - Foundation of Entity Graphs

`@id` assigns a stable URI to a schema node, enabling cross-page entity references.

**Rules:**
- Format: canonical URL + hash fragment - `https://example.com/#organization`
- Use descriptive fragments: `#organization`, `#founder`, `#product-blue-shirt` (not `#id1`)
- `@id` values are permanent - never use dynamic components (session IDs, timestamps)
- Include both `@id` and `url` on every entity (search engines process pages individually)
- Identical `@id` values across pages are NOT automatically merged by search engines - reinforce with internal HTML links

#### Nested Entity Graphs

Nested JSON-LD embeds child entities within parent entities to explicitly define relationships. This is critical for GraphRAG systems (Edge et al., arXiv:2404.16130, Microsoft Research, 2024).

**Why nesting matters for AI:**
- Enables multi-hop reasoning - AI can traverse defined edges deterministically
- Reduces hallucination by providing explicit ontological structure
- A vector-based system understands "researcher," "university," and "city" are semantically related but lacks the structure to state the researcher is *employed by* the university which is *located in* the city
- Nested JSON-LD provides this immutable structure

**Pattern - Organization with nested entities:**

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://https://lemuriaos.ai/#organization",
  "name": "LemuriaOS",
  "url": "https://https://lemuriaos.ai",
  "logo": "https://https://lemuriaos.ai/logo.svg",
  "description": "Agentic marketing agency specializing in GEO and award-winning web design",
  "sameAs": [
    "https://www.linkedin.com/company/lemuriaos",
    "https://www.crunchbase.com/organization/lemuriaos"
  ],
  "founder": {
    "@type": "Person",
    "@id": "https://https://lemuriaos.ai/#founder",
    "name": "Bas",
    "worksFor": { "@id": "https://https://lemuriaos.ai/#organization" }
  },
  "areaServed": {
    "@type": "Place",
    "name": "Global"
  },
  "knowsAbout": [
    "Generative Engine Optimization",
    "Structured Data",
    "AI Search Visibility"
  ]
}
```

#### Entity Linking via sameAs

The `sameAs` property connects your entity to authoritative external definitions. Priority order for maximum disambiguation:

1. **Wikidata Q-ID** - `https://www.wikidata.org/wiki/Q12345` - the canonical machine-readable entity identifier
2. **Wikipedia** - `https://en.wikipedia.org/wiki/Entity_Name` - highest authority signal for Knowledge Panels
3. **LinkedIn** - company or person profile
4. **Crunchbase** - for organizations (carries Bloomberg, SEC cross-references)
5. **Official social profiles** - Twitter/X, GitHub, YouTube

**Why Wikidata matters:** Wikidata Q-IDs are unique identifiers carrying multilingual labels, property statements, and external identifiers that tie to Google's Knowledge Graph IDs, Crunchbase UUIDs, SEC CIKs. Wikidata inclusion criteria are looser than Wikipedia's - entities that are "notable" or needed to augment existing content qualify.

#### Token / Crypto Project Schema

schema.org has no native `CryptoCurrency` or `Token` type. Use `Organization` as the entity anchor for token projects with the following adaptations:

- **Description field is critical.** For invented-word brands (APED, BONK, WIF), the `description` property is the primary entity declaration - it must contain category, chain, and community type because LLMs have zero pre-existing entity to work with. "Memecoin community project on Solana" is too thin. "APED is a community-driven memecoin on the Solana blockchain, built around the blue-shirt ape meme identity with a PFP generator and creator culture brand" gives LLMs enough to disambiguate.
- **sameAs array - crypto equivalents.** Standard sameAs priority (Wikidata, Wikipedia, LinkedIn, Crunchbase) does not apply - most tokens have none of these. Instead use: X/Twitter profile, DEXScreener chart URL, block explorer contract page (Solscan, Etherscan), community links (Discord, Telegram). These are the crypto equivalent of institutional authority signals.
- **No Wikidata/Crunchbase.** For most token projects, the Organization schema IS the primary entity declaration. Make the description field do maximum entity-building work - it's the only structured entity claim that exists.
- **FAQPage schema - minimum 6 questions.** Cover: what the token is, how to buy, team/governance, legitimacy/transparency, price tracking, and unique features/tools. All answers must pass the out-of-context test - informational-first, brand-voice-second.
- **HowTo schema for onboarding.** "How to buy [token]" is the highest-intent crypto query. Map the buy flow to HowTo steps (wallet → fund → chart → swap). Include URLs to wallet providers, DEX, and chart tools.
- **`@graph` pattern recommended.** Bundle Organization + WebSite + FAQPage + HowTo in a single `@graph` array on the homepage. This creates a coherent entity graph from a single injection point.

### Schema Types - Priority Implementation Guide

#### Tier 1: Every Site Must Have

| Schema Type | Where | Purpose |
|------------|-------|---------|
| `Organization` / `LocalBusiness` | Homepage, About page | Brand entity definition; Knowledge Panel trigger |
| `WebSite` | Homepage | Site-level entity; SearchAction for sitelinks |
| `BreadcrumbList` | All pages | Navigation hierarchy; SERP breadcrumbs |
| `WebPage` / `AboutPage` / `ContactPage` | Respective pages | Page type classification |

#### Tier 2: Content & Authority

| Schema Type | Where | Purpose |
|------------|-------|---------|
| `Article` / `NewsArticle` / `BlogPosting` | Blog, news, editorial | Content type; author linking; datePublished/Modified |
| `Person` | Author pages, team pages | Author entity; E-E-A-T credentials; Knowledge Panel |
| `FAQPage` | FAQ sections on key pages | Direct answer extraction by AI; rich results (health/gov only on Google, still universal on Bing) |
| `HowTo` | Tutorial/guide content | Step extraction by AI (rich results removed on Google desktop Sept 2023, still parsed by AI systems) |
| `Speakable` | Key definitions, answer passages | Voice search / TTS eligibility; AI quote extraction (beta) |

#### Tier 3: E-Commerce

| Schema Type | Where | Purpose |
|------------|-------|---------|
| `Product` + `Offer` | Product pages | Price, availability, merchant listings |
| `AggregateRating` + `Review` | Product pages with reviews | Star ratings; trust signals; ChatGPT Shopping |
| `Brand` | Product schema nesting | Brand disambiguation in product search |
| `ItemList` | Collection/category pages | Product listing structure |

#### Tier 4: Specialized

| Schema Type | Where | Purpose |
|------------|-------|---------|
| `Event` | Event listings | Date, location, ticketing rich results |
| `Service` | Service pages | Service type declaration for local/professional |
| `Dataset` | Data-heavy pages | Google Dataset Search discoverability |
| `SoftwareApplication` | App/tool pages | App metadata and ratings |

### Deprecated / Removed Schema (Do NOT Recommend for Rich Results)

As of February 2026, Google has removed rich result support for:

- **HowTo** - desktop rich results removed September 2023 (still indexable, still parsed by AI - just no visual SERP enhancement)
- **FAQPage** - restricted to government and health authority websites only (August 2023). However: Bing still supports FAQ rich results universally, and AI systems still parse FAQ schema regardless of Google's visual restriction
- **Book Actions, Course Info, Claim Review, Estimated Salary, Learning Video, Special Announcement, Vehicle Listing** - removed June 2025
- **Practice Problems, Math Solvers, Q&A, Dataset visual display** - removed January 2026
- **Sitelinks Search Box** - deprecated November 2024

**Critical distinction:** Google stated these removals are "purely visual/functional, not algorithmic" - they do not affect ranking. And AI systems (ChatGPT, Perplexity, Claude) still parse and benefit from these schema types even when Google no longer shows rich results.

### AI Crawler Landscape - robots.txt Configuration

Every site must be configured to allow AI crawlers that feed citation systems:

| Bot | User Agent | Purpose | Block? |
|-----|-----------|---------|--------|
| **Googlebot** | Googlebot | Google Search + AI Overviews | Never block |
| **Bingbot** | bingbot | Bing Search + Copilot; upstream for ChatGPT + Claude | Never block |
| **GPTBot** | GPTBot/1.1 | OpenAI model training data | Block only if you don't want content in training data |
| **OAI-SearchBot** | OAI-SearchBot/1.0 | ChatGPT Search index | Never block if you want ChatGPT citations |
| **ChatGPT-User** | ChatGPT-User/1.0 | Real-time ChatGPT browsing | Cannot reliably block (modified robots.txt compliance) |
| **PerplexityBot** | PerplexityBot/1.0 | Perplexity indexing | Never block if you want Perplexity citations |
| **ClaudeBot** | ClaudeBot | Anthropic training data | Block only if needed |

**Recommended robots.txt block for maximum AI visibility:**

```
User-agent: *
Allow: /

# Explicitly allow all AI crawlers
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

Sitemap: https://example.com/sitemap.xml
```

### How Structured Data Feeds AI Citation

The research evidence for why structured data drives AI citation:

**1. LLMs understand HTML structure (HIGH confidence - peer-reviewed)**
Tan et al. (arXiv:2411.02959, 2024) demonstrated that converting HTML to plain text loses structural and semantic information. LLMs benefit from headings, tables, and markup. JSON-LD provides the highest-fidelity machine-readable layer.

**2. Knowledge graphs reduce hallucination (HIGH confidence - peer-reviewed)**
Lavrinovics et al. (arXiv:2411.14258, 2024) showed that KGs provide structured factual context that fills gaps in LLM understanding, directly mitigating hallucination. Sites with coherent entity graphs give AI systems verified facts to cite.

**3. Microsoft confirms schema helps LLMs (HIGH confidence - official statement)**
Fabrice Canel at SMX Munich (March 2025): "Schema markup helps Microsoft's LLMs understand content." Sites with structured data see up to 30% higher visibility in Copilot AI overviews.

**4. GraphRAG transforms retrieval quality (HIGH confidence - peer-reviewed)**
Edge et al. (arXiv:2404.16130, Microsoft Research, 2024) demonstrated that knowledge graph structures improve RAG comprehensiveness and diversity. Your site's entity graph is the input to these systems.

**5. GEO visibility boost (HIGH confidence - peer-reviewed, KDD 2024)**
Aggarwal et al. (arXiv:2311.09735) demonstrated up to +40% visibility improvement for GEO-optimized content. Adding citations, statistics, and structured quotable passages are the highest-impact strategies.

**6. Entity disambiguation improves LLM accuracy (HIGH confidence - peer-reviewed)**
ISWC 2024 paper (arXiv:2505.02737) showed KGs as external knowledge significantly improve zero-shot entity disambiguation in LLMs, using Wikidata taxonomy for hierarchical class representation.

### Entity Structured Data Readiness - Domain State Model

Every site progresses through 5 states. Each state has explicit entry conditions, verification methods, and common blockers. Use this model to diagnose where a site is and what it needs next.

**STATE:** no-markup → basic-schema → entity-graph → knowledge-graph → ai-cited

| State | Entry Conditions | Verification | Common Blockers | Next Trigger |
|-------|-----------------|--------------|-----------------|--------------|
| **no-markup** | No JSON-LD, Microdata, or RDFa detected on crawl | Rich Results Test returns empty for all tested pages | N/A - starting state | Any valid schema implementation |
| **basic-schema** | Individual pages carry valid JSON-LD (Organization, WebSite, BreadcrumbList) | Rich Results Test shows eligible types; Schema Markup Validator passes | Missing @id, no entity nesting, overly generic @type (Thing, LocalBusiness when Restaurant applies) | @id assignment + cross-page entity linking |
| **entity-graph** | Connected @id references across pages; nested entities; site-level coherence | Manual @id registry check - every entity referenced by ≥1 other entity; no orphan nodes | Inconsistent @id URIs across pages, flat schema without nesting, orphan entities | sameAs linking to external authorities |
| **knowledge-graph** | sameAs connects site entities to Wikidata, Wikipedia, Crunchbase; entity disambiguation achieved | Google Knowledge Graph API returns entity; Wikidata entry verified with references | Missing Wikidata entry, insufficient independent external mentions, ambiguous entity name | Knowledge Panel claim + AI crawler access verification |
| **ai-cited** | Entity appears in AI Overviews, ChatGPT, Perplexity responses with correct attribution | Manual spot-check across 3+ AI systems; Speakable markup validated; dateModified current | Blocked AI crawlers in robots.txt, missing answer capsules, stale dateModified | Ongoing: maintain freshness, monitor citation accuracy, update schema on content changes |

**Regression triggers:** Schema validation errors demote entity-graph → basic-schema. Broken sameAs links demote knowledge-graph → entity-graph. Blocked AI crawlers demote ai-cited → knowledge-graph.

### The Knowledge Panel Pipeline

Getting a Knowledge Panel is the ultimate proof of entity recognition. The pipeline:

**Phase 1: Entity Foundation (Month 1-2)**
- Implement Organization/Person schema with comprehensive properties
- Create Wikidata entry (looser criteria than Wikipedia)
- Ensure consistent NAP and brand details across all platforms
- `sameAs` linking to all authoritative profiles

**Phase 2: External Validation (Month 2-6)**
- Earn mentions in authoritative publications (digital-pr-specialist handoff)
- Wikipedia page if the entity meets notability criteria (significant coverage in reliable, independent secondary sources)
- Crunchbase, Bloomberg, G2, industry directories
- Consistent brand imagery across all platforms

**Phase 3: Verification (Month 6+)**
- Search for entity, find Knowledge Panel, claim it
- Prove admin access to 2-5 official sites/profiles
- Google may request government-issued ID + live selfie
- After verification: suggest edits, manage panel content

**Timeline reality:** 3 months for Wikidata-driven panels for smaller entities; 6-18 months for full Google Knowledge Panels with Wikipedia backing for organizations. Corporate Knowledge Panel cards (new in 2025) now appear for companies, not just people.

---
