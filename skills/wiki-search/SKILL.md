---
name: wiki-search
description: "Search the local knowledge wiki. Start here before escalating to Intel Hub."
---

# Wiki Search — Local Knowledge Lookup

Search the compiled knowledge wiki in `intel/knowledge/` using tools you already have. Always try local search first — escalate to Intel Hub only when the wiki doesn't have what you need.

## Quick Reference

### 1. Browse the index

Read the master index for an overview of all articles, their summaries, and which agents they target:

```
Read intel/knowledge/README.md
```

### 2. See the concept map

View the relationship graph to understand how articles connect:

```
Read intel/knowledge/_catalog.md
```

### 3. Find articles about a concept

Search filenames and content for a keyword:

```bash
grep -r "concept-name" intel/knowledge/ --include="*.md" -l
```

### 4. Search article content

Find specific information with context:

```bash
grep -r "search term" intel/knowledge/ --include="*.md" -n -C 2
```

### 5. Find all articles linking to a specific article

Discover what references a given article (backlink discovery):

```bash
grep -r "filename.md" intel/knowledge/ --include="*.md" -l
```

### 6. Browse by category

```bash
ls intel/knowledge/topics/       # Curated topic articles
ls intel/knowledge/concepts/     # Atomic concept articles
ls intel/knowledge/projects/     # Per-project tracking
ls intel/knowledge/explorations/ # Filed Q&A results
```

## Escalation — Intel Hub Deep Research

When the local wiki doesn't have what you need, query the Intel Hub for deeper research across 400+ sources:

```bash
# RAG query — natural language question
curl -s -X POST https://intel.lemuriaos.ai/api/intel/mcp \
  -H "Authorization: Bearer $INTEL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"tool":"intel_hub_feed","input":{"url":"https://colosseum.org","limit":15}}'
```

**After using Intel Hub for research, file findings back to the wiki using the `wiki-file` skill.** This ensures your research "adds up" in the knowledge base.

## Search Strategy

1. **Start with README.md** — scan the index for relevant articles
2. **Grep for keywords** — find specific mentions across all articles
3. **Read matched articles** — get full context
4. **Check Related/Backlinks** — follow the cross-link graph
5. **Escalate to Intel Hub** — only if local wiki is insufficient
6. **File back** — capture new findings via `wiki-file`
