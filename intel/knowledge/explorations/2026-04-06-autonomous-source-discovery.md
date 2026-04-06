---
type: exploration
question: "How can agents autonomously discover and propose new Intel Hub sources?"
asked-by: manual
date: 2026-04-06
sources:
  - "/Users/bas/INTEL/lib/learn.ts (discoverSources, lines 322-364)"
  - "/Users/bas/INTEL/lib/source-circuit-breaker.ts"
  - "/Users/bas/INTEL/sql/schema.sql (source_suggestions table)"
  - "Karpathy LLM Wiki gist (https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)"
concepts: [source-discovery, intel-hub, self-learning]
summary: "Intel Hub has a source_suggestions table and weekly entity co-occurrence discovery, but zero API endpoints or agent integration. Three-tier fix: agent proposal endpoint, confidence scoring, feedback loop."
---

# Autonomous Source Discovery

## Problem

Karpathy wasn't in our ops feed despite being directly relevant to our wiki brain architecture. We only noticed because a human read his tweet. Agents should catch this automatically — "entity X is mentioned 5 times this week across high-signal items but we're not tracking them as a source."

## What Already Exists

The Intel Hub **already has** autonomous source discovery:

1. **`source_suggestions` table** in PostgreSQL — stores entity-based proposals with status, mention count, distinct source count
2. **`discoverSources()` in `learn.ts`** — runs weekly (Sundays 6-8 UTC), finds entities mentioned across 3+ distinct sources in the last 7 days, creates pending suggestions
3. **Entity co-occurrence query** — joins `entities` → `item_entities` → `feed_items`, filters by type (company, framework, product), groups by canonical name

## What's Broken

| Gap | Detail |
|-----|--------|
| **No API endpoints** | `source_suggestions` table has no REST API — can't view, create, accept, or reject suggestions |
| **No URL resolution** | Discovery finds entity *names* (e.g., "Karpathy") but `suggested_url` is always NULL — no way to get from name → twitter.com/karpathy |
| **No agent integration** | MCP endpoint has no `intel_propose_source` tool — agents can't propose sources they discover in the feed |
| **No approval workflow** | `status` field exists (pending/accepted) but nothing transitions it — no auto-enable |
| **Weekly only** | Can't propose in real-time — agents wait up to 7 days |
| **No person type** | Discovery filters for company/framework/product — misses individual researchers like Karpathy |

## Three-Tier Fix

### Tier 1: Agent Proposal Endpoint (immediate value)

Add to Intel Hub:

1. **`POST /api/intel/source-suggestions`** — agents propose sources with URL, type, reasoning
2. **`GET /api/intel/source-suggestions`** — list pending proposals
3. **`PATCH /api/intel/source-suggestions/[id]`** — accept/reject (auto-creates feed_source on accept)
4. **MCP tool `intel_propose_source`** — so Argus can call it directly during daily runs

Add to Argus AGENTS.md:
- After processing feed, scan for entities with high mention counts but no matching source
- If found, propose via `intel_propose_source` with suggested URL and reasoning

### Tier 2: Confidence Scoring (smarter proposals)

Enhance `discoverSources()`:
- Add `person` to entity type filter (catches researchers, founders)
- Track mention trend (last 1 day vs last 7 days) — acceleration matters
- Weight by source credibility (save rate of mentioning sources)
- Score: `confidence = (distinct_sources / 5) * (mention_trend > 1 ? 1.5 : 1) * credibility_weight`

### Tier 3: Feedback Loop (self-improving)

- Track suggestion → source → actual engagement
- Learn: "suggestions from entity co-occurrence with confidence > 0.7 → 80% useful"
- Auto-adjust discovery thresholds
- Agent feedback on sources feeds back into reliability scoring

## Immediate Actions Taken

- Re-categorized `x-karpathy` from `research` → `agent-infrastructure` (now in ops feed)
- Fixed `gh-karpathy` source type from `github-releases` → `rss`
- Added `gist-karpathy` source for idea files
- All 3 verified and active

## Open Questions

- Should Tier 1 be implemented in the INTEL repo or as a Colosseum 2 gateway feature?
- Should auto-enable require human approval or can Argus autonomously add sources above a confidence threshold?
- How to handle URL resolution — web search? GitHub API? Manual?
