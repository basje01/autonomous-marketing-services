## DEEP EXPERT KNOWLEDGE

### Multi-Agent Orchestration Architecture

The orchestrator implements a hierarchical coordination topology. Kim et al. (arXiv:2512.08296, 2025) tested five agent architectures and found that centralised coordination contained errors to 4.4x amplification, while independent agents magnified errors 17.2x. This empirically validates the hub-and-spoke model: the orchestrator as central coordinator, with sub-orchestrators as domain hubs, and specialist skills as spokes.

The architecture has three tiers:

**Tier 1: Main Orchestrator (this skill)**
Owns company context detection, cross-domain coordination, conflict resolution, and final synthesis. Routes to Tier 2 for domain-specific work or directly to Tier 3 for simple single-skill tasks.

**Tier 2: Domain Sub-Orchestrators (11)**
Each owns routing within their domain. The seo-geo-orchestrator knows which combination of SEO Expert, Technical SEO Specialist, and Agentic Marketing Expert handles a given SEO request. The orchestrator does not need this knowledge - it delegates. See AGENT REGISTRY for the full list.

**Tier 3: Specialist Skills (40+)**
Each owns deep domain expertise. The orchestrator interfaces with them through the I/O contract - inputs and outputs only. Never reach into a skill's internal logic.

### Task Decomposition and Routing

Task decomposition is the critical orchestration function. The Plan-and-Solve approach (Wang et al., arXiv:2305.14325, 2023) demonstrated that decomposing complex tasks into subtasks before execution significantly improves accuracy. The orchestrator applies this principle: parse the request into domains, identify dependencies, then route.

The Tree of Thoughts framework (Yao et al., arXiv:2305.10601, NeurIPS 2023) showed that exploring multiple reasoning paths with self-evaluation outperforms linear chain-of-thought by an order of magnitude on complex tasks. For the orchestrator, this means considering multiple routing strategies before committing - especially for cross-domain requests where the order of skill activation matters.

The routing decision tree:

```
Is the request clearly within ONE domain?
├── YES → Route to that domain's sub-orchestrator
└── NO (crosses domains or is ambiguous)
    ├── Simple single-skill task? → Route directly to specialist skill
    ├── Speed-critical? → Route directly to specialist skill
    └── Crosses multiple domains? → Handle in main orchestrator
        ├── Identify parallelisable subtasks → activate in parallel
        ├── Identify sequential dependencies → chain with handoffs
        └── Coordinate synthesis when all complete
```

### Scaling Principles (Empirical)

Kim et al. (arXiv:2512.08296, 2025) established quantitative scaling laws for agent systems:

```
USE MULTI-SKILL when:                USE SINGLE-SKILL when:
├── Parallelisable tasks (+80.8%)    ├── Sequential reasoning (-39-70%)
├── Cross-domain work                ├── Simple factual queries
├── Quality-critical tasks           ├── Single-agent >45% capable
├── Independent subtasks             ├── Speed-critical requests
└── Diverse expertise needed         └── Tool-heavy tasks (coordination overhead)
```

The capability saturation threshold at 45% is critical: if a single skill can handle the request with >45% confidence on its own, multi-skill coordination adds overhead without proportional benefit.

### Difficulty-Aware Routing

Replace model-tier routing with skill-difficulty routing (arXiv:2509.11079). The orchestrator classifies task difficulty, then selects routing depth:

```
DIFFICULTY CLASSIFICATION:
├── TRIVIAL (single fact, lookup, clear domain)
│   → Direct skill, no synthesis, no verification
│   → Example: "What's our Shopify theme?" → Fullstack Engineer
│
├── STANDARD (domain-specific, clear scope, bounded output)
│   → Single skill with full playbook execution
│   → Example: "Write meta descriptions for product pages" → SEO Expert
│
├── COMPLEX (cross-domain, ambiguous, high-stakes, or client-facing)
│   → Multi-skill with verification gate
│   → Example: "Audit our entire marketing funnel" → 3+ sub-orchestrators + synthesis
```

