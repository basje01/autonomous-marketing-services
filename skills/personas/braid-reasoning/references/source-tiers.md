## SOURCE TIERS

**TIER 1 -- Primary / Official (cite freely)**

| Source | URL | Domain |
|--------|-----|--------|
| BRAID Paper | https://arxiv.org/abs/2512.15959 | Primary framework -- all GRD design principles |
| OpenServ Labs | https://openserv.ai | BRAID benchmarks, platform integration |
| OpenAI Research | https://openai.com/research/ | o-series reasoning models, process reward models |
| Google DeepMind Research | https://deepmind.google/research/ | Gemini reasoning, scaling laws, CoT emergence |
| Mermaid.js | https://mermaid.js.org/ | Diagram syntax reference |
| Stanford HAI | https://hai.stanford.edu/ | AI reasoning research, policy, safety |

**TIER 2 -- Academic / Peer-Reviewed (cite with context)**

| Paper | Authors | Year | arXiv ID | Key Finding |
|-------|---------|------|----------|-------------|
| BRAID: Bounded Reasoning with Adaptive Instruction Diagrams | Amcalar, Cinar | 2025 | 2512.15959 | Mermaid-based reasoning graphs; +170% accuracy on SCALE; 74x cost efficiency |
| Chain-of-Thought Prompting Elicits Reasoning in LLMs | Wei et al. | 2022 | 2201.11903 | CoT prompting -- the baseline BRAID improves upon |
| Tree of Thoughts: Deliberate Problem Solving with LLMs | Yao et al. | 2023 | 2305.10601 | Tree-structured search reasoning; BFS/DFS for LLMs |
| Graph of Thoughts: Solving Elaborate Problems with LLMs | Besta et al. | 2024 | 2308.09687 | Arbitrary graph reasoning; BRAID's closest structured relative |
| Self-Consistency Improves Chain of Thought Reasoning | Wang et al. | 2023 | 2203.11171 | Multiple reasoning paths + majority voting |
| ReAct: Synergizing Reasoning and Acting in LLMs | Yao et al. | 2022 | 2210.03629 | Interleaving reasoning + tool use; foundational for agents |
| Let's Verify Step by Step | Lightman et al. | 2023 | 2305.20050 | Process supervision outperforms outcome supervision |
| Scaling LLM Test-Time Compute Optimally | Snell et al. | 2024 | 2408.03314 | Optimal test-time compute allocation beats parameter scaling |
| Reflexion: Language Agents with Verbal Reinforcement Learning | Shinn et al. | 2023 | 2303.11366 | Self-reflection improves agent performance through verbal RL |
| Adaptive Graph of Thoughts (AGoT) | Extends Besta et al. | 2024 | -- | Dynamic graph restructuring during execution based on intermediate results |
| Reinforcement Learning of Thoughts (RLoT) | -- | 2024 | -- | RL reward signal optimizes reasoning path selection |
| Cascade Routing for LLMs | ETH Zurich | 2024 | -- | Route queries to smallest sufficient model based on complexity estimate |
| braid-dspy | DSPy integration | 2025 | -- | Compile BRAID GRDs as DSPy modules with automatic prompt optimization |

**TIER 3 -- Industry Experts (cross-reference required)**

| Expert | Key Paper | Relevance to BRAID |
|--------|-----------|-------------------|
| Jason Wei | CoT (arXiv:2201.11903) | Baseline reasoning technique BRAID improves upon |
| Shunyu Yao | ToT (arXiv:2305.10601), ReAct | Structured search reasoning; agent foundations |
| Noah Shinn | Reflexion (arXiv:2303.11366) | Verbal RL for self-correction; maps to Critic pattern |
| Daniel Kahneman | Thinking, Fast and Slow | System 1/System 2 framework BRAID enforces |
| Philip Tetlock | Superforecasting | Calibrated prediction methodology for confidence levels |
| Subbarao Kambhampati | LLM planning limits (arXiv:2310.12397) | Self-verification failures; why bounded structure matters |

**TIER 4 -- Never Cite as Authoritative**

- Blog posts about "prompt engineering tricks" without empirical validation
- Twitter/X threads claiming reasoning breakthroughs without papers
- AI tool vendor comparisons published by the vendors themselves
- Unverified claims about model reasoning capabilities without benchmark data

---
