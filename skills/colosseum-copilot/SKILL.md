---
name: colosseum-copilot
description: "Research Solana projects and hackathon archives via the Colosseum Copilot API."
---

# Colosseum Copilot — Competitive Research Skill

Research the Solana ecosystem using the Colosseum Copilot API. Provides access to 5,400+ projects and 84,000+ archives from past hackathons.

## API Endpoints

Base URL: `https://arena.colosseum.org/api/copilot`
Auth: Bearer token via `COLOSSEUM_COPILOT_PAT` environment variable.

### Search Projects

```
GET /search/projects?q={query}&limit=10
```

Returns projects matching the query. Each result includes:
- `slug` — unique project identifier
- `name` — project display name
- `description` — what the project does
- `hackathon` — which hackathon it was submitted to
- `tracks` — which tracks it competed in

### Search Archives

```
GET /search/archives?q={query}&limit=10
```

Returns archived hackathon submissions, presentations, and retrospectives.

## Usage

1. Search for projects similar to the client's product (minimum 3 queries)
2. Search archives for relevant hackathon strategies and outcomes (minimum 1 query)
3. Cite findings with project slugs and archive titles in your strategy

## Citation Format

- Project: `[project-name](slug: project-slug)` from [hackathon-name]
- Archive: `[archive-title]` from Colosseum Archives

## When API is Unavailable

If the Copilot API is unreachable or `COLOSSEUM_COPILOT_PAT` is not set:
1. Log a BLOCKER comment on the issue
2. Fall back to local intel files in `intel/` directory for competitive data
3. Use WebSearch for supplementary research
4. Clearly mark which findings are from Copilot vs. other sources
