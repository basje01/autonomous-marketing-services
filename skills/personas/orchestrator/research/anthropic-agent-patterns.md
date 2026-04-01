# Anthropic Agent Patterns - Research Synthesis

> Research file for the LemuriaOS Orchestrator. Contains Anthropic's agent architecture
> patterns, subagent specifications, failure modes, context engineering techniques,
> and evaluation frameworks. Based on Anthropic's published guidance and Claude Agent SDK.

---

## 1. Seven Architecture Patterns (Ascending Complexity)

Anthropic defines agent architectures on a spectrum from simple augmented LLMs to fully autonomous multi-agent systems. Each level adds capability and complexity. The principle: **use the simplest architecture that solves the task.**

### Level 1: Augmented LLM

```
User → LLM + Tools → Response
```

- **What**: Single LLM call with tool access (retrieval, code execution, web search)
- **When**: Single-domain, well-scoped tasks with clear completion criteria
- **LemuriaOS mapping**: Single skill invocation without orchestration
- **Key insight**: Most tasks should stay here. Orchestration adds latency and token cost.

### Level 2: Prompt Chaining

```
User → LLM₁ → Gate → LLM₂ → Gate → LLM₃ → Response
```

- **What**: Fixed sequence of LLM calls, each processing the output of the previous
- **When**: Task has clear sequential phases (e.g., research → draft → review)
- **LemuriaOS mapping**: Sequential skill chain with orchestrator managing handoffs
- **Key insight**: Gates between steps enable quality checks and early termination

### Level 3: Routing

```
User → Classifier → Skill A (if type X)
                   → Skill B (if type Y)
                   → Skill C (if type Z)
```

- **What**: Input classification determines which downstream process handles the task
- **When**: Distinct task categories require fundamentally different approaches
- **LemuriaOS mapping**: Core orchestrator pattern - classify then route to specialist
- **Key insight**: Classification accuracy is the bottleneck. Invest in routing precision over skill count.

### Level 4: Parallelization

```
User → Orchestrator → [Skill A, Skill B, Skill C] → Aggregator → Response
```

Two sub-patterns:
- **Sectioning**: Task split into independent subtasks, processed in parallel
- **Voting**: Same task sent to multiple agents, results aggregated

- **When**: Task is decomposable into independent parts, or consensus improves accuracy
- **LemuriaOS mapping**: Multi-skill parallel execution (e.g., SEO + content + technical audit)
- **Key insight**: Only parallelize truly independent subtasks. Shared dependencies force serialization.

### Level 5: Orchestrator-Workers

```
User → Orchestrator → dynamically creates/manages Worker₁...Workerₙ → Synthesizer → Response
```

- **What**: Orchestrator dynamically determines subtasks and delegates to worker agents
- **When**: Task cannot be pre-decomposed; orchestrator must adapt based on intermediate results
- **LemuriaOS mapping**: Complex multi-skill with dynamic routing (e.g., "full audit" → orchestrator decides which audit skills based on initial findings)
- **Key insight**: The orchestrator must be able to observe worker outputs and re-plan. Static decomposition fails for exploratory tasks.

### Level 6: Evaluator-Optimizer

```
User → Generator → Evaluator → (loop until quality threshold) → Response
```

- **What**: One agent generates output, another evaluates it, loop until criteria met
- **When**: Output quality is measurable and iterative refinement improves results
- **LemuriaOS mapping**: Verification gate pattern - producer skill → quality check → rework if needed
- **Key insight**: Set a maximum iteration count (3) to prevent infinite loops. Diminishing returns after 2 iterations.

### Level 7: Autonomous Agent

```
User → Agent → [observe → plan → act → reflect]* → Response
```

- **What**: Fully autonomous agent with its own planning loop, tool access, and self-reflection
- **When**: Open-ended tasks with unclear completion criteria requiring adaptive behavior
- **LemuriaOS mapping**: Not currently used. Our skills are task-scoped, not autonomous.
- **Key insight**: Autonomy is expensive and hard to control. Prefer bounded orchestration over open-ended autonomy for production systems.

