---
id: social-audit
title: Social Media Audit
category: social
goal: Evaluate an existing social media presence across 1-3 platforms to identify performance gaps, content opportunities, and competitive positioning with actionable recommendations.
best_for: New client onboarding, quarterly performance reviews, or when social engagement has plateaued despite consistent posting.
inputs:
  - Social platform access or public profile URLs
  - 90-day posting and engagement data
  - Competitor social accounts (3-5 competitors)
  - Business objectives for social media
constraints:
  - Audit must be data-driven - opinions without metrics are not findings
  - Recommendations must be prioritized by impact and effort
  - Competitor analysis must compare like-for-like (same platform, similar follower count range)
  - Every finding must include the specific data point that supports it
  - Vanity metrics (total followers) must be contextualized with engagement rate
outputs:
  - Per-platform performance analysis with benchmarks
  - Content performance breakdown by format, topic, and timing
  - Competitive positioning map
  - Prioritized recommendations with expected impact
quality_checks:
  - Every finding is backed by a specific metric or data point
  - Engagement rate is calculated, not just follower count
  - Content is analyzed by format and topic, not just chronologically
  - Competitors are benchmarked on engagement rate, not just follower count
  - Recommendations are prioritized by impact and effort
tags:
  - social
  - analytics
  - research
version: 1.0.0
impact: 3
geo_layer_required: false
---

## Context

Use this as the first step when onboarding a new client's social media or when an established account's engagement has plateaued. The social audit is the diagnostic - it tells you what's working, what isn't, and where the biggest opportunities are before you build a content calendar or engagement strategy.

**Follower count without engagement rate is a vanity metric.** An account with 50,000 followers and 0.5% engagement rate reaches fewer people per post than an account with 5,000 followers and 5% engagement rate. The audit must report engagement rate (interactions / reach or interactions / followers) as the primary health metric.

**Content analysis by format reveals the algorithm's preferences.** If video posts consistently get 3x the reach of image posts, but 80% of your content is images, the fix is obvious. Breaking down content performance by format (image, video, carousel, text, stories) and by topic (educational, promotional, community, culture) exposes these mismatches.

**Competitive benchmarking is only useful when it's like-for-like.** Comparing a 2,000-follower account's engagement with a 200,000-follower account's engagement is meaningless - larger accounts naturally have lower engagement rates due to audience dilution. Compare against competitors with similar follower counts and in the same category.

## Procedure

1. Collect 90-day data per platform. Metrics needed: follower count and growth rate, posts published (by format), total reach/impressions, engagement rate (interactions/reach), top-performing posts (by engagement), worst-performing posts, posting frequency and timing, audience demographics (if available).
2. Calculate engagement rate. Formula: (likes + comments + shares + saves) / reach × 100 for reach-based engagement rate, or (likes + comments + shares + saves) / followers × 100 for follower-based. Use reach-based if available (more accurate); use follower-based if reach data isn't accessible. Benchmark: Instagram 1-3%, Twitter/X 0.5-1.5%, LinkedIn 2-5%, TikTok 3-8%.
3. Analyze content by format. Group all posts by format (image, video, carousel, story, text, thread, reel). For each format: average engagement rate, average reach, and percentage of total posts. Identify format-performance mismatches: "Video gets 3x average engagement but represents only 10% of posts."
4. Analyze content by topic. Tag each post by topic/pillar (educational, promotional, community, culture, product, industry commentary). For each topic: average engagement rate, average reach, and percentage of total posts. Identify topic-performance mismatches.
5. Analyze posting timing. Map posts by day of week and hour. Identify: when you post most frequently vs. when your posts perform best. If peak posting times don't align with peak performance times, there's an optimization opportunity.
6. Conduct competitive analysis. For 3-5 competitors on the same platform: follower count, engagement rate, posting frequency, top content formats, and top content topics. Position your account relative to competitors on a 2x2 matrix: engagement rate (y-axis) vs. posting frequency (x-axis). Identify: what competitors do that you don't, and what you do that they don't.
7. Produce prioritized recommendations. Each recommendation must include: the specific finding that triggers it, the expected impact (high/medium/low), the effort required, and a clear action. Prioritize by impact/effort ratio - quick wins first.

