---
name: distribution-playbooks
description: "7 distribution strategies for crypto projects. Executable playbooks mapped to agent roles."
---

# Distribution Playbooks

> Source: Greg Isenberg, Startup Ideas Podcast (2026-03-30)
> Core thesis: "Code used to be the moat. Distribution is the new moat. AI can't build distribution. Product is commoditized, code is fully commoditized."
> Rule: Pick 2 strategies. Start this week. Don't just vibe code — get customers.

## Strategy 1: MCP Server as Sales Channel

**Agents**: Athena (technical spec), Calliope (registry listing copy)
**When to recommend**: SaaS/tool products, projects with a clear "question they answer"

### Playbook

1. Identify the question the client's product answers (e.g. "What's the best DEX on Solana?")
2. Design an MCP server that returns structured data answering that question
3. Vibe code it in 24 hours or less
4. Publish to MCP registries: Smithery, MCPT, OpenTools
5. Every AI assistant that connects to the server is now selling 24/7
6. Monitor installations and iterate on the data quality

### Key Insight

"Building an MCP server in 2026 is like building for mobile in 2010." — 150+ installations in 30 days, $0 ad spend (FinTech case study).

### Deliverables

- MCP server specification document (what question, what data, what format)
- Registry listing copy (optimized for discovery)
- Installation tracking plan

---

## Strategy 2: Programmatic SEO (10K Pages)

**Agents**: Athena (SEO architecture + keyword patterns), Calliope (unique content per page)
**When to recommend**: Any project — especially directories, comparisons, chain-specific tools

### Playbook

1. Pick a keyword pattern: "best [X] for [Y]" or "[service] in [chain/city]"
   - Crypto examples: "best yield farming on Solana", "DEX comparison 2026", "NFT marketplace for [niche]"
2. Build dataset using Firecrawl or existing APIs (DeFiLlama, CoinGecko, on-chain data)
3. Create a page template in Next.js or Astro
4. Generate unique AI content per page — actual paragraphs, not variable swaps
5. Human-in-the-loop quality check on first batch
6. Publish 100 pages as MVP → monitor indexation → scale to 10K

### Math

- 10K pages x 30 visits/mo = 300K monthly visitors
- 2% conversion = 6K conversions/mo
- At $10 each = $60K/mo from pages built once

### Deliverables

- Keyword pattern research (20-30 patterns with volume estimates)
- Page template design
- Content generation prompts (non-generic, citation-worthy)
- 100-page MVP deployment plan

---

## Strategy 3: Free Tool as Top-of-Funnel

**Agents**: Minerva (strategy + prioritization), all agents contribute to execution
**When to recommend**: Always — universal strategy

### Playbook

1. Brainstorm 10 free tool ideas: grader, analyzer, calculator, audit, checker
2. Prioritize by: ease of build, shareability, upsell potential
3. Build with Claude Code / vibe code — ship by lunch
4. Hook flow: user enters data → gets score/result → captures email → shares result → viral loop → upsell to paid product
5. Create a "free tool calendar" — one tool per week or month

### Crypto-Specific Examples

- Token launch readiness grader
- Smart contract audit scorer
- Community health analyzer (Discord/Telegram metrics)
- Tokenomics calculator / simulator
- Wallet portfolio performance card
- DeFi yield optimizer comparison tool

### Key Insight

"The tool IS the marketing." Old approach: build product, then try marketing. New approach: build the free tool first, it markets itself forever. Like Ahrefs' free backlink checker that hooks users into the $100/mo product.

### Deliverables

- 10 free tool concepts ranked by impact
- Wireframe for top pick
- Landing page copy
- Email capture flow design

---

## Strategy 4: Answer Engine Optimization (AEO)

**Agents**: Athena (technical SEO + schema markup), Calliope (structured answers)
**When to recommend**: Any project wanting AI-driven discovery

### Playbook

1. Google the top 20 questions the client's customers ask
2. Write definitive structured answers — clear, direct, citation-worthy (not 3K-word fluff)
3. Add schema markup: FAQ blocks (JSON-LD), comparison tables AI can parse
4. Publish on a domain with authority (or build authority via other strategies)
5. Monitor AI citations: Otterly, Profound, or manual testing on ChatGPT/Perplexity

### Key Stats

- Peter Levels: AI referrals jumped 4% → 20% in one month
- Zero-click searches are growing — traditional SEO is declining
- "AEO in 2026 is where SEO was in 2010" — first movers own niches for years

### Deliverables

- Top 20 FAQ list with structured, citation-worthy answers
- JSON-LD schema markup for all pages
- Comparison tables optimized for AI parsing
- Citation monitoring setup (tools + manual process)

---

## Strategy 5: Viral Artifacts

**Agents**: Mercury (social distribution), Calliope (design/copy), Vesta (community amplification)
**When to recommend**: Products with measurable user milestones or outputs

### Playbook

1. Ask: what does the user want to brag about? What milestone or output would they screenshot and share?
2. Design it beautiful, branded, shareable — logo subtle but present
3. Add a share button that pre-fills the post with the artifact
4. Every share = free impressions to the exact target audience

### Examples (General)

- GitHub: contribution graph → devs share green squares on Twitter
- Stripe Atlas: incorporation milestone → founders tweet "I just incorporated"
- Duolingo: streak count → users brag about 365-day streaks
- Spotify Wrapped: identity-based annual recap → 100M shares every December

### Examples (Crypto)

