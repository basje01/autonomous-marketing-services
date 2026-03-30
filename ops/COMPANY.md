---
name: LemuriaOS Ops
description: "Meta-management company that operates the Frontier Marketing OS platform. Monitors Paperclip releases, manages client campaigns, tracks revenue/costs, and keeps the stack updated. Runs Paperclip with Paperclip."
slug: lemuriaos-ops
schema: agentcompanies/v1
version: 0.1.0
license: MIT
authors:
  - name: LemuriaOS
goals:
  - Keep the Frontier Marketing OS platform stable and up-to-date
  - Monitor all client campaign health and costs
  - Detect and respond to Paperclip breaking changes within 24 hours
  - Track revenue vs costs across all deployed campaigns
  - Maintain quality bar across all client deliverables
---

# LemuriaOS Ops

The management layer for running 10+ autonomous marketing companies on Paperclip. This is not a client-facing product — this is your internal operations team.

## How It Works

```
Daily at 9 AM Amsterdam:
  Intel pipeline runs → GitHub commits, Twitter, video transcripts
  ↓
  Atlas (Ops CEO) reviews intel → flags breaking changes, new features
  ↓
  Sentinel (Platform Guard) tests changes against our stack
  ↓
  Oracle (Revenue Ops) aggregates campaign costs and revenue
  ↓
  Iris (Campaign Monitor) checks all client campaign health
  ↓
  You get a morning briefing with action items
```

## Org Chart

```
Atlas — Ops CEO (daily intel review, strategic decisions)
├── Sentinel — Platform Guard (Paperclip updates, dependency health, stack testing)
├── Oracle — Revenue Ops (cost tracking, margin analysis, pricing)
├── Iris — Campaign Monitor (client health, blocker escalation, SLA tracking)
└── Chronos — Release Engineer (deploy updates, run migrations, verify rollouts)
```

## When to Use This vs. the Marketing Company

| Situation | Who Handles It |
|-----------|---------------|
| New client campaign | Iris (Campaign Monitor) creates it via gateway |
| Agent producing bad output | Themis (Evals Engineer) inside the client's campaign |
| Paperclip released new version | Sentinel (Platform Guard) |
| Monthly cost report | Oracle (Revenue Ops) |
| Gateway needs a code update | Chronos (Release Engineer) |
| Strategic decision (pricing, new features) | Atlas (Ops CEO) |