## Output Format

```md
# Social Media Audit

## Audit Period
- Platforms: [list]
- Period: [YYYY-MM-DD to YYYY-MM-DD] (90 days)
- Audited by: [name]
- Date: [YYYY-MM-DD]

## Executive Summary
- Overall health: [strong / needs improvement / underperforming]
- Key finding: [one-sentence primary insight]
- Top recommendation: [one-sentence highest-impact action]

## Per-Platform Analysis

### [Platform 1]

#### Performance Overview
| Metric | Value | Benchmark | Status |
|--------|-------|-----------|--------|
| Followers | [N] | - | - |
| 90-day follower growth | [+/-N] ([X]%) | [X]%/quarter | [above/below] |
| Engagement rate (reach-based) | [X]% | [X]% (category avg) | [above/below] |
| Posts published (90d) | [N] | - | - |
| Avg. reach per post | [N] | - | - |
| Top post reach | [N] | - | - |

#### Content Format Analysis
| Format | Posts | % of Total | Avg. Engagement Rate | Avg. Reach | vs. Account Avg |
|--------|-------|-----------|---------------------|-----------|----------------|
| Image | [N] | [X]% | [X]% | [N] | [+/-X]% |
| Video | [N] | [X]% | [X]% | [N] | [+/-X]% |
| Carousel | [N] | [X]% | [X]% | [N] | [+/-X]% |
| Stories | [N] | [X]% | [X]% | [N] | [+/-X]% |

**Format mismatch:** [e.g., "Video gets 2.8x average engagement but represents only 12% of posts"]

#### Content Topic Analysis
| Topic | Posts | % of Total | Avg. Engagement Rate | vs. Account Avg |
|-------|-------|-----------|---------------------|----------------|
| Educational | [N] | [X]% | [X]% | [+/-X]% |
| Promotional | [N] | [X]% | [X]% | [+/-X]% |
| Community | [N] | [X]% | [X]% | [+/-X]% |
| Culture/BTS | [N] | [X]% | [X]% | [+/-X]% |

#### Posting Timing
- Most common posting day: [day]
- Highest engagement day: [day]
- Most common posting time: [HH:MM]
- Highest engagement time: [HH:MM]
- **Timing mismatch:** [e.g., "Posts go out at 9 AM but peak engagement is 6-8 PM"]

#### Top 3 Posts (by engagement)
| Post | Date | Format | Topic | Engagement Rate | What Worked |
|------|------|--------|-------|----------------|-------------|
| [description] | [date] | [format] | [topic] | [X]% | [analysis] |

#### Bottom 3 Posts (by engagement)
| Post | Date | Format | Topic | Engagement Rate | What Didn't Work |
|------|------|--------|-------|----------------|-----------------|
| [description] | [date] | [format] | [topic] | [X]% | [analysis] |

## Competitive Analysis

### Competitor Overview
| Account | Followers | Engagement Rate | Posts/Week | Top Format | Top Topic |
|---------|-----------|----------------|-----------|-----------|----------|
| [You] | [N] | [X]% | [N] | [format] | [topic] |
| [Competitor 1] | [N] | [X]% | [N] | [format] | [topic] |
| [Competitor 2] | [N] | [X]% | [N] | [format] | [topic] |
| [Competitor 3] | [N] | [X]% | [N] | [format] | [topic] |

### Competitive Gaps
- What competitors do that you don't: [e.g., "All 3 competitors post video content 3x/week; you post video 1x/month"]
- What you do that competitors don't: [e.g., "You're the only account sharing behind-the-scenes process content"]

## Recommendations (prioritized)

| Priority | Recommendation | Finding | Expected Impact | Effort |
|----------|---------------|---------|----------------|--------|
| 1 | [specific action] | [reference data point] | High | Low |
| 2 | [specific action] | [reference data point] | High | Medium |
| 3 | [specific action] | [reference data point] | Medium | Low |
```

## QA Rubric (scored)

Each dimension scored 0-5. A passing file scores 16/20 minimum.

