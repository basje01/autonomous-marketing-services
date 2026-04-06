# Wiki Operations Log

> Append-only chronological record of all wiki operations — ingests, queries, lint passes, compilations.
> Parseable: `grep "^## \[" intel/knowledge/_log.md | tail -10` gives the last 10 entries.
> Never overwrite — only append new entries at the bottom.

---

## [2026-03-28] ingest | Initial Knowledge Extraction
- **Agent:** Manual (human + LLM)
- **Sources:** 10 transcripts (Greg Isenberg, Boris Cherny, Cathryn Lavery, startupideaspod, dotta)
- **Pages created:** 8 topic files in knowledge/ — paperclip-practices, claude-code-practices, distribution-strategies, web-data-layer, competitive-landscape, case-studies, pitch-quotes, paperclip-podcast-alpha
- **Commit:** `793db6b` feat(intel): add permanent knowledge base extracted from 10 transcripts

## [2026-03-29] refactor | Split Knowledge into Topic Files
- **Agent:** Manual
- **Action:** Split monolithic knowledge into individual topic files with YAML frontmatter (last-verified, sources, agents)
- **Commit:** `019e74d` refactor(intel): split knowledge base into topic files with metadata

## [2026-03-30] architecture | Wiki Brain Design
- **Agent:** Manual
- **Action:** Designed wiki brain flow — Argus writes to raw/drafts (not knowledge/ directly), Hermes quality gate reviews and promotes
- **Pages affected:** agents/hermes/AGENTS.md created, agents/chief-of-staff/AGENTS.md updated
- **Commit:** `de6b1be` feat: wiki brain architecture — Hermes quality gate + Athena rename

## [2026-04-01] architecture | Config-Driven Intel Packages
- **Agent:** Manual
- **Action:** Created intel package system — ops.json + fmo.json with feed categories, source sync, transcript backlog
- **Packages:** ops (agentic-marketing, agent-infrastructure), fmo (decentralized-ai)
- **Commit:** `e502edd` feat(intel): config-driven intel package + source sync + transcript backlog

## [2026-04-02] ingest | Daily Intel (backfilled from Intel Hub)
- **Agent:** Backfill (no Argus run — pre-pipeline)
- **Sources:** 9 items across 6 sources (Intel Hub feed)
- **Signals:** 6 high-signal items
- **Key items:**
  - [0.66] Auth0 collab on AI agent access control — enterprise security for agent fleets
  - [0.66] Greg Isenberg on Claude Code context preservation as biggest agent bottleneck
  - [0.64] Harrison Chase: open-source models now good enough for harness-driven deep agents
  - [0.64] Gemma 4 local inference — laptop-capable, quality parity with cloud models
  - [0.62] Neil Patel: 30 days of buzz can push you out of AI recommendations — recency as ranking factor (62s video)
  - [0.52] Claude CLI v2.1.91 — tool persistence 500K char override, multi-line prompts, plugin executables

## [2026-04-03] ingest | Daily Intel (backfilled from Intel Hub)
- **Agent:** Backfill (no Argus run — pre-pipeline)
- **Sources:** 37 items across 10 sources (Intel Hub feed)
- **Signals:** 22 high-signal items (busiest day in backfill period)
- **Key items:**
  - [0.70] YC predicts 300+ unicorn vertical AI companies this decade — SaaS captures IT budget, Vertical AI captures labor P&L (218s video)
  - [0.66] Greg: "the way we use the internet is completely different than 5 years ago — no LLMs, no AI agents, no vibe coding"
  - [0.66] One-person $1B company era — structure your AI agent team: Engineering, Design, Marketing, Sales, Operations (103s video)
  - [0.66] "the gap between 'i have an idea' and 'i shipped a product' just got so small it's basically not a gap anymore"
  - [0.64] Organizational leverage shifting from production scale to coordination of autonomous agents
  - [0.63] Neil Patel: YouTube citations in Google AI Overviews steadily increasing — focus on video for AIO ranking
  - [0.63] "every single business in the world is still up for grabs — incredible time to build AI native companies"
  - [0.62] LiteParse — free document parser with bounding boxes, relevant for document ingest pipelines (33s video)

## [2026-04-03] ingest | Multi-Package System Hardened
- **Agent:** Manual + dispatch audit
- **Action:** Hardened multi-package system, focused ops package on 6 sources / 2 categories
- **Commits:** `4b7b9ed`, `f515278`

