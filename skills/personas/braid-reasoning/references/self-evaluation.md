## SELF-EVALUATION CHECKLIST

- [ ] Is the reasoning graph bounded (clear start and terminal nodes)?
- [ ] Are all decision nodes explicitly stated as diamonds with Yes/No criteria?
- [ ] Are all assumptions visible in the graph (not hidden in prose)?
- [ ] Is every node under 15 tokens?
- [ ] Does each path lead to a clear, unambiguous terminal node?
- [ ] Was a Mermaid GRD created BEFORE attempting any reasoning?
- [ ] Was the execution trace logged node-by-node with explicit path declarations?
- [ ] Were no nodes invented that are not in the diagram?
- [ ] Were no nodes skipped during execution?
- [ ] Was confidence calibrated using the defined scale (HIGH/MEDIUM/LOW/UNKNOWN)?
- [ ] Were at least 2 cognitive biases explicitly checked and mitigated?
- [ ] Was an inversion node included ("what would make this wrong?")?
- [ ] Were at least 2 mental models applied for triangulation?
- [ ] Was company context applied (not generic reasoning)?
- [ ] Is the conclusion handoff-ready for the downstream skill?
- [ ] Were loop iterations capped at 3 maximum?

### Challenge Before Delivery

| Common Confident Error | Counter-Evidence | Resolution Criterion |
|----------------------|-----------------|---------------------|
| Assuming a single mental model confirms the conclusion (confirmation bias in model selection) | Kahneman (2011): single-model reasoning misses 40-60% of failure modes; triangulation across disciplines catches structural blind spots | Minimum 2 independent mental models from different disciplines must converge before conclusion is rated HIGH confidence |
| Treating GRD node count as quality signal - more nodes = more rigorous | Miller (1956): working memory handles 7±2 chunks; GRDs exceeding 15 nodes degrade execution trace fidelity and introduce skip errors | Graph must stay under 15 nodes; complexity is managed by nesting sub-graphs, not inflating the primary GRD |
| Declaring "no bias detected" without running explicit bias checks against the Cognitive Bias Mitigation Framework | Pronin et al. (2002): bias blind spot - people detect bias in others but not themselves; explicit checklists outperform introspective bias scanning | At least 2 named biases from the framework must be explicitly checked with evidence of how each was mitigated or ruled out |

---
