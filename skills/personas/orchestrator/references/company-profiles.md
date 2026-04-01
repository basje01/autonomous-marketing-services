# Company Profiles - Orchestrator Reference

> Extracted from orchestrator SKILL.md for maintainability.
> These profiles drive routing decisions, brand voice enforcement, and data policy compliance.
> For full client project management, see `clients/` directory manifests.

---

## ICM Analytics

```
┌─────────────────────────────────────────────────────────────┐
│ ICM Analytics                                               │
├─────────────────────────────────────────────────────────────┤
│ Website: icm-analytics.com                                  │
│ Industry: Crypto/DeFi Fundamentals Analytics                │
│ Voice: Authoritative, data-driven, trustworthy              │
│ Owner: Janssen                                              │
│                                                             │
│ DATA INFRASTRUCTURE:                                        │
│ ├── 90% On-chain data (primary source)                      │
│ ├── Blockworks (scraped - news/research)                    │
│ └── Variable useful sources (scraped)                       │
│                                                             │
│ ⚠️ CRITICAL POLICY:                                         │
│ • NEVER use DefiLlama for revenue/fee data                  │
│ • Their methodology is unreliable                           │
│ • ICM builds own analysis from on-chain sources             │
│ • This IS the competitive advantage                         │
│                                                             │
│ BRAND RULES:                                                │
│ • Fundamentals over hype                                    │
│ • Traditional finance methodology                           │
│ • Never make price predictions                              │
│ • Always cite data sources                                  │
│                                                             │
│ 🛠️ TECH STACK PREFERENCES:                                  │
│ ├── Frontend: Svelte + Vite (NOT Next.js by default)        │
│ ├── Backend: Python FastAPI (data pipelines)                │
│ ├── Database: PostgreSQL (Supabase/Neon)                    │
│ ├── Cache: Redis                                            │
│ ├── Infra: Railway/Render (managed, scale-to-zero)          │
│ └── Philosophy: Boring tech, one-man scalable               │
│                                                             │
│ WHY NOT NEXT.JS:                                            │
│ • Dev server slow, debugging painful                        │
│ • Svelte + Vite is milliseconds, not seconds                │
│ • Less complexity for one-man operation                     │
│ • Use Next.js ONLY if SEO-critical public pages             │
└─────────────────────────────────────────────────────────────┘
```

---

## Ashy & Sleek

```
┌─────────────────────────────────────────────────────────────┐
│ Ashy & Sleek                                                │
├─────────────────────────────────────────────────────────────┤
│ Website: ashysleek.com                                      │
│ Industry: Artisanal Luxury Home Goods                       │
│ Voice: Warm, sophisticated, story-driven                    │
│ Owner: Özlem                                                │
│                                                             │
│ SALES CHANNELS:                                             │
│ ├── ashysleek.com (Shopify B2C - primary, highest margin)   │
│ ├── Etsy (marketplace B2C - artisan audience)               │
│ ├── Faire (B2B wholesale - US/UK/EU retailers)              │
│ └── Orderchamp (B2B wholesale - European retailers)         │
│                                                             │
│ PRODUCTS:                                                   │
│ ├── Marble accessories (€60-300)                            │
│ ├── Woven throws/textiles (€120-400)                        │
│ └── Organic kimonos (€150-300)                              │
│                                                             │
│ BRAND RULES:                                                │
│ • Lead with story and craft                                 │
│ • Dutch-Turkish heritage angle                              │
│ • Heirloom quality positioning                              │
│ • NEVER aggressive discounting                              │
│ • NEVER generic product descriptions                        │
│                                                             │
│ 🛠️ TECH STACK:                                              │
│ ├── Shopify (primary storefront - don't fight it)           │
│ ├── Custom tools: Svelte + Vite if needed                   │
│ ├── Marketing site: Astro (if separate from Shopify)        │
│ └── Internal tools: HTMX or simple HTML                     │
└─────────────────────────────────────────────────────────────┘
```