### Verification Gate Pattern

The Challenger+Inspector pattern (arXiv:2408.00989) adds a verification step for high-stakes outputs. A second skill checks the producing skill's output before delivery.

```
WHEN TO APPLY:
├── Client-facing deliverables (proposals, audits, reports)
├── Security assessments
├── Budget recommendations (paid media, resource allocation)
├── Any output with confidence < 0.7
└── Multi-skill chains longer than 2 hops

GATE FLOW:
Producer Skill → Orchestrator (quality check) → Verifier Skill → Delivery
Cost: ~1.3× token usage
Benefit: catches cascading errors before they reach clients

v3.1 SKILLS:
Skills declaring schema_version "3.1" have built-in Escalation Triggers
in their I/O CONTRACT. When a v3.1 skill returns LOW confidence, check
its ESCALATION TRIGGERS table - it may have already identified the
correct routing target. Prefer the skill's own escalation over generic
orchestrator fallback.
```

### Token Economics

Multi-skill orchestration multiplies context cost. Budget explicitly:

```
200K context window (Claude Opus 4.6)
├── SKILL.md:           10-15K tokens (loaded once per skill)
├── References:          5-20K tokens (loaded on demand, not preemptively)
├── Task context:      100-150K tokens (user request + artifacts)
├── Tool results:       20-40K tokens (search, code, data)
└── Safety margin:      20-30K tokens (never exceed 170K utilized)

3-skill parallel execution uses 3× the SKILL.md budget (~36-45K)
Sequential chains accumulate: 15K → 30K → 45K (context grows)
```

See `orchestrator/research/orchestration-architectures.md` for detailed token economics and optimization strategies.

### Context Propagation and State Management

The orchestrator manages state across skill activations. This is analogous to the context window in transformer architectures - information that is not explicitly passed forward is lost. The handoff protocol exists to prevent context loss:

1. **Explicit state transfer**: Every handoff includes what was done, what was found, and what the next skill should produce
2. **Company context persistence**: Company context is set once and propagated to every skill activation - skills should never need to re-detect it
3. **Operational context injection**: When `_orient.md` exists for the active client, include it in context passed to activated skills. This gives skills awareness of active experiments, safety boundaries, and recent learnings without requiring independent access to client-ops
4. **Confidence propagation**: Confidence levels from upstream skills constrain downstream confidence - the overall confidence cannot exceed the minimum of contributing skills
5. **Failure state propagation**: If a skill fails, the failure reason and fallback strategy are passed forward, not silently absorbed

### Conflict Resolution Theory

Multi-agent debate (Du et al., arXiv:2305.14325, 2023) showed that having multiple LLM instances propose and debate responses reduces hallucinations and improves factual accuracy. The orchestrator's conflict resolution protocol applies this principle: when two skills disagree, the resolution is systematic, not arbitrary.

The resolution hierarchy:
1. **Source quality**: Which skill used TIER 1 (primary) sources vs TIER 2?
2. **Recency**: In fast-moving domains (social algorithms, ad platforms), recency wins
3. **Confidence level**: HIGH > MEDIUM > LOW
4. **Business impact**: Which output better serves the specific business question?
5. **Escalation**: If unresolved, present BOTH outputs with the conflict explicitly noted

### AGENT REGISTRY

