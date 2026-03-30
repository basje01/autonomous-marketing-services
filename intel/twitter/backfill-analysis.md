# Backfill Analysis — 6 New Transcripts + Tweet Intel

> Generated: 2026-03-30
> Scope: 6 previously unreviewed transcripts + tweet-level intel from `2026-03-28.md` and `2026-03-30.md` not covered in `transcript-intelligence-report.md`
> Purpose: Competitive intelligence backfill for Colosseum Hackathon — Autonomous Marketing Engine for Crypto Projects

---

## TRANSCRIPT ANALYSIS

---

### T1. OpenClaw Skills + Heartbeat (2035395585604534428, 6m38s)
**Source**: @startupideaspod
**Already in report?** Partially — skill compounding strategy covered in Section 3c. Heartbeat details are NEW.

#### New Findings

**1. OpenClaw Built-in Skills Catalog**
OpenClaw ships with bundled skills: 1Password, Apple Notes, Summarize, Notion, OpenAI Whisper (transcription), Nano PDF, Nano Banana Pro. Activated via `openclaw skills list` then `activate my [skill name] skill`.

**Implication**: Our Paperclip agents should reference equivalent built-in skills where available rather than reimplementing. The Summarize skill (YouTube/website/article) is directly useful for our intel pipeline.

**2. ClawHub.ai Marketplace — Security Risk**
The official marketplace (clawhub.ai) allows anyone to upload skills. Creator added security scans, but analysis of top skills revealed malicious content in some.

> "I'm pretty sure someone did an analysis of some of the top skills on this platform. And a bunch of them had malicious stuff."

**Implication**: When we publish our marketing company as an importable template, we should include our own security scan/audit as a differentiator. Also: never import third-party skills without review.

**3. Heartbeat File Pattern — Self-Healing Cron Jobs**
The heartbeat file (runs every 30 minutes by default) is being used for three functions:
1. **Memory maintenance** — keeps agent memory fresh
2. **Todo auto-update** — automatically marks completed items
3. **Cron health check** — detects failed cron jobs and retriggers them

> "I've noticed that cron jobs sometimes are not super stable yet. Sometimes they just don't run."

**Implication**: Critical for our marketing engine. Add a heartbeat that monitors campaign status, retriggers failed social posts, and keeps the intel pipeline flowing. But keep it lean — heavy heartbeats burn usage limits.

**4. Heartbeat Budget Warning**
> "If you make this instruction too big, then it will start like using up a lot of your usage limits, because obviously it constantly runs."

**Implication**: Our heartbeat should be 5-10 lines max. Only truly critical checks. Move everything else to scheduled routines.

---

### T2. FireCrawl Deep Dive (2036542601617350709, 27m27s) — THE BIG ONE
**Source**: @gregisenberg
**Already in report?** Only a brief 3-line mention in Section 8a (FireCrawl for Web Data Layer). The deep dive was NOT analyzed.

#### New Findings

**5. The AI Agent Stack — 5 Required Layers**
Greg describes the complete agent builder stack:

| Layer | Purpose | Tools |
|-------|---------|-------|
| **Agent Harness** | Manages all agents in one place | Claude Code, Cursor, Codex, IdeaBrowser Pro |
| **Search Layer** | Search across sources | Perplexity MCP, Exa |
| **Web Data Layer** | Scraping, browsing, extraction | FireCrawl |
| **Ops Brain** | Context storage, meeting notes | Obsidian, Notion, Apple Notes |
| **Outbound + Audience** | Distribution | Instantly, Apollo |

**Implication**: Our hackathon entry maps to this stack. Paperclip = Agent Harness. We need to explicitly position our marketing engine within this 5-layer model. The "Outbound + Audience" layer is exactly what our social/content agents do.

**6. "AWS Moment for Web Data" — Positioning Framework**

> "In 2006, if you wanted to build a web app, you had to buy servers... Then AWS said one API call. In 2026, if you want AI to use web data, you had to build scrapers, manage proxies. FireCrawl says one API call."

> "The companies that were built on top of AWS, some of them became trillion dollar companies."

**Implication for pitch**: Frame our marketing engine as "built on the new AI infrastructure stack." We don't build scrapers — we use FireCrawl. We don't build agent orchestration — we use Paperclip. We build the crypto marketing intelligence layer on top.