---

## LemuriaOS

```
┌─────────────────────────────────────────────────────────────────┐
│ LemuriaOS - The AI Distribution Agency                            │
├─────────────────────────────────────────────────────────────────┤
│ Website: https://lemuriaos.ai                                             │
│ Industry: AI Visibility / GEO Services                          │
│ Voice: Expert, results-driven, transparent, no-BS               │
│                                                                 │
│ CORE SERVICES:                                                  │
│ ├── 30-Day Free Trial ($0)                                      │
│ │   └── Full audit + baseline + 5-page optimization             │
│ │   └── No improvement = walk away, $0                          │
│ ├── Performance Pricing (post-trial)                            │
│ │   └── No improvement: $2,500/mo (base only)                   │
│ │   └── +10-25%: $5,000/mo                                      │
│ │   └── +25-50%: $7,500/mo                                      │
│ │   └── +50-100%: $12,500/mo                                    │
│ │   └── +100%+: $20,000/mo                                      │
│ └── Enterprise: Custom pricing (3+ domains)                     │
│                                                                 │
│ PRICING PHILOSOPHY:                                             │
│ "We win when you win. No results, no charge."                   │
│                                                                 │
│ KEY DIFFERENTIATORS:                                            │
│ • Methodology based on actual AI system behavior                │
│ • Measurable citation metrics (not vanity metrics)              │
│ • Technical + content expertise combined                        │
│ • Transparent reporting and results                             │
│                                                                 │
│ BRAND RULES:                                                    │
│ • Lead with data and research                                   │
│ • Never promise specific ranking outcomes                       │
│ • Always cite sources for claims                                │
│ • Use case studies with real metrics                            │
│ • No hype, no buzzword bingo                                    │
│                                                                 │
│ 🛠️ TECH STACK:                                                  │
│ ├── Website: Static HTML/Astro (speed + SEO)                    │
│ ├── Dashboard: Svelte + Vite                                    │
│ ├── Backend: Python FastAPI                                     │
│ ├── Database: PostgreSQL (Supabase)                              │
│ ├── Monitoring: Custom citation tracking                        │
│ └── Infra: Railway/Vercel                                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## Kenzo (APED)

```
┌─────────────────────────────────────────────────────────────┐
│ Kenzo - APED Memecoin                                       │
├─────────────────────────────────────────────────────────────┤
│ Website: aped.wtf                                           │
│ Industry: Memecoin / Crypto                                 │
│ Voice: Bold, irreverent, community-driven, meme culture     │
│ Owner: Kenzo                                                │
│                                                             │
│ PROJECTS:                                                   │
│ ├── aped.wtf (memecoin website - Next.js + Tailwind)        │
│ └── PFP Generator (planned - character customizer)          │
│                                                             │
│ BRAND RULES:                                                │
│ • "Ape in" energy - bold, fun, unapologetic                 │
│ • Community-first messaging                                 │
│ • Meme-native visual language                               │
│ • NEVER corporate tone                                      │
│                                                             │
│ 🛠️ TECH STACK:                                              │
│ ├── Frontend: Next.js + Tailwind CSS                        │
│ ├── Hosting: Self-hosted (home server)                      │
│ └── Domain: aped.wtf                                        │
│                                                             │
│ NOTE: First paid client ($300)                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Wetland

