# Routine: Weekly Stack Health

**Trigger**: Every Monday at 08:00 Europe/Amsterdam
**Assigned to**: Sentinel (Platform Guard)
**Duration**: ~10 minutes

## Steps

1. Run `pnpm typecheck` — verify TypeScript compiles
2. Run `pnpm test` — verify all gateway tests pass
3. Run `anchor build` (in campaign-escrow/) — verify Anchor compiles
4. Run `pnpm audit` — check for dependency vulnerabilities
5. Check Colosseum Copilot PAT expiry date
6. Check Paperclip version vs latest release
7. Post stack health report

## Template

```
Run the full stack health check:
1. pnpm typecheck (should pass)
2. pnpm test (14 tests should pass)
3. cd campaign-escrow && anchor build (should compile)
4. Check Copilot PAT expiry
5. Compare installed Paperclip version to latest release on GitHub
Post results in stack health report format.
```