| Skill Slug | Trigger Signals | Required Inputs | If No Match | Notes |
|-----------|----------------|----------------|-------------|-------|
| `seo-geo-orchestrator` | SEO, GEO, AEO, AI search visibility, JSON-LD, sitemap, robots.txt, search rankings | target URL, company context | HOLD - ask for URL | 38 workflow skills; most mature sub-orchestrator |
| `content-orchestrator` | Content strategy, editorial, copywriting, hooks, email flows, positioning | content brief, company context, brand voice | HOLD - ask for brief | 14 workflow skills (copy + email + positioning + launch) |
| `creative-orchestrator` | Creative direction, landing pages, visual design, brand expression, design system | design brief, brand guidelines, deliverable format | HOLD - ask for brief | 14 workflow skills |
| `engineering-orchestrator` | Code, engineering, database, deploy, CI/CD, refactoring, architecture | codebase location, tech stack, requirements | HOLD - ask for scope | No workflow skills |
| `analytics-orchestrator` | Data analysis, attribution, A/B testing, experimentation, GA4, conversion | data sources, KPIs, time range, company context | HOLD - ask for KPIs | 4 CRO workflow skills |
| `paid-media-orchestrator` | Google Ads, Meta Ads, TikTok Ads, paid advertising, budget allocation | platform targets, budget, campaign objectives | HOLD - ask for platform | No workflow skills |
| `social-media-sub-orchestrator` | Social media content, posting, algorithms, audience growth, platform strategy | platform targets, company context | HOLD - ask for platform | No workflow skills |
| `social-orchestrator` | Social intelligence, multi-feed extraction, sentiment analysis, social listening | feed targets, analysis scope, company context | HOLD - ask for feeds | Cross-platform synthesis |
| `generative-art-orchestrator` | Images, video, generative art, PFP, visual creation, AI art tools | style guide, asset requirements, output format | HOLD - ask for format | No workflow skills |
| `defi-orchestrator` | DeFi protocols, agent finance, treasury, x402, ERC-8004, AWAL, autonomous finance | protocol targets, chain context | HOLD - ask for protocol | Status: exploration |
| `quality-orchestrator` | Code review, deploy readiness, security audit, multi-domain audit, quality gate | artifact, gate level (SIMPLE/MODERATE/COMPLEX) | ESCALATE to human | Routes to auditor specialists |
| `data-science-orchestrator` | ML, data science, predictions, recommendations, forecasting, RL | model requirements, data sources, company context | HOLD - ask for scope | Routes to ml-engineer, deep-learning-engineer, nlp-engineer, etc. |

### ROUTING LOGIC

| Task Type | Trigger Signal | Route To | Required Inputs | If No Match |
|-----------|---------------|----------|----------------|-------------|
| Single-domain request | Clearly within one sub-orchestrator's domain | Domain sub-orchestrator (see AGENT REGISTRY) | Company context + domain-specific inputs | HOLD - ask for domain clarification |
| Simple single-skill task | Clear domain, bounded scope, one specialist sufficient | Specialist skill directly (skip sub-orchestrator) | Company context + task-specific inputs | Route to sub-orchestrator instead |
| Cross-domain request | Spans 2+ sub-orchestrator domains | Coordinate sub-orchestrators in parallel | Per-domain subtask decomposition + dependency graph | Decompose further or ask for scope |
| Quality gate (COMPLEX) | Client-facing deliverable, security assessment, or confidence < 0.7 | `quality-orchestrator` | Artifact + gate level + original brief | HOLD - verify gate level applies |
| Mission-style audit | "full audit", "client doctor", "mission" | `client-doctor` → domain sub-orchestrators | Company context + audit scope + target | HOLD - ask for audit scope |
| No domain match | Request doesn't map to any sub-orchestrator | Ask user for clarification | - | Never guess - ask |

**Direct skill routing shortcuts** (bypass sub-orchestrator when task is single-skill):

| Trigger Keyword | Direct Skill | Condition |
|----------------|-------------|-----------|
| "security check/pen test" | Security Check | Single security scan, not multi-domain audit |
| "build dashboard" | Fullstack Engineer | Clear spec, no design decisions pending |
| "data pipeline/ETL" | Data Engineer + Database Architect | Technical implementation, not analytics |
| "email flow/Klaviyo" | Email Marketing Specialist | Single email task, not campaign strategy |
| "LLM/MCP/RAG" | Generative AI Expert | AI/ML implementation, not product strategy |
| "deploy" | DevOps Engineer + Security Check | Deployment task, not architecture |
| "refactor" | DRY/SOC Developer + Backend Engineer | Code quality, not feature work |
| "research/trends" | Knowledge Curator + domain skill | Exploratory research, not deliverable |

---
