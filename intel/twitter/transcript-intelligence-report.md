# Transcript Intelligence Report — New Content (11 Transcripts)

> Generated: 2026-03-28
> Scope: All transcripts EXCEPT the two 88KB Greg Isenberg podcast files (already analyzed in `docs/paperclip-podcast-alpha.md`)
> Purpose: Competitive intelligence for Colosseum Hackathon — Autonomous Marketing Engine for Crypto Projects

---

## 1. PAPERCLIP TECHNICAL DETAILS (New Information)

### 1a. Agent Browser Skill vs Chrome Extension
**Source**: `2037275797543936307` (dotta, 6m42s)

Dotta reveals there are TWO browser options for QA agents:
- **Claude Browser** (built-in Chrome extension) — "pops up a Chrome window and takes over your computer and if you click on it, you mess it up"
- **Agent Browser skill** — "gives your agent access to a web browser in a way that is a little bit faster than using Chrome"

> "I have a QA engineer who has both the Claude browser installed as well as there is a skill called agent browser"

**Implication**: For our QA/verification step, use the Agent Browser skill instead of the built-in Chrome extension. It's faster and doesn't hijack the user's screen.

### 1b. Evals Engineer Role — Paperclip Building Feedback Learning
**Source**: `2037275797543936307` (dotta, 6m42s)

> "Paperclip is going to be building tools where you can look at your past issues, look at the feedback that you've given your agents and your agents will be able to learn from that. If you find that you're giving the same feedback over and over, we're going to learn that and you won't have to make the same mistake twice."

This is a PLANNED feature, not shipped yet. Dotta has an "evals engineer" agent specifically for doing performance reviews on agents.

**Implication**: We should build our own lightweight eval loop. Track feedback given to agents per campaign run, surface repeated corrections. This is what Paperclip plans to automate — we can do it manually now and be ready when the feature ships.

### 1c. Adapter Configuration Details
**Source**: `2036155705355362618` (dotta demo, 12m48s)

When creating an agent in the Paperclip UI:
- **Adapter**: "Claude code" (selected from dropdown)
- **Model**: "Opus 4.6" (selected)
- **Environment**: "runs alive" (adapter environment setting)

The flow is: Company name + Goal → Create agent → Name + Adapter + Model + Environment → Describe what it should do → Assign first task.

**Implication**: Our gateway code should match this flow exactly. The adapter/model/environment triple is key configuration.

### 1d. CEO Chat Feature (Coming Soon)
**Source**: `2037576893772529693` (dotta, 7m13s)

> "We'll add a CEO chat. So that way you're not creating issues for every single thing. You can just chat with any agent."

Currently, ALL interaction with agents goes through GitHub-style issues. A chat interface is coming but not shipped.

**Implication**: For the hackathon demo, interaction will be issue-based. Design our UX around issue creation, not chat.

### 1e. Artifacts Feature (Planned)
**Source**: `2037576893772529693` (dotta, 7m13s)

> "There's still a lot of rough edges, things that we want to work out around artifacts, having better onboarding"

Artifacts are mentioned as a known gap. No details on what form they'll take.

---

## 2. COMPANY.NEW FORMAT — Import/Export Standard

### 2a. Remote Skill Referencing (NOT Copying)
**Source**: `2037576893772529693` (dotta, 7m13s)

Critical technical detail:

> "When it does this, it's not actually like copying the skills, it's actually referencing these remote repos so you can import any upgrades."

Skills imported from GitHub repos are **referenced, not copied**. This means:
- Upstream improvements to skills flow downstream automatically
- Our published marketing company template would auto-update for users
- Skills are URLs, not embedded content

### 2b. What Gets Imported
**Source**: `2037576893772529693` (dotta, 7m13s)

When you import a company, you get:
- All agents (with their roles/configurations)
- All skills (as remote references)
- Org chart structure (reporting hierarchy)

Examples of importable repos:
- **Gary Tan's G-Stack** — "a set of skills... do office hours like you're talking to Gary and his engineering and his style"
- **Agency Agents repo** — "60,000 stars, over a hundred agents, you can import them all into paperclip with all the same skills"
- **Don Cheetos Game Studio** — "creative director, producer, technical director, skills around creating assets"

### 2c. Import Timeline
**Source**: `2037576893772529693` (dotta, 7m13s)

> "We have a tool which is not in the main branch, but it will be by the March 25th."

