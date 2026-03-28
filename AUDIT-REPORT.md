# Codebase Audit Report
**Project:** Frontier Marketing OS (Colosseum 2)
**Date:** 2026-03-30
**Scope:** full (security + code + invariants + cost)
**Tech Stack:** TypeScript, Express, Solana/Anchor (stub), Paperclip, Bash/Whisper
**Agents Applied:** 6 of 21 (security-check, api-security-specialist, application-security-engineer, software-engineer-auditor, backend-engineer, api-cost-guardian)
**Skipped:** SEO (no website deployed), infra (no CI/CD/Docker yet), perf (no frontend), accessibility (no UI), database (no DB), preflight (no tests), observability (no monitoring), live verify (not deployed)

---

## Executive Summary

Early-stage hackathon scaffolding with strong agent architecture design but significant security gaps in the gateway code and config inconsistencies across files. **One critical finding** (hardcoded API key in git) requires immediate action. The gateway has no authentication, rate limiting, or input validation — expected for a Phase 0 prototype but must be addressed before any demo or deployment. Agent configurations (AGENTS.md + BRAID GRDs) are well-structured and production-quality. Config invariants between `.paperclip.yaml` and `paperclip-client.ts` have 3 timeout mismatches that could kill agents mid-run.

---

## Scores

| Domain | Grade | Critical | High | Medium | Low |
|--------|-------|----------|------|--------|-----|
| Security | D | 1 | 5 | 4 | 1 |
| Code Quality | C | 2 | 4 | 7 | 4 |
| Invariants | C | 0 | 1 | 3 | 1 |
| Cost | B | 0 | 0 | 1 | 0 |
| Infrastructure | — | Skipped (no CI/CD/Docker) | | | |
| Performance | — | Skipped (no frontend) | | | |
| SEO | — | Skipped (no website) | | | |

---

## CRITICAL (3)

### AUDIT-001: Hardcoded API Key in Git
**Agent:** security-check
**Location:** scripts/daily-twitter-intel.sh:11
**Confidence:** HIGH

**Finding:** Twitter API key `[REDACTED]` is hardcoded in a git-tracked file. This key is in git history permanently.

**Impact:** Anyone with repo access (or if repo goes public for hackathon submission) has full Twitter API access.

**Fix:**
```bash
# Replace line 11 with:
API_KEY="${TWITTERAPI_IO_KEY:?Missing TWITTERAPI_IO_KEY env var}"
```
Then rotate the key at twitterapi.io.

**Reference:** CWE-798: Use of Hard-coded Credentials

---

### AUDIT-002: `null as any` Keypair — Runtime Crash
**Agent:** software-engineer-auditor
**Location:** gateway/src/server.ts:52
**Confidence:** HIGH

**Finding:** `clientKeypair: null as any` bypasses TypeScript type safety. Will crash when escrow integration is wired up.

**Impact:** `NullPointerException` on any `.publicKey` access.

**Fix:**
```typescript
// Replace with:
clientKeypair: Keypair.generate(), // Placeholder devnet keypair
```

---

### AUDIT-003: `parseFloat` for USDC Monetary Values
**Agent:** software-engineer-auditor
**Location:** gateway/src/config.ts:14
**Confidence:** HIGH

**Finding:** `parseFloat` introduces IEEE 754 rounding errors on financial values written to Solana.

**Impact:** Incorrect escrow amounts on-chain.

**Fix:**
```typescript
// Store as integer micro-units (USDC has 6 decimals):
campaignPriceUsdcMicro: Math.round(
  parseFloat(process.env.CAMPAIGN_PRICE_USDC || "5") * 1_000_000
),
```

---

## HIGH (8)

### AUDIT-004: No Authentication on Deploy Endpoint
**Agent:** api-security-specialist
**Location:** gateway/src/server.ts:32
**Confidence:** HIGH

**Finding:** `POST /api/deploy-marketing-team` has zero auth. Anyone can create campaigns.

**Fix:** Add x402 payment verification (the intended design) or API key auth as interim:
```typescript
const requireAuth = (req, res, next) => {
  const key = req.headers["x-api-key"];
  if (key !== process.env.GATEWAY_API_KEY) return res.status(401).json({ error: "Unauthorized" });
  next();
};
app.post("/api/deploy-marketing-team", requireAuth, async (req, res) => { ... });
```

