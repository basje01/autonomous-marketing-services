# Knowledge Base

> Auto-maintained by Hermes. Last updated: 2026-04-06.
> 8 articles across 8 topics, 0 concepts, 0 projects, 1 exploration.

## Structure

```
knowledge/
  README.md              ← This file (auto-maintained master index)
  _catalog.md            ← Concept map (Mermaid graph of cross-links)
  _log.md                ← Append-only chronological operations log
  _lint-report.md        ← Latest lint findings
  topics/                ← Curated topic articles (migrated from flat knowledge/)
  concepts/              ← Atomic concept articles (extracted by Hermes during compilation)
  projects/              ← Per-project/product tracking
  explorations/          ← Filed Q&A results — agent research that "adds up"
```

## Topics

| File | Summary | Last Verified | Agents |
|------|---------|---------------|--------|
| [paperclip-practices](topics/paperclip-practices.md) | Architecture and operational patterns for Paperclip agent systems | 2026-04-03 | all |
| [claude-code-practices](topics/claude-code-practices.md) | Boris Cherny's 3-part formula for Claude Code | 2026-04-03 | all |
| [distribution-strategies](topics/distribution-strategies.md) | Greg Isenberg's 7 distribution strategies for AI-era startups | 2026-04-03 | minerva, hermes, calliope, mercury |
| [web-data-layer](topics/web-data-layer.md) | Greg's 5-layer agent stack with Firecrawl as web data layer | 2026-04-03 | hermes, calliope |
| [competitive-landscape](topics/competitive-landscape.md) | Paperclip ecosystem stats, market validation, our differentiators | 2026-04-03 | minerva |
| [case-studies](topics/case-studies.md) | Production Paperclip users — e-commerce, dentist, roofing, enterprise | 2026-04-03 | minerva, calliope |
| [pitch-quotes](topics/pitch-quotes.md) | Curated quotable lines organized by pitch section | 2026-04-03 | minerva, calliope |
| [paperclip-podcast-alpha](topics/paperclip-podcast-alpha.md) | Full Greg x Dotta podcast analysis — 15 insights | 2026-04-03 | all |

## Concepts

_None yet. Hermes will extract and create concept articles during wiki compilation._

## Projects

_None yet. Hermes will create per-project tracking articles during wiki compilation._

## Recent Explorations

| Date | Question | Filed By | Concepts |
|------|----------|----------|----------|
| 2026-04-06 | How can agents autonomously discover and propose new Intel Hub sources? | manual | source-discovery, intel-hub, self-learning |

_Agents file research findings here via the `wiki-file` skill. Queries "add up" over time._

## Rules

- **Append-only**: Never delete articles, only add or update with new `last-verified` date
- **Source required**: Every fact must have a source (transcript ID, tweet URL, or document)
- **Staleness**: Argus checks monthly. If `last-verified` > 30 days, Hermes creates refresh issue
- **New entries**: Sourced from drafts in `drafts/ops/` and `drafts/fmo/`, reviewed by Hermes before promotion
- **Multi-package**: Knowledge is shared across all packages — the brain is unified, inputs are namespaced
- **Cross-linking**: Every article has `## Related` (outgoing) and `## Backlinks` (incoming) sections
- **Filing back**: Agent research results filed to `explorations/` via `wiki-file` skill
