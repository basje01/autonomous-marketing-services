# Routine: Morning Briefing

**Trigger**: Daily at 07:30 AM Amsterdam (Europe/Amsterdam, after intel pipeline runs at 07:00/07:05 UTC)
**Assigned to**: Atlas (Ops CEO)
**Duration**: ~5 minutes

## Steps

1. Read `intel/github/[today].md`
2. Read `intel/twitter/[today].md`
3. Check any new transcripts in `intel/twitter/transcripts/`
4. Classify each item: breaking change / new feature / ignore
5. Create issues for Sentinel, Oracle, Iris, or Chronos as needed
6. Post morning briefing summary

## Template

```
Every day at 9:30 AM, read today's intel reports from intel/github/ and intel/twitter/.
Classify each GitHub commit and tweet as: BREAKING (requires immediate action),
FEATURE (worth integrating), or IGNORE.
Create issues for the relevant ops agent if action needed.
Post a morning briefing summary on today's ops issue.
```
