# Codebase Audit Report
**Project:** Frontier Marketing OS
**Date:** 2026-04-03
**Scope:** full (security + code + infra + cost + invariants + preflight)
**Tech Stack:** TypeScript/Express, Anchor/Rust, Paperclip, x402/Solana, Zod, Vitest
**Agents Applied:** 9 (security-check, api-security, appsec, software-engineer-auditor, backend-engineer, devops-engineer, api-cost-guardian + invariants + preflight)

---

## Executive Summary

Strong codebase with excellent TypeScript discipline (strict mode, Zod everywhere, 33 tests passing). Two CRITICAL issues require immediate attention: (1) build script produces no output (`tsc --noEmit` instead of `tsc`), and (2) $5 campaign price vs ~$6/day agent cost is unsustainable. Security is solid — Helmet, CORS, rate limiting, x402 payment gate — but agent Bash permissions are too broad and the API key auth is optional by default. Code quality is A-tier with clean separation of concerns.

## Scores

| Domain | Grade | Critical | High | Medium | Low |
|--------|-------|----------|------|--------|-----|
| Security | B+ | 1 | 3 | 5 | 4 |
| Code Quality | A- | 0 | 0 | 0 | 3 |
| Infrastructure | A- | 0 | 0 | 0 | 1 |
| Cost Management | C | 1 | 2 | 0 | 0 |
| Invariants | B | 0 | 2 | 0 | 0 |
| Preflight | 5/7 | 1 | 2 | 0 | 0 |

---

## CRITICAL (fix now)

### AUDIT-001: Build script broken — no production output
**Agent:** devops-engineer
**Location:** gateway/package.json:8
**Confidence:** HIGH

**Finding:** `"build": "tsc --noEmit"` produces no output. `"start": "node dist/server.js"` will crash.

**Fix:**
```json
"build": "tsc",
"typecheck": "tsc --noEmit"
```

### AUDIT-002: $5 campaign price vs ~$6/day agent cost
**Agent:** api-cost-guardian
**Location:** env.example:18
**Confidence:** HIGH

**Finding:** CAMPAIGN_PRICE_USDC=5 but agent monthly budgets total $175 (~$6/day). Every campaign loses money.

**Impact:** Unsustainable unit economics.

**Fix:** For hackathon demo, this is fine (proving the concept). For production, charge $50-200/campaign or reduce agent scope. Document this as a known demo pricing.

### AUDIT-003: Overly broad agent Bash permissions
**Agent:** security-check
**Location:** gateway/src/paperclip-client.ts:158
**Confidence:** HIGH

**Finding:** `Bash(curl:*)` allows agents to exfiltrate data to any URL.

**Fix:** Restrict to specific domains:
```
Bash(curl:https://intel.lemuriaos.ai/*) Bash(curl:https://api.firecrawl.dev/*)
```

---

## HIGH (fix this week)

### AUDIT-004: Optional API key auth on sensitive endpoints
**Location:** gateway/src/app.ts:68-79
**Finding:** If `GATEWAY_API_KEY` is unset, campaign and audit endpoints are public.
**Fix:** Require key in production: `if (!config.gatewayApiKey && config.nodeEnv === "production") throw`.

### AUDIT-005: Firecrawl credits not enforced in code
**Location:** skills/firecrawl/SKILL.md:66-84
**Finding:** 500 free credits, documentation says max 50/campaign, but no runtime enforcement.
**Fix:** Add credit tracking to agent instructions or implement server-side middleware.

### AUDIT-006: No config-invariants.test.ts
**Location:** gateway/src/ (missing file)
**Finding:** No test validates cross-file config relationships (price vs cost, turns vs scope).
**Fix:** Create `gateway/src/config-invariants.test.ts` with economics and alignment checks.

### AUDIT-007: CI doesn't test actual build
**Location:** .github/workflows/ci.yml:27-39
**Finding:** CI runs typecheck but not `build`. Production build never tested.
**Fix:** Add `- run: pnpm build` step after typecheck.

### AUDIT-008: Idempotency key collision risk
**Location:** gateway/src/app.ts:387
**Finding:** Keys silently truncated to 128 chars — two different long keys could collide.
**Fix:** Reject keys > 128 chars with 400 error.

---

## MEDIUM

### AUDIT-009: No campaign_id format validation (Anchor)
**Location:** campaign-escrow/programs/campaign-escrow/src/lib.rs:24
**Fix:** Add alphanumeric + hyphen/underscore regex check.

### AUDIT-010: Unverified Kamino PDA accounts
**Location:** lib.rs:432-462 (UncheckedAccount with comment-only validation)
**Fix:** Move PDA validation to account constraints or add assertion macros.

### AUDIT-011: Rate limit before x402 allows probing
**Location:** gateway/src/app.ts:87-93
**Fix:** Add stricter pre-payment rate limit (2 req/min).

### AUDIT-012: No x402 price enforcement on-chain
**Location:** lib.rs (no FIXED_CAMPAIGN_PRICE check)
**Fix:** Add `require!(budget_usdc == FIXED_PRICE)` in Anchor program.

### AUDIT-013: CORS empty-string edge case
**Location:** gateway/src/app.ts:30-35
**Fix:** Filter empty strings from origin list.

---

## LOW

### AUDIT-014: Helmet using all defaults
### AUDIT-015: No circuit breaker for external services
### AUDIT-016: Hardcoded Anchor pubkeys (devnet only)
### AUDIT-017: No structured logging (console only)
### AUDIT-018: Idempotency cleanup timer-based, not request-based
### AUDIT-019: Error messages may leak Solana RPC details
### AUDIT-020: No Paperclip API authentication headers

---

## Strengths

1. **TypeScript discipline** — Full strict mode, `noUnusedLocals`, `noUncheckedIndexedAccess`. Zero `any` types.
2. **Zod everywhere** — All env vars, API inputs, and external API responses validated at runtime.
3. **Error architecture** — AppError hierarchy with codes, consistent JSON responses, never silent failures.
4. **Audit trail** — SHA-256 chained, Ed25519 signed, append-only NDJSON. Crypto-grade accountability.
5. **Separation of concerns** — Routes → Services → Clients → Validators → Infrastructure. Each file single-purpose.
6. **Solana resilience** — Transient retry with backoff, compute budget management, priority fees.
7. **CI/CD** — Lint + format + typecheck + test on every push. Frozen lockfile.
8. **Graceful shutdown** — SIGTERM/SIGINT with 10s timeout and forced exit.
9. **Idempotency** — Proper pending/completed states with TTL, max size cap, LRU eviction.
10. **Agent knowledge system** — 3-tier architecture (skills → knowledge → digest) is genuinely innovative.

---

## Priority Action Plan

| # | ID | Severity | Effort | What |
|---|-----|----------|--------|------|
| 1 | AUDIT-001 | CRITICAL | 5 min | Fix build script (tsc --noEmit → tsc) |
| 2 | AUDIT-003 | CRITICAL | 15 min | Restrict agent Bash(curl:*) to specific domains |
| 3 | AUDIT-004 | HIGH | 10 min | Require GATEWAY_API_KEY in production |
| 4 | AUDIT-007 | HIGH | 5 min | Add build step to CI |
| 5 | AUDIT-008 | HIGH | 10 min | Reject long idempotency keys |
| 6 | AUDIT-006 | HIGH | 30 min | Create config-invariants.test.ts |
| 7 | AUDIT-002 | CRITICAL | Decision | Document hackathon pricing vs production pricing |