This feature should be LIVE now (today is March 28). We need to verify this is merged and working.

**Implication**: Our hackathon deliverable should be an importable company repo. This is the distribution mechanism.

---

## 3. AGENTIC DESIGN PATTERNS

### 3a. The "Chief of Staff" Pattern — Agent That Manages Agents
**Source**: `2036155705355362618` (Catherine Lavery demo, 12m48s)

Catherine runs a $55M e-commerce business and has a specific pattern:

> "At the beginning of the day and end of the day, I have Knox, who's the chief of staff, and his job is to manage the agents... if they get stuck, I want them to ping him and see what the deal is."

> "He logs that in like an autonomy log, and then I can be like, okay, you don't have Cloudflare access to do this DNS or whatever."

The Chief of Staff:
- Runs morning and evening check-ins
- Identifies blockers across all agents
- Maintains an **autonomy log** of what agents can/cannot do
- Escalates only what truly needs human intervention

**Implication**: Add a "Chief of Staff" / ops agent to our org chart. It runs health checks on all marketing agents, identifies blockers, maintains an autonomy log. This frees the CEO/Strategist from micromanagement.

### 3b. "Fire Half Your Agents" — Less Is More
**Source**: `2036155705355362618` (Catherine Lavery, 12m48s)

> "I actually had more agents. I fired half of them a couple of days ago, because I realized that I was getting rate limited, and I think if you were just more efficient and structure agents better technically, you don't need like 10. So I'm starting with less, and then I'll see what breaks and what I need to improve."

**Implication**: Our 5-agent org chart is correct. Don't over-hire. Rate limits are real. Start lean, add agents only when you hit bottlenecks.

### 3c. Skill Compounding Strategy — 3-5 Per Week
**Source**: `2035814267640021224` (Remy/Greg, 11m10s)

> "If you automate like three to five tiny manual processes each week with skills, you eventually end up automating like your entire life with these agents."

Two methods to create skills:
1. **Proactive**: Have an idea, feed reference material (e.g., a course transcript), ask the skill creator skill to build it
2. **Reactive**: Do a process manually once with the agent, then say "create a skill for what we just did"

Skills have a specific file structure:
- `.skill` file (markdown explaining the process)
- `references/` folder (supporting materials — auto-created by the skill creator)

> "It operates out of this hidden file called a .claude folder, skills."

**Implication**: Our 161 SKILL.md files are already the compounded result of this approach. In the pitch, frame them as "months of skill compounding already done for you."

### 3d. Workspace/Folder Architecture for Multi-Agent Teams
**Source**: `2035814267640021224` (Remy, 11m10s)

Remy shows his structure:
```
workspaces/
  AI with Remy/
    content-team/
      claude.md  (orchestrator + sub-agents)
      skills/
        viral-hooks/
          viral-hooks.skill
          references/
            hook-formulas.md
    executive-assistant/
      claude.md
      skills/
```

Each "team" is a folder with its own `claude.md` (orchestrator) and skills directory.

**Implication**: Our Paperclip company structure should mirror this. Each agent role gets its own skill set. The CEO/Strategist's claude.md references all sub-agents.

### 3e. Human-Agent Collaboration Pain Points
**Source**: `2036155705355362618` (Catherine Lavery, 12m48s)

> "My real human team, like they don't want to be dealing with markdown files"

> "Google Docs is meant for people to work together on a document. Proof is meant for people and agents to collaborate on a document."

Real humans don't want markdown. The agent-human interface is a real friction point. Catherine uses "Proof" (AI agent collaboration software) as the bridge.

**Implication**: For our crypto marketing engine, output should be in formats humans can immediately use (not raw markdown). Consider rendering deliverables as HTML/PDF or pushing to familiar tools.

### 3f. Design Agent Pattern — Proactive QA
**Source**: `2037275797543936307` (dotta, 6m42s)

> "If you're going to run a zero human company, you cannot be managing your apps at that level... there is kind of this like structure that needs to be built where you should have a design agent who's already looking at the website and detecting that stuff."

The ideal is PROACTIVE agents that find problems before you do, not reactive agents that wait for assignments. This requires:
- Token budget willingness
- Evals to ensure the agent shares your values/taste

> "You basically have to make sure that you're ready to spend the tokens to do that."

---

## 4. REAL USER CASE STUDIES

### 4a. Catherine Lavery — $55M E-Commerce on Paperclip
**Source**: `2036155705355362618` (12m48s)

