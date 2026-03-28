---
name: braid-marketing
description: "BRAID reasoning framework for marketing agents. Provides bounded GRDs (Guided Reasoning Diagrams) that prevent reasoning drift, enforce evidence-based output, and ensure structured deliverables across all 6 agent roles."
---

# BRAID Reasoning for Marketing Agents

Based on BRAID (Bounded Reasoning for Autonomous Inference and Decisions) — arXiv:2512.15959. Replaces unbounded Chain-of-Thought with structured Mermaid diagrams that encode reasoning as a bounded, symbolic graph.

**Why BRAID for marketing agents:**
- Prevents "generic marketing advice" drift
- Forces evidence-based claims (Critic nodes)
- Ensures structured, consistent output across campaigns
- Catches missing sections before delivery

## Execution Protocol

When following a GRD:
1. **State Location:** `📍 Node [ID]: [Label]`
2. **Single Action:** ONLY that node's action
3. **Explicit Decisions:** Evaluate condition → state outcome → declare path
4. **No Invention:** No nodes not in the diagram
5. **No Skipping:** Every node, even if it seems redundant
6. **Loop Limits:** Max 3 iterations on any cycle
7. **Terminal Required:** Must reach a terminal node

---

## GRD 1: Marketing Strategist — Research → Strategy → Delegate

Use this GRD when the Strategist receives a new project brief.

```mermaid
graph TD
    A[Parse brief: extract name, description, audience, URL] --> B{Brief complete?}
    B -->|Missing fields| C[Log BLOCKER: list missing fields] --> FAIL[Terminal: blocked]
    B -->|Complete| D[Load colosseum-copilot skill]
    D --> E[Search projects: 3 queries minimum]
    E --> F[Search archives: 1 query minimum]
    F --> G{Found ≥3 project refs + ≥1 archive ref?}
    G -->|No| H[Broaden queries, retry] --> E
    G -->|Yes| I[Synthesize ICP from research]
    I --> J[Write JTBD statement]
    J --> K[Build messaging hierarchy: primary + 3 supporting + proofs]
    K --> L{Every message has a proof point?}
    L -->|No| M[Add proof or remove message] --> K
    L -->|Yes| N[Design channel plan with KPIs]
    N --> O[Write 4 subtask descriptions with success criteria]
    O --> CR1{Critic: all subtasks have explicit inputs?}
    CR1 -->|No| FIX1[Add missing inputs] --> O
    CR1 -->|Yes| CR2{Critic: all subtasks have success criteria?}
    CR2 -->|No| FIX2[Add success criteria] --> O
    CR2 -->|Yes| CR3{Critic: strategy cites ≥3 project slugs?}
    CR3 -->|No| FIX3[Add citations from research] --> K
    CR3 -->|Yes| P[Post strategy as comment]
    P --> Q[Create 4 subtask issues via API]
    Q --> T[Terminal: mark task done]
```

---

## GRD 2: SEO Agent — Audit → Research → Recommend

```mermaid
graph TD
    A[Parse strategy context: extract URL, ICP, keywords] --> B{URL provided?}
    B -->|No| C[Skip technical audit, note limitation] --> E
    B -->|Yes| D[Technical audit: crawl, structure, CWV, schema]
    D --> E[Keyword research: 20-30 keywords]
    E --> F[Classify each: intent type + difficulty + volume]
    F --> CR1{Critic: ≥15 keywords with all 3 fields?}
    CR1 -->|No| G[Research more keywords] --> E
    CR1 -->|Yes| H[Write meta tags: title <60 chars, desc <160 chars]
    H --> CR2{Critic: character limits respected?}
    CR2 -->|Over| I[Shorten] --> H
    CR2 -->|OK| J[Recommend JSON-LD schema markup]
    J --> CR3{Critic: schema validates against schema.org?}
    CR3 -->|Invalid| K[Fix schema] --> J
    CR3 -->|Valid| L[Write content brief for top keyword]
    L --> CR4{Critic: brief targets specific intent?}
    CR4 -->|Generic| M[Refine to match intent] --> L
    CR4 -->|Specific| T[Terminal: post deliverable, mark done]
```

---

## GRD 3: Content Agent — Direction → Create → Verify

