# Routine: Campaign Health Check

**Trigger**: Every 2 hours during business hours (10 AM, 12 PM, 2 PM, 4 PM Amsterdam)
**Assigned to**: Iris (Campaign Monitor)
**Duration**: ~3 minutes per campaign

## Steps

1. List all Paperclip companies via `GET /api/companies`
2. For each active company, check:
   - Agent count (should be 7)
   - Issue statuses (any stale? any blocked?)
   - Recent activity (last update timestamp)
3. Flag any campaign that's stale (> 2h without update) or blocked
4. Escalate blockers to Atlas if unresolved for > 30 minutes
5. Post health report

## Template

```
Check all active Paperclip campaigns for health.
For each: verify 7 agents are hired, check for stale issues (>2h),
check for BLOCKER comments. Flag problems, escalate if needed.
Post campaign health report.
```