| Dimension | 0–1 | 2–3 | 4–5 |
|-----------|-----|-----|-----|
| Data rigor | Findings based on impressions or opinions without metrics; follower count presented as the primary metric | Metrics collected but engagement rate not calculated; or reach-based data missing, using only likes as engagement | Engagement rate calculated with formula disclosed; format and topic breakdowns with specific numbers; 90-day data window; top and bottom performing posts analyzed |
| Content analysis depth | Posts listed chronologically with no pattern analysis; no format or topic breakdown | Format breakdown exists but topic analysis is missing; or both exist but mismatches aren't identified | Content analyzed by both format AND topic; specific mismatches identified (e.g., "video = 3x engagement but 10% of posts"); timing analysis shows posting vs. performance alignment |
| Competitive quality | No competitor analysis; or comparison against accounts with 100x different follower counts | Competitors listed with follower counts but engagement rates not compared; no gap analysis | Like-for-like comparison (similar follower range, same category); engagement rate benchmarked; format and topic gaps identified; what competitors do that you don't and vice versa |
| Recommendation actionability | "Post more" or "engage better" - generic advice with no data connection | Recommendations reference data but are vague ("improve video content"); no prioritization | Each recommendation references a specific finding, proposes a specific action, estimates impact, and is prioritized by impact/effort ratio |

## Anti-Patterns

| Anti-Pattern | Why It Fails | Correct Approach |
|---|---|---|
| Reporting follower count as the primary metric | 50,000 followers with 0.5% engagement means each post reaches ~250 people organically. The large number creates false confidence while actual impact is minimal | Lead with engagement rate. Contextualize follower count with: engagement rate, reach per post, and follower growth rate. A growing, engaged small audience is healthier than a large, dormant one |
| No format or topic breakdown | "You posted 45 times in 90 days" tells you nothing about what worked. Without format and topic analysis, the next content calendar is a guess | Break every post into format (image/video/carousel/etc.) and topic (educational/promotional/community/etc.). Calculate average engagement per category. Identify mismatches between what you post most and what performs best |
| Comparing against accounts with 100x your follower count | "Nike gets 500K likes per post and we get 50" is not a useful comparison. Larger accounts have lower engagement rates by nature and different content strategies | Benchmark against 3-5 competitors with similar follower counts in the same category. Compare engagement rate (not raw numbers), posting frequency, and content format mix |
| Generic recommendations without data connection | "Post more video content" - why? Based on what? "More" is not a strategy | "Video posts average 4.2% engagement rate vs. 1.1% for images (90-day data), but represent only 8% of posts. Recommendation: shift to 30% video content over 4 weeks. Expected impact: ~2x average engagement rate. Effort: medium (requires video production capacity)" |

## Examples (good/bad)

**Good:** "Kenzo/APED X audit. 90-day period. 2,847 followers, +340 (13.5% growth). Engagement rate: 4.1% (above 2.5% category benchmark). Format breakdown: memes/images 68% of posts (avg 5.2% ER), threads 12% (avg 2.1% ER), polls 8% (avg 6.8% ER), announcements 12% (avg 1.4% ER). Finding: polls drive highest engagement but are under-used (8%). Recommendation: increase polls to 20% of content mix. Expected impact: +1.2pp average engagement rate."

**Bad:** "You have 2,847 followers. Your best post got 147 likes. You should post more often and use better hashtags." - no engagement rate, no format analysis, no benchmarks, no data-backed recommendations.

## Variants

- **Quick audit variant (1 platform):** Focus on one platform only with 30-day data (not 90). Skip competitive analysis. Produce 3 recommendations maximum. Suitable for initial client conversations or quarterly check-ins.
- **Multi-platform comparison variant:** Audit 2-3 platforms and compare which platform delivers the best ROI for this brand. Include platform-specific audience demographics. Recommend platform prioritization: "LinkedIn drives 3x the qualified traffic of Instagram for your B2B audience - focus resources there."
- **Crisis/reputation variant:** Add sentiment analysis to the audit. Categorize mentions and comments as positive, neutral, or negative. Identify recurring complaint themes. Flag any reputation risks. Include response time analysis (how fast does the brand respond to comments/mentions).
- **48h sprint:** Pull 30-day data for the primary platform. Calculate engagement rate. Identify the top 3 and bottom 3 posts. Answer one question: "What format and topic combination drives the highest engagement?" Deliver one recommendation based on that answer.