```mermaid
graph TD
    A[Parse strategy: extract ICP, messaging, voice] --> B{Messaging hierarchy available?}
    B -->|No| C[Log BLOCKER: need strategy first] --> FAIL[Terminal: blocked]
    B -->|Yes| D[Write 3 headline candidates: outcome + result + audience]
    D --> CR1{Critic: all headlines <12 words?}
    CR1 -->|Over| E[Shorten] --> D
    CR1 -->|OK| F[Write full homepage copy: 7 sections]
    F --> CR2{Critic: every section earns next scroll?}
    CR2 -->|Filler detected| G[Replace filler with proof] --> F
    CR2 -->|OK| H[Write 3 Twitter threads: 5-7 tweets each]
    H --> CR3{Critic: first tweet has hook in <280 chars?}
    CR3 -->|No| I[Rewrite hook] --> H
    CR3 -->|Yes| J[Score each thread with RAID framework]
    J --> K[Write blog post: 800-1200 words]
    K --> CR4{Critic: targets keyword from SEO brief?}
    CR4 -->|Off-topic| L[Refocus on keyword] --> K
    CR4 -->|On-target| CR5{Critic: any unsupported superlatives?}
    CR5 -->|Yes| M[Add proof or remove claim] --> F
    CR5 -->|No| T[Terminal: post deliverable, mark done]
```

---

## GRD 4: Social Agent — Plan → Schedule → Verify

```mermaid
graph TD
    A[Parse strategy: extract channels, audience, voice] --> B{Strategy context available?}
    B -->|No| C[Log BLOCKER: need strategy first] --> FAIL[Terminal: blocked]
    B -->|Yes| D[Define posting cadence + optimal times]
    D --> E[Plan Week 1: edu 40%, engage 30%, promo 20%, community 10%]
    E --> F[Plan Weeks 2-4: vary themes per week]
    F --> CR1{Critic: 4 full weeks with specific content?}
    CR1 -->|Incomplete| G[Fill missing days] --> E
    CR1 -->|Complete| CR2{Critic: content mix ratios correct?}
    CR2 -->|Off| H[Rebalance] --> E
    CR2 -->|OK| I[Write first-hour playbook: minute-by-minute]
    I --> J[Write engagement strategy: replies, QTs, threads]
    J --> CR3{Critic: every post has purpose + metric?}
    CR3 -->|Missing| K[Add purpose/metric] --> E
    CR3 -->|All have| T[Terminal: post deliverable, mark done]
```

---

## GRD 5: Community Agent — Research → Build → Verify

```mermaid
graph TD
    A[Parse strategy: extract project type, audience, channels] --> B{Project type clear?}
    B -->|No| C[Log BLOCKER: unclear project type] --> FAIL[Terminal: blocked]
    B -->|Yes| D[Write FAQ: 15-20 questions across 3 categories]
    D --> CR1{Critic: ≥15 questions covering product + tech + tokenomics?}
    CR1 -->|Short| E[Add questions for missing category] --> D
    CR1 -->|OK| CR2{Critic: answers specific to THIS project?}
    CR2 -->|Generic| F[Rewrite with project-specific details] --> D
    CR2 -->|Specific| G[Design onboarding: welcome + channels + milestones]
    G --> H[Write engagement playbook: weekly + monthly + UGC]
    H --> I[Write escalation framework: FUD + bugs + crisis]
    I --> CR3{Critic: escalation covers all 3 scenarios?}
    CR3 -->|Missing| J[Add missing scenario] --> I
    CR3 -->|Complete| T[Terminal: post deliverable, mark done]
```

---

## GRD 6: Chief of Staff — Monitor → Triage → Report

```mermaid
graph TD
    A[Fetch all active issues in company] --> B[Check each for BLOCKER comments]
    B --> C{Any BLOCKERs found?}
    C -->|Yes| D[Triage: can I resolve it?]
    D -->|Yes| E[Resolve and comment] --> B
    D -->|No| F[Escalate to board with summary]
    C -->|No| G[Check issue statuses: any stale >2 heartbeats?]
    G --> H{Stale agents found?}
    H -->|Yes| I[Flag as potentially stuck] --> F
    H -->|No| J[Check completed issues against success criteria]
    J --> CR1{Critic: all done issues meet criteria?}
    CR1 -->|Fail| K[Reopen with specific feedback] --> F
    CR1 -->|Pass| L[Update autonomy log]
    L --> M{All 4 downstream agents done + passed?}
    M -->|No| T1[Terminal: post status report, campaign in progress]
    M -->|Yes| T2[Terminal: post completion report, mark campaign done]
```

