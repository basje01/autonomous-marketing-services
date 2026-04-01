#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

DATE=$(date -u +%Y-%m-%d)
DIGEST_DIR="intel/daily-digest"
DIGEST_OUT="${DIGEST_DIR}/${DATE}.md"
STAGING="/tmp/alpha-extract-staging-${DATE}.md"
CLAUDE_BIN="${CLAUDE_BIN:-$(command -v claude || echo /Users/bas/.local/bin/claude)}"

mkdir -p "$DIGEST_DIR"

# Idempotent — skip if digest already exists
if [ -f "$DIGEST_OUT" ]; then
  echo "Digest already exists: ${DIGEST_OUT}"
  exit 0
fi

echo "[alpha] Starting extraction for ${DATE}..."

# === Phase 1: Collect supplementary sources ===

ISSUES_FILE="/tmp/alpha-issues-${DATE}.md"
NPM_FILE="/tmp/alpha-npm-${DATE}.md"
BLOG_FILE="/tmp/alpha-blog-${DATE}.md"

trap 'rm -f "$STAGING" "$ISSUES_FILE" "$NPM_FILE" "$BLOG_FILE"' EXIT

# GitHub Issues (new source — not in existing pipeline)
echo "## GitHub Issues (paperclipai/paperclip, Open)" > "$ISSUES_FILE"
gh issue list -R paperclipai/paperclip -L 15 --state open \
  --json number,title,labels,author,createdAt \
  --jq '.[] | "- #\(.number) \(.title) [\(.labels | map(.name) | join(","))] — @\(.author.login) (\(.createdAt))"' \
  >> "$ISSUES_FILE" 2>/dev/null || echo "- (Issue fetch error)" >> "$ISSUES_FILE"

# npm versions
echo "## npm Registry — paperclipai" > "$NPM_FILE"
npm view paperclipai versions --json 2>/dev/null \
  | python3 -c "import sys,json; vs=json.load(sys.stdin); [print(f'- {v}') for v in vs[-5:]]" \
  >> "$NPM_FILE" 2>/dev/null || echo "- (npm fetch error)" >> "$NPM_FILE"

# Blog headlines
echo "## paperclip.ing Blog" > "$BLOG_FILE"
curl -sL --max-time 15 "https://paperclip.ing/blog" 2>/dev/null \
  | python3 -c "
import sys, re
html = sys.stdin.read()
titles = re.findall(r'<h[23][^>]*>(.*?)</h[23]>', html, re.DOTALL)
for t in titles[:10]:
    clean = re.sub(r'<[^>]+>', '', t).strip()
    if clean:
        print(f'- {clean}')
if not titles:
    print('- (no articles found)')
" >> "$BLOG_FILE" 2>/dev/null || echo "- (Blog fetch error)" >> "$BLOG_FILE"

# === Phase 2: Assemble staging file ===

{
  echo "# Alpha Extraction Input — ${DATE}"
  echo ""

  # GitHub intel
  echo "---"
  echo "# SOURCE 1: GITHUB"
  if [ -f "intel/github/${DATE}.md" ]; then
    cat "intel/github/${DATE}.md"
  else
    echo "(No GitHub intel for ${DATE})"
  fi

  # GitHub Issues
  echo ""
  echo "---"
  cat "$ISSUES_FILE"

  # Twitter intel
  echo ""
  echo "---"
  echo "# SOURCE 2: TWITTER"
  if [ -f "intel/twitter/${DATE}.md" ]; then
    cat "intel/twitter/${DATE}.md"
  else
    echo "(No Twitter intel for ${DATE})"
  fi

  # New transcripts from today only
  echo ""
  echo "---"
  echo "# SOURCE 3: VIDEO TRANSCRIPTS (today only)"
  TRANSCRIPT_COUNT=0
  for f in intel/twitter/transcripts/*.md; do
    if [ -f "$f" ]; then
      FILE_DATE=$(stat -f "%Sm" -t "%Y-%m-%d" "$f" 2>/dev/null || echo "")
      if [ "$FILE_DATE" = "$DATE" ]; then
        echo "### Transcript: $(basename "$f" .md)"
        cat "$f"
        echo ""
        echo "---"
        TRANSCRIPT_COUNT=$((TRANSCRIPT_COUNT + 1))
      fi
    fi
  done
  if [ "$TRANSCRIPT_COUNT" -eq 0 ]; then
    echo "(No new transcripts today)"
  fi

  # npm + blog
  echo ""
  cat "$NPM_FILE"
  echo ""
  cat "$BLOG_FILE"

  # Reference: project files
  echo ""
  echo "---"
  echo "# REFERENCE: Key project files that actions might target"
  echo "- agents/marketing-strategist/AGENTS.md (Minerva, CEO)"
  echo "- agents/chief-of-staff/AGENTS.md (Argus)"
  echo "- agents/seo-agent/AGENTS.md (Hermes)"
  echo "- agents/content-agent/AGENTS.md (Calliope)"
  echo "- agents/social-agent/AGENTS.md (Mercury)"
  echo "- agents/community-agent/AGENTS.md (Vesta)"
  echo "- agents/evals-engineer/AGENTS.md (Themis)"
  echo "- .paperclip.yaml, gateway/src/, campaign-escrow/"
  echo "- skills/braid-marketing/SKILL.md, corrections-log.md, COMPANY.md"
} > "$STAGING"

# Truncate if over 2000 lines (token safety)
LINES=$(wc -l < "$STAGING")
if [ "$LINES" -gt 2000 ]; then
  head -2000 "$STAGING" > "${STAGING}.tmp"
  echo "" >> "${STAGING}.tmp"
  echo "(Input truncated at 2000 lines for token budget)" >> "${STAGING}.tmp"
  mv "${STAGING}.tmp" "$STAGING"
  echo "[alpha] WARNING: Input truncated from ${LINES} to 2000 lines"
fi

# === Phase 3: Run LLM extraction ===

echo "[alpha] Running claude -p extraction (Sonnet, ~36K tokens)..."

"$CLAUDE_BIN" -p \
  --model sonnet \
  --system-prompt-file scripts/alpha-extract-prompt.md \
  --max-budget-usd 0.50 \
  "$(cat "$STAGING")" \
  > "$DIGEST_OUT" 2>/tmp/alpha-extract-error.log || true

# Verify output
if [ ! -s "$DIGEST_OUT" ] || [ "$(wc -l < "$DIGEST_OUT")" -lt 10 ]; then
  echo "[alpha] ERROR: Digest too short or empty. Check /tmp/alpha-extract-error.log"
  cat /tmp/alpha-extract-error.log 2>/dev/null | tail -5
  rm -f "$DIGEST_OUT"
  exit 1
fi

DIGEST_LINES=$(wc -l < "$DIGEST_OUT")
echo ""
echo "[alpha] Digest saved to ${DIGEST_OUT} (${DIGEST_LINES} lines)"
