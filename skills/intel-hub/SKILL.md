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

### Transcripts (Video Intelligence)

For feed items with video, the Intel Hub automatically transcribes using whisper-large-v3 with speaker diarization. No local processing needed.

```bash
curl -s -H "Authorization: Bearer $INTEL_API_KEY" \
  "https://intel.lemuriaos.ai/api/intel/feed/{itemId}/transcript"
```

**Query params (optional):**
- `speaker` — filter by speaker ID (e.g. `SPEAKER_00`)
- `from` / `to` — time range in seconds (e.g. `from=30&to=60`)

**Response:**
```json
{
  "ok": true,
  "language": "en",
  "languageConfidence": 0.5,
  "fullText": "The complete transcript...",
  "fullTextEn": null,
  "modelUsed": "whisper-large-v3",
  "segments": [
    {
      "index": 0,
      "start": 0,
      "end": 1.6,
      "speaker": "SPEAKER_00",
      "speakerName": "@handle",
      "text": "Segment text...",
      "confidence": 0.5
    }
  ]
}
```

**Status responses:**
- `{ "ok": false, "error": "transcript_not_ready", "status": "processing" }` — still transcribing
- `{ "ok": false, "error": "transcript_not_found" }` — not yet queued for processing

**Features:** Speaker diarization (pyannote), speaker name resolution from tweet author, auto-translation for non-English content, audio fingerprint deduplication across reposts.

## Agent Workflows

### Argus (Chief of Staff)
1. Read `intel/intel-package.json` — the single source of truth for feed categories, limits, and transcript settings. Build the feed query from its `feed` object. Do NOT hardcode query parameters.
2. Fetch intel from all source types (twitter, github-releases, youtube, rss):
   ```bash
   curl -s -H "Authorization: Bearer $INTEL_API_KEY" \
     "https://intel.lemuriaos.ai/api/intel/feed?categories={from config}&limit={from config}&sort={from config}"
   ```
3. Scan for actionable signals:
   - **BREAKING**: releases, deprecations, security issues (e.g. "Anchor v1.0.0 is live")
   - **FEATURE**: new capabilities to integrate
   - **PATTERN**: market signals worth noting
   - **COMPETITIVE**: market positioning signals
4. For video items with `videoDurationSec >= {transcripts.minDurationSec}`: fetch transcript via `GET /api/intel/feed/{id}/transcript`. If `transcript_not_ready`, add to transcript backlog. Include speaker-labeled quotes in issue body.
5. Process transcript backlog (`intel/transcript-backlog.json`): re-check pending items, include completed transcripts, expire items older than `transcripts.maxRetryDays` days.
6. Write summary to `intel/latest-digest.md` (overwrite entire file)
7. For BREAKING/FEATURE: create subtask issues with specific file paths
8. Send feedback (`up`/`down`) on items that produced issues

### Minerva (Marketing Strategist)
1. Before Copilot research, fetch intel feed for the client's URL
2. Use top-scored articles as additional competitive context
3. Cite intel sources alongside Copilot findings

### Any Agent
- Use `intel_hub_feed` for ad-hoc research on any topic URL
- Always send `intel_hub_feedback` after using articles — it trains the relevance model

## Intel Package

The intel package (`intel/intel-package.json`) is the single source of truth for what intelligence sources and categories agents should query. Agents MUST read this file and construct their feed queries from its `feed` object — never hardcode query parameters in agent instructions.

### Syncing Sources

Register missing sources in Intel Hub:

```bash
INTEL_API_KEY=xxx pnpm sync-intel
```

Reads `required_sources` from the package, checks Intel Hub, and POSTs any that don't exist yet. Validates atom URLs before registering (warns on 404). Idempotent — safe to run repeatedly.

### Transcript Backlog

`intel/transcript-backlog.json` tracks video items whose transcripts are still processing. This file is gitignored (runtime state). If it does not exist on first run, create it with `{ "pending": [] }`. Each Argus run:
1. Re-check pending items → include completed transcripts in digest (then remove from pending)
2. Expire items older than `transcripts.maxRetryDays` days (remove from pending)
3. Add new "not ready" items from current feed to pending

Items appear in the digest exactly once — on completion or expiry.

## When API is Unavailable

If the Intel Hub is unreachable or `INTEL_API_KEY` is not set:
1. Log a BLOCKER comment on the current issue
2. Fall back to WebSearch for supplementary research
3. Clearly mark which findings are from Intel Hub vs. other sources
