---
name: firecrawl
description: "Web scraping, crawling, and structured data extraction via Firecrawl MCP. Gives agents eyes on the internet."
---

# Firecrawl — Web Data Layer

Firecrawl gives agents the ability to scrape websites, crawl entire domains, extract structured data, and search the web. It's the "eyes and hands" of the agent stack.

> "Firecrawl is the AWS moment for web data. One API call replaces thousands of lines of scraper code." — Greg Isenberg

## Available MCP Tools

### firecrawl_scrape
Extract clean markdown or structured data from a single URL.

**Use for**: Competitor homepage analysis, reading a specific page, extracting product info.

```
Tool: firecrawl_scrape
Input: { "url": "https://example.com", "formats": ["markdown"] }
```

### firecrawl_map
Discover all URLs on a domain. Returns the full sitemap.

**Use for**: Site structure audits, finding all blog posts, mapping competitor content.

```
Tool: firecrawl_map
Input: { "url": "https://example.com" }
```

### firecrawl_crawl
Multi-page extraction. Crawls a site up to a limit and returns content for each page.

**Use for**: Full site content analysis, bulk competitor research, content inventory.

```
Tool: firecrawl_crawl
Input: { "url": "https://example.com", "limit": 10 }
```

### firecrawl_search
Web search with full content extraction (not just snippets).

**Use for**: Finding competitor pages, researching keywords, discovering niche content.

```
Tool: firecrawl_search
Input: { "query": "best DeFi yield farming Solana 2026" }
```

### firecrawl_agent
Complex multi-source research. Describe what data you need and the agent finds it.

**Use for**: Competitive intelligence, market research, data collection across multiple sites.

```
Tool: firecrawl_agent
Input: { "prompt": "Find all Solana DeFi projects launched in Q1 2026 with their TVL and token info" }
```

## Rate Limits (CRITICAL)

**Free plan — 500 credits total, 2 concurrent requests.**

| Operation | Cost |
|-----------|------|
| Scrape 1 page | 1 credit |
| Crawl 1 page | 1 credit per page crawled |
| Map 1 domain | 1 credit |
| Search 1 query | 1 credit |
| Agent 1 prompt | 5+ credits (varies) |

### Budget Rules

- **NEVER crawl more than 20 pages** in a single crawl operation
- **NEVER use firecrawl_agent** for simple tasks — use firecrawl_scrape or firecrawl_search instead
- **Prefer firecrawl_scrape** (1 credit) over firecrawl_crawl (N credits) when you only need specific pages
- **Use firecrawl_map first** (1 credit) to discover URLs, then scrape only the ones you need
- **Maximum 50 credits per campaign** — budget accordingly
- **If rate limited** (HTTP 429): wait 30 seconds, then retry once. If still limited, log BLOCKER and fall back to WebSearch.

### Credit Tracking

Before using Firecrawl, estimate the credit cost:
- Site audit: ~5 credits (1 map + 4 scrapes of key pages)
- Competitor analysis (3 competitors): ~15 credits (3 maps + 12 scrapes)
- Keyword research: ~5 credits (5 searches)
- Full campaign SEO work: ~30-40 credits total

Log credit usage in your issue comments so the board can track burn rate.

## Agent Workflows

### Hermes (SEO Specialist) — Primary user
1. **Technical audit**: `firecrawl_map` → get site structure → `firecrawl_scrape` key pages → analyze meta tags, schema, headings
2. **Competitor analysis**: `firecrawl_search` for top-ranking pages → `firecrawl_scrape` top 3 → extract their strategy
3. **Content gap analysis**: `firecrawl_map` client site → `firecrawl_map` competitor → compare URL structures
4. **AEO audit**: `firecrawl_scrape` client FAQ pages → check schema markup, structured data, citation-worthiness

### Calliope (Content Creator) — Secondary user
1. **Research**: `firecrawl_search` for topic → `firecrawl_scrape` top results → use as reference for content
2. **Competitor copy analysis**: `firecrawl_scrape` competitor homepage → analyze messaging, CTAs, structure

### Minerva (Marketing Strategist) — Occasional use
1. **Market landscape**: `firecrawl_search` for niche → assess competitive density
2. **Client website review**: `firecrawl_scrape` client URL → assess current state before strategy

## When Firecrawl is Unavailable

If FIRECRAWL_API_KEY is not set or credits are exhausted:
1. Fall back to `WebFetch` for single-page content (less clean, no structured extraction)
2. Fall back to `WebSearch` for discovery
3. Log a BLOCKER comment noting Firecrawl is unavailable
4. Mark any analysis as "limited — no Firecrawl access" in deliverables
