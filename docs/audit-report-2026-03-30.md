# Codebase Audit Report — Post-Hardening
**Project:** Frontier Marketing OS (Colosseum 2)
**Date:** 2026-03-30
**Scope:** engineer (code + infra + invariants + preflight + quality + agent config)
**Tech Stack:** TypeScript/Express, Anchor/Rust, Paperclip, x402, Zod, Vitest
**Agents Applied:** 5 (software-engineer-auditor, backend-engineer, devops-engineer, quality-orchestrator, agent-config-auditor)

---

## Executive Summary

The hardening sprint successfully established Zod validation, error types, service extraction, security headers, CI, and 14 passing tests. However, the audit found **2 critical**, **5 high**, **13 medium**, and **8 low** findings. The most impactful: build script produces no output (production broken), x402 keypair bypasses Zod config, missing GRD 7 for Themis, and inconsistent agent name references. Config invariants between `.paperclip.yaml` and `paperclip-client.ts` are now perfectly aligned (all 7 agents match). Overall quality grade improved from D/C to **B+** since last audit.

## Scores

| Domain | Grade | Critical | High | Medium | Low |
|--------|-------|----------|------|--------|-----|
| Code Quality | B | 2 | 3 | 5 | 4 |
| Infrastructure | B- | 0 | 0 | 5 | 3 |
| Agent Config | B+ | 0 | 2 | 3 | 1 |
| Invariants | A | 0 | 0 | 0 | 0 |
| Preflight | 3/7 | — | — | — | — |

---

## CRITICAL (2)

### AUDIT-E01: x402 keypair bypasses Zod config validation
**Agent:** software-engineer-auditor
**Location:** gateway/src/x402.ts:23-33
**Confidence:** HIGH

**Finding:** `SOLANA_WALLET_PRIVATE_KEY` and `NODE_ENV` are read directly from `process.env` instead of the validated `config` object. Malformed JSON crashes at import time with an unhelpful error. Also blocks testability — any import of x402.ts or deploy.service.ts triggers keypair generation.

**Fix:** Move wallet key parsing to `config.ts` via Zod transform. Lazy-init the keypair in a getter function.

---

### AUDIT-E02: Build script produces no output
**Agent:** devops-engineer
**Location:** gateway/package.json:8
**Confidence:** HIGH

**Finding:** `"build": "tsc --noEmit"` is a typecheck, not a build. `"start": "node dist/server.js"` will crash because `dist/` is never created.

**Fix:** Split: `"build": "tsc"` and `"typecheck": "tsc --noEmit"`. Update root `package.json` to use `typecheck` for CI.

---

## HIGH (5)

### AUDIT-E03: Missing GRD 7 for Themis
**Agent:** agent-config-auditor
**Location:** skills/braid-marketing/SKILL.md (missing), agents/evals-engineer/AGENTS.md:31
**Confidence:** HIGH

**Finding:** Themis references "GRD 7: Evals Engineer" but it doesn't exist in the BRAID skill. SKILL.md says "6 agent roles" and the Meta-GRD omits Themis.

**Fix:** Create GRD 7 in braid-marketing/SKILL.md. Update description to "7 agent roles". Add Themis to Meta-GRD after COMPLETE node.

---

### AUDIT-E04: Unvalidated campaigns proxy response
**Agent:** software-engineer-auditor
**Location:** gateway/src/app.ts:92-106
**Confidence:** HIGH

**Finding:** `/api/campaigns` proxies raw Paperclip response to client without Zod validation. Inconsistent with the hardening pattern applied to all other Paperclip calls.

**Fix:** Create `listCompanies()` in paperclip-client.ts with a Zod array schema.

---

### AUDIT-E05: Cross-agent name inconsistency (5 instances)
**Agent:** agent-config-auditor
**Location:** Multiple AGENTS.md files
**Confidence:** HIGH

**Finding:** Several agents use role titles ("SEO Agent") instead of Greek names ("Hermes"):
- marketing-strategist/AGENTS.md:28-31 (delegation list)
- chief-of-staff/AGENTS.md:18 (monitors list)
- chief-of-staff/AGENTS.md:30,59,64 ("4 downstream agents")
- seo/content/social/community AGENTS.md:16 ("Reports to: Marketing Strategist" not "Minerva")
- marketing-strategist/AGENTS.md:56 ("Chief of Staff" not "Argus")

**Fix:** Replace all role-title references with Greek names throughout all AGENTS.md files.

---

### AUDIT-E06: Non-atomic deploy with no failure caching
**Agent:** backend-engineer
**Location:** gateway/src/services/deploy.service.ts:27-65, gateway/src/app.ts:68-70
**Confidence:** MEDIUM

**Finding:** 4-step deploy has no compensation on partial failure. Idempotency only caches successes — retries with same key re-execute, creating duplicates.

**Fix:** Cache failures in idempotency store with short TTL. Add cancel/cleanup on partial failure.

---

### AUDIT-E07: Sequential agent hiring (worst case 210s)
**Agent:** backend-engineer
**Location:** gateway/src/paperclip-client.ts:109-146
**Confidence:** HIGH

**Finding:** 7 agents hired sequentially with 30s timeout each. No overall deploy timeout.

**Fix:** Hire Minerva first (must succeed), then remaining 6 via `Promise.allSettled()`.

---

## MEDIUM (13)

