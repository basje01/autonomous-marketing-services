# Ecosystem Knowledge Base

> Curated, permanent intelligence extracted from video transcripts, podcasts, and deep analysis.
> Unlike `latest-digest.md` (overwritten daily), this file is append-only and permanent.
> Agents load this via `--add-dir intel/` alongside the daily digest.
> Last updated: 2026-04-03

---

## Paperclip Best Practices (from dotta)

**Source**: Greg+dotta 46m podcast, Cathryn Lavery 12m demo, dotta tweets

### Architecture Patterns
- **Memento Pattern**: "Your AI agents are Memento. They wake up capable but don't know who they are. Write tattoos on their arm." → Use heartbeat checklists + pre-loaded context (our BRAID GRDs + brain chip)
- **Board > CEO > ICs**: You are the board. CEO sets direction. ICs execute. Never micromanage at design-PM level.
- **Frontier model for CEO, cheaper for ICs**: "Use a frontier model for your CEO, but for other tasks you can get away with a cheaper model." → Minerva on Opus, 6 ICs on Sonnet
- **Less is more**: Cathryn "fired half her agents" because rate limits + fewer well-structured agents > many poorly-structured ones. Our 7 is the right number.
- **Shareable companies**: `npx companies.sh add <repo>` imports entire agent orgs. Our COMPANY.md supports this.
- **Maximizer mode** (coming): "Don't care about token spend, just make sure someone is working all the time until it's done."

