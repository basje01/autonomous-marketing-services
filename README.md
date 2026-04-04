# Frontier Marketing OS

Autonomous marketing engine for crypto projects on Solana. Pay USDC, get a 7-agent marketing team executing a full campaign — research, SEO, content, social, community — with on-chain proof of delivery.

**Colosseum Frontier Hackathon 2026 — AI Track**

## Architecture

```
Client → POST /api/deploy-marketing-team
  ↓ x402 USDC payment (Solana devnet)
  ↓ Anchor escrow locks budget on-chain
  ↓ Paperclip company created
  ↓ 7 agents hired

Minerva (CEO) → researches via Colosseum Copilot → produces strategy
  ├── Athena (SEO) → audit + keywords + meta tags
  ├── Calliope (Content) → homepage copy + threads + blog
  ├── Mercury (Social) → 4-week calendar + engagement
  ├── Vesta (Community) → FAQ + onboarding + playbook
  ├── Argus (Chief of Staff) → monitors all agents + quality gate
  └── Themis (Evals) → post-campaign performance review

All deliverables → hashed on-chain → escrow releases USDC
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Agent orchestration | [Paperclip](https://paperclip.ing) (v2026.325.0) |
| Agent expertise | 161 LemuriaOS SKILL.md specialists |
| Structured reasoning | BRAID GRDs (7 diagrams, arXiv:2512.15959) |
| Payments | x402 HTTP-native USDC (@x402/express + @x402/svm) |
| Escrow | Anchor program on Solana (campaign-escrow) |
| Research | Colosseum Copilot API (5,400+ projects, 84K+ archives) |
| Gateway | Express + TypeScript + Zod validation |
| Testing | Vitest (14 tests) |
| CI | GitHub Actions (lint + typecheck + test + anchor build) |

## Quick Start

### Prerequisites

- Node.js 20+
- pnpm 9+
- Solana CLI + Anchor 0.31.1 (for Anchor development)
- Paperclip (`npx paperclipai onboard --yes`)

### Setup

```bash
git clone https://github.com/basje01/autonomous-marketing-services.git
cd autonomous-marketing-services
pnpm install
```

### Environment

```bash
cp .env.example .env
# Fill in required values (see .env.example for docs)
```

### Development

```bash
# Start Paperclip (in separate terminal)
npx paperclipai run

# Start gateway
pnpm dev

# Run tests
pnpm test

# Lint + format
pnpm lint
pnpm format:check

# Typecheck
pnpm typecheck
```

## API

### POST /api/deploy-marketing-team

Deploy an autonomous marketing team. Protected by x402 USDC payment.

**Request body:**

| Field | Type | Required | Max |
|-------|------|----------|-----|
| projectName | string | yes | 200 chars |
| description | string | yes | 5000 chars |
| targetAudience | string | yes | 2000 chars |
| website | string (https://) | no | — |

**Response (200):**

```json
{
  "campaignId": "uuid",
  "company": { "id": "...", "name": "...", "dashboardUrl": "..." },
  "agents": [{ "id": "...", "name": "Minerva" }, ...],
  "initialTask": { "id": "...", "identifier": "PRJ-1" },
  "message": "Autonomous marketing team deployed..."
}
```

**Headers:**
- `X-Idempotency-Key` — prevents duplicate deploys on retry

### GET /api/health

Health check. No auth required.

### GET /api/campaigns

List active campaigns. Rate limited (30/min).

## The 7 Agents

| Name | Role | Model | What They Do |
|------|------|-------|-------------|
| **Minerva** | Marketing Strategist (CEO) | Opus | Research, strategy, delegation |
| **Argus** | Chief of Staff | Sonnet | Health checks, blocker triage, QA gate |
| **Athena** | SEO Specialist | Sonnet | Technical audit, keywords, meta, schema |
| **Calliope** | Content Creator | Sonnet | Homepage copy, Twitter threads, blog |
| **Mercury** | Social Campaign Manager | Sonnet | 4-week calendar, engagement strategy |
| **Vesta** | Community Manager | Sonnet | FAQ, onboarding, engagement playbook |
| **Themis** | Evals Engineer | Sonnet | Performance reviews, pattern detection |

Each agent follows a BRAID Guided Reasoning Diagram (GRD) with Critic nodes that prevent quality drift. See [skills/braid-marketing/SKILL.md](skills/braid-marketing/SKILL.md).

## Solana Integration

**Two layers:**
1. **x402** — HTTP-native USDC payment. Client pays, gateway verifies via CDP facilitator, settles on-chain.
2. **Anchor escrow** — Campaign budget locked in PDA. Released only when all deliverables are submitted with hashes.

```bash
# Build the Anchor program
cd campaign-escrow && anchor build

# Deploy to devnet
anchor deploy --provider.cluster devnet
```

## Paperclip Company Import

This repo is compatible with the Agent Companies spec (`agentcompanies/v1`):

```bash
npx companies.sh add frontier-marketing-os
```

See [COMPANY.md](COMPANY.md) for the full company definition.

## Project Structure

```
gateway/src/
  app.ts              — Express app (helmet, CORS, x402, routes)
  server.ts           — Entry point (listen)
  config.ts           — Zod-validated env config
  schemas.ts          — Request/response Zod schemas
  errors.ts           — AppError hierarchy
  x402.ts             — x402 payment middleware (Solana USDC)
  paperclip-client.ts — Paperclip API client (company, agents, tasks)
  escrow-client.ts    — Anchor escrow client (stub)
  services/
    deploy.service.ts — Campaign deployment orchestration

agents/                — 7 AGENTS.md files (Paperclip agent configs)
skills/                — BRAID GRDs, crypto-intel, symlinked LemuriaOS skills
campaign-escrow/       — Anchor Solana program (USDC escrow)
intel/                 — Daily GitHub + Twitter intelligence reports
scripts/               — Daily intel pipeline (cron at 9 AM Amsterdam)
```

## License

MIT