### Architecture Selection Matrix

| Signal | Recommended Level | Rationale |
|--------|------------------|-----------|
| Single domain, clear output | Level 1 (Augmented LLM) | No orchestration overhead |
| Sequential phases, quality gates needed | Level 2 (Prompt Chaining) | Gates catch errors between phases |
| Distinct task types needing different skills | Level 3 (Routing) | Classification is cheap; wrong-skill is expensive |
| Independent subtasks, cross-domain | Level 4 (Parallelization) | Token cost scales but latency doesn't |
| Exploratory, adaptive decomposition needed | Level 5 (Orchestrator-Workers) | Dynamic re-planning handles uncertainty |
| Measurable quality, iterative improvement | Level 6 (Evaluator-Optimizer) | Quantifiable criteria enable automatic loops |
| Open-ended, long-horizon | Level 7 (Autonomous Agent) | Last resort - high cost, low predictability |

---

## 2. Subagent Task Specification (7 Elements)

When the orchestrator delegates to a specialist skill (subagent), the task specification must include these 7 elements to minimize misinterpretation:

### Element 1: Objective

Clear, single-sentence statement of what the skill must produce.

```
BAD:  "Help with the client's SEO"
GOOD: "Produce a technical SEO audit for kenzo.com covering Core Web Vitals, crawlability, and structured data, with prioritized fix recommendations"
```

### Element 2: Context

Background information the skill needs but cannot infer:
- Client orient data (from Orient Bridge)
- Prior skill outputs in this chain
- User-specified constraints or preferences

### Element 3: Input Artifacts

Explicit list of materials provided:
- URLs to audit
- Documents to analyze
- Data files to process
- Previous outputs to build on

### Element 4: Output Format

Exact specification of deliverable structure:
```yaml
format: markdown
sections:
  - executive_summary (3-5 sentences)
  - findings (table: issue | severity | fix | effort)
  - recommendations (numbered, prioritized)
  - confidence_score (0.0-1.0)
```

### Element 5: Constraints

Boundaries the skill must respect:
- Token budget for output
- Time sensitivity
- Client kill-switch rules
- Regulatory requirements (GDPR, platform ToS)

### Element 6: Success Criteria

How the orchestrator will evaluate the output:
- Minimum confidence threshold
- Required sections present
- Factual claims grounded in citations
- Actionability: every recommendation has a concrete next step

### Element 7: Escalation Path

What to do when the skill cannot complete:
- Missing information → Return to orchestrator with specific questions
- Outside expertise → Recommend handoff to named skill
- Low confidence → Flag uncertainty, deliver partial with caveats

---

## 3. Early Failure Modes in Agent Systems

Based on Anthropic's guidance and production experience. These failures occur most often in the first interactions and compound rapidly.

### Failure Mode 1: Over-Orchestration

**Symptom**: Simple tasks routed through multi-skill chains unnecessarily.
**Cost**: 3-4× token usage, 2-3× latency, no quality improvement.
**Fix**: Difficulty classifier with bias toward simpler architectures. Default to Level 1 (single skill) unless complexity signals are present.

**Complexity signals** (need 2+ to justify multi-skill):
- Multiple distinct domains mentioned
- Explicit request for cross-functional analysis
- Task requires data from multiple sources
- Deliverable has multiple independent sections

### Failure Mode 2: Context Dilution

**Symptom**: As conversation grows, agent outputs become generic and lose specificity.
**Cause**: Relevant context pushed out of attention window by accumulated noise.
**Fix**: Aggressive context management:
- Summarize completed skill outputs before passing downstream
- Load references on-demand, not preemptively
- Orient Bridge provides focused client context (not full history)

### Failure Mode 3: Instruction Drift

**Symptom**: Agent gradually stops following SKILL.md instructions in long conversations.
**Cause**: User messages and tool results accumulate, diluting system prompt influence.
**Fix**:
- Reinforce critical instructions in the task specification (not just SKILL.md)
- Keep SKILL.md focused: 10-15K tokens of high-signal content > 50K of comprehensive content
- Use structured output formats that constrain drift