### Operational Patterns
- **Chief of Staff (Knox/Argus)**: Morning + evening health checks. Monitors blockers. Logs to autonomy-log.md. "If agents get stuck, I want them to ping him."
- **Evals Engineer (Themis)**: Performance reviews on agents. "How do we reflect on what they did?" Look at past issues + feedback → agents learn.
- **QA after every deliverable**: "After the engineer creates something, he asks QA to QA it." Especially for web apps.
- **Routines**: Scheduled tasks with full tracing. "Every single task gives you tracing — what happened, how many tokens, what was accomplished."
- **Skills = taste transfer**: "AI can do everything except know your values. You have to become more aware of your values and communicate them back."
- **Compound engineering**: When agent does something wrong → add rule to persona → never happens again (Boris Cherny's approach from Meta lint rules)

### Real Production Case Studies
- **Cathryn Lavery**: $55M revenue, 5M products sold. Runs Paperclip with human+agent hybrid team. Chief of Staff "Knox" does morning/evening checks.
- **Security review company**: Uses Paperclip for automated client security audits.
- **Dentist (Francisco)**: Manages foundation + family with 8 agents, $180/mo replaces 40+ hours.
- **Roofing company**: Satellite imagery + hail data → insurance lead generation → sales team.

---

## Claude Code Practices (from Boris Cherny, creator)

**Source**: Boris Cherny 11m50s interview (544K views, 99K bookmarks)

### Boris's 3-Part Formula
1. **Use Opus always** — Smarter = fewer tokens = cheaper total cost. "Once the plan is good, the code is good."
2. **Invest in CLAUDE.md** — Whole team contributes multiple times a week. "You should never have to comment about something twice."
3. **Give Claude a way to verify output** — "Like a painter with a blindfold." Tests, browser, simulator. Our BRAID Critic nodes do this.

### Workflow
- 5-10 parallel sessions (terminal + web + mobile)
- Half his coding is from his phone
- Plan mode first → auto-accept edits → one-shot execution
- `@cloud` on GitHub PRs to update CLAUDE.md during code review

---

## Distribution Strategies (from Greg Isenberg)

**Source**: Greg 27m18s "7 distribution strategies" podcast

### The 7 Strategies (encoded in `skills/distribution-playbooks/SKILL.md`)
1. **MCP Server as Sales Channel** — "Building an MCP server in 2026 is like building for mobile in 2010." 150+ installations in 30 days, $0 ad spend.
2. **Programmatic SEO** — 10K pages × 30 visits/mo = 300K visitors. 2% conversion = 6K conversions. Start with 100 pages as MVP.
3. **Free Tool as Top-of-Funnel** — "The tool IS the marketing." Build a grader/analyzer. Ship by lunch. Viral loop.
4. **Answer Engine Optimization (AEO)** — "AEO in 2026 is where SEO was in 2010." Peter Levels: AI referrals 4% → 20% in one month.
5. **Viral Artifacts** — "What does your user want to brag about?" Make it beautiful and shareable. Logo subtle but present.
6. **Newsletter Acquisition** — Buy 10K subscriber newsletter for $5-20K. Skip cold start. Direct channel that can't be suppressed.
7. **AI Content Repurposing Engine** — 1 pillar → 20-75 derivative pieces. Remotion skill on Claude Code. "3 months = more content than competitors."

### Core Thesis
> "Code used to be the moat. Distribution is the new moat. AI can't build distribution. Product is commoditized, code is fully commoditized."

### Market Data
- 200,000+ new vibe coding projects created every day — almost NONE get customers
- Peter Levels: $3M+ revenue, zero employees, 750K+ followers + great SEO
- "The wealthiest people will be marketers over the next 10 years"
- Distribution first, product second, always

---

## Web Data Layer (from Greg Isenberg, Firecrawl tutorial)

**Source**: Greg 27m27s Firecrawl deep-dive

### Greg's 5-Layer Agent Stack
1. **Agent harness** — Paperclip, Claude Code, Cursor ✅
2. **Search layer** — Intel Hub, Perplexity MCP, Exa ✅
3. **Web data layer** — Firecrawl (scrape, crawl, map, search, agent) ✅
4. **Ops brain** — intel/latest-digest.md, Obsidian ✅
5. **Outbound/audience** — Mercury + Calliope, Instantly, Apollo ✅

### Firecrawl Business Framework
1. Pick a niche where people pay for data
2. Build the scraper (Firecrawl, one API call)
3. Package it (CSV, dashboard, Slack alert, API)
4. Sell the output (not the tool) — $500-5K/mo per client, 95%+ margins
5. Automate and compound

### Niche Ideas (relevant to our clients)
- Crypto token due diligence reports → $1-5K/mo to VCs
- SEO audits for vertical niches → $200-500/mo
- Competitor price monitoring → $99-500/mo
- Lead gen from company career pages → $100-500/batch
- "SEMrush acquired for $1.9B" — validates SEO intelligence market

### Key Quote
> "Firecrawl is the AWS moment for web data. One API call replaces thousands of lines of scraper code."

---

## Skills & Automation Patterns (from startupideaspod)

**Source**: Multiple clips (5-9 min each)

### /last 30 days Skill
- Claude Code skill that searches X, Reddit, and web for last 30 days on any topic
- "I know Kung Fu" — become expert on any topic instantly
- Uses: OpenAI API (Reddit access), X AI key, web search
- Our equivalent: `intel_hub_feed` + `intel_hub_digest` (but better — 349+ sources, relevance scoring)

### Heartbeat Best Practices
- Memory maintenance (PARA system)
- Auto-update todo list during the day
- Cron health check (retrigger failed jobs)
- Keep heartbeat instructions small — runs constantly, burns tokens if too large

### Skill Security
- "Wild West" — malicious instructions in community skills
- Always check security scan badges
- skills.sh has some auditing, but verify manually
- "Whenever you do something repeatedly, tell your agent to turn it into a skill"

---

## Competitive Intelligence

### Paperclip Ecosystem (as of 2026-04-01)
- 40K+ GitHub stars, 1,400+ public repos using Paperclip
- 80K npm downloads, 40M+ public line changes
- 7.8% market share (#2 in agentic tools ecosystem)
- 3 co-founders: dotta, Devin Foley (early Slack/Figma), Scott Tong (Pinterest head of product design)
- Community: 500+ pull requests, Discord server
- Upcoming: maximizer mode, CEO chat, better artifacts, cloud deployment

### Market Validation
- Sequoia: "$1T services will be replaced by AI agents"
- a16z (Andrew Chen): "Less than 50 people to build Uber-scale platforms"
- Startup Ideas Pod: "Asymmetric time to start building — 12-24 month window, build cost basically zero"
- Greg: "Most SaaS products are a collection of workflows that can be rewritten as agent skills. Many will die. The top ones will pivot to agent companies."

### Our Differentiators (vs. generic Paperclip companies)
- **Crypto-native**: Only marketing engine specifically for Solana/DeFi projects
- **Proven evals**: Themis scored agents 4.2-4.6 on first campaign — "there's no evals for agent organizations" (dotta)
- **BRAID reasoning**: Structured GRDs prevent drift, Critic nodes verify quality before output
- **On-chain escrow**: Anchor program with proof-of-delivery (no other marketing agent has this)
- **Intel pipeline**: 349+ sources via Intel Hub, daily brain chip pre-loads agents with context
- **5-layer stack complete**: Paperclip + Intel Hub + Firecrawl + daily digest + outbound agents

---

## Quotable for Pitch Deck

| Quote | Source | Context |
|-------|--------|---------|
| "Code used to be the moat. Distribution is the new moat." | Greg Isenberg | 7 distribution strategies podcast |
| "Once the plan is good, the code is good." | Boris Cherny | Claude Code creator, 544K views |
| "AI can do everything except know your values." | Dotta | Skills = taste transfer |
| "There's no evals for agent organizations — no runtime other than Paperclip to test them." | Dotta | We have Themis. We ARE the proof. |
| "$55M revenue, 5M products. I don't want to manage a human OR AI team." | Cathryn Lavery | Production Paperclip user |
| "AEO in 2026 is where SEO was in 2010." | Greg Isenberg | First movers own niches for years |
| "Firecrawl is the AWS moment for web data." | Greg Isenberg | One API call replaces thousands of lines |
| "Less than 50 people to build Uber-scale platforms." | Andrew Chen, a16z | Validates zero-employee thesis |
| "200,000+ new vibe coding projects created every day — almost NONE get customers." | Greg Isenberg | The problem we solve |