- **Revenue**: $55M+ lifetime, 5M+ individual products sold
- **Platform**: Shopify
- **Goal**: "Grow Amazon to $250K/month"
- **Agents**: Started with 10+, fired half due to rate limits, running ~5 now
- **Agent names**: Knox (Chief of Staff), Rory (content writer, based on Rory Gilmore), Atlas (developer engineer), Shopify engineer
- **Real workflow**: Fed Ahrefs CSV export → Paperclip auto-created issues → Atlas fixing technical SEO, Rory updating articles with keywords
- **Tools connected**: Shopify, Ahrefs, Klaviyo, Google Docs, Proof, OpenAI (for image generation)
- **Key quote**: "I don't like managing a human team very much, and I really don't want to manage an AI team either."

**Pain point discovered**: Rory was creating blog images that looked "super AI looking." Solution: Had ChatGPT write a prompt to analyze existing site images and create a style guide, then used that style guide as a skill.

**Implication**: This is the most detailed real-world Paperclip case study. Her Ahrefs CSV → auto-issue creation workflow is directly applicable to our crypto marketing engine (feed market data → auto-create marketing tasks).

### 4b. Dotta's Own Paperclip Org (Building Paperclip with Paperclip)
**Source**: `2037275797543936307` (dotta, 6m42s)

Org chart: CEO → CMO, UX Designer, CTO
Plus: Cursor Coder, Claude Coder (workhorses), QA Engineer, Evals Engineer, Blogger, Content Strategist

- Uses **different adapters for different roles**: Cursor Coder + Claude Coder are the "workhorses" using frontier models on subscriptions
- QA Engineer has Agent Browser skill installed
- Starting an Evals Engineer for agent performance reviews
- Marketing org is being built out (blogger, content strategist)

**Implication**: Validates our multi-adapter approach. Different models for different roles. QA gets browser access. Evals are a differentiator.

---

## 5. ROADMAP HINTS

### 5a. Maximizer Mode — "Do Whatever It Takes"
**Source**: `2037576893772529693` (dotta, 7m13s)

> "My favorite feature that we're working on right now is called maximizer mode. In maximizer mode, you basically don't really care that much about token spending. You're saying, I want to make sure that the CEO makes sure someone is working all the time. Like if I ask you to build the bullet hell game, you do whatever it takes to make sure that you have all the team that you need and that you're pressing on making it until that game is playable."

Timeline: "Give us a couple of weeks"

**Implication**: Maximizer mode is the autonomous execution mode we want. Our system should be designed to work with it when it ships. In the pitch, say "maximizer-mode ready."

### 5b. CEO Chat
**Source**: `2037576893772529693`
Replaces issue-based interaction with direct chat to any agent.

### 5c. Feedback Learning
**Source**: `2037275797543936307`
Agents learn from repeated feedback patterns. Not shipped yet.

### 5d. Better Onboarding
**Source**: `2037576893772529693`
Mentioned as a priority rough edge.

### 5e. Paperclip Team
**Source**: `2037576893772529693` (dotta, 7m13s)

> "Us would be, there's myself, Dota. I also have two co-founders, Devin and Scott. And then also the community who is just doing an incredible job at contributing just every day. We have so many pull requests, we can barely even handle them."

Three co-founders: Dotta, Devin, Scott. Heavy community contribution.

---

## 6. MISTAKES TO AVOID

### 6a. Rate Limiting Will Kill You
**Source**: `2036155705355362618` (Catherine Lavery)

Catherine got rate-limited running too many agents. Had to fire half her team.

> "I realized that I was getting rate limited, and I think if you were just more efficient and structure agents better technically, you don't need like 10."

**Implication**: For the hackathon demo, run agents sequentially or in small batches. Don't try to parallelize everything if it means hitting rate limits.

### 6b. Agents Can't Tell You WHY They're Failing
**Source**: `2036155705355362618` (Catherine Lavery)

> "When agents are spinning their wheels... it's hard for you to tell why they're failing... sometimes there'd be rate limits or something would fail, and so they wouldn't know that it would fail, the agent would just stop responding or wouldn't be doing the right thing."

**Implication**: Build explicit error reporting into agent instructions. "If you encounter an error, rate limit, or blocker, immediately log it in the issue with the exact error message." Don't let agents silently fail.

