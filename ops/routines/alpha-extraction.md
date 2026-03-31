# Routine: Alpha Extraction

**Trigger**: Daily at 07:10 AM Amsterdam (launchd, catches up on wake)
**Type**: Automated (`claude -p` with BRAID GRD)
**Output**: `intel/daily-digest/YYYY-MM-DD.md`
**Cost**: ~$0.19/day (~$5.70/month), capped at $0.50/run
**Model**: Sonnet

## What It Does

Reads all daily intel (GitHub commits/PRs/issues, Twitter tweets, video transcripts, npm versions, blog headlines), classifies each item using a BRAID GRD, and produces a single actionable digest with four sections:

- **BREAKING** — fix now (code/config will malfunction)
- **FEATURES** — implement this week (new capabilities)
- **PATTERNS** — update strategy (validates/challenges our approach)
- **COMPETITIVE** — note for pitch (market signals)

Every non-IGNORE item has: specific file path + concrete change + evidence quote + source link.

## Dependencies

Must run AFTER:
- `daily-github-intel.sh` (07:00)
- `daily-twitter-intel.sh` (07:05)

Requires:
- `claude` CLI authenticated
- `gh` CLI authenticated
- `npm` available

## Files

- Script: `scripts/daily-alpha-extract.sh`
- Prompt: `scripts/alpha-extract-prompt.md`
- Output: `intel/daily-digest/YYYY-MM-DD.md`
- launchd: `~/Library/LaunchAgents/com.lemuriaos.frontier-alpha-extract.plist`

## Monitoring

```bash
# Check if today's digest exists
ls -lh intel/daily-digest/$(date +%Y-%m-%d).md

# Check launchd status
launchctl list | grep alpha-extract

# Check logs
cat intel/daily-digest/launchd.log
cat intel/daily-digest/launchd-error.log

# Run manually
bash scripts/daily-alpha-extract.sh
```

## How Atlas Uses This

Atlas reads the digest FIRST in the morning briefing (not raw intel). Only dives into raw data if BREAKING items need verification.