- Portfolio performance card (weekly/monthly gains, styled like Spotify Wrapped)
- Staking milestone badge ("6 months staked, earned X rewards")
- Governance participation badge ("Voted on 10 proposals")
- LP position performance tracker (shareable yield card)
- Token holder anniversary ("1 year holding since [date]")

### Key Insight

"B2B are people too." Even enterprise users share within Slack and Teams. Think about what the group you want more of would share with each other.

### Deliverables

- 3 viral artifact concepts tailored to the project
- Design specs (branded, shareable, mobile-optimized)
- Share flow implementation spec (pre-filled tweet, embed code)
- Social copy templates for each artifact

---

## Strategy 6: Newsletter Acquisition

**Agents**: Minerva (deal evaluation + strategy), Mercury (outreach), Vesta (audience transition)
**When to recommend**: Projects with clear LTV and $5-20K budget for audience acquisition

### Playbook

1. Search for niche newsletters:
   - Marketplaces: duuce.com, Newsletter Investor
   - Direct search: Substack search, Twitter search ("[niche] newsletter")
   - Target: 5K-50K subscribers in the project's target niche
2. Evaluate candidates: subscriber count, engagement rate, niche fit, monetization (most make $0-500/mo)
3. Outreach: DM owners — "Have you ever thought about selling?"
4. Negotiate: most would take $5-20K. Understand the LTV math to set your max offer.
5. Acquire → inherit trust from day one → plug product immediately
6. Repeat across adjacent niches for compound reach

### Why It Works

- Skip the cold start problem entirely (zero → 10K subscribers overnight)
- Direct channel that can't be suppressed (unlike social media algorithms)
- Cheaper than building audience from scratch (which takes years of daily content with no guarantee)
- Newsletter open rates >> social media organic reach

### Crypto-Specific Notes

- Look for: DeFi alpha newsletters, chain-specific ecosystems, NFT/gaming communities
- Many crypto newsletters are passion projects with engaged but small audiences — prime acquisition targets

### Deliverables

- Newsletter acquisition target list (10 candidates with subscriber counts and engagement data)
- Outreach templates (DM + follow-up)
- Valuation framework (subscriber count x engagement x niche fit = max offer)
- Post-acquisition integration plan (first 3 emails, brand transition, product plugs)

---

## Strategy 7: AI Content Repurposing Engine

**Agents**: Calliope (content transformation), Mercury (platform distribution), all channels
**When to recommend**: Always — universal multiplier for any content-producing project

### Playbook

1. Create 1 pillar content piece (podcast episode, YouTube video, long blog post, voice memo, essay)
2. Transcribe with Whisper or AI
3. Feed into the repurposing engine — one piece becomes:
   - 5-10 tweets / Twitter threads
   - 3-5 LinkedIn posts
   - 2-3 short-form videos (Remotion on Claude Code)
   - 1 newsletter edition
   - 1 blog post / essay
   - 5-10 quote graphics (creative LLMs)
   - Email sequences
4. Schedule across platforms using the social content calendar
5. Repeat weekly — in 3 months, you have more content than all competitors combined

### Tools & Automation

- **Remotion skill on Claude Code** for AI-generated short-form video
- **OpenClaw** for scheduling and automation
- **Claude dispatch / co-work** for parallel content generation
- Perplexity Computer for research-backed content

### Key Insight

"It's way harder to write a 3,000-word essay than to record a 30-minute voice memo." Start with voice — the repurposing engine handles the rest. Even an internal podcast nobody sees has value if the derivatives are good.

### Anti-Slop Rules

- Invest in brand guide and reference images
- Set up content routines that research before generating
- Use skills with style constraints — not raw LLM output
- Human review loop on at least the first batch per format

### Deliverables

- Content repurposing SOP (input format → output matrix)
- Platform-specific templates (Twitter thread, LinkedIn post, newsletter)
- Remotion video template (branded, short-form)
- Weekly content calendar with distribution schedule

---

## Strategy Selection Guide

Use this matrix to recommend strategies based on the client's profile:

| Client Profile | Recommended Pair | Why |
|---------------|-----------------|-----|
| Pre-launch, no audience | 3 (free tool) + 7 (repurposing) | Build discovery + content flywheel before launch |
| Has product, no traffic | 2 (pSEO) + 4 (AEO) | Capture search demand + AI citations |
| Has audience, low conversion | 5 (viral artifacts) + 3 (free tool) | Activate existing users as distribution |
| Has budget, wants speed | 6 (newsletter) + 2 (pSEO) | Buy audience + build long-term organic |
| SaaS / tool product | 1 (MCP) + 4 (AEO) | Let AI sell for you + be the cited source |
| Crypto / DeFi project | 2 (pSEO) + 5 (viral artifacts) + 7 (repurposing) | Chain-specific SEO + shareable DeFi milestones + content volume |
| Developer tooling | 1 (MCP) + 3 (free tool) | AI discovery + developer-facing free tool |
| NFT / gaming | 5 (viral artifacts) + 7 (repurposing) | Identity-based sharing + content volume |

### Decision Rule for Minerva

1. Assess the client's current distribution assets (audience size, domain authority, content volume, budget)
2. Match to the closest client profile above
3. Recommend exactly 2 strategies (3 max for well-funded clients)
4. Include the strategy selection rationale in the delegation brief to downstream agents
5. Each downstream agent receives only their relevant strategy sections, not the full playbook
