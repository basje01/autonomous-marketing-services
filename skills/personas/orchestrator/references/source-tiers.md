## SOURCE TIERS

### TIER 1 - Primary / Official (cite freely)

| Source | Authority | URL |
|--------|-----------|-----|
| Anthropic Documentation - Claude Agents, Tool Use, MCP | Official | docs.anthropic.com |
| Anthropic Research - "Building Effective Agents" (Dec 2024) | Official guidance | anthropic.com/research/building-effective-agents |
| OpenAI Platform - Assistants API, Function Calling, Agent SDK | Official | platform.openai.com/docs |
| Google DeepMind - Agent Research | Official | deepmind.google/research |
| LangChain / LangGraph Documentation | Open-source standard | python.langchain.com/docs, langchain-ai.github.io/langgraph |
| Microsoft AutoGen Documentation | Open-source (Microsoft Research) | microsoft.github.io/autogen |
| CrewAI Documentation | Open-source | docs.crewai.com |
| Model Context Protocol (MCP) Specification | Anthropic standard | modelcontextprotocol.io |
| OpenAI Agents SDK | Official | github.com/openai/openai-agents-python |
| Google A2A (Agent-to-Agent) Protocol | Google standard | github.com/google/A2A |
| Hugging Face SmolAgents | Open-source | huggingface.co/docs/smolagents |

### TIER 2 - Academic / Peer-Reviewed (cite with context)

| Paper | Authors | Year | ID | Key Finding |
|-------|---------|------|----|-------------|
| Towards a Science of Scaling Agent Systems | Kim, Gu, Park et al. | 2025 | arXiv:2512.08296 | Centralised coordination contains errors to 4.4x vs 17.2x for independent agents. Sequential reasoning degrades 39-70% in multi-agent. Capability saturation at 45%. |
| MetaGPT: Meta Programming for Multi-Agent Collaboration | Hong, Zhuge, Chen et al. | 2023 | arXiv:2308.00352 | SOPs in prompt sequences reduce cascading hallucinations. Role specialisation + verification outperforms chat-based collaboration. |
| AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation | Wu et al. (Microsoft Research) | 2023 | arXiv:2308.08155 | Customisable conversational agents with flexible conversation patterns. Generic infrastructure for diverse multi-agent applications. |
| Difficulty-Aware Task Routing for LLM Agents | Various | 2025 | arXiv:2509.11079 | Difficulty-calibrated routing matches task complexity to capability level. Easy tasks routed to lighter processes; hard tasks get full orchestration depth. Replaces model-tier routing with skill-difficulty routing. |
| Challenger+Inspector Verification for Multi-Agent Systems | Various | 2024 | arXiv:2408.00989 | Second-agent verification catches cascading errors that producing agents cannot self-detect. Verification gate at handoff boundaries prevents compounding hallucinations across skill chains. |
| Multi-Agent Collaboration via Evolving Orchestration | Various | 2025 | arXiv:2505.19591 | RL-trained puppeteer-style orchestrator discovers compact cyclic reasoning structures that outperform static topologies. Validates centralized routing over peer-to-peer for bounded skill registries. |
| MetaAgent: FSM-Based Multi-Agent Construction | Various | 2025 | arXiv:2507.22606 | All multi-agent structures (linear, debate, orchestrated) are special cases of FSMs. Auto-generated FSMs outperform fixed structures. Our routing table is an implicit FSM. |
| The Conductor: Learning to Orchestrate | Various | 2025 | arXiv:2512.04388 | Small 7B model trained as orchestrator outperforms expensive multi-agent baselines. Specialisation > raw capability for routing decisions. Orchestrator's job is coordination, not domain expertise. |
| Why Do Multi-Agent LLM Systems Fail? (MAST) | Cemri, Pan, Yang et al. (UC Berkeley) | 2025 | arXiv:2503.13657 | 14 failure categories across 4 dimensions (specification, inter-agent, agent-environment, emergent). 1,600+ annotated traces. Taxonomy for classifying orchestration failures. |
| LLM Confidence Calibration | Various | 2024 | arXiv:2406.16838 | Calibrated confidence scores correlate with output quality. Low-confidence outputs benefit from verification; high-confidence can skip. Enables adaptive escalation thresholds. |
| Context Window Performance Analysis | Various | 2024 | arXiv:2404.02060 | Performance degrades predictably past 70% context utilization. "Lost in the middle" effect compounds with multi-agent context passing. Token budget discipline is mandatory. |
| Large Language Model based Multi-Agents: A Survey | Guo, Chen, Wang et al. | 2024 | arXiv:2402.01680 | Comprehensive taxonomy of LLM multi-agent environments, agent characterisation, interaction mechanisms. |
| Tree of Thoughts: Deliberate Problem Solving with LLMs | Yao, Yu, Zhao et al. (Princeton) | 2023 | arXiv:2305.10601 | Exploring multiple reasoning paths with self-evaluation; 74% vs 4% on Game of 24 vs chain-of-thought. NeurIPS 2023. |
| ReAct: Synergizing Reasoning and Acting in Language Models | Yao, Zhao, Yu et al. (Princeton/Google) | 2022 | arXiv:2210.03629 | Interleaved reasoning traces + task-specific actions. Foundation for tool-augmented agent architectures. ICLR 2023. |
| Language Agent Tree Search (LATS) | Zhou, Yan, Shlapentokh-Rothman et al. | 2023 | arXiv:2310.04406 | Monte Carlo Tree Search + LM value functions. 92.7% pass@1 on HumanEval. Unifies reasoning, acting, planning. |
| Mixture-of-Agents Enhances LLM Capabilities | Wang, Wang, Athiwaratkun, Zhang, Zou | 2024 | arXiv:2406.04692 | Layered multi-agent architecture outperforms GPT-4o (65.1% vs 57.5% on AlpacaEval 2.0). |
| Why Do Multi-Agent LLM Systems Fail? | Cemri, Pan, Yang et al. (UC Berkeley) | 2025 | arXiv:2503.13657 | 14 failure modes in 3 categories: system design, inter-agent misalignment, task verification. 1,600+ annotated traces. |
| Scaling LLM Test-Time Compute Optimally | Snell, Lee, Xu, Kumar | 2024 | arXiv:2408.03314 | More compute at inference = better reasoning. Smaller models match 14x larger when compute-optimised. |
| Improving Factuality through Multiagent Debate | Du, Li, Torralba, Tenenbaum, Mordatch (MIT) | 2023 | arXiv:2305.14325 | Multi-agent debate reduces hallucinations and improves factual accuracy through iterative challenge-response. |
| Generative Agents: Interactive Simulacra | Park, O'Brien, Cai et al. (Stanford) | 2023 | arXiv:2304.03442 | 25-agent simulation with emergent social coordination. Observation + planning + reflection architecture. |
| Landscape of Emerging AI Agent Architectures | Masterman, Besen, Sawtell, Chao | 2024 | arXiv:2404.11584 | Survey of single-agent and multi-agent design patterns. Leadership, communication, planning, execution phases. |
| GEO: Generative Engine Optimization | Aggarwal et al. | 2023 | arXiv:2311.09735 | +40% AI visibility via GEO strategies. Foundational paper for LemuriaOS's core service. KDD 2024. |

