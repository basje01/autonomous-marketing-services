---
name: intel-hub
description: "Market intelligence via the Intel Hub API. Personalized feeds, BRAID digests, and feedback signals."
---

# Intel Hub — Market Intelligence Skill

Access 400+ curated sources (AI labs, crypto, Solana, marketing, research) via the Intel Hub API. Returns AI-summarized, relevance-scored intelligence.

## API Endpoint

All tools use a single endpoint:

```
POST https://intel.lemuriaos.ai/api/intel/mcp
Authorization: Bearer $INTEL_API_KEY
Content-Type: application/json
```

Request body: `{ "tool": "<tool_name>", "input": { ... } }`

## Tools

### intel_hub_feed

Get personalized market intelligence for a business URL. Returns relevance-scored, AI-summarized articles matched to that business via hybrid vector + keyword matching.

**Input:**
- `url` (string, required): Website URL to get intel for
- `limit` (number, optional): Max items to return (default 10, max 30)
- `daysBack` (number, optional): Look back N days (default 7, max 30)

```bash
curl -s -X POST https://intel.lemuriaos.ai/api/intel/mcp \
  -H "Authorization: Bearer $INTEL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"tool":"intel_hub_feed","input":{"url":"https://colosseum.org","limit":15,"daysBack":7}}'
```

**Response:** `{ ok, profile: { id, industry, keywords }, items: [{ id, title, summary, source, category, url, publishedAt, relevance }], itemCount }`

### intel_hub_digest

Get a synthesized BRAID-structured intelligence briefing. Returns 5-8 key insights grouped by theme with an executive TL;DR.

**Input:**
- `url` (string, required): Website URL to generate digest for
- `type` (string, optional): `daily` or `weekly` (default: daily)

```bash
curl -s -X POST https://intel.lemuriaos.ai/api/intel/mcp \
  -H "Authorization: Bearer $INTEL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"tool":"intel_hub_digest","input":{"url":"https://colosseum.org","type":"daily"}}'
```

**Response:** `{ ok, digest: { id, title, body (markdown), itemCount, type } }`

### intel_hub_feedback

Signal whether an article was useful or not. Feeds the learning loop to improve future relevance scoring.

**Input:**
- `item_id` (string, required): Feed item ID from intel_hub_feed results
- `signal` (string, required): `up` or `down`
- `context` (string, optional): Why it was useful/not useful (max 500 chars)

```bash
curl -s -X POST https://intel.lemuriaos.ai/api/intel/mcp \
  -H "Authorization: Bearer $INTEL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"tool":"intel_hub_feedback","input":{"item_id":"ITEM_ID","signal":"up","context":"relevant to campaign strategy"}}'
```

## Agent Workflows

### Argus (Chief of Staff)
1. Fetch daily digest for `https://colosseum.org`
2. Parse BRAID briefing for actionable signals
3. For each signal: create a GitHub issue with `intel` label
4. Send feedback (`up`/`down`) on items used in issues
5. For feed items with `metadata.hasVideo === true`: download `metadata.videoUrl` and transcribe with Whisper (skip if `metadata.videoDurationSec < 30`)

### Minerva (Marketing Strategist)
1. Before Copilot research, fetch intel feed for the client's URL
2. Use top-scored articles as additional competitive context
3. Cite intel sources alongside Copilot findings

### Any Agent
- Use `intel_hub_feed` for ad-hoc research on any topic URL
- Always send `intel_hub_feedback` after using articles — it trains the relevance model

## When API is Unavailable

If the Intel Hub is unreachable or `INTEL_API_KEY` is not set:
1. Log a BLOCKER comment on the current issue
2. Fall back to WebSearch for supplementary research
3. Clearly mark which findings are from Intel Hub vs. other sources