```
┌─────────────────────────────────────────────────────────────┐
│ Wetland - Camping & Holiday Park                            │
├─────────────────────────────────────────────────────────────┤
│ Website: wetland.nl                                         │
│ Industry: Hospitality - Camping & Holiday Park              │
│ Voice: Warm, welcoming, nature-focused, family-friendly     │
│ Location: Asten, Brabant-Limburg, Netherlands               │
│                                                             │
│ SALES CHANNELS:                                             │
│ ├── wetland.nl (direct booking - primary, highest margin)   │
│ ├── Booking.com (OTA - international reach)                 │
│ └── ACSI / Campingcard (camping-specific audience)          │
│                                                             │
│ PRODUCTS:                                                   │
│ ├── Camping pitches (seasonal)                              │
│ ├── Caravans / mobile homes (seasonal)                      │
│ ├── Holiday cottages (seasonal)                             │
│ └── Café                                                    │
│                                                             │
│ BRAND RULES:                                                │
│ • Nature and tranquility positioning                        │
│ • Family-friendly, pet-friendly emphasis                    │
│ • Brabant / Peelgebied regional identity                    │
│ • NEVER corporate tone                                      │
│ • NEVER discount-led messaging                              │
│                                                             │
│ MULTI-LANGUAGE:                                             │
│ ├── NL: Primary (domestic market)                           │
│ ├── DE: Cross-border tourists (Aachen/Düsseldorf)           │
│ ├── EN: International visitors                              │
│ └── FR: Belgian tourists                                    │
│                                                             │
│ 🛠️ TECH STACK:                                              │
│ ├── CMS: WordPress (verify)                                 │
│ ├── OTA: Booking.com, ACSI                                  │
│ ├── Reviews: Google, Booking.com, ACSI, Zoover, TripAdvisor │
│ └── SEO: Local SEO focus (camping Brabant, vakantiepark)    │
│                                                             │
│ SEASONALITY:                                                │
│ • High season: May-September                                │
│ • Key queries: camping Brabant, vakantiepark Limburg,       │
│   camping met hond, familiecamping Noord-Brabant            │
└─────────────────────────────────────────────────────────────┘
```

---

## Intel Hub

```
┌─────────────────────────────────────────────────────────────┐
│ Intel Hub - AI Intelligence App (Internal)                  │
├─────────────────────────────────────────────────────────────┤
│ API: https://46.225.228.158:3002/api/intel/* (domain TBD)   │
│ Industry: Internal Tooling - AI Industry Intelligence       │
│ Voice: Technical, precise, internal-only                    │
│ Status: Active (internal LemuriaOS project)                   │
│                                                             │
│ ARCHITECTURE:                                               │
│ ├── iOS App: Native SwiftUI                                 │
│ ├── Backend API: Next.js standalone (Hetzner VPS-4)         │
│ ├── Database: SQLite                                        │
│ └── Sources: 20+ RSS feeds, arXiv, GitHub releases          │
│                                                             │
│ BRAND RULES:                                                │
│ • Internal tool - NEVER expose to external users            │
│ • Functional UI over aesthetics                             │
│ • Fast iteration, minimal dependencies                      │
│                                                             │
│ 🛠️ TECH STACK:                                              │
│ ├── iOS: SwiftUI + Swift 6                                  │
│ ├── API: Next.js API routes (/api/intel/*)                  │
│ ├── Database: SQLite (file-based, no external DB)           │
│ ├── Feed ingestion: RSS parser + cron                       │
│ └── Hosting: https://lemuriaos.ai (existing Vercel deployment)        │
└─────────────────────────────────────────────────────────────┘
```

---

## Agent Finance

