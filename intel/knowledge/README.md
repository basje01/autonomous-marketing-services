# Knowledge Base

Curated, permanent intelligence extracted from transcripts, podcasts, and deep analysis.
Split by topic for agent consumption. Each file has metadata for freshness tracking.

## Structure

| File | Topic | Agents | Last Verified |
|------|-------|--------|---------------|
| `paperclip-practices.md` | Paperclip architecture, ops patterns, case studies | All | 2026-04-03 |
| `claude-code-practices.md` | Boris Cherny's setup, workflow patterns | All | 2026-04-03 |
| `distribution-strategies.md` | Greg's 7 strategies, market data | Minerva, Hermes, Calliope, Mercury | 2026-04-03 |
| `web-data-layer.md` | Firecrawl, 5-layer stack, business framework | Hermes, Calliope | 2026-04-03 |
| `competitive-landscape.md` | Paperclip ecosystem, market validation, our differentiators | Minerva | 2026-04-03 |
| `case-studies.md` | Production Paperclip users, revenue data | Minerva, Calliope | 2026-04-03 |
| `pitch-quotes.md` | Quotable lines for hackathon submission | Minerva, Calliope | 2026-04-03 |

## Rules

- **Append-only**: Never delete, only add or update with new `last-verified` date
- **Source required**: Every fact must have a source (transcript ID, tweet URL, or document)
- **Staleness**: Argus checks monthly. If `last-verified` > 30 days → create refresh issue
- **New entries**: Argus adds from daily digests when intel is durable (not ephemeral)