### Failure Mode 4: Cascading Hallucination

**Symptom**: Skill A hallucinates a fact → Skill B builds on it → Skill C cites it as established.
**Cause**: No verification between skill handoffs.
**Fix**: Verification gates at handoff boundaries. Challenger skill checks factual claims before they propagate. Cost: +30% tokens. Benefit: prevents compounding errors.

### Failure Mode 5: Delegation Without Observation

**Symptom**: Orchestrator delegates to 3 skills in parallel, accepts all outputs without review.
**Cause**: Orchestrator treats delegation as fire-and-forget.
**Fix**: Orchestrator must review all skill outputs before synthesis:
- Check confidence scores
- Verify consistency across outputs
- Flag contradictions for resolution

---

## 4. Context Engineering Techniques

### Technique 1: Layered Context Loading

```
Layer 0 (always loaded): SKILL.md core identity + playbooks
Layer 1 (loaded per-task): Orient Bridge client context
Layer 2 (loaded on-demand): Reference files (academic, security, company profiles)
Layer 3 (never pre-loaded): Full conversation history (rely on summaries)
```

**Principle**: Each layer is loaded only when needed. Layer 0 is the skill's "personality." Layer 3 should never be loaded in full - summarize and extract.

### Technique 2: Structured Delimiters

Use XML-style tags to separate context types. This helps the model distinguish between instructions, data, and examples:

```xml
<task_specification>
  Objective, constraints, output format
</task_specification>

<client_context>
  Orient Bridge data, kill-switch rules
</client_context>

<reference_data>
  Loaded on-demand from references/
</reference_data>

<prior_outputs>
  Summarized outputs from previous skills in this chain
</prior_outputs>
```

### Technique 3: Attention Anchoring

Place the most critical instructions at the beginning AND end of the context. The "lost in the middle" effect (arXiv:2404.02060) means middle-positioned instructions get less attention.

```
[CRITICAL INSTRUCTIONS - repeated at top]
...context...
...data...
...references...
[CRITICAL INSTRUCTIONS - repeated at bottom]
```

For SKILL.md files: Core Philosophy (top) and SELF-EVALUATION CHECKLIST (bottom) serve as natural attention anchors.

### Technique 4: Negative Space

Sometimes what you omit matters more than what you include:
- Omit information the model already knows (general knowledge, common patterns)
- Omit "don't do X" instructions - rephrase as "always do Y" (positive framing)
- Omit verbose examples when a format specification suffices

**Research backing**: arXiv:2505.16915 - shorter, denser prompts outperform longer ones. Each redundant token adds embedding noise.

### Technique 5: Context Compression for Multi-Hop Chains

When passing outputs between skills in a chain:

```
BEFORE (raw output, ~3K tokens):
  [Full analysis with all sections, examples, caveats, formatting]

AFTER (compressed handoff, ~500 tokens):
  Key findings: [3 bullet points]
  Data: [structured table]
  Confidence: 0.82
  Gaps: [what the next skill needs to investigate]
```

Compression ratio target: 5-6× for inter-skill handoffs. The receiving skill gets the signal without the noise.

---

## 5. Evaluation Rubric for Orchestration Quality

### Per-Request Metrics

| Metric | Measurement | Target |
|--------|-------------|--------|
| Routing accuracy | Correct skill selected on first attempt | ≥ 90% |
| Task completion | Deliverable meets all success criteria | ≥ 85% |
| Token efficiency | Actual tokens / minimum viable tokens | ≤ 1.5× |
| Latency | Time from request to delivery | Appropriate to complexity |
| Confidence calibration | Confidence score accuracy vs outcome | Brier score ≤ 0.15 |

### Per-Skill Metrics

| Metric | Measurement | Target |
|--------|-------------|--------|
| Utilization | Requests routed to this skill / total requests | Monitor for dead skills |
| Success rate | Completed with confidence ≥ 0.7 / total routed | ≥ 80% |
| Escalation rate | Tasks escalated back to orchestrator | ≤ 15% |
| Handoff quality | Downstream skill succeeds on first attempt | ≥ 85% |