```
┌─────────────────────────────────────────────────────────────┐
│ Agent Finance - Autonomous Financial Agents                 │
├─────────────────────────────────────────────────────────────┤
│ Industry: DeFi / Autonomous Finance                         │
│ Voice: Technical, precise, crypto-native                    │
│ Status: Exploration                                         │
│                                                             │
│ INFRASTRUCTURE:                                             │
│ ├── Payments: x402 (Coinbase, HTTP-native USDC)             │
│ ├── Identity: ERC-8004 (onchain agent identity/reputation)  │
│ ├── Wallets: Coinbase Agentic Wallets (AWAL)                │
│ ├── Lending: Aave, Morpho, Compound                         │
│ ├── DEX: Uniswap                                            │
│ ├── Yield: Yearn, Sommelier                                 │
│ └── RWA: Ondo, Backed, Superstate                           │
│                                                             │
│ BRAND RULES:                                                │
│ • Crypto-native institutions, not TradFi wrappers           │
│ • Composability over single-protocol optimization           │
│ • Auditable onchain decision-making                         │
│ • NEVER deploy real capital without human-approved limits    │
│                                                             │
│ 🛠️ TECH STACK (TBD - exploration stage):                    │
│ ├── Agent framework: LemuriaOS orchestrator patterns          │
│ ├── Smart contracts: Solidity (EVM)                         │
│ ├── Data: Python (on-chain pipelines)                       │
│ └── Monitoring: Custom yield/risk dashboards                │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Policies by Company

```
ICM ANALYTICS:
├── On-chain data: PRIMARY SOURCE (90%)
├── Blockworks: Supplementary (scraped)
├── DefiLlama: NEVER for revenue data
├── CoinGecko: OK for prices
└── Variable sources: Verify each

ASHY & SLEEK:
├── Shopify Analytics: Primary
├── Etsy Dashboard: Platform-specific
├── Faire Analytics: B2B metrics
├── Orderchamp: B2B metrics
└── Google Analytics: Cross-platform

LemuriaOS:
├── Citation tracking data: Primary
├── Client audit results: Per-client isolated
├── AI system responses: Verified citations only
├── Competitor data: Anonymized if shared
└── Client data: NEVER shared between clients

KENZO:
├── On-chain token data: DexScreener, Birdeye
├── Social sentiment: Twitter/X mentions
└── Community metrics: Telegram, Discord

WETLAND:
├── Google Business Profile: Primary (local SEO)
├── Booking.com analytics: Occupancy, reviews
├── ACSI/Zoover/TripAdvisor: Review monitoring
├── Google Analytics: Cross-platform traffic
└── Google Search Console: Local search performance

INTEL HUB:
├── RSS feeds: 20+ AI industry sources
├── arXiv: Research paper tracking
├── GitHub: Release monitoring
└── Internal only - NO external data sharing

AGENT FINANCE:
├── On-chain data: PRIMARY SOURCE (Ethereum/Solana RPC)
├── ERC-8004 registries: Agent identity + reputation
├── x402 transaction data: Payment verification
├── DefiLlama: TVL discovery only, NOT for revenue
├── CoinGecko: OK for prices
└── Protocol governance: On-chain proposals + voting data
```

## Company Data Isolation

```
NEVER mix company data:
├── ICM Analytics data stays in ICM context
├── Ashy & Sleek data stays in A&S context
├── LemuriaOS data stays in LemuriaOS context
├── LemuriaOS client data NEVER shared between clients
├── Kenzo data stays in Kenzo context
├── Wetland data stays in Wetland context
├── Intel Hub data stays in Intel Hub context (internal only)
├── Agent Finance data stays in agent-finance context
├── No cross-contamination of strategies
├── No leaking of competitive information
└── Different data policies respected
```

---

## Tech Stack Routing

```
WHEN request involves frontend/fullstack:

FOR ICM ANALYTICS:
├── Dashboard/UI → Fullstack Engineer (Svelte + Vite)
├── Data visualization → Fullstack Engineer + Image Guru
├── API → Python Engineer (FastAPI)
├── Database → Database Architect (PostgreSQL/Supabase)
├── Data pipelines → Data Engineer (dbt, Airflow)
├── Marketing site → Fullstack Engineer (Astro)
├── Internal tools → Fullstack Engineer (HTMX)
├── Protocol analysis → Analytics Expert + Knowledge Curator
├── Security audit → Security Check
├── Use Next.js ONLY IF: SEO-critical public pages
└── ALWAYS: Prefer fast dev server, simple debugging