**7. FireCrawl Agent Endpoint — Structured Data from Natural Language**
The agent endpoint accepts natural language prompts and returns structured JSON:
- "Find all of YC Winter 24 dev tool companies and their founders and emails" --> structured list of 50+ companies
- "Compare pricing tiers across Stripe, Square, PayPal" --> side-by-side pricing table
- "Get all running shoes from Nike under $150 with ratings" --> product catalog with specs

**Implication**: This is exactly what our crypto marketing intel agent needs. Prompt: "Find all Solana tokens launched this week with >$1M market cap, their Twitter handles, and community size" --> structured JSON for campaign targeting.

**8. Crypto Token Due Diligence — Greg's Own Idea**

> "What if you did like a niche crypto token due diligence reports? So you have FireCrawl read white papers and Twitter and other places. It auto-generates a risk score and summary, and then you can sell that to VCs private equity or different funds for a thousand to $5,000 a month."

> "A VC will pay $5,000 for a report that saves them from a bad 500K bet all day long."

**Implication**: This is DIRECTLY our use case. Greg independently validated the exact product we're building. Add this quote to the pitch deck. The difference: we automate this with Paperclip agents running 24/7, not one-off reports.

**9. The Niche Vertical Strategy — $1M-$30M Businesses**

> "Constellation Software, almost a $75 billion company, they have hundreds of vertical software companies because people like buying very specific products."

> "If you carve out a little niche that could do $1M a year to $10M to $20M to $30M, there's opportunity there."

Framework: Take horizontal tool ($200-1000/mo) --> niche it (one vertical) --> undercut on price ($20-70/mo) --> win on specificity.

**Implication**: "Crypto project marketing" IS the niche. Generic marketing tools (HubSpot, Buffer, Hootsuite) serve everyone. We serve crypto only. Charge less, do more.

**10. Lead Gen Service Pattern — 99% Margin**

> "A client gives you 50 company names. FireCrawl agent finds founders and emails, returns structured JSON. You deliver enriched CSV. Charge $500, $200, $100 per batch. Your cost is like $2 in FireCrawl credits."

**Implication**: Our marketing engine could offer a "crypto influencer enrichment" service. Input: token name. Output: enriched list of 50 relevant crypto influencers with handles, follower counts, engagement rates, contact info. Cost: pennies. Charge: $200+/batch.

**11. The 5-Step Data Business Flywheel**
1. **Pick niche** — what data do people in this industry pay for?
2. **Build scraper** — FireCrawl agent + Python/Claude Code
3. **Package it** — CSV, dashboard, Slack alert, or API
4. **Sell the output** — not the tool, sell the DATA ($500-5000/mo/client)
5. **Automate** — schedule it, let it run while you sleep

> "It's a flywheel that I think is just getting started."

**Implication**: This IS our marketing engine's business model. We don't sell "a marketing tool" — we sell marketing outcomes (content, campaigns, intel reports). The tool runs autonomously. Clients pay for the output.

**12. FireCrawl Hiring AI Agents — Market Signal**

> "FireCrawl had posted a job saying they were hiring a FireCrawl example creator, but they only wanted to hire an AI agent."

Greg extrapolates: Content creator agent ($5K/mo salary), customer support agent ($5K/mo), junior developer agent ($5K/mo). Total budget: $1M for 50 agent "applications."

**Implication**: The market is already pricing AI agents as employees with monthly salaries. Our marketing engine agents should be positioned with a monthly cost (e.g., "$180/mo replaces $15K/mo marketing team").

**13. Browser Sandbox Capabilities**
FireCrawl's browser sandbox can: fill out forms, click buttons/links, handle logins/auth, navigate pagination, stay logged in across sessions, with live viewing.

**Implication**: This enables agents to submit content to crypto project listing sites, fill out partnership forms, interact with Discord/Telegram web interfaces. More capable than simple scraping.

---

### T3. FireCrawl Business Ideas (2038001164994965699, 9m26s)
**Source**: @startupideaspod
**Already in report?** NO — this is entirely new content.

This is essentially a condensed version of the T2 deep dive, focusing on the business ideas. All key ideas are captured in T2 above. One additional framing:

**14. SEMrush Acquisition Validation**

> "SEMrush just sold for like $1.9 billion or something. Ahrefs probably does hundreds of millions a year in revenue."

**Implication**: The SEO/marketing intelligence market is validated at massive scale. Our niche (crypto-specific SEO/marketing intelligence) doesn't need to be huge to be valuable.

**15. "Sell the Output, Not the Tool"**

> "Step four is going to be about selling the output, right? Not just the tool. You're going to be selling the data."

