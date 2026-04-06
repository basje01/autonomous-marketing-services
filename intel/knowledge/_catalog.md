# Knowledge Catalog

> Auto-maintained concept map. Nodes = articles. Edges = cross-references.
> Last updated: 2026-04-06 by Hermes.

```mermaid
graph LR
    subgraph topics
        PP[paperclip-practices]
        CC[claude-code-practices]
        DS[distribution-strategies]
        WD[web-data-layer]
        CL[competitive-landscape]
        CS[case-studies]
        PQ[pitch-quotes]
        PA[paperclip-podcast-alpha]
    end

    PP --> CC
    PP --> CS
    PP --> CL
    PP --> PA
    CC --> PP
    CC --> PQ
    DS --> CL
    DS --> WD
    DS --> PQ
    WD --> DS
    WD --> CL
    CL --> PP
    CL --> CS
    CL --> DS
    CL --> WD
    CS --> PP
    CS --> CL
    CS --> PQ
    PQ --> CS
    PQ --> CL
    PQ --> DS
    PA --> PP
    PA --> CS
    PA --> CL
```

## Relationship Summary

| Article | Links Out | Links In |
|---------|-----------|----------|
| paperclip-practices | 4 | 3 |
| claude-code-practices | 2 | 1 |
| distribution-strategies | 3 | 2 |
| web-data-layer | 2 | 2 |
| competitive-landscape | 4 | 4 |
| case-studies | 3 | 3 |
| pitch-quotes | 3 | 3 |
| paperclip-podcast-alpha | 3 | 1 |

## Subgraphs

_Concept and project nodes will appear here as Hermes compiles them._