---

## Negative Exemplars (Common Marketing Agent Failures)

```
BAD: "Our platform is the best solution for all your needs."
WHY BAD: Unsupported superlative ("best"), generic audience ("all your needs").
         Critic CR5 should catch this.

BAD: "Increase engagement by posting more content."
WHY BAD: Generic advice with no specifics. Missing: what content, what platform,
         what cadence, what metric defines "engagement."

BAD: Keywords: "crypto", "blockchain", "DeFi"
WHY BAD: Keywords missing volume, intent, and difficulty.
         Critic CR1 in SEO GRD should catch this.

BAD: FAQ: "What is blockchain? Blockchain is a distributed ledger technology."
WHY BAD: Generic answer not specific to THIS project.
         Critic CR2 in Community GRD should catch this.
```

## Positive Exemplar (Strategist Output)

```json
{
  "research": {
    "project_refs": ["solpay-renaissance", "helio-radar", "sphere-breakout"],
    "archive_refs": ["Multicoin: State of Crypto Payments 2025"],
    "gap_classification": "partial — UX layer missing"
  },
  "icp": {
    "who": "Crypto-native e-commerce merchants on Shopify",
    "pain": "3-5 day settlement, 2.9% processing fees",
    "gain": "Sub-second settlement, <$0.01 fees"
  },
  "messaging": {
    "primary": "Accept crypto payments with the speed of Solana",
    "supporting": ["Sub-second settlement vs 3-5 days", "99.7% cheaper than Stripe"],
    "proof_points": ["400ms average finality (Solana Explorer)", "$0.00025 avg tx fee"]
  }
}
```

---

## Why This Reasoning Process Works

### The Core Equation

```
Reasoning Performance = Model Capacity × Prompt Structure
                                          ↑ THIS is the lever
```

When you increase structure via GRDs, you decrease the required model capacity. BRAID on Haiku beats raw Sonnet. BRAID on Opus produces near-perfect output. (arXiv:2512.15959 — GPT-5-nano with BRAID outperformed GPT-5-medium by 30x PPD.)

### Why It Matters for Multi-Agent Marketing

Without structured reasoning, multi-agent systems suffer **compounding error decay**:

```
Agent 1 output quality: 80%
Agent 2 (receives 80%): 80% × 80% = 64%
Agent 3 (receives 64%): 80% × 64% = 51%
Agent 4 (receives 51%): 80% × 51% = 41%
→ Final campaign quality: mediocre at best
```

With BRAID GRDs + Critic nodes, each agent is a **quality gate** that prevents upstream errors from propagating:

```
Strategist + GRD + 3 Critic checks: 98% quality, structured output
Content Agent receives structured input + GRD + 5 Critics: 97%
Social Agent receives structured input + GRD + 3 Critics: 96%
Chief of Staff verifies all outputs against success criteria
→ Final campaign quality: consistently high
```

### The Five Properties That Make It Work

1. **Bounded** — The model can only visit nodes in the diagram. No wandering, no "let me also add..." tangents. The GRD is a cage for attention.

2. **Atomic** — One operation per node (<15 tokens). The model can't skip steps because each step is trivially small. You can't skip what takes 2 seconds to do.

3. **Self-correcting** — Critic nodes are diamond decision points that check constraints BEFORE output. "Are there unsupported superlatives?" isn't a suggestion — it's a gate. The agent must answer yes/no and take the corresponding path.

4. **Evidence-forcing** — Critic checks like "≥3 project citations?" and "every message has a proof point?" make it structurally impossible to produce generic output. The model literally cannot reach the terminal node without evidence.

5. **Composable** — Each agent's GRD is independent. The Strategist's output structure matches the Content Agent's input requirements. The Chief of Staff's GRD verifies against the success criteria the Strategist defined. The chain is self-reinforcing.