### AUDIT-005: No Rate Limiting
**Agent:** api-security-specialist
**Location:** gateway/src/server.ts (global)
**Confidence:** HIGH

**Finding:** No rate limiting on any endpoint. Deploy endpoint creates real AI agent resources.

**Fix:** `pnpm add express-rate-limit` and add middleware.

### AUDIT-006: Error Details Leaked to Client
**Agent:** security-check
**Location:** gateway/src/server.ts:101-104
**Confidence:** HIGH

**Finding:** Internal error messages (stack traces, Solana RPC errors, internal URLs) returned to client.

**Fix:** Remove `details` field from 500 response. Log only server-side.

### AUDIT-007: SSRF Risk via `website` Field
**Agent:** application-security-engineer
**Location:** gateway/src/server.ts:34, paperclip-client.ts:166
**Confidence:** MEDIUM

**Finding:** User-supplied `website` URL passed to agent task descriptions without validation. Agents may fetch it.

**Fix:** Validate URL scheme (`https://` only) and block private IP ranges.

### AUDIT-008: No CORS Configuration
**Agent:** api-security-specialist
**Location:** gateway/src/server.ts (global)
**Confidence:** HIGH

**Finding:** Express defaults to allowing all origins.

**Fix:** Add `cors` package with explicit origin allowlist.

### AUDIT-009: Timeout Mismatch (3 Agents)
**Agent:** api-cost-guardian
**Location:** .paperclip.yaml vs paperclip-client.ts:128
**Confidence:** HIGH

**Finding:** `.paperclip.yaml` sets Chief of Staff, Social, and Community agents to 600s timeout. `paperclip-client.ts` sends 900s to the API for ALL agents. Agents could be killed mid-run.

| Agent | .paperclip.yaml | paperclip-client.ts |
|-------|----------------|---------------------|
| Chief of Staff | 600 | 900 |
| Social Agent | 600 | 900 |
| Community Agent | 600 | 900 |

**Fix:** Add `timeoutSec` per role in `AGENT_ROLES` and use `role.timeoutSec` instead of hardcoded 900.

### AUDIT-010: No Timeout on Fetch Calls to Paperclip API
**Agent:** backend-engineer
**Location:** paperclip-client.ts:27, 114, 184; server.ts:113
**Confidence:** HIGH

**Finding:** All fetch calls to Paperclip have no timeout. If Paperclip hangs, the gateway hangs.

**Fix:** Add `signal: AbortSignal.timeout(30_000)` to every fetch.

### AUDIT-011: Silent Agent Hire Failure
**Agent:** backend-engineer
**Location:** paperclip-client.ts:134-136
**Confidence:** HIGH

**Finding:** Failed agent hires are logged but skipped via `continue`. Campaign could deploy with missing agents.

**Fix:** Throw if the Strategist fails to hire. Collect errors and report partial failures.

---

## MEDIUM (10)

### AUDIT-012: Agent Count Mismatch in Comments/Messages
**Location:** server.ts:28, 65, 97
**Finding:** Comments say "5 agents" but code hires 6. Response message says "5 agents hired."
**Fix:** Use `${agents.length}` in the response. Update comments to 6.

### AUDIT-013: Unused Dependencies
**Location:** gateway/package.json:12-14
**Finding:** `@coral-xyz/anchor` and `@solana/spl-token` imported but never used.
**Fix:** Remove until Anchor program is built.

### AUDIT-014: Unused Imports in escrow-client.ts
**Location:** gateway/src/escrow-client.ts:1-6
**Finding:** `Keypair`, `SystemProgram` imported but unused. `connection` instantiated but unused.
**Fix:** Remove unused imports. Use `import type { Keypair }` for the type.

### AUDIT-015: No Input Validation Beyond Presence
**Location:** gateway/src/server.ts:34-41
**Finding:** No type, length, or content validation on request body.
**Fix:** Add Zod schema validation.

### AUDIT-016: No Security Headers (helmet)
**Location:** gateway/src/server.ts (global)
**Fix:** `pnpm add helmet` and `app.use(helmet())`.

### AUDIT-017: Internal URL in Health Response
**Location:** gateway/src/server.ts:17
**Finding:** `paperclip: config.paperclipApiUrl` leaks internal URL.
**Fix:** Remove from health response or gate behind admin auth.

