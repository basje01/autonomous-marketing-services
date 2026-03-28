---
name: crypto-intel
description: "Search Twitter/X, Reddit, and web for recent crypto project mentions, sentiment, and competitive activity from the last 30 days. Feed results as context into marketing content generation."

## Context

Marketing campaigns for crypto projects need fresh market context. LLM training data is stale. The Colosseum Copilot provides builder project history and archives, but NOT real-time market sentiment or recent competitor activity. This skill fills that gap by searching recent sources and synthesizing them into actionable marketing context.

The agent using this skill does NOT need to read the full research — the point is to generate rich context that feeds into downstream content generation. "I often don't even read what it says... mostly I just want it to write a good email."

## Procedure

1. **Define search queries**: Based on the project name, target keywords, and competitors, create 5-8 search queries targeting:
   - Project name + "launch" / "announcement" / "update"
   - Competitor names + "marketing" / "campaign" / "growth"
   - Category keywords + "Solana" / "crypto" (e.g., "DeFi payments Solana 2026")
   - Community sentiment queries (project name + "review" / "opinion" / "thoughts")

2. **Search Twitter/X**: Use web search to find recent tweets about the project and competitors. Look for:
   - Official project announcements
   - Community reactions and sentiment
   - Influencer mentions
   - Engagement patterns (high-like tweets indicate resonating messages)

3. **Search Reddit/forums**: Search for recent discussions in r/solana, r/cryptocurrency, r/defi, and project-specific subreddits. Look for:
   - User pain points and feature requests
   - Competitor comparisons
   - Positive/negative sentiment patterns

4. **Search web**: Search for recent blog posts, articles, and news about the project and competitors. Look for:
   - Press coverage and announcements
   - Technical analyses and reviews
   - Partnership announcements

5. **Synthesize findings**: Combine all sources into a structured report following the output format below. Ensure every claim has a source citation.

## Output Format

```markdown
# Market Intel: [Project Name] — Last 30 Days

## Search Period
[Date range]

## Market Sentiment
**Overall**: [Bullish / Neutral / Bearish]
**Evidence**:
- [Source 1 quote + URL]
- [Source 2 quote + URL]

## Competitor Activity
### [Competitor 1]
- Recent moves: [what they shipped/announced]
- Marketing activity: [campaigns, content, social]
- Source: [URLs]

### [Competitor 2]
...

## Community Buzz
- Top discussion topics: [list]
- Common pain points: [list]
- Feature requests: [list]
- Sources: [URLs]

## Content Opportunities
1. [Gap or trending topic] — [why it matters] — [suggested content angle]
2. ...

## Raw Sources
| # | Platform | Date | URL | Key Quote |
|---|----------|------|-----|-----------|
| 1 | Twitter | ... | ... | ... |
| 2 | Reddit | ... | ... | ... |
```