| ID | Finding | Location | Fix |
|----|---------|----------|-----|
| E08 | Unbounded idempotency Map (memory leak) | app.ts:30-37 | Add max-size cap (1000 entries) |
| E09 | Idempotency key unvalidated (could be string[]) | app.ts:47 | `String(req.headers["x-idempotency-key"] ?? "")` |
| E10 | CORS origin split without trim | app.ts:18 | `.split(",").map(s => s.trim())` |
| E11 | `no-console` rule vs production console.log usage | eslint.config.js:19 | Change to `["off"]` or add log wrapper |
| E12 | Website URL accepts localhost/private IPs (SSRF) | schemas.ts:39 | Add `.refine()` blocking private ranges |
| E13 | deploy.service imports platformAddress from x402 | deploy.service.ts:5 | Pass as parameter for testability |
| E14 | No CI lint or format:check steps | .github/workflows/ci.yml | Add lint + format:check steps |
| E15 | Anchor CI builds but never tests | .github/workflows/ci.yml | Add `anchor test` step |
| E16 | No pnpm audit in CI (no vuln scanning) | .github/workflows/ci.yml | Add `pnpm audit` step |
| E17 | COMPANY.md body says "6 agent roles" (should be 7) | COMPANY.md:17 | Fix text to "7" |
| E18 | Minerva doesn't delegate to Argus or Themis | marketing-strategist/AGENTS.md:27 | Add delegation entries |
| E19 | GRD 1 + 6 hardcode "4 subtasks" / "4 downstream" | braid-marketing/SKILL.md:48,172 | Update counts and name agents |
| E20 | Hardcoded devnet USDC mint in Anchor binary | campaign-escrow/lib.rs:10 | Use instruction param or feature flag |

---

## LOW (8)

| ID | Finding | Location |
|----|---------|----------|
| E21 | No Solana address validation (base58) | schemas.ts:13,15 |
| E22 | `import.meta.url` path resolution breaks after compile | paperclip-client.ts:99-100 |
| E23 | x402 middleware applied globally (hits health check) | app.ts:28 |
| E24 | No graceful shutdown handler (SIGTERM) | server.ts |
| E25 | Health check doesn't verify dependencies | app.ts:41-43 |
| E26 | Anchor.toml only has localnet, no devnet section | campaign-escrow/Anchor.toml |
| E27 | Test coverage is schema-only (no route/service tests) | gateway/src/ |
| E28 | Argus lacks own BLOCKER format (has OPS ALERT only) | chief-of-staff/AGENTS.md:55 |

---

## Invariants: ALL PASS

| Check | Status |
|-------|--------|
| .paperclip.yaml vs AGENT_ROLES (models) | PASS — all 7 match |
| .paperclip.yaml vs AGENT_ROLES (timeouts) | PASS — all 7 match |
| .paperclip.yaml vs AGENT_ROLES (maxTurns) | PASS — all 7 match |
| DELIVERABLES_EXPECTED (6) vs non-CEO agents (6) | PASS |
| Program ID across lib.rs + Anchor.toml + schemas.ts | PASS |
| USDC mint across lib.rs + schemas.ts | PASS |

---

## Preflight: 3/7

| Check | Status |
|-------|--------|
| Tests pass | PASS (14/14) |
| Build passes | PASS (tsc --noEmit) |
| Actual build output | FAIL (--noEmit produces nothing) |
| Smoke test | FAIL (none exists) |
| CI coverage | PASS (workflow exists) |
| Pre-push hook | FAIL (none exists) |
| Invariant tests | FAIL (no config-invariants.test.ts) |

---

## Strengths

1. **Zod validation pipeline is excellent** — env, request, and response all validated with typed schemas. Clean startup crash on invalid config.
2. **Error type hierarchy is clean** — AppError → ValidationError / ExternalServiceError / EscrowNotImplementedError. Consistent error responses.
3. **Service extraction is proper** — deploy.service.ts has zero HTTP concerns. app.ts handles only routing and middleware.
4. **Config invariants are perfectly aligned** — .paperclip.yaml and AGENT_ROLES have zero drift across all 7 agents.
5. **Agent BRAID GRDs are comprehensive** — 6 complete Mermaid diagrams + compressed formats + critic nodes.
6. **Agent naming (Greek/Latin) is memorable** — Minerva, Argus, Hermes, Calliope, Mercury, Vesta, Themis.
7. **Corrections log + autonomy log** — Transcript-driven quality infrastructure ready for Phase 1 iteration.

---

## Priority Action Plan

| # | ID | Domain | Effort | Impact |
|---|-----|--------|--------|--------|
| 1 | E02 | Infra | 5 min | Build actually works |
| 2 | E01 | Code | 20 min | Config consistency + testability |
| 3 | E03 | Agent | 15 min | GRD 7 exists for Themis |
| 4 | E05 | Agent | 15 min | Name consistency across all agents |
| 5 | E14 | Infra | 5 min | CI catches lint/format issues |
| 6 | E17+E19 | Agent | 10 min | Count corrections (7 agents, not 4/6) |
| 7 | E04 | Code | 10 min | Campaigns endpoint validated |
| 8 | E18 | Agent | 10 min | Minerva delegates to all 7 agents |
| 9 | E06 | Code | 30 min | Failure caching in idempotency |
| 10 | E07 | Code | 20 min | Parallel agent hiring |

---

## Agents Applied

| Agent | What It Checked |
|-------|----------------|
| software-engineer-auditor | Code quality, DRY, type safety, module boundaries, dead code |
| backend-engineer | API architecture, error handling, data flow, service patterns |
| devops-engineer | CI/CD, build pipeline, deployment, Docker, shell scripts |
| quality-orchestrator | Cross-domain synthesis, preflight gate, invariant scan |
| agent-config-auditor | 7 AGENTS.md consistency, BRAID GRD references, naming, hierarchy |