### 6c. AI-Generated Images Look Bad Without Style Guides
**Source**: `2036155705355362618` (Catherine Lavery)

> "The last time they did images, they were super AI looking"

Solution: Have an agent audit existing brand images, create a style guide, then use that style guide for all future image generation.

**Implication**: For our crypto marketing engine, include a brand style guide skill. Never generate creative assets without one.

### 6d. One-Shotting Falls Apart
**Source**: `2037275797543936307` (dotta)

> "Everybody who's sort of tried to one-shot a new startup with AI, you realize like it's super fun for the first half an hour and then it just kind of falls apart."

Reinforced from the podcast. Structure (QA, multi-agent, evals) prevents compounding errors.

### 6e. Models Still Lack Taste
**Source**: `2037275797543936307` (dotta)

> "Even the models today, the best like GPT 5.4 or like Opus 4.6, some of their taste is still not quite there. And that's why that's where a lot of the secret sauce is. That's where you're actually going to write your own skills."

**Implication**: Our 161 SKILL.md files with anti-patterns, quality checks, and I/O contracts ARE the taste encoding. This is the moat. Mention this explicitly in the pitch.

### 6f. Notion Doesn't Work Well for Agent Management
**Source**: `2036155705355362618` (Catherine Lavery)

> "The commenting system was hard for agents to read if at all. You had to go from API access for them to read it. And in addition, you had to give them a real email address so they could read the comments."

**Implication**: Don't try to use external project management tools as the coordination layer. Paperclip IS the coordination layer. Use it.

---

## 7. BORIS (CLAUDE CODE CREATOR) BEST PRACTICES

### Source: `2036122417970684148` (Boris on Startup Ideas Pod, 11m50s)

This is from **Boris, the creator of Claude Code**, sharing his personal workflow. High-signal content.

### 7a. Plan Mode Is the Most Underused Feature

> "Most sessions start in plan mode. If my goal is to write a pull request, I would use plan mode, go back and forth with cloud until I like its plan. From there, I switch into auto accept edit mode, and cloud can usually one shot it."

> "Planning is just the most underused feature in Claude Code."

**Implication**: Our agents should use plan mode by default. This aligns with our supervised/autonomous S-tier loop.

### 7b. "Once the Plan Is Good, the Code Is Good"

> "With Opus 4.5, once the plan is good, the model can just execute it pretty much perfectly. This is definitely not the case with previous models."

Opus-class models are good enough that planning is the bottleneck, not execution.

### 7c. Parallel Claude Instances — 5-10 at Once

Boris runs 5-10 Claude instances in parallel:
- Terminal tabs (each with separate git checkout)
- Web sessions (overflow when terminal tabs full)
- Mobile phone sessions (kicked off first thing in morning)

> "Probably half of [my coding] is just on my phone and it sort of just works."

### 7d. Frontier Model Always — Cheaper in the End

> "Because the model is smarter, it actually uses less tokens in the end. And it uses so many less tokens, it's often cheaper than using a smaller, less intelligent model, even though the per token cost for that model is lower."

**Implication**: Use Opus/frontier for CEO agent. Don't try to save money with smaller models for critical roles — it backfires.

### 7e. CLAUDE.md Is the Single Most Important File

> "Make sure that you tune the environment setup and make sure that you invest in your claude.md. That's super duper important."

The Claude Code team shares a single CLAUDE.md, checked into git. Everyone contributes. Any time Claude does something wrong, add it to the MD.

> "You should never have to comment about something twice."

Boris's Meta background: kept a spreadsheet of code review issues, wrote lint rules when something hit 5-10 tallies. CLAUDE.md is the modern equivalent.

### 7f. Give Claude a Way to Verify Its Output

> "If Claude can verify its own output, the result is gonna be way, way better."

Three verification methods:
1. Running tests
2. Starting a server
3. Seeing output in browser/simulator (Chrome extension)

> "Imagine that you're a painter and you have to wear a blindfold. You're just not gonna be that good."

**Implication**: Every agent in our system should have a verification step. Content agent checks output against brand guidelines. SEO agent verifies keyword placement. Social agent validates post formatting.

---

## 8. ADJACENT INTELLIGENCE (Non-Paperclip but Useful)

### 8a. FireCrawl for Web Data Layer
**Source**: `2036602696371970195` (Greg Isenberg, 3m36s)

