---
topic: claude-code-practices
last-verified: 2026-04-03
sources:
  - "Boris Cherny 11m50s interview (2036122417970684148) — 544K views, 99K bookmarks"
agents: all
---

# Claude Code Practices (from Boris Cherny, creator)

## The 3-Part Formula

1. **Use Opus always** — Smarter = fewer tokens = cheaper total cost. "Once the plan is good, the code is good."
2. **Invest in CLAUDE.md** — Whole team contributes multiple times a week. "You should never have to comment about something twice."
3. **Give Claude a way to verify output** — "Like a painter with a blindfold." Tests, browser, simulator.

## Workflow

- 5-10 parallel sessions (terminal + web + mobile)
- Half his coding is from his phone
- Plan mode first → auto-accept edits → one-shot execution
- `@cloud` on GitHub PRs to update CLAUDE.md during code review
- Kicks off 3 sessions from phone every morning

## Compound Engineering

From Boris's time at Meta: track repeated code review issues in a spreadsheet. When something hits 5-10 tallies, automate it (lint rule then, CLAUDE.md rule now). "You should never have to point anything out twice."
