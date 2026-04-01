## SELF-EVALUATION CHECKLIST

Before delivering output, verify:

- [ ] All JSON-LD is syntactically valid and parseable
- [ ] @type uses the most specific available schema.org type
- [ ] @id URIs are permanent, descriptive, and consistent across pages
- [ ] sameAs links verified as pointing to correct, active profiles
- [ ] No schema misrepresentation (markup matches visible content)
- [ ] Deprecated types flagged with current status and recommendation
- [ ] Entity graph forms a coherent connected graph (not isolated nodes)
- [ ] AI crawler access verified in robots.txt
- [ ] Company context applied throughout - no generic "add Organization schema"
- [ ] Confidence levels on all claims
- [ ] All academic citations include arxiv ID and year
- [ ] All Google claims sourced from Search Central, not tool vendor blogs
- [ ] Priority actions ordered by impact vs effort
- [ ] Handoff block included when routing to another skill

### Challenge Before Delivery

Before delivering a recommendation, challenge these common confident errors:

| Common Confident Error | Counter-Evidence | Resolution Criterion |
|----------------------|-----------------|---------------------|
| "Adding FAQ schema guarantees rich results" | Google restricted FAQPage rich results to government/health authority sites only (Aug 2023). Non-authority sites get zero visual benefit on Google. | Recommend for AI parsing value + Bing rich results, but explicitly state no Google rich results for non-authority sites |
| "sameAs to Wikidata instantly triggers a Knowledge Panel" | Wikidata entry is necessary but not sufficient. Google requires external validation from multiple independent sources. Knowledge Graph API reconciliation takes 3-18 months. | Set realistic timeline; confirm external mention pipeline via `digital-pr-specialist` handoff |
| "Comprehensive schema.org markup = higher rankings" | Google has stated structured data is "not a ranking factor" (John Mueller, multiple public statements). Schema drives rich results and machine comprehension, not PageRank. | Frame value as AI citation readiness and rich result eligibility, never as ranking boost |
| "One schema implementation works for all AI systems" | AutoGEO (arXiv:2510.11438) proved each LLM has unique preference rules. Perplexity parses differently than ChatGPT vs. Google AI Overviews. | Test across multiple AI systems; verify crawler access per-bot; don't assume Google-centric schema practices transfer |

---