Greg positions FireCrawl as "the AWS moment for web data." Six capabilities:
1. Scrape (one page → clean markdown)
2. Crawl (entire site → all pages)
3. Map (all URLs on domain)
4. Search (Google + full content)
5. Agent (describe data, it finds it)
6. Browser (AI controls real browser)

Three lines of code for implementation.

**Implication**: FireCrawl could be a skill for our marketing engine — scrape competitor crypto projects, crawl token documentation, gather market sentiment from web sources.

### 8b. "Last 30 Days" Research Skill Pattern
**Source**: `2036896888507818099` (Matt on Startup Ideas Pod, 5m32s)

A Claude Code skill that searches X/Twitter, Reddit, and web for content from the last 30 days only. Requires:
- Claude Code subscription
- OpenAI API key (for Reddit access via OpenAI's Reddit deal)
- X AI API key (for Twitter search)

> "I often don't even read what it says. Like sure, it's interesting to see what it learned, but mostly I just want it to write a good email."

Pattern: Research → don't read research → use research as context for generation.

**Implication**: Build a similar "last 30 days crypto market intel" skill. Feed X/Reddit/web data into marketing content generation. The user doesn't need to read the research — the agent uses it as context.

### 8c. 100 Facebook Ads in 30 Minutes Pattern
**Source**: `2036080977563279799` (Greg Isenberg, 50s)

Workflow:
1. React-based ad generator (raw data → formatted creatives)
2. Generate variations at scale
3. Perplexity API to scan Reddit/YouTube for pain points
4. Feed insights into agent for headline/copy generation
5. Facebook Ads API to push 100 variations as drafts
6. Railway dashboard for tracking winners

**Implication**: Direct template for our crypto ad generation workflow. Replace Facebook with Twitter/Telegram/Discord ad equivalents for crypto.

---

## 9. DISCARDED TRANSCRIPTS (No Useful Intel)

- **2036255025354125470** (Greg, 1m13s) — Garbled audio, no useful content
- **2036838564537716790** (dotta, 36s) — Empty transcript, just "you" twice
- **2036254142922903680** (Greg, 1m14s) — Toby Lutke quote about "2026 is the year every business is up for grabs." Good for pitch narrative but no technical intel

---

## 10. PRIORITY ACTION ITEMS FOR HACKATHON

### Must-Do (High Impact, Directly from Intel)
1. **Add Chief of Staff agent** to our org chart — manages other agents, runs morning/evening health checks, maintains autonomy log (from Catherine Lavery pattern)
2. **Verify company import is live** on main branch (dotta said March 25th target) — if so, our repo structure IS the deliverable
3. **Add explicit error reporting to all agent instructions** — "If blocked, log exact error in issue immediately" (from Catherine's "agents can't tell you why they're failing")
4. **Use Agent Browser skill** (not Chrome extension) for QA verification
5. **Design for issue-based interaction** (CEO Chat not shipped yet)

### Should-Do (Strengthens Pitch)
6. **Frame 161 SKILL.md files as "taste encoding"** — dotta says this is the moat, Boris says CLAUDE.md is the most important file
7. **Build "last 30 days crypto intel" skill** — research pattern from transcript `2036896888507818099`
8. **Include brand style guide skill** — prevents "super AI looking" outputs (Catherine's lesson)
9. **Add verification step to every agent** — Boris's blindfolded painter analogy
10. **Position as "maximizer-mode ready"** in pitch

### Nice-to-Have (Future/Post-Hackathon)
11. Build lightweight eval loop (track feedback per campaign, surface repeated corrections)
12. Add FireCrawl integration for competitor scraping
13. Build ad variation generation pipeline (100 ads in 30 min pattern)

---

## KEY QUOTES FOR PITCH DECK

> "AI can do everything except know your values." — dotta

> "Even the models today, the best like GPT 5.4 or like Opus 4.6, some of their taste is still not quite there." — dotta

> "I fired half of them a couple of days ago, because I realized that I was getting rate limited" — Catherine Lavery

> "I don't like managing a human team very much, and I really don't want to manage an AI team either." — Catherine Lavery ($55M business)

> "Once the plan is good, the code is good." — Boris (Claude Code creator)

> "You should never have to comment about something twice." — Boris

> "We're finding that a lot of folks that are having success with paperclip are using it to help manage AI in their existing businesses." — dotta

> "The future of agentic programming is you download paperclip and you create the organization that you've actually tested that actually works." — dotta