FOR ASHY & SLEEK:
├── Main store → Shopify (don't fight it)
├── Custom landing pages → Fullstack Engineer (Astro)
├── Internal tools → Fullstack Engineer (HTMX)
├── Complex app (if ever) → Fullstack Engineer (Svelte)
├── Email flows → Email Marketing Specialist (Klaviyo)
├── Product images → Image Guru
├── AI shopping optimization → AI Commerce Specialist
└── NEVER: Rebuild what Shopify does

FOR LemuriaOS:
├── Website → Fullstack Engineer (Astro - speed + SEO)
├── Client dashboard → Fullstack Engineer (Svelte + Vite)
├── Citation tracking → Data Engineer + Python Engineer
├── API → Python Engineer (FastAPI)
├── Database → Database Architect (PostgreSQL/Supabase)
├── Client reports → Analytics Expert
├── Infra → DevOps Engineer (Railway/Vercel)
└── ALWAYS: Measurable, no vanity metrics

FOR KENZO:
├── aped.wtf → Fullstack Engineer (Next.js + Tailwind)
├── PFP Generator → Fullstack Engineer (Next.js) + Image Guru + APED PFP Prompt Engineer
├── Token analytics → Memecoin Website Expert
├── Social presence → Token Social Expert
└── Marketing → Marketing Guru + Memecoin Website Expert

FOR WETLAND:
├── Website SEO → Site Scanner + Local SEO Specialist
├── Content → Content Orchestrator (multi-language NL/DE/EN/FR)
├── Local SEO → Local SEO Specialist (GBP, citations, reviews)
├── Review management → Local SEO Specialist
├── Technical SEO → Technical SEO Specialist
└── ALWAYS: Multi-language considerations, seasonal adjustments

FOR INTEL HUB:
├── iOS app → iOS Engineer (SwiftUI + Swift 6)
├── iOS design → iOS App Designer
├── UX audit → UX Auditor
├── Backend API → Fullstack Engineer (Next.js /api/intel/*)
├── Feed ingestion → Data Engineer + Backend Engineer
└── ALWAYS: Internal tool - no external-facing requirements

FOR AGENT FINANCE:
├── Payment protocol → x402 Expert (HTTP-native USDC payments)
├── Agent identity → ERC-8004 Expert (onchain identity/reputation)
├── Protocol analytics → Analytics Expert + Data Engineer
├── Security assessment → Security Check (smart contract + wallet)
├── On-chain data → Scraping Specialist + Data Engineer
├── Market intelligence → Token Social Expert
├── Multi-agent coordination → Orchestrator
└── ALWAYS: On-chain primary data, never trust aggregators for revenue

TRIGGERS FOR STACK DISCUSSION:
├── "build a dashboard" → Fullstack Engineer (Svelte + Vite)
├── "create a web app" → Ask: "What kind?" then route
├── "need a frontend" → Check company profile first
├── "React" or "Next.js" → Question if actually needed
├── "website" → Fullstack Engineer (Astro) unless dynamic app needed
├── "data pipeline" → Data Engineer
├── "database" → Database Architect
├── "security check" → Security Check
└── "memecoin" or "token site" → Memecoin Website Expert
```

### Stack Selection Questions

```
BEFORE choosing a framework, ask:

1. Is this a one-man operation? → Simpler is better
2. How fast do I need to iterate? → Svelte/Vite wins
3. Do I need SSR/SEO? → Maybe Astro, maybe SvelteKit
4. Is it an internal tool? → HTMX or plain HTML
5. Will I maintain this in 6 months? → Less magic is better
6. What does the company profile say? → Follow it
```

### Override Claude's Default Biases

```
CLAUDE DEFAULTS TO:          OVERRIDE WITH:
├── React + Next.js    →     Svelte + Vite (for ICM)
├── Complex setups     →     Boring, simple tech
├── Popular choices    →     Optimal choices
└── Kitchen sink       →     Minimal dependencies

BEFORE suggesting any frontend framework:
1. CHECK company profile for stack preferences
2. QUESTION if Next.js is actually needed
3. DEFAULT to simpler option (Svelte, Astro, HTMX)
```