### System-Level Metrics

| Metric | Measurement | Target |
|--------|-------------|--------|
| Single-skill resolution | Tasks resolved without multi-skill | ≥ 70% |
| Chain depth | Average skills per multi-skill request | ≤ 3 |
| Loop rate | Tasks that re-route to same skill | ≤ 5% |
| Human escalation | Tasks requiring human intervention | ≤ 10% |

---

## 6. Claude Agent SDK Integration Patterns

### Pattern 1: Tool-Based Skill Invocation

```typescript
// Each skill exposed as a typed tool
const seoAuditTool = {
  name: "seo_audit",
  description: "Technical SEO audit for a given URL",
  input_schema: {
    type: "object",
    properties: {
      url: { type: "string" },
      scope: { enum: ["core_web_vitals", "crawlability", "full"] },
      client_slug: { type: "string" }
    },
    required: ["url", "scope"]
  }
};

// Orchestrator invokes skills via tool_use
// Claude natively handles parallel tool calls
```

### Pattern 2: Hierarchical Orchestration

```
Root Orchestrator (tool: route_to_sub_orchestrator)
  ├── SEO Sub-Orchestrator (tools: technical_seo, local_seo, content_seo)
  ├── Paid Media Sub-Orchestrator (tools: google_ads, meta_ads, budget_optimizer)
  └── Content Sub-Orchestrator (tools: copywriter, editor, brand_voice)
```

Each sub-orchestrator has its own SKILL.md and manages its own skill group. The root orchestrator never directly invokes leaf skills - it routes to the appropriate sub-orchestrator.

### Pattern 3: Streaming with Checkpoints

For long-running multi-skill tasks, checkpoint intermediate results:

```
Orchestrator starts multi-skill task
  → Skill A completes → checkpoint A saved
  → Skill B completes → checkpoint B saved
  → Skill C fails → resume from checkpoint B
     → Skill C retried → checkpoint C saved
  → Synthesis from checkpoints A + B + C
```

Prevents full re-execution on partial failure. Critical for expensive multi-skill chains.

---

## 7. Key Principles Summary

| # | Principle | Source |
|---|-----------|--------|
| 1 | Use the simplest architecture that works | Anthropic guidance |
| 2 | Classify difficulty before selecting routing depth | arXiv:2509.11079 |
| 3 | Verify before propagating in multi-skill chains | arXiv:2408.00989 |
| 4 | Centralized routing scales better than peer-to-peer | arXiv:2505.19591 |
| 5 | Sequential multi-agent degrades reasoning | arXiv:2512.08296 |
| 6 | Context is finite - budget it explicitly | arXiv:2404.02060 |
| 7 | Small specialized coordinators outperform large generalists | arXiv:2512.04388 |
| 8 | Structured handoffs beat free-form delegation | arXiv:2308.00352 |
| 9 | Confidence scores enable adaptive quality gates | arXiv:2406.16838 |
| 10 | Classify failures to prevent repetition | arXiv:2503.13657 |

---

## Citation Index

| arXiv ID | Short Title | Primary Finding Used |
|----------|------------|---------------------|
| 2505.19591 | Evolving Orchestration | RL-trained puppeteer, centralized routing |
| 2512.08296 | Scaling Agent Systems | Sequential degradation, parallel gains |
| 2509.11079 | Difficulty-Aware Routing | Complexity-to-capability matching |
| 2408.00989 | Challenger+Inspector | Verification gates catch cascading errors |
| 2507.22606 | MetaAgent FSM | All topologies are FSM special cases |
| 2512.04388 | The Conductor | Small orchestrator outperforms large generalist |
| 2308.00352 | MetaGPT | SOP-driven structured handoffs |
| 2406.16838 | LLM Confidence Calibration | Confidence-quality correlation |
| 2404.02060 | Context Window Analysis | Performance degrades >70% utilization |
| 2503.13657 | MAST Taxonomy | 14 failure categories, 4 dimensions |
| 2505.16915 | Prompt Compression | Shorter denser prompts outperform |
| 2308.08155 | AutoGen | Conversable agent architecture |
