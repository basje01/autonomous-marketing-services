#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

command -v gh >/dev/null 2>&1 || { echo "gh CLI required but not found"; exit 1; }
gh auth status >/dev/null 2>&1 || { echo "gh not authenticated — run: gh auth login"; exit 1; }

DATE=$(date -u +%Y-%m-%d)
OUT="intel/github/${DATE}.md"
mkdir -p intel/github

echo "# Paperclip GitHub Intel — ${DATE}" > "$OUT"
echo "" >> "$OUT"

# Commits (last 15 on main)
echo "## Recent Commits" >> "$OUT"
echo "" >> "$OUT"
gh api graphql -f query='{
  repository(owner:"paperclipai" name:"paperclip") {
    defaultBranchRef {
      target {
        ... on Commit {
          history(first:15) {
            nodes {
              messageHeadline
              abbreviatedOid
              author { name date }
            }
          }
        }
      }
    }
  }
}' --jq '.data.repository.defaultBranchRef.target.history.nodes[] |
  "- `\(.abbreviatedOid)` \(.messageHeadline) — \(.author.name) (\(.author.date))"' >> "$OUT" 2>/dev/null || echo "- (GitHub API error)" >> "$OUT"

# PRs (last 10, all states)
echo "" >> "$OUT"
echo "## Recent Pull Requests" >> "$OUT"
echo "" >> "$OUT"
gh pr list -R paperclipai/paperclip -L 10 --state all \
  --json number,title,state,author,createdAt \
  --jq '.[] | "- #\(.number) \(.title) [\(.state)] — @\(.author.login) (\(.createdAt))"' >> "$OUT" 2>/dev/null || echo "- (PR fetch error)" >> "$OUT"

# Releases (last 3)
echo "" >> "$OUT"
echo "## Releases" >> "$OUT"
echo "" >> "$OUT"
gh release list -R paperclipai/paperclip -L 3 \
  --json tagName,name,publishedAt \
  --jq '.[] | "- \(.tagName) — \(.name) (\(.publishedAt))"' >> "$OUT" 2>/dev/null || echo "- (Release fetch error)" >> "$OUT"

# Repo stats
echo "" >> "$OUT"
echo "## Repo Stats" >> "$OUT"
echo "" >> "$OUT"
gh api repos/paperclipai/paperclip --jq '"- Stars: \(.stargazers_count)\n- Forks: \(.forks_count)\n- Open Issues: \(.open_issues_count)\n- Last Push: \(.pushed_at)"' >> "$OUT" 2>/dev/null

echo ""
echo "GitHub intel saved to ${OUT}"
