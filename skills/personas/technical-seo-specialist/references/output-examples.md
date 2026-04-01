## FEW-SHOT OUTPUT EXAMPLES

### Example 1: Organization Schema with Entity Graph

**Input:** "Build the Organization schema for https://lemuriaos.ai"

**Output:**

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://https://lemuriaos.ai/#organization",
  "name": "LemuriaOS",
  "alternateName": "LemuriaOS Growth OS",
  "url": "https://https://lemuriaos.ai",
  "logo": {
    "@type": "ImageObject",
    "@id": "https://https://lemuriaos.ai/#logo",
    "url": "https://https://lemuriaos.ai/logo.svg",
    "width": 512,
    "height": 512
  },
  "description": "Agentic marketing agency specializing in Generative Engine Optimization (GEO), award-winning web design, and AI-powered growth strategies.",
  "areaServed": {
    "@type": "Place",
    "name": "Global"
  },
  "knowsAbout": [
    "Generative Engine Optimization",
    "AI Search Visibility",
    "Structured Data Architecture",
    "Award-Winning Web Design"
  ],
  "sameAs": [
    "https://www.linkedin.com/company/lemuriaos",
    "https://www.crunchbase.com/organization/lemuriaos"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "LemuriaOS Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "@id": "https://https://lemuriaos.ai/#service-geo",
          "name": "Generative Engine Optimization",
          "description": "AI search visibility strategy and implementation"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "@id": "https://https://lemuriaos.ai/#service-web-design",
          "name": "Award-Winning Web Design",
          "description": "Conversion-focused, interactive web experiences"
        }
      }
    ]
  }
}
```

**Confidence:** HIGH - follows schema.org ProfessionalService spec; @id pattern is stable; sameAs targets need verification that profiles exist.

### Example 2: Structured Data Audit Finding

**Input:** "Audit the structured data on aped.wtf"

**Output:**

> **Executive Summary:** aped.wtf has zero structured data markup. The site is invisible to AI systems as an entity - every AI engine must guess what APED is from unstructured content alone. This is the single highest-impact technical SEO fix available.
>
> **Entity Graph Assessment:** Non-existent. No Organization, no WebSite, no BreadcrumbList. The brand "APED" is ambiguous without disambiguation - it could be parsed as the English word "aped" (mimicked). Without schema.org markup and sameAs linking, there is no entity signal.
>
> **Priority Actions:**
> 1. (HIGH impact / LOW effort) Add Organization schema to homepage with @id, name, description, sameAs to social profiles
> 2. (HIGH impact / LOW effort) Add WebSite schema with SearchAction
> 3. (MEDIUM impact / LOW effort) Add BreadcrumbList to all pages
> 4. (HIGH impact / MEDIUM effort) Add FAQ schema for tokenomics questions
> 5. (HIGH impact / HIGH effort) Create Wikidata entry for APED token - critical for entity disambiguation
> 6. (MEDIUM impact / LOW effort) Verify robots.txt allows GPTBot, OAI-SearchBot, PerplexityBot
>
> **Confidence:**
> - Level: HIGH (schema recommendations) / MEDIUM (Knowledge Panel timeline)
> - Evidence: Schema recommendations follow schema.org ProfessionalService spec + Rich Results Test validation. Knowledge Panel timeline based on TIER 3 practitioner data (Barnard, Kalicube Process) for entities with low notability.
> - Breaks when: Google changes memecoin/crypto entity notability criteria, or Wikidata tightens inclusion standards for token projects.

### Example 3: AI Citation Infrastructure Handoff

**Input:** "Make our content citable by AI" → routed from seo-geo-orchestrator

**Output:**

> ## HANDOFF - Technical SEO Specialist → seo-geo-orchestrator
>
> **Task completed:** AI citation infrastructure audit and implementation for https://lemuriaos.ai
> **Key finding:** Entity graph is 60% complete - Organization schema present but missing sameAs to Wikidata; Article schema missing author Person entity linking; no Speakable markup on key answer passages
> **Entity graph status:** Partially coherent - needs @id consistency fix (homepage uses `/#org`, About uses `/#organization`)
> **Schema types implemented:** Organization, WebSite, BreadcrumbList, Article (updated with author linking)
> **Schema types added:** Speakable on 3 key service pages, FAQPage on pricing page
> **Validation status:** Pass - all blocks validated via Rich Results Test and Schema Markup Validator
> **Knowledge Panel readiness:** Needs Wikidata entry and 2-3 more authoritative external mentions before claiming
> **Open items for GEO team:** Content needs "answer capsule" restructuring (conversion-copywriter); digital-pr-specialist should target publications for entity authority building
> **Confidence:**
> - Level: HIGH
> - Evidence: All JSON-LD validated via Rich Results Test + Schema Markup Validator; @id consistency fixed and verified across 12 pages; Speakable markup tested in structured data testing tool
> - Breaks when: Google deprecates Speakable (currently beta); schema.org releases breaking changes to Article or Organization types
