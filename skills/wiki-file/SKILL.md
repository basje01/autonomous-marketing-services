---
name: wiki-file
description: "File research findings back into the knowledge wiki. Makes agent queries 'add up' over time."
---

# Wiki File — Capture Research Findings

After completing research (Intel Hub queries, competitive analysis, deep dives), file the findings back into the knowledge wiki so they compound over time. This is the Karpathy pattern: explorations always "add up."

## When to Use

- After a deep Intel Hub RAG query that produced actionable findings
- After competitive research for a campaign
- After analyzing a transcript or source document
- After answering a complex question that required multi-source synthesis
- When Argus identifies HIGH-priority signals in the daily digest

**Rule of thumb**: If you spent more than 2 minutes researching something and produced a synthesis, it's worth filing.

## Procedure

### 1. Write the exploration file

Create a new file in `intel/knowledge/explorations/`:

```
intel/knowledge/explorations/YYYY-MM-DD-{slug}.md
```

Use this template:

```markdown
---
type: exploration
question: "The question that was researched"
asked-by: {your-agent-name}
date: YYYY-MM-DD
sources:
  - "Source 1 (URL or ID)"
  - "Source 2 (URL or ID)"
concepts: [concept-slug-1, concept-slug-2]
summary: "One-sentence summary of the finding."
---

# {Title}

{Your synthesized findings. Include:}
- Key facts discovered
- Connections to existing knowledge
- Implications for our system
- Open questions remaining

## Sources

- [Source 1](url) — what it contributed
- [Source 2](url) — what it contributed
```

### 2. Update backlinks

For each concept listed in the `concepts:` frontmatter, check if a concept article exists:

- If `intel/knowledge/concepts/{slug}.md` exists → add a backlink to it:
  ```markdown
  ## Backlinks
  - [YYYY-MM-DD-{slug}](../explorations/YYYY-MM-DD-{slug}.md)
  ```

- If the concept article doesn't exist yet, that's fine — Hermes will create it during the next compilation run if the concept appears 3+ times.

### 3. Update the index

Add a row to the "Recent Explorations" table in `intel/knowledge/README.md`:

```markdown
| YYYY-MM-DD | Question text | agent-name | concept-1, concept-2 |
```

## Naming Conventions

- **Filename**: `YYYY-MM-DD-{descriptive-slug}.md` (e.g. `2026-04-06-vertical-ai-positioning.md`)
- **Slug**: kebab-case, lowercase, max 5 words
- **Concepts**: Use existing concept slugs from `intel/knowledge/concepts/` when possible

## What NOT to File

- Routine feed items (Argus already captures these in `raw/`)
- Raw data without synthesis (belongs in `raw/`, not `explorations/`)
- Duplicate findings (check existing explorations first via `wiki-search`)
- Speculative conclusions without sources (must have at least one verifiable source)