### AUDIT-018: Hardcoded Binary Paths in Shell Script
**Location:** scripts/daily-twitter-intel.sh:14-15
**Finding:** macOS-specific paths for whisper and ffmpeg. Not portable.
**Fix:** Use `command -v whisper` and `command -v ffmpeg`.

### AUDIT-019: Budget Fields Missing from .paperclip.yaml
**Location:** .paperclip.yaml (entire file)
**Finding:** No `monthlyBudget` fields. Only defined in paperclip-client.ts. No single source of truth.
**Fix:** Add budget fields to YAML or document that TS code is canonical.

### AUDIT-020: Campaign Underpriced ($5 USDC vs ~$8-14 actual cost)
**Location:** gateway/src/config.ts:14
**Finding:** Estimated per-campaign API cost is $8-14 (Opus strategist ~$5-8, 5 Sonnet agents ~$3-6). Campaign price is $5 USDC.
**Fix:** Raise to $15-20 USDC or track actual costs per campaign to calibrate.

### AUDIT-021: Root `pnpm test` Points to Non-existent Anchor Tests
**Location:** package.json:9-10
**Finding:** `"test": "pnpm test:anchor"` runs `anchor test` which doesn't exist.
**Fix:** Change to `"test": "echo 'No tests yet'"` until Anchor program exists.

---

## LOW (5)

### AUDIT-022: No `.env.example` File
**Fix:** Create with all required env vars documented.

### AUDIT-023: No `engines` Field in package.json
**Fix:** Add `"engines": { "node": ">=20.0.0" }`.

### AUDIT-024: No Request Logging
**Fix:** Add `morgan` middleware for request audit trail.

### AUDIT-025: No `/tmp` Cleanup Trap in Shell Scripts
**Fix:** Add `trap 'rm -f /tmp/tweet_video_*.mp4 /tmp/tweet_audio_*.wav' EXIT`.

### AUDIT-026: GitHub Script Has No Auth Pre-check
**Fix:** Add `command -v gh >/dev/null || exit 1` and `gh auth status || exit 1`.

---

## Strengths

1. **Agent architecture is excellent** — 6 roles with clear hierarchies, BRAID GRDs for structured reasoning, error reporting protocols, and verification checklists. This is production-quality agent design.
2. **BRAID integration is unique** — No other hackathon project will have bounded reasoning diagrams preventing output drift across a multi-agent chain. The compounding error prevention is a genuine technical differentiator.
3. **company.new compatibility** — COMPANY.md with `agentcompanies/v1` schema, YAML frontmatter on all AGENTS.md files, and `.paperclip.yaml` config. Ready for one-command import.
4. **Daily intelligence pipeline** — Automated GitHub + Twitter monitoring with Whisper video transcription is a serious competitive intelligence advantage.
5. **TypeScript compiles clean** — No type errors despite early-stage code.
6. **Git history is clean** — 6 well-documented commits with clear scope.

---

## Priority Action Plan

| # | ID | Domain | Effort | Impact |
|---|-----|--------|--------|--------|
| 1 | AUDIT-001 | Security | 10 min | API key exposure eliminated |
| 2 | AUDIT-002 | Code | 5 min | Runtime crash prevented |
| 3 | AUDIT-003 | Code | 10 min | Financial precision fixed |
| 4 | AUDIT-009 | Invariants | 15 min | Agent timeout mismatch fixed |
| 5 | AUDIT-012 | Code | 5 min | Agent count consistency |
| 6 | AUDIT-006 | Security | 5 min | Error leaking stopped |
| 7 | AUDIT-014 | Code | 5 min | Dead code removed |
| 8 | AUDIT-013 | Code | 5 min | Unused deps removed |
| 9 | AUDIT-015 | Security | 20 min | Input validation added |
| 10 | AUDIT-018 | Code | 5 min | Script portability |

---

## Agents Applied

| Agent | What It Checked |
|-------|----------------|
| security-check | OWASP Top 10, secrets, attack surface |
| api-security-specialist | Auth, rate limiting, CORS, headers |
| application-security-engineer | SSRF, injection, supply chain |
| software-engineer-auditor | Code quality, dead code, type safety, architecture |
| backend-engineer | API design, error handling, fetch timeouts, health checks |
| api-cost-guardian | Config invariants, budget consistency, cost projection |