**Implication**: In our pitch, don't say "we built a marketing tool." Say "we deliver marketing campaigns, content, and intelligence reports — autonomously, 24/7, for crypto projects."

---

### T4. Claude Setup — 4 .md Files (2038220390665724001, 46s)
**Source**: @gregisenberg (2,687 likes, 178K views)
**Already in report?** NO — this is from Mar 29, after the original report.

#### New Findings

**16. The 4-File Claude Architecture**
Greg's recommended Claude setup:
1. **agents.md** — "what you'd first give an employee while onboarding: your business, voice, how you like to work"
2. **context/ folder** — "heavier and more nuanced information"
3. **memory.md** — "continuously updates as it learns about you" (e.g., "stop signing emails with cheers")
4. **skills/ folder** — "walk through a process once and it packages it into a reusable workflow"

> "That's how you can turn a four hour task into a single instruction."

**Implication**: This is literally our existing architecture (CLAUDE.md + context + memory + skills). The fact that Greg is evangelizing this to 178K+ viewers means the market is being educated on the pattern we already use. We're ahead of the curve.

---

### T5. Claude Subscription (2038262794412544475, 46s)
**Source**: @startupideaspod (RT of Greg's video)
**Already in report?** Same content as T4 — this is a retweet with identical transcript.

No new intel. Skip.

---

### T6. Dotta Video (2037206700092989789, 36s)
**Source**: @dotta (392 likes, 45K views)
**Already in report?** NO — transcript was empty ("you" twice), but the TWEET TEXT has critical intel.

#### New Findings (from tweet text, not transcript)

**17. Dotta's Video Production Workflow — Agent-Made Marketing Content**

Tweet text reveals the complete workflow:
1. Opened a task asking Paperclip CEO to **hire a video editor** and give her the "remotion-best-practices" skill
2. Asked CMO agent to **write the script**, requested one revision
3. Referenced existing **brand guide** at a public URL
4. Asked new video editor hire to **make the video** using script + brand guide, requested one revision

> "How I made this video in ten minutes"

**Implication**: This is the EXACT proof-of-concept for our marketing engine. Dotta is producing marketing videos for Paperclip USING Paperclip agents. We should replicate this for crypto projects: CEO assigns campaign --> CMO writes copy --> Content agent produces assets. Include "remotion-best-practices" as a skill reference.

**18. Remotion Skill for Video Generation**
Dotta references a "remotion-best-practices" skill for programmatic video generation. Remotion is a React-based video framework.

**Implication**: Add a remotion/video skill to our marketing engine. Crypto projects need video content (token explainers, launch announcements, community updates). Programmatic video = scalable content at zero marginal cost.

---

## TWEET-LEVEL INTEL (Not Covered in Transcript Report)

Extracted from `2026-03-28.md` and `2026-03-30.md`. Only NEW signals not already in the intelligence report.

---

### HIGH ENGAGEMENT SIGNALS

**19. "The wealthiest people will be marketers over the next 10 years"** (2,061 likes, 153K views)
@gregisenberg — [2037194037610885601](https://x.com/gregisenberg/status/2037194037610885601)

> "now that we all can build anything with ai, we're going to all have to figure out distribution. the wealthiest people will be marketers over the next 10 years"

**Implication**: Perfect pitch deck quote. Our entire hackathon entry IS the distribution layer for crypto projects. Building is solved (vibe coding). Marketing/distribution is the bottleneck. We ARE the solution.

**20. "Most SaaS products are agent skills — many will die"** (1,087 likes, 64K views)
@gregisenberg — [2037866453492220297](https://x.com/gregisenberg/status/2037866453492220297)

> "Most SaaS products are a collection of workflows that can be rewritten as agent skills. Many will die. The top ones will pivot to agent companies."

**Implication**: Validates our entire thesis. Traditional crypto marketing tools (Lunar, Chainlysis Social, etc.) are collections of workflows. We've already rewritten them as agent skills.

**21. "Marginal cost of creating a company approaching zero"** (688 likes, 31K views)
@gregisenberg — [2037529682439000348](https://x.com/gregisenberg/status/2037529682439000348)

> "The marginal cost of creating a company is approaching zero. When the cost of creating something approaches zero, the number of things created approaches infinity. That's just math."

**Implication**: Crypto projects multiply faster than marketing agencies can serve them. Autonomous marketing engines are the only way to scale.

**22. "Distribution is almost everything"** (457 likes, 49K views)
@gregisenberg — [2036777307654725814](https://x.com/gregisenberg/status/2036777307654725814)

> "Microsoft Teams being the #1 chat tool for enterprises is all the proof you need that distribution is *almost* everything"

**23. "You can build something huge without being huge"** (418 likes, 55K views)
@gregisenberg — [2036432774127579416](https://x.com/gregisenberg/status/2036432774127579416)

> "Just a 'few' people built MCP, Claude Skills, Claude Desktop App and Claude Code. It's inspirational and it kind of resets your expectations. You can build something huge without being huge. This is the window."

---

### PAPERCLIP ECOSYSTEM SIGNALS (NEW)

**24. Paperclip at 1,000+ Public GitHub Repos** (221 likes, 9.7K views)
@dotta — [2037891976553480404](https://x.com/dotta/status/2037891976553480404)

> "Paperclip is being used to build over 1,000 public GitHub Repos! Hundreds of new people are trying Paperclip everyday. I also asked him to make a blog because we didn't have one yet."

**Implication**: Paperclip adoption is accelerating rapidly. 1,000+ public repos means many more private ones. Our template will reach a growing audience.

**25. "Ask For More" Pattern — Branch Entire Org in Single Request** (181 likes, 8.3K views)
@dotta — [2038001434118029430](https://x.com/dotta/status/2038001434118029430)

> "One of my tips for working with Paperclip is that you should Ask For More. In this single task I asked my CEO to hire a Community Manager, collaborate with the Skills Manager, create a new project, and audit the Discord. Create an entire branch of your org with a single request."

**Implication**: When a crypto project imports our company template, they can expand it in one prompt. "Hire a Discord manager, a Telegram moderator, and a meme creator" — single task. Design our CEO agent's instructions to support this branching pattern.

**26. Daily Routine Discipline — Compounding Improvement**
@dotta — [2036548356969783709](https://x.com/dotta/status/2036548356969783709)

> "I'm challenging myself to make sure I setup at least one Paperclip Routine per day that makes Paperclip better. Today I'm having it pull my bookmarks and write a report on what we could do to make Paperclip better."

**Implication**: Our marketing engine should ship with a "daily improvement routine" — an agent that reviews yesterday's campaign performance and suggests optimizations. The routine compounds value.

**27. Paperclip Release: Plugins, Budgeting, Documents, New Adapters** (314 likes, 17K views)
@dotta — [2034273010316681241](https://x.com/dotta/status/2034273010316681241)

New release features (Mar 18):
- Plugins
- Better Budgeting
- Documents
- Adapters: Gemini and Hermes
- Token use optimizations
- 130+ PRs merged

**Implication**: The "Better Budgeting" feature is critical for our engine — crypto projects have strict token budgets. Documents feature might allow richer deliverables. Gemini adapter means more model options.

**28. Skills UI — Cross-Adapter Sync** (184 likes, 10K views)
@dotta — [2032924099551367514](https://x.com/dotta/status/2032924099551367514)

> "WIP Skills UI for Paperclip. Manage agent skills with the UI. Reference any skill on [skills platform]. Company-level controls. Syncs across any adapter (codex, claude, openclaw)."

**Implication**: Skills UI means our 161 skills become discoverable through a visual interface, not just file browsing. Company-level controls let crypto project operators manage which skills their marketing agents use.

**29. Enterprise Companies Exploring Paperclip** (161 likes, 8.3K views)
@dotta — [2032840929556517336](https://x.com/dotta/status/2032840929556517336)

> "Enterprise companies are exploring Paperclip to scale into agent-driven departments."

Key selling points: agent auditability + sandboxing, human team coordination, no vendor lock-in, any model, plugins.

**Implication**: If enterprise companies adopt Paperclip, our crypto marketing template becomes a department they can spin up. Position as "add a marketing department in one command."

**30. Sparkwave — 6 OpenClaw Agents via Paperclip** (262 likes, 52K views)
@dotta — [2033301938830221399](https://x.com/dotta/status/2033301938830221399)

> "Sparkwave is using six OpenClaw agents coordinated through Paperclip"

**Implication**: Confirms multi-agent coordination at production scale. Our 5-agent org chart is within validated range.

**31. Cathryn Lavery's CFO Testing Agents** (47 likes, 10K views)
@dotta (RT of @cathrynlavery) — [2036536254850830564](https://x.com/dotta/status/2036536254850830564)

> "So my CFO was quizzing my agent in slack about her process as he was so impressed with her output recently."

**Implication**: Real finance professionals are being impressed by agent output. When our marketing engine generates campaign reports, they need to be CFO-grade quality.

**32. "Every app/website becoming an app store"** (372 likes, 78K views)
@gregisenberg — [2035878210508878318](https://x.com/gregisenberg/status/2035878210508878318)

Second/third order effects:
1. The 30% Apple/Google tax gets distributed across millions of builders (wealth transfer)
2. Data scattered across 500 micro apps — aggregator sells it back
3. Micro apps become IT headache
4. Data fragmentation gets bad

**Implication**: The data aggregation angle maps to our intel pipeline. If crypto communities fragment across micro-apps, the aggregator (our intel agent) becomes the most valuable layer.

**33. Social Media Bifurcation** (471 likes, 64K views)
@gregisenberg — [2035804907102445770](https://x.com/gregisenberg/status/2035804907102445770)

> "social media is moving into 2 directions: 1. not so sloppy ai content that blends in 2. raw human content that stands out"

**Implication**: Our content agent must produce category 1 content — AI-generated but polished enough to blend in. Include quality checks (no AI-sounding phrases, proper crypto slang, community-native tone). The brand style guide skill becomes even more important.

**34. "In a world of INFINITE content, people want things that END"** (908 likes, 104K views)
@gregisenberg — [2036124044857065529](https://x.com/gregisenberg/status/2036124044857065529)

> "in a world of INFINITE content, infinite choice, infinite scroll, people are starting to want things that END — finite formats, physical products, no ai, no internet, clear boundaries"

**Implication**: Counter-trend insight for crypto marketing. While we automate content generation, the BEST performing content might be finite/limited. Consider "limited edition" content series, time-bound campaigns, exclusive reports with end dates.

**35. Boris (Claude Code creator) tweet — Highest Engagement** (4,258 likes, 540K views)
@startupideaspod — [2036122417970684148](https://x.com/startupideaspod/status/2036122417970684148)

> "Boris Cherny, the creator of Claude Code, shared his entire setup. He runs 5-10 Claudes in parallel. Half his coding happens from his phone."

This is already covered in the transcript report (Section 7), but the engagement numbers confirm this is the MOST viral content in the entire dataset (540K views). Claude Code + best practices = viral topic.

**36. 100+ FB Ads in 30 Minutes** (2,850 likes, 267K views)
@gregisenberg — [2036080977563279799](https://x.com/gregisenberg/status/2036080977563279799)

Already covered in transcript report (Section 8c), but the engagement numbers (267K views, 2,850 likes) make this the SECOND most viral content. Ad generation at scale = validated market demand.

---

## COMPETITIVE INTELLIGENCE SUMMARY

### Market Signals
1. **Paperclip adoption**: 1,000+ public repos, enterprise interest, community PRs overwhelming the team
2. **FireCrawl as infrastructure**: Being positioned as "AWS for web data" — becoming default data layer
3. **Agent salaries**: Market pricing AI agents at $5K/mo/agent — validates our "$180/mo replaces $15K team" positioning
4. **SEMrush $1.9B acquisition**: Marketing intelligence market at massive scale, crypto niche is wide open
5. **Skills marketplaces**: clawhub.ai growing but has security issues — opportunity for curated, audited skills

### Competitor Signals
- **Harvey AI**: Horizontal agent platform, enterprise sales cycle, months to customize. We're vertical (crypto) and deploy in minutes.
- **Brand24/AppFollow**: Generic sentiment monitoring at $200-300/mo. We do crypto-specific sentiment for less.
- **Precinct/VisualPing**: Generic price monitoring at $200-1000/mo. We do token price + sentiment monitoring combined.
- **Consensus/Tavoli**: General research. We do crypto-specific due diligence.

### What Others Are Building on Paperclip
- Roofing company: satellite imagery + hail damage data + insurance coverage --> warm leads
- Cathryn Lavery ($55M e-commerce): Ahrefs CSV --> auto-created SEO tasks
- Francisco (oral surgeon): 8 agents for foundation, taxes, newsletter, code ($180/mo)
- Sparkwave: 6 OpenClaw agents coordinated through Paperclip
- Dotta himself: CEO, CMO, CTO, UX Designer, QA Engineer, Evals Engineer, video editor

---

## KEY QUOTES FOR PITCH DECK (NEW — Not in Original Report)

> "The wealthiest people will be marketers over the next 10 years." — Greg Isenberg (2,061 likes)

> "Most SaaS products are a collection of workflows that can be rewritten as agent skills. Many will die." — Greg Isenberg (1,087 likes)

> "The marginal cost of creating a company is approaching zero... That's just math." — Greg Isenberg (688 likes)

> "What if you did like a niche crypto token due diligence reports? A VC will pay $5,000 for a report that saves them from a bad 500K bet all day long." — Greg Isenberg

> "Incumbents are charging hundreds of dollars a month for generic tools. Your version charges $20, $50, $70 for a tool that does one thing perfectly for one customer." — Greg Isenberg

> "You should Ask For More. Create an entire branch of your org with a single request." — dotta

> "How I made this video in ten minutes: CEO hired a video editor, CMO wrote the script, video editor made the video. Done." — dotta (392 likes, 45K views)

> "Clean structured data is the new oil." — Greg Isenberg

> "Social media is moving into 2 directions: not so sloppy AI content that blends in, and raw human content that stands out." — Greg Isenberg

---

## PRIORITY ACTION ITEMS (ADDITIVE — On Top of Original Report)

### Must-Do

1. **Add FireCrawl integration skill** — use agent endpoint for crypto token intelligence gathering (white papers, Twitter, community data). Greg literally described our product as a business idea.

2. **Position as "sell the output, not the tool"** in pitch — we deliver campaigns, content, and intelligence reports. Not a dashboard.

3. **Add "remotion-best-practices" video skill** — Dotta proved this works for marketing video production via agents. Crypto projects need video (launch announcements, explainers).

4. **Add daily improvement routine** — agent reviews yesterday's campaign performance, suggests optimizations. Compounds value over time (dotta's daily routine pattern).

5. **Design CEO agent to support "Ask For More" branching** — single prompt should be able to hire new specialist agents and assign them work.

### Should-Do

6. **Frame architecture as "5-layer agent stack"** — Greg's model (harness, search, web data, ops brain, outbound) maps perfectly to our setup.

7. **Add heartbeat with cron health check** — monitor campaign status, retrigger failed tasks (but keep lean, <10 lines).

8. **Include Greg's "marketers are the wealthiest" quote** in pitch deck opening slide.

9. **Build crypto influencer enrichment service** — input: token name, output: enriched list of 50 relevant influencers. 99% margin service line.

10. **Tune content agent for "blends in" quality** — Greg's social media bifurcation insight. AI content must pass the sniff test in crypto communities.

### Data Points for Pitch

11. **Paperclip at 1,000+ public repos** — growing ecosystem we're building into
12. **SEMrush acquired for $1.9B** — market validation for marketing intelligence
13. **$180/mo replaces 40+ hours of admin work** (Francisco, oral surgeon case study)
14. **Constellation Software at $75B** — vertical software is a massive market
15. **Boris (Claude Code creator) runs 5-10 instances in parallel** — our multi-agent approach is creator-endorsed

---

## TRANSCRIPTS WITH NO USEFUL INTEL

| ID | Source | Duration | Why Discarded |
|----|--------|----------|---------------|
| 2037206700092989789 | @dotta | 36s | Audio-only "you" — but tweet text analyzed above (finding #17-18) |
| 2038262794412544475 | @startupideaspod | 46s | Exact duplicate of 2038220390665724001 (RT) |

---

## CROSS-REFERENCE: Tweets Referenced But Missing Transcripts

The following tweets have VIDEO DETECTED in the intel files but no transcript files on disk. These may have been too short to transcribe or failed transcription:

| Tweet ID | Source | Duration | Content (from tweet text) |
|----------|--------|----------|---------------------------|
| 2035092487501439034 | @dotta | 27s | Francisco oral surgeon case study |
| 2037376296658047456 | @startupideaspod | 15s | "Time to lock in" promo |
| 2037978446601834992 | @startupideaspod | 15s | "Show us what you've built" |
| 2037257802897584327 | @startupideaspod | 23s | Paperclip overview promo |
| 2036339265291034980 | @startupideaspod | 20s | OpenClaw computer control |
| 2036312963993444862 | @startupideaspod | 5s | Unknown (link only) |
| 2036208296999395630 | @startupideaspod | 11s | "Claude Code works 24/7" |
| 2035053296222969919 | @startupideaspod | 13s | OpenClaw guide promo |

None of these appear to have enough duration for meaningful content. The tweet text has been incorporated above where relevant.
