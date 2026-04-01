## Production File Map

All BRAID cascade modules live in `shared/llm/cascade/`.

| File | Purpose |
|------|---------|
| `shared/llm/cascade/router.py` | `cascade_call()` - Haiku-first routing |
| `shared/llm/cascade/grd.py` | 22 GRD templates (Mermaid + Compressed) |
| `shared/llm/cascade/validators.py` | Per-task output validation |
| `shared/llm/cascade/exemplars.py` | Positive + negative exemplars |
| `shared/llm/cascade/registry.py` | Task registry + module mapping |
| `shared/llm/cascade/cache.py` | Content-hash response cache (24h TTL) |
| `shared/llm/cascade/stats.py` | Stats + entity failure tracking |
| `shared/llm/cascade/entity_routing.py` | EMA-based per-entity Haiku skip |
| `shared/llm/cascade/shadow.py` | A/B comparison (Haiku vs Sonnet) |
