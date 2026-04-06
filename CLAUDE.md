# Colosseum 2 — Autonomous Marketing Services

## Open Audit Findings (deferred — design decisions required)

From the deep 3-perspective audit (2026-04-03, commit `793a12f`):

### C2: Client-accessible emergency Kamino withdrawal
- **Severity**: CRITICAL
- **Problem**: Only the platform can call `withdraw_from_kamino`. If the platform goes offline with funds parked in Kamino, the client has no recourse. Funds are locked until the platform recovers.
- **Decision needed**: Timeout-based emergency withdrawal mechanism. Options:
  - (a) Add a `force_withdraw_from_kamino` instruction callable by `authority` after N days of inactivity
  - (b) Add a timelock field to the campaign account; after expiry, authority can withdraw directly
  - (c) Require full Kamino withdrawal before allowing park operations near deliverable completion
- **Files**: `campaign-escrow/programs/campaign-escrow/src/lib.rs` (new instruction needed)

### C4: Platform == authority trust model
- **Severity**: CRITICAL (design, not bug)
- **Problem**: The platform wallet is both the escrow `authority` (funds it, can cancel) and the operational signer. There is no custody separation — the escrow provides no independent guarantee to an external client.
- **Decision needed**: This is intentional (platform-custodied escrow). Should be documented explicitly so users understand the trust model.
- **Files**: `campaign-escrow/programs/campaign-escrow/src/lib.rs`, `gateway/src/escrow-client.ts`

### M1: Mainnet USDC mint feature flag
- **Severity**: MEDIUM
- **Problem**: `USDC_MINT` is hardcoded to devnet address `4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU` in the Rust program. Deploying to mainnet requires recompilation.
- **Decision needed**: Deployment strategy. Options:
  - (a) Feature flag: `#[cfg(feature = "mainnet")]` with mainnet mint `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v`
  - (b) Pass mint as initialization parameter (more flexible, less safe)
  - (c) Separate build targets in CI for devnet/mainnet
- **Files**: `campaign-escrow/programs/campaign-escrow/src/lib.rs:12`

### D1: Infraxa MCP server as alternative DeFi layer
- **Severity**: LOW (enhancement opportunity)
- **Problem**: We integrate Kamino directly via `@kamino-finance/klend-sdk` + CPI. Infraxa (@infraxa, infraxa.ai) offers an MCP server wrapping Kamino lending, Solana perps, and smart money tracking into 40+ agent-callable tools. Could expand DeFi strategy options without writing new CPI code.
- **Decision needed**: Evaluate Infraxa MCP vs. direct CPI for future DeFi integrations. Options:
  - (a) Keep direct CPI only — maximum control, escrow program stays the signer
  - (b) Add Infraxa MCP as an optional gateway-level strategy for non-escrow operations (e.g. yield optimization research, smart money signals)
  - (c) Hybrid — direct CPI for escrow-controlled funds, Infraxa MCP for auxiliary DeFi intelligence
- **Source**: https://x.com/infraxa/status/2040965812723544237 (2026-04-06)
- **Files**: `gateway/src/kamino.ts`, `gateway/src/escrow-client.ts`