### TIER 3 - Industry Experts (context-dependent, cross-reference)

| Expert | Affiliation | Domain | Key Contribution |
|--------|------------|--------|------------------|
| Harrison Chase | LangChain (CEO/Co-founder) | Agent orchestration, LangGraph | Created LangChain and LangGraph - the most widely adopted open-source agent orchestration frameworks. Pioneered the agent executor pattern. |
| Qingyun Wu | Penn State / Microsoft Research | Multi-agent conversation | Lead author of AutoGen. Defined the multi-agent conversational framework pattern used by thousands of applications. |
| Shunyu Yao | Princeton / OpenAI | Agent reasoning and planning | Author of ReAct and Tree of Thoughts - two foundational frameworks for LLM agent reasoning, acting, and planning. |
| Joon Sung Park | Stanford | Generative agents, agent simulation | Lead author of "Generative Agents" - the seminal paper on emergent multi-agent social behaviour. |
| Joao Moura | CrewAI (CEO/Founder) | Role-based agent orchestration | Created CrewAI - role-based multi-agent framework emphasising task delegation, role specialisation, and crew coordination. |
| Ion Stoica | UC Berkeley / Anyscale | Distributed systems, LLM serving | Extensive distributed systems background (Spark, Ray) applied to LLM serving. Co-architect of scalable inference infrastructure. |
| Erik Schluntz & Barry Zhang | Anthropic | Agent architecture patterns | Authors of Anthropic's "Building Effective Agents" guidance. Defined the 7-level architecture spectrum from augmented LLM to autonomous agent. |
| Sirui Hong | OpenBMB / Tsinghua | Multi-agent frameworks | Lead author of MetaGPT and Data Interpreter. SOPs-in-prompts methodology for multi-agent collaboration. |

### TIER 4 - Never Cite as Authoritative

- Marketing automation vendor blogs claiming "AI agent" capabilities without peer review
- LinkedIn thought leadership posts without original research or disclosed methodology
- "Top 10 AI Agent Frameworks" listicles without comparative evaluation
- Reddit/forum anecdotes about multi-agent system performance
- Any "study" from an AI tool vendor without reproducible methodology and sample size

---