### The Crypto Marketing Anti-Drift Effect

Generic marketing AI produces:
> "Leverage blockchain technology to revolutionize the payment landscape with our innovative solution."

BRAID-guided marketing AI produces:
> "Solana settles in 400ms. Stripe settles in 3-5 business days. That's not incremental — it's a new commerce primitive. 2,847 merchants already switched (Helio Q4 report)."

The difference is structural. The GRD forces: research first → cite specific numbers → Critic checks "any unsupported superlatives?" → if yes, add proof or remove claim. Generic output literally cannot pass the Critic nodes.

---

## Meta-GRD: Full Campaign Pipeline

This is the orchestration-level view — how the 6 agent GRDs chain together as one system:

```mermaid
graph TD
    START[Campaign brief received] --> PAY[x402 USDC payment verified]
    PAY --> ESCROW[Anchor escrow initialized on-chain]
    ESCROW --> GRD1[GRD 1: Strategist researches + strategizes]
    GRD1 --> DELEGATE[Strategist creates 4 subtasks via API]
    DELEGATE --> PAR{Parallel execution}
    PAR --> GRD2[GRD 2: SEO Agent]
    PAR --> GRD3[GRD 3: Content Agent]
    PAR --> GRD4[GRD 4: Social Agent]
    PAR --> GRD5[GRD 5: Community Agent]
    GRD2 --> DONE2[SEO deliverable + escrow hash]
    GRD3 --> DONE3[Content deliverable + escrow hash]
    GRD4 --> DONE4[Social deliverable + escrow hash]
    GRD5 --> DONE5[Community deliverable + escrow hash]
    DONE2 --> GRD6[GRD 6: Chief of Staff reviews all]
    DONE3 --> GRD6
    DONE4 --> GRD6
    DONE5 --> GRD6
    GRD6 --> CR{All pass quality review?}
    CR -->|No| REOPEN[Reopen failed deliverables with feedback]
    REOPEN --> PAR
    CR -->|Yes| COMPLETE[Campaign complete]
    COMPLETE --> RELEASE[Anchor escrow releases USDC]
    RELEASE --> RECEIPT[On-chain campaign receipt]
```

This is the system judges see in the demo: structured reasoning at every level, from individual agent tasks to the full campaign pipeline, with on-chain proof of delivery.

---

## Compressed GRDs (Token-Efficient Format)

For agents running frequently or with tight context windows, use compressed format (~50% fewer tokens):

### Strategist (Compressed)
```
1) Parse brief: name, description, audience, URL
2) IF missing fields → BLOCKER, stop
3) Load colosseum-copilot, search projects (3+ queries)
4) Search archives (1+ query)
5) IF <3 project refs OR <1 archive ref → broaden, GOTO 3
6) Synthesize ICP from research
7) Write JTBD statement
8) Build messaging: primary + 3 supporting + proof points
9) CRITIC: every message has proof? No → add proof or remove, GOTO 8
10) Design channel plan with KPIs
11) Write 4 subtask descriptions
12) CRITIC: all subtasks have inputs? No → GOTO 11
13) CRITIC: all subtasks have success criteria? No → GOTO 11
14) CRITIC: strategy cites ≥3 project slugs? No → GOTO 8
15) Post strategy as comment, create 4 issues, mark done
```

### Content Agent (Compressed)
```
1) Parse strategy: ICP, messaging, voice
2) IF no messaging hierarchy → BLOCKER, stop
3) Write 3 headlines: [outcome] + [result] + [audience]
4) CRITIC: all <12 words? No → shorten, GOTO 3
5) Write 7-section homepage copy
6) CRITIC: every section earns next scroll? No → replace filler, GOTO 5
7) Write 3 Twitter threads (5-7 tweets each)
8) CRITIC: first tweet hooks in <280 chars? No → rewrite, GOTO 7
9) Score each thread with RAID
10) Write blog post 800-1200 words
11) CRITIC: targets SEO keyword? No → refocus, GOTO 10
12) CRITIC: unsupported superlatives? Yes → add proof or remove, GOTO 5
13) Post deliverable, mark done
```

Use Mermaid format (default) for highest adherence. Switch to compressed when success rate is >90% and you need to save tokens.