## [2026-04-04] ingest | First Argus Daily Intel Run
- **Agent:** Argus
- **Sources:** 30 items across 7 sources (Intel Hub feed)
- **Signals:** 4 FEATURE (Hermes Agent v0.7.0, Arcee Trinity, Solana x402 BigQuery, Venice Pro Gemma 4), 4 PATTERN (Vertical AI > SaaS, MCP adoption, Solana 4.2, Bittensor subnets)
- **HIGH priority:** Hermes Agent v0.7.0 memory plugins, Vertical AI vs SaaS framing
- **Transcripts queued:** 2 (Vertical AI 218s, Hermes demo 128s)
- **Raw output:** raw/ops/2026-04-04.md
- **Note:** Intel Hub went 502 on second run attempt; first run data preserved in digest
- **Commit:** `a3c3ec6`

## [2026-04-05] ingest | Daily Intel (backfilled from Intel Hub)
- **Agent:** Backfill (no Argus run scheduled)
- **Sources:** 19 items across 5 sources (Intel Hub feed)
- **Signals:** 9 high-signal items
- **Key items:**
  - [0.70] Dotta: "The control plane for your agent workforce must be neutral, third-party, and open-source — you will have thousands of agents"
  - [0.68] Greg: "Obsidian is a $350M company for a note-taking app built by 3 engineers working remotely"
  - [0.67] Dotta confirms Paperclip not affected by Claude Code "OpenClaw billing change" — uses claude as harness binary for local single-user
  - [0.65] Startup Ideas Pod: "This is the best time in history to build a startup — build cost is near zero"
  - [0.62] Conductor analysis: 1.08% of website traffic now from LLMs — highest converting AI referral traffic ever seen
  - [0.61] Replit CEO: Apple blocked updates after 4 years but app rose to #1 organically
  - [0.53] Community member Aron built a Desktop version of Paperclip
  - [0.51] Dotta: "drop the zero human company language — Paperclip is the platform for accountable work at agentic speed"
- **Strategic:** Dotta's open-source control plane thesis + Paperclip billing clarification are HIGH-priority for our positioning

## [2026-04-06] architecture | Karpathy Wiki Brain Upgrade
- **Agent:** Manual
- **Action:** Restructured knowledge/ into Karpathy-style compiled wiki
- **Changes:**
  - Migrated 8 topic files to knowledge/topics/ with summary frontmatter + Related/Backlinks sections
  - Created knowledge/concepts/, knowledge/projects/, knowledge/explorations/ directories
  - Created _catalog.md (Mermaid concept map), _lint-report.md (lint stub)
  - Upgraded README.md from static table to auto-maintained wiki index
  - Created wiki-search skill (local knowledge lookup)
  - Created wiki-file skill (filing-back loop — queries "add up")
  - Upgraded Hermes from Quality Gate to Wiki Compiler (concept extraction, cross-linking, backlinks, catalog/index regeneration, linting)
  - Wired Argus + Minerva to file research back via wiki-file
  - Updated intel-hub skill conventions with new knowledge paths

## [2026-04-06] source-fix | Karpathy Intel Hub Sources
- **Agent:** Manual
- **Action:** Re-categorized x-karpathy from `research` → `agent-infrastructure`. Fixed gh-karpathy type (github-releases → rss). Added gist-karpathy for idea files. Added both GitHub sources to ops.json required_sources.
- **Sources active:** x-karpathy (31 items), gh-karpathy (pending first poll), gist-karpathy (pending first poll)
- **Root cause:** Karpathy was categorized as `research` (44 sources, 2500+ items) instead of `agent-infrastructure`, so the ops package never saw his content

## [2026-04-06] exploration | Autonomous Source Discovery Research
- **Agent:** Manual
- **Action:** Researched how Intel Hub discovers sources autonomously. Found `source_suggestions` table + weekly `discoverSources()` in learn.ts, but zero API endpoints or agent integration. Filed exploration with 3-tier improvement plan.
- **Filed to:** explorations/2026-04-06-autonomous-source-discovery.md
- **Key finding:** Infrastructure is 80% built (table, entity co-occurrence query, circuit breaker) but the last mile is missing — no API, no agent proposal mechanism, no approval workflow

## [2026-04-06] architecture | Replace latest-digest.md with _log.md
- **Agent:** Manual
- **Action:** Replaced overwrite-daily latest-digest.md with append-only _log.md. Backfilled from git history + existing data. Argus now appends daily entries instead of overwriting.
- **Rationale:** Karpathy pattern — chronological log preserves wiki evolution timeline, digest content lives as daily log entries instead of being destroyed each morning
